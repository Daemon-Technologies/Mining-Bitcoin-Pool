import request from "request"
export function importaddressRPC(address){
    return new Promise(function(resolve, reject){
        request.post('http://bitcoind.krypton.blockstack.org:18443', 
            {json:{"id":"stacks",
                "jsonrpc":"2.0",
                "method":"importaddress",
                "params":[ address, "testing" , false ]}}, function (err, response, body) {
                    if (err) {
                        reject(console.error('rpc call failed:', err));
                    }
                    console.log( "importaddress rpc call succeed, body is :", body);
                    console.log("sleep for 15 seconds to import address in bitcoin node")
                    setTimeout(function(){
                        resolve(body)
                    },15000)
                    
                })
    })
}

export function getBlockchainInfo(){

    var options = { method: 'POST',
        url: 'http://daemontech:daemontech@8.210.73.117:18332',
        headers: 
        { 'Postman-Token': '8f09b0d9-97b4-40b8-b6df-f3b8b1d9e267',
            'cache-control': 'no-cache',
            'Content-Type': 'application/json' },
        body: 
        { id: 'stacks',
            jsonrpc: '2.0',
            method: 'getblockchaininfo',
            params: [] },
        json: true 
    };
    console.log("in")
    request.post(options, function (error, response, body) {
        if (error) throw new Error(error);
            console.log(body);
        console.log(body)
    });
}

(async () => {
    var options = { method: 'POST',
        url: 'http://daemontech:daemontech@8.210.73.117:18332',
        headers: 
        { 'Postman-Token': '8f09b0d9-97b4-40b8-b6df-f3b8b1d9e267',
            'cache-control': 'no-cache',
            'Content-Type': 'application/json' },
        body: 
        { id: 'stacks',
            jsonrpc: '2.0',
            method: 'getblockchaininfo',
            params: [] },
        json: true 
    };
  
    const result = await request.post(options);
  })()