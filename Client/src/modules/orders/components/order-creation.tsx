import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react';
import * as yup from 'yup';
import { useNavigate } from 'react-router';
import { LayoutAdmin, LayoutDashboard } from '../../../components';
import { createOrder } from '../orders.mutation';
import { Item } from '../orders.types';
import { v4 as uuidv4 } from 'uuid';
import { fetchCategory } from '../category.queries';
import { Category } from '../category.types';
import { ListResponse } from 'src/modules/shared/common.types';
// const shippingsSchema = yup.string().required('Shipping address is required.');
type FormItem = Item & {
  id: string;
};

// const EMPTY_ITEM = createEmptyItem();

export function OrderCreation() {
  const navigate = useNavigate();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTittle] = useState('');
  const [description, setDescription] = useState('');
  const [classify, setClassify] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [status, setStatus] = useState('');
  const [file, setFile] = useState<any>(null);
  const [category, setCategory] = useState<ListResponse<Category> | undefined>();
  useEffect(() => {
    async function getCategory() {
      const data = await fetchCategory();
      if (data) {
        setCategory(data);
      }
    }
    getCategory();
  }, [isLoading]);

  // const [id, setId] = useState();
  const handleChangeDescription = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  }, []);
  const handleChangeTitle = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    setTittle(event.target.value);
  }, []);
  const handleChangeClassify = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    setClassify(event.target.value);
  }, []);
  const handleChangeStatus = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value);
  }, []);
  const handleChangePrice = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setPrice(event.target.value);
  }, []);

  const handleChangeQuantity = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setQuantity(event.target.value);
  }, []);
  const handleClear = useCallback(() => {
    setTittle('');
    setClassify('');
    setPrice('');
    setQuantity('');
    setDescription('');
  }, []);
  const handleCreateOrder = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
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
        const res = await createOrder(orderPayload, file);
        if (res) {
          toast({
            position: 'top-right',
            description: 'Order created',
            status: 'success',
            isClosable: true,
          });
          setTittle('');
          setClassify('');
          setPrice('');
          setQuantity('');
          setDescription('');
          setIsLoading(false);
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
  return (
    <LayoutAdmin>
      <Heading
        as="h1"
        mt={'5'}
        ml="5"
        size="md"
        mb="5"
        pb="3"
        borderBottom="2px"
        borderColor="gray.200"
        color={'purple.500'}
      >
        TẠO SẢN PHẨM MỚI
      </Heading>

      <Box paddingX={'32'} paddingY="4" className="shadow-sm bg-white">
        <form action="" onSubmit={handleCreateOrder}>
          <FormControl>
            <FormLabel>Chọn ảnh</FormLabel>
            <input
              className="outline-none"
              type={'file'}
              name="img"
              accept=".png,.jpeg,.jpg"
              onChange={(e: { target: { files: any[] } | any }) => setFile(e.target.files[0])}
            ></input>
          </FormControl>
          <Box mb="6">
            <FormControl isRequired>
              <Flex>
                <FormLabel>Tên sản phẩm</FormLabel>
              </Flex>
              <Textarea
                className="ring-1 ring-gray-300"
                value={title}
                height="5"
                onChange={handleChangeTitle}
              />
            </FormControl>
            <Flex>
              <FormControl isRequired>
                <Flex>
                  <FormLabel>Loại sản phẩm</FormLabel>
                </Flex>
                <Select
                  className="ring-1 ring-gray-300"
                  width={'50%'}
                  onChange={handleChangeClassify}
                  placeholder="Chọn loại hàng"
                >
                  {category?.map((o) => (
                    <option key={o._id} value={o.name}>
                      {o.name}
                    </option>
                  ))}
                  {/* <option value="Chocolate">Chocolate</option>
                  <option value="Crisps">Crisps</option>
                  <option value="Chicken">Chicken</option>
                  <option value="Cheese">Cheese</option>
                  <option value="Drinks">Drinks</option>
                  <option value="Other">Other</option> */}
                </Select>
              </FormControl>
              <FormControl>
                <Flex>
                  <FormLabel>Đánh giá</FormLabel>
                </Flex>
                <Select
                  className="ring-1 ring-gray-300"
                  width={'50%'}
                  onChange={handleChangeStatus}
                  placeholder="Chọn chất lượng"
                >
                  <option value="ONE_STAR">1 Sao</option>
                  <option value="TWO_STAR">2 Sao</option>
                  <option value="THREE_STAR">3 Sao</option>
                  <option value="FOUR_STAR">4 Sao</option>
                  <option value="FIVE_STAR">5 Sao</option>
                </Select>
              </FormControl>
            </Flex>
            <FormControl mt={'3'} isRequired>
              <FormLabel>Chi tiết sản phẩm</FormLabel>
              <Textarea
                className="ring-1 ring-gray-300"
                value={description}
                onChange={handleChangeDescription}
              />
              <FormErrorMessage>Chi tiết sản phẩm không được để trống</FormErrorMessage>
            </FormControl>
            <Flex>
              <FormControl mr="4">
                <FormLabel>Giá</FormLabel>
                <Input
                  className="ring-1 ring-gray-300"
                  type={'number'}
                  value={price}
                  onChange={handleChangePrice}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Số lượng</FormLabel>
                <Input
                  className="ring-1 ring-gray-300"
                  type={'number'}
                  value={quantity}
                  onChange={handleChangeQuantity}
                />
              </FormControl>
            </Flex>
            <Divider my="6" />
          </Box>
          <Flex mt="4" justifyContent="flex-end">
            <Button
              onClick={handleClear}
              className="mr-5 hover:text-black"
              background={'red.500'}
              color="white"
            >
              Làm mới{' '}
            </Button>
            <Button colorScheme="blue" type="submit" isLoading={isLoading}>
              Create
            </Button>
          </Flex>
        </form>
      </Box>
    </LayoutAdmin>
  );
}
