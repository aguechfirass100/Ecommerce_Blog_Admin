import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/apiCalls";
import { mobile } from "../responsive";
import registerImg from '../images/registerImg.png';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), url(${registerImg}), center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  border-radius: 25px;
  background-color: white;
  border: 10px solid teal;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  margin: 20px 0;
  padding: 10px;
  border-radius: 25px;
  border: 4px solid teal;
`;

const Agreement = styled.span`
  font-size: 14px;
  margin: 20px 0;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  border-radius: 25px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Error = styled.span`
  color: red;
`;

const Register = () => {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isClicked, setIsClicked] = React.useState(false);

  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  const handleClick = (e) => {
    e.preventDefault();
    setIsClicked(true);

    if (!username || !email || !password) {
      return;
    }

    register(dispatch, { username, email, password });
  };

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
          <Input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          <Input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          <Agreement>
            By creating an account, I consent to the processing of my personal data in accordance with the <b>PRIVACY POLICY</b>.
          </Agreement>
          <Button onClick={handleClick} disabled={isFetching}>CREATE</Button>
          {isClicked && (!username || !email || !password) && <Error>Please fill in all fields.</Error>}
          {error && <Error>Something went wrong... try with another EMAIL</Error>}
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
