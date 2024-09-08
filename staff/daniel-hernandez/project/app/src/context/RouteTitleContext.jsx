import { createContext, useState, useContext } from 'react';

const RouteTitleContext = createContext();

export const RouteTitleProvider = ({ children }) => {
   const [title, setTitle] = useState('');

   return <RouteTitleContext.Provider value={{ title, setTitle }}>{children}</RouteTitleContext.Provider>;
};

export const useRouteTitle = () => useContext(RouteTitleContext);
