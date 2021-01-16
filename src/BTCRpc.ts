import { SuperResult } from "./data";
import * as request from 'request';

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

export async function importaddressRPC(data: { url: string, btcAddress: string }) {
    let result: SuperResult = { status: 200 };
    // const url = 'http://bitcoind.krypton.blockstack.org:18443';
    const url = data.url;
    const address = data.btcAddress;
    const options = {
        method: 'POST',
        // url: 'http://daemontech:daemontech@8.210.73.117:18332',
        url: url,
        headers:
        {
            'cache-control': 'no-cache',
            'Content-Type': 'application/json'
        },
        body:
        {
            "id": "stacks",
            "jsonrpc": "2.0",
            "method": "importaddress",
            "params": [address, "testing", false]
        },
        json: true,
        timeout: 3000,
    }
    return new Promise(function (resolve, reject) {
        request.post(options, function (err, response, body) {
            if (err) {
                reject(console.error('rpc call failed:', err));
            }
            console.log("importaddress rpc call succeed, body is :", body);
            console.log("sleep for 15 seconds to import address in bitcoin node")
            setTimeout(function () {
                resolve(body)
            }, 15000)
        })
    }).catch(err => {
        result.status = 500;
    });
}