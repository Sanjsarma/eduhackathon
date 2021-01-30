create table user(id INTEGER AUTO_INCREMENT,
name VARCHAR(50) not null,
ktuid VARCHAR(20) not null,
email VARCHAR(50) NOT NULL, 
password VARCHAR(200) NOT NULL, 
role VARCHAR(30),
college VARCHAR(200), 
sem VARCHAR(10),
primary key(id))ENGINE=InnoDB;

create table branch ( id int primary key,
bname varchar(250)
);

create table allotment (
id INTEGER AUTO_INCREMENT,
ktuid varchar(20) references user(ktuid),
courseid varchar(7) references courses(courseid),
unique(ktuid,courseid) ,
primary key(id));

create table courses ( courseid varchar(7) ,
cname varchar(250),
sem int(2),
branchid int, 
link varchar(200),
foreign key (branchid) references branch(id),
primary key (courseid));

alter table user add branchid int;

