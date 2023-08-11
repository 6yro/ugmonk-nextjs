"use client";
import React from "react";

import Link from "next/link";
import Image from "next/image";

import { Product } from "../../../redux/products/types";
import { isSoldOutProduct } from "../../../utils/isSoldOutProduct";

export const ProductCard: React.FC<Product> = ({
  id,
  title,
  subtitle,
  imageUrl,
  sizes,
}) => {
  return (
    <Link href={`product/${id}`} className="product-card">
      <Image
        src={require(`../../../assets/img/products/${imageUrl}.jpg`)}
        alt="img"
      />
      <div className="product-card__text">
        <h4>
          {title}&nbsp;
          {subtitle && <span>({subtitle})</span>}
        </h4>
        <p className="product-card__price">
          {isSoldOutProduct(sizes)
            ? "SOLD OUT"
            : `$${sizes[0].price} - $${sizes[sizes.length - 1].price}`}
        </p>
      </div>
    </Link>
  );
};
