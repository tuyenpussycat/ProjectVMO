import { Box } from '@chakra-ui/react';
import { useContext } from 'react';
import { AuthContext } from '../contexts/auth';
import { LayoutAdmin } from '../components/layouts/layoutAdmin';

export function HomeAdmin() {
  const { username } = useContext(AuthContext);

  return (
    <LayoutAdmin>
      <Box className="text-black font-semibold text-3xl flex justify-center mt-10">
        Welcome Admin {username}
      </Box>
    </LayoutAdmin>
  );
}
