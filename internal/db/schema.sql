create table if not exists sites (
  id integer primary key autoincrement,
  title text not null,
  slug text not null unique,
  description text not null default '',
  url text not null default '',
  image text not null default '',
  created_at timestamp not null default (current_timestamp)
);

create table if not exists prices (
  id integer primary key autoincrement,
  name text not null,
  description text not null default '',
  amount integer not null,              
  currency text not null default 'RUB',
  sort integer not null default 0,
  image_main text not null default '',  
  image_bg   text not null default '', 
  variant    text not null default 'price1', 
  created_at timestamp not null default (current_timestamp)
);

create table if not exists price_features (
  id integer primary key autoincrement,
  price_id integer not null,
  icon text not null default '',        
  text text not null default '',        
  sort integer not null default 0,
  created_at timestamp not null default (current_timestamp),
  foreign key (price_id) references prices(id) on delete cascade
);
