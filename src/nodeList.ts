import { getManager } from "typeorm";
import { NodeInfo, SuperResult } from "./data";
import { BTCNodeInfo } from "./BTCNodeInfo";

const officialNode: NodeInfo = {
    network: 1,
    peerHost: 'bitcoind.xenon.blockstack.org',
    username: 'blockstack',
    password: 'blockstacksystem',
    rpcPort: 18332,
    peerPort: 18333,
};

export async function getAllNodeInfo(): Promise<SuperResult> {
    let result: SuperResult = { status: 200 };
    const repository = getManager().getRepository(BTCNodeInfo);
    const queryList = await repository.find();
    let nodeList: NodeInfo[] = [...queryList];
    result.data = nodeList;
    return result;
}

export async function getNodeList(data: { network: string }): Promise<SuperResult> {
    const { network } = data;
    let result: SuperResult = { status: 200 };
    switch (network) {
        case 'Xenon': {
            const repository = getManager().getRepository(BTCNodeInfo);
            const queryList = await repository.find({ network: 1 });
            let nodeList: NodeInfo[] = [...queryList];
            result.data = nodeList;
            break;
        }
        case 'Mainnet': {
            const repository = getManager().getRepository(BTCNodeInfo);
            const queryList = await repository.find({ network: 0 });
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
    nodeInfo.network = data.network;
    nodeInfo.peerHost = data.peerHost;
    nodeInfo.username = data.username;
    nodeInfo.password = data.password;
    nodeInfo.rpcPort = data.rpcPort;
    nodeInfo.peerPort = data.peerPort;
    getManager().save(nodeInfo);
    return result;
}

export async function deleteNode(data: { peerHost: string }) {
    let result: SuperResult = { status: 200 };
    const repository = getManager().getRepository(BTCNodeInfo);
    const nodeInfo = await repository.findOne({ peerHost: data.peerHost });
    if (!nodeInfo) {
        result.status = 500;
        result.message = "data not exist";
        return result;
    }
    const res = await repository.remove(nodeInfo);
    return result;
}

