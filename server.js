const express= require('express');
const app = express();
const request = require('request');

app.get('/sendfrom',(req,res)=>{
    // headers={"Content-type": "application/json"};
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
            txid=JSON.parse(data)
            res.send(txid.result)
         }else{
             console.log('err')
            console.log(err)
             res.send(err)
         }
    }
    request(options,callback);
    
})

app.get('/',(req,res)=>{
    res.send('hello world')
})

app.listen(3000,()=>{
    console.log('server port 3000')
})