import { createContext } from 'react';

import type { WalletInfo } from '../interfaces';



const WalletContext = createContext({
	wallet: {
		address: '',
		signer: null,
		contract: null,
	} as WalletInfo,
	setWallet: (wallet: WalletInfo) => {}
});


export default WalletContext;