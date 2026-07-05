import React, { useEffect } from 'react';

type Props = {
  setInfoDelivery: (info: any) => void;
  text: string;
};

const SelfPickup = ({ text, setInfoDelivery }: Props) => {
  useEffect(() => {
    setInfoDelivery({ isTrue: true });
  }, []);
  return <div>{text}</div>;
};

export default SelfPickup;
