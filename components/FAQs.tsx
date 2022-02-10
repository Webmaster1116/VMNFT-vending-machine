import React, { FunctionComponent, useState } from 'react';

import Button from '../components/base/Button';

import styles from '../styles/components/FAQs.module.css';


const faqs = [
	[
		{
			question: 'What is an NFT?',
			answer: 'A "Non-Fungible Token" (NFT) is data structured in a standardized manner, proving ownership of an item that is stored in a digital ledger (on the blockchain).<br />This item then can represent something specific and unique, like a piece of art, an inventory item in a game, a song, and more. Owning an NFT is just like owning a painting, except instead of owning it physically, you own it virtually, on the blockchain. Refer to <a href="https://youtu.be/4dkl5O9LOKg" target="_blank" rel="noreferrer">this video</a> to get started.'
		},
		{
			question: 'What does "minting" mean?',
			answer: 'Minting is the term used to describe the process of "creating" a new NFT token. When you mint, a new NFT token is created for this collection, which you will become the owner of.'
		},
		{
			question: 'How can I buy a Vending Machines NFT?',
			answer: 'You can mint a Vending Machines NFT token at the <a href="#mint">mint section</a> of this website.'
		},
		{
			question: 'Where can I view or sell my NFT after minting?',
			answer: 'You can view and trade your Vending Machines NFT token at our official <a href="https://market.vendingmachinesnft.io" target="_blank" rel="noreferrer">nft marketplace</a>.'
		},
		{
			question: 'How do I setup the Avalanche network on MetaMask?',
			answer: 'Refer to the <a href="https://support.avax.network/en/articles/4626956-how-do-i-set-up-metamask-on-avalanche" target="_blank" rel="noreferrer">official tutorial</a> made by the Avalanche team.'
		}
	],
	[
		{
			question: 'Why did you choose to build on the Avalanche network?',
			answer: 'The <a href="https://www.avax.network" target="_blank" rel="noreferrer">Avalanche</a> network is a newly emerging ecosystem building ontop of Ethereum type "EVM" smart contracts. The network is attracting many innovative developers and investors, because of it\'s fast blocktime, cheap gas-fees and eco-friendly resource implementation.'
		},
		{
			question: 'What are the utilities to holding VMN tokens?',
			answer: 'You will start gaining rewards and utilities from the moment you mint a VMN token. A 10% share from every mint gets evenly distributed between the current VMN holders. Additionally, 50% of the roayalties collected from secondary sales also get distributed between VMN hodlers. You can see the value of your current rewards at the <a href="#rewards">rewards section</a>.<br />Further information can be found in our <a href="https://medium.com/@VMNFT/vending-machines-nft-37698ecd5ba6" target="_blank" rel="noreferrer">whitepaper</a>.'
		},
		{
			question: 'How are the mint and secondary sales royalties calculated?',
			answer: 'After each mint, 10% from the minting costs get evenly distributed between every currently minted token. The rewards are tied to the token. The more tokends you own, the more rewards you gain. The same applies for the secondary sales rewards. Make sure to claim your rewards for a token before transferring it, as the rewards are tied to the token.'
		},
		{
			question: 'What kind of NFT Airdrops will VMN holders receive?',
			answer: 'This community will create further NFT collections, and collaborate with other porjects in the future. In these projects, 4444 spots will always be reserved for the for VMN community.'
		},
		{
			question: 'How will Vending Machines NFT be involved in the Metaverse?',
			answer: 'This community will develop it\'s own Metaverse derivative on the Avalanche C-Chain. When this happens, the original VMN holders will receive land as investors of this project.'
		}
	],
	[
		{
			question: 'What made you choose the "buildon.org" foundation for donations?',
			answer: 'We have chosen to make our donations to <a href="https://www.buildon.org" target="_blank" rel="noreferrer">buildon.org</a> because they are an accountable and transparent foundation. Their goal is to break the cycle of poverty, illiteracy and low expectations through service and education. As a community we will vote and select which countries to build schools in.<br />Our donation wallet: 0x1070aa92aa80d0bdf14692352726bc22cd8d9130'
		},
		{
			question: 'Where can I view the source code of your smart contract?',
			answer: `You can view the source code and transaction history of our smart contract on the Avalanche <a href="https://snowtrace.io/address/${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}#code" target="_blank" rel="noreferrer">block explorer</a>.`
		},
		{
			question: 'How will the community development be financed?',
			answer: '30% of all funds go to our dedicated community and marketing wallet. These funds are used for promotions, development and community expenses.<br />Our marketing wallet: 0x4057f6d0c49358b88a318dcb230f7d3140fa78de'
		},
		{
			question: 'When did this project launch?',
			answer: 'We launched on December 8th, 2021.'
		},
		{
			question: 'I have more questions, how can I get in contact?',
			answer: 'You can join our <a href="https://discord.com/invite/vmnft" target="_blank" rel="noreferrer">Discord server</a> where your staff can help you out and answer your questions.'
		}
	]
] as const;


const FAQs: FunctionComponent = () => {
	const [ openFAQs, setOpenFAQs ] = useState<number[]>([]);
	const [ FAQtypeIndex, setFAQtypeIndex ] = useState<number>(0);


	function toggleOpenState(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
		const faqElement = event.currentTarget.parentElement!;

		const elementIndex = Array.from(faqElement.parentNode!.children).indexOf(faqElement);
		const i = openFAQs.indexOf(elementIndex);

		const newOpenFAQs = openFAQs.map(index => index);

		if (i === -1) newOpenFAQs.push(elementIndex);
		else newOpenFAQs.splice(i, 1);

		setOpenFAQs(newOpenFAQs);
	}

	function setShowingFAQs(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		const button = event.currentTarget;

		const i = Array.from(button.parentNode!.children).indexOf(button);

		setOpenFAQs([]);
		setFAQtypeIndex(i);
	}
	

	return (
		<section className={styles.section} id='faqs'>
			<h2 className={styles.title}>Frequently Asked Questions</h2>

			<div className={styles.faqTypeSelector}>
				<Button className={FAQtypeIndex === 0 ? styles.selected : undefined} onClick={setShowingFAQs} title='Questions regarding NFTs'>
					General
				</Button>

				<Button className={FAQtypeIndex === 1 ? styles.selected : undefined} onClick={setShowingFAQs} title='Questions regarding the tokenomics of VMN'>
					Tokenomics
				</Button>

				<Button className={FAQtypeIndex === 2 ? styles.selected : undefined} onClick={setShowingFAQs} title='Other questions regarding the project'>
					Others
				</Button>
			</div>

			<ul className={styles.faqs}>
				{faqs[FAQtypeIndex].map(({ question, answer }, i) => (
					<li className={openFAQs.length ? openFAQs.includes(i) ? `${styles.faq} ${styles.open}` : `${styles.faq} ${styles.closed}` : styles.faq} key={i}>
						<div className={styles.question} onClick={toggleOpenState}>{question}</div>

						<p className={styles.answer} dangerouslySetInnerHTML={{ __html: answer }} />
					</li>
				))}
			</ul>
		</section>
	);
}


export default FAQs;
