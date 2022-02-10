import { FunctionComponent, useState, useContext, useEffect } from 'react';
import { ethers } from 'ethers';

import Button from './base/Button';
import { WalletContext, ContractInfoContext } from '../context';
import { contract } from '../lib/web3';
import * as gtag from '../lib/gtag';

import type { BigNumber } from 'ethers';

import styles from '../styles/components/Rewards.module.css';


const Rewards: FunctionComponent = () => {
	const [ usersRewards, setUsersRewards ] = useState<{ ownedTokens: number[]; mintRewards: BigNumber; salesRewards: BigNumber; } | null>(null);

	const { wallet } = useContext(WalletContext);
	const { contractInfo } = useContext(ContractInfoContext);


	async function claimMintRewards() {
		const { signer, contract } = wallet;
		if (!contract || !signer || !contractInfo) return alert('Please connect your wallet!');

		const chainID = await signer.getChainId();
		if (ethers.utils.hexlify(chainID) !== process.env.NEXT_PUBLIC_CHAIN_ID) return alert('Please switch to the Avalanche mainnet!');


		try {
			const gas = await contract.estimateGas.claimMintRewards();

			const receipt = await contract.claimMintRewards({ gasLimit: gas.toString() });
			if (!receipt) return;


			const { status } = await receipt.wait();
			if (status !== 1) return alert('Error, transaction reverted!');


			gtag.event({
				action: 'claimed_rewards',
				category: 'ecommerce',
				label: 'Claimed rewards',
				value: 1
			});


			alert(`Successfully claimed your mint rewards`);
			window.location.reload();
		} catch (err: any) {
			if (err.code === 4001) return;

			alert(`Error:\n${err.data?.message || err.message}`);
		}
	}

	async function claimSalesRewards() {
		const { signer, contract } = wallet;
		if (!contract || !signer || !contractInfo) return alert('Please connect your wallet!');

		const chainID = await signer.getChainId();
		if (ethers.utils.hexlify(chainID) !== process.env.NEXT_PUBLIC_CHAIN_ID) return alert('Please switch to the Avalanche mainnet!');


		try {
			const gas = await contract.estimateGas.claimSalesRewards();

			const receipt = await contract.claimSalesRewards({ gasLimit: gas.toString() });
			if (!receipt) return;


			const { status } = await receipt.wait();
			if (status !== 1) return alert('Error, transaction reverted!');


			gtag.event({
				action: 'claimed_rewards',
				category: 'ecommerce',
				label: 'Claimed rewards',
				value: 1
			});


			alert(`Successfully claimed your sales rewards`);
			window.location.reload();
		} catch (err: any) {
			if (err.code === 4001) return;

			alert(`Error:\n${err.data?.message || err.message}`);
		}
	}


	useEffect(() => {
		const { address } = wallet;
		if (!address) return;
		
		async function fetchUsersRewards() {
			const [ ownedTokens, mintRewards, salesRewards ] = await Promise.all([
				contract.walletOfOwner(address),
				contract.getMintRewardsOfAddress(address),
				contract.getSalesRewardsOfAddress(address),
			]) as [ BigNumber[], BigNumber, BigNumber ];


			setUsersRewards({
				ownedTokens: ownedTokens.map(tokenID => tokenID.toNumber()),
				mintRewards,
				salesRewards
			});
		}

		fetchUsersRewards();
	}, [wallet]);


	if (!contractInfo && !usersRewards) return <section id='rewards'></section>;

	return (
		<section className={styles.section} id='rewards'>
			{!!contractInfo &&
				<>
					<h2 className={styles.title}>Rewards</h2>

					<p className={styles.text}>This displays the current sum of the total claimable mint and secondary sales rewards across all tokens</p>

					<div className={styles.stats}>
						<div className={styles.stat}>
							<div className={styles.statValue}>{contractInfo.totalMintRewards.toFixed(2)}</div>

							<div>Mint Rewards</div>
						</div>

						<div className={styles.stat}>
							<div className={styles.statValue}>{contractInfo.totalSalesRewards.toFixed(2)}</div>

							<div>Sales Rewards</div>
						</div>
					</div>
				</>
			}

			{!!usersRewards &&
				<>
					<h2 className={styles.title}>Claim your rewards</h2>

					<div className={styles.userRewards}>
						<div className={styles.text}>You own {usersRewards.ownedTokens.length} {usersRewards.ownedTokens.length === 1 ? 'Vending Machine' : 'Vending Machines'}</div>

						<div className={styles.reward}>
							<div>
								<div>Mint rewards</div>

								<div className={styles.rewardValue}>{ethers.utils.formatUnits(usersRewards.mintRewards, 'ether')}</div>
							</div>

							{usersRewards.mintRewards.isZero()
								? <Button onClick={claimMintRewards} title='Not enought AVAX to claim' disabled>Claim</Button>
								: <Button onClick={claimMintRewards} title='Claim your mint rewards in AVAX'>Claim</Button>
							}
						</div>

						<div className={styles.reward}>
							<div>
								<div>Sales rewards</div>

								<div className={styles.rewardValue}>{ethers.utils.formatUnits(usersRewards.salesRewards, 'ether')}</div>
							</div>

							{usersRewards.mintRewards.isZero()
								? <Button onClick={claimSalesRewards} title='Not enought AVAX to claim' disabled>Claim</Button>
								: <Button onClick={claimSalesRewards} title='Claim your sales rewards in AVAX'>Claim</Button>
							}
						</div>
					</div>
				</>
			}

		</section>
	);
}


export default Rewards;