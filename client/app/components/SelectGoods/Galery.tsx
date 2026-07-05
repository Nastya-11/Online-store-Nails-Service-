'use client';
import { Img } from '@/app/interfaces/Goods';
import React, { useEffect, useState } from 'react';
import './Galery.scss';
import Image from 'next/image';
import { IoClose } from 'react-icons/io5';

type Props = {
  name: string;
  imgs: Img[];
};

const Galery = ({ name, imgs }: Props) => {
  const [selectImg, setSelectImgs] = useState<Img>(imgs[0]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const openImgs = () => {
    setIsOpen(true);
  };

  const [widthWindow, setWidthWindow] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidthWindow(window.innerWidth);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="galery-container">
      <div className="galery-image">
        <Image
          onClick={openImgs}
          src={process.env.NEXT_PUBLIC_SERVER + selectImg.img}
          alt={name}
          fill
          objectFit="contain"
          style={{ cursor: 'pointer' }}
        />
        <div className="additional-imgs">
          {imgs.filter((x) => x.id != selectImg.id).length > 0 &&
            imgs
              .filter((x) => x.id != selectImg.id)
              .map((x) => (
                <div
                  key={x.id}
                  className="img"
                  onClick={() => setSelectImgs(x)}
                >
                  <Image
                    src={process.env.NEXT_PUBLIC_SERVER + x.img}
                    alt={name}
                    width={widthWindow > 600 ? 90 : 60}
                    height={widthWindow > 600 ? 90 : 60}
                    objectFit="cover"
                  />
                </div>
              ))}
        </div>
      </div>
      {isOpen && (
        <div className="img-open" onClick={() => setIsOpen(false)}>
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="img-cont"
            style={{ cursor: 'default' }}
          >
            <div className="img-in-open">
              <Image
                src={process.env.NEXT_PUBLIC_SERVER + selectImg.img}
                alt={name}
                fill
                objectFit="contain"
                style={{ cursor: 'pointer' }}
              />
            </div>
          </div>
          <div
            onClick={() => {
              setIsOpen(false);
            }}
            className="close"
          >
            <IoClose size={30} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Galery;
