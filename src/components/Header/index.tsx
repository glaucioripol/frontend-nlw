import React from "react";

interface Props {
  title: string;
}

export const Header: React.FC<Props> = ({ title }) => (
  <header>
    <h1>{title}</h1>
  </header>
);
