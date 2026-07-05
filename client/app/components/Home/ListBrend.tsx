import React from 'react';
import ListImgsBrends from './ListImgsBrends';
import './HomeBrends.scss';

const ListBrend = () => {
  return (
    <div className="home-brends-container">
      <div className="home-brends">
        <ListImgsBrends />
        <ListImgsBrends />
        <ListImgsBrends />
      </div>
    </div>
  );
};

export default ListBrend;
