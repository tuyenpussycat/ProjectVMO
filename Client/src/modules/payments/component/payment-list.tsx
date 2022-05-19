import {
  Box,
  Button,
  Heading,
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
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import { useContext, useState, useCallback, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/auth';
import { ListResponse } from 'src/modules/shared/common.types';
import { LayoutAdmin } from '../../../components/layouts/layoutAdmin';
import { fetchPayments } from '../payment.queries';
import { Payment } from '../payment.types';
import { deletePayment } from '../payment.mutations';
export function PaymentListAdmin() {
  const navigate = useNavigate();
  const { changeData } = useContext(AuthContext);
  const [payment, setPayment] = useState<ListResponse<Payment> | undefined>();
  useEffect(() => {
    async function getPayment() {
      const data = await fetchPayments();
      if (data) {
        setPayment(data);
      }
    }
    getPayment();
  }, [changeData]);

  return (
    <LayoutAdmin>
      <Heading
        ml={'10'}
        as="h1"
        size="lg"
        mb="4"
        mt="9"
        pb="3"
        borderBottom="2px"
        borderColor="gray.200"
        textColor={'purple.500'}
      >
        QUẢN LÝ ĐƠN HÀNG
      </Heading>

      <Box mt="4">
        <Table
          borderX={'1px'}
          borderBottom={'2px'}
          width={'90%'}
          marginLeft="5%"
          variant="simple"
          size={'lg'}
        >
          <Thead className=" h-3 bg-gray-600">
            <Tr>
              <Th textAlign="center" color={'white'}>
                Đơn hàng
              </Th>
              <Th textAlign="center" color={'white'}>
                Số lượng
              </Th>
              <Th textAlign="center" color={'white'}>
                Địa chỉ
              </Th>
              <Th textAlign="center" color={'white'}>
                Số điện thoại
              </Th>
              <Th color={'white'} textAlign="center">
                Tổng giá tiền
              </Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {payment?.map((o) => (
              <PaymentListManage key={o._id} payment={o} />
            ))}
          </Tbody>
        </Table>
      </Box>
    </LayoutAdmin>
  );
}

type PaymentListProps = {
  payment: Payment;
};
export function PaymentListManage({ payment }: PaymentListProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setChangeData } = useContext(AuthContext);
  const { changeData } = useContext(AuthContext);
  const deleteItem = useCallback(async () => {
    {
      const data = await deletePayment(payment._id as string);
      if (data) {
        setChangeData(!changeData);
      }
    }
  }, [payment]);
  return (
    <Tr>
      <Td textAlign="center">{payment.name.toString()}</Td>
      <Td textAlign="center">{payment.quantity.toString()}</Td>
      <Td textAlign="center">{payment.address}</Td>
      <Td textAlign="center">{payment.numberPhone}</Td>
      <Td textAlign="center">{Number(payment.total).toLocaleString('ms')}</Td>

      <Td padding={'0'} textAlign="center">
        <Button mt={'3.5'} onClick={onOpen} marginLeft={'5'} background={'red.500'} color="white">
          Xóa
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Bạn chắc chắn muốn xóa sản phẩm này?</ModalHeader>
            <ModalCloseButton />
            <ModalBody></ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Hủy
              </Button>
              <Button background={'red.500'} color="white" onClick={deleteItem} variant="ghost">
                Xóa
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Td>
    </Tr>
  );
}
