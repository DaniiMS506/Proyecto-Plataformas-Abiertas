------Creacion de la Base de Datos de la Tienda de Ropa-------
CREATE DATABASE TiendaRopa;
USE TiendaRopa;

-------Creacion de las tablas -----------
CREATE TABLE Marca(
	idMarca int IDENTITY(1,1) NOT NULL PRIMARY KEY,
	Nombre varchar(30) NOT NULL,
	Descripcion varchar(255)
);

CREATE TABLE Prenda(
	idPrenda int IDENTITY(1,1) NOT NULL PRIMARY KEY,
	Nombre varchar(30) NOT NULL,
	Cantidad int NOT NULL,
	Precio money NOT NULL,
	Descripcion varchar(255),
	idMarca int NOT NULL,
	FOREIGN KEY (idMarca) REFERENCES Marca(idMarca)
);

CREATE TABLE Rol(
	idRol int IDENTITY(1,1) NOT NULL PRIMARY KEY,
	Descripcion varchar(255) NOT NULL,
	NivelAcceso int NOT NULL
);

CREATE TABLE Usuario(
	idUsuario int IDENTITY(1,1) NOT NULL PRIMARY KEY,
	Nombre varchar(20) NOT NULL,
	Apellidos varchar(40) NOT NULL,
	idRol int NOT NULL,
	FOREIGN KEY (idRol) REFERENCES Rol(idRol)
);

CREATE TABLE DatosUsuario(
	idUsuario int NOT NULL PRIMARY KEY,
	Email varchar(50) NOT NULL,
	Telefono varchar(15) NOT NULL,
	Direccion varchar(100) NOT NULL,
	Pass varchar(255) NOT NULL,
	FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario)
);

CREATE TABLE Venta(
	idVenta int IDENTITY(1,1) NOT NULL PRIMARY KEY,
	idUsuario int NOT NULL,
	Fecha DateTime NOT NULL,
	Descripcion varchar(255),
	Total money NOT NULL,
	FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario)
);

CREATE TABLE DetalleVenta(
	idDetalleVenta int IDENTITY(1,1) NOT NULL PRIMARY KEY,
	idVenta int NOT NULL,
	idPrenda int NOT NULL,
	Cantidad int NOT NULL,
	FOREIGN KEY (idVenta) REFERENCES Venta(idVenta),
	FOREIGN KEY (idPrenda) REFERENCES Prenda(idPrenda)
);

-- Inserción de Datos

INSERT INTO Marca (Nombre, Descripcion) VALUES
('Nike', 'Nike es una marca mundialmente conocida por su ropa deportiva, calzado y accesorios de alta calidad. Fundada en 1964, la empresa se dedica a inspirar y motivar a los atletas de todo el mundo.'),
('Adidas', 'Adidas es una multinacional alemana de ropa y accesorios deportivos. Con una larga trayectoria en la innovación y el diseño, Adidas es sinónimo de rendimiento y estilo en el mundo del deporte.'),
('New Balance', 'New Balance es una marca americana de calzado y ropa deportiva. Fundada en 1906, es conocida por su compromiso con la calidad, comodidad y la fabricación en EE.UU. y el Reino Unido.');

INSERT INTO Prenda (Nombre, Cantidad, Precio, Descripcion, idMarca) VALUES
('Nike Air Max', 100, 120.00, 'Calzado deportivo de alta calidad y comodidad.', 1),
('Adidas Ultraboost', 200, 180.00, 'Zapatillas de running con gran amortiguación y soporte.', 2),
('New Balance 574', 150, 80.00, 'Zapatillas clásicas y cómodas para el uso diario.', 3);

INSERT INTO Rol (Descripcion, NivelAcceso) VALUES
('Administrador', 1),
('Cliente', 2);

INSERT INTO Usuario (Nombre, Apellidos, idRol) VALUES
('Juan', 'Perez', 2),
('Maria', 'Gonzalez', 2);

INSERT INTO DatosUsuario (idUsuario, Email, Telefono, Direccion, Password) VALUES
(1, 'juan.perez@gmail.com', '123456789', 'Calle Falsa 123', 'hashedpassword1'),
(2, 'maria.gonzalez@gmail.com', '987654321', 'Avenida Siempreviva 456', 'hashedpassword2');

INSERT INTO Venta (idUsuario, Fecha, Descripcion, Total) VALUES
(1, '2023-05-20', 'Venta de Prenda 1', 19.99),
(2, '2023-05-21', 'Venta de Prenda 2', 29.99);

INSERT INTO DetalleVenta (idVenta, idPrenda, Cantidad) VALUES
(1, 1, 1),
(2, 2, 2);
