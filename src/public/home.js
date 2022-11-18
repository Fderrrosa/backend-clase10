// inicializamos la conexion
const socket = io.connect();

socket.on("products list", (data) => {
  console.log("products list", data);
});

const $titleData = document.getElementById("title");
const $priceData = document.getElementById("price");
const $photoData = document.getElementById("photo");
const $getAll = document.getElementById("getAll");
const $table = document.getElementById("table");



const template = Handlebars.compile(`
<div class="table-responsive">
    <table class="table table-dark">
        <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Photo</th>
        </tr>
        {{#each products}}
        <tr>
            <td>{{this.title}}</td>
            <td>'$'{{this.price}}</td>
            <td><img width="50" src={{this.photo}} alt="sin imagen"></td>
        </tr>
        {{/each}}
    </table>
</div>
`);

socket.on("productsArray", (data) => {
    console.log("--->",data)
  $("#table").html(
    template({  products: data.products })
  );
});

// Cuando el usuario haga click en el boton se envia el socket con el mensaje del input
const addProduct = () => {
  const data = {
    title: $titleData.value,
    price: $priceData.value,
    photo: $photoData.value
  };
  socket.emit("newProduct", data);
};

$addList.addEventListener("click", addProduct);