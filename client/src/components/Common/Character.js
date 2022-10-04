import { css } from '@emotion/react';

function Character({ src, alt, width, height, max_height, max_width }) {
  return (
    <img
      src={src}
      alt={alt}
      css={css`
        width: ${width};
        height: ${height};
        max-width: ${max_width};
        max-height: ${max_height};
        padding-bottom: 10px;
      `}
    />
  );
}

export default Character;
