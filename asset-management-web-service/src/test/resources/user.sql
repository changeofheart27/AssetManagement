insert into user(id,first_name,last_name,dob,joined_date,gender,staff_code,username,location,password,status)
 values
(1,'Nguyen','Nguyen',DATE '1999-01-29',DATE '1999-01-20',1,'NV1111','nguyennguyen','HN','123','enabled'),
(2,'Duong','Manh Hieu',DATE '1999-01-29',DATE '1111-11-11',1,'NV2222','duongmh','HN','$2a$10$ygb2.eYe9QBg9V3DlU7whOLG177uIdtPAZEwl.Xb/QTLqDKT4eGW6','enabled'),
(3,'Dao','Thai',DATE '1999-01-29',DATE '1999-01-20',1,'NV3333','daoninhthai','HN','123','enabled'),
(4,'Long','Long',DATE '1999-01-29',DATE '1999-01-20',1,'NV4444','longlong','HN','123','enabled'),
(5,'Hoang','Hoang',DATE '1999-01-29',DATE '1999-01-20',1,'NV5555','hoanghoang','HN','123','enabled'),
(6,'Huong','Huong',DATE '1999-01-29',DATE '1999-01-20',1,'NV6666','huonghuong','HN','123','enabled'),
(7,'Tuan','Tuan',DATE '1999-01-29',DATE '1999-01-20',1,'NV7777','tuantuan','HN','123','enabled');

insert into authorities(id, user_id, authority)
values
(1, 1, 'ADMIN'),
(2, 2, 'ADMIN'),
(3, 3, 'ADMIN'),
(4, 4, 'ADMIN'),
(5, 5, 'ADMIN'),
(6, 6, 'ADMIN'),
(7, 7, 'ADMIN');
