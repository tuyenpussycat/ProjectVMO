import { ArrowForwardIcon, ChevronDownIcon, Search2Icon } from '@chakra-ui/icons';
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Flex,
  Image,
  Img,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from 'react-use-cart';
import { AuthContext } from '../contexts/auth';

import { fetchOrders } from '../modules/orders/orders.queries';

export function Header() {
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [name, setName] = useState('');
  const [keyword, setKeyword] = useState('');
  const { setValueSearch } = useContext(AuthContext);

  useEffect(() => {
    async function getOrders() {
      const data = await fetchOrders({ page });
      if (data) {
        setName(data.user[0].username);
      }
    }
    getOrders();
  }, [page]);
  const onChange = (e: any) => {
    setKeyword(e.target.value);
  };
  const getValue = (event: { key: string }) => {
    if (event.key === 'Enter') {
      setValueSearch(keyword);
    }
  };
  const handleClick = () => {
    setValueSearch(keyword);
  };
  return (
    <Box className="bg-gradient-to-t from-red-500 to-red-600 h-28 order-4 fixed p-4 w-[100%] ">
      <Flex className="w-[70%] ml-[15%]">
        <Box
          boxSize="5rem"
          width="13.5rem"
          className="cursor-pointer mt-[-24px]"
          onClick={() => navigate('/')}
          cursor="pointer"
          top="1.5"
        >
          <img
            src="https://scontent.fhan3-1.fna.fbcdn.net/v/t1.15752-9/278038101_5042028159211074_7734551805928419002_n.png?stp=dst-png_p1080x2048&_nc_cat=102&ccb=1-6&_nc_sid=ae9488&_nc_ohc=kJ24g3W8qZUAX9Ns69_&_nc_ht=scontent.fhan3-1.fna&oh=03_AVIxmpFN10AEI3Jlve4JaaQn6FY47EbIw69i-jMRR1mznA&oe=629E198E"
            alt="Logo-Barcal"
          />
        </Box>
        <div className="text-3xl text-white mx-5 mt-3 cursor-pointer" onClick={() => navigate('/')}>
          𝓣𝓨𝓝𝓣𝓨𝓝
        </div>

        <InputGroup left={'4'} top="0.8rem">
          <Input
            value={keyword}
            onChange={onChange}
            name="keyword"
            type="tel"
            placeholder="Tìm Kiếm Sản Phẩm"
            onKeyUp={getValue}
            background="white"
          />
          <InputRightElement
            children={
              <Search2Icon
                cursor="pointer"
                width={'10'}
                marginRight="2"
                height={'7'}
                background={'red'}
                color="white"
                padding={'5px'}
                onClick={handleClick}
              />
            }
          />
        </InputGroup>
        <Flex width={'400px'} marginRight="1rem" justifyContent={'end'}>
          <div className="text-white px-3 pt-[1.3rem] text-center font-serif">{name}</div>
          <Menu>
            <MenuButton marginTop={'2'}>
              <Avatar
                size="sm"
                background={'orange.200'}
                name={name}
                src="https://bit.ly/broken-link"
              />
            </MenuButton>
            <MenuList marginTop={'-4'}>
              <MenuItem justifyContent={'center'}>Trang cá nhân</MenuItem>
              <MenuItem justifyContent={'center'}>Chỉnh sửa thông tin</MenuItem>
              <MenuItem
                justifyContent={'center'}
                color="white"
                className="hover:text-black"
                background={'red.500'}
                onClick={() => navigate('/login')}
              >
                Đăng xuất
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        <Box className="mt-4" cursor={'pointer'} onClick={() => navigate('/cart')}>
          <Box color="white">
            <ShoppingCartOutlinedIcon></ShoppingCartOutlinedIcon>
          </Box>
        </Box>
        <Box
          background={'white'}
          className="flex justify-center rounded-[50%] text-red h-6 px-2 "
          marginTop={'2'}
        >
          {totalItems}
        </Box>
      </Flex>
    </Box>
  );
}
