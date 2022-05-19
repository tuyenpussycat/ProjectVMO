import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Link,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

import { HeaderAdmin } from '../headerAdmin';
import { NavLink } from 'react-router-dom';
import { HamburgerIcon } from '@chakra-ui/icons';

const activeLinkStyle = {
  color: 'white',
  backgroundColor: 'black',
};

export function LayoutAdmin({ children }: { children: ReactNode }) {
  return (
    <Box w="100%" className="m-[auto] bg-[#f7f7f7]">
      <HeaderAdmin></HeaderAdmin>
      <Flex>
        <Box>
          <Box width={'19rem'} height="100vw" background={'gray.500'}>
            <Link
              as={NavLink}
              to={`/admin`}
              _hover={{ textDecoration: 'none' }}
              _activeLink={activeLinkStyle}
            >
              <Box className="shadow-sm text-xl p-4 text-whit"> HOME</Box>{' '}
            </Link>
            <Accordion>
              <AccordionItem>
                <h2>
                  <AccordionButton _expanded={{ bg: 'black', padding: '18px', color: 'white' }}>
                    <Box flex="1" textAlign="left">
                      <HamburgerIcon className="mr-2 mt-[-4px]"> </HamburgerIcon>DANH SÁCH QUẢN LÝ
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel padding={'0'}>
                  <Link
                    _hover={{ textDecoration: 'none' }}
                    _activeLink={activeLinkStyle}
                    as={NavLink}
                    to={`/admin/posts`}
                  >
                    {' '}
                    <Box className="shadow-sm text-lg p-4 hover:bg-gray-600 hover:text-white">
                      Quản lý sản phẩm
                    </Box>
                  </Link>
                  <Link
                    _hover={{ textDecoration: 'none' }}
                    _activeLink={activeLinkStyle}
                    as={NavLink}
                    to={`/admin/category`}
                  >
                    <Box className=" shadow-sm text-lg p-4 hover:bg-gray-600">Quản lý danh mục</Box>
                  </Link>
                  <Link
                    _hover={{ textDecoration: 'none' }}
                    _activeLink={activeLinkStyle}
                    as={NavLink}
                    to={`/admin/payment`}
                  >
                    <Box className=" shadow-sm text-lg p-4 hover:bg-gray-600">Quản lý đơn hàng</Box>
                  </Link>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Box>
        </Box>
        <Box width={'100%'} backgroundColor="gray.50">
          {children}
        </Box>
      </Flex>
    </Box>
  );
}
