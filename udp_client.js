// Example adapted from https://gist.github.com/sid24rane/6e6698e93360f2694e310dd347a2e2eb
// https://gist.github.com/sid24rane

const udp = require('dgram')
const conf = require('./config/config')

// creating a client socket
const client = udp.createSocket('udp4')

//buffer msg
const data = Buffer.from('MSG from UDP client')

client.on('message', (msg, info) => {
    console.log('Data received from server : ' + msg.toString())
    console.log('Received %d bytes from %s:%d\n', msg.length, info.address, info.port)
})

//sending msg
client.send(data, conf.port, conf.host, error => {
    if (error) {
        console.log(error)
        client.close()
    } else {
        console.log('Data sent !!!')
    }
})

const data1 = Buffer.from('hello')
const data2 = Buffer.from('world')

//sending multiple msg
client.send([ data1, data2 ], conf.port, conf.host, error => {

    if(error){
        console.log(error)
        client.close()
    }else{
        console.log('Data sent !!!')
    }
})

setTimeout( () => {
    client.close()
},conf.timeout)