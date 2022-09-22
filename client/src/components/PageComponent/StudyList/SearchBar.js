import React, { useState } from 'react'; // eslint-disable-line no-unused-vars
import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

const Input = css`
  width: 100%;
  height: 40px;
  padding: 0 20px;
  font-size: 20px;
  border: 1px solid #4391f9;
  border-radius: 30px;
  background-color: #f0f8ff;
`;

const MagnifyingIcon = css`
  position: absolute;
  width: 30px;
  height: 30px;
  top: 5px;
  right: 20px;
`;

function SearchBar({
  searchContent,
  setSearchContent,
  setStudyLists,
  setApiPage,
}) {
  const [searchString, setSearchString] = useState(null);
  const navigate = useNavigate();
  const handleSearchChange = (e) => {
    setSearchString(e.target.value);
  };
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setApiPage(1);
    if (searchString) {
      setSearchContent(searchString);
      navigate(`/studylist?search=${searchString}`);
    } else {
      setSearchContent(null);
      navigate(`/studylist`);
    }
    if (searchContent !== searchString) {
      setStudyLists([]);
    }
  };
  return (
    <>
      <form action="submit" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          css={Input}
          placeholder={`원하는 스터디를 검색해 주세요.`}
          onChange={handleSearchChange}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
          css={MagnifyingIcon}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </form>
    </>
  );
}

export default SearchBar;
