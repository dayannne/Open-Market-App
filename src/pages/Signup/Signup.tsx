import { Link } from 'react-router-dom';

import SignupForm from '../../components/Signup/SignupForm';

import { SignupWrap } from './SignupStyle';
import CoralLogo from '../../assets/logo-coral.png';

const Signup = () => {
  return (
    <SignupWrap>
      <header>
        <h1>
          <Link to='/'>
            <img src={CoralLogo} alt='호두 로고 이미지' />
          </Link>
        </h1>
      </header>
      <main>
        <SignupForm />
      </main>
    </SignupWrap>
  );
};

export default Signup;
