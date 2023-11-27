const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const bodyParser = require("body-parser");
const express = require("express");
const cors = require('cors');


const connection = mysql.createConnection({
  host: '127.0.0.1', // 데이터베이스 서버 주소
  port: 3306,
  user: 'root',      // 데이터베이스 사용자 이름
  password: 'anscksdn99',      // 데이터베이스 비밀번호
  database: 'ott-v.0.2',
});


const app = express();

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server On : http://localhost:${PORT}/`);
});


app.use(bodyParser.json());
app.use(cors());

//http://localhost:3001/register?username=dgwogh&password=!!Wjswogh3232&name=BoochooJeon%20Johnson&email=dgwogh%dgist.ac.kr&birth=1998-10-03&favorite_genre=Drama&subscript_ott=NETFLIX
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
  });
});


async function authenticateAndGetUserInfo(username, password) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM users WHERE username = ?';
    connection.query(query, [username], async (error, results) => {
      if (error) {
        return reject(error);
      }
      if (results.length === 0) {
        return resolve(null); // 사용자가 존재하지 않음
      }
      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return resolve(null); // 비밀번호가 일치하지 않음
      }
      // 민감한 정보 삭제
      delete user.password;
      resolve(user); // 사용자 정보 반환
    });
  });
}

// 로그인 라우트
//http://localhost:3001/login?username=dgwogh&password=201711161
app.get('/login', async (req, res) => {
  const { username, password } = req.query;
  try {
    const user = await authenticateAndGetUserInfo(username, password);
    if (user) {
      res.json(user); // 사용자 정보 반환
    } else {
      res.status(401).send('Invalid credentials'); // 인증 실패
    }
  } catch (error) {
    res.status(500).send('Server error');
  }
});


// 영화 이름 -> 영화 정보 , 없으면 없다고
// 특정 영화가 상영 중인 OTT 플랫폼 조회 API
//http://localhost:3001/movie-ott?title=Movie Title 2
app.get('/movie-ott', (req, res) => {
  const movieTitle = req.query.title;
  console.log("passing here");
  console.log("movieTitle: ", movieTitle);

  if (!movieTitle) {
      return res.status(400).send('Movie title is required');
  }

  const query = `
        SELECT 
            m.title, 
            m.director, 
            m.genre, 
            m.runtime, 
            m.poster_location, 
            GROUP_CONCAT(o.name SEPARATOR ', ') AS ott_platforms
        FROM 
            movies m
        JOIN 
            movies_ott mo ON m.movie_id = mo.movie_id
        JOIN 
            ott_platforms o ON mo.ott_id = o.ott_id
        WHERE 
            m.title = ?
        GROUP BY 
            m.movie_id;
    `;

  connection.query(query, [movieTitle], (err, results) => {
      if (err) {
          console.error('Error querying movie OTT information: ' + err);
          return res.status(500).send('Error fetching movie OTT information');
      }
      console.log(results[0]);
      res.json(results[0] || null);
  });
});


// 영화 추천 장르, n개 (최대 10개까지 가능)
//http://localhost:3001/movies?genre=Action&limit=1
app.get('/movies', (req, res) => {
  const genre = req.query.genre;
  const limit = parseInt(req.query.limit, 10);

  if (!genre || isNaN(limit)) {
      return res.status(400).send('Invalid genre or limit');
  }

  const query = 'SELECT * FROM movies WHERE genre = ? LIMIT ?';
  connection.query(query, [genre, limit], (err, results) => {
      if (err) {
          console.error('Error querying movies: ' + err);
          return res.status(500).send('Error fetching movies');
      }
      res.json(results);
  });
});





