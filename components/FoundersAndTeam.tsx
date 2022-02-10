import { FunctionComponent } from 'react';

import styles from '../styles/components/FoundersAndTeam.module.css';


const FoundersAndTeam: FunctionComponent = () => (
	<section className={styles.section} id='founders-and-team'>
		<h2 className={styles.title}>Meet the Team working on VMN</h2>


		<h3 className={styles.subtitle}>The Founders</h3>

		<ul className={styles.founders}>
			<li className={styles.founder} style={{ '--delay': '0s' } as any}>
				<img src='/images/founders/625.png' alt='Aza' />

				<a href='https://twitter.com/TheNFT_Don' target='_blank' rel='noreferrer' className={styles.name}>Aza</a>

				<div className={styles.role}>Project founder</div>
			</li>

			<li className={styles.founder} style={{ '--delay': '0.3s' } as any}>
				<img src='/images/founders/petdomaa100.png' alt='petdomaa100' />

				<div className={styles.name}>petdomaa100</div>

				<div className={styles.role}>Blockchain Developer</div>
			</li>

			<li className={styles.founder} style={{ '--delay': '0.5s' } as any}>
				<img src='/images/founders/minato.png' alt='Nandobando' />

				<div className={styles.name}>Nandobando</div>

				<div className={styles.role}>Moderator</div>
			</li>

			<li className={styles.founder} style={{ '--delay': '0.7s' } as any}>
				<img src='/images/founders/cosmos.png' alt='Acid' />

				<div className={styles.name}>Acid</div>

				<div className={styles.role}>Moderator</div>
			</li>

			<li className={styles.founder} style={{ '--delay': '0.9s' } as any}>
				<img src='/images/founders/stoinker.png' alt='Stoinker' />

				<div className={styles.name}>Stoinker</div>

				<div className={styles.role}>Moderator</div>
			</li>
		</ul>

		<h3 className={styles.subtitle}>Rest of the Team</h3>

		<ul className={styles.founders}>
			<li className={styles.founder} style={{ '--delay': '0.9s' } as any}>
				<img src='/images/founders/aza.png' alt='xrpant' />

				<div className={styles.name}>xrpant</div>

				<div className={styles.role}>Developer</div>
			</li>

			<li className={styles.founder} style={{ '--delay': '0.7s' } as any}>
				<img src='/images/founders/petdomaa100.png' alt='Nolan' />

				<div className={styles.name}>Nolan</div>

				<div className={styles.role}>Developer</div>
			</li>

			<li className={styles.founder} style={{ '--delay': '0.5s' } as any}>
				<img src='/images/founders/minato.png' alt='CosmosOnBlockchain' />

				<div className={styles.name}>CosmosOnBlockchain</div>

				<div className={styles.role}>Vice</div>
			</li>

			<li className={styles.founder} style={{ '--delay': '0.3s' } as any}>
				<img src='/images/founders/cosmos.png' alt='Exshot' />

				<div className={styles.name}>Exshot</div>

				<div className={styles.role}>Moderator</div>
			</li>

			<li className={styles.founder} style={{ '--delay': '0.1s' } as any}>
				<img src='/images/founders/stoinker.png' alt='Kriptooffer' />

				<div className={styles.name}>Kriptooffer</div>

				<div className={styles.role}>Moderator</div>
			</li>
		</ul>
	</section>
);


export default FoundersAndTeam;
