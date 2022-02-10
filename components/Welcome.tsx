import { FunctionComponent } from 'react';

import Link from './base/Link';

import styles from '../styles/components/Welcome.module.css';


const Welcome: FunctionComponent = () => (
	<section className={styles.section} id='welcome'>
		<div>
			<h1 className={styles.title}>
				Welcome to<br />
				<span>Vending Machines NFT</span>
			</h1>

			<Link href='#about-us'>Explore</Link>
		</div>

		<img src='/images/hero-image.png' alt='Hero Image' />
	</section>
);


export default Welcome;