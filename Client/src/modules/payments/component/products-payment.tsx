import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  Tbody,
  Td,
  Textarea,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { FormEvent, useCallback, useState } from 'react';
import { useNavigate } from 'react-router';
import { useCart } from 'react-use-cart';
import { LayoutDashboard } from '../../../components/layouts/layout-dashboard';
import { createPayment } from '../payment.mutations';

export function OrderPayment() {
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const { items, totalItems, cartTotal, emptyCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [check, setCheck] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const Navigate = useNavigate();
  const handleCreatePayment = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      try {
        event.preventDefault();
        setIsLoading(true);
        const paymentPayload = {
          address: address,
          numberPhone: phoneNumber,
          name: items.map((e) => e.title),
          quantity: items.map((e) => e.quantity),
          total: cartTotal,
        };
        const res = await createPayment(paymentPayload);
        if (res) {
          setCheck(true);
          setIsLoading(false);
          setAddress('');
          setPhoneNumber('');
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
      }
    },
    [address, phoneNumber],
  );

  return (
    <LayoutDashboard>
      <Modal
        isOpen={check}
        onClose={() => {
          setCheck(false);
        }}
      >
        <ModalOverlay />
        <ModalContent marginTop={'15rem'}>
          <ModalHeader>Sản phẩm đã đặt</ModalHeader>
          <ModalCloseButton
            onClick={() => {
              setCheck(false);
              emptyCart();
              Navigate(`/`);
            }}
          />
          <ModalBody>
            <Table variant="simple" size={'lg'}>
              <Thead className="bg-red-500 text-white h-10">
                <Tr>
                  <Th color={'white'}>Tên sản phẩm</Th>
                  <Th color={'white'}> Giá sản phẩm</Th>
                  <Th color={'white'}>Số lượng</Th>
                </Tr>
              </Thead>
              <Tbody className="bg-white h-10">
                {items.map((item) => (
                  <Tr>
                    <Td className="font-semibold">{item.title}</Td>
                    <Td className="font-semibold">{Number(item.price).toLocaleString('ms')}</Td>
                    <Td>{item.quantity}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            <Flex marginTop={'1rem'} justifyContent={'space-between'}>
              <Box className="font-bold text-xl">Thanh tiền :</Box>
              <Box className="font-bold text-xl">{Number(cartTotal).toLocaleString('ms')} VNĐ</Box>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                setCheck(false);
                emptyCart();
                Navigate(`/`);
              }}
            >
              OK
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <form action="" onSubmit={handleCreatePayment}>
        <Box
          marginTop={'6rem'}
          className="text-black font-semibold text-3xl mt-10 bg-white shadow-sm"
        >
          <FormControl mt={'3'} isRequired paddingBottom={'4'}>
            <FormLabel className=" text-red-600 ml-4">Số điện thoại người nhận hàng</FormLabel>
            <Input
              type={'number'}
              value={phoneNumber}
              width={'40%'}
              ml="5%"
              className="ring-1 p-4 ring-gray-300"
              onChange={(e: any) => setPhoneNumber(e.target.value)}
            />
            <FormErrorMessage>Số điện thoại không được để trống</FormErrorMessage>
          </FormControl>
          <FormControl mt={'3'} isRequired paddingBottom={'4'}>
            <FormLabel className="text-red-600 ml-4">Địa chỉ nhận hàng</FormLabel>
            <Textarea
              value={address}
              width={'90%'}
              ml="5%"
              className="ring-1 p-4 ring-gray-300
            "
              onChange={(e) => setAddress(e.target.value)}
            />
            <FormErrorMessage>Địa chỉ nhận hàng không được để trống</FormErrorMessage>
          </FormControl>
        </Box>
        <FormControl>
          <Flex marginTop={'1rem'}>
            <Table variant="simple" size={'lg'}>
              <Thead className="bg-red-500 text-white h-10">
                <Tr>
                  <Th></Th>
                  <Th color={'white'}>Tên sản phẩm</Th>
                  <Th color={'white'}> Giá sản phẩm</Th>
                  <Th color={'white'}>Số lượng</Th>
                </Tr>
              </Thead>
              <Tbody className="bg-white h-10">
                {items.map((item) => (
                  <Tr>
                    <Td width={'15%'}>
                      <img src={item.img}></img>
                    </Td>
                    <Td className="font-semibold">{item.title}</Td>
                    <Td className="font-bold">{Number(item.price).toLocaleString('ms')}</Td>
                    <Td>{item.quantity}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Flex>
        </FormControl>
        <FormControl>
          <Box width={'100%'} height="14rem" className="shadow-sm  bg-white p-8">
            <Box className="flex text-2xl font-semibold" mb={'5'}>
              Tổng sản phẩm:
            </Box>
            <Box className="mb-5 font-medium">Tổng sản phẩm : ({totalItems})</Box>
            <Box className=" text-2xl font-semibold">
              Thành tiền : {Number(cartTotal).toLocaleString('ms')} VNĐ
            </Box>
            <Flex justifyContent={'end'}>
              <Button
                className="hover:text-black"
                backgroundColor={'blue.500'}
                color="white"
                marginRight="5"
                type="submit"
                isLoading={isLoading}
              >
                Đặt hàng
              </Button>
            </Flex>
          </Box>
        </FormControl>
      </form>
    </LayoutDashboard>
  );
}
