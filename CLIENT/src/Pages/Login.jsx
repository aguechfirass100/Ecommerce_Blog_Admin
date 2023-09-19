import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/apiCalls';
import { Link } from 'react-router-dom';
import { mobile } from '../responsive';
import loginImg from '../images/loginImg.png';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.2),
      rgba(255, 255, 255, 0.2)
    ),
    url(${loginImg}), center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  border-radius: 25px;
  background-color: white;
  border: 10px solid teal;
  ${mobile({ width: '75%' })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0px;
  padding: 10px;
  border-radius: 25px;
  border: 4px solid teal;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  margin-bottom: 10px;
  padding: 15px 20px;
  border-radius: 25px;
  background-color: teal;
  color: white;
  cursor: pointer;

  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const PageLink = styled.a`
  margin: 5px 0px;
  font-size: 14px;
  text-decoration: underline;
  cursor: pointer;
  color: ${(props) => props.home === 'home' && 'blue'};
  font-weight: ${(props) => props.home === 'home' && 'bold'};
  font-size: ${(props) => props.home === 'home' && '16px'};
  text-decoration: ${(props) => props.home === 'home' && 'none'};
`;

const Error = styled.span`
  color: red;
`;

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const { isFetching } = useSelector((state) => state.user);

  const handleClick = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }
    setError('')

    login(dispatch, { username, password });
  };

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <Error>{error}</Error>}
          <Button onClick={handleClick} disabled={isFetching}>
            LOGIN
          </Button>
          <Link to="/register">
            <PageLink>CREATE A NEW ACCOUNT</PageLink>
          </Link>
          <Link to="/home">
            <PageLink home="home">Home</PageLink>
          </Link>
          <Link to="http://localhost:3001/login" target="_blank">
            <PageLink home="home">ADMIN LOGIN</PageLink>
          </Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
