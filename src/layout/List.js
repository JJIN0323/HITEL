import React, { useEffect, useState } from 'react';
import axios from 'axios';

function List() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1); // 현재 페이지 상태
  const [totalPages, setTotalPages] = useState(1); // 총 페이지 수 상태
  const limit = 10; // 한 페이지당 항목 수

  useEffect(() => {
    axios.get(`/api/posts?page=${page}&limit=${limit}`)
      .then(response => {
        if (Array.isArray(response.data.data)) {
          setData(response.data.data);
          setTotalPages(Math.ceil(response.data.total / limit)); // 총 페이지 수 계산
        } else {
          console.error('Expected an array but got:', response.data.data);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [page]); // 페이지 변경 시마다 실행

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div className="container">
      <table>
        <thead>
          <tr>
            <th>번호</th><th>이름</th><th>날짜</th><th>조회</th><th>제목</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td><td>{item.name}</td>
              <td>{item.date}</td><td>{item.views}</td><td>{item.title}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 페이징 컨트롤 */}
      <div className="pagination">
        <button onClick={handlePrev} disabled={page === 1}>이전</button>
        <span>{page} | {totalPages}</span>
        <button onClick={handleNext} disabled={page === totalPages}>다음</button>
      </div>
    </div>
  );
}

export default List;
