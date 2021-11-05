import React, { useState } from "react";

import styled from "styled-components";
import { Button } from "../../elements";
import { ReactComponent as Back } from "../../assets/back.svg";

import { useDispatch } from "react-redux";
import { signupDB } from "../../redux/Async/user";

const Signup = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [nickname, setNickname] = useState("");

  const onClickSignUp = () => {
    const data = {
      email: email,
      password: password,
      passwordCheck: passwordCheck,
      nickname: nickname,
    };
    console.log(data);
    dispatch(signupDB(data));
    console.log(data);
  };
  return (
    <React.Fragment>
      <Header>
        <Back />
        회원가입
      </Header>
      <InputId
        type="text"
        placeholder="이메일"
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputNick
        type="text"
        placeholder="닉네임"
        onChange={(e) => setNickname(e.target.value)}
      />
      <InputPwd
        type="text"
        placeholder="비밀번호"
        onChange={(e) => setPassword(e.target.value)}
      />
      <InputPwdChk
        type="text"
        placeholder="비밀번호 확인"
        onChange={(e) => setPasswordCheck(e.target.value)}
      />
      <Button margin="32px 20px 8px 20px" _onClick={onClickSignUp}>
        <SignupText>계속하기</SignupText>
      </Button>
    </React.Fragment>
  );
};

export default Signup;

const Header = styled.div`
  display: flex;
  height: 48px;
`;
const InputId = styled.input`
  background-color: #f8f8fa;
  width: 320px;
  margin: 56px 20px 8px 20px;
  height: 48px;
  border-radius: 6px;
`;
const InputNick = styled.input`
  background-color: #f8f8fa;
  width: 320px;
  margin: 0px 20px 8px 20px;
  height: 48px;
  border-radius: 6px;
`;
const InputPwd = styled.input`
  background-color: #f8f8fa;
  width: 320px;
  margin: 0px 20px 8px 20px;
  height: 48px;
  border-radius: 6px;
`;
const InputPwdChk = styled.input`
  background-color: #f8f8fa;
  width: 320px;
  margin: 0px 20px 8px 20px;
  height: 48px;
  border-radius: 6px;
`;

const SignupText = styled.div`
  color: white;
`;
