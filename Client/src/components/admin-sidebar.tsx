import {
  Avatar,
  Box,
  Button,
  Flex,
  Img,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/auth';
import CategoryIcon from '@mui/icons-material/Category';
import InventoryIcon from '@mui/icons-material/Inventory';
import PaymentsIcon from '@mui/icons-material/Payments';
import LogoutIcon from '@mui/icons-material/Logout';
const activeLinkStyle = {
  color: 'white',
  backgroundColor: 'rgb(55 65 81)',
};

export function AdminSidebar() {
  const navigate = useNavigate();
  const { username } = useContext(AuthContext);
  return (
    <Box width={'20%'}>
      <Box width={'20rem'} height="100vw" className="fixed" background={'black'}>
        <Box>
          <Flex justifyContent={'center'}>
            <Box className="text-2xl mt-8 text-white">TRANG </Box>
            <Box className="text-white text-2xl ml-3 opacity-70 mt-8">QUẢN LÝ</Box>
          </Flex>
        </Box>
        <Box className="text-white ml-12 mt-7 mb-9 opacity-50">MENU</Box>

        <Flex justifyContent={'center'} marginY="5">
          <Button
            padding={0}
            backgroundColor={'black'}
            color="whiteAlpha.700"
            className="hover:bg-red-600"
            _hover={{ color: 'white', backgroundColor: 'rgb(55 65 81)' }}
          >
            <Link
              paddingX={9}
              paddingY={4}
              _hover={{ textDecoration: 'none' }}
              as={NavLink}
              _activeLink={activeLinkStyle}
              className="rounded-xl"
              to={`/admin/posts`}
            >
              <Flex>
                <InventoryIcon width={'8'} height="8" className="mr-4"></InventoryIcon>
                <Box>Quản lý sản phẩm</Box>
              </Flex>
            </Link>
          </Button>
        </Flex>
        <Flex justifyContent={'center'} marginY="5">
          <Button
            padding={0}
            backgroundColor={'black'}
            color="whiteAlpha.700"
            className="hover:bg-red-600"
            _hover={{ color: 'white', backgroundColor: 'rgb(55 65 81)' }}
          >
            <Link
              paddingX={9}
              paddingY={4}
              _hover={{ textDecoration: 'none' }}
              as={NavLink}
              _activeLink={activeLinkStyle}
              className="rounded-xl"
              to={`/admin/category`}
            >
              <Flex>
                <CategoryIcon width={'8'} height="8" className="mr-4"></CategoryIcon>
                <Box>Quản lý danh mục</Box>
              </Flex>
            </Link>
          </Button>
        </Flex>
        <Flex justifyContent={'center'} marginY="5">
          <Button
            padding={0}
            backgroundColor={'black'}
            color="whiteAlpha.700"
            className="hover:bg-red-600"
            _hover={{ color: 'white', backgroundColor: 'rgb(55 65 81)' }}
          >
            <Link
              paddingX={9}
              paddingY={4}
              _hover={{ textDecoration: 'none' }}
              as={NavLink}
              _activeLink={activeLinkStyle}
              className="rounded-xl"
              to={`/admin/payment`}
            >
              <Flex>
                <PaymentsIcon width={'8'} height="8" className="mr-4"></PaymentsIcon>
                <Box>Quản lý đơn hàng</Box>
              </Flex>
            </Link>
          </Button>
        </Flex>
        <Box className="mt-[110%] shadow-sm">
          <Box className="text-white ml-12 my-3 opacity-50">PROFILE</Box>
          <Flex justifyContent={'center'}>
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
              </MenuList>
            </Menu>
          </Flex>
          <Flex
            className="text-white"
            justifyContent={'center'}
            color="white"
            marginTop="3"
            fontSize="xl"
          >
            {username}
          </Flex>
        </Box>
        <Flex
          justifyContent={'center'}
          className="cursor-pointer "
          mt="10"
          color={'white'}
          onClick={() => navigate('/admin/login')}
        >
          <LogoutIcon></LogoutIcon>
          <Box className="ml-3">Đăng xuất</Box>
        </Flex>
      </Box>
    </Box>
  );
}
