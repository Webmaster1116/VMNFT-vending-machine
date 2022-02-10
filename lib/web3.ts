import { ethers } from 'ethers';

import ABI from './ABI.json';


const provider = new ethers.providers.JsonRpcProvider({ url: 'https://api.avax.network/ext/bc/C/rpc', timeout: 30000 });
const contract = new ethers.Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!, ABI, provider);


export { provider, contract };