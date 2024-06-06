-- i.
CREATE VIEW MarcasConVentas AS
SELECT DISTINCT M.Nombre, M.Descripcion
FROM Marca M
JOIN Prenda P ON M.idMarca = P.idMarca
JOIN DetalleVenta DV ON P.idPrenda = DV.idPrenda;

-- ii.
CREATE VIEW PrendasVendidasYStock AS
SELECT P.Nombre, P.Cantidad AS Stock, SUM(DV.Cantidad) AS CantidadVendida
FROM Prenda P
JOIN DetalleVenta DV ON P.idPrenda = DV.idPrenda
GROUP BY P.Nombre, P.Cantidad;

-- iii. 
CREATE VIEW Top5MarcasMasVendidas AS
SELECT M.Nombre, COUNT(DV.idDetalleVenta) AS CantidadVentas
FROM Marca M
JOIN Prenda P ON M.idMarca = P.idMarca
JOIN DetalleVenta DV ON P.idPrenda = DV.idPrenda
GROUP BY M.Nombre
ORDER BY CantidadVentas DESC
LIMIT 5;
