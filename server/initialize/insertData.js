const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: '127.0.0.1', // 데이터베이스 서버 주소
    port: 3306,
    user: 'root',      // 데이터베이스 사용자 이름
    password: '201711161',      // 데이터베이스 비밀번호
    database: 'ott-v.0.2',
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
        ('탑건: 매버릭', 'Joseph Kosinski', 'Action', 130, 'https://search.pstatic.net/common?type=o&size=176x264&quality=85&direct=true&src=https%3A%2F%2Fs.pstatic.net%2Fmovie.phinf%2F20220509_176%2F1652081912471yhg3N_JPEG%2Fmovie_image.jpg%3Ftype%3Dw640_2'),
        ('말죽거리 잔혹사', '유하', 'Action', 116, 'https://search.pstatic.net/common?type=o&size=176x264&quality=85&direct=true&src=https%3A%2F%2Fs.pstatic.net%2Fmovie.phinf%2F20111222_184%2F1324495774928y3gEe_JPEG%2Fmovie_image.jpg%3Ftype%3Dw640_2'),
        ('헝거게임: 캣칭 파이어', 'Francis Lawrence', 'Action', 146, 'https://search.pstatic.net/common?type=o&size=176x264&quality=85&direct=true&src=https%3A%2F%2Fs.pstatic.net%2Fmovie.phinf%2F20131105_185%2F1383644515842maJk5_JPEG%2Fmovie_image.jpg%3Ftype%3Dw640_2'),
        ('실미도', '강우석', 'Action', 135, 'https://search.pstatic.net/common?type=o&size=176x264&quality=85&direct=true&src=https%3A%2F%2Fs.pstatic.net%2Fmovie.phinf%2F20111222_50%2F1324503591769RwYSb_JPEG%2Fmovie_image.jpg%3Ftype%3Dw640_2'),
        ('호빗: 뜻밖의 여정', 'Peter Jackson', 'Adventure', 169, 'https://search.pstatic.net/common?type=o&size=176x264&quality=85&direct=true&src=https%3A%2F%2Fs.pstatic.net%2Fmovie.phinf%2F20121029_82%2F1351496208030NRj4u_JPEG%2Fmovie_image.jpg%3Ftype%3Dw640_2'),
        ('로빈후드', 'Ridley Scott', 'Adventure', 140, 'https://search.pstatic.net/common?type=o&size=174x242&quality=85&direct=true&src=https%3A%2F%2Fs.pstatic.net%2Fmovie.phinf%2F20111223_144%2F1324609829594wa5U9_JPEG%2Fmovie_image.jpg%3Ftype%3Dw640_2'),
        ('인디아나 존스: 운명의 다이얼', 'James Mangold', 'Adventure', 154, 'https://search.pstatic.net/common?type=o&size=176x264&quality=85&direct=true&src=https%3A%2F%2Fs.pstatic.net%2Fmovie.phinf%2F20230628_220%2F1687943829231S0gtc_JPEG%2Fmovie_image.jpg%3Ftype%3Dw640_2'),
        ('캐리비안의 해적 - 블랙 펄의 저주', 'Gore Verbinski', 'Adventure', 143, 'https://search.pstatic.net/common?type=o&size=176x264&quality=85&direct=true&src=https%3A%2F%2Fs.pstatic.net%2Fmovie.phinf%2F20111222_67%2F1324497057705eJisV_JPEG%2Fmovie_image.jpg%3Ftype%3Dw640_2'),
        ('에브리씽 에브리웨어 올 앳 원스', 'Daniel Kwan', 'Comedy', 139, 'https://search.pstatic.net/common?type=o&size=176x264&quality=85&direct=true&src=https%3A%2F%2Fs.pstatic.net%2Fmovie.phinf%2F20231004_149%2F1696404381584OnBTC_JPEG%2Fmovie_image.jpg%3Ftype%3Dw640_2'),
        ('극한직업', '이병헌', 'Comedy', 111, 'https://search.pstatic.net/common?type=o&size=176x264&quality=85&direct=true&src=https%3A%2F%2Fs.pstatic.net%2Fmovie.phinf%2F20190116_206%2F1547615429111dINWj_JPEG%2Fmovie_image.jpg%3Ftype%3Dw640_2'),
        ('화사한 그녀', '이승준', 'Comedy', 121, 'https://search.pstatic.net/common?type=o&size=176x264&quality=85&direct=true&src=https%3A%2F%2Fs.pstatic.net%2Fmovie.phinf%2F20231017_178%2F1697516282480BpF4W_JPEG%2Fmovie_image.jpg%3Ftype%3Dw640_2'),
        ('30일', '남대중', 'Comedy', 119, 'https://search.pstatic.net/common?type=o&size=176x264&quality=85&direct=true&src=https%3A%2F%2Fs.pstatic.net%2Fmovie.phinf%2F20231004_194%2F1696419602810jWf6f_JPEG%2Fmovie_image.jpg%3Ftype%3Dw640_2'),
        ('컨저링2', 'James Wan', 'Horror', 134, 'https://search.pstatic.net/common?type=o&size=176x264&quality=85&direct=true&src=https%3A%2F%2Fs.pstatic.net%2Fmovie.phinf%2F20160525_161%2F1464156291880IEpkO_JPEG%2Fmovie_image.jpg%3Ftype%3Dw640_2'),
        ('곡성', '나홍진', 'Horror', 156, 'https://search.pstatic.net/common?type=o&size=176x264&quality=85&direct=true&src=https%3A%2F%2Fs.pstatic.net%2Fmovie.phinf%2F20160425_165%2F1461560165179gYQ0g_JPEG%2Fmovie_image.jpg%3Ftype%3Dw640_2'),
        ('엑스텐션', 'Alexandre Aja', 'Horror', 85, 'https://search.pstatic.net/common?type=o&size=176x264&quality=85&direct=true&src=https%3A%2F%2Fs.pstatic.net%2Fmovie.phinf%2F20170704_101%2F1499157377899Qpr8g_JPEG%2Fmovie_image.jpg%3Ftype%3Dw640_2'),
        ('라이트 아웃', 'David F. Sandberg', 'Horror', 81, 'https://search.pstatic.net/common?type=o&size=176x264&quality=85&direct=true&src=https%3A%2F%2Fs.pstatic.net%2Fmovie.phinf%2F20160725_249%2F1469408792231AYlvh_JPEG%2Fmovie_image.jpg%3Ftype%3Dw640_2'),
        ('미녀와 야수', 'Bill Condon', 'Romance', 129, 'https://search.pstatic.net/common?type=o&size=176x264&quality=85&direct=true&src=https%3A%2F%2Fs.pstatic.net%2Fmovie.phinf%2F20170207_61%2F14864349974992zXL8_JPEG%2Fmovie_image.jpg%3Ftype%3Dw640_2'),
        ('노트북', 'Nick Cassavetes', 'Romance', 123, 'https://search.pstatic.net/common?type=o&size=176x264&quality=85&direct=true&src=https%3A%2F%2Fs.pstatic.net%2Fmovie.phinf%2F20201102_233%2F1604294237347ur4pS_JPEG%2Fmovie_image.jpg%3Ftype%3Dw640_2'),
        ('어바웃 타임', 'Richard Curtis', 'Romance', 123, 'https://search.pstatic.net/common?type=o&size=176x264&quality=85&direct=true&src=https%3A%2F%2Fs.pstatic.net%2Fmovie.phinf%2F20131115_243%2F1384498185621awKv1_JPEG%2Fmovie_image.jpg%3Ftype%3Dw640_2'),
        ('500일의 썸머', 'Marc Webb', 'Romance', 95, 'https://search.pstatic.net/common?type=o&size=176x264&quality=85&direct=true&src=https%3A%2F%2Fs.pstatic.net%2Fmovie.phinf%2F20210521_40%2F1621587883416Xe5Lu_JPEG%2Fmovie_image.jpg%3Ftype%3Dw640_2'),
        ('크리에이터', 'Gareth Edwards', 'SF', 133, 'https://search.pstatic.net/common?type=o&size=176x264&quality=85&direct=true&src=https%3A%2F%2Fs.pstatic.net%2Fmovie.phinf%2F20231005_53%2F1696479536134WDYG0_JPEG%2Fmovie_image.jpg%3Ftype%3Dw640_2'),
        ('인터스텔라', 'Christopher Nolan', 'SF', 169, 'https://search.pstatic.net/common?type=o&size=176x264&quality=85&direct=true&src=https%3A%2F%2Fs.pstatic.net%2Fmovie.phinf%2F20160106_138%2F1452044846608eaFcJ_JPEG%2Fmovie_image.jpg%3Ftype%3Dw640_2'),
        ('레디 플레이어 원', 'Steven Spielberg', 'SF', 140, 'https://search.pstatic.net/common?type=o&size=176x264&quality=85&direct=true&src=https%3A%2F%2Fs.pstatic.net%2Fmovie.phinf%2F20230405_203%2F1680662203296kDiHv_JPEG%2Fmovie_image.jpg%3Ftype%3Dw640_2'),
        ('듄', 'Denis Villeneuve', 'SF', 155, 'https://search.pstatic.net/common?type=o&size=176x264&quality=85&direct=true&src=https%3A%2F%2Fs.pstatic.net%2Fmovie.phinf%2F20210915_104%2F1631681279096sdjNA_JPEG%2Fmovie_image.jpg%3Ftype%3Dw640_2'),
        ('오펜하이머', 'Christopher Nolan', 'Thriller', 180, 'https://search.pstatic.net/common?type=o&size=176x264&quality=85&direct=true&src=https%3A%2F%2Fs.pstatic.net%2Fmovie.phinf%2F20230726_155%2F1690353875207a86z3_JPEG%2Fmovie_image.jpg%3Ftype%3Dw640_2'),
        ('올빼미', '안태진', 'Thriller', 118, 'https://search.pstatic.net/common?type=o&size=176x264&quality=85&direct=true&src=https%3A%2F%2Fs.pstatic.net%2Fmovie.phinf%2F20221123_65%2F1669168819647KdX9K_JPEG%2Fmovie_image.jpg%3Ftype%3Dw640_2'),
        ('타겟', '박희곤', 'Thriller', 101, 'https://search.pstatic.net/common?type=o&size=176x264&quality=85&direct=true&src=https%3A%2F%2Fs.pstatic.net%2Fmovie.phinf%2F20230830_155%2F1693380545549R60c7_JPEG%2Fmovie_image.jpg%3Ftype%3Dw640_2'),
        ('끝까지 간다', '김성훈', 'Thriller', 111, 'https://search.pstatic.net/common?type=o&size=176x264&quality=85&direct=true&src=https%3A%2F%2Fs.pstatic.net%2Fmovie.phinf%2F20140424_211%2F1398315678038omnHU_JPEG%2Fmovie_image.jpg%3Ftype%3Dw640_2'),
        ('스즈메의 문단속', 'Makoto Niitsu', 'Animation', 122, 'https://search.pstatic.net/common?type=o&size=176x264&quality=85&direct=true&src=https%3A%2F%2Fs.pstatic.net%2Fmovie.phinf%2F20230206_264%2F1675649061557DaJHD_JPEG%2Fmovie_image.jpg%3Ftype%3Dw640_2'),
        ('너의 이름은', 'Makoto Niitsu', 'Animation', 106, 'https://search.pstatic.net/common?type=o&size=176x264&quality=85&direct=true&src=https%3A%2F%2Fs.pstatic.net%2Fmovie.phinf%2F20230524_201%2F1684917828928p65nt_JPEG%2Fmovie_image.jpg%3Ftype%3Dw640_2'),
        ('엘리멘탈', 'Peter Sohn', 'Animation', 109, 'https://search.pstatic.net/common?type=o&size=176x264&quality=85&direct=true&src=https%3A%2F%2Fs.pstatic.net%2Fmovie.phinf%2F20230526_154%2F1685060493223yFUCL_JPEG%2Fmovie_image.jpg%3Ftype%3Dw640_2'),
        ('겨울왕국', 'Chris Buck', 'Animation', 108, 'https://search.pstatic.net/common?type=o&size=176x264&quality=85&direct=true&src=https%3A%2F%2Fs.pstatic.net%2Fmovie.phinf%2F20170418_82%2F1492496178995pHxdA_JPEG%2Fmovie_image.jpg%3Ftype%3Dw640_2');
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


// const query = `
// INSERT INTO movies (title, director, genre, runtime, poster_location)
// VALUES 
// ('탑건: 매버릭', 'Joseph Kosinski', 'Action', 130, 'https://search.pstatic.net/common?type=o&size=176x264&quality=85&direct=true&src=https%3A%2F%2Fs.pstatic.net%2Fmovie.phinf%2F20220509_176%2F1652081912471yhg3N_JPEG%2Fmovie_image.jpg%3Ftype%3Dw640_2'),
// ('말죽거리 잔혹사', '유하', 'Action', 116, 'https://search.pstatic.net/common?type=o&size=176x264&quality=85&direct=true&src=https%3A%2F%2Fs.pstatic.net%2Fmovie.phinf%2F20111222_184%2F1324495774928y3gEe_JPEG%2Fmovie_image.jpg%3Ftype%3Dw640_2'),
// ('헝거게임: 캣칭 파이어', 'Francis Lawrence', 'Action', 146, 'https://search.pstatic.net/common?type=o&size=176x264&quality=85&direct=true&src=https%3A%2F%2Fs.pstatic.net%2Fmovie.phinf%2F20131105_185%2F1383644515842maJk5_JPEG%2Fmovie_image.jpg%3Ftype%3Dw640_2'),
// ('실미도', '강우석', 'Action', 135, 'https://search.pstatic.net/common?type=o&size=176x264&quality=85&direct=true&src=https%3A%2F%2Fs.pstatic.net%2Fmovie.phinf%2F20111222_50%2F1324503591769RwYSb_JPEG%2Fmovie_image.jpg%3Ftype%3Dw640_2'),
// ('호빗: 뜻밖의 여정', 'Peter Jackson', 'Adventure', 169, '/posters/호빗_뜻밖의_여정.jpeg'),
// ('로빈후드', 'Ridley Scott', 'Adventure', 140, '/posters/로빈_후드.jpeg'),
// ('인디아나 존스: 운명의 다이얼', 'James Mangold', 'Adventure', 154, '/posters/인디아나_존스_운명의_다이얼.jpeg'),
// ('캐리비안의 해적 - 블랙 펄의 저주', 'Gore Verbinski', 'Adventure', 143, '/posters/캐리비안의_해적_블랙펄의_저주.jpeg'),
// ('에브리씽 에브리웨어 올 앳 원스', 'Daniel Kwan', 'Comedy', 139, '/posters/에브리씽_에브리웨어_올_앳_원스.jpeg'),
// ('극한직업', '이병헌', 'Comedy', 111, '/posters/극한직업.jpeg'),
// ('화사한 그녀', '이승준', 'Comedy', 121, '/posters/화사한_그녀.jpeg'),
// ('30일', '남대중', 'Comedy', 119, '/posters/30일.jpeg'),
// ('컨저링2', 'James Wan', 'Horror', 134, '/posters/컨저링2.jpeg'),
// ('곡성', '나홍진', 'Horror', 156, '/posters/곡성.jpeg'),
// ('엑스텐션', 'Alexandre Aja', 'Horror', 85, '/posters/엑스텐션.jpeg'),
// ('라이트 아웃', 'David F. Sandberg', 'Horror', 81, '/posters/라이트_아웃.jpeg'),
// ('미녀와 야수', 'Bill Condon', 'Romance', 129, '/posters/미녀와_야수.jpeg'),
// ('노트북', 'Nick Cassavetes', 'Romance', 123, '/posters/노트북.jpeg'),
// ('어바웃 타임', 'Richard Curtis', 'Romance', 123, '/posters/어바웃_타임.jpeg'),
// ('500일의 썸머', 'Marc Webb', 'Romance', 95, '/posters/500일의_썸머.jpeg'),
// ('크리에이터', 'Gareth Edwards', 'SF', 133, '/posters/크리에이터.jpeg'),
// ('인터스텔라', 'Christopher Nolan', 'SF', 169, '/posters/인터스텔라.jpeg'),
// ('레디 플레이어 원', 'Steven Spielberg', 'SF', 140, '/posters/레디_플레이어_원.jpeg'),
// ('듄', 'Denis Villeneuve', 'SF', 155, '/posters/듄.jpeg'),
// ('오펜하이머', 'Christopher Nolan', 'Thriller', 180, '/posters/오펜하이머.jpeg'),
// ('올빼미', '안태진', 'Thriller', 118, '/posters/올빼미.jpeg'),
// ('타겟', '박희곤', 'Thriller', 101, '/posters/타겟.jpeg'),
// ('끝까지 간다', '김성훈', 'Thriller', 111, '/posters/끝까지_간다.jpeg'),
// ('스즈메의 문단속', 'Makoto Niitsu', 'Animation', 122, '/posters/스즈메의_문단속.jpeg'),
// ('너의 이름은', 'Makoto Niitsu', 'Animation', 106, '/posters/너의_이름은.jpeg'),
// ('엘리멘탈', 'Peter Sohn', 'Animation', 109, '/posters/엘리멘탈.jpeg'),
// ('겨울왕국', 'Chris Buck', 'Animation', 108, '/posters/겨울왕국.jpeg');
// `;
