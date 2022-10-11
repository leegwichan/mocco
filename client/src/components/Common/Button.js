import { css } from '@emotion/react';

const Button = ({ text, onClick, type }) => {
  const types = [
    'long_blue',
    'long_grey',
    'modal_blue',
    'modal_grey',
    'big_blue',
    'big_grey',
    'big_white',
    'small_blue',
    'small_lightblue',
    'small_white',
    'small_grey',
    'header_skyblue',
    'header_log',
    'profile_modal_blue',
    'profile_modal_grey',
  ].includes(type)
    ? type
    : 'default';

  return (
    <button css={btn} className={`${types}`} onClick={onClick}>
      {text}
    </button>
  );
};

Button.defaultProps = {
  type: 'default',
};

export default Button;

const btn = css`
  margin-left: 10px;
  font-weight: 600;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  transition: all 0.1s linear;
  cursor: pointer;

  &:active {
    transform: scale(0.95);
  }

  &.big_blue {
    padding: 0px 28px;
    height: 42px;
    font-size: 20px;
    background-color: #0b6ff2;
    color: #ffffff;
    border: 1px solid #0b6ff2;

    @media (hover: hover) {
      &:hover {
        color: #0b6ff2;
        background-color: #ffffff;
      }
    }
  }

  &.big_grey {
    padding: 0px 28px;
    height: 42px;
    font-size: 20px;
    background-color: #999999;
    color: #ffffff;
    border: 1px solid #999999;
    @media (hover: hover) {
      &hover {
        color: #999999;
        background-color: #ffffff;
      }
    }
  }

  &.big_white {
    padding: 0px 28px;
    height: 42px;
    font-size: 20px;
    background-color: #ffffff;
    color: #0b6ff2;
    border: 1px solid #0b6ff2;
    @media (hover: hover) {
      &hover {
        color: #ffffff;
        background-color: #0b6ff2;
      }
    }
  }

  &.small_blue {
    font-size: 15px;
    width: 64px;
    height: 32px;
    background-color: #0b6ff2;
    color: #ffffff;
    border: 1px solid #0b6ff2;
    @media (hover: hover) {
      &:hover {
        color: #0b6ff2;
        background-color: #ffffff;
      }
    }
  }

  &.small_lightblue {
    font-size: 15px;
    height: 32px;
    padding: 0 9px;
    color: #0b6ff2;
    background-color: #f0f8ff;
  }

  &.small_white {
    font-size: 15px;
    width: 64px;
    height: 32px;
    background-color: #ffffff;
    color: #0b6ff2;
    border: 1px solid #0b6ff2;
    @media (hover: hover) {
      &:hover {
        color: #ffffff;
        background-color: #0b6ff2;
      }
    }
  }

  &.small_grey {
    font-size: 15px;
    width: 64px;
    height: 32px;
    background-color: #999999;
    color: #ffffff;
    border: 1px solid #999999;
    @media (hover: hover) {
      &:hover {
        color: #646464;
        background-color: #ffffff;
      }
    }
  }

  &.long_blue {
    font-size: 18px;
    width: 340px;
    height: 40px;
    background-color: #0b6ff2;
    color: #ffffff;
    border: 1px solid #0b6ff2;
    @media (hover: hover) {
      &:hover {
        color: #0b6ff2;
        background-color: #ffffff;
      }
    }
  }

  &.long_grey {
    font-size: 18px;
    width: 340px;
    height: 40px;
    background-color: #999999;
    color: #ffffff;
    border: 1px solid #999999;
    @media (hover: hover) {
      &:hover {
        color: #a4a4a4;
        background-color: #ffffff;
      }
    }
  }

  &.modal_blue {
    font-size: 15px;
    width: 240px;
    height: 40px;
    background-color: #0b6ff2;
    color: #ffffff;
    border: 1px solid #0b6ff2;
    @media (hover: hover) {
      &:hover {
        color: #0b6ff2;
        background-color: #ffffff;
      }
    }
  }

  &.modal_grey {
    font-size: 15px;
    width: 240px;
    height: 40px;
    background-color: #999999;
    color: #ffffff;
    border: 1px solid #999999;
    @media (hover: hover) {
      &:hover {
        color: #a4a4a4;
        background-color: #ffffff;
      }
    }
  }

  &.header_skyblue {
    font-size: 15px;
    height: 32px;
    color: black;
    background-color: #ffffff;
    @media (hover: hover) {
      &:hover {
        color: #0b6ff2;
        background-color: #f0f8ff;
        box-shadow: 0px 5px 2px -2px rgba(0, 0, 0, 0.25);
      }
    }
  }

  &.header_log {
    font-size: 15px;
    height: 32px;
    background-color: #0b6ff2;
    color: #ffffff;
    border: 1px solid #0b6ff2;
    @media (hover: hover) {
      &:hover {
        color: #0b6ff2;
        background-color: #ffffff;
      }
    }
  }

  &.profile_modal_blue {
    margin: 0;
    font-size: 18px;
    width: 100%;
    height: 40px;
    background-color: #0b6ff2;
    color: #ffffff;
    border: 1px solid #0b6ff2;
    border-radius: 5px;
    @media (hover: hover) {
      &:hover {
        color: #0b6ff2;
        background-color: #ffffff;
      }
    }
  }

  &.profile_modal_grey {
    margin: 0;
    font-size: 18px;
    width: 100%;
    height: 40px;
    background-color: #999999;
    color: #ffffff;
    border: 1px solid #999999;
    border-radius: 5px;
    @media (hover: hover) {
      &:hover {
        color: #a4a4a4;
        background-color: #ffffff;
      }
    }
  }
`;
