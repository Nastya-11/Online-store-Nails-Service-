import React from 'react';
import './TypeDelivery.scss';
import CircleEmptySVG from '../../assest/MakeOrder/circleEmpty.svg';
import CircleSVG from '../../assest/MakeOrder/circle.svg';

type Props = {
  Svg: any;
  title: string;
  description: string;
  isSelect: boolean;
  children: any;
  setSelect: any;
  id: number;
};

const TypeDelivery = ({
  Svg,
  title,
  description,
  isSelect,
  children,
  setSelect,
  id,
}: Props) => {
  return (
    <div
      className={`type-delivery-cont ${isSelect && 'type-delivery-cont-open'}`}
    >
      <div className="type-delivery">
        <div onClick={() => setSelect(id)} className="title-cont">
          <div className="title-text">
            <div className="title-and-svg">
              <div className="svg">
                <Svg />
              </div>{' '}
              <span>{title}</span>
            </div>
            <div className="description">{description}</div>
          </div>
          {isSelect ? <CircleSVG /> : <CircleEmptySVG />}
        </div>
        {isSelect && <div className="children">{isSelect && children}</div>}
      </div>
    </div>
  );
};

export default TypeDelivery;
