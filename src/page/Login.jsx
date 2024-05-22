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
    background-color: ${(props) => props.disabled ? '#FEC623' : '#FFFFFF'};
    color: black;
    border: ${(props) => props.disabled ? '0px' : '1px solid #fff'};
    border-radius: 50px;
    cursor: pointer;
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
  const [valid, setValid] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    validateId(userId);
    validatePassword(password);
  }, [])

  useEffect(() => {
    if (!valid) {
      setDisabled(false);
    }
    else if (!userId) {
      setDisabled(false);
    }
    else {
      setDisabled(true);
    }
  })

  const validateId = (value) => {
    setUserId(value);
    if (!value) {
      setUserIdError('아이디를 입력해주세요!');
    }
    else {
      setUserIdError('');
    }
  }
  const validatePassword = (value) => {
    setPassword(value);
    setValid(false);
    const pwRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*\W).{4,12}$/;
    if (!value) {
      setPasswordError('비밀번호를 입력해주세요.');
    }
    else if (!pwRegex.test(value)) {
      setPasswordError('비밀번호는 문자, 숫자, 특수문자를 포함해야 합니다.');
    } else {
      setPasswordError('');
      setValid(true);
    }
  }

  return (
    <Body>
      <Back>
        <h2 style={{color: "white", textAlign: "center", marginBottom: "30px"}}>로그인 페이지</h2>
        <FormGroup>
          <Input type="text" id="id" value={userId} onChange={(e) => validateId(e.target.value)}
          placeholder='아이디'/>
          <div><Error>{userIdError}</Error></div>
        </FormGroup>
        <FormGroup>
          <Input type="password" id="pw" value={password} onChange={(e) => validatePassword(e.target.value)}
          placeholder='비밀번호'/>
          <div><Error>{passwordError}</Error></div>
        </FormGroup>
        
        <div className="container">
          <Button type="button" disabled={disabled}>로그인</Button>
        </div>
      </Back>
    </Body>
  );
};

export default Login;
