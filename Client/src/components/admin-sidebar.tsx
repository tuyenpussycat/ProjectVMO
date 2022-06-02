import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Box,
  Flex,
  Img,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { HamburgerIcon } from '@chakra-ui/icons';
import { useContext } from 'react';
import { AuthContext } from '../contexts/auth';
const activeLinkStyle = {
  color: 'white',
  backgroundColor: 'black',
};

export function AdminSidebar() {
  const navigate = useNavigate();
  const { username } = useContext(AuthContext);
  return (
    <Box width={'20%'} marginTop="-8">
      <Box width={'19rem'} height="100vw" className="fixed" background={'gray.500'}>
        <Box className=" p-6 shadow-sm">
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
          </Flex>
          <Flex justifyContent={'center'} color="white" marginTop="2" fontSize="xl">
            {username}
          </Flex>
        </Box>
        {/* <Link
          as={NavLink}
          to={`/admin`}
          _hover={{ textDecoration: 'none' }}
          _activeLink={activeLinkStyle}
        >
          <Box className="shadow-sm text-xl p-4 text-white"> HOME</Box>{' '}
        </Link> */}

        <Link
          _hover={{ textDecoration: 'none' }}
          _activeLink={activeLinkStyle}
          as={NavLink}
          to={`/admin/posts`}
        >
          {' '}
          <Flex className="hover:bg-gray-600 p-4 shadow-sm">
            <Img
              src="https://cdn-icons-png.flaticon.com/512/1524/1524539.png"
              width={'7'}
              height="7"
            ></Img>

            <Box className="ml-6 text-lg hover:text-white">Quản lý sản phẩm</Box>
          </Flex>
        </Link>
        <Link
          _hover={{ textDecoration: 'none' }}
          _activeLink={activeLinkStyle}
          as={NavLink}
          to={`/admin/category`}
        >
          {' '}
          <Flex className="hover:bg-gray-600 p-4 shadow-sm">
            <Img
              src="https://cdn-icons-png.flaticon.com/512/7479/7479956.png"
              width={'7'}
              height="7"
            ></Img>

            <Box className="ml-6 text-lg hover:text-white">Quản lý danh mục</Box>
          </Flex>
        </Link>
        <Link
          _hover={{ textDecoration: 'none' }}
          _activeLink={activeLinkStyle}
          as={NavLink}
          to={`/admin/payment`}
        >
          {' '}
          <Flex className="hover:bg-gray-600 p-4 shadow-sm">
            <Img
              src="https://cdn-icons-png.flaticon.com/512/1611/1611154.png"
              width={'7'}
              height="7"
            ></Img>

            <Box className="ml-6 text-lg hover:text-white">Quản lý đơn hàng</Box>
          </Flex>
        </Link>
      </Box>
    </Box>
  );
}
