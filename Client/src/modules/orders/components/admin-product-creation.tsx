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
import { createOrder } from '../products.mutation';
import { Item } from '../products.types';
import { v4 as uuidv4 } from 'uuid';
import { fetchCategory } from '../../categories/category.queries';
import { Category } from '../../categories/category.types';
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
    // setClassify(null);
    setPrice('');
    setQuantity('');
    setDescription('');
    setFile('');
  }, []);
  const [preview, setPreview] = useState<any>(null);
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
            description: 'T???o s???n ph???m th??nh c??ng',
            status: 'success',
            isClosable: true,
          });
          setIsLoading(false);
          navigate(`/admin/edit/${res?.post._id}`);
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
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  }, [file]);
  return (
    <LayoutAdmin>
      <Heading
        as="h1"
        ml="5"
        size="md"
        my="10"
        pb="3"
        marginLeft={'32'}
        borderBottom="2px"
        borderColor="gray.200"
        color={'black'}
      >
        T???O S???N PH???M M???I
      </Heading>

      <Box paddingX={'32'} paddingY="4" className="shadow-lg w-[90%] mx-[auto] mt-10 bg-white">
        <form action="" onSubmit={handleCreateOrder}>
          <Box mb="6">
            <FormControl isRequired>
              <Flex>
                <FormLabel>T??n s???n ph???m</FormLabel>
              </Flex>
              <Textarea
                className="ring-1 ring-gray-300"
                value={title}
                height="5"
                onChange={handleChangeTitle}
              />
            </FormControl>
            <FormControl my={6}>
              <FormLabel>Ch???n ???nh</FormLabel>
              <input
                className="outline-none"
                type={'file'}
                name="img"
                accept=".png,.jpeg,.jpg"
                onChange={(e: { target: { files: any[] } | any }) => setFile(e.target.files[0])}
              ></input>
              <img className="my-4" width={'15%'} src={preview}></img>
            </FormControl>
            <Flex>
              <FormControl isRequired>
                <Flex>
                  <FormLabel>Lo???i s???n ph???m</FormLabel>
                </Flex>
                <Select
                  className="ring-1 ring-gray-300"
                  width={'50%'}
                  onChange={handleChangeClassify}
                  placeholder="Ch???n lo???i h??ng"
                >
                  {category?.map((o) => (
                    <option key={o._id} value={o.name}>
                      {o.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl>
                <Flex>
                  <FormLabel>????nh gi??</FormLabel>
                </Flex>
                <Select
                  className="ring-1 ring-gray-300"
                  width={'50%'}
                  onChange={handleChangeStatus}
                  placeholder="Ch???n ch???t l?????ng"
                >
                  <option value="ONE_STAR">1 Sao</option>
                  <option value="TWO_STAR">2 Sao</option>
                  <option value="THREE_STAR">3 Sao</option>
                  <option value="FOUR_STAR">4 Sao</option>
                  <option value="FIVE_STAR">5 Sao</option>
                </Select>
              </FormControl>
            </Flex>
            <FormControl my={6} isRequired>
              <FormLabel>Chi ti???t s???n ph???m</FormLabel>
              <Textarea
                className="ring-1 ring-gray-300"
                value={description}
                onChange={handleChangeDescription}
              />
              <FormErrorMessage>Chi ti???t s???n ph???m kh??ng ???????c ????? tr???ng</FormErrorMessage>
            </FormControl>
            <Flex>
              <FormControl mr="4">
                <FormLabel>Gi??</FormLabel>
                <input
                  className="ring-1 w-[90%] h-10 p-2 rounded ring-gray-300"
                  type={'number'}
                  min={1}
                  value={price}
                  onChange={handleChangePrice}
                />
              </FormControl>
              <FormControl>
                <FormLabel>S??? l?????ng</FormLabel>
                <input
                  className="ring-1 w-[90%] h-10 p-2 rounded ring-gray-300"
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
              L??m m???i{' '}
            </Button>
            <Button colorScheme="blue" type="submit" isLoading={isLoading}>
              T???o s???n ph???m
            </Button>
          </Flex>
        </form>
      </Box>
    </LayoutAdmin>
  );
}
