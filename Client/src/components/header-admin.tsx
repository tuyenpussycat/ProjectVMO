import { Avatar, Box, Flex, Img, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { useNavigate } from 'react-router';
import { useContext } from 'react';
import { AuthContext } from '../contexts/auth';
export function HeaderAdmin() {
  const navigate = useNavigate();
  const { username } = useContext(AuthContext);
  return (
    <Flex
      justifyContent={'space-between'}
      width={'100%'}
      height="24"
      className="bg-gray-500 fixed z-[9999999999999]"
    >
      <Box>
        <Flex>
          <Img
            className="ml-7"
            width={'16'}
            marginTop="4"
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          ></Img>
          <Box className="text-4xl mt-[26px] mx-5 text-white">Admin</Box>
        </Flex>
      </Box>
    </Flex>
  );
}
