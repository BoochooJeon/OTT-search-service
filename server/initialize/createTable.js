const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: '127.0.0.1', // 데이터베이스 서버 주소
    port: 3306,
    user: 'root',      // 데이터베이스 사용자 이름
    password: '201711161',      // 데이터베이스 비밀번호
    database: 'ott-v.0.2',
  });
  

connection.connect(err => {
  if (err) {
    return console.error('error: ' + err.message);
  }

  console.log('Connected to the MySQL server.');

  // // 데이터베이스 생성
  // connection.query("CREATE DATABASE IF NOT EXISTS ott-v.0.2", function (err, result) {
  //   if (err) throw err;
  //   console.log("Database created");
  // });


  // 테이블 생성
  const createUserTableSql = `
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    birth DATE NOT NULL,
    favorite_genre VARCHAR(100),
    subscript_ott VARCHAR(100),
    UNIQUE (username),
    UNIQUE (email)
  );`;

  connection.query(createUserTableSql, function (err, result) {
    if (err) {
      console.error(err.message);
    } else {
      console.log("Table created");
    }
  });


  const createMovieTableSql = `
  CREATE TABLE IF NOT EXISTS movies (
    movie_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    director VARCHAR(255),
    genre ENUM('Action', 'Adventure', 'Comedy', 'Horror', 'Romance', 'SF', 'Thriller', 'Animation') NOT NULL,
    runtime INT NOT NULL,
    poster_location VARCHAR(500), 
    UNIQUE (title)
);
  `;

  connection.query(createMovieTableSql, function (err, result) {
    if (err) {
      console.error(err.message);
    } else {
      console.log("Table created");
    }
  });

  const createOttTableSql = `
  CREATE TABLE IF NOT EXISTS ott_platforms (
    ott_id INT AUTO_INCREMENT PRIMARY KEY,
    name ENUM('Netflix', 'Disney+', 'Amazon Prime Video', 'Apple TV+', 'Hulu') NOT NULL UNIQUE,
    monthly_fee INT  -- 원화 기준 1달 요금
);
`;

  connection.query(createOttTableSql, function (err, result) {
    if (err) {
      console.error(err.message);
    } else {
      console.log("Table created");
    }
  });


  const createOttMovieRelationTableSql = `
  CREATE TABLE IF NOT EXISTS movies_ott (
    movie_id INT,
    ott_id INT,
    PRIMARY KEY (movie_id, ott_id),
    FOREIGN KEY (movie_id) REFERENCES movies(movie_id),
    FOREIGN KEY (ott_id) REFERENCES ott_platforms(ott_id)
);`;
  
connection.query(createOttMovieRelationTableSql, function (err, result) {
  if (err) {
    console.error(err.message);
  } else {
    console.log("Table created");
  }
});



  // 연결 종료
  connection.end();
});

