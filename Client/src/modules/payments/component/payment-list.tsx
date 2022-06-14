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
import { LayoutAdmin } from '../../../components/layouts/layout-admin';
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
        my="4"
        pb="3"
        borderBottom="2px"
        borderColor="gray.200"
        textColor={'black'}
      >
        QUẢN LÝ ĐƠN HÀNG
      </Heading>

      <Box mt="4">
        <Table
          borderX={'1px'}
          borderBottom={'2px'}
          width={'90%'}
          marginX="auto"
          variant="simple"
          size={'lg'}
        >
          <Thead className=" h-3 bg-gray-600">
            <Tr>
              <Th color={'white'}>Đơn hàng</Th>
              <Th color={'white'}>Số lượng</Th>
              <Th color={'white'}>Địa chỉ</Th>
              <Th color={'white'}>Số điện thoại</Th>
              <Th color={'white'}>Tổng giá tiền</Th>
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
      <Td>{payment.name.toString()}</Td>
      <Td>{payment.quantity.toString()}</Td>
      <Td>{payment.address}</Td>
      <Td>{payment.numberPhone}</Td>
      <Td>{Number(payment.total).toLocaleString('ms')}</Td>

      <Td padding={'0'}>
        <Button mt={'3.5'} onClick={onOpen} marginLeft={'5'} background={'red.500'} color="white">
          Xóa
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent marginTop={'32'}>
            <ModalHeader>Bạn chắc chắn muốn xóa sản phẩm này?</ModalHeader>
            <ModalCloseButton />
            <ModalBody></ModalBody>
            <ModalFooter>
              <Button colorScheme="green" mr={3} onClick={onClose}>
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
