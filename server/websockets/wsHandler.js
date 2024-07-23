// websocket/wsHandler.js
const wsServer = require('./authenticatedWsServer');

const integrateWsServer = (httpServer) => {
  httpServer.on('upgrade', async (request, socket, head) => {
    try {
      const user = await wsServer.authenticateConnection(request);

      wsServer.handleUpgrade(request, socket, head, (ws) => {
        wsServer.emit('connection', ws, request);
      });
    } catch (err) {
      console.error('WebSocket authentication failed:', err);
      socket.destroy(); // Close the connection if authentication fails
    }
  });
};

module.exports = integrateWsServer;
