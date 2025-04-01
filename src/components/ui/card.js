import React from "react";

export const Card = ({ children, className }) => (
  <div className={`border rounded shadow p-4 bg-white ${className}`}>{children}</div>
);

export const CardContent = ({ children, className }) => (
  <div className={className}>{children}</div>
);