import { EditIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  Heading,
  useToast,
  Input,
  FormLabel,
  ButtonGroup,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  FormControl,
  Select,
} from '@chakra-ui/react';
// import { Input } from 'postcss';
// import { Input } from '@mui/material';
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { LayoutAdmin, LayoutDashboard } from '../../../components';
import { cancelOrder, editOrder } from '../orders.mutation';
import { fetchOrderDetails } from '../orders.queries';
import { Order } from '../orders.types';
import { OrderStatusBadge } from './order-status-badge';
import { v4 as uuidv4 } from 'uuid';
// import { EditItem } from './inputEdit';
export function OrderEdit() {
  const params = useParams();
  const toast = useToast();
  const [order, setOrder] = useState<Order | any>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const [check, setCheck] = useState(false);
  const [title, setTittle] = useState('');
  const [description, setDescription] = useState('');
  const [classify, setClassify] = useState('');
  const [price, setPrice] = useState<any>();
  const [quantity, setQuantity] = useState<any>();
  const [status, setStatus] = useState('');
  const [file, setFile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  // const [id, setId] = useState();
  const handleChangeDescription = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  }, []);
  const handleChangeTitle = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setTittle(event.target.value);
  }, []);
  const handleChangeClassify = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setClassify(event.target.value);
  }, []);
  const handleChangeStatus = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value);
  }, []);
  const handleChangePrice = useCallback((event: ChangeEvent<any>) => {
    setPrice(event.target.value);
  }, []);

  const handleChangeQuantity = useCallback((event: ChangeEvent<any>) => {
    setQuantity(event.target.value);
  }, []);
  const [load, setLoad] = useState(false);

  const handleCreateOrder = useCallback(
    async (event: FormEvent<HTMLButtonElement>) => {
      try {
        event.preventDefault();
        setIsLoading(true);
        const orderPayload = {
          title: title,
          description: description,
          classify: classify,
          price: Number(price),
          quantity: Number(quantity),
          status: status,
          id: uuidv4(),
        };
        const res = await editOrder(params.id as string, orderPayload);
        if (res) {
          toast({
            position: 'top-right',
            description: 'Order edited',
            status: 'success',
            isClosable: true,
          });
          setCheck(!check);
          setLoad(!load);
        } else {
          setIsLoading(false);
          toast({
            position: 'top-right',
            description: 'Please try again',
            status: 'error',
            isClosable: true,
          });
        }
      } catch (error) {
        setIsLoading(false);
      }
    },
    [title, description, classify, price, quantity, status],
  );

  useEffect(() => {
    async function getOrderDetails() {
      const res = await fetchOrderDetails(params.id as string);
      if (res) {
        setOrder(res);
        localStorage.setItem('item', JSON.stringify(res));
        setTittle(res.title);
        setDescription(res.description);
        setClassify(res.classify);
        setPrice(res.price);
        setQuantity(res.quantity);
        setStatus(res.status);
      }
    }
    getOrderDetails();
  }, [params, isLoading]);
  const deleteItem = useCallback(async () => {
    {
      const data = await cancelOrder(params.id as string);
      if (data) {
        navigate('/login');
      }
    }
  }, [order, isLoading, load]);

  return (
    <LayoutAdmin>
      <Flex justifyContent={'space-between'} marginTop="5">
        <Heading ml="8" as="h1" size="md" mb="8" pb="3" borderBottom="2px" borderColor="gray.200">
          Order {order?._id}
        </Heading>
        <Box>
          {check ? (
            <Button
              className="hover:text-black"
              background="blue.500"
              color="white"
              marginRight={'5'}
              onClick={handleCreateOrder}
            >
              Lưu
            </Button>
          ) : (
            ''
          )}
          {check ? (
            <Button
              className="hover:text-black"
              background="blue.500"
              color="white"
              marginRight={'5'}
              onClick={() => setCheck(!check)}
            >
              Hủy
            </Button>
          ) : (
            <Button
              marginRight={'5'}
              color="white"
              className="hover:text-black"
              background="blue.500"
              onClick={() => setCheck(!check)}
            >
              Sửa
            </Button>
          )}

          <Button
            onClick={onOpen}
            marginRight={'16'}
            className="hover:text-black"
            background={'red.500'}
            color="white"
          >
            Xóa sản phẩm
          </Button>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Bạn chắc chắn muốn xóa sản phẩm này?</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Box className="text-center font-serif">{order?.title}</Box>
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
        </Box>
      </Flex>
      <Flex>
        <FormLabel ml="8" mr="8" htmlFor="file" className="shareOption">
          <Box>Change Photo or Video</Box>
          <Input
            className="ring-1"
            style={{ display: 'none' }}
            type="file"
            id="file"
            accept=".png,.jpeg,.jpg"
            onChange={(e: { target: { files: any[] } | any }) => setFile(e.target.files[0])}
          />
        </FormLabel>

        {check ? (
          <Box mt="4">
            <Flex>
              <Box mr="4" fontWeight="medium" minW="32">
                Tên sản phẩm:{' '}
              </Box>
              <Input className="ring-1" value={title} onChange={handleChangeTitle}></Input>
            </Flex>
            <Flex className="mt-[1rem]">
              <Box mr="4" fontWeight="medium" minW="32">
                Loại hàng:{' '}
              </Box>
              <Input className="ring-1" onChange={handleChangeClassify} value={classify}></Input>
            </Flex>

            <Flex className="mt-[1rem]">
              <Box mr="4" fontWeight="medium" minW="32">
                Chi tiết:{' '}
              </Box>
              <Input
                className="ring-1"
                onChange={handleChangeDescription}
                value={description}
              ></Input>
            </Flex>
            <Flex className="mt-[1rem]">
              <Box mr="4" fontWeight="medium" minW="32">
                Số lượng còn:{' '}
              </Box>
              <Input
                className="ring-1"
                type={'number'}
                onChange={handleChangeQuantity}
                value={quantity}
              ></Input>
            </Flex>
            <Flex className="mt-[1rem]">
              <Box mr="4" fontWeight="medium" minW="32">
                Giá sản phẩm:{' '}
              </Box>
              <Input
                className="ring-1"
                type={'number'}
                onChange={handleChangePrice}
                value={price}
              ></Input>
              <Box></Box>
            </Flex>
            <Flex className="mt-[1rem]">
              <Box>
                <FormControl>
                  <Flex>
                    <FormLabel width={'32'}>Đánh giá</FormLabel>
                    <Select
                      className="ring-1 ring-gray-300"
                      width={'60%'}
                      onChange={handleChangeStatus}
                      placeholder="Chọn chất lượng"
                      marginLeft={'4'}
                    >
                      <option value="ONE_STAR">1 Sao</option>
                      <option value="TWO_STAR">2 Sao</option>
                      <option value="THREE_STAR">3 Sao</option>
                      <option value="FOUR_STAR">4 Sao</option>
                      <option value="FIVE_STAR">5 Sao</option>
                    </Select>
                  </Flex>
                </FormControl>
                {/* <Input className='ring-1' onChange={handleChangeStatus} value={status}></Input> */}
              </Box>
            </Flex>
          </Box>
        ) : (
          <Box mt="4">
            <Flex className="mt-[1rem]">
              <Box mr="4" fontWeight="medium" minW="32">
                Tên sản phẩm:{' '}
              </Box>
              <Box>{title}</Box>
            </Flex>
            <Flex className="mt-[1rem]">
              <Box mr="4" fontWeight="medium" minW="32">
                Loại hàng:{' '}
              </Box>
              <Box>{classify}</Box>
            </Flex>
            <Flex className="mt-[1rem]">
              <Box mr="4" fontWeight="medium" minW="32">
                Chi tiết:{' '}
              </Box>
              <Box>{description}</Box>
            </Flex>
            <Flex className="mt-[1rem]">
              <Box mr="4" fontWeight="medium" minW="32">
                Số lượng còn:{' '}
              </Box>
              <Box>{quantity}</Box>
            </Flex>
            <Flex className="mt-[1rem]">
              <Box mr="4" fontWeight="medium" minW="32">
                Giá sản phẩm:{' '}
              </Box>
              <Box>{Number(price).toLocaleString('ms')}</Box>
            </Flex>
            <Flex className="mt-[1rem]">
              <Box mr="4" fontWeight="medium" minW="32">
                Đánh giá:{' '}
              </Box>
              <Box>
                <OrderStatusBadge status={order?.status} />
              </Box>
            </Flex>
          </Box>
        )}
      </Flex>
    </LayoutAdmin>
  );
}
