import {
  Box,
  Button,
  Flex,
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
import { useCallback, useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ListResponse } from '../../shared/common.types';
import { LayoutAdmin, LayoutDashboard, Pagination } from '../../../components';
import { fetchOrders } from '../orders.queries';
import { Order } from '../orders.types';
import { OrderStatusBadge } from './order-status-badge';
import { cancelOrder } from '../orders.mutation';
import { AuthContext } from '../../../contexts/auth';
export function OrderManage() {
  const navigate = useNavigate();
  const { setChangeData } = useContext(AuthContext);
  const { changeData } = useContext(AuthContext);
  const [orders, setOrders] = useState<ListResponse<Order> | undefined>();
  const [limitPage, setLimitPage] = useState(1);
  const [page, setPage] = useState(1);
  const [currPage, setCurrPage] = useState(1);
  const clickPrev = useCallback(() => setPage((p) => p - 1), []);
  const clickNext = useCallback(() => setPage((p) => p + 1), []);

  useEffect(() => {
    async function getOrders() {
      const data = await fetchOrders({ page });
      if (data) {
        setOrders(data);
        setCurrPage(data.page);
        setLimitPage(data.pageLimit);
      }
    }
    getOrders();
  }, [page, changeData]);

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
        QUẢN LÝ SẢN PHẨM
      </Heading>

      <Box ml={'10'} right="8" top="10">
        <Button colorScheme="purple" size="md" onClick={() => navigate('/admin/posts/create')}>
          Thêm sản phẩm
        </Button>
      </Box>

      <Box mt="4">
        <Table
          borderX="1px"
          borderBottom={'2px'}
          width="94%"
          mx="auto"
          variant="simple"
          size={'lg'}
        >
          <Thead className="w-10 h-10 bg-gray-600">
            <Tr>
              <Th color={'white'}>Ảnh</Th>
              <Th color={'white'}>Tên sản phẩm</Th>
              <Th color={'white'}>Giá sản phẩm</Th>
              <Th color={'white'}>Số lượng</Th>
              <Th color={'white'}>Đánh giá</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {orders?.posts.map((o) => (
              <OrderListRowManage key={o._id} order={o} />
            ))}
          </Tbody>
        </Table>
        <Flex mt="8" justifyContent="center">
          <Pagination
            onPrev={clickPrev}
            onNext={clickNext}
            limit={1}
            page={currPage}
            pageCount={limitPage}
            totalCount={1}
          />
        </Flex>
      </Box>
    </LayoutAdmin>
  );
}

type OrderListRowProps = {
  order: Order;
};
export function OrderListRowManage({ order }: OrderListRowProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setChangeData } = useContext(AuthContext);
  const { changeData } = useContext(AuthContext);
  const deleteItem = useCallback(async () => {
    {
      const data = await cancelOrder(order._id as string);
      if (data) {
        setChangeData(!changeData);
      }
    }
  }, [order]);

  return (
    <Tr>
      <Td>Ảnh</Td>
      <Td>
        <Link as={NavLink} to={`/posts/${order._id}`} textColor="blue.800">
          {order.title}
        </Link>
      </Td>
      <Td className="text-left">{Number(order.price).toLocaleString('ms')}</Td>
      <Td>{order.quantity}</Td>
      <Td>
        <OrderStatusBadge status={order.status} />
      </Td>
      <Td padding={'0'}>
        <Button mt={'3.5'} background={'green.500'}>
          <Link
            as={NavLink}
            to={`/admin/edit/${order._id}`}
            textColor="white"
            className="hover:text-black"
          >
            Sửa
          </Link>
        </Button>

        <Button mt={'3.5'} onClick={onOpen} marginLeft={'5'} background={'red.500'} color="white">
          Xóa
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Bạn chắc chắn muốn xóa sản phẩm này?</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box className="text-center font-serif">{order.title}</Box>
            </ModalBody>

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
