import React, { useEffect } from 'react';

type Props = {
  setInfoDelivery: (info: any) => void;
  text: string;
};

const NoSelectLocality = ({ setInfoDelivery, text }: Props) => {
  useEffect(() => {
    setInfoDelivery({ isTrue: false });
  }, []);
  return <span style={{ color: 'red' }}>{text}</span>;
};

export default NoSelectLocality;
