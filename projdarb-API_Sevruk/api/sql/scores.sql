USE app;

CREATE TABLE IF NOT EXISTS scores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    playername VARCHAR(255) NOT NULL,
    score INT,
    mode INT
);