"use client";
import { Cardo } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  minusProduct,
  plusProduct,
  removeProduct,
} from "../../../redux/cart/slice";
import { CartProduct } from "../../../redux/cart/types";
import { useAppDispatch } from "../../../redux/store";

export const CartProductCard: React.FC<CartProduct> = ({
  id,
  title,
  subtitle,
  imageUrl,
  color,
  size,
  price,
  value,
}) => {
  const dispatch = useAppDispatch();
  return (
    <div className="cart-product-card">
      <Link className="cart-product-card__link-block" href={`product/${id}`}>
        <Image
          src={require(`../../.././assets/img/products/${imageUrl}.jpg`)}
          alt="img"
        ></Image>
        <div className="cart-product-card__text">
          <h3 className="cart-product-card__title">
            {title} <span>{subtitle && `(${subtitle})`}</span>
          </h3>
          <p className="cart-product-card__descr">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
            malesuada dui in mi tincidunt vehicula.
          </p>
        </div>
        <div className="cart-product-card__info">
          <div className="cart-product-card__info-block">
            <span>Color: {color}</span>
            <div className="choose-element choose-element--cart">
              <div
                className="circle circle--filled"
                style={{ backgroundColor: `${color}` }}
              ></div>
            </div>
          </div>
          <hr />
          <div className="cart-product-card__info-block">
            <span>Size: {size}</span>
            <div className="choose-element choose-element--cart">
              <div className="circle">{size}</div>
            </div>
          </div>
        </div>
      </Link>
      <div className="cart-product-card__selection">
        <p className="cart-product-card__price">${price * value}</p>
        <div className="cart-product-card__counter">
          <button
            onClick={() => dispatch(minusProduct({ id, color, size, value }))}
            disabled={value === 1}
          >
            -
          </button>
          <span className="cart-product-card__counter-value">{value}</span>
          <button
            onClick={() => dispatch(plusProduct({ id, color, size, value }))}
          >
            +
          </button>
        </div>
        <button
          className="cart-product-card__remove-btn"
          onClick={() =>
            confirm(`Are you sure to remove product: "${title}"?`) &&
            dispatch(removeProduct({ id, color, size }))
          }
        >
          Remove
        </button>
      </div>
    </div>
  );
};
