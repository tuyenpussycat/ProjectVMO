import { Button, HStack, Input, useNumberInput } from '@chakra-ui/react';
import { useContext } from 'react';
import { AuthContext } from '../../../contexts/auth';

export function HookUsage(maxQuantity: any) {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
    step: 1,
    defaultValue: 1,
    min: 1,
    max: maxQuantity.maxQuantity,
  });
  const { setGetNumber } = useContext(AuthContext);
  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();
  return (
    <HStack maxW="200px">
      <Button {...dec}>-</Button>
      <Input {...input} onBlur={(e: any) => setGetNumber(e.target.value)} />
      <Button {...inc}>+</Button>
    </HStack>
  );
}
