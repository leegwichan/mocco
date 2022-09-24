import { useState } from 'react';

export const useInputValid = ({ initialvalues, onClick }) => {
  const [value, setValue] = useState(initialvalues);
  const [errMessage, setErrMessage] = useState('');
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (value.length === 0) {
      setErrMessage('내용을 입력해주세요');
      setIsValid(false);
    } else if (value.length >= 300) {
      setErrMessage('300자 미만으로 입력해주세요');
      setIsValid(false);
    } else {
      setErrMessage('');
      setIsValid(true);
      onClick(value);
    }
  };

  return {
    value,
    errMessage,
    isValid,
    setIsValid,
    setValue,
    setErrMessage,
    handleChange,
    handleClick,
  };
};
