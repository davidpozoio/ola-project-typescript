CREATE TABLE link(
    id INT PRIMARY KEY AUTO_INCREMENT,
    hash VARCHAR(200) NOT NULL,
    user_id INT NOT NULL,
    create_at STAMP,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(client_id) REFERENCES client(id)
);
