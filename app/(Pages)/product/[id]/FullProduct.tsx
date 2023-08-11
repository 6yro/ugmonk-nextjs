"use client";
import React, { useRef, useState } from "react";
import { Product } from "../../../redux/products/types";
import { isSoldOutProduct } from "../../../utils/isSoldOutProduct";
import { useAppDispatch } from "../../../redux/store";
import { addToCart } from "../../../redux/cart/slice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

type FullProductProps = {
  product: Product;
};

const FullProduct: React.FC<FullProductProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [chosenColor, setChosenColor] = useState<string>();
  const [chosenSize, setChosenSize] = useState<{
    size: string;
    inStock: boolean;
    price: number;
  }>();
  const [addedProductValue, setAddedProductValue] = useState<number>(0);

  const notificationRef = useRef<HTMLAnchorElement>(null);

  const { id, imageUrl, title, subtitle, colors, sizes } = product;

  if (product === undefined) {
    alert("An error occurred while receiving product data");
    router.replace("/");
  }

  const isSoldOut = isSoldOutProduct(product.sizes);

  const handleBtnClick = () => {
    chosenSize &&
      chosenColor &&
      dispatch(
        addToCart({
          id,
          title,
          subtitle,
          imageUrl,
          color: chosenColor,
          size: chosenSize.size,
          price: chosenSize.price,
          value: 1,
        })
      );

    showNotification();
  };

  const showNotification = () => {
    const notification = notificationRef.current;
    if (notification) {
      setAddedProductValue(addedProductValue + 1);
      if (window.screen.width <= 960) {
        notification.style.top = "650px";
      } else notification.style.top = "89px";
    }
  };

  return (
    <section className="fullProduct">
      <Link
        href={"/cart"}
        className="fullProduct__notification"
        ref={notificationRef}
      >
        <svg
          width="20"
          height="21"
          viewBox="0 0 20 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <mask id="path-1-inside-1_35_344" fill="white">
            <path d="M17.0711 17.5711C20.9764 13.6658 20.9764 7.33418 17.0711 3.42893C13.1659 -0.476311 6.83422 -0.476311 2.92898 3.42893C-0.976265 7.33418 -0.976265 13.6658 2.92898 17.5711C6.83422 21.4763 13.1659 21.4763 17.0711 17.5711Z" />
          </mask>
          <path
            d="M9.5 15.5L9.14645 15.8536L9.62636 16.3335L9.94246 15.7329L9.5 15.5ZM14.0575 5.76713L9.05754 15.2671L9.94246 15.7329L14.9425 6.23287L14.0575 5.76713ZM9.85355 15.1464L5.85355 11.1464L5.14645 11.8536L9.14645 15.8536L9.85355 15.1464ZM16.364 4.13604C19.8787 7.65076 19.8787 13.3492 16.364 16.864L17.7782 18.2782C22.074 13.9824 22.074 7.01759 17.7782 2.72183L16.364 4.13604ZM16.364 16.864C12.8493 20.3787 7.1508 20.3787 3.63608 16.864L2.22187 18.2782C6.51764 22.5739 13.4825 22.5739 17.7782 18.2782L16.364 16.864ZM3.63608 16.864C0.121366 13.3492 0.121366 7.65076 3.63608 4.13604L2.22187 2.72183C-2.0739 7.01759 -2.0739 13.9824 2.22187 18.2782L3.63608 16.864ZM3.63608 4.13604C7.1508 0.62132 12.8493 0.62132 16.364 4.13604L17.7782 2.72183C13.4825 -1.57394 6.51764 -1.57394 2.22187 2.72183L3.63608 4.13604Z"
            fill="#5ED371"
            mask="url(#path-1-inside-1_35_344)"
          />
        </svg>
        Successfully added to cart
        {addedProductValue > 1 && ` (${addedProductValue})`}
      </Link>
      <div className="container container--lg">
        <div
          className="to-prev-page"
          onClick={() => {
            router.back();
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask id="path-1-inside-1_35_338" fill="white">
              <path d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z" />
            </mask>
            <path
              d="M4.5 10L4.14645 9.64645L3.79289 10L4.14645 10.3536L4.5 10ZM16 9.5H4.5V10.5H16V9.5ZM4.85355 10.3536L8.35355 6.85355L7.64645 6.14645L4.14645 9.64645L4.85355 10.3536ZM4.14645 10.3536L7.64645 13.8536L8.35355 13.1464L4.85355 9.64645L4.14645 10.3536ZM19 10C19 14.9706 14.9706 19 10 19V21C16.0751 21 21 16.0751 21 10H19ZM10 19C5.02944 19 1 14.9706 1 10H-1C-1 16.0751 3.92487 21 10 21V19ZM1 10C1 5.02944 5.02944 1 10 1V-1C3.92487 -1 -1 3.92487 -1 10H1ZM10 1C14.9706 1 19 5.02944 19 10H21C21 3.92487 16.0751 -1 10 -1V1Z"
              fill="black"
              mask="url(#path-1-inside-1_35_338)"
            />
          </svg>
          <span>Back to previous page</span>
        </div>
        <div className="fullProduct__inner">
          <div className="fullProduct__images">
            <div className="fullProduct__sub-images">
              <Image
                src={require(`../../.././assets/img/products/${imageUrl}.jpg`)}
                alt="sub-img"
                className="fullProduct__sub-image"
              />
              <Image
                src={require(`../../.././assets/img/products/${imageUrl}.jpg`)}
                alt="sub-img"
                className="fullProduct__sub-image"
              />
              <Image
                src={require(`../../.././assets/img/products/${imageUrl}.jpg`)}
                alt="sub-img"
                className="fullProduct__sub-image"
              />
            </div>
            <Image
              src={require(`../../.././assets/img/products/${imageUrl}.jpg`)}
              alt="main-img"
              className="fullProduct__main-image"
            />
          </div>
          <div className="fullProduct__content">
            <h2>
              {title}&nbsp;
              {subtitle && <span>({subtitle})</span>}
            </h2>
            <span className="fullProduct__price">
              {chosenSize
                ? `$${chosenSize.price}`
                : `$${sizes[0].price} - $${sizes[sizes.length - 1].price}`}
            </span>
            <p className="fullProduct__descr">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum
              beatae voluptatum, dicta fugit incidunt nisi sed vel blanditiis
              adipisci autem excepturi labore, voluptates temporibus ducimus,
              harum aut asperiores accusamus sapiente.
            </p>
            <div className="fullProduct__selection">
              <div className="choose-block">
                <p>Color: {chosenColor ? chosenColor : "not selected"}</p>
                <ul className="choose-elements-list">
                  {colors.map(
                    (color, id) =>
                      color && (
                        <li
                          className={
                            color === chosenColor
                              ? "choose-element choose-element--active"
                              : "choose-element "
                          }
                          key={id}
                          onClick={() => {
                            setChosenColor(color);
                          }}
                        >
                          <div
                            className="circle circle--filled"
                            style={{ backgroundColor: `${color}` }}
                          ></div>
                        </li>
                      )
                  )}
                </ul>
              </div>
              <div className="choose-block">
                <p>Size: {chosenSize ? chosenSize.size : "not selected"}</p>
                <ul className="choose-elements-list">
                  {product.sizes.map((obj, id) => (
                    <li
                      onClick={() => {
                        if (obj.inStock !== false) {
                          setChosenSize(obj);
                        }
                      }}
                      key={id}
                      className={
                        chosenSize !== undefined && chosenSize.size === obj.size
                          ? "choose-element choose-element--active"
                          : obj.inStock === false
                          ? "choose-element choose-element--disabled"
                          : "choose-element "
                      }
                    >
                      <div className="circle">{obj.size}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <button
              className="btn"
              onClick={handleBtnClick}
              disabled={
                isSoldOut ||
                chosenSize === undefined ||
                chosenColor === undefined
              }
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FullProduct;
