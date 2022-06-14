import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { useState, useCallback, ChangeEvent, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { createCategory } from '../category.mutation';
import { LayoutAdmin } from '../../../components/layouts/layout-admin';
import { InvertColorsOff } from '@mui/icons-material';

export function AdminCategoryCreate() {
  const reader = new FileReader();
  const navigate = useNavigate();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [file, setFile] = useState<any>(null);
  const [preview, setPreview] = useState<any>(null);
  const handleChangeName = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    setName(event.target.value);
  }, []);
  const handleClear = useCallback(() => {
    setName('');
    setFile('');
  }, []);
  const handleCreateOrder = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      try {
        event.preventDefault();
        setIsLoading(true);
        const categoryPayload = {
          name: name,
        };
        const res = await createCategory(categoryPayload, file);
        if (res) {
          toast({
            position: 'top-right',
            description: 'Category created',
            status: 'success',
            isClosable: true,
          });
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
    [name],
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
        mt={'5'}
        ml="32"
        size="md"
        mb="5"
        pb="3"
        borderBottom="2px"
        borderColor="gray.200"
        color={'black'}
      >
        TẠO LOẠI HÀNG MỚI
      </Heading>

      <Box paddingX={'32'} paddingY="4" className="shadow-sm bg-white">
        <form action="" onSubmit={handleCreateOrder}>
          <FormControl isRequired>
            <Flex>
              <FormLabel>Tên sản phẩm</FormLabel>
            </Flex>
            <Textarea
              className="ring-1 ring-gray-300"
              value={name}
              height="5"
              onChange={handleChangeName}
            />
          </FormControl>
          <FormControl mt={5}>
            <FormLabel>Chọn ảnh</FormLabel>
            <input
              className="outline-none"
              type={'file'}
              name="img"
              accept=".png,.jpeg,.jpg"
              onChange={(e: { target: { files: any[] } | any }) => setFile(e.target.files[0])}
            ></input>
            <img className="my-4" width={'20%'} src={preview}></img>
          </FormControl>
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
              Tạo sản phẩm
            </Button>
          </Flex>
        </form>
      </Box>
    </LayoutAdmin>
  );
}
