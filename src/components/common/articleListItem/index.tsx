import {ITopStories} from '@models/APIModels';
import {Box, HStack, Image, Pressable, Text, VStack} from 'native-base';
import React, {memo} from 'react';
import isEqual from 'react-fast-compare';

interface ArticleListItemProps {
  item: ITopStories;
  index: number;
  onPress?: (index: number) => void;
}

const ArticleListItemComp: React.FC<ArticleListItemProps> = ({
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
          {item.multimedia && (
            <Image
              alt={`articleMedia${index}`}
              borderRadius={'10'}
              size="48px"
              fallbackSource={{uri: item.multimedia[0].url}}
              source={{
                uri: item.multimedia.find(
                  item => item.format === 'Large Thumbnail',
                )?.url,
              }}
            />
          )}
          <VStack flex={1}>
            <Text numberOfLines={1} bold>
              {item.title}
            </Text>
            <Text numberOfLines={2} color="coolGray.600">
              {item.abstract}
            </Text>
          </VStack>
        </HStack>
      </Box>
    </Pressable>
  );
};

export const ArticleListItem = memo(ArticleListItemComp, isEqual);
