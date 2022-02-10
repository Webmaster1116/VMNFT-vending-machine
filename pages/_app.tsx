import { Fragment, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Script from 'next/script';

import { WalletContext, ContractInfoContext } from '../context';
import { contract } from '../lib/web3';
import * as gtag from '../lib/gtag';
import ABI from '../lib/ABI.json';

import type { Web3Window, WalletInfo, ContractInfo } from '../interfaces';
import { BigNumber, ethers } from 'ethers';
import type { AppProps } from 'next/app';

import '../styles/globals.css';


declare const window: Web3Window;


const App = ({ Component, pageProps }: AppProps) => {
	const [ wallet, setWallet ] = useState<WalletInfo>({ address: '', signer: null, contract: null });
	const [ contractInfo, setContractInfo ] = useState<ContractInfo | null>(null);

	const router = useRouter();


	useEffect(() => {
		const handleRouteChange = (url: string) => gtag.pageview(url);

		router.events.on('routeChangeComplete', handleRouteChange);

		return () => router.events.off('routeChangeComplete', handleRouteChange);
	}, [router.events]);

	useEffect(() => {
		async function loginUser() {
			const { ethereum } = window;
			if (typeof ethereum === 'undefined') return;


			const provider = new ethers.providers.Web3Provider(ethereum);
			const signer = provider.getSigner(0);
			const contract = new ethers.Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!, ABI, signer);

			const [ accounts, chainID ] = await Promise.all([
				provider.listAccounts(),
				signer.getChainId()
			]);

			if (!accounts || ethers.utils.hexlify(chainID) !== process.env.NEXT_PUBLIC_CHAIN_ID!) return;


			setWallet({ address: accounts[0], signer, contract });


			ethereum.on('accountsChanged', (accounts: string[]) => {
				setWallet(wallet => {
					wallet.address = accounts[0];
					wallet.signer = provider.getSigner(0);

					return wallet;
				});
			});

			ethereum.on('disconnect', () => setWallet({ address: '', signer: null, contract: null }));	
		}

		loginUser();


		async function fetchContractInfo() {
			const [ maxSupply, currentSupply, cost, maxMintAmountPerTX, totalMintRewards, totalSalesRewards ] = await Promise.all([
				contract.maxSupply(),
				contract.totalSupply(),
				contract.cost(),
				contract.maxMintAmountPerTX(),
				contract.totalMintRewardsVault(),
				contract.totalSalesRewardsVault(),
			]) as [ BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber ];


			setContractInfo({
				maxSupply: maxSupply.toNumber(),
				currentSupply: currentSupply.toNumber(),
				cost,
				maxMintAmountPerTX: maxMintAmountPerTX.toNumber(),
				totalMintRewards: Number( ethers.utils.formatUnits(totalMintRewards, 'ether') ),
				totalSalesRewards: Number( ethers.utils.formatUnits(totalSalesRewards, 'ether') )
			});
		}

		fetchContractInfo();
		setInterval(fetchContractInfo, 10000);
	}, []);


	return (
		<Fragment>
			<Script strategy='afterInteractive' src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`} />

			<Script
				id='gtag-init'
				strategy='afterInteractive'
				dangerouslySetInnerHTML={{
					__html: `window.dataLayer = window.dataLayer || [];
							function gtag() { dataLayer.push(arguments); }

							gtag('js', new Date());

							gtag('config', '${gtag.GA_TRACKING_ID}', {
								page_path: window.location.pathname,
							});`
				}}
			/>

			<ContractInfoContext.Provider value={{ contractInfo, setContractInfo }}>
				<WalletContext.Provider value={{ wallet, setWallet }}>
					<Component {...pageProps} />
				</WalletContext.Provider>
			</ContractInfoContext.Provider>
		</Fragment>
	);
}


export default App;