-- Insertar datos en la tabla Clientes
INSERT INTO Clientes (Nombre, Email, Contrase�a, Direcci�n) VALUES 
('Juan P�rez', 'juan.perez@example.com', 'password123', '123 Calle Principal'),
('Mar�a L�pez', 'maria.lopez@example.com', 'password123', '456 Avenida Secundaria'),
('Carlos Garc�a', 'carlos.garcia@example.com', 'password123', '789 Boulevard Central');

-- Insertar datos en la tabla Productos
INSERT INTO Productos (Nombre_producto, Descripci�n, Precio, Stock) VALUES 
('Laptop', 'Laptop de alta gama', 1200.00, 10),
('Tel�fono', 'Tel�fono inteligente de �ltima generaci�n', 800.00, 25),
('Auriculares', 'Auriculares con cancelaci�n de ruido', 150.00, 50);

-- Insertar datos en la tabla Ventas
INSERT INTO Ventas (ID_cliente, Fecha_venta, Total_venta) VALUES 
(1, '2023-05-20 10:00:00', 1350.00),
(2, '2023-05-21 11:30:00', 950.00);

-- Insertar datos en la tabla Detalle_ventas
INSERT INTO Detalle_ventas (ID_venta, ID_producto, Cantidad, Subtotal) VALUES 
(1, 1, 1, 1200.00),
(1, 3, 1, 150.00),
(2, 2, 1, 800.00),
(2, 3, 1, 150.00);

-- Insertar datos en la tabla Carrito
INSERT INTO Carrito (ID_cliente) VALUES 
(1),
(2),
(3);

-- Insertar datos en la tabla Detalle_carrito
INSERT INTO Detalle_carrito (ID_carrito, ID_producto, Cantidad) VALUES 
(1, 2, 2),
(1, 3, 1),
(2, 1, 1),
(3, 3, 3);
