import React from 'react';

interface LinkProps {
  to: string;
  children?: React.ReactNode;
  [key: string]: unknown;
}

const Link = ({ to, children, ...rest }: LinkProps) => (
  <a href={to} {...rest}>
    {children}
  </a>
);

export default Link;
