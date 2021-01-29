create table user(id INTEGER AUTO_INCREMENT,
name VARCHAR(50) not null,
ktuid VARCHAR(20) not null,
email VARCHAR(50) NOT NULL, 
password VARCHAR(200) NOT NULL, 
role VARCHAR(30),
college VARCHAR(200), 
sem VARCHAR(10),
primary key(id))ENGINE=InnoDB;
