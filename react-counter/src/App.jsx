import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  const increaseCount = () => {
    setCount(count + 1);
  };

  const decreaseCount = () => {
    setCount(count - 1);
  };

  return (
    <div>
      <h2 id="number">{count}</h2>
      <button id="increase" onClick={increaseCount}>+1</button>
      <button id="decrease" onClick={decreaseCount}>-1</button>
    </div>
  );
}

export default Counter;