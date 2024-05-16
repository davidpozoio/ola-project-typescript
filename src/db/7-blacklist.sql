CREATE TABLE blacklist(
    id INT PRIMARY KEY AUTO_INCREMENT,
    token VARCHAR(300) NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id)
);