## create database ATV_Seguranca;
 use ATV_Seguranca;


-- Tabela para chaves simétricas (AES)
CREATE TABLE IF NOT EXISTS aes_keys (
    id INT AUTO_INCREMENT PRIMARY KEY,
    key_value VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela para armazenar pares de chaves assimétricas (RSA)
-- Ambas as colunas são NOT NULL para garantir que não se insira um par incompleto.
CREATE TABLE IF NOT EXISTS rsa_key_pairs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    public_key TEXT NOT NULL,
    private_key TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

Select * from aes_keys;
Select * from rsa_key_pairs;