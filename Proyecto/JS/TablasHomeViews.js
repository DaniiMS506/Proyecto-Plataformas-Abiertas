// Obtener View Todas las Marcas con al menos 1 Venta
document.addEventListener("DOMContentLoaded", function () {
    fetch("http://localhost/Proyecto%20Desarrollo%20con%20Plataformas%20Abiertas/Proyecto/API's/Public/index.php/MarcaConVentas")
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('sales-table-body');
            data.forEach(row => {
                const tr = document.createElement('tr');
                tr.innerHTML = `<td>${row.Nombre}</td><td>${row.Total_Ventas}</td>`;
                tableBody.appendChild(tr);
            });
        })
        .catch(error => console.error('Error:', error));
});


// Obtener View Top 5 Marcas Vendidas 
document.addEventListener("DOMContentLoaded", function () {
    fetch("http://localhost/Proyecto%20Desarrollo%20con%20Plataformas%20Abiertas/Proyecto/API's/Public/index.php/Top5MarcasVendidas")
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('recent-sales-body');
            data.forEach(row => {
                const tr = document.createElement('tr');
                tr.innerHTML = `<td>${row.Marca}</td><td>${row.Cantidad_Ventas}</td>`;
                tableBody.appendChild(tr);
            });
        })
        .catch(error => console.error('Error:', error));
});


// Obtener View Prendas con Stock
document.addEventListener("DOMContentLoaded", function () {
    fetch("http://localhost/Proyecto%20Desarrollo%20con%20Plataformas%20Abiertas/Proyecto/API's/Public/index.php/PrendasConStock")
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('recent-products-body');
            data.forEach(row => {
                const tr = document.createElement('tr');
                tr.innerHTML = `<td>${row.Nombre}</td><td>${row.Stock_Restante}</td><td>${row.Cantidad_Vendida}</td>`;
                tableBody.appendChild(tr);
            });
        })
        .catch(error => console.error('Error:', error));
});