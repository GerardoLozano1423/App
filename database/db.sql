-- to create a new database
CREATE DATABASE APP;

-- to use database
use APP;

-- creating a new table
CREATE TABLE estado (
  id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL,
  habilitado int(1) NOT NULL DEFAULT 1
);

CREATE TABLE municipio (
  id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL,
  id_estado int(6) NOT NULL,
  habilitado int(1) NOT NULL DEFAULT 1
);


CREATE TABLE usuario (
  id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  usuario VARCHAR(50) NOT NULL,
  password VARCHAR(200) NOT NULL,
  token VARCHAR(200) NOT NULL,
  rol INT(2) NOT NULL DEFAULT 0
);

-- to show all tables
show tables;

-- to describe table
describe customer;


