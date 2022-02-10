import React, { FunctionComponent } from 'react';

import styles from '../styles/components/Roadmap.module.css';


const roadmap = [
	{
		title: 'Q4 2021',
		elements: [
			{
				text: 'Set up website, social media platforms, and kickstart marketing campaign to introduce VMN to the public',
				explanation: null,
				done: true
			},
			{
				text: 'Put smart contracts on the Avalanche network and start the creation of a marketplace',
				explanation: null,
				done: true
			}
		]
	},
	{
		title: 'Q1 2022',
		elements: [
			{
				text: 'Project launch, presale mints, and funds allocated to start our mission',
				explanation: null,
				done: true
			},
			{
				text: 'Buy land in the SandBox Game as an investment for holders',
				explanation: '<a href="https://opensea.io/assets/0x50f5474724e0ee42d9a4e711ccfb275809fd6d4a/52451" target="_blank" rel="noreferrer">LAND (23, -76)</a> was purchased on OpenSea on January 11th, 2022 for 5 ETH.',
				done: true
			},
			{
				text: 'First donation to buildon.org to build schools with crypto',
				explanation: 'Our first donation of 2.395 ETH to buildon.org happened on January 13th, 2022. <a href="https://etherscan.io/tx/0x32ad3d471be1e8ead53cdb36f55091f29c80c7bc2ed93e2d24ca86efcc2c0872" target="_blank" rel="noreferrer">View transaction</a>',
				done: true
			},
			{
				text: 'Launch official Vending Machines Marketplace to allow VMN holders to receive rewards from secondary sales',
				explanation: null,
				done: false
			},
			{
				text: 'Continuous free NFT airdrops to VMN holders',
				explanation: null,
				done: false
			},
			{
				text: 'Start building our Metaverse on the Avalanche Network!',
				explanation: null,
				done: false
			}
		]
	},
	{
		title: 'Q2 2022',
		elements: [
			{
				text: 'Start the testing of our Metaverse, release infographic videos and materials',
				explanation: null,
				done: false
			},
			{
				text: 'Release NFTs for the Metaverse and as always Free Airdrops to VMN Holders',
				explanation: null,
				done: false
			},
			{
				text: 'Develop $VMN coin tokenomics, staking and farming',
				explanation: null,
				done: false
			},
			{
				text: 'Install Vending Machines in the Metaverse to vend items',
				explanation: null,
				done: false
			},
			{
				text: 'Distribute lands to VMN holders from our own Metaverse, one of the biggest utilities of this project',
				explanation: null,
				done: false
			}
		]
	},
	{
		title: 'Q3 2022',
		elements: [
			{
				text: 'NFT Airdrops from new projects and rewards for the VMN community',
				explanation: null,
				done: false
			},
			{
				text: 'Intergrate businesses to our Metaverse',
				explanation: null,
				done: false
			}
		]
	}
] as const;


const Roadmap: FunctionComponent = () => (
	<section className={styles.section} id='roadmap'>
		<h2 className={styles.title}>Roadmap</h2>

		<ul className={styles.roadmap}>
			{roadmap.map(({ title, elements }, i) => (
				<li className={`${styles.roadmapSection} ${i % 2 === 0 ? styles.right : styles.left}`} key={i}>
					<div className={styles.roadmapSectionContent}>
						<div className={styles.roadmapSectionTitle}>{title}</div>

						<ul>
							{elements.map(({ text, explanation, done }, j) => (
								<li className={done ? `${styles.roadmapElement} ${styles.done}` : styles.roadmapElement} key={j}>
									{text}
									{!!explanation && <div className={styles.explanation}>
										<div className={styles.explanationIcon}>?</div>
										<p className={styles.explanationText} dangerouslySetInnerHTML={{ __html: explanation }} />	
									</div>}
								</li>
							))}
						</ul>
					</div>

					<div className={styles.image}>
						{![0, 3].includes(i) && <img src={`/images/roadmap/${i + 1}.png`} alt='VMN' />}
					</div>
				</li>
			))}
		</ul>
	</section>
);


export default Roadmap;