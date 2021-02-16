export interface SuperResult {
    status: number;
    message?: string;
    data?: any;
}

export interface NodeInfo {
    network: number;
    peerHost: string;
    username: string;
    password: string;
    rpcPort: number;
    peerPort: number;
}