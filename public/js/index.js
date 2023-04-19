const serverSocket = io('http://localhost:8080/')

Swal.fire({
    title: 'Error!',
    input: 'text',
    inputValidator: (value) => { 
        return !value && "Escribe tu nombre!"
    },
    allowOutsideClick: false
}).then(result =>{
    const InputAutor = document.querySelector('#inputAutor')
    if (!(InputAutor instanceof HTMLInputElement)) return
    InputAutor.value = result.value
})



const plantillaMensajes = `
{{#if hayMensajes}}
<ul>
    {{#each mensajes}}
    <li>({{this.fecha}}) {{this.autor}}: {{this.mensaje}}</li>
    {{/each}}
</ul>
{{else}}
<p>no hay mensajes...</p>
{{/if}}`

const btnEnviar = document.querySelector('#btnEnviar')

if(btnEnviar){
    btnEnviar.addEventListener('click',
    evento => {
        const InputAutor = document.querySelector('#inputAutor')
        const InputMensaje = document.querySelector('#inputMensaje')
        if (InputAutor && InputMensaje){
            const autor = InputAutor.value
            const mensaje = InputMensaje.value
            serverSocket.emit('nuevoMensaje', {autor, mensaje } )
        }
        
    })
}
serverSocket.on('actualizarMensajes', mensajes => {
    const divMensajes = document.querySelector('#mensajes')
    if(divMensajes){
        divMensajes.innerHTML = JSON.stringify(mensajes)
    }
})

