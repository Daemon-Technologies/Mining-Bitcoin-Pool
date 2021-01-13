import { getManager } from "typeorm";
import { NodeInfo, SuperResult } from "./data";
import { BTCNodeInfo } from "./BTCNodeInfo";
import * as request from 'request';

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

export async function getBlockchainInfo(data: { url: string }) {
    let result: SuperResult = { status: 200 };
    var options = {
        method: 'POST',
        // url: 'http://daemontech:daemontech@8.210.73.117:18332',
        url: data.url,
        headers:
        {
            'Postman-Token': '8f09b0d9-97b4-40b8-b6df-f3b8b1d9e267',
            'cache-control': 'no-cache',
            'Content-Type': 'application/json'
        },
        body:
        {
            id: 'stacks',
            jsonrpc: '2.0',
            method: 'getblockchaininfo',
            params: []
        },
        json: true,
        timeout: 3000,
    };
    await new Promise(function (resolve, reject) {
        request.post(options, function (error, response, body) {
            if (error) {
                reject(error);
            }
            resolve(body);
        }).on('error', function (e) {
            result.status = 500;
            return result;
        });
    }).then((res: { result: { blocks: number; verificationprogress: string; } }) => {
        if (res.result) {
            result.data = {
                blocks: res.result.blocks,
                verificationprogress: res.result.verificationprogress
            }
        } else {
            result.status = 500;
        }
    }).catch(err => {
        result.status = 500;
    });
    return result;
}

