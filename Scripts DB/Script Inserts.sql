-- Inserciones para la tabla Marca
INSERT INTO Marca (Nombre, Descripcion) VALUES 
('Nike', 'Marca deportiva de renombre internacional.'),
('Adidas', 'Marca alemana conocida por sus productos deportivos.'),
('Puma', 'Marca deportiva y de moda casual.'),
('Levi\'s', 'Marca americana famosa por sus jeans.'),
('Zara', 'Marca española de ropa y accesorios.');

-- Inserciones para la tabla Prenda
INSERT INTO Prenda (Nombre, Cantidad, Precio, Descripcion, Imagen, idMarca) VALUES 
('Nike Air Jordan 1', 50, 90000.00, 'Zapatillas deportivas de baloncesto.', LOAD_FILE('C:/xampp/htdocs/Proyecto Desarrollo con Plataformas Abiertas/Proyecto/IMG/Prendas/NikeAirJordan1.jpg'), 1),
('Nike Air Force 1', 60, 60000.00, 'Zapatillas clásicas de Nike.', LOAD_FILE('C:/xampp/htdocs/Proyecto Desarrollo con Plataformas Abiertas/Proyecto/IMG/Prendas/NikeAirForce1.jpg'), 1),
('Adidas Ultraboost', 40, 108000.00, 'Zapatillas de running con máxima amortiguación.', LOAD_FILE('C:/xampp/htdocs/Proyecto Desarrollo con Plataformas Abiertas/Proyecto/IMG/Prendas/AdidasUltraboost.avif'), 2),
('Puma Suede Classic', 30, 48000.00, 'Zapatillas icónicas de Puma.', LOAD_FILE('C:/xampp/htdocs/Proyecto Desarrollo con Plataformas Abiertas/Proyecto/IMG/Prendas/PumaSuedeClassic.jpg'), 3),
('Levi\'s 501 Original Fit Jeans', 100, 36000.00, 'Jeans clásicos de Levi\'s.', LOAD_FILE('C:/xampp/htdocs/Proyecto Desarrollo con Plataformas Abiertas/Proyecto/IMG/Prendas/Levi\'s501OriginalFitJeans.jpg'), 4),
('Zara Basic T-Shirt', 200, 12000.00, 'Camiseta básica de Zara.', LOAD_FILE('C:/xampp/htdocs/Proyecto Desarrollo con Plataformas Abiertas/Proyecto/IMG/Prendas/ZaraBasicT-Shirt.jpg'), 5);

-- Inserciones para la tabla Usuario
INSERT INTO Usuario (Nombre, Apellidos, Rol, Email, Telefono, Direccion, Password) VALUES 
('Juan', 'Pérez López', 1, 'juan.perez@gmail.com', '555-1234', 'Calle Falsa 123', 'password123'),
('María', 'Gómez Ruiz', 2, 'maria.gomez@gmail.com', '555-5678', 'Avenida Siempre Viva 456', 'password456'),
('Carlos', 'Díaz Fernández', 1, 'carlos.diaz@gmail.com', '555-8765', 'Boulevard de los Sueños 789', 'password789'),
('Ana', 'Martínez Ortega', 3, 'ana.martinez@gmail.com', '555-4321', 'Camino Real 321', 'password321'),
('Luis', 'Hernández López', 2, 'luis.hernandez@gmail.com', '555-9876', 'Paseo de la Reforma 654', 'password654');

-- Inserciones para la tabla Venta
INSERT INTO Venta (idUsuario, idPrenda, Cantidad, Fecha, Descripcion, Total) VALUES 
(1, 1, 1, '2024-06-10', 'Compra de Nike Air Jordan 1.', 90000.00),
(2, 3, 2, '2024-06-11', 'Compra de Adidas Ultraboost.', 216000.00),
(3, 2, 1, '2024-06-11', 'Compra de Nike Air Force 1.', 60000.00),
(4, 5, 1, '2024-06-11', 'Compra de Levi\'s 501 Original Fit Jeans.', 36000.00),
(5, 4, 3, '2024-06-11', 'Compra de Puma Suede Classic.', 144000.00);

-- Inserciones para la tabla Venta
INSERT INTO Inventario (idPrenda, Cantidad) VALUES 
(1, 50),
(2, 60),
(3, 40),
(4, 30),
(5, 100),
(6, 200);