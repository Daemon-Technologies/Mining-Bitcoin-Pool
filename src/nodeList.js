

const officialNode = {
    peerHost: 'bitcoind.xenon.blockstack.org',
    username: 'blockstack',
    password: 'blockstacksystem',
    rpcPort: 18332,
    peerPort: 18333,
};

export function getNodeList(data){
    const { network } = data;
    let result= { status: 200 }
    switch (network) {
        case 'Xenon': {
            const nodeInfo = [officialNode];
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