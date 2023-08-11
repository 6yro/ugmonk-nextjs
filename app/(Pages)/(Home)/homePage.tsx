"use client";
import React from "react";

import Link from "next/link";
import Image from "next/image";

import gatherImg from "../.././assets/img/gather.jpg";
import finalStockImg from "../.././assets/img/final-stock.jpg";
import missionMenImg from "../.././assets/img/mission__men.jpg";
import missionWomenImg from "../.././assets/img/mission__women.jpg";
import missionObjectsImg from "../.././assets/img/mission__objects.jpg";

import { ProductCard } from "./components/ProductCard";
import { Skeleton } from "./components/Skeleton";
import { Categories } from "./components/Categories";

import { fetchProducts } from "../../redux/products/asyncActions";
import { RootState, useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { clearProducts, setStartProducts } from "../../redux/products/slice";
import { Product } from "../../redux/products/types";

type HomeProps = {
  startProducts: { paginationLinks: any; data: Product[] };
  categoriesList: string[];
};

const Home: React.FC<HomeProps> = ({ startProducts, categoriesList }) => {
  const dispatch = useAppDispatch();
  const { products, paginationLinks, status } = useSelector(
    (state: RootState) => state.products
  );
  const [categoriesValue, setCategoriesValue] = React.useState(0);
  const currentCategory = categoriesList[categoriesValue];

  const isFirstRender = React.useRef(true);

  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      dispatch(setStartProducts(startProducts));
    } else dispatch(fetchProducts({ currentCategory, _page: 1 }));
    return () => {
      dispatch(clearProducts());
    };
  }, [categoriesValue]);

  const fetchPagination = (links: any) => {
    if (links.next) {
      dispatch(
        fetchProducts({
          currentCategory,
          _page: links.next._page,
        })
      );
    }
  };

  return (
    <div className="App">
      <section className="product-intro">
        <div className="container">
          <div className="product-intro__text">
            <h2>Analog: The Simplest Productivity System</h2>
            <Link
              href="/"
              className="link-btn link-btn--medium link-btn--white"
            >
              <p>Learn more</p>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="products">
        <div className="container">
          <div className="products__inner">
            <Categories
              categoriesList={categoriesList}
              value={categoriesValue}
              setCategoriesValue={setCategoriesValue}
            />
            <div className="products__items">
              {status === "success"
                ? products.map((obj: Product) => (
                    <ProductCard key={obj.id} {...obj} />
                  ))
                : status === "never" || "loading"
                ? [...new Array(4)].map((_, index) => <Skeleton key={index} />)
                : "Произошла ошибка при загрузке товаров"}
            </div>
            <button
              disabled={!paginationLinks || !paginationLinks.next}
              onClick={() => fetchPagination(paginationLinks)}
              className="btn"
            >
              Shop New Arrivals
            </button>
          </div>
        </div>
      </section>

      <section className="presentation-block presentation-block--light-gray">
        <div className="container">
          <div className="presentation-block__inner">
            <div className="presentation-block__text">
              <h2>Final Stock - Up to 50% Off</h2>
              <Link href="/" className="link-btn link-btn--small">
                <p>Shop the sale</p>
                <span>→</span>
              </Link>
            </div>
            <Image src={finalStockImg} alt="img" />
          </div>
        </div>
      </section>

      <section className="mission">
        <div className="container">
          <div className="mission__inner">
            <h2 className="mission__title">
              Our mission is to create simple, beautiful objects that combine
              form and function.
            </h2>
            <div className="mission__items-row">
              <div className="mission__item">
                <Image src={missionMenImg} alt="" />
                <Link href="/" className="link-btn link-btn--large">
                  <p>Shop Mens</p>
                  <span>→</span>
                </Link>
              </div>
              <div className="mission__item">
                <Image src={missionWomenImg} alt="" />
                <Link href="/" className="link-btn link-btn--large">
                  <p>Shop Womens</p>
                  <span>→</span>
                </Link>
              </div>
            </div>
            <div className="mission__item">
              <Image src={missionObjectsImg} alt="" />
              <Link href="/" className="link-btn link-btn--large">
                <p>Shop Objects</p>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="presentation-block">
        <div className="container">
          <div className="presentation-block__inner">
            <div className="presentation-block__text">
              <h2>Gather</h2>
              <p>
                The minimal, modular desk organizer that cuts through the
                clutter
              </p>
              <Link href="/" className="link-btn link-btn--small">
                <p>Shop Gather</p>
                <span>→</span>
              </Link>
            </div>
            <Image src={gatherImg} alt="img" />
          </div>
        </div>
      </section>

      <section className="history">
        <div className="container">
          <div className="history__text">
            <h2>
              A design studio in Downingtown, PA, creating and curating products
              that combine form & function
            </h2>
            <Link
              href="/"
              className="link-btn link-btn--medium link-btn--white"
            >
              <p>Read Our Story</p>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="contact">
        <div className="container">
          <div className="contact__inner">
            <div className="contact__text">
              <h2>Stay in the loop</h2>
              <p>
                Be the first to know when new products drop and get
                behind-the-scenes content straight from Ugmonk’s founder.
              </p>
            </div>
            <div className="contact__form">
              <input type="email" placeholder="Enter your email" />
              <button>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
