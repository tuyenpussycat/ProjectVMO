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
      className="bg-black fixed z-[9999999999999]"
    >
      <Box>
        <Flex justifyContent={'center'}>
          <Box className="text-2xl mt-8 text-white">ADMIN </Box>
          <Box className="text-white text-2xl ml-3 opacity-70 mt-8">DASHBOARD</Box>
        </Flex>
      </Box>
    </Flex>
  );
}
