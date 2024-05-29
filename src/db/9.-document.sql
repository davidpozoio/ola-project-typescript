CREATE TABLE document(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name_card_front VARCHAR(300) NOT NULL,
    name_card_back VARCHAR(300) NOT NULL,
    name_video VARCHAR(300) NOT NULL,
    user_id INT NOT NULL UNIQUE,
    FOREIGN KEY(user_id) REFERENCES user(id)
)