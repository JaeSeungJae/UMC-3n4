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
    background-color: white;
    color: black;
    border: 1px solid #fff;
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

const Correct = styled.span`
    color: green;
    font-size: 0.8em;
`;

const Login = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [nameError, setNameError] = useState('');
  const [nameCorrect, setNameCorrect] = useState('');
  const [emailError, setEmailError] = useState('');
  const [emailCorrect, setEmailCorrect] = useState('');
  const [ageError, setAgeError] = useState('');
  const [ageCorrect, setAgeCorrect] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordCorrect, setPasswordCorrect] = useState('');
  const [passwordCheckError, setPasswordCheckError] = useState('');
  const [passwordCheckCorrect, setPasswordCheckCorrect] = useState('');
  const [validate, setValidate] = useState(false);
  const navigate = useNavigate();

  return (
    <Body>
      <Back>
        <h2 style={{color: "white", textAlign: "center", marginBottom: "30px"}}>로그인 페이지</h2>
        <FormGroup>
          <Input type="text" id="name" value={name} onChange={(e) => validateName(e.target.value)}
          placeholder='아이디'/>
          <div><Error>{nameError}</Error>
          <Correct>{nameCorrect}</Correct></div>
        </FormGroup>
        <FormGroup>
          <Input type="password" id="pw" value={password} onChange={(e) => validatePassword(e.target.value)}
          placeholder='비밀번호'/>
          <div><Error>{passwordError}</Error>
          <Correct>{passwordCorrect}</Correct></div>
        </FormGroup>
        
        <div className="container">
          <Button type="button">로그인</Button>
        </div>
      </Back>
    </Body>
  );
};

export default Login;
