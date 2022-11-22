//importo express
const express = require("express");


//se carga el modulo handlebars
const handlebars = require("express-handlebars");
//se carga modulo socket.io
const { Server } = require('socket.io');

//const Msj = require('./container/mensajes');

const path = require("path");
const viewsFolder = path.join(__dirname, "/views")
const Contenedor = require("./container/contenedor");
const productosService = new Contenedor("productos.txt");
const Msj = require("./container/mensajes");
const ServiceMsj = new Msj("messages.txt");
const { ClientRequest } = require("http");
//servidor de express
const app = express();
const server = app.listen(8080,()=>console.log("server listening on port 8080"));





//NO BORRAR TODAVIA
//se inicializa la funcion
//const httpServer = new HttpServer(app);
//const io = new IOServer(httpServer);
//se carga modulo Http?
//const { Server: HttpServer } = require('http');
//httpServer.listen(3000, () => console.log('SERVER ON'))





//ajustes
app.use(express.json());
app.use(express.static(__dirname+"/public"));
app.use(express.urlencoded({extended:true})); 




//vamos a inicializar nuestro motor de plantillas.
app.engine("handlebars",handlebars.engine());
//donde tengo las vistas en mi proyecto
app.set("views", viewsFolder);
//que motor de plantillas voy a utilizar
app.set("view engine", "handlebars");


const mensajes = [];
//socket del lado del backend
const io = new Server(server);
io.on("connection", async(socket)=>{
    console.log("nuevo cliente conectado");

//PRODUCTOS
    socket.emit("productsArray", await productosService.getAll());
    socket.on("newProduct", async(data)=>{
        await productosService.save(data);
        io.sockets.emit("productsArray", await productosService.getAll());
    })
//MENSAJES
socket.emit("mensajesActualizados", await ServiceMsj.getMensajes());
    socket.on("nuevoMensaje", async(data)=>{
        await ServiceMsj.guardar(data);
        io.sockets.emit("mensajesActualizados", await ServiceMsj.getMensajes());
    })
})




//rutas 
app.get("/",(req, res)=>{
    res.render("home")
})


app.get("/mensajes",(req, res)=>{
    res.render("mensajes")
})



app.get("/productos", async(req, res)=>{
    const productos = await productosService.getAll();
    console.log(productos)
    res.render("productos", {
        productos:productos
    })
})
 

app.post("/productos",async(req, res)=>{
  const newProduct = req.body;
  await productosService.save(newProduct);
  res.redirect("/");
})

app.get("/mensajes", async(req, res)=>{
    const productos = await ServiceMsj.getMensajes();
    console.log(productos)
    res.render("productos", {
        productos:productos
    })
})
 

app.post("/mensajes",async(req, res)=>{
  const newMensaje = req.body;
  await ServiceMsj.guardar(newMensaje);
  res.redirect("/");
})






