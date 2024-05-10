CREATE TABLE form(
    id INT PRIMARY KEY AUTO_INCREMENT,
    label VARCHAR(200) DEFAULT "" NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE form_group(
    id INT PRIMARY KEY AUTO_INCREMENT,
    label VARCHAR(200) DEFAULT "" NOT NULL,
    form_id INT NOT NULL,
    FOREIGN KEY(form_id) REFERENCES form(id)
);

CREATE TABLE field(
    id  INT PRIMARY KEY AUTO_INCREMENT,
    label VARCHAR(200) DEFAULT "" NOT NULL,
    component ENUM("input", "select", "multi-select") DEFAULT "input",
    metadata JSON NOT NULL DEFAULT '{"type": "text", "result": {"value": ""}}',
    form_group_id INT NOT NULL,
    FOREIGN KEY(form_group_id) REFERENCES form_group(id)
);