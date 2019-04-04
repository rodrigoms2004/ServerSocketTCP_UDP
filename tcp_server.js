const net = require('net')
const conf = require('./config/config')

const {
    log
} = require('./util/loggerTool')

var server = net.createServer( socket => {
	socket.write('Echo server\r\n')
	socket.pipe(socket)
})

server.listen(conf.port, conf.serverHost)