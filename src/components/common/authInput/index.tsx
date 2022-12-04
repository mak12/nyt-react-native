import {Input, Text, VStack} from 'native-base';
import {
  IInputComponentType,
  InterfaceInputProps,
} from 'native-base/lib/typescript/components/primitives/Input/types';
import React, {memo} from 'react';
import isEqual from 'react-fast-compare';

interface AuthInputProps extends InterfaceInputProps {
  error: string | undefined;
}

const AuthInputComp: React.FC<AuthInputProps> = props => {
  const {error, ...rest} = props;
  return (
    <VStack>
      {error ? (
        <Text mb={'2'} fontSize="sm" color={'red.400'}>
          {error}
        </Text>
      ) : null}
      <Input {...rest} />
    </VStack>
  );
};

export const AuthInput = memo(AuthInputComp, isEqual);
