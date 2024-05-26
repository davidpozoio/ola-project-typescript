CREATE TABLE form(
    id INT PRIMARY KEY AUTO_INCREMENT,
    done BOOLEAN NOT NULL DEFAULT 0,
    hash VARCHAR(500),
    user_id INT NOT NULL,
    form_scheme_id INT NOT NULL,
    expire_hash_time DATETIME DEFAULT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(form_scheme_id) REFERENCES form_scheme(id)
)
