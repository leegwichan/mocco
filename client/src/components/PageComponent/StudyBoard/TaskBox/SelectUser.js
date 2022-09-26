import { css } from '@emotion/react';
import { useState } from 'react';

function UserSelect() {
  const userList = ['팀원1', '팀원2', '팀원3', '팀원4', '팀원5'];
  const [select, setSelect] = useState('팀원1');

  const handleSelectChage = (e) => {
    const { value } = e.target;
    setSelect(userList.filter((user) => user === value));
  };
  return (
    <div>
      <select onChange={handleSelectChage} value={select} css={user}>
        {userList.map((user) => {
          return <option key={user}>{user}</option>;
        })}
      </select>
    </div>
  );
}

export default UserSelect;

const user = css`
  width: 229px;
  height: 67px;
  border-radius: 10px;
  font-size: 20px;
  background-color: white;
  border: none;
`;
