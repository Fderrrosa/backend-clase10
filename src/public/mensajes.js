const socket = io() // apunta al localhost:8080

function mostrarMensajes(mensajes) {
    const mensajesParaMostrar = mensajes.map(({ name, email, texto }) => {
        return `<li>${name}- ${email}: ${texto}</li>`
    })

    const mensajesHtml = `
<ul>
${mensajesParaMostrar.join('\n')}
</ul>`

    const listaMensajes = document.getElementById('listaMensajes')
    listaMensajes.innerHTML = mensajesHtml

    // console.table(mensajesParaMostrar)
}

socket.on('mensajesActualizados', mensajes => {
    mostrarMensajes(mensajes)
})

const botonEnviar = document.getElementById('botonEnviar')

botonEnviar.addEventListener('click', e => {
    const inputName = document.getElementById('inputName')
    const inputEmail = document.getElementById('inputEmail')
    const inputMensaje = document.getElementById('inputMensaje')
    
    if (inputEmail.value && inputMensaje.value && inputName.value ) {
        const mensaje = {
            email: inputEmail.value,
            texto: inputMensaje.value,
            texto: inputName.value
        }
        socket.emit('nuevoMensaje', mensaje)
    } else {
        alert('ingrese algun mensaje')
    }
})
document.addEventListener('DOMContentLoaded', function(){
    let formulario = document.getElementById('productForm');
    formulario.addEventListener('submit', function() {
      formulario.reset();
    });
  });