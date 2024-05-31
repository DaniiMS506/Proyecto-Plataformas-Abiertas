<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Prendas e Imágenes</title>
    <style>
        table {
            width: 100%;
            border-collapse: collapse;
        }

        table,
        th,
        td {
            border: 1px solid black;
        }

        th,
        td {
            padding: 8px;
            text-align: left;
        }

        img {
    max-width: 100px; 
    height: auto;
    image-rendering: optimizeSpeed; 
    object-fit: cover; 
    display: block; 
    margin-left: auto; 
    margin-right: auto; 
}

    </style>
    <script>
        function loadPrendas() {
            fetch('prueba.php')
                .then(response => response.json())
                .then(data => {
                    const table = document.getElementById('prendasTable');
                    data.forEach(prenda => {
                        const row = table.insertRow();
                        row.innerHTML = `
                            <td>${prenda.PrendaNombre}</td>
                            <td>${prenda.Cantidad}</td>
                            <td>${prenda.Precio}</td>
                            <td>${prenda.PrendaDescripcion}</td>
                            <td><img src="${prenda.URL}" alt="Imagen de ${prenda.PrendaNombre}"></td>
                            <td>${prenda.ImagenDescripcion}</td>
                        `;
                    });
                })
                .catch(error => console.error('Error:', error));
        }

        document.addEventListener('DOMContentLoaded', loadPrendas);
    </script>
</head>

<body>
    <table id="prendasTable">
        <tr>
            <th>Nombre de la Prenda</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Descripción de la Prenda</th>
            <th>Imagen</th>
            <th>Descripción de la Imagen</th>
        </tr>
    </table>
</body>

</html>