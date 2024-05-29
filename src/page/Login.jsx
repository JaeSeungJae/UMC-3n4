import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const FormGroup = styled.div`
  margin-bottom: 30px;
`;

const Body = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #22254B;
`;

const Back = styled.div`
  padding: 20px;
  background-color: #22254B;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 400px;

  @media (min-width: 768px) {
    padding: 50px 100px;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: ${(props) => props.disabled ? 'white' : 'yellow'};
  color: black;
  border: none;
  border-radius: 50px;
  cursor: ${(props) => props.disabled ? 'not-allowed' : 'pointer'};
  margin-top: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #61dafb;
  border-radius: 50px;
`;

const Error = styled.span`
  color: red;
  font-size: 0.8em;
`;

const Login = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [userIdError, setUserIdError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    validateForm();
  }, [userId, password, userIdError, passwordError]);

  const validateForm = () => {
    setDisabled(!(userId && password && !userIdError && !passwordError));
  };

  const validateId = (value) => {
    setUserId(value);
    if (!value) {
      setUserIdError('아이디를 입력해주세요!');
    } else if (value.length < 5) {
      setUserIdError('아이디는 최소 5자리 이상으로 구성해주세요!');
    } else {
      setUserIdError('');
    }
  };

  const validatePassword = (value) => {
    setPassword(value);
    const pwRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*\W).{4,12}$/;
    if (!value) {
      setPasswordError('비밀번호를 입력해주세요.');
    } else if (!pwRegex.test(value)) {
      setPasswordError('비밀번호는 문자, 숫자, 특수문자를 포함해야 합니다.');
    } else {
      setPasswordError('');
    }
  };

  const submit = async () => {
    try {
      const data = {
        username: userId,
        password: password,
      };
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      if (response.ok) {
        console.log(responseData);
        alert('로그인 성공!');
        localStorage.setItem('token', responseData.token);
        localStorage.setItem('user', responseData.username);
        navigate('/');
      } else {
        alert('로그인 실패: ' + responseData.message);
      }
    } catch (error) {
      console.error('로그인 시도 중 오류 발생', error);
      alert('서버 오류 발생');
    }
  };

  return (
    <Body>
      <Back>
        <h2 style={{ color: "white", textAlign: "center", marginBottom: "30px" }}>로그인 페이지</h2>
        <FormGroup>
          <Input type="text" id="id" value={userId} onChange={(e) => validateId(e.target.value)}
            placeholder='아이디' />
          <div><Error>{userIdError}</Error></div>
        </FormGroup>
        <FormGroup>
          <Input type="password" id="pw" value={password} onChange={(e) => validatePassword(e.target.value)}
            placeholder='비밀번호' />
          <div><Error>{passwordError}</Error></div>
        </FormGroup>
        <Button type="button" disabled={disabled} onClick={submit}>로그인</Button>
      </Back>
    </Body>
  );
};

export default Login;
