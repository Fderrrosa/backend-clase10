//importo express
const express = require("express");

//se carga el modulo handlebars
const handlebars = require("express-handlebars");
//se carga modulo socket.io
const { Server } = require('socket.io');

const path = require("path");
const viewsFolder = path.join(__dirname, "/src/views")
const Contenedor = require("./src/container/contenedor")
const productosService = new Contenedor("productos.txt");

//servidor de express
const app = express();
const server = app.listen(8080,()=>console.log("server listening on port 8080"));


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



//socket del lado del backend
const io = new Server(server);
io.on("connection", (socket)=>{
    console.log("nuevo cliente conectado");


    //cada vez que el socket se conecte le enviamos los productos
    io.sockets.emit("productsArray", { productosService: prod.getAll()});

    //recibir el producto
    socket.on("newProduct", (data)=>{
        //data es el producto que recibo del formulario
        productosService.save(data);
        console.log(data);
        //enviar todos los productos actualizados
        io.sockets.emit("productsArray", { productosService: prod.getAll()});
    })
})




//rutas 
app.get("/",(req, res)=>{
    res.render("home")
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





