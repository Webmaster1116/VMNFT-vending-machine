import { FunctionComponent } from 'react';

import styles from '../styles/components/AboutUs.module.css';


const About: FunctionComponent = () => (
	<section className={styles.section} id='about-us'>
		<h2 className={styles.title}>About Us</h2>

		<div className={styles.text}>
			<p>4444 unique Vending Machine NFTs have been introduced to the Avalanche network. We are here to establish a strong and dedicated community that will work together to benefit from being a part of the VMN community.</p>

			<p>Our goal is to change the narrative in NFT space from just a profile picture, to beneficial utilities varying from <strong>mint rewards</strong>, <strong>secondary sales distributions</strong>, frequent Airdrops and colaborations exclusive to VMN holders.</p>

			<p>As we are building this community, it&apos;s establishing itself as an umbrella to many more NFT projects to come. An NFT collection <strong>by the community for the community</strong>!</p>
		</div>

		<img src='/images/about-us-image.png' alt='VMNs' className={styles.image} />
	</section>
);


export default About;