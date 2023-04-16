import express from 'express'
import { Server as SocketIOServer } from 'socket.io'


const app = express()

app.use(express.static('./public'))


const httpServer = app.listen(8080)
// lo mismo que me devuelve el http.createServer()  !!!

const io = new SocketIOServer(httpServer)

io.on('connection', clientSocket => {
    console.log(`nuevo cliente conectado! socket id #${clientSocket.id} `)
    clientSocket.emit('mensajito', { hola: 'mundo'})

})