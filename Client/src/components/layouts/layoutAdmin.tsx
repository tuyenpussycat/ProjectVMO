import { Box, Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { HeaderAdmin } from '../headerAdmin';
import { NavLink } from 'react-router-dom';
export function LayoutAdmin({ children }: { children: ReactNode }) {
  return (
    <Box w="100%" className="m-[auto] bg-[#f7f7f7]">
      <HeaderAdmin></HeaderAdmin>
      <Flex>
        <Box>
          <Box width={'19rem'} height="100vw" background={'gray.500'}>
            <ul>
              <Link as={NavLink} to={`/admin`}>
                <li className="shadow-sm text-xl p-4 text-white bg-gray-800 hover:bg-gray-500">
                  {' '}
                  Danh sách quản lý
                </li>{' '}
              </Link>
              <Link as={NavLink} to={`/admin/posts`}>
                {' '}
                <li className="shadow-sm text-lg p-4 hover:bg-gray-300 ">Quản lý sản phẩm</li>
              </Link>
              <Link as={NavLink} to={`/admin/category`}>
                <li className=" shadow-sm text-lg p-4 hover:bg-gray-300">Quản lý loại hàng</li>
              </Link>
              <li className=" shadow-sm text-lg p-4 hover:bg-gray-300">Quản lý đơn hàng</li>
            </ul>
          </Box>
        </Box>
        <Box width={'100%'} backgroundColor="gray.50">
          {children}
        </Box>
      </Flex>
    </Box>
  );
}
