import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import InputForm from '../components/InputForm';
import Button from '../components/Button';
import SocialBtn from '../components/SocialBtn';
import { ReactComponent as Wave } from '../assets/images/wave.svg';
import { color, device, radius, boxShadow } from '../styles';
import mainIllust from '../assets/images/main_illust.png';
import { requestLogin } from '../apis';
import { login } from '../actions';

const Container = styled.div`
  @media ${device.laptop} {
    width: 100%;
    height: calc(100vh - 60px);
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${color.primaryLight};
  }
`;

const LoginContainer = styled.div`
  background-color: ${color.white};

  @media ${device.laptop} {
    display: grid;
    grid-template-columns: 2fr 1fr;
    width: 980px;
    height: 600px;
    border-radius: ${radius};
    box-shadow: ${boxShadow};
    overflow: hidden;
  }
`;

const IllustSection = styled.section`
  display: none;

  @media ${device.laptop} {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    width: 100%;
    background-color: ${color.primary};
    color: ${color.white};
    text-align: center;
    img {
      width: 75%;
      padding: 1rem;
    }
  }
`;

const LoginSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;

  @media ${device.laptop} {
    justify-content: center;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  padding-top: 2rem;
  h1 {
    color: ${color.white};
    text-align: center;
  }
  background-color: ${color.primary};

  @media ${device.laptop} {
    h1 {
      color: ${color.primary};
    }
    svg {
      display: none;
    }
    background-color: transparent;
  }
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  max-width: 460px;
  margin-top: -1.5rem;
  padding: 0 1rem;

  @media ${device.laptop} {
    margin-top: 1rem;
  }
`;

const InvalidMessage = styled.p`
  margin: 0;
  padding-left: 1rem;
  color: ${color.warning};
  font-size: 0.875rem;
`;

const Divider = styled.div`
  position: relative;
  width: 100%;
  max-width: 460px;
  height: 0;
  padding: 0 1rem;
  text-align: center;

  span {
    display: inline-block;
    position: relative;
    top: -10px;
    padding: 0 1rem;
    background-color: ${color.white};
    color: ${color.primary};
  }

  &::before {
    content: '';
    display: block;
    border-bottom: 1px solid ${color.primaryBorder};
  }
`;

const SocialContainer = styled.div``;

const ColoredSpan = styled.span`
  color: ${color.primary};
`;

const Login = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmptyEmail, setIsEmptyEmail] = useState(false);
  const [isEmptyPassword, setIsEmptyPassword] = useState(false);

  const onChangeEmail = (val) => {
    setEmail(val);
    setIsEmptyEmail(val === '');
  };

  const onChangePassword = (val) => {
    setPassword(val);
    setIsEmptyPassword(val === '');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email === '') {
      setIsEmptyEmail(true);
    } else if (password === '') {
      setIsEmptyPassword(true);
    } else {
      requestLogin(email, password).then((result) => {
        dispatch(login(result));
        navigate('/');
      });
    }
  };

  return (
    <Container>
      <LoginContainer>
        <IllustSection>
          <img src={mainIllust} />
          <h3>환경을 위한 챌린지, 지금 시작하세요</h3>
          <p>
            작은 실천들이 모여 환경을 지키는 큰 힘이 됩니다. <br />
            다른 사람들과 함께 챌린지를 진행하며 서로를 응원해요.
          </p>
        </IllustSection>
        <LoginSection>
          <TitleContainer>
            <h1>로그인</h1>
            <Wave width="100%" height="100" fill={color.white} />
          </TitleContainer>
          <LoginForm>
            <InputForm placeholder="이메일" handleValue={onChangeEmail} />
            {isEmptyEmail ? (
              <InvalidMessage>*이메일을 입력해 주세요.</InvalidMessage>
            ) : null}
            <InputForm
              placeholder="비밀번호"
              handleValue={onChangePassword}
              type="password"
            />
            {isEmptyPassword ? (
              <InvalidMessage>*비밀번호를 입력해 주세요.</InvalidMessage>
            ) : null}
            <Button content="로그인" handler={handleSubmit}></Button>
          </LoginForm>
          <Divider>
            <span>or</span>
          </Divider>
          <SocialContainer>
            <SocialBtn />
            <SocialBtn />
            <SocialBtn />
          </SocialContainer>
          <Link to="/signup">
            <ColoredSpan>
              아직 회원이 아니신가요? <strong>회원가입</strong>
            </ColoredSpan>
          </Link>
        </LoginSection>
      </LoginContainer>
    </Container>
  );
};

export default Login;
