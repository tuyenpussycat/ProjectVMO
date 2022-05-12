import { Box, Flex, Image } from '@chakra-ui/react';

export function Footer() {
  return (
    <Box className="bg-white h-[auto] order-4 p-4">
      <Flex className="w-[70%] ml-[15%] justify-between">
        <Box>
          <Box className="font-semibold mb-3">VỀ CHÚNG TÔI</Box>
          <ul>
            <li>Trung Tâm Trợ Giúp</li>
          </ul>
        </Box>
        <Box>
          <Box className="font-semibold mb-3">CHĂM SÓC KHÁCH HÀNG</Box>
          <ul>
            <li>Liên Hệ TynTyn</li>
          </ul>
        </Box>
        <Box>
          <Box className="font-semibold mb-3">THANH TOÁN</Box>
          <ul>
            <li>
              <Flex>
                <Image
                  width={'24'}
                  src="https://cdn-icons-png.flaticon.com/512/196/196578.png"
                ></Image>
              </Flex>
            </li>
          </ul>
        </Box>
        <Box>
          <Box className="font-semibold mb-3">THEO DÕI CHÚNG TÔI TRÊN</Box>
          <ul>
            <li>
              <Flex marginTop="3">
                <Image
                  width={'24px'}
                  src="https://cdn-icons-png.flaticon.com/512/174/174848.png"
                  marginRight={'4'}
                ></Image>
                Facebook
              </Flex>
            </li>
            <li>
              <Flex marginTop="3">
                <Image
                  width={'24px'}
                  src="https://cdn-icons-png.flaticon.com/512/174/174855.png"
                  marginRight={'4'}
                ></Image>
                Instagram
              </Flex>
            </li>
            <li>
              <Flex marginTop="3">
                <Image
                  width={'24px'}
                  src="https://cdn-icons-png.flaticon.com/512/906/906377.png"
                  marginRight={'4'}
                ></Image>
                Telegram
              </Flex>
            </li>
          </ul>
        </Box>
      </Flex>
    </Box>
  );
}
