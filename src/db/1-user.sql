CREATE TABLE user(
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) NOT NULL UNIQUE,
    fullname VARCHAR(300) NOT NULL,
    password VARCHAR(100) NOT NULL,
    area ENUM("admin", "secretary"),
    has_access BOOLEAN NOT NULL DEFAULT 0,
    verified BOOLEAN NOT NULL DEFAULT 0,
    role ENUM("admin", "user", "sales") DEFAULT "user"
)