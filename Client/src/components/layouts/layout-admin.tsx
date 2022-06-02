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

import { HeaderAdmin } from '../header-admin';
import { NavLink } from 'react-router-dom';
import { HamburgerIcon } from '@chakra-ui/icons';
import { AdminSidebar } from '../admin-sidebar';

const activeLinkStyle = {
  color: 'white',
  backgroundColor: 'black',
};

export function LayoutAdmin({ children }: { children: ReactNode }) {
  return (
    <Box w="100%" className="m-[auto] bg-[#f7f7f7]">
      <Box height={'32'}>
        <HeaderAdmin></HeaderAdmin>
      </Box>
      <Flex>
        <Box width={'20%'}>
          <AdminSidebar></AdminSidebar>
        </Box>
        <Box width={'100%'} backgroundColor="gray.50">
          {children}
        </Box>
      </Flex>
    </Box>
  );
}
