import { getManager } from "typeorm";
import { NodeInfo, SuperResult } from "./data";
import { BTCNodeInfo } from "./BTCNodeInfo";

const officialNode: NodeInfo = {
    peerHost: 'bitcoind.xenon.blockstack.org',
    username: 'blockstack',
    password: 'blockstacksystem',
    rpcPort: 18332,
    peerPort: 18333,
};

export async function getNodeList(data: { network: string }): Promise<SuperResult> {
    const { network } = data;
    let result: SuperResult = { status: 200 }
    switch (network) {
        case 'Xenon': {
            const repository = getManager().getRepository(BTCNodeInfo);
            const queryList = await repository.find();
            let nodeList: NodeInfo[] = [...queryList];
            result.data = nodeList;
            break;
        }
        default: {
            result.status = 500;
            result.message = 'Invalid network type';
        }
    }
    return result;
}

export function addNode(data: NodeInfo): SuperResult {
    let result: SuperResult = { status: 200 };
    let nodeInfo = new BTCNodeInfo();
    nodeInfo.peerHost = data.peerHost;
    nodeInfo.username = data.username;
    nodeInfo.password = data.password;
    nodeInfo.rpcPort = data.rpcPort;
    nodeInfo.peerPort = data.peerPort;
    getManager().save(nodeInfo);
    return result;
}

