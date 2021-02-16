import request from 'umi-request';
import { NodeInfo } from './data';

export async function queryNodeList() {
  return request('http://localhost:28888/allNode', {
    method: 'GET',
  });
}

export async function addNodeInfo(params: NodeInfo) {
  return request('http://localhost:28888/addNode', {
    method: 'POST',
    data: params,
  })
}

export async function getNodeBlockInfo(url: string) {
  return request('http://localhost:28888/getBlockchainInfo', {
    method: 'POST',
    data: { url },
  });
}

export async function importAddress(data: { url: string, btcAddress: string }) {
  return request('http://localhost:28888/importAddress', {
    method: 'POST',
    data: {
      url: data.url,
      btcAddress: data.btcAddress,
    }
  })
}
