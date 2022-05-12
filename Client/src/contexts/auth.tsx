/* eslint-disable react/jsx-no-constructed-context-values */
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useNavigate } from 'react-router';
import { Order } from 'src/modules/orders/orders.types';

export const AuthContext = createContext<{
  valueSearch: string;
  accessToken: string;
  setAccessToken: Dispatch<SetStateAction<string>>;
  setValueSearch: Dispatch<SetStateAction<string>>;
  isAuthenticated: boolean;
  changeData: boolean;
  setChangeData: Dispatch<SetStateAction<boolean>>;
}>({
  accessToken: '',
  valueSearch: '',
  setAccessToken: () => {},
  setValueSearch: () => {},
  isAuthenticated: false,
  changeData: false,
  setChangeData: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState('');
  const isAuthenticated = useMemo(() => Boolean(accessToken), [accessToken]);
  const [valueSearch, setValueSearch] = useState('');
  const [changeData, setChangeData] = useState(false);
  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     navigate('/login');
  //   }
  // }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{
        changeData,
        accessToken,
        setAccessToken,
        isAuthenticated,
        valueSearch,
        setValueSearch,
        setChangeData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
