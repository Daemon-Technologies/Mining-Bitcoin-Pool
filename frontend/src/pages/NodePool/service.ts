import { request } from 'umi';
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
