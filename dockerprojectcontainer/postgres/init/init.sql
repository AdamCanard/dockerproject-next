CREATE SEQUENCE IF NOT EXISTS seq_userId 
AS INTEGER
MINVALUE 0
INCREMENT BY 1
START WITH 1;

CREATE TABLE IF NOT EXISTS users (
  userId INTEGER PRIMARY KEY DEFAULT nextval('seq_userId'), 
  password VARCHAR(20),
  userdata TEXT DEFAULT ''
);

INSERT INTO users (password) VALUES ('P@ssw0rd');
