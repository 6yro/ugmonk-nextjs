"use client";
import React from "react";

type CategoriesProps = {
  categoriesList: string[];
  value: number;
  setCategoriesValue(id: number): void;
};

export const Categories: React.FC<CategoriesProps> = ({
  categoriesList,
  value,
  setCategoriesValue,
}) => {
  return (
    <ul className="products__categories">
      {categoriesList.map((title, id) => (
        <li
          className={value === id ? "active" : ""}
          onClick={() => setCategoriesValue(id)}
          key={id}
        >
          {title}
        </li>
      ))}
    </ul>
  );
};
