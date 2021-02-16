import * as express from 'express';
import * as bodyParser from 'body-parser';
import { SuperResult } from './src/data';
import { addNode, deleteNode, getAllNodeInfo, getNodeList } from './src/nodeList';
import 'reflect-metadata';
import { createConnection } from "typeorm";
import * as path from 'path';
import { BTCNodeInfo } from './src/BTCNodeInfo';
import { getBlockchainInfo, importaddressRPC } from './src/BTCRpc';

const app = express();
const clientApp = express();
const port = 28888;

app.use(bodyParser.json());

app.all("*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", req.headers.origin || '*');
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", 'true');
    if (req.method == 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

app.get('/', (_, res) => {
    let result: SuperResult = { status: 200, data: "node-list server is online" }
    res.send(result);
});

app.post('/nodeList', async (req, res) => {
    if (req.body) {
        const nodeListRes = await getNodeList(req.body);
        res.send(nodeListRes);
    } else {
        const result: SuperResult = { status: 500, message: 'param error' };
        res.send(result);
    }
});

app.get('/allNode', async (_, res) => {
    const nodeListRes = await getAllNodeInfo();
    res.send(nodeListRes);
});

app.post('/addNode', (req, res) => {
    if (req.body) {
        const addRes = addNode(req.body);
        res.send(addRes);
    } else {
        const result: SuperResult = { status: 500, message: 'param error' };
        res.send(result);
    }
});

app.post('/deleteNode', async (req, res) => {
    if (req.body) {
        const delRes = await deleteNode(req.body);
        res.send(delRes);
    } else {
        const result: SuperResult = { status: 500, message: 'param error' };
        res.send(result);
    }
})

app.post('/getBlockchainInfo', async (req, res) => {
    if (req.body) {
        const blockchainInfo = await getBlockchainInfo(req.body);
        res.send(blockchainInfo);
    } else {
        const result: SuperResult = { status: 500, message: 'param error' };
        res.send(result);
    }
})

app.post('/importAddress', async (req, res) => {
    if (req.body) {
        const importAddressRes = await importaddressRPC(req.body);
        res.send(importAddressRes);
    } else {
        const result: SuperResult = { status: 500, message: 'param error' };
        res.send(result);
    }
})

app.listen(port, () => {
    console.log(`Node-List app listening at http://localhost:${port}`);
});

clientApp.all("*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", req.headers.origin || '*');
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    if (req.method == 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

clientApp.listen(8000, () => {
    console.log(`Bitcoin-Pool Client listening at http://localhost:8000`)
});

clientApp.use(express.static('dist'));

clientApp.get('/*', function (req, res) {
    res.sendFile('dist/index.html', { root: '.' });
});

createConnection({
    type: 'sqlite',
    database: path.resolve(__dirname, './pool.sqlite'),
    entities: [
        BTCNodeInfo
    ],
    synchronize: true,
}).then(async connection => {
    console.log('连接成功')
}).catch(err => {
    console.log('连接失败', err)
})