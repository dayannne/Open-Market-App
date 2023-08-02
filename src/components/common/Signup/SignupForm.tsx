import React, { useState, ChangeEvent, MouseEventHandler } from 'react';
import styled from 'styled-components';
import Button from '../Button';
import TypeChange from '../TypeChange';
import { FormWrap, ErrorMsg, ValidMsg } from '../Form';
import { Input } from '../Input';
import CheckOn from '../../../assets/icon-check-on.svg';
import CheckOff from '../../../assets/icon-check-off.svg';
import CheckBox from '../../../assets/check-box.svg';
import CheckBoxFilled from '../../../assets/check-fill-box.svg';
import DownArrow from '../../../assets/icon-down-arrow.svg';
import UpArrow from '../../../assets/icon-up-arrow.svg';
import { headerApi } from 'src/api/axiosInstance';
import { AxiosError } from 'axios';

export interface SignupFormProps {}

interface UserInput {
  username: string;
  password: string;
  password2: string;
  phone_number: string;
  name: string;
}

const SignupForm: React.FC<SignupFormProps> = () => {
  const [userInput, setUserInput] = useState<UserInput>({
    username: '',
    password: '',
    password2: '',
    phone_number: '',
    name: '',
  });
  const [userType, setUserType] = useState<string>('BUYER');
  const [arrowChange, setArrowChange] = useState<string>(DownArrow);
  const [dropdownView, setDropdownView] = useState<boolean>(false);
  const [firstPhoneNum, setFirstPhoneNum] = useState<string>('010');
  const [idValid, setIdValid] = useState<string>('');
  const [idError, setIdError] = useState<string>('');
  const [pwValid, setPwValid] = useState<string>(CheckOff);
  const [pwError, setPwError] = useState<string>('');
  const [pw2Error, setPw2Error] = useState<string>('');
  const [pw2Valid, setPw2Valid] = useState<string>(CheckOff);

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.trim();
    setUserInput((prevUserInput) => ({
      ...prevUserInput,
      username: e.target.value,
    }));
  };

  const handlePasswordValid = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.trim();
    const reg =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])(?=.*[A-Z])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!reg.test(e.target.value)) {
      setPwError(
        '비밀번호는 8자 이상이어야 하며, 숫자/대문자/소문자/특수문자를 모두 포함해야 합니다.',
      );
      setPwValid(CheckOff);
    } else {
      setPwError('');
      setPwValid(CheckOn);
      setUserInput((prevUserInput) => ({
        ...prevUserInput,
        password: e.target.value,
      }));
    }
  };

  const handlePasswordCheck = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.trim();
    if (!userInput.password) {
      setPw2Error('비밀번호를 입력해 주세요.');
    } else if (userInput.password !== e.target.value) {
      setPw2Error('비밀번호가 일치하지 않습니다.');
      setPw2Valid(CheckOff);
    } else if (userInput.password === e.target.value) {
      setPw2Error('');
      setPw2Valid(CheckOn);
      setUserInput((prevUserInput) => ({
        ...prevUserInput,
        password2: e.target.value,
      }));
    }
  };

  const handleDropdownView = () => {
    if (dropdownView) {
      setArrowChange(DownArrow);
      setDropdownView(false);
    } else {
      setArrowChange(UpArrow);
      setDropdownView(true);
    }
  };

  const handleFirstPhonNumChange: MouseEventHandler<HTMLButtonElement> = (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setFirstPhoneNum(e.currentTarget.innerHTML);
    handleDropdownView();
  };

  const handleMaxlength = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length > 4) {
      e.target.value = value.slice(0, 4);
    }
  };

  const checkIDDuplicate: MouseEventHandler<HTMLButtonElement> = async () => {
    try {
      const res = await headerApi.post(`/accounts/signup/valid/username/`, {
        username: userInput.username,
      });
      console.log(res);
      if (res.status === 202) {
        console.log(res.data.Success);
        setIdValid(res.data.Success);
      }
    } catch (error) {
      const axiosError = error as AxiosError<Record<string, any>>;
      console.log(axiosError.response);
      if (axiosError.response?.data?.FAIL_Message) {
        setIdError(axiosError.response?.data?.FAIL_Message);
      }
    }
  };

  return (
    <>
      <TypeChange userType={userType} setUserType={setUserType} page='가입' />
      <FormWrap>
        <AccountInfoWrap>
          <IdInput>
            <label htmlFor=''>아이디</label>
            <div>
              <Input
                $mgBottom='none'
                onChange={handleUsernameChange}
                $isError={idError}
                padding='0 0 0 16px'
                $borderWidth='1px'
                $bdRadius='5px'
              />
              <Button
                width='auto'
                padding='0 32px'
                fontSize='var(--font-sm)'
                fontWeight='500'
                onClick={checkIDDuplicate}
              >
                중복확인
              </Button>
            </div>
          </IdInput>
          {idError && <ErrorMsg>{idError}</ErrorMsg>}
          {idValid && <ValidMsg>{idValid}</ValidMsg>}
          <PasswordInput $pwValid={pwValid}>
            <label htmlFor=''>비밀번호</label>
            <Input
              $mgBottom='none'
              onChange={handlePasswordValid}
              $isError={pwError}
              padding='0 0 0 16px'
              $borderWidth='1px'
              $bdRadius='5px'
            />
          </PasswordInput>
          {pwError && <ErrorMsg>{pwError}</ErrorMsg>}
          <PasswordInput $pwValid={pw2Valid}>
            <label htmlFor=''>비밀번호 재확인 </label>
            <Input
              $mgBottom='none'
              onChange={handlePasswordCheck}
              $isError={pw2Error}
              padding='0 0 0 16px'
              $borderWidth='1px'
              $bdRadius='5px'
            />
          </PasswordInput>
          {pw2Error && <ErrorMsg>{pw2Error}</ErrorMsg>}
        </AccountInfoWrap>

        <UserInfoWrap>
          <NameInput>
            <label htmlFor=''>이름</label>
            <Input
              $mgBottom='none'
              padding='0 0 0 16px'
              $borderWidth='1px'
              $bdRadius='5px'
            />
          </NameInput>
          <PhoneNumberInput>
            <label htmlFor=''>휴대폰번호</label>
            <div>
              <FirstNumber>
                <button
                  type='button'
                  onClick={handleDropdownView}
                  className='phone-number'
                >
                  <span>{firstPhoneNum}</span>
                  <img src={arrowChange} alt='' />
                </button>
                {dropdownView && (
                  <ul className='selectbox-option hide'>
                    <li>
                      <button onClick={handleFirstPhonNumChange} type='button'>
                        010
                      </button>
                    </li>
                    <li>
                      <button onClick={handleFirstPhonNumChange} type='button'>
                        011
                      </button>
                    </li>
                    <li>
                      <button onClick={handleFirstPhonNumChange} type='button'>
                        016
                      </button>
                    </li>
                    <li>
                      <button onClick={handleFirstPhonNumChange} type='button'>
                        017
                      </button>
                    </li>
                    <li>
                      <button onClick={handleFirstPhonNumChange} type='button'>
                        019
                      </button>
                    </li>
                  </ul>
                )}
              </FirstNumber>
              <Input
                type='tel'
                onInput={handleMaxlength}
                $mgBottom='none'
                padding='0 0 0 16px'
                $borderWidth='1px'
                $bdRadius='5px'
              />
              <Input
                type='tel'
                onInput={handleMaxlength}
                $mgBottom='none'
                padding='0 0 0 16px'
                $borderWidth='1px'
                $bdRadius='5px'
              />
            </div>
          </PhoneNumberInput>
        </UserInfoWrap>
        {userType === 'SELLER' && (
          <SellerInfoWrap>
            <RegNumberInput>
              <label htmlFor=''>사업자등록번호</label>
              <div>
                <Input
                  $mgBottom='none'
                  padding='0 0 0 16px'
                  $borderWidth='1px'
                  $bdRadius='5px'
                />
                <Button
                  width='auto'
                  padding='0 32px'
                  fontSize='var(--font-sm)'
                  fontWeight='500'
                >
                  인증
                </Button>
              </div>
            </RegNumberInput>
            <div>
              <label htmlFor=''>스토어 이름</label>
              <Input
                $mgBottom='none'
                padding='0 0 0 16px'
                $borderWidth='1px'
                $bdRadius='5px'
              />
            </div>
          </SellerInfoWrap>
        )}
      </FormWrap>
    </>
  );
};

const AccountInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
  div {
    display: flex;
    flex-direction: column;
  }
`;
const IdInput = styled.div`
  div {
    gap: 12px;
    flex-direction: row;
    justify-content: flex-end;
    flex-wrap: wrap;
    input {
      flex-grow: 1;
    }
  }
`;
const PasswordInput = styled.div`
  position: relative;

  &::after {
    content: '';
    width: 28px;
    height: 28px;
    background-image: url(${(props: { $pwValid: string }) => props.$pwValid});
    position: absolute;
    right: 10px;
    top: 50%;
  }
`;
const UserInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  div {
    display: flex;
    flex-direction: column;
  }
`;
const NameInput = styled.div``;
const PhoneNumberInput = styled.div`
  div {
    flex-direction: row;
    gap: 12px;
    input,
    .phone-number {
      width: 100%;
    }
  }

  .phone-number {
    position: relative;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding-right: 14px;

    span {
      flex: 9;
    }
    img {
      flex: 1;
      vertical-align: bottom;
    }
  }
`;

const FirstNumber = styled.div`
  position: relative;
  width: 100%;
  ul {
    text-align: center;
    height: 150px;
    position: absolute;
    border-radius: 5px;
    border: 1px solid var(--border-color);
    background-color: var(--white);
    overflow-y: scroll;
    width: 100%;
    left: 0;
    top: 60px;

    li {
      button {
        width: 100%;
        padding: 5px 0;
      }
      button:hover {
        background-color: var(--main-color);
        color: var(--white);
      }
    }
  }

  ul::-webkit-scrollbar {
    background-color: var(--sub-color);
    width: 18px;
  }
  ul::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: var(--border-color);
    background-clip: padding-box;
    border: 5px solid transparent;
  }
`;

const SellerInfoWrap = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  div {
    display: flex;
    flex-direction: column;
  }
`;

const RegNumberInput = styled.div`
  div {
    gap: 12px;
    flex-direction: row;
    justify-content: flex-end;
    flex-wrap: wrap;
    input {
      flex-grow: 1;
    }
  }
`;

export default SignupForm;
