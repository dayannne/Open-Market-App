import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { AxiosError } from 'axios';
import { axiosInstance } from 'src/api/axiosInstance';

import Input from '../common/Input';
import Button from '../common/Button';
import LoginError from './LoginError';
import { FormWrap } from '../common/Form';
import TypeChange from '../common/TypeChange';
import CheckIcon from 'src/assets/icon-check.svg';

interface UserInput {
  username: string;
  password: string;
}

const LoginForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UserInput>();

  const [loginError, setLoginError] = useState<string>('');
  const [autoLogin, setAutoLogin] = useState(false);

  const [userType, setUserType] = useState<string>('BUYER');

  const handleAutoLogin = () => {
    setAutoLogin(!autoLogin);
  };

  const handleLoginSubmit = async (data: UserInput) => {
    try {
      const res = await axiosInstance.post(`/accounts/login/`, {
        ...data,
        login_type: userType,
      });

      if (res.status >= 200 && res.status < 300) {
        const storage = autoLogin ? localStorage : sessionStorage;
        storage.setItem('token', res.data.token);
        storage.setItem('user_type', res.data.user_type);
        storage.setItem('username', data.username);
        alert(`${data.username}님, 반갑습니다.`);
        navigate('/');
      }
    } catch (error) {
      const axiosError = error as AxiosError<Record<string, any>>;

      setLoginError(axiosError.response?.data?.FAIL_Message);
    }
  };
  return (
    <>
      <TypeChange userType={userType} setUserType={setUserType} setValue={setValue} page='login' />
      <FormWrap onSubmit={handleSubmit(handleLoginSubmit)}>
        <Input
          type='text'
          placeholder='아이디'
          {...register('username', { required: true })}
          defaultValue={userType === 'BUYER' ? 'buyer1' : ''}
          $isError={errors.username}
          $borderWidth='0 0 1px 0'
        />
        <Input
          type='password'
          placeholder='비밀번호'
          defaultValue={userType === 'BUYER' ? 'hodu0910' : ''}
          {...register('password', { required: true })}
          $isError={errors.password}
          $borderWidth='0 0 1px 0'
        />
        <LoginError idError={errors.username} pwError={errors.password} loginError={loginError} />
        <AutoLogin>
          <input type='checkbox' checked={autoLogin} onChange={handleAutoLogin} /> <p>자동 로그인</p>
        </AutoLogin>
        <label className='input-error hidden'></label>
        <Button type='submit' $mgTop='20px' $bdRadius='5px'>
          로그인
        </Button>
      </FormWrap>
    </>
  );
};

const AutoLogin = styled.label`
  display: flex;
  align-items: center;
  margin-top: 10px;
  input {
    appearance: none;
    width: 20px;
    height: 20px;
    border: 1.5px solid var(--main-color);
    margin-right: 6px;
    border-radius: 0.35rem;
    cursor: pointer;
    &:checked {
      border-color: transparent;
      background-image: url(${CheckIcon});
      background-size: 80% 80%;
      background-position: 50%;
      background-repeat: no-repeat;
      border: 1.5px solid var(--main-color);
    }
  }
`;

export default LoginForm;
