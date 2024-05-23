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
`;

const Back = styled.div`
    padding: 50px 100px;
    align-items: center;
    justify-content: center;
`;

const Button = styled.button`
    width: 100%;
    padding: 10px;
    background-color: ${(props) => props.disabled ? '#FFFFFF' : '#FEC623'};
    color: black;
    border: ${(props) => props.disabled ? '1px solid #fff' : '0px'};
    border-radius: 50px;
    cursor: ${(props) => props.disabled ? 'not-allowed' : 'pointer'};
    margin: 20px auto;
    height: 40px;
`;

const Input = styled.input`
    width: 500px;
    padding: 10px;
    border: 1px solid #fff;
    border-radius: 50px;
    height: 30px;
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
  }, [userId, password]);

  const validateForm = () => {
    if (!userId || !password) {
      setDisabled(true);
    } else if (userIdError || passwordError) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
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
        alert('완료');
        localStorage.setItem('token', JSON.stringify(responseData.token));
        localStorage.setItem('user', JSON.stringify(responseData.username));
        navigate('/');
      } else {
        alert('에러');
      }
    } catch (error) {
      alert('에러2222');
      console.error(error);
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
        <div className="container">
          <Button type="button" disabled={disabled} onClick={submit}>로그인</Button>
        </div>
      </Back>
    </Body>
  );
};

export default Login;
