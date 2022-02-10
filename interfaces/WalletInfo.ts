import type { JsonRpcSigner } from '@ethersproject/providers/src.ts/json-rpc-provider';
import type { Contract } from 'ethers';



interface WalletInfo  {
	address: string;
	signer: JsonRpcSigner | null;
	contract: Contract | null;
}


export default WalletInfo;