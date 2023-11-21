import React, { useState } from 'react';
import './SignUp.css'; // 스타일 파일 임포트

const SignUp = () => {
  const [formData, setFormData] = useState({
    userID:'',
    userPW:'',
    username: '',
    email: '',
    birthDate: '',
    genre: '',
    OTT: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기서 formData를 사용하여 회원가입 로직을 구현하면 됩니다.
    console.log('회원가입 정보:', formData);
    // 실제로는 서버로 데이터를 보내거나 다른 작업을 수행해야 합니다.
  };

  const allGenres = ['액션', '코미디', '로맨스', '스릴러', 'SF', '판타지'];

  return (
    <div className="signup-container"> {/* 추가: 큰 네모 박스 */}
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group"> {/* 추가: 입력 폼 그룹 */}
          <label>사용자명</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />

        </div>
        <div className="input-group"> {/* 추가: 입력 폼 그룹 */}
          <label>이메일</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />

        </div>
        <div className="input-group"> {/* 추가: 입력 폼 그룹 */}
          <label>비밀번호</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />

        </div>
        <div className="input-group"> {/* 추가: 입력 폼 그룹 */}
          <label>생년월일</label>
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
            />

        </div>
        <div className="input-group"> {/* 추가: 입력 폼 그룹 */}  
          <label htmlFor="gender">선호 장르:</label>
            <select className="genre_select" id="genre" name="genre" value={formData.genre} onChange={handleChange}>
              <option value="">선택</option>
              {allGenres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
        </div>

        <div className="input-group"> {/* 추가: 입력 폼 그룹 */}  
          <label htmlFor="gender">사용중인 OTT:</label>
            <select className="genre_select" id="genre" name="genre" value={formData.genre} onChange={handleChange}>
              <option value="">선택</option>
              {allGenres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
        </div>
        <button type="submit">가입하기</button>
      </form>
    </div>
  );
};

export default SignUp;