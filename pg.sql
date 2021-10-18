create database expense_tracker;

--table for category of the items
drop table if exists category;

create table category(
  id serial,
  category_name text,
  username text,
  constraint category_pk primary key(category_name)
);

--table for the items 
drop table if exists items;

create table items(
  item_id text,
  item_name text,
  item_price int,
  purchased_date date,
  category_name text,
  constraint item_pk primary key(item_id),
  CONSTRAINT category_name_fk FOREIGN KEY (category_name) REFERENCES category(category_name)
);

--insert category into category table
insert into
  category(category_name, username)
values
  ('shopping', 'santosh');

--insert item into items
insert into
  items
values
  (
    'SHOA001',
    'books',
    '22',
    '2021-10-17',
    'shopping'
  );

-- generate id for item function
create or replace function generate_item_id(p_category_name text) returns text AS $item_id$ 
declare 
max_id text;
id_length int;
seq_num int;
cat_id text;
alpha text;
begin
select
  max(item_id) into max_id
from
  items
where
  category_name = p_category_name
  and item_id is not null; 
if max_id is null then 
max_id := upper(left(p_category_name,3))||'A001' ;
else
  id_length:=length(max_id);
  cat_id:=left(max_id,3);
  seq_num:=right(max_id,3)::INT;
  alpha:=substr(max_id,4,(id_length-6));
  if seq_num=999 then 
    if alpha ='Z' then 
      RAISE  EXCEPTION 'max sequence exhausted for :%',p_category_name;
    else 
       alpha:=chr(ascii(alpha)+1);
       seq_num:=1;
    end if;
  else 
   seq_num:=seq_num+1;
  end if;
  max_id=cat_id||alpha||LPAD(seq_num::text,3,'0');
end if;
return max_id;
END;
$item_id$ LANGUAGE plpgsql;