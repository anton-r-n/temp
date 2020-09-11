-- mysql -uroot -p < init.sql
drop database if exists webappdb;
drop user if exists webappuser@localhost;

create user webappuser@localhost identified by 'webapppwd';
create database webappdb character set utf8 collate utf8_general_ci;
grant all privileges on webappdb.* to webappuser@localhost;

use webappdb;

source sql/tables/user.sql
