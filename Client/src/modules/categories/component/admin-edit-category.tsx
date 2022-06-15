import {
  Box,
  Button,
  Flex,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useState, useCallback, ChangeEvent, FormEvent, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { LayoutAdmin } from '../../../components/layouts/layout-admin';
import { deleteCategory, editCategory } from '../category.mutation';
import { fetchCategoryDetails } from '../category.queries';
import { editOrder, cancelOrder } from '../../orders/products.mutation';
import { Order } from '../../orders/products.types';
import DeleteIcon from '@mui/icons-material/Delete';
import BuildIcon from '@mui/icons-material/Build';
export function AdminCategoryEdit() {
  const params = useParams();
  const toast = useToast();
  const [order, setOrder] = useState<Order | any>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const [check, setCheck] = useState(false);
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [img, setImg] = useState('');
  // const [id, setId] = useState();

  const handleChangeName = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  }, []);
  const [load, setLoad] = useState(false);
  const handleCreateOrder = useCallback(
    async (event: FormEvent<HTMLButtonElement>) => {
      try {
        event.preventDefault();
        setIsLoading(true);
        const categoryPayload = {
          name: name,
        };
        const res = await editCategory(params.id as string, categoryPayload);
        if (res) {
          toast({
            position: 'top-right',
            description: 'Category edited',
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
    [name],
  );

  useEffect(() => {
    async function getCategoryDetail() {
      const res = await fetchCategoryDetails(params.id as string);
      if (res) {
        setOrder(res);
        setName(res.name);
        setImg(res.img);
      }
    }
    getCategoryDetail();
  }, [params, isLoading]);
  const deleteItem = useCallback(async () => {
    {
      const data = await deleteCategory(params.id as string);
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
              <BuildIcon></BuildIcon> <Box ml={'2'}>Sửa</Box>
            </Button>
          )}

          <Button
            onClick={onOpen}
            marginRight={'16'}
            className="hover:text-black"
            background={'red.500'}
            color="white"
          >
            <DeleteIcon />
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
                <Button colorScheme="green" mr={3} onClick={onClose}>
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
        <Box className="w-[24rem] ml-8">
          <img width={'100%'} src={img}></img>
        </Box>

        {check ? (
          <Box mt="5">
            <Flex>
              <Box ml="5" mt="3" mr="4" fontWeight="medium" minW="32">
                Tên loại hàng:{' '}
              </Box>
              <Input className="ring-1" value={name} onChange={handleChangeName}></Input>
            </Flex>
          </Box>
        ) : (
          <Box ml="5" mt="4">
            <Flex className="mt-[1rem]">
              <Box mr="3" fontWeight="medium">
                Tên loại hàng:{' '}
              </Box>
              <Box className="font-semibold text-lg">{name}</Box>
            </Flex>
          </Box>
        )}
      </Flex>
    </LayoutAdmin>
  );
}
