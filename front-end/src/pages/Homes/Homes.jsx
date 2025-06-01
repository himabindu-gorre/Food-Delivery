import React, { useState } from 'react';
import './Homes.css';
import Header from '../../components/Header/Headers'
import ExploreMenu from '../../components/ExploreMenu/exploreMenu';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import AppDownload from '../../components/AppDownload/AppDownload';

const Homes = () => {

  const [category, setCategory] = useState("All");

  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory}/> 
      <FoodDisplay category={category}/>
      <AppDownload />
    </div> 
  );
}

export default Homes;
