-- Eliminar un usuario con idUsuario = 2 contemplando las FK's
DELETE DV FROM DetalleVenta DV
JOIN Venta V ON DV.idVenta = V.idVenta
WHERE V.idUsuario = 2;

DELETE FROM Venta WHERE idUsuario = 2;

DELETE FROM DatosUsuario WHERE idUsuario = 2;

DELETE FROM Usuario WHERE idUsuario = 2;

-- Actualizar el precio de la prenda con idPrenda = 1
UPDATE Prenda SET Precio = 130.00 WHERE idPrenda = 1;

-- Consultar todas las prendas y sus detalles
SELECT * FROM Prenda;
