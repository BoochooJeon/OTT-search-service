const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: '127.0.0.1', // 데이터베이스 서버 주소
    port: 3306,
    user: 'root',      // 데이터베이스 사용자 이름
    password: '201711161',      // 데이터베이스 비밀번호
    database: 'ott-v.0.1',
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
//('Action', 'Adventure', 'Comedy', 'Horror', 'Romance', 'SF', 'Thriller', 'Animation')
// 영화 정보 삽입 함수
function insertMovies() {
    const query = `
        INSERT INTO movies (title, director, genre, runtime, poster_location)
        VALUES 
        ('탑건: 매버릭', 'Joseph Kosinski', 'Action', 130, '/posters/탑건_매버릭.jpeg'),
        ('말죽거리 잔혹사', '유하', 'Action', 116, '/posters/말죽거리_잔혹사.jpeg'),
        ('헝거게임:캣칭 파이어', 'Francis Lawrence', 'Action', 146, '/posters/헝거게임_캣칭_파이어.jpeg'),
        ('실미도', '강우석', 'Action', 135, '/posters/실미도.jpeg'),
        ('호빗: 뜻밖의 여정', 'Peter Jackson', 'Adventure', 169, '/posters/호빗_뜻밖의_여정.jpeg'),
        ('로빈후드', 'Ridley Scott', 'Adventure', 140, '/posters/로빈_후드.jpeg'),
        ('인디아나 존스: 운명의 다이얼', 'James Mangold', 'Adventure', 154, '/posters/인디아나_존스_운명의_다이얼.jpeg'),
        ('캐리비안의 해적 - 블랙 펄의 저주', 'Gore Verbinski', 'Adventure', 143, '/posters/캐리비안의_해적_블랙펄의_저주.jpeg'),
        ('에브리씽 에브리웨어 올 앳 원스', 'Daniel Kwan', 'Comedy', 139, '/posters/에브리씽_에브리웨어_올_앳_원스.jpeg'),
        ('극한직업', '이병헌', 'Comedy', 111, '/posters/극한직업.jpeg');
        ('화사한 그녀', '이승준', 'Comedy', 121, '/posters/화사한_그녀.jpeg');
        ('30일', '남대중', 'Comedy', 119, '/posters/30일.jpeg');
        ('컨저링2', 'James Wan', 'Horror', 134, '/posters/컨저링2.jpeg');
        ('곡성', '나홍진', 'Horror', 156, '/posters/곡성.jpeg');
        ('엑스텐션', 'Alexandre Aja', 'Horror', 85, '/posters/엑스텐션.jpeg');
        ('라이트 아웃', 'David F. Sandberg', 'Horror', 81, '/posters/라이트_아웃.jpeg');
        ('미녀와 야수', 'Bill Condon', 'Romance', 129, '/posters/미녀와_야수.jpeg');
        ('노트북', 'Nick Cassavetes', 'Romance', 123, '/posters/노트북.jpeg');
        ('어바웃 타임', 'Richard Curtis', 'Romance', 123, '/posters/어바웃_타임.jpeg');
        ('500일의 썸머', 'Marc Webb', 'Romance', 95, '/posters/500일의_썸머.jpeg');
        ('크리에이터', 'Gareth Edwards', 'SF', 133, '/posters/크리에이터.jpeg');
        ('인터스텔라', 'Christopher Nolan', 'SF', 169, '/posters/인터스텔라.jpeg');
        ('레디 플레이어 원', 'Steven Spielberg', 'SF', 140, '/posters/레디_플레이어_원.jpeg');
        ('듄', 'Denis Villeneuve', 'SF', 155, '/posters/듄.jpeg');
        ('오펜하이머', 'Christopher Nolan', 'Thriller', 180, '/posters/오펜하이머.jpeg');
        ('올빼미', '안태진', 'Thriller', 118, '/posters/올빼미.jpeg');
        ('타겟', '박희곤', 'Thriller', 101, '/posters/타겟.jpeg');
        ('끝까지 간다', '김성훈', 'Thriller', 111, '/posters/끝까지_간다.jpeg');
        ('스즈메의 문단속', 'Makoto Niitsu', 'Animation', 122, '/posters/스즈메의_문단속.jpeg');
        ('너의 이름은', 'Makoto Niitsu', 'Animation', 106, '/posters/너의_이름은.jpeg');
        ('엘리멘탈', 'Peter Sohn', 'Animation', 109, '/posters/엘리멘탈.jpeg');
        ('겨울왕국', 'Chris Buck', 'Animation', 108, '/posters/겨울왕국.jpeg');
    `;

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error inserting movies: ' + err);
            return;
        }
        console.log('Movies inserted:', results.affectedRows);
    });
}
//32
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
        (10, 5),
        (11, 2),
        (11, 1),
        (12, 2),
        (13, 1),
        (13, 2),
        (13, 4),
        (14, 3),
        (15, 5),
        (16, 1),
        (16, 2),
        (17, 4),
        (18, 3),
        (19, 1),
        (19, 3),
        (20, 1),
        (21, 2),
        (22, 3),
        (22, 4),
        (23, 5),
        (24, 1),
        (24, 5),
        (25, 1),
        (26, 2),
        (27, 3),
        (28, 4),
        (29, 2),
        (29, 1),
        (30, 2),
        (30, 4),
        (31, 5),
        (32, 2);
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