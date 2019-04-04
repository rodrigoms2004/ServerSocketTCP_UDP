// Example adapted from https://gist.github.com/sid24rane/6e6698e93360f2694e310dd347a2e2eb
// https://gist.github.com/sid24rane

const udp = require('dgram')
const conf = require('./config/config')

const {
    log
} = require('./util/loggerTool')

// --------------------creating a udp server --------------------

// creating a udp server
const server = udp.createSocket('udp4')

// emits when any error occurs
server.on('error', (error) => {
    // console.log('Error: ' + error)
    log("udp_server", "error", error)
    server.close()
})

// emits on new datagram msg
server.on('message', (msg,info) => {
    log("udp_server", 
        "info", msg.toString() + ` | Received ${msg.length} bytes from ${info.address}:${info.port}`)

    // console.log('Data received from client : ' + msg.toString())
    // console.log('Received %d bytes from %s:%d\n',msg.length, info.address, info.port)

    let timestp = new Date()
    const response = {
        description: 'UDP PORT TEST BY RMS Math',
        serverPort: conf.port,
        timestamp: timestp.toJSON(),
        received: {
            message: msg.toString(),
            fromIP: info.address,
            fromPort: info.port
        }
    }
    const data = Buffer.from(JSON.stringify(response))

    //sending msg
    server.send(data, info.port, info.address, (error, bytes) => {
        if(error){
            log("udp_server", "error", error)
            client.close()
        } else {
            log("udp_server", "info", 'Data sent !!!')
            // console.log('Data sent !!!')
        }    
    })
})  // end server.on


//emits when socket is ready and listening for datagram msgs
server.on('listening', () => {
    const address = server.address()
    const port = address.port
    const family = address.family
    const ipaddr = address.address

    log("udp_server", "info", 'Server is listening at port ' + port)
    log("udp_server", "info", 'Server ip :' + ipaddr)
    log("udp_server", "info", 'Server is IP4/IP6 : ' + family)

    // console.log('Server is listening at port ' + port)
    // console.log('Server ip :' + ipaddr)
    // console.log('Server is IP4/IP6 : ' + family)
})

//emits after the socket is closed using socket.close()
server.on('close', () => {

    log("udp_server", "info", 'Socket is closed !')

    console.log('Socket is closed !')
})

server.bind(conf.port)

// setTimeout( () => {
//     server.close()
// }, conf.timeout)