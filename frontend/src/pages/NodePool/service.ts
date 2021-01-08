import request from 'umi-request';
import { NodeInfo } from './data';

export async function queryNodeList() {
  return request('http://localhost:28888/nodeList', {
    method: 'POST',
    data: {
      network: 'Xenon',
    }
  });
}

export async function addNodeInfo(params: NodeInfo) {
  return request('http://localhost:28888/addNode', {
    method: 'POST',
    data: params,
  })
}

export async function getNodeBlockInfo(url: string, auth: string) {
  const reqData = {
    id: 'stacks',
    jsonrpc: '2.0',
    method: 'getblockchaininfo',
  };
  return await request(url, {
    method: 'POST',
    headers: {
      Authorization: auth,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    data: reqData,
  });
}
