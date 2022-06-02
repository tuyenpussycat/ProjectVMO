import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Input,
  InputGroup,
  InputRightElement,
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
// import { ListResponse } from '../../shared/common.types';
import { LayoutAdmin, LayoutDashboard, Pagination } from '../../../components';
import { fetchOrders } from '../products.queries';
import { Order } from '../products.types';
import { OrderStatusBadge } from './product-status-badge';
import { cancelOrder } from '../products.mutation';
import { AuthContext } from '../../../contexts/auth';
import { Search2Icon } from '@chakra-ui/icons';
import { getValue } from '@testing-library/user-event/dist/utils';
export function OrderManage() {
  const navigate = useNavigate();
  const { setChangeData } = useContext(AuthContext);
  const { changeData } = useContext(AuthContext);
  const [orders, setOrders] = useState<any>();
  const [limitPage, setLimitPage] = useState(1);
  const [page, setPage] = useState(1);
  const [currPage, setCurrPage] = useState(1);
  const clickPrev = useCallback(() => setPage((p) => p - 1), []);
  const clickNext = useCallback(() => setPage((p) => p + 1), []);
  const { setValueSearch } = useContext(AuthContext);
  const { valueSearch } = useContext(AuthContext);
  const [keyword, setKeyword] = useState('');
  const [load, setLoad] = useState(false);
  useEffect(() => {
    async function getOrders() {
      const data = await fetchOrders({ page, valueSearch });
      if (data) {
        setLoad(true);
        setOrders(data);
        setCurrPage(data.page);
        setLimitPage(data.pageLimit);
      }
    }
    getOrders();
  }, [page, changeData, valueSearch]);

  const onChange = (e: any) => {
    setKeyword(e.target.value);
  };
  const getValue = (event: { key: string }) => {
    if (event.key === 'Enter') {
      setValueSearch(keyword);
    }
  };
  const handleClick = () => {
    setValueSearch(keyword);
  };

  return (
    <LayoutAdmin>
      <Flex justifyContent={'space-between'}>
        <Box className="ml-40">
          <Button colorScheme="green" size="md" onClick={() => navigate('/admin/posts/create')}>
            Thêm sản phẩm
          </Button>
        </Box>
        <InputGroup width={'30%'} marginRight="11%" left={'3'}>
          <Input
            className="ring-2"
            value={keyword}
            onChange={onChange}
            name="keyword"
            type="tel"
            placeholder="Tìm Kiếm Sản Phẩm"
            onKeyUp={getValue}
            background="white"
          />
          <InputRightElement
            children={
              <Search2Icon
                cursor="pointer"
                width={'10'}
                marginRight="2"
                height={'7'}
                background={'red'}
                color="white"
                padding={'5px'}
                onClick={handleClick}
              />
            }
          />
        </InputGroup>
      </Flex>

      <Box mt="8">
        <Table
          borderX="1px"
          borderBottom={'2px'}
          width="80%"
          mx="auto"
          variant="simple"
          size={'lg'}
        >
          <Thead className="w-10 h-10 bg-gray-600">
            <Tr>
              <Th color={'white'}></Th>
              <Th textAlign="center" color={'white'}>
                Tên sản phẩm
              </Th>
              <Th textAlign="center" color={'white'}>
                Giá sản phẩm
              </Th>
              <Th textAlign="center" color={'white'}>
                Số lượng
              </Th>
              <Th textAlign="center" color={'white'}>
                Đánh giá
              </Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {load === false ? (
              <Box className="mx-[auto]">
                <Image
                  width={'10'}
                  className="object-cover rounded-md"
                  src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif?20170503175831"
                ></Image>
              </Box>
            ) : (
              orders?.posts.map((o: Order) => <OrderListRowManage key={o._id} order={o} />)
            )}
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
      <Td width={'15%'}>
        <img src={order.img} width="100%"></img>
      </Td>
      <Td className="text-xl" textAlign="center">
        {order.title}
      </Td>
      <Td className="text-xl" textAlign="center">
        {Number(order.price).toLocaleString('ms')}
      </Td>
      <Td textAlign="center">{order.quantity}</Td>
      <Td textAlign="center">
        <OrderStatusBadge status={order.status} />
      </Td>
      <Td padding={'0'}>
        <Button mt={'3.5'} background={'green.500'}>
          <Link
            _hover={{ textDecoration: 'none' }}
            as={NavLink}
            to={`/admin/edit/${order._id}`}
            textColor="white"
            className="hover:text-black"
          >
            Chi tiết
          </Link>
        </Button>

        <Button mt={'3.5'} onClick={onOpen} marginLeft={'5'} background={'red.500'} color="white">
          Xóa
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent marginTop={'32'}>
            <ModalHeader>Bạn chắc chắn muốn xóa sản phẩm này?</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box className="text-center font-serif">{order.title}</Box>
            </ModalBody>

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
