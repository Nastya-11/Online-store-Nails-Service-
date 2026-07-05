import Image from 'next/image';
import React from 'react';
import Brends from '../../assest/Home/brends.png';

type Props = {};

const ListImgsBrends = (props: Props) => {
  return (
    <div className="list-imgs-brend">
      <Image src={Brends.src} width={3604 / 2} height={124 / 2} alt="brends" />
    </div>
  );
};

export default ListImgsBrends;
