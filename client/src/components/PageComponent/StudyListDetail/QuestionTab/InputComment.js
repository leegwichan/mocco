import { css } from '@emotion/react';
import Button from '../../../Common/Button';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../../../atom/atom';
import request from '../../../../api';
import { useParams } from 'react-router-dom';
import { useInputValid } from '../hooks/useInputValid';

const InputComment = ({ getCommentInfof }) => {
  const { id } = useParams();
  const { value, errMessage, isValid, setIsValid, handleChange, handleClick } =
    useInputValid({
      initialvalues: '',
      onClick: () => {
        addCommentHandler();
      },
    });
  const userInfo = useRecoilValue(userInfoState);

  const commentInfo = {
    content: value,
    memberId: userInfo.memberId,
    studyId: id,
  };

  const addCommentHandler = () => {
    return request
      .post('/api/comments', commentInfo)
      .then(() => {
        setIsValid(true);
        getCommentInfof();
      })
      .catch(() => console.log(userInfo));
  };

  return (
    <div>
      <div css={container}>
        <input
          type="text"
          placeholder="스터디에 대한 궁금한 점을 물어보세요"
          value={value}
          onChange={handleChange}
        />
        <Button
          type={'big_blue'}
          text={'등록'}
          onClick={handleClick}
          disabled={!isValid}
        />
      </div>
      {errMessage && <div css={err}>{errMessage}</div>}
    </div>
  );
};

export default InputComment;

const container = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;

  input {
    width: 975px;
    height: 40px;
    border: 1px solid #d1d1d1;
    border-radius: 5px;
  }
`;

const err = css`
  color: red;
`;
