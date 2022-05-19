import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { ChangeEvent, FormEvent, useCallback, useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { LoginUser } from '../login.mutation';
import { AuthContext } from '../../../contexts/auth';
import { injectAccessToken } from '../../../utils/request';
export function LoginForm() {
  const navigate = useNavigate();
  const { setAccessToken } = useContext(AuthContext);
  const { setUsernameContext } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleChangeUsername = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  }, []);
  const handleChangePassword = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }, []);
  const handleLogin = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const loginPayload = {
        username: username,
        password: password,
      };
      const res = await LoginUser(loginPayload);

      if (res) {
        setUsernameContext(res.username);
        injectAccessToken(res.accessToken);
        setAccessToken(res.accessToken);
        navigate('/admin');
      } else {
        alert('tài khoản hoặc mật khẩu sai');
      }
    },
    [setAccessToken, username, password],
  );

  return (
    <Flex
      minH="100vh"
      justifyContent="center"
      alignItems="center"
      bgGradient="linear(to-tr, cyan.200, cyan.400)"
    >
      <Container minH="40" backgroundColor="white" borderRadius="8" p="8">
        <form onSubmit={handleLogin}>
          <FormControl mb="4">
            <Flex className="mb-4 font-semibold text-xl" justifyContent="center">
              Form Login
            </Flex>
            <Input
              onChange={handleChangeUsername}
              value={username}
              id="email"
              placeholder="Enter your user"
              autoComplete="email"
              type="text"
            />
          </FormControl>
          <InputGroup size="md">
            <Input
              onChange={handleChangePassword}
              value={password}
              pr="4.5rem"
              type={show ? 'text' : 'password'}
              placeholder="Enter password"
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
          <Flex justifyContent="center">
            <Button type="submit" colorScheme="orange" className="mt-4">
              Login
            </Button>
          </Flex>
        </form>
      </Container>
    </Flex>
  );
}
