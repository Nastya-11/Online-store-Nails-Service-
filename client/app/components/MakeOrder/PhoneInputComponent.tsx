import React from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

type Props = {
  value: string;
  onChange: any;
};

const PhoneInputComponent = ({ value, onChange }: Props) => {
  return (
    <PhoneInput
      country={'ua'} // Україна за замовчуванням
      value={value}
      onChange={onChange}
      inputStyle={{
        height: '40px',
        borderRadius: '4px',
        border: '1px solid #b4b4b4',
        fontSize: '13.6px',
        paddingLeft: '10px', // Відступ для коду країни
        fontFamily: 'Arial',
        fontWeight: '400',
      }}
      buttonStyle={{
        border: 'none',
        background: 'transparent',
      }}
      containerStyle={{
        width: '100%',
      }}
    />
  );
};

export default PhoneInputComponent;
