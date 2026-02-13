import { useState } from 'react';
import { Button } from "@/components/ui/button"

interface CounterProps {
  initialCount?: number;
}

const WgodBase = ({ initialCount = 0 }: CounterProps) => {
  const [count, setCount] = useState<number>(initialCount);

  const increment = () => {
    setCount(count + 1);
  };
  const decrement = () => {
    setCount(count - 1);
  };  

  return (
    <div>
      <p>Count: {count}</p>
      <Button className='bg-blue-500' onClick={increment}>Increase</Button>
      <Button className='bg-blue-500' onClick={decrement}>Decrease</Button>
    </div>
  );
};

export default WgodBase;