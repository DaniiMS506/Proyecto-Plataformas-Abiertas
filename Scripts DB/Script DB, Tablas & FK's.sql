-- Creación de la Base de Datos de la Tienda de Ropa
CREATE DATABASE TiendaRopa;
USE TiendaRopa;

-- Creación de las tablas
CREATE TABLE Marca (
    idMarca INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(30) NOT NULL,
    Descripcion VARCHAR(255)
);

CREATE TABLE Prenda (
    idPrenda INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(30) NOT NULL,
    Cantidad INT NOT NULL,
    Precio DECIMAL(10, 2) NOT NULL,
    Descripcion VARCHAR(255),
    idMarca INT NOT NULL,
    FOREIGN KEY (idMarca) REFERENCES Marca(idMarca)
);


CREATE TABLE Usuario (
    idUsuario INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(20) NOT NULL,
    Apellidos VARCHAR(40) NOT NULL,
    Rol INT NOT NULL,
	Email VARCHAR(50) NOT NULL,
    Telefono VARCHAR(15) NOT NULL,
    Direccion VARCHAR(100) NOT NULL,
    Password VARCHAR(255) NOT NULL
);

CREATE TABLE Venta (
    idVenta INT AUTO_INCREMENT PRIMARY KEY,
    idUsuario INT NULL,
    idPrenda INT NULL,
    Cantidad INT NOT NULL,
    Fecha DATE NOT NULL,
    Descripcion VARCHAR(255),
    Total DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario),
    FOREIGN KEY (idPrenda) REFERENCES Prenda(idPrenda)
);


CREATE TABLE Inventario(
    idInventario int AUTO_INCREMENT NOT NULL PRIMARY KEY,
    idPrenda int NOT NULL,
    Cantidad int NOT NULL,
    FOREIGN KEY (idPrenda) REFERENCES Prenda(idPrenda)
);