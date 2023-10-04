
create database hackathon_advance;
use hackathon_advance;	

drop table category;
create table category(
id int primary key auto_increment,
name char(50) not null
);
insert into category(name) 
values('Lich Su'),
		('Toan Hoc');

drop table question;
create table question(
id int primary key auto_increment,
content longtext not null,
created_at_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP not null,
level tinyint not null,
category_id int not null,
FOREIGN KEY (category_id) REFERENCES category(id)
);
insert into question(content,level,category_id)
values('Nha nuoc dau tien cua nuoc ta la gi?',1,1),
		('Vi vua dau tien cua nuoc ta?',2,1),
        ('Thanh tuu dac sac ve phong trao cua nguoi dan Au Lac la gi?',3,1),
		('1 + 1?',1,2),
		('2 + 2?',2,2),
        ('2 + 3?',3,2);
      
    drop table answer;  
create table answer(
id int primary key auto_increment,
is_answer int not null,
content longtext not null,
created_at_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP not null,
question_id int not null,
FOREIGN KEY (question_id) REFERENCES question(id)
);

insert into answer(is_answer,content, question_id)
values(1,'Văn lang',1),
(0,'Âu lạc',1),
(0,'Việt Nam',1),
(0,'Lào',1),

(1,'Vua Hùng Vương',2),
(0,'An DƯơng Vương',2),
(0,'Bảo Đại',2),
(0,'Hehe',2),

(1,'chế tạo loại nỏ bắn một lần được nhiều mũi tên',3),
(0,' nhiều mũi tên',3),
(0,' nhiều mũi tên2',3),
(0,' nhiều mũi tên3',3),

(1,'2',4),
(0,'3',4),
(0,'4',4),
(0,'5',4),

(1,'4',5),
(0,'5',5),
(0,'6',5),
(0,'7',5),

(1,'5',6),
(0,'6',6),
(0,'7',6),
(0,'8',6);

SELECT 
question.id, question.content AS question_content, 
 answer.content AS  answer_content,is_answer
FROM question
JOIN answer ON question.id = answer.question_id
WHERE question.id = 1;

SELECT c.name AS category_name, q.level
FROM category c
LEFT JOIN question q ON c.id = q.category_id
LEFT JOIN answer a ON q.id = a.question_id
limit 5;








