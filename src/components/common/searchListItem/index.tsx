import {ISearchedArticles, ITopStories} from '@models/APIModels';
import {Box, HStack, Image, Pressable, Text, VStack} from 'native-base';
import React, {memo} from 'react';
import isEqual from 'react-fast-compare';

interface SearchListItemProps {
  item: ISearchedArticles;
  index: number;
  onPress?: (index: number) => void;
}

const SearchListItemComp: React.FC<SearchListItemProps> = ({
  item,
  index,
  onPress,
}) => {
  return (
    <Pressable
      onPress={() => onPress && onPress(index)}
      rounded="8"
      overflow="hidden"
      shadow="3"
      bg="coolGray.200"
      marginY="1"
      marginX="2">
      <Box borderBottomWidth="0" pl={['2', '4']} pr="5" py="2">
        <HStack
          space={[2, 3]}
          justifyContent="space-between"
          alignItems={'center'}>
          {item.multimedia && item.multimedia.length > 0 && (
            <Image
              alt={`articleMedia${index}`}
              borderRadius={'10'}
              size="48px"
              source={{
                uri: 'https://static01.nyt.com/' + item.multimedia[0].url,
              }}
            />
          )}
          <VStack flex={1}>
            <Text numberOfLines={1} bold>
              {item.abstract}
            </Text>
            <Text numberOfLines={2} color="coolGray.600">
              {item.lead_paragraph}
            </Text>
          </VStack>
        </HStack>
      </Box>
    </Pressable>
  );
};

export const SearchListItem = memo(SearchListItemComp, isEqual);
