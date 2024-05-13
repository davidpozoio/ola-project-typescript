CREATE TABLE result(
    id INT PRIMARY KEY AUTO_INCREMENT,
    field_id INT NOT NULL,
    user_id int NOT NULL,
    FOREIGN KEY(field_id) REFERENCES field(id),
    FOREIGN KEY(user_id) REFERENCES users(id)
);