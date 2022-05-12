import { Box } from '@chakra-ui/react';
import { LayoutAdmin } from '../../../../components/layouts/layoutAdmin';

export function HomeAdmin() {
  return (
    <LayoutAdmin>
      <Box className="text-black font-semibold text-3xl flex justify-center mt-10">
        Welcome Admin
      </Box>
    </LayoutAdmin>
  );
}
