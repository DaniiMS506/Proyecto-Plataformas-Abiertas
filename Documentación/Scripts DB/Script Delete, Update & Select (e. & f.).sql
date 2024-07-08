-- e. Eliminar algun dato:
-- Eliminar un usuario con idUsuario = 5 & Update venta con idUsuario = 5 to Null
UPDATE Venta SET idUsuario = NULL WHERE idUsuario = 5;
DELETE FROM Usuario WHERE idUsuario = 5;

-- f. Actualizar algun dato:
-- Actualizar el precio de la prenda con idPrenda = 1
UPDATE Prenda SET Precio = 98000.00 WHERE idPrenda = 1;

-- Consultar todas las prendas y sus detalles
SELECT * FROM Prenda;
