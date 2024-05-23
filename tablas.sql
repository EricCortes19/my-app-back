CREATE TABLE Clientes (
    ID_cliente INT IDENTITY(1,1) PRIMARY KEY,
    Nombre NVARCHAR(100),
    Email NVARCHAR(100) UNIQUE,
    Contraseña NVARCHAR(100),
    Dirección NVARCHAR(255)
);

CREATE TABLE Productos (
    ID_producto INT IDENTITY(1,1) PRIMARY KEY,
    Nombre_producto NVARCHAR(100),
    Descripción NVARCHAR(MAX),
    Precio DECIMAL(10, 2),
    Stock INT
);

CREATE TABLE Ventas (
    ID_venta INT IDENTITY(1,1) PRIMARY KEY,
    ID_cliente INT,
    Fecha_venta DATETIME,
    Total_venta DECIMAL(10, 2),
    FOREIGN KEY (ID_cliente) REFERENCES Clientes(ID_cliente)
);

CREATE TABLE Detalle_ventas (
    ID_detalle INT IDENTITY(1,1) PRIMARY KEY,
    ID_venta INT,
    ID_producto INT,
    Cantidad INT,
    Subtotal DECIMAL(10, 2),
    FOREIGN KEY (ID_venta) REFERENCES Ventas(ID_venta),
    FOREIGN KEY (ID_producto) REFERENCES Productos(ID_producto)
);

CREATE TABLE Carrito (
    ID_carrito INT IDENTITY(1,1) PRIMARY KEY,
    ID_cliente INT,
    FOREIGN KEY (ID_cliente) REFERENCES Clientes(ID_cliente)
);

CREATE TABLE Detalle_carrito (
    ID_detalle_carrito INT IDENTITY(1,1) PRIMARY KEY,
    ID_carrito INT,
    ID_producto INT,
    Cantidad INT,
    FOREIGN KEY (ID_carrito) REFERENCES Carrito(ID_carrito),
    FOREIGN KEY (ID_producto) REFERENCES Productos(ID_producto)
);
