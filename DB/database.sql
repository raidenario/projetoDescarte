CREATE DATABASE IF NOT EXISTS smartwaste;

-- Seleciona o banco de dados
USE smartwaste;

-- Criação da tabela clientes
CREATE TABLE IF NOT EXISTS locaisDescarte (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    latitude FLOAT,
    longitude FLOAT,
    tipo_de_reciclagem VARCHAR(100),
    avaliacao INT,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserindo dados de teste
INSERT INTO locaisDescarte (nome, latitude, longitude, tipo_de_reciclagem, avaliacao) VALUES 
('Ferro Velho 1', 123456789.09,2341231.01,'Plastico', 5),
('Descarte', 5456789.02, 2342331.01,'Metal', 3);
