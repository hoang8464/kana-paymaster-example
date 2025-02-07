
# Kana Paymaster Example

This is a simple example of how to integrate the **Kana Paymaster SDK** with an Aptos wallet adapter. It demonstrates signing messages, executing transactions with a paymaster, and checking whitelisting status.

## Features

-   Connect and authenticate with an Aptos wallet.
    
-   Sign messages using the wallet adapter.
    
-   Execute transactions using the **Kana Paymaster SDK**.
    
-   Check and manage whitelisting status before executing transactions.
    

## Prerequisites

-   Node.js (v16 or later recommended)
    
-   A compatible Aptos wallet (e.g., Petra, Martian, Pontem, Fewcha)
    
-   An API key for **Kana Paymaster**
    

## Installation

Clone the repository and install dependencies:

```
git clone https://github.com/yourusername/kana-paymaster-example.git
cd kana-paymaster-example
npm install
```

## Configuration

Create a `.env` file in the root directory and add your **Kana Paymaster API key**:

```
VITE_APP_PAYMASTER_KEY=your_paymaster_key_here
```

## Running the Application

Start the development server:

```
npm run dev
```

Then, open your browser and navigate to `http://localhost:5173/` (or the displayed URL in the terminal).

## Usage

### 1. Connect Wallet

Click on the **Wallet Selector** to connect an Aptos-compatible wallet.

### 2. Sign a Message

Click the **Sign Message** button to sign a predefined message with your wallet.

### 3. Execute a Transaction with Paymaster

Click the **Sign Transaction** button to:

-   Build an Aptos transaction.
    
-   Check if the wallet is whitelisted.
    
-   If not whitelisted, add it to the whitelist.
    
-   Execute the transaction with a fee payer via the paymaster.
    

## Project Structure

```
/ (root)
  ├── src/
  │   ├── App.tsx  # Main application logic
  │   ├── index.tsx  # Entry point
  │   ├── styles.css  # Styling for UI
  ├── .env  # Configuration file (not included in repo)
  ├── package.json  # Dependencies and scripts
  ├── README.md  # Project documentation
```

## Dependencies

-   `@aptos-labs/wallet-adapter-react`: Wallet integration for Aptos.
    
-   `@aptos-labs/ts-sdk`: SDK for interacting with Aptos.
    
-   `@kanalabs/paymaster-sdk`: Paymaster service for handling transaction fees.
    

## License

This project is licensed under the MIT License.

## Contact

For any questions or support, reach out via [Kana Labs](https://kanalabs.io) or Aptos Discord.

----------

Enjoy building with Aptos & Kana Paymaster! 🚀
