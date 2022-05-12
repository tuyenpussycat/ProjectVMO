import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './contexts/auth';
import { routesConfig } from './pages/routes';
import { CartProvider } from 'react-use-cart';
export default function App() {
  return (
    <CartProvider>
      <ChakraProvider>
        <BrowserRouter>
          <AppWithRouter />
        </BrowserRouter>
      </ChakraProvider>
    </CartProvider>
  );
}

function AppWithRouter() {
  return (
    <AuthProvider>
      <Routes>
        {routesConfig.map(({ path, component: Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      </Routes>
    </AuthProvider>
  );
}
