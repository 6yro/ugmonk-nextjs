"use client";
import React from "react";
import ContentLoader from "react-content-loader";

export const Skeleton: React.FC = () => (
  <ContentLoader
    className="product-card"
    speed={2}
    width={275}
    height={390}
    viewBox="0 0 275 390"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="139" y="520" rx="25" ry="25" width="152" height="45" />
    <rect x="0" y="0" rx="0" ry="0" width="275" height="341" />
    <rect x="0" y="350" rx="0" ry="0" width="275" height="18" />
    <rect x="0" y="377" rx="0" ry="0" width="56" height="13" />
  </ContentLoader>
);
