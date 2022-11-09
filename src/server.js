//importo express
const express = require("express");

//se carga el modulo handlebars
const handlebars = require("express-handlebars");

//se crea el servidor
const app = express();

//se levanta el servidor
app.listen(8080,()=>console.log("server listening on port 8080"));


//ajustes
app.use(express.json());
app.use(express.static(__dirname+"/public"));
app.use(express.urlencoded({ extended: true })); 


const path = require("path");
const viewsFolder = path.join(__dirname, "views")
const Contenedor = require("./container/contenedor")
const productosService = new Contenedor("productos.txt");




//inicializar motor de plantillas
app.engine("handlebars", handlebars.engine());
//donde estas las vistas del proyecto
app.set("views", viewsFolder);
//que motor de plantillas vamos a utilizar 
app.set("view engine", "handlebars");



//rutas 
app.get("/", (req, res)=>{
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




app.get("/contact", (req, res)=>{
    res.render("contacto")
})