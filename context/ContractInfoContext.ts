import { createContext } from 'react';

import type { ContractInfo } from '../interfaces';



const ContractInfoContext = createContext({
	contractInfo: null as ContractInfo | null,
	setContractInfo: (contractInfo: ContractInfo | null) => {}
});


export default ContractInfoContext;