CREATE TABLE user_form(
    id INT PRIMARY KEY NOT NULL,
    user_id INT NOT NULL,
    form_id INT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(form_id) REFERENCES form(id)
);