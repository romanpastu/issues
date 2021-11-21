import React, { useState } from 'react';

export const useInput = ({ type }: any) => {
  const [value, setValue] = useState('');
  const input = <input value={value} onChange={e => setValue(e.target.value)} type={type} />;
  return [value, input];
};
