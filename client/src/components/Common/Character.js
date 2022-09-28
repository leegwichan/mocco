import { css } from '@emotion/react';

function Character({ src, alt, width, height }) {
  return (
    <img
      src={src}
      alt={alt}
      css={css`
        width: ${width};
        height: ${height};
        padding-bottom: 10px;
      `}
    />
  );
}

export default Character;
