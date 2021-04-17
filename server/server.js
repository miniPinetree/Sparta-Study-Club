const app = require('express')();
const http = require('http').createServer(app);
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

//클라이언트가 접속했을 떄 처리하는 이벤트 메소드
wss.on('connection', function connection(ws) {
  //메시지 수신 시 호출되는 이벤트 메소드
  ws.on('message', function incoming(data) {
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
        // console.log('data', data);
      }
    });
  });
  ws.on('error', function(error){
    console.log('connection error'+error);
  })
  ws.on('close', function(){
    console.log('close');
  })
});
http.listen(8080, () => {
	console.log('run Server at http://localhost:8080/');
});