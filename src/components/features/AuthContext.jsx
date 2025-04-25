import React, { createContext, useContext, useEffect, useRef, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const modalRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const username = useRef(null);
  const profilePicture = useRef(null);

  const setCurrentUser = () => {
    fetch(`${import.meta.env.VITE_API}/api/user`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        username.current = data.name
        console.log(username);
        
      })
      .catch((err) => console.error(err));
  }

  return (
    <AuthContext.Provider
      value={{
        modalRef,
        isOpen,
        setIsOpen,
        username, 
        profilePicture,
        setCurrentUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
