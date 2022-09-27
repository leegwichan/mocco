import { css } from '@emotion/react';
import { useState } from 'react';
import { userInfoState } from '../../../../atom/atom';
import { useRecoilValue } from 'recoil';

function UserSelect({ memberInfo }) {
  const userInfo = useRecoilValue(userInfoState);
  const [select, setSelect] = useState(userInfo.nickname);

  console.log(memberInfo);

  const handleSelectChage = (e) => {
    const { value } = e.target;
    setSelect(memberInfo.filter((user) => user === value));
  };
  return (
    <div>
      {memberInfo && (
        <select onChange={handleSelectChage} value={select} css={user}>
          {memberInfo.map((user) => {
            return (
              <option key={user.memberId}>
                {user.memberId} {user.nickname}
              </option>
            );
          })}
        </select>
      )}
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
