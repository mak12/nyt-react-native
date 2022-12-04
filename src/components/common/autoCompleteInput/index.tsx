import {
  Box,
  FlatList,
  HStack,
  Image,
  Input,
  Pressable,
  Text,
  VStack,
} from 'native-base';
import React, {memo, useState} from 'react';
import isEqual from 'react-fast-compare';

interface AutoCompleteProps {
  data: string[];
  onQuerySelected?: (value: string) => void;
}

const AutoCompleteComp: React.FC<AutoCompleteProps> = ({
  data,
  onQuerySelected,
}) => {
  const [showList, setShowList] = useState<boolean>(false);
  console.log('render list called');

  return (
    <Box>
      <Input
        variant="outline"
        autoFocus
        placeholder="Search here"
        onSubmitEditing={({nativeEvent}) => {
          setShowList(false);
          onQuerySelected && onQuerySelected(nativeEvent.text);
        }}
        onFocus={() => {
          setShowList(true);
        }}
        // onBlur={() => {
        //   setShowList(false);
        // }}
        fontSize="md"
        mb={5}
      />
      {showList && data.length > 0 && (
        <Box zIndex={999} bgColor={'white'} rounded="8" shadow="3" p={'5'}>
          <FlatList
            data={data}
            renderItem={({item, index}: {item: string; index: number}) => (
              <Pressable
                bgColor={'red'}
                onPress={() => {
                  setShowList(false);
                  onQuerySelected && onQuerySelected(item);
                }}>
                <Text flex={1} fontSize={'md'}>
                  {item}
                </Text>
              </Pressable>
            )}
            keyExtractor={(item, index) => `${index}`}
          />
        </Box>
      )}
    </Box>
  );
};

export const AutoComplete = memo(AutoCompleteComp, isEqual);
