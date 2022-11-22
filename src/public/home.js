// inicializamos la conexion
const socketClient = io();

//PRODUCTOS
const productForm = document.getElementById("productForm");
productForm.addEventListener("submit", (event)=>{
    event.preventDefault();
    const product = {
        title: document.getElementById("title").value,
        price: document.getElementById("price").value,
        photo: document.getElementById("photo").value
    }
   
   
    socketClient.emit("newProduct", product);
});

document.addEventListener('DOMContentLoaded', function(){
    let formulario = document.getElementById('productForm');
    formulario.addEventListener('submit', function() {
      formulario.reset();
    });
  });


const productosContainer = document.getElementById("productosContainer");

socketClient.on("productsArray", async(data)=>{
    console.log(data)
    const templateTable = await fetch("./templates/productos.handlebars");
    const templateFormat = await templateTable.text();
    const template = Handlebars.compile(templateFormat);
    const html = template({productos:data});
    productosContainer.innerHTML = html;
})

