import { FunctionComponent } from 'react';

import * as gtag from '../lib/gtag';

import styles from '../styles/components/Header.module.css';


const Header: FunctionComponent = () => {
	function clickedLink(event: React.MouseEvent) {
		gtag.event({
			action: 'clicked_link',
			category: 'engagement',
			label: 'User clicked on a link',
			value: event.currentTarget.textContent || 'unknown'
		});
	}


	return (
		<header className={styles.header}>
			<img src='/icons/logo.png' alt='Logo' />

			<nav>
				<ul className={styles.navBar}>
					<li>
						<a href='#about-us' className={styles.navBarItem} title='Read more about who we are' onClick={clickedLink}>About Us</a>
					</li>

					<li>
						<a href='#mint' className={styles.navBarItem} title='Join the community and mint while you can' onClick={clickedLink}>Mint</a>
					</li>

					<li>
						<a href='#rewards' className={styles.navBarItem} title='View and claim your payout rewards in AVAX' onClick={clickedLink}>Rewards</a>
					</li>

					<li>
						<a href='#founders-and-team' className={styles.navBarItem} title='Meet the founders of VMN' onClick={clickedLink}>Founders</a>
					</li>

					<li>
						<a href='https://medium.com/@VMNFT/vending-machines-nft-37698ecd5ba6' target='_blank' rel='noreferrer' className={styles.navBarItem} title='Read the VMN whitepaper on Medium' onClick={clickedLink}>Whitepaper</a>
					</li>

					<li>
						<a href='#roadmap' className={styles.navBarItem} title='View the official VMN roadmap' onClick={clickedLink}>Roadmap</a>
					</li>

					<li>
						<a href='#faqs' className={styles.navBarItem} title='View answers to some Frequestly Asked Questions' onClick={clickedLink}>FAQs</a>
					</li>

					<li>
						<a href='https://market.vendingmachinesnft.io' target='_blank' rel='noreferrer' className={styles.navBarItem} title='Trade on the official VMN marketplace to receive 50% on the royalties' onClick={clickedLink}>Marketplace</a>
					</li>

					<li>
						<a href='https://vmproject.vendingmachinesnft.io' target='_blank' rel='noreferrer' className={styles.navBarItem} title='VMNFT Community Projects' onClick={clickedLink}>VM Projects</a>
					</li>					
				</ul>
			</nav>
		</header>
	);
}


export default Header;
