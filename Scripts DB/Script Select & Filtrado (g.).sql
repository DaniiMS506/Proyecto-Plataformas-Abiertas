-- Consultar todas las prendas y sus detalles
SELECT * FROM Prenda;

-- Filtrar por la fecha '2023-05-20'
SELECT idPrenda, SUM(Cantidad) AS Cantidad_Vendida
FROM Venta
WHERE Fecha = '2024-06-11'
GROUP BY idPrenda;