import React, { useEffect, useState } from "react";
import "./Home.css";
import Product from "./Product";
import Tiles from "./Tiles";
import { useDispatch, useSelector } from "react-redux";
import Errormsg from "./Errormsg";
import flag from "./images/flag.png";
import { allProductsLoad } from "./redux/actions/allProductsActions";
import Carousel, { CarouselItem } from "./Carousel";
import carousel1 from "./images/carousel1.png";
import carousel2 from "./images/carousel2.png";
import { css } from "@emotion/react";
import BounceLoader from "react-spinners/BounceLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: #f6dd90;
`;

function Home() {
  const dispatch = useDispatch();
  const [color, setColor] = useState("#f6dd90");
  const AllProducts = useSelector((state) => state.AllProducts);
  const { loading, error, allProducts } = AllProducts;

  useEffect(() => {
    dispatch(allProductsLoad({}));
  }, [dispatch]);

  return (
    <div className="home">
      {loading ? (
        <BounceLoader
          color={color}
          loading={loading}
          css={override}
          size={60}
        />
      ) : error ? (
        <Errormsg>{error}</Errormsg>
      ) : (
        <>
          <Tiles />
          <div className="home__flag">
            <img src={flag} alt="" />
          </div>
          <h3>FEATURED PRODUCTS</h3>
          <Carousel>
            <CarouselItem>
              <img className="carouselimg" src={carousel1} alt="" />
            </CarouselItem>
            <CarouselItem>
              <img className="carouselimg" src={carousel2} alt="" />
            </CarouselItem>
          </Carousel>

          <div className="home__page">
            {/* <div className="home__sidebar">
                            <Sidebar/>
                        </div> */}
            <div className="home__container">
              {allProducts.map((item) => {
                return <Product key={item._id} prop={item} />;
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
