-- Create a new database named "new_database"
CREATE DATABASE IF NOT EXISTS wallet;

-- Create a new user and set their password
CREATE USER IF NOT EXISTS 'wallet_user'@'%' IDENTIFIED BY 'wallet_password';

-- Grant all privileges to the new user on the new database
GRANT ALL PRIVILEGES ON wallet.* TO 'wallet_user'@'%';

-- Reload the privilege