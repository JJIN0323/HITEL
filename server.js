// 필요한 모듈을 가져옵니다.
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

// Express 애플리케이션을 생성합니다.
const app = express();

// CORS 설정을 추가하여 모든 도메인에서 접근할 수 있도록 허용합니다.
app.use(cors({ origin: '*' }));

// MySQL 데이터베이스 설정
const db = mysql.createConnection({
  host: 'localhost',      // MySQL 서버 호스트 이름 (보통 localhost)
  user: 'root',           // MySQL 사용자 이름
  password: '1234',       // MySQL 비밀번호
  database: 'posts'       // MySQL 데이터베이스 이름
});

// MySQL 데이터베이스에 연결
db.connect((err) => {
  if (err) {
    console.error('DB 연결 오류:', err);
    return;
  }
  console.log('MySQL에 연결되었습니다.');
});

// '/api/posts' 엔드포인트에서 데이터를 가져오는 API
app.get('/api/posts', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  const countQuery = 'SELECT COUNT(*) AS total FROM posts';
  const dataQuery = `SELECT *, DATE_FORMAT(date, '%Y-%m-%d') as formatted_date FROM posts LIMIT ${limit} OFFSET ${offset}`;

  db.query(countQuery, (err, countResult) => {
    if (err) {
      console.error('데이터 총 수 조회 오류:', err);
      res.status(500).send('데이터 총 수 조회 오류');
      return;
    }

    const total = countResult[0].total;

    db.query(dataQuery, (err, dataResult) => {
      if (err) {
        console.error('데이터 조회 오류:', err);
        res.status(500).send('데이터 조회 오류');
      } else {
        res.json({
          total: total,
          page: page,
          limit: limit,
          data: dataResult
        });
      }
    });
  });
});


// 서버를 3001번 포트에서 실행
const port = 3001;
app.listen(port, () => {
  console.log(`서버가 ${port} 포트에서 실행 중입니다.`);
});
