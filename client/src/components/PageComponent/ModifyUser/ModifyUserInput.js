import { css } from '@emotion/react';
import { forwardRef } from 'react';

const ModifyUserInput = forwardRef((props, ref) => {
  return (
    <div>
      <label htmlFor={props.name}>
        <h3 css={labelTextStyle}>{props.labelText}</h3>
      </label>
      {props.type === 'textarea' && (
        <textarea
          css={textareaStyle}
          type={props.type}
          name={props.name}
          {...props.rest}
          ref={ref}
          onSubmit={props.onSubmit}
        />
      )}
      {props.type !== 'textarea' && (
        <input
          css={inputStyle}
          type={props.type}
          name={props.name}
          {...props.rest}
          ref={ref}
          onChange={props.onChange}
          onSubmit={props.onSubmit}
        />
      )}
    </div>
  );
});

ModifyUserInput.displayName = 'ModifyUser';

const inputStyle = css`
  width: 100%;
  height: 40px;
  background-color: #ffffff;
  border-radius: 5px;
  border: 1px solid #d1d1d1;
  margin-bottom: 12px;
`;

const textareaStyle = css`
  width: 100%;
  height: 120px;
  background-color: #ffffff;
  border-radius: 5px;
  border: 1px solid #d1d1d1;
  margin-bottom: 12px;
`;

const labelTextStyle = css`
  font-size: 18px;
  margin-bottom: 12px;
`;

export default ModifyUserInput;
