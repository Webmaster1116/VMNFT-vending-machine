import { FunctionComponent, useState, useContext } from 'react';
import { ethers } from 'ethers';

import Button from './base/Button';
import { WalletContext, ContractInfoContext } from '../context';
import * as gtag from '../lib/gtag';
import ABI from '../lib/ABI.json';

import type { Web3Window } from '../interfaces';

import styles from '../styles/components/Mint.module.css';


declare const window: Web3Window;


const Mint: FunctionComponent = () => {
	const [ amount, setAmount ] = useState(1);

	const { wallet, setWallet } = useContext(WalletContext);
	const { contractInfo } = useContext(ContractInfoContext);


	async function mint() {
		const { signer, contract } = wallet;
		if (!contract || !signer || !contractInfo) return alert('Please connect your wallet!');

		const chainID = await signer.getChainId();
		if (ethers.utils.hexlify(chainID) !== process.env.NEXT_PUBLIC_CHAIN_ID) return alert('Please switch to the Avalanche mainnet!');


		try {
			const value = contractInfo.cost.mul(amount);
			const gas = await contract.estimateGas.mint(amount, { value });

			const receipt = await contract.mint(amount, { value, gasLimit: gas.toString() });
			if (!receipt) return;


			const { status } = await receipt.wait();
			if (status !== 1) return alert('Error, transaction reverted!');


			gtag.event({
				action: 'mint',
				category: 'ecommerce',
				label: 'User minted a token',
				value: amount.toString()
			});


			alert(`Successfully minted ${amount} ${amount === 1 ? 'token' : 'tokens'}`);
			window.location.reload();
		} catch (err: any) {
			if (err.code === 4001) return;

			alert(`Error:\n${err.data?.message || err.message}`);
		}
	}

	async function connectWallet() {
		const { ethereum } = window;

		if (typeof ethereum === 'undefined') return alert('Unable to find Metamask!\nPlease make sure that you have the Metamask extension installed!');


		const provider = new ethers.providers.Web3Provider(ethereum);
		const signer = provider.getSigner(0);
		const contract = new ethers.Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!, ABI, signer);

		const accounts = await provider.send('eth_requestAccounts', []);
		if (!accounts) return;


		try {
			await provider.send('wallet_switchEthereumChain', [{ chainId: process.env.NEXT_PUBLIC_CHAIN_ID! }]);
		} catch (err: any) {
			if (err.code === 4001) return alert('Please switch to the Avalanche mainnet!');

			try {
				await provider.send('wallet_addEthereumChain', [
					{
						chainId: process.env.NEXT_PUBLIC_CHAIN_ID!,
						chainName: 'Avalanche Mainnet',
						rpcUrls: [ 'https://api.avax.network/ext/bc/C/rpc' ],
						nativeCurrency: {
							name: 'Avalanche',
							symbol: 'AVAX',
							decimals: 18
						},
						blockExplorerUrls: [ 'https://snowtrace.io/' ]
					}
				]);
			} catch (err: any) {
				if (err.code !== 4001) return alert(`Error: ${err.message}`);
			}
		}


		setWallet({ address: accounts[0], signer, contract });
	

		gtag.event({
			action: 'login',
			category: 'engagement',
			label: 'User connected a wallet',
			value: 'MetaMask'
		});
	}


	function incrementAmount() {
		const maxAmount = contractInfo?.maxMintAmountPerTX || 10;

		if (amount + 1 <= maxAmount) setAmount(amount + 1);
	}

	function decrementAmount() {
		if (amount > 1) setAmount(amount - 1);
	}


	return (
		<section className={styles.section} id='mint'>
			<img src='/images/mint-section-image.png' alt='VMNs' className={styles.image} />

			{!!contractInfo && 
				<div>
					<h2 className={styles.title}>
						<u>Join the community</u> and mint while you can
					</h2>

					<div className={styles.panel}>
						<div className={styles.supplyWrapper}>
							<div>Already Minted</div>

							<div>{contractInfo.currentSupply} / {contractInfo.maxSupply}</div>
						</div>

						<progress max={contractInfo.maxSupply} value={contractInfo.currentSupply} className={styles.progressBar}>{Math.floor(contractInfo.currentSupply / contractInfo.maxSupply)}%</progress>

						<div className={styles.mintSection}>
							<div>
								<div className={styles.amountSelector}>
									<button onClick={decrementAmount}>-</button>

									{amount}

									<button onClick={incrementAmount}>+</button>
								</div>

								<div>Cost: <span>{ethers.utils.formatUnits(contractInfo.cost.mul(amount), 'ether')} AVAX</span></div>
							</div>

							{!!wallet.address
								? <Button onClick={mint} title='Join the community by minting your own VMN token'>Mint</Button>
								: <Button onClick={connectWallet} title='Connect your MetaMask wallet'>Connect Wallet</Button>
							}
						</div>
					</div>
				</div>
			}
		</section>
	);
}


export default Mint;