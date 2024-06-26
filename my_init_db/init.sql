-- GRANT ALL PRIVILEGES ON `spendilow-db`.* TO 'root'@'server';
-- FLUSH PRIVILEGES;

USE `spendilow-db`;

CREATE TABLE splusers (
    id VARCHAR(36) PRIMARY KEY,
    email VARCHAR(255),
    password VARCHAR(255),
    isMFAActive BOOLEAN,
    savings DECIMAL(10,2),
    salary DECIMAL(10,2),
    profileimage LONGTEXT,
    workfield VARCHAR(255),
    username VARCHAR(255)
);

CREATE TABLE budget (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    user_id VARCHAR(36),
    FOREIGN KEY (user_id) REFERENCES splusers(id)
);

CREATE TABLE transactions (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36),
    amount DECIMAL(10,2),
    transaction_date DATETIME,
    title VARCHAR(255),
    notes TEXT,
    tags VARCHAR(255),
    transaction_type VARCHAR(50),
    target_id VARCHAR(36),
    FOREIGN KEY (user_id) REFERENCES splusers(id),
    FOREIGN KEY (target_id) REFERENCES budget(id)
);


