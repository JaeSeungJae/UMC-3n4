import React from 'react';
import { useNavigate } from 'react-router-dom';

function NotFound() {
    const navigate = useNavigate();
  return (
    <>
    <div style={{display: "flex", alignContent: "center", justifyContent: "center", color: 'white'}}>
      <h1>Oops!</h1>
    </div>
    <div style={{display: "flex", alignContent: "center", justifyContent: "center", color: 'white'}}>
      <p>예상치 못한 에러가 발생했습니다; '^'</p>
    </div>
    <div style={{display: "flex", alignContent: "center", justifyContent: "center", color: 'white'}}>
      <p style={{cursor: "pointer"}} onClick={()=>navigate('/')}>메인으로 이동하기</p>
    </div>
    </>
  );
}

export default NotFound;
