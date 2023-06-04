'use client'

import React from "react";

interface IClientRender {
  fallback: React.ReactNode;
}

const ClientRender: React.FC<IClientRender> = ({ fallback }) => {
  return <React.Fragment>{fallback}</React.Fragment>;
};

export default ClientRender