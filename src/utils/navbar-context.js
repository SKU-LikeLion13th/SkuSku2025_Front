import React from 'react';
import { useState, useContext } from 'react';

const NavbarContext = React.createContext();

export function useNavbar() {
  return useContext(NavbarContext);
}

export function NavbarProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const value = {
    isOpen,
    setIsOpen
  };

  return (
    <NavbarContext.Provider value={value}>
      {children}
    </NavbarContext.Provider>
  );
}