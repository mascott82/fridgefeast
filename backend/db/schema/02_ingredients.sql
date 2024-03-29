-- Drop and recreate Users table

DROP TABLE IF EXISTS ingredients CASCADE;
CREATE TABLE ingredients (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  quantity VARCHAR(255) NOT NULL,
  image VARCHAR(255) NOT NULL,
  expiry_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
