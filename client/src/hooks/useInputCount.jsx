import { useState } from 'react';

export function useInputCount() {
  const [inputCount, setInputCount] = useState(0);

  function handleInput(e) {
    setInputCount(e.target.value.length);
    console.log(inputCount);
  }

  return { inputCount, handleInput };
}
