import { createAgentNFT } from './helpers';
import { logger } from './utils';
import { createUmiConnection } from './utils/solana';

(async function () {
    
    logger.info("Starting agent marketplace");

    logger.info("Creating AI Agent NFT");

    const umi = createUmiConnection();

    logger.info("Creating root authority");



    const blockhash =  await umi.rpc.getLatestBlockhash();

    logger.info(`checking lastest blockhash ${blockhash.blockhash}`);

    await createAgentNFT(umi);

})();
