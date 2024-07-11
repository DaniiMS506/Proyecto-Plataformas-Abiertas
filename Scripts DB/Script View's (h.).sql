-- i.
CREATE VIEW MarcasConVentas AS
SELECT 
    M.idMarca, 
    M.Nombre, 
    SUM(V.Cantidad) AS Total_Ventas
FROM 
    Marca M
INNER JOIN 
    Prenda P ON M.idMarca = P.idMarca
LEFT JOIN 
    Venta V ON P.idPrenda = V.idPrenda
GROUP BY 
    M.idMarca, M.Nombre
HAVING 
    SUM(V.Cantidad) > 0;


-- ii.
CREATE VIEW PrendasConStock AS
SELECT P.idPrenda, P.Nombre, P.Cantidad AS Stock_Restante, IFNULL(SUM(V.Cantidad), 0) AS Cantidad_Vendida
FROM Prenda P
LEFT JOIN Venta V ON P.idPrenda = V.idPrenda
GROUP BY P.idPrenda, P.Nombre, P.Cantidad;

-- iii. 
CREATE VIEW Top5MarcasVendidas AS
SELECT M.Nombre AS Marca, COUNT(V.idVenta) AS Cantidad_Ventas
FROM Marca M
INNER JOIN Prenda P ON M.idMarca = P.idMarca
INNER JOIN Venta V ON P.idPrenda = V.idPrenda
GROUP BY M.idMarca
ORDER BY Cantidad_Ventas DESC
LIMIT 5;
