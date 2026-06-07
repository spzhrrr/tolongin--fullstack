CREATE DATABASE proyeksa_db;

USE proyeksa_db;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  bio TEXT,
  avatar VARCHAR(255),
  phone VARCHAR(50),
  location VARCHAR(100)
);

CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100)
);

CREATE TABLE services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  price INT,
  user_id INT,
  category_id INT,
  image VARCHAR(255),

  FOREIGN KEY (user_id)
  REFERENCES users(id),

  FOREIGN KEY (category_id)
  REFERENCES categories(id)
);

CREATE TABLE bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  service_id INT,
  buyer_id INT,
  status VARCHAR(50),

  FOREIGN KEY (service_id)
  REFERENCES services(id),

  FOREIGN KEY (buyer_id)
  REFERENCES users(id)
);

CREATE TABLE reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  service_id INT,
  reviewer_id INT,
  rating INT,
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (service_id)
  REFERENCES services(id),

  FOREIGN KEY (reviewer_id)
  REFERENCES users(id)
);