import React from "react";
import Banner from "../../Components/HomeComponents/Banner";
import Categories from "../../Components/HomeComponents/Categories";
import HomeProducts from "../../Components/HomeComponents/HomeProducts";
import OfferSection from "../../Components/HomeComponents/OfferSection";

const Home = () => {
  return (
    <div>
      <Banner />
      <Categories />
      <HomeProducts />
      <OfferSection />
    </div>
  );
};

export default Home;
