drop table if exists `user`;

create table `user` (
  `id` int unsigned not null auto_increment,
  `email` char(75) not null,
  `username` char(75) not null,
  `firstname` char(75) not null,
  `lastname` char(75) not null,
  `password` char(75) not null,
  primary key(`id`)
) engine=InnoDB default charset=utf8;

insert into `user` (email, username, firstname, lastname, password) values
  ('james.smith@gmail.com', 'jsmith', 'James', 'Smith', '123'),
  ('larry.ryan@gmail.com', 'larry', 'Larry', 'Ryan', '123'),
  ('raymond.frank@gmail.com', 'rfrank', 'Raymond', 'Frank', '123');

drop table if exists `profile`;

create table `profile` (
  `id` int unsigned not null auto_increment,
  `user_id` int unsigned not null,
  `groups` char(150) not null default '',
  primary key (`id`),
  foreign key (`user_id`) references `user` (id)
) engine=InnoDB default charset=utf8;

insert into `profile` (`user_id`, `groups`) values
  (1, 'admins,moderators'),
  (2, 'moderators,developers'),
  (3, 'abc');

drop table if exists `lessons`;

create table `lessons` (
  `id` int unsigned not null auto_increment,
  `title` char(75) not null,
  `start_time` datetime not null,
  primary key (`id`)
) engine=InnoDB default charset=utf8;

insert into `lessons` (title, start_time) values
  ('Lesson 123', '2020-09-15 10:00'),
  ('Lesson 345', '2020-09-15 11:00'),
  ('Lesson 567', '2020-09-15 12:00');
