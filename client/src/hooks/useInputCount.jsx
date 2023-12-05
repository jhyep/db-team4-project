import { useState } from 'react';

export function useInputCount() {
  const [inputCount, setInputCount] = useState(0);

  function handleInput(e) {
    setInputCount(e.target.value.length);
  }

  return { inputCount, handleInput };
}
