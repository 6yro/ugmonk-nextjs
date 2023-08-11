"use client";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import { clearCart } from "../../redux/cart/slice";
import { RootState, useAppDispatch } from "../../redux/store";
import { CartProductCard } from "./components/CartProductCard";

import emptyCartImg from "../.././assets/img/empty-cart-img.jpg";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Cart = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { cartProducts, totalPrice } = useSelector(
    (state: RootState) => state.cart
  );

  if (cartProducts.length === 0) {
    return (
      <section className="cart">
        <div className="container container--cart-empty">
          <div className="cart__inner cart__inner--empty">
            <h2>Cart is empty</h2>
            <p>Add some products and come back.</p>
            <Image src={emptyCartImg} alt="img" />
            <Link href="/">
              <button className="btn btn--circle">Back to home page</button>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="cart">
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
        <div className="cart__inner">
          <div className="cart__block cart__block--products">
            {cartProducts.map((obj, id) => (
              <CartProductCard key={id} {...obj} />
            ))}
          </div>
          <div className="cart__block cart__block--purchase">
            <div className="cart__title">
              <hr></hr>
              <h2>Cart</h2>
              <hr></hr>
            </div>
            <p className="cart__price">
              Total price: <span>${totalPrice}</span>
            </p>
            <hr className="cart__purchase-line"></hr>
            <div className="cart__btns">
              <button className="btn btn--circle-long ">Buy</button>
              <button
                className="btn btn--circle-light-blue"
                onClick={() =>
                  confirm("Are you sure to clear the cart?") &&
                  dispatch(clearCart())
                }
              >
                Clear cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
