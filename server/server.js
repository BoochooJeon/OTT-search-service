const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const bodyParser = require("body-parser");
const express = require("express");


const connection = mysql.createConnection({
  host: '127.0.0.1', // 데이터베이스 서버 주소
  port: 3306,
  user: 'root',      // 데이터베이스 사용자 이름
  password: '201711161',      // 데이터베이스 비밀번호
  database: 'ott',
});


const app = express();

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server On : http://localhost:${PORT}/`);
});


app.use(bodyParser.json());


//http://localhost:3000/register?username=alex123&password=pass456&name=Alex%20Johnson&email=alex.johnson%40example.com&birth=1992-04-15&favorite_genre=Drama&subscript_ott=Hulu
// 회원가입 라우트
app.get('/register', (req, res) => {
  console.log("pass");
  console.log(req.body);
  const { username, password, name, email, birth, favorite_genre, subscript_ott } = req.query;
  console.log(username, password, name, email, birth, favorite_genre, subscript_ott);
  // 입력값 검증 (실제 애플리케이션에서는 더 강화된 검증이 필요합니다)
  if (!username || !password || !name || !email || !birth) {
    return res.status(400).send({ message: 'Some fields are missing' });
  }

  // 비밀번호 해싱
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.error('Error hashing password: ' + err);
      return res.status(500).send({ message: 'Error processing your request' });
    }

    // 사용자 정보 삽입 쿼리
    const query = `
      INSERT INTO users (username, password, name, email, birth, favorite_genre, subscript_ott)
      VALUES (?, ?, ?, ?, ?, ?, ?);
    `;

    connection.query(query, [username, hash, name, email, birth, favorite_genre, subscript_ott], (error, results) => {
      if (error) {
        console.error('Error inserting user data: ' + error);
        return res.status(500).send({ message: 'Error processing your request' });
      }
      res.status(201).send({ message: 'User registered successfully', userId: results.insertId });
    });
    connection.end();
  });
});


