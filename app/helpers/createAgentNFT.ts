import 'dotenv/config';

import { createCollectionV1, mplCore, pluginAuthorityPair, ruleSet } from '@metaplex-foundation/mpl-core';
import { signerIdentity, TransactionBuilderSendAndConfirmOptions, publicKey, Umi } from '@metaplex-foundation/umi';
import { logger } from '../utils';
import { loadKeypair } from '../utils/keypairs';

export async function createAgentNFT(umi: Umi): Promise<string> {

    logger.info('create agent function starts');

    const rootKeys = loadKeypair(umi, 'root');

    logger.info(`Root pubkey loaded: ${rootKeys.keypair.publicKey}`);

    return;
}
