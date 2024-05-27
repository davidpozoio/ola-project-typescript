CREATE TABLE field(
    id  INT PRIMARY KEY AUTO_INCREMENT,
    label VARCHAR(200) DEFAULT "" NOT NULL,
    component ENUM("input", "select", "multi-select", "check", "chip") DEFAULT "input",
    metadata JSON NOT NULL,
    form_group_id INT NOT NULL,
    FOREIGN KEY(form_group_id) REFERENCES form_group(id)
)