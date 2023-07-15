import React from 'react';
import styled from 'styled-components';

interface UserInput {
  username: string;
  password: string;
  login_type: 'BUYER' | 'SELLER';
}

interface FormChangeProps {
  userInput: UserInput;
  setUserInput: React.Dispatch<React.SetStateAction<UserInput>>;
}

const FormChange: React.FC<FormChangeProps> = ({ userInput, setUserInput }) => {
  const handleBuyerLogin = () => {
    setUserInput((prevUserInput) => ({
      ...prevUserInput,
      login_type: 'BUYER',
    }));
  };

  const handleSellerLogin = () => {
    setUserInput((prevUserInput) => ({
      ...prevUserInput,
      login_type: 'SELLER',
    }));
  };

  return (
    <FormChangeWrap>
      <h2 className='a11y-hidden'>회원 종류 선택하기</h2>
      <FormChangeBtn
        className={`form-btn ${
          userInput.login_type === 'BUYER' ? '' : 'disable'
        }`}
        type='button'
        onClick={handleBuyerLogin}
      >
        구매회원 로그인
      </FormChangeBtn>
      <FormChangeBtn
        className={`form-btn ${
          userInput.login_type === 'SELLER' ? '' : 'disable'
        }`}
        type='button'
        onClick={handleSellerLogin}
      >
        판매회원 로그인
      </FormChangeBtn>
    </FormChangeWrap>
  );
};

const FormChangeWrap = styled.div`
  display: flex;
  background-color: var(--primary);
`;

const FormChangeBtn = styled.button`
  font-size: var(--font-md);
  z-index: 100;

  &.form-btn {
    width: 275px;
    height: 70px;
    border-top: 1px solid var(--border-color);
    border-left: 1px solid var(--border-color);
    border-right: 1px solid var(--border-color);
    border-radius: 10px 10px 0 0;
    padding: 20px 0 38px;
    font-weight: 700;
    background-color: var(--primary-color);
  }

  &.disable {
    background-color: var(--sub-color);
    border-bottom: 1px solid var(--border-color);
  }
`;

export default FormChange;
