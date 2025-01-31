create database Banking_app;
use Banking_app;

create table notifications(
id integer primary key auto_increment,
    title varchar(255) not null,
    Recipient varchar(255) not null,
    Type varchar(255) not null,
    Verification varchar(255) not null,
    `Trigger` varchar(255) not null,
    Template varchar(255) not null
);
    
select * from notifications;

insert into notifications(title,Recipient,Type,Verification,`Trigger`,Template) values
('Banking Center Action Needed',
    'Manager',
   'Email, Push',
    'None',
    'Details',
    'View Template'),
('New Tax Code Added',
    'Manager',
    'Email, Push',
   'None',
    'Details',
    'View Template'),
('Outstanding Wire Transfer Notification',
    'Manager',
     'Push',
     'None',
   'Details',
    'View Template'),
('Tax Request Action Needed',
     'Manager',
    'Push',
     'None',
     'Details',
   'View Template');


