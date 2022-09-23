import { useState } from 'react';

function useInput({ defaultValue }) {
  const [value, setValue] = useState(defaultValue);
  const onChange = (event) => setValue(event.currentTarget.value);
  return [value, onChange];
}

export default useInput;