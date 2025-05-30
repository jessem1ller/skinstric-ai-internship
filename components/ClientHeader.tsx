"use client";

import dynamic from 'next/dynamic';
import React from 'react';

const Header = dynamic(() => import('./Header'), { ssr: false });

interface ClientHeaderProps {
  section?: string;
}

const ClientHeader: React.FC<ClientHeaderProps> = ({ section }) => {
  return <Header section={section} />;
};

export default ClientHeader;