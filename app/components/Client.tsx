"use client"
import React from "react";

interface IClientRender {
  children: React.ReactNode;
}

const ClientRender: React.FC<IClientRender> = ({ children }) => {
  return <React.Fragment>{children}</React.Fragment>;
};

export default ClientRender