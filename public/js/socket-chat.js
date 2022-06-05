var socket = io();

const params = new URLSearchParams(window.location.search);

if(!params.has('nombre') || !params.has('sala')){
    window.location = 'index.html';
    throw new Error('El nombre y sala son necesarios');
}

const usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
};

socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('entrarChat',usuario, function(resp){
        console.log('Usuarios conectados', resp);
    })
    
});

// escuchar
socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');
});

//Escuchar Informacion
socket.on('crearMensaje', function(mensaje){
    console.log('Servidor: ', mensaje);
});

//Escuchar cambios de usuarios cuando un usuario entra o sale del chat

socket.on('listaPersonas', function(personas){
    console.log('Personas conectadas', personas);
});

//Mensajes privados
socket.on('mensajePrivado', function(mensaje){
    console.log('Mensaje privado: ', mensaje);
});