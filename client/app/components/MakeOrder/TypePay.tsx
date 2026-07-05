import React from 'react';
import CircleEmptySVG from '../../assest/MakeOrder/circleEmpty.svg';
import CircleSVG from '../../assest/MakeOrder/circle.svg';
import './TypePay.scss';

type Props = {
  id: number;
  isSelect: boolean;
  setId: any;
  SVG: any;
  text: string;
};

const TypePay = ({ id, isSelect, setId, SVG, text }: Props) => {
  return (
    <div onClick={() => setId(id)} className="type-pay-cont">
      <div className="svg-with-text">
        <SVG /> <div className="text">{text}</div>
      </div>
      <div className="check">
        {isSelect ? <CircleSVG /> : <CircleEmptySVG />}
      </div>
    </div>
  );
};

export default TypePay;
