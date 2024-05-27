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

CREATE TABLE Rol (
    idRol INT AUTO_INCREMENT PRIMARY KEY,
    Descripcion VARCHAR(255) NOT NULL,
    NivelAcceso INT NOT NULL
);

CREATE TABLE Usuario (
    idUsuario INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(20) NOT NULL,
    Apellidos VARCHAR(40) NOT NULL,
    idRol INT NOT NULL,
    FOREIGN KEY (idRol) REFERENCES Rol(idRol)
);

CREATE TABLE DatosUsuario (
    idUsuario INT NOT NULL PRIMARY KEY,
    Email VARCHAR(50) NOT NULL,
    Telefono VARCHAR(15) NOT NULL,
    Direccion VARCHAR(100) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario)
);

CREATE TABLE Venta (
    idVenta INT AUTO_INCREMENT PRIMARY KEY,
    idUsuario INT NOT NULL,
    Fecha DATETIME NOT NULL,
    Descripcion VARCHAR(255),
    Total DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario)
);

CREATE TABLE DetalleVenta (
    idDetalleVenta INT AUTO_INCREMENT PRIMARY KEY,
    idVenta INT NOT NULL,
    idPrenda INT NOT NULL,
    Cantidad INT NOT NULL,
    FOREIGN KEY (idVenta) REFERENCES Venta(idVenta),
    FOREIGN KEY (idPrenda) REFERENCES Prenda(idPrenda)
);

CREATE TABLE Inventario(
    idInventario int AUTO_INCREMENT NOT NULL PRIMARY KEY,
    idPrenda int NOT NULL,
    idTalla int NOT NULL,
    Cantidad int NOT NULL,
    FOREIGN KEY (idPrenda) REFERENCES Prenda(idPrenda)
);
