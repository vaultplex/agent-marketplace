export interface IAgentRoyalities {
    address: string;
    percentage: number;
}

export interface IAgent {
    agentId: string;
    // gameName: string;
    // gameImage: string;
    // gameDescription: string;
    imageUri: string;
    metadataUri: string;
    collectionUri: string;
    royaltyFee: number;
    creatorAddress: string;
}
