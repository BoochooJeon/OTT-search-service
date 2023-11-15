const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: '127.0.0.1', // 데이터베이스 서버 주소
    port: 3306,
    user: 'root',      // 데이터베이스 사용자 이름
    password: '201711161',      // 데이터베이스 비밀번호
    database: 'ott',
  });
  

connection.connect(err => {
  if (err) {
    return console.error('error: ' + err.message);
  }

  console.log('Connected to the MySQL server.');

  // 데이터베이스 생성
  connection.query("CREATE DATABASE IF NOT EXISTS ott", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });


  // 테이블 생성
  const createTableSql = `
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

  connection.query(createTableSql, function (err, result) {
    if (err) {
      console.error(err.message);
    } else {
      console.log("Table created");
    }
  });


  // 회원가입 
  // const user = {
  //   username: 'dgwogh',
  //   password: '201711161',
  //   name: 'JaeHo Jeon',
  //   email: 'dgwogh@dgist.ac.kr',
  //   birth: '1998-10-03', // YYYY-MM-DD 형식
  //   favorite_genre: 'Comedy',
  //   subscript_ott: 'Netflix',
  // };

  // const hash = bcrypt.hashSync(user.password, 10);

  // const query = 'INSERT INTO users (username, password, name, email, birth, favorite_genre, subscript_ott) VALUES (?, ?, ?, ?, ?, ?, ?)';
  //   connection.query(query, [user.username, hash, user.name, user.email, user.birth, user.favorite_genre, user.subscript_ott], (err, results) => {
  //       if (err) {
  //           console.error(err);
  //           return;
  //       }
  //       console.log('User registered:', results.insertId);
  //   });


  // 연결 종료
  connection.end();
});


