DROP DATABASE Runal_ko_sari;
create database Runal_ko_sari;
use Runal_ko_sari;
CREATE table User_info(
  U_ID int PRIMARY KEY AUTO_INCREMENT,
  NAME varchar(30),
  ADDRESS varchar(40),
  USERNAME varchar(16),
  EMAIL varchar(50),
  PHONENO varchar(10),
  PASSWORD varchar(100),
  TYPE int
);
CREATE TABLE IMAGE(
  IMAGE_ID INT PRIMARY KEY AUTO_INCREMENT,
  IMAGE_INFO VARCHAR(90)
);
CREATE table Products(
  P_ID int PRIMARY KEY AUTO_INCREMENT,
  IMAGE_ID INT,
  TYPES varchar(20),
  P_NAME varchar(20),
  P_SIZE varchar(4),
  P_COLOR varchar(10),
  QTY int,
  DISCRIPTION varchar(300),
  PRICE float,
  FOREIGN KEY(IMAGE_ID) REFERENCES IMAGE (IMAGE_ID)
);
CREATE table CART(
  C_ID int PRIMARY KEY AUTO_INCREMENT,
  U_ID INT,
  P_ID INT,
  P_NAME varchar(20),
  P_SIZE varchar(4),
  P_COLOR varchar(10),
  TYPES varchar(30),
  QTY int,
  PRICE float,
  TOTAL FLOAT,
  SUMTOTAL FLOAT,
  IMAGE_INFO VARCHAR(90),
  FOREIGN KEY(U_ID) REFERENCES USER_INFO (U_ID),
  FOREIGN KEY (P_ID) REFERENCES PRODUCTS(P_ID)
);
CREATE TABLE DELEVERY(
  D_ID int PRIMARY KEY AUTO_INCREMENT,
  U_ID INT,
  P_ID INT,
  C_ID int,
  COUNT_DELEVERY int,
  F_NAME VARCHAR(20),
  HOME_NO VARCHAR(20),
  PHONENO varchar(10),
  CITY VARCHAR(40),
  SUMTOTAL FLOAT,
  TYPES varchar(30),
  FOREIGN KEY(U_ID) REFERENCES USER_INFO (U_ID),
  FOREIGN KEY (P_ID) REFERENCES PRODUCTS(P_ID),
  FOREIGN KEY (C_ID) REFERENCES CART(C_ID)
);
CREATE TABLE ADMIN(
  U_ID INT,
  P_ID INT,
  C_ID int,
  D_ID INT,
  Date VARCHAR(12),
  IMAGE_ID INT,
  CITY VARCHAR(40),
  SUMTOTAL FLOAT,
  TYPES varchar(30),
  FOREIGN KEY(U_ID) REFERENCES USER_INFO (U_ID),
  FOREIGN KEY (P_ID) REFERENCES PRODUCTS(P_ID),
  FOREIGN KEY (D_ID) REFERENCES DELEVERY(D_ID),
  FOREIGN KEY (IMAGE_ID) REFERENCES IMAGE(IMAGE_ID),
  FOREIGN KEY (C_ID) REFERENCES CART(C_ID)
);
create view SelectProducts as
select
  Products.P_ID,
  P_NAME,
  TYPES,
  IMAGE_INFO,
  P_SIZE,
  P_COLOR,
  QTY,
  DISCRIPTION,
  PRICE
from IMAGE
inner join Products on IMAGE.IMAGE_ID = Products.IMAGE_ID;
create view admin_cart as
select
  products.P_ID,
  delevery.TYPES,
  products.PRICE
from products
inner join delevery on products.P_ID = delevery.P_ID;
create view Delevered_Products as
select
  username,
  COUNT_DELEVERY
from user_info
inner join delevery on user_info.U_ID = delevery.U_ID;
select
  *
from SelectProducts;
drop view SelectProducts;
drop view admin_cart;
drop view Delevered_Products;