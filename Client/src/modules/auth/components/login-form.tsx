import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { FormEvent, useCallback, useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../../contexts/auth';
import { injectAccessToken } from '../../../utils/request';
import { ACCESS_TOKEN } from '../auth.constants';

export function LoginForm() {
  const navigate = useNavigate();
  const { setAccessToken } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
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
      <Container minH="40" backgroundColor="white" borderRadius="8" p="8">
        <form onSubmit={handleLogin}>
          <FormControl mb="4">
            <Flex className="mb-4 font-semibold text-xl" justifyContent="center">
              Form Login
            </Flex>
            <Input id="email" placeholder="Enter your user" autoComplete="email" type="text" />
          </FormControl>
          <InputGroup size="md">
            <Input pr="4.5rem" type={show ? 'text' : 'password'} placeholder="Enter password" />
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
