import { Box, Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { Header } from '..';
import { Footer } from '..';
export function LayoutDashboard({ children }: { children: ReactNode }) {
  return (
    <Box w="100%" className="m-[auto] bg-[#f3f3f3]">
      <Header></Header>
      <Flex>
        <Box py="10" width={'70%'} className=" h-[auto] mx-[auto]">
          {children}
        </Box>
      </Flex>
      <Footer></Footer>
    </Box>
  );
}
