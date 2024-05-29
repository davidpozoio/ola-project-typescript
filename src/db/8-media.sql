CREATE TABLE multimedia(
    id INT PRIMARY KEY AUTO_INCREMENT,
    type ENUM("card_id", "video") NOT NULL,
    name VARCHAR(200) NOT NULL,
    hash VARCHAR(300) NOT NULL UNIQUE,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id)
)