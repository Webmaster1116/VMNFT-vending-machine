import type { BigNumber } from 'ethers';


interface ContractInfo  {
	maxSupply: number;
	currentSupply: number;
	cost: BigNumber;
	maxMintAmountPerTX: number;
	totalMintRewards: number;
	totalSalesRewards: number;
}


export default ContractInfo;