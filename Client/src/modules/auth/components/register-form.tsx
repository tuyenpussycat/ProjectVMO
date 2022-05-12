import { Button, Container, Flex, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { FormEvent, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../../contexts/auth';
import { injectAccessToken } from '../../../utils/request';
import { ACCESS_TOKEN } from '../auth.constants';

export function RegisterForm() {
  const navigate = useNavigate();
  const { setAccessToken } = useContext(AuthContext);

  const handleLogin = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      injectAccessToken(ACCESS_TOKEN);
      setAccessToken(ACCESS_TOKEN);
      navigate('/');
    },
    [setAccessToken],
  );

  return (
    <Flex
      minH="100vh"
      justifyContent="center"
      alignItems="center"
      bgGradient="linear(to-tr, cyan.200, cyan.400)"
    >
      <div>hihi</div>
    </Flex>
  );
}
