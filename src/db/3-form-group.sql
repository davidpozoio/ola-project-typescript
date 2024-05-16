CREATE TABLE form_group(
    id INT PRIMARY KEY AUTO_INCREMENT,
    label VARCHAR(200) DEFAULT "" NOT NULL,
    form_scheme_id INT NOT NULL,
    FOREIGN KEY(form_scheme_id) REFERENCES form_scheme(id)
);