CREATE TABLE result(
    id INT PRIMARY KEY AUTO_INCREMENT,
    field_id INT NOT NULL,
    form_id int NOT NULL,
    response JSON NOT NULL,
    FOREIGN KEY(field_id) REFERENCES field(id),
    FOREIGN KEY(form_id) REFERENCES form(id)
);