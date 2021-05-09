-- phpMyAdmin SQL Dump
-- version 4.8.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-01-2021 a las 07:06:24
-- Versión del servidor: 10.1.32-MariaDB
-- Versión de PHP: 7.2.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `proy_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `authors`
--

CREATE TABLE `authors` (
  `ID` int(11) NOT NULL,
  `NAME` varchar(50) NOT NULL,
  `DESCRIPTION` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `authors`
--

INSERT INTO `authors` (`ID`, `NAME`, `DESCRIPTION`) VALUES
(1, 'JUAN GOMEZ-JURADO', 'Juan Gómez-Jurado (Madrid, 1977) es periodista y autor de varias novelas de gran éxito, traducidas a cuarenta lenguas. Las novelas sobre el universo de Antonia Scott, El paciente, Cicatriz, Reina Roja, Loba Negra y Rey Blanco (todas publicadas en Ediciones B), se han convertido en el mayor fenómeno de ventas del thriller español y han consagrado a su autor como uno de los máximos exponentes del género a nivel internacional. Actualmente colabora con varios medios y es cocreador de los podcast Todopoderosos y Aquí hay dragones.'),
(2, ' JAVIER CASTILLO', 'Javier Castillo creció en Málaga, estudió empresariales y un Master en Management en ESCP Europe. Ha trabajado como consultor de finanzas corporativas, pero abandonó los números a raíz del éxito de su primera novela, El día que se perdió la cordura (Suma), convertida en un fenómeno editorial, publicada en Italia, México, Colombia, Argentina, Portugal, Turquía, Japón y Corea. Asimismo los derechos audiovisuales han sido adquiridos para la producción de la serie de televisión. Su segunda novela, El día que se perdió el amor (Suma), afianzó a Javier Castillo como maestro del suspense y ambas novelas llevan vendidos más de 350.000 ejemplares en España. Todo lo que sucedió con Miranda Huff es su tercera novela y supone su confirmación como uno de los mejores escritores del género.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `books`
--

CREATE TABLE `books` (
  `ID` int(11) NOT NULL,
  `ISBN` varchar(20) NOT NULL,
  `TITLE` varchar(50) NOT NULL,
  `SUMMARY` varchar(1200) NOT NULL,
  `COVER` varchar(100) NOT NULL,
  `AUTHOR_ID` int(11) NOT NULL,
  `CATEGORY_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `books`
--

INSERT INTO `books` (`ID`, `ISBN`, `TITLE`, `SUMMARY`, `COVER`, `AUTHOR_ID`, `CATEGORY_ID`) VALUES
(1, '9788466668613', 'REY BLANCO', 'ESPERO QUE NO TE HA YAS OLVIDADO DE MÍ.¿JUGAMOS?\r\n\r\nCuando Antonia Scott recibe este mensaje, sabe muy bien quién se lo envía. También sabe que ese juego es casi imposible de ganar. Pero a Antonia no le gusta perder.\r\n\r\nDespués de todo este tiempo huyendo, la realidad ha acabado alcanzándola. Antonia es cinturón negro en mentirse a sí misma, pero ahora tiene claro que si pierde esta batalla, las habrá perdido todas.\r\n\r\n-La reina es la figura más poderosa del tablero -dice el Rey Blanco-. Pero por poderosa que sea una pieza de ajedrez, nunca debe olvidar que hay una mano que la mueve.\r\n\r\n-Eso ya lo veremos-, responde Antonia.\r\n\r\nEL FINAL ES SOLO EL PRINCIPIO', 'reyblanco.jpg', 1, 7),
(2, '9788491293729', 'LA CHICA DE NIEVE', 'Nueva York, 1998, cabalgata de Acción de Gracias. Kiera Templeton, desaparece entre la multitud. Tras una búsqueda frenética por toda la ciudad, alguien encuentra unos mechones de pelo junto a la ropa que llevaba puesta la pequeña.\r\nEn 2003, el día que Kiera habría cumplido ocho años, sus padres, Aaron y Grace Templeton, reciben en casa un extraño paquete: una cinta VHS con la grabación de un minuto de Kiera jugando en una habitación desconocida.\r\nTras vender más de 650.000 ejemplares de sus anteriores novelas, Javier Castillo vuelve a poner en jaque la cordura con La chica de nieve, un oscuro viaje a las profundidades de Miren Triggs, una estudiante de periodismo que inicia una investigación paralela y descubre que tanto su vida como la de Kiera están llenas de incógnitas.', 'lachicadenieve.jpg', 2, 7),
(3, '9788466664424', 'REINA ROJA', 'Antonia Scott es especial. Muy especial.\r\n\r\nNo es policía ni criminalista. Nunca ha empuñado un arma ni llevado una placa, y, sin embargo, ha resuelto decenas de crímenes.\r\n\r\nPero hace un tiempo que Antonia no sale de su ático de Lavapiés. Las cosas que ha perdido le importan mucho más que las que esperan ahí fuera.\r\n\r\nTampoco recibe visitas. Por eso no le gusta nada, nada, cuando escucha unos pasos desconocidos subiendo las escaleras hasta el último piso.\r\n\r\nSea quien sea, Antonia está segura de que viene a buscarla.\r\n\r\nY eso le gusta aún menos.', 'reinaroja.jpg', 1, 7);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `book_product`
--

CREATE TABLE `book_product` (
  `ID` int(11) NOT NULL,
  `TYPE` enum('EBOOK','HARDCOVER','SOFTCOVER','') NOT NULL,
  `PRICE` float NOT NULL,
  `BOOK_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `book_product`
--

INSERT INTO `book_product` (`ID`, `TYPE`, `PRICE`, `BOOK_ID`) VALUES
(1, 'EBOOK', 4.5, 1),
(2, 'HARDCOVER', 10, 1),
(3, 'SOFTCOVER', 6.5, 1),
(4, 'HARDCOVER', 15, 2),
(5, 'SOFTCOVER', 8.5, 2),
(6, 'EBOOK', 5, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories`
--

CREATE TABLE `categories` (
  `ID` int(11) NOT NULL,
  `NAME` varchar(50) NOT NULL,
  `FATHER` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `categories`
--

INSERT INTO `categories` (`ID`, `NAME`, `FATHER`) VALUES
(1, 'LITERATURA', NULL),
(2, 'CONOCIMIENTO Y CIENCIA', NULL),
(3, 'HISTORIA', 2),
(4, 'CIENCIA', 2),
(5, 'ARTE', 2),
(6, 'FILOSOFÍA', 2),
(7, 'NOVELA NEGRA', 1),
(8, 'NOVELA HISTÓRICA', 1),
(9, 'CIENCIA FICCIÓN', 1),
(10, 'TERROR', 1),
(11, 'HUMOR', 1),
(12, 'NOVELA ROMÁNTICA', 1),
(13, 'POESÍA', 1),
(14, 'ENSAYO', 1),
(15, 'COSA', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product_purchase`
--

CREATE TABLE `product_purchase` (
  `ID` int(11) NOT NULL,
  `ID_PRODUCT` int(11) NOT NULL,
  `ID_PURCHASE` int(11) NOT NULL,
  `AMOUNT` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `purchases`
--

CREATE TABLE `purchases` (
  `ID` int(11) NOT NULL,
  `DATE` datetime NOT NULL,
  `TOTAL_PRICE` float NOT NULL,
  `USER_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `ID` int(11) NOT NULL,
  `USERNAME` varchar(50) NOT NULL,
  `EMAIL` varchar(100) NOT NULL,
  `PASSWORD` varchar(500) NOT NULL,
  `ADDRESS` varchar(200) NOT NULL,
  `CITY` varchar(50) NOT NULL,
  `ZIP_CODE` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`ID`, `USERNAME`, `EMAIL`, `PASSWORD`, `ADDRESS`, `CITY`, `ZIP_CODE`) VALUES
(1, 'admin', 'admin@admin', 'temp', '123', '123', 123),
(6, 'admina', '1', '$2b$10$om0LzSPYfGwfN65znCDcHufSoa0bQkq2A.i52J6Vtfz0uxJgT5kq6', '1', '1', 1),
(7, 'a', 'asd@asd', '$2b$10$8jET.8kINb4HbRC5MkFDKeZDtYw1AgcEMTEjA5/y6MawDut89ISx6', 'asd', 'asd', 0),
(8, 'Nuevo!', 'asd@asd', '$2b$10$M0pAh0qZ69OBXxln4ZXv0uCUQAc1zy7fmCnutF7eZDoWjwIOGxVmK', 'asd', 'a', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `authors`
--
ALTER TABLE `authors`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `AUTHOR_ID` (`AUTHOR_ID`),
  ADD KEY `CATEGORY_ID` (`CATEGORY_ID`);

--
-- Indices de la tabla `book_product`
--
ALTER TABLE `book_product`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `BOOK_ID` (`BOOK_ID`);

--
-- Indices de la tabla `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FATHER` (`FATHER`);

--
-- Indices de la tabla `product_purchase`
--
ALTER TABLE `product_purchase`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_PRODUCT` (`ID_PRODUCT`),
  ADD KEY `ID_PURCHASE` (`ID_PURCHASE`);

--
-- Indices de la tabla `purchases`
--
ALTER TABLE `purchases`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `USER_ID` (`USER_ID`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `authors`
--
ALTER TABLE `authors`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `books`
--
ALTER TABLE `books`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `book_product`
--
ALTER TABLE `book_product`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `categories`
--
ALTER TABLE `categories`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `product_purchase`
--
ALTER TABLE `product_purchase`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `purchases`
--
ALTER TABLE `purchases`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `books`
--
ALTER TABLE `books`
  ADD CONSTRAINT `books_ibfk_1` FOREIGN KEY (`CATEGORY_ID`) REFERENCES `categories` (`ID`),
  ADD CONSTRAINT `books_ibfk_2` FOREIGN KEY (`AUTHOR_ID`) REFERENCES `authors` (`ID`);

--
-- Filtros para la tabla `book_product`
--
ALTER TABLE `book_product`
  ADD CONSTRAINT `book_product_ibfk_1` FOREIGN KEY (`BOOK_ID`) REFERENCES `books` (`ID`);

--
-- Filtros para la tabla `categories`
--
ALTER TABLE `categories`
  ADD CONSTRAINT `categories_ibfk_1` FOREIGN KEY (`FATHER`) REFERENCES `categories` (`ID`);

--
-- Filtros para la tabla `product_purchase`
--
ALTER TABLE `product_purchase`
  ADD CONSTRAINT `product_purchase_ibfk_1` FOREIGN KEY (`ID_PRODUCT`) REFERENCES `book_product` (`ID`),
  ADD CONSTRAINT `product_purchase_ibfk_2` FOREIGN KEY (`ID_PURCHASE`) REFERENCES `purchases` (`ID`);

--
-- Filtros para la tabla `purchases`
--
ALTER TABLE `purchases`
  ADD CONSTRAINT `purchases_ibfk_1` FOREIGN KEY (`USER_ID`) REFERENCES `users` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
