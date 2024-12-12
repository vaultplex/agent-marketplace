import { mplCore } from '@metaplex-foundation/mpl-core';
import { Umi } from '@metaplex-foundation/umi';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'

/* export function createSolanaConnection() {
    let rpc = process.env['READ_API_RPC_DEVNET'] || '';

    if (!rpc.length) {
        rpc = clusterApiUrl("devnet")
    }

    const connection = new Connection(rpc, "confirmed");

    return connection;
} */

export function createUmiConnection(): Umi {
    /* const rpc = process.env['READ_API_RPC_DEVNET'] || '';

    if (!rpc.length) {
        throw new Error('Missingn RPC provider endpoint in env variables')
    } */

    const umi = createUmi('https://api.devnet.solana.com')
        .use(mplCore());


    /* const umi = createUmi();
    umi.rpc()
 */
    return umi;
}