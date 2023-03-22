CREATE DATABASE ecomerceDB;

SELECT * FROM db_ice.usuarios 
WHERE usuario = 'admin' and password ='admin123*';

-- TABLA USUARIOS

CREATE TABLE usuarios (
  id INT(10) NOT NULL,
  usuario VARCHAR(16) NOT NULL,
  password VARCHAR(60) NOT NULL  
);



ALTER TABLE usuarios ADD PRIMARY KEY (id);
ALTER TABLE usuarios MODIFY id INT(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;
INSERT INTO usuarios(usuario,password) 
	VALUES('admin','admin123*');

CREATE TABLE info_usuarios(
	id_usuario INT(10),
	nombres VARCHAR(40) NOT NULL,
	apellidos VARCHAR(70) NOT NULL,
	fechaNac VARCHAR(60) NOT NULL,
	telefono VARCHAR(60) NOT NULL,
	correo VARCHAR(60) NOT NULL,
    direccion VARCHAR(60) NOT NULL
);

-- LLave Foranea
ALTER TABLE info_usuarios ADD CONSTRAINT FOREIGN KEY(id_usuario) REFERENCES usuarios(id)
ON DELETE CASCADE ON UPDATE CASCADE;

INSERT INTO info_usuarios(id_usuario,nombres,apellidos,fechaNac,telefono,correo,direccion) 
	VALUES(1,'admin','admin123*','','','','');

-- TABLA CARRITO COMPRAS
CREATE TABLE carrito(
	id_usuario INT(10) not null,
    id_producto INT(10) not null,
    cantidad INT(4) not null,
    subTotal INT(10)
);

ALTER TABLE carrito ADD PRIMARY KEY (id_usuario,id_producto);

ALTER TABLE carrito ADD CONSTRAINT FOREIGN KEY(id_usuario) REFERENCES usuarios(id)
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE carrito ADD CONSTRAINT FOREIGN KEY(id_producto) REFERENCES productos(id)
ON DELETE CASCADE ON UPDATE CASCADE;

INSERT INTO db_ice.carrito(id_usuario,id_producto,cantidad) 
	VALUES(2,1,3);
    
select * from carrito;


-- TABLA PRODUCTOS
CREATE TABLE productos(
	id INT(10),
    idTipoProducto INT(10),
    NombreProducto VARCHAR(70),
    disponibilidad INT(1),
    stock INT(4),
    precioxUni INT(6),
    descripcion text,
    imgUrl text
);

ALTER TABLE productos ADD PRIMARY KEY (id);
ALTER TABLE productos MODIFY id INT(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;
INSERT INTO productos(NombreProducto,idTipoProducto,disponibilidad,stock,precioxUni,descripcion,imgUrl)
	VALUES('Artesanal Maracuya',1,1,300,2250,'Helado de leche con grasa vegetal, sabor a Maracuyá con relleno de galleta.',
    'assets/img-products/artesanal_maracuya.jpg');
INSERT INTO productos(NombreProducto,idTipoProducto,disponibilidad,stock,precioxUni,descripcion,imgUrl)
	VALUES('Artesanal Piña Cocada',1,1,300,2000,'Artesanal Piña cocada se lanza como un producto innovador e indulgente, con el fin de resaltar los sabores auntenticamente nuestros.',
    'assets/img-products/artesanal_pina.jpg');
INSERT INTO productos(NombreProducto,idTipoProducto,disponibilidad,stock,precioxUni,descripcion,imgUrl)
	VALUES('Artesanal tres leches',1,1,300,2100,'Helado de Tres Leches con grasa vegetal, sabor tres leches, con relleno de leche condensada y trozos de galleta.',
    'assets/img-products/artesanal_tresleches.jpg');
INSERT INTO productos(NombreProducto,idTipoProducto,disponibilidad,stock,precioxUni,descripcion,imgUrl)
	VALUES('Artesanal dulce de moras',1,1,300,2000,'Helado cremoso con grasa vegetal, sabor vainilla con mora y relleno de leche condensada.',
    'assets/img-products/artesanal_dulceMora.jpg');
INSERT INTO productos(NombreProducto,idTipoProducto,disponibilidad,stock,precioxUni,descripcion,imgUrl)
	VALUES('Paleta Fresa',2,1,300,1600,'Helado cremoso con grasa vegetal sabor a fresa, con cobertura sabor a chocolate.',
    'assets/img-products/paleta_fresa.jpg');
INSERT INTO productos(NombreProducto,idTipoProducto,disponibilidad,stock,precioxUni,descripcion,imgUrl)
	VALUES('Paleta Cookies&Cream',2,1,300,2000,'Helado cremoso con grasa vegetal sabor a vainilla, con cobertura sabor a chocolate y galleta.',
    'assets/img-products/paleta_cookieCream.jpg');