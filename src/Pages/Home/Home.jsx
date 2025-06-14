import React from "react";
import Banner from "../../Components/HomeComponents/Banner";
import Categories from "../../Components/HomeComponents/Categories";
import HomeProducts from "../../Components/HomeComponents/HomeProducts";
import FeaturedProducts from "../../Components/HomeComponents/FeaturedProducts";
import HomeAbout from "../../Components/HomeComponents/HomeAbout";
import HomeFAQ from "../../Components/HomeComponents/HomeFAQ";

const Home = () => {
  return (
    <div>
      <Banner />
      <Categories />
      <FeaturedProducts />
      <HomeProducts />
      <HomeAbout />
      <HomeFAQ />
    </div>
  );
};

export default Home;
