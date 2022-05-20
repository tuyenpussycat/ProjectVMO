import { Avatar, Box, Flex, Img, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { useNavigate } from 'react-router';
import { useContext } from 'react';
import { AuthContext } from '../contexts/auth';
export function HeaderAdmin() {
  const navigate = useNavigate();
  const { username } = useContext(AuthContext);
  return (
    <Flex justifyContent={'space-between'} width={'100%'} height="24" className="bg-gray-500">
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
      <Box className="mt-6 mr-16">
        <Flex>
          <Box>
            <Menu>
              <MenuButton>
                <Avatar
                  size="md"
                  background={'orange.200'}
                  name={username}
                  src="https://bit.ly/broken-link"
                />
              </MenuButton>
              <MenuList>
                <MenuItem justifyContent={'center'}>Trang cá nhân</MenuItem>
                <MenuItem justifyContent={'center'}>Chỉnh sửa thông tin</MenuItem>
                <MenuItem
                  justifyContent={'center'}
                  color="white"
                  className="hover:text-black"
                  background={'red.500'}
                  onClick={() => navigate('/admin/login')}
                >
                  Đăng xuất
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
          <Box marginLeft={'5'} color="white" marginTop="2" fontSize="xl">
            {username}
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
}
