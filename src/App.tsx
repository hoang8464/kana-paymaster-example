import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useEffect, useState } from "react";
import {
  Aptos,
  AptosConfig,
  Network,
  UserTransactionResponse,
} from "@aptos-labs/ts-sdk";
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import { PaymasterSdk } from "@kanalabs/paymaster-sdk";
function App() {
  const { signMessage, signTransaction, account } = useWallet();

  // state to store aptos instance
  const [aptos, setAptos] = useState<Aptos>();
  const [sdk, setSdk] = useState<PaymasterSdk>();
  const [signature, setSignature] = useState<any>();
  const [txnStatus, setTxnStatus] = useState<string>();
  const [hash, setHash] = useState<string>();

  useEffect(() => {
    const aptosConfig = new AptosConfig({
      network: Network.MAINNET,
    });
    const aptos = new Aptos(aptosConfig);
    setAptos(aptos);
    const sdk = new PaymasterSdk(
      { privateKey: undefined },
      {
        projectKey: import.meta.env.VITE_APP_PAYMASTER_KEY,
      }
      );
      setSdk(sdk);
    }, []);

    const onSignMessage = async () => {
      setSignature(undefined);
      const payload = {
        message: "Hello from Aptos Wallet Adapter",
        nonce: "random_string",
      };
      const response = await signMessage(payload);
      setSignature(response?.signature);
    };

  const onSignTransaction = async () => {
    if (!aptos) return;
    if (!account) return;

    const transaction = await aptos.transaction.build.simple({
      sender: account?.address,
      withFeePayer: true,
      data: {
        function: "0x1::aptos_account::transfer",
        functionArguments: [account?.address, 10],
      },
    });
    const isWhitelisted = await sdk?.isWhitelisted({
      address: account?.address,
    });
    console.log("isWhitelisted", isWhitelisted);
    if (!(isWhitelisted?.message == "whitelisted")) {
      console.log(
        await sdk?.addToWhitelist({
          address: account?.address,
        })
      );
    }

    const senderAuthenticator = await signTransaction(transaction, false);
    console.log(senderAuthenticator);

    const sponsor = await sdk?.sponsoredTxnWithSenderAuth({
      transaction: transaction,
      senderAuth: senderAuthenticator,
    });
    if (!sponsor) throw new Error("Sponsorship failed");
    const txnreceipt = (await sdk?.aptosClient.waitForTransaction({
      transactionHash: sponsor?.hash,
      options: { checkSuccess: true },
    })) as UserTransactionResponse;
    setHash(sponsor?.hash);
    setTxnStatus(txnreceipt?.vm_status);
    console.log("txn receipt", txnreceipt);
  };

  return (
    <>
      <div className="navbar">
        <div className="navbar-text">KanaPaymaster Example</div>
        <div>
          <WalletSelector />
        </div>
      </div>
      <div className="center-container" style={
        {
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "lightgray"
        }
      }>
        <button
          onClick={onSignMessage}
          style={{
            backgroundColor: "blue",
            padding: "10px",
            margin: "10px",
            borderRadius: "5px",
            border: "none",
            color: "white",
            cursor: "pointer",
          }}
        >
          Sign message
        </button>
        {signature && (
          <div>
            <textarea
              value={signature}
              readOnly
              style={{
                width: "200px",
                height: "100px",
                borderRadius: "5px",
                border: "1px solid gray",
                padding: "5px",
              }}
            />
          </div>
        )}
        <button
          onClick={onSignTransaction}
          style={{
            color: "white",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "green",
            padding: "10px",
            margin: "10px",
            cursor: "pointer",
          }}
        >
          Sign transaction
        </button>

        {txnStatus && (
          <div> Status: {txnStatus}</div>
        )}
          {hash && (
          <div>Hash: {hash}</div>
        )}
      </div>
    </>
  );
}

export default App;
