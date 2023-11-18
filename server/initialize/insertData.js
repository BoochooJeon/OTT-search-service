const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: '127.0.0.1', // 데이터베이스 서버 주소
    port: 3306,
    user: 'root',      // 데이터베이스 사용자 이름
    password: '201711161',      // 데이터베이스 비밀번호
    database: 'ott',
});

// 데이터베이스에 연결
connection.connect(err => {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }

    console.log('Connected as ID ' + connection.threadId);
});


// OTT 플랫폼 데이터를 삽입하는 함수
function insertOttPlatforms() {
    const query = `
        INSERT INTO ott_platforms (name, monthly_fee) VALUES
        ('Netflix', 9500),
        ('Disney+', 7900),
        ('Amazon Prime Video', 5900),
        ('Apple TV+', 6500),
        ('Hulu', 8500);
    `;

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error inserting data: ' + err);
            return;
        }
        console.log('OTT Platforms inserted:', results.affectedRows);
    });
}

// 영화 정보 삽입 함수
function insertMovies() {
    const query = `
        INSERT INTO movies (title, director, genre, runtime, poster_location)
        VALUES 
        ('Movie Title 1', 'Director 1', 'Action', 120, '/posters/movie1.jpg'),
        ('Movie Title 2', 'Director 2', 'Drama', 135, '/posters/movie2.jpg'),
        ('Movie Title 3', 'Director 3', 'Comedy', 90, '/posters/movie3.jpg'),
        ('Movie Title 4', 'Director 4', 'Horror', 110, '/posters/movie4.jpg'),
        ('Movie Title 5', 'Director 5', 'Romance', 100, '/posters/movie5.jpg'),
        ('Movie Title 6', 'Director 6', 'Thriller', 115, '/posters/movie6.jpg'),
        ('Movie Title 7', 'Director 7', 'Documentary', 85, '/posters/movie7.jpg'),
        ('Movie Title 8', 'Director 8', 'Animation', 95, '/posters/movie8.jpg'),
        ('Movie Title 9', 'Director 9', 'SF', 130, '/posters/movie9.jpg'),
        ('Movie Title 10', 'Director 10', 'Musical', 140, '/posters/movie10.jpg');
    `;

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error inserting movies: ' + err);
            return;
        }
        console.log('Movies inserted:', results.affectedRows);
    });
}

const insertMoviesOttRelation = () => {
    const query = `
        INSERT INTO movies_ott (movie_id, ott_id)
        VALUES 
        (1, 1),
        (1, 3),
        (2, 1),
        (2, 2), 
        (3, 3), 
        (3, 4),
        (4, 5),
        (5, 2),
        (6, 1),
        (7, 4),
        (8, 1),
        (9, 2),
        (9, 4),
        (10, 5);
    `;

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error inserting movies_ott relation: ' + err);
            return;
        }
        console.log('Movies and OTT relation inserted:', results.affectedRows);
    });
};

// 함수 실행
insertMovies();
insertOttPlatforms();
insertMoviesOttRelation();

// 연결 종료
connection.end();