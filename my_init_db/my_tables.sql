CREATE TABLE splusers (
    id VARCHAR(36) PRIMARY KEY,
    email VARCHAR(255),
    password VARCHAR(255),
    isMFAActive BOOLEAN,
    savings DECIMAL(10,2),
    salary DECIMAL(10,2),
    profileimage VARCHAR(255),
    workfield VARCHAR(255),
    username VARCHAR(255)
);