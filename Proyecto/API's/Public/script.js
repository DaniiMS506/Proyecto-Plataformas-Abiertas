/* Enlace de la API: https://fakestoreapi.com/docs */

//Funcion para optener productos
function getCharacters(done) {
    const results = fetch("https://fakestoreapi.com/products");

    //Obtener los datos
    results.then(response => response.json())
        .then(data => {
            //Llamar el callback y pasar los datos obtenidos
            done(data)
        });
}

//Llamar funcion
getCharacters(data => {
    //console.log(data); /*prueba de llegada de datos en la consola*/

    //////// Uso de los datos de la API \\\\\\\\

    // Filtrar solo productos de ropa
    const ropa = data.filter(producto => 
        producto.category === "men's clothing" || producto.category === "women's clothing"
    );

    //recorrer cada producto
    ropa.forEach(producto => {
        //Crear el html con datos de la API
        const article = document.createRange().createContextualFragment(/* html*/
            `
            <article>
                <div class="image-container">
                    <img src="${producto.image}" alt="Articulo">
                </div>
                <h2>${producto.title}</h2>
                <span>$${producto.price}</span>
            </article>

            `);

            //Mostrar los datos creados en el JS al HTML
            const main = document.querySelector("main");
            main.append(article);
    });
});