CREATE DATABASE db_ice;

SELECT * FROM db_ice.usuarios 
WHERE usuario = 'admin' and password ='admin123*';

-- TABLA USUARIOS

CREATE TABLE usuarios (
  id INT(10) NOT NULL,
  usuario VARCHAR(16) NOT NULL,
  password VARCHAR(60) NOT NULL,
  nombres VARCHAR(40) NOT NULL,
  apellidos VARCHAR(70) NOT NULL,
  fechaNac VARCHAR(60) NOT NULL,
  telefono VARCHAR(60) NOT NULL,
  correo VARCHAR(60) NOT NULL
);

ALTER TABLE usuarios ADD PRIMARY KEY (id);
ALTER TABLE usuarios MODIFY id INT(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;
INSERT INTO db_ice.usuarios(usuario,password,nombres,apellidos,fechaNac,telefono,correo) 
	VALUES('admin','admin123*','admin','admin',0,0,'');

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
    imgUrl LONGBLOB
);

ALTER TABLE productos ADD PRIMARY KEY (id);
ALTER TABLE productos MODIFY id INT(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;
INSERT INTO db_ice.productos(NombreProducto,idTipoProducto,disponibilidad,stock,precioxUni,descripcion,imgUrl)
	VALUES('Paleta Cookies & Cream',2,1,300,1200,'Helado cremoso sabor a vainilla con cobertura sabor a chocolate y galleta',
    '/img-productos/paleta_cookie_cream.jpg');

select * from productos;

select *  from sessions;


drop database db_ice




