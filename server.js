const express= require('express');
const app = express();
const request = require('request');

app.get('/sendfrom',async (req,res)=>{
    // headers={"Content-type": "application/json"};
    await rpc().then(data=>{
        console.log('result',data);
        res.send(data);
    })
    // console.log('results');
    // console.log(results)
    // res.send(results);
    
})

app.get('/gettransaction',async(req,res)=>{
    await rpc2().then(data2=>{
        console.log(data2);
        res.send(data1)
    })
})

async function  rpc(){
    headers={"Content-type": "text/plain"};
    body=`{"method":"sendfrom","params":["groot1@naver.com","g2wynHtq89Lx8TMVPQmhYhpgDMhhWZmj8e",1]}`;
    //params:["보내는 계정 이름","받는 지갑 주소",보내는 코인의 양]
    const USER=process.env.RPC_USER || 'groot1';
    const PASS = process.env.RPC_PASSWORD || '1234';
    const RPCPORT= process.env.RPC_PORT || 3010;
    const options={
        url:`http://groot1:1234@127.0.0.1:3010`,
        method:"POST",
        headers,
        body
    }
    let txid;
    const callback = (err,response,data)=>{
        console.log('aaaaaa')
         if(err==null && response.statusCode ==200) {
            console.log('data')
            console.log(data)
            txid=JSON.parse(data)
         }else{
             console.log('err')
            console.log(err)
         }
         
    }
    request(options,callback);
    console.log('request끝나고',typeof result)
}
async function  rpc2(){
    headers={"Content-type": "json/application"};
    body=`{"method":"gettransaction","params":["437f598bea7edf9de8bd21f4a8e011da6966fc6e9c98a2c1088ecd7252609ca9"]}`;
    //params:txid값
    const USER=process.env.RPC_USER || 'groot1';
    const PASS = process.env.RPC_PASSWORD || '1234';
    const RPCPORT= process.env.RPC_PORT || 3010;
    const options={
        url:`http://groot1:1234@127.0.0.1:3010`,
        method:"POST",
        headers,
        body
    }
    let txid;
    const callback = (err,response,data)=>{
        console.log('aaaaaa')
         if(err==null && response.statusCode ==200) {
            console.log('data')
            if(JSON.parse(data).result.confirmations>0){
                console.log(JSON.parse(data).result.confirmations)
            }
         }else{
             console.log('err')
         }
         
    }
    const aaa= await request(options,callback);
    console.log('request끝나고',typeof result)
    return aaa;
}


app.get('/',(req,res)=>{
    res.send('hello world')
})

app.listen(3000,()=>{
    console.log('server port 3000')
})