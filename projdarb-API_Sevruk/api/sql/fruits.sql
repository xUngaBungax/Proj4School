USE app;

CREATE TABLE IF NOT EXISTS fruits (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    UNIQUE KEY unique_name (name)
);

INSERT IGNORE INTO fruits (name) VALUES
    ('Banana'),
    ('Apple'),
    ('Orange'),
    ('Strawberry'),
    ('Grapes'),
    ('Watermelon'),
    ('Pineapple'),
    ('Mango'),
    ('Lemon'),
    ('Avocado'),
    ('Peach'),
    ('Cherry'),
    ('Pear'),
    ('Kiwi'),
    ('Papaya'),
    ('Plum'),
    ('Blueberry'),
    ('Raspberry'),
    ('Blackberry'),
    ('Coconut');