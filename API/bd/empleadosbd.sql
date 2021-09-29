
CREATE TABLE `empresas`(
  `id_empresa` int(11) NOT NULL,
  `nombre` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;
CREATE TABLE `departamentos`(
  `id_departamento` int(11) NOT NULL,
  `nombre` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `id_empresa` int(11)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

CREATE TABLE `empleados` (
  `id_empleado` int(11) NOT NULL,
  `nombre_completo` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `correo_electronico` varchar(45) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `genero` varchar(20) DEFAULT NULL,
  `telefono` varchar(10) DEFAULT NULL,
  `celular` varchar(10) DEFAULT NULL,
  `fecha_de_ingreso` date,
  `id_departamento` int(11)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;


-- Indices
ALTER TABLE `empresas`
MODIFY `id_empresa` int(11) NOT NULL AUTO_INCREMENT,
ADD PRIMARY KEY (`id_empresa`);
ALTER TABLE `departamentos`
MODIFY `id_departamento` int(11) NOT NULL AUTO_INCREMENT,
ADD PRIMARY KEY (`id_departamento`),
ADD KEY `id_empresa` (`id_empresa`);
ALTER TABLE `empleados`
MODIFY `id_empleado` int(11) NOT NULL AUTO_INCREMENT,
ADD PRIMARY KEY (`id_empleado`),
ADD KEY `id_departamento` (`id_departamento`);

-- Foreign key
ALTER TABLE `departamentos`
ADD CONSTRAINT `departamentos_empresas` FOREIGN KEY (`id_empresa`) REFERENCES `empresas` (`id_empresa`) ON DELETE CASCADE;
ALTER TABLE `empleados`
ADD CONSTRAINT `empleados_departamentos` FOREIGN KEY (`id_departamento`) REFERENCES `departamentos` (`id_departamento`) ON DELETE CASCADE;


--borrar
SELECT * FROM empleados e
INNER JOIN departamentos d ON d.id_departamento=e.id_departamento
INNER JOIN empresas em ON em.id_empresa=d.id_empresa
WHERE em.id_empresa = 1;