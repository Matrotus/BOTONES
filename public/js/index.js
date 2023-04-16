const Serversocket = io('http://localhost:8080/')





// const btnPresioname = document.querySelector('#btnPresioname')

// if(btnPresioname){
//     btnPresioname.addEventListener('click',
//     evento => {
//     })
// }
Serversocket.on('mensajito', datosAdjuntos => {
    console.log(datosAdjuntos)
})