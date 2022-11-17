//importo express
const express = require("express");

//se carga el modulo handlebars
const handlebars = require("express-handlebars");

//se carga modulo socket.io
const { Server: IOServer } = require('socket.io');

//se carga modulo Http?
const { Server: HttpServer } = require('http');

//se crea el servidor
const app = express();

//se inicializa la funcion
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

//se levanta el servidor
//ESTE NO app.listen(8080,()=>console.log("server listening on port 8080"));

httpServer.listen(3000, () => console.log('SERVER ON'))


//ajustes
app.use(express.json());
app.use(express.static(__dirname+"/public"));
app.use(express.urlencoded({ extended: true })); 


const path = require("path");
const viewsFolder = path.join(__dirname, "views")
const Contenedor = require("./src/container/contenedor")
const productosService = new Contenedor("productos.txt");




//inicializar motor de plantillas
app.engine("handlebars", handlebars.engine());
//donde estas las vistas del proyecto
app.set("views", viewsFolder);
//que motor de plantillas vamos a utilizar 
app.set("view engine", "handlebars");



//rutas 
//app.get("/", (req, res)=>{
  //  res.render("home")
//})

app.get("/", (req, res) =>{
    res.sendFile('index.html', {root: __dirname })
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




app.get("/contact", (req, res)=>{
    res.render("contacto")
})



io.on('connection', (socket) => {
    console.log('Usuario conectado')
    socket.emit('mi mensaje', 'este es mi mensaje desde el servidor')
})