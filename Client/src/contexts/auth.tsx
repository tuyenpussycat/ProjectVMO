/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, Dispatch, ReactNode, SetStateAction, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';

export const AuthContext = createContext<{
  valueSearch: string;
  accessToken: string;
  getClassify: string;
  setAccessToken: Dispatch<SetStateAction<string>>;
  setValueSearch: Dispatch<SetStateAction<string>>;
  isAuthenticated: boolean;
  changeData: boolean;
  setChangeData: Dispatch<SetStateAction<boolean>>;
  username: string;
  setUsernameContext: Dispatch<SetStateAction<string>>;
  setGetClassify: Dispatch<SetStateAction<any>>;
  getNumber: number;
  setGetNumber: Dispatch<SetStateAction<number>>;
}>({
  accessToken: '',
  getClassify: '',
  valueSearch: '',
  setAccessToken: () => {},
  setValueSearch: () => {},
  isAuthenticated: false,
  changeData: false,
  setChangeData: () => {},
  username: '',
  setUsernameContext: () => {},
  setGetClassify: () => {},
  getNumber: 1,
  setGetNumber: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [username, setUsernameContext] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const isAuthenticated = useMemo(() => Boolean(accessToken), [accessToken]);
  const [valueSearch, setValueSearch] = useState('');
  const [changeData, setChangeData] = useState(false);
  const [getClassify, setGetClassify] = useState('');
  const [getNumber, setGetNumber] = useState(1);
  return (
    <AuthContext.Provider
      value={{
        getNumber,
        setGetNumber,
        username,
        getClassify,
        setUsernameContext,
        setGetClassify,
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
