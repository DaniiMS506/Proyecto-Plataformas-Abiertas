-- Consultar todas las prendas y sus detalles
SELECT * FROM Prenda;

-- Filtrar por la fecha '2023-05-20'
SELECT V.Fecha, P.Nombre, SUM(DV.Cantidad) AS CantidadVendida
FROM Venta V
JOIN DetalleVenta DV ON V.idVenta = DV.idVenta
JOIN Prenda P ON DV.idPrenda = P.idPrenda
WHERE V.Fecha = '2023-05-20'
GROUP BY V.Fecha, P.Nombre;
