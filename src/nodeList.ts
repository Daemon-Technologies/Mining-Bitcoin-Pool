import { NodeInfo, SuperResult } from "./data";

const officialNode: NodeInfo = {
    peerHost: 'bitcoind.xenon.blockstack.org',
    username: 'blockstack',
    password: 'blockstacksystem',
    rpcPort: 18332,
    peerPort: 18333,
};

export function getNodeList(data: { network: string }): SuperResult {
    const { network } = data;
    let result: SuperResult = { status: 200 }
    switch (network) {
        case 'Xenon': {
            const nodeInfo: NodeInfo[] = [officialNode];
            result.data = nodeInfo;
            break;
        }
        default: {
            result.status = 500;
            result.message = 'Invalid network type';
        }
    }
    return result;
}