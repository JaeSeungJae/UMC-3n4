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

const Bottom = styled.div`
  font-weight: bold;
  display: flex;
  color: white;
  padding: 30px;
  align-items: center;
  justify-content: center;
`

const Pstyle = styled.p`
  margin-right: 40px;
  cursor: pointer;
`
const PisLogin = styled.p`
  cursor: pointer;
`

const SignupPage = () => {
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [nameError, setNameError] = useState('');
  const [nameCorrect, setNameCorrect] = useState('');
  const [userIdError, setUserIdError] = useState('');
  const [userIdCorrect, setUserIdCorrect] = useState('');
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

  useEffect(() => {
    if (nameCorrect && emailCorrect && ageCorrect && passwordCorrect && passwordCheckCorrect) {
      setValidate(true);
    } else {
      setValidate(false);
    }
  }, [nameCorrect, emailCorrect, ageCorrect, passwordCorrect, passwordCheckCorrect]);

  const validateName = (value) => {
    setName(value);
    if (!value) {
      setNameError('필수 입력 항목입니다!');
      setNameCorrect('');
    } else {
      setNameError('');
      setNameCorrect('멋진 이름이네요.');
    }
  };

  const validateId = (value) => {
    setUserId(value);
    if (!value) {
      setUserIdError('필수 입력 항목입니다!');
      setUserIdCorrect('');
    } else {
      setUserIdError('');
      setUserIdCorrect('올바른 ID입니다.');
    }
  };

  const validateEmail = (value) => {
    setEmail(value);
    if (!value.includes('@')) {
      setEmailError('올바른 이메일 형식이 아닙니다.');
      setEmailCorrect('');
    } else {
      setEmailError('');
      setEmailCorrect('올바른 이메일 형식입니다!');
    }
  };

  const validateAge = (value) => {
    setAge(value);
    const ageNumber = Number(value);
    if (!ageNumber) {
      setAgeError('나이는 숫자 형식이어야 합니다!');
      setAgeCorrect('');
    } else if (ageNumber < 0) {
      setAgeError('나이는 음수가 될 수 없습니다!');
      setAgeCorrect('');
    } else if (ageNumber % 1 !== 0) {
      setAgeError('나이는 소수가 될 수 없습니다!');
      setAgeCorrect('');
    } else if (ageNumber < 19) {
      setAgeError('미성년자는 가입할 수 없습니다!');
      setAgeCorrect('');
    } else {
      setAgeError('');
      setAgeCorrect('올바른 나이 형식입니다!');
    }
  };

  const validatePassword = (value) => {
    setPassword(value);
    const pwRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*\W).{4,12}$/;
    if (!pwRegex.test(value)) {
      setPasswordError('비밀번호는 최소 4자리 최대 12자리이어야 하며, 문자, 숫자, 특수문자를 포함해야 합니다.');
      setPasswordCorrect('');
    } else {
      setPasswordError('');
      setPasswordCorrect('올바른 비밀번호입니다!');
    }
  };

  const validatePasswordCheck = (value) => {
    setPasswordCheck(value);
    if (value !== password || !value) {
      setPasswordCheckError('비밀번호가 일치하지 않습니다.');
      setPasswordCheckCorrect('');
    } else {
      setPasswordCheckError('');
      setPasswordCheckCorrect('비밀번호가 일치합니다.');
    }
  };

  const submit = () => {
    alert('제출 완료!');
    console.log(`name : ${name}`);
    console.log(`age : ${age}`);
    console.log(`email : ${email}`);
    console.log(`password : ${password}`);
    navigate('/login');
  }
  return (
    <Body>
      <Back>
        <h2 style={{color: "white", textAlign: "center", marginBottom: "30px"}}>회원가입</h2>
        <FormGroup>
          <Input type="text" id="name" value={name} onChange={(e) => validateName(e.target.value)}
          placeholder='이름을 입력해주세요.'/>
          <div><Error>{nameError}</Error>
          <Correct>{nameCorrect}</Correct></div>
        </FormGroup>
        <FormGroup>
          <Input type="text" id="userId" value={userId} onChange={(e) => validateId(e.target.value)}
          placeholder='아이디를 입력해주세요.'/>
          <div><Error>{userIdError}</Error>
          <Correct>{userIdCorrect}</Correct></div>
        </FormGroup>
        <FormGroup>
          <Input type="text" id="email" value={email} onChange={(e) => validateEmail(e.target.value)}
          placeholder='이메일을 입력해주세요.'/>
          <div><Error>{emailError}</Error>
          <Correct>{emailCorrect}</Correct></div>
        </FormGroup>
        <FormGroup>
          <Input type="text" id="age" value={age} onChange={(e) => validateAge(e.target.value)}
          placeholder='나이를 입력해주세요.'/>
          <div><Error>{ageError}</Error>
          <Correct>{ageCorrect}</Correct></div>
        </FormGroup>
        <FormGroup>
          <Input type="password" id="pw" value={password} onChange={(e) => validatePassword(e.target.value)}
          placeholder='비밀번호를 입력해주세요.'/>
          <div><Error>{passwordError}</Error>
          <Correct>{passwordCorrect}</Correct></div>
        </FormGroup>
        <FormGroup>
          <Input type="password" id="pw-check" value={passwordCheck} onChange={(e) => validatePasswordCheck(e.target.value)}
          placeholder='비밀번호 확인'/>
          <div><Error>{passwordCheckError}</Error>
          <Correct>{passwordCheckCorrect}</Correct></div>
        </FormGroup>
        <div className="container">
          <Button onClick={submit} type="button" disabled={!validate}>제출하기</Button>
        </div>
        <Bottom>
          <Pstyle>이미 아이디가 있으신가요?</Pstyle>
          <PisLogin onClick={()=>
          navigate('/login')
          }>로그인 페이지로 이동하기</PisLogin>
        </Bottom>
      </Back>
    </Body>
  );
};

export default SignupPage;
