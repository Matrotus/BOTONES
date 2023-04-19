import express from 'express'
import { engine } from 'express-handlebars'
import { Server as SocketIOServer } from 'socket.io'
import {FileManager} from './FileManager.js'

const mensajesManager = new FileManager('./localStorage/mensajes.json')

const app = express()

app.engine('handlebars', engine())
app.set('views', './views')
app.set('view engine', 'handlebars')

app.use(express.static('./public'))


const httpServer = app.listen(8080)
// lo mismo que me devuelve el http.createServer()  !!!

const io = new SocketIOServer(httpServer)

io.on('connection', async clientSocket => {
    console.log(`nuevo cliente conectado! socket id #${clientSocket.id} `)
    
    //manejador/controller de recibir mensajes
    clientSocket.on('nuevoMensaje', async mensaje => {
        // console.log(`#${clientSocket.id} dice:`)
        // console.log(mensaje)
        await mensajesManager.guardarCosa({
            fecha: new Date().toLocaleString(),
            ...mensaje
        })
        io.sockets.emit('actualizarMensajes', await mensajesManager.buscarCosas())
    })
        io.sockets.emit('actualizarMensajes', await mensajesManager.buscarCosas())
})

app.get('/', async (req, res) =>{

    const mensajes = await mensajesManager.buscarCosas()
    res.render('mensajes', {
        hayMensajes: mensajes.length > 0,
        mensajes
    })
})