// Llenado dinámico de Tabla Reporte de Ventas
document.addEventListener("DOMContentLoaded", function () {
    // Cargar VENTAS
    fetch("http://localhost/Proyecto%20Desarrollo%20con%20Plataformas%20Abiertas/Proyecto/API's/Public/index.php/Venta")
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('TablaRepVentas');
            let count = 1;  // Inicializa el contador
            data.forEach(row => {
                const tr = document.createElement('tr');
                tr.innerHTML = `<td>${count}</td><td>${row.idUsuario}</td><td>${row.idPrenda}</td><td>${row.Cantidad}</td><td>${row.Fecha}</td><td>${row.Descripcion}</td><td>${row.Total}</td>`;
                tableBody.appendChild(tr);
                count++;  // Incrementa el contador
            });
        })
        .catch(error => console.error('Error:', error));
});


// Paginación Dinámica
document.addEventListener("DOMContentLoaded", function () {
    const registrosPorPagina = 12;
    let paginaActual = 1;
    let ventas = [];

    function mostrarPagina(pagina) {
        const tableBody = document.getElementById('TablaRepVentas');
        tableBody.innerHTML = '';
        const inicio = (pagina - 1) * registrosPorPagina;
        const fin = inicio + registrosPorPagina;
        const registrosPagina = ventas.slice(inicio, fin);

        registrosPagina.forEach((row, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td>${inicio + index + 1}</td><td>${row.idUsuario}</td><td>${row.idPrenda}</td><td>${row.Cantidad}</td><td>${row.Fecha}</td><td>${row.Descripcion}</td><td>${row.Total}</td>`;
            tableBody.appendChild(tr);
        });

        actualizarPaginacion();
    }

    function actualizarPaginacion() {
        const totalPaginas = Math.ceil(ventas.length / registrosPorPagina);
        const pagination = document.getElementById('pagination');
        pagination.innerHTML = '';

        for (let i = 1; i <= totalPaginas; i++) {
            const li = document.createElement('li');
            li.className = 'page-item' + (i === paginaActual ? ' active' : '');
            const a = document.createElement('a');
            a.className = 'page-link';
            a.href = '#';
            a.textContent = i;
            a.addEventListener('click', function (e) {
                e.preventDefault();
                paginaActual = i;
                mostrarPagina(paginaActual);
            });
            li.appendChild(a);
            pagination.appendChild(li);
        }
    }

    fetch("http://localhost/Proyecto%20Desarrollo%20con%20Plataformas%20Abiertas/Proyecto/API's/Public/index.php/Venta")
        .then(response => response.json())
        .then(data => {
            ventas = data;
            mostrarPagina(paginaActual);
        })
        .catch(error => console.error('Error:', error));
});