
drop database if exists db_app;
create database db_app;
USE db_app;

CREATE TABLE IF NOT EXISTS `db_app`.`cliente` (
  id INT NOT NULL AUTO_INCREMENT,
  dni CHAR(12),
  nombre VARCHAR(45),
  telefono CHAR(15),
  domicilio VARCHAR(45),
  fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id));
ALTER TABLE `cliente` ADD UNIQUE `dni_nombre_unico`(`dni`, `nombre`);
  
CREATE TABLE IF NOT EXISTS `db_app`.equipo (
  id INT NOT NULL AUTO_INCREMENT,
  modelo_exacto VARCHAR(45),
  modelo_comercial VARCHAR(30),
  marca VARCHAR(30),
  tipo_equipo VARCHAR(45),
  PRIMARY KEY (id),
  UNIQUE(modelo_exacto))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS db_app.equipo_imei (
  id INT NOT NULL AUTO_INCREMENT,
  imei VARCHAR(60),
  id_equipo INT,
  fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT fk_equipo
    FOREIGN KEY(id_equipo) REFERENCES equipo(id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
  ENGINE = InnoDB;
ALTER TABLE `equipo_imei` ADD UNIQUE `imei_equipo_unico`(`imei`, `id_equipo`);
  
CREATE TABLE IF NOT EXISTS db_app.`usuario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `usuario_nombre` VARCHAR(45) NOT NULL,
  `rol` VARCHAR(45),
  UNIQUE(usuario_nombre),
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `db_app`.`orden` (
  `id` INT NOT NULL auto_increment,
  `fecha_creacion` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE current_timestamp,
  `id_cliente` INT NOT NULL,
  `id_equipo_imei` INT NOT NULL,
  `detalles` VARCHAR(200),
  `falla` VARCHAR(400),
  `id_usuario` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_cliente`
    FOREIGN KEY (`id_cliente`)
    REFERENCES db_app.`cliente` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_equipo_imei`
    FOREIGN KEY (`id_equipo_imei`)
    REFERENCES db_app.`equipo_imei` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_usuario`
    FOREIGN KEY (`id_usuario`)
    REFERENCES db_app.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
ALTER TABLE orden AUTO_INCREMENT=20220800;
    
DROP PROCEDURE if exists nueva_orden; 

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `nueva_orden`(

	IN p_dni INT,
	IN p_nombre VARCHAR(45),
	IN p_telefono CHAR(15),
	IN p_domicilio VARCHAR(45),
    
	IN p_modelo_exacto VARCHAR(45),
	IN p_modelo_comercial VARCHAR(30),
	IN p_marca VARCHAR(30),
	IN p_tipo_equipo VARCHAR(45),
    
	IN p_imei VARCHAR(60),
    
	IN p_usuario_nombre VARCHAR(45),
	IN p_rol VARCHAR(45),
    
	IN p_detalles VARCHAR(200),
	IN p_falla VARCHAR(400)
)
BEGIN
    DECLARE errno INT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		GET CURRENT DIAGNOSTICS CONDITION 1 errno = MYSQL_ERRNO;
		SELECT errno AS MYSQL_ERROR;
		ROLLBACK;
    END;

    START TRANSACTION;
		INSERT INTO cliente (dni, nombre, telefono, domicilio) 
		VALUES (p_dni, p_nombre, p_telefono, p_domicilio)
		on duplicate key update id=LAST_INSERT_ID(id), telefono = p_telefono, domicilio = p_domicilio; 	
		SET @cliente_id = LAST_INSERT_ID();
		
        INSERT INTO equipo (modelo_exacto, modelo_comercial, marca, tipo_equipo) 
		VALUES (p_modelo_exacto, p_modelo_comercial, p_marca, p_tipo_equipo)
		on duplicate key update id=LAST_INSERT_ID(id), modelo_comercial = p_modelo_comercial, marca = p_marca, tipo_equipo = p_tipo_equipo; 	
		SET @equipo_id = LAST_INSERT_ID();
        
        INSERT INTO equipo_imei (imei, id_equipo) 
		VALUES (p_imei, @equipo_id)
		on duplicate key update id=LAST_INSERT_ID(id);
		SET @equipo_imei_id = LAST_INSERT_ID();
        
        INSERT INTO usuario (usuario_nombre, rol) 
		VALUES (p_usuario_nombre, p_rol)
		on duplicate key update id=LAST_INSERT_ID(id);
		SET @usuario_id = LAST_INSERT_ID();
        
        INSERT INTO orden (id_cliente, id_equipo_imei, detalles, falla, id_usuario) 
		VALUES (@cliente_id, @equipo_imei_id, p_detalles, p_falla, @usuario_id);
		SET @orden_id = LAST_INSERT_ID();
        SELECT LAST_INSERT_ID();
    
    COMMIT WORK;

END$$
DELIMITER ;


/*
CALL nueva_orden (
	'432', 'Matias', '351', 'RIO',
    'G530M', 'J2 Prime', 'LG', 'tABLE',
    '123',
    'Matias', 'Atencion',
    'Le falta la gomit', 'Roto Mlo'
);

select * from orden;
select * from cliente;
select * from equipo;
select * from equipo_imei;
select * from usuario; 

select * from presupuesto; 
select * from tipo_arreglo; 
select * from tipo_repuesto; 
*/


CREATE TABLE IF NOT EXISTS `db_app`.`tipo_arreglo` (
  `id` INT NOT NULL auto_increment,
  `tipo_arreglo` VARCHAR(45) NOT NULL,
  unique(tipo_arreglo),
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS `db_app`.`tipo_repuesto` (
  `id` INT NOT NULL auto_increment,
  `tipo_repuesto` VARCHAR(45) NOT NULL,
  unique(tipo_repuesto),
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `db_app`.`presupuesto` (
  `id` INT NOT NULL auto_increment,
  `id_orden` INT NOT NULL,
  `id_tipo_arreglo` INT NOT NULL,
  `id_repuesto` INT NULL,
  `decision_cliente` VARCHAR(45) NULL,
  `calidad_elegida` VARCHAR(30) NULL,
  `precio_arreglo` DECIMAL(7,2) NULL,
  `fecha_aviso_cliente` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_confirmacion_cliente` TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_orden_idx` (`id_orden` ASC) VISIBLE,
  INDEX `fk_tipo_arreglo_idx` (`id_tipo_arreglo` ASC) VISIBLE,
  INDEX `fk_tipo_repuesto_idx` (`id_repuesto` ASC) VISIBLE,
  CONSTRAINT `fk_orden`
    FOREIGN KEY (`id_orden`)
    REFERENCES `db_app`.`orden` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tipo_arreglo`
    FOREIGN KEY (`id_tipo_arreglo`)
    REFERENCES `db_app`.`tipo_arreglo` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tipo_repuesto`
    FOREIGN KEY (`id_repuesto`)
    REFERENCES `db_app`.`tipo_repuesto` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
    

CREATE TABLE IF NOT EXISTS `db_app`.`costo_repuesto` (
  `id` INT NOT NULL auto_increment,
  `id_tipo_repuesto` INT NOT NULL,
  `id_equipo` INT NOT NULL,
  `calidad` VARCHAR(30) NOT NULL,
  `costo_usd` DECIMAL(7,2) NOT NULL,
  `fecha_carga` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_modelo_marca_idx` (`id_equipo` ASC) VISIBLE,
  INDEX `fk_tipo_repuesto_idx` (`id_tipo_repuesto` ASC) VISIBLE,
  CONSTRAINT FOREIGN KEY (`id_equipo`)
    REFERENCES `db_app`.`equipo` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT FOREIGN KEY (`id_tipo_repuesto`)
    REFERENCES `db_app`.`tipo_repuesto` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
ALTER TABLE `costo_repuesto` ADD UNIQUE `costo_repuesto_unico`(`id_tipo_repuesto`, `id_equipo`, `calidad`);
