import React, {memo, useEffect, useMemo, useState} from 'react';
import {ViewStyle, StyleSheet, ImageSourcePropType} from 'react-native';
import {colors} from '@themes/colors';

import {APP_SCREEN, RootStackParamList} from '@utilities/types';
import {useNavigation} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {dispatch} from '@common/redux';
import {AtuhActions} from '@redux/reducer/AuthSlice';
import isEqual from 'react-fast-compare';
import {
  Box,
  Center,
  FlatList,
  HStack,
  Image,
  VStack,
  Text,
  Spacer,
  Button,
  Heading,
  AspectRatio,
  Avatar,
  Pressable,
} from 'native-base';
import {fetchArticles} from '@redux/reducer/ArticlesSlice';
import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {ITopStories} from '@models/APIModels';
import {ArticlesTypes} from '@utilities/constants';
import {Loader} from '@common/Loader';
import {images} from '@assets/images';
interface Styles {
  main: ViewStyle;
}

type ArticleDetailProps = NativeStackScreenProps<
  RootStackParamList,
  APP_SCREEN.ARTICLE_DETAILS
>;
type ArticleDetailNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  APP_SCREEN.ARTICLE_DETAILS
>;

const RenderImageAndCaption = ({
  imageUrl,
  caption,
}: {
  imageUrl: string;
  caption: string;
}) => {
  return (
    <VStack>
      <AspectRatio
        ratio={{
          base: 16 / 10,
          //   md: 9 / 10,
        }}>
        <Image
          mt={'5'}
          alt={`articleDetailMedia`}
          borderRadius={'10'}
          source={{
            uri: imageUrl,
          }}
        />
      </AspectRatio>
      <Text mt={'2'} color={'gray.500'}>
        {caption}
      </Text>
    </VStack>
  );
};
const RenderAuthorInfo = ({
  avatarUrl,
  authorName,
}: {
  avatarUrl: ImageSourcePropType;
  authorName: string;
}) => {
  return (
    <HStack mt={'3'} alignItems={'center'}>
      <Avatar size="48px" source={avatarUrl} />
      <Text mx={'2'}>{authorName}</Text>
    </HStack>
  );
};

const ArticleDetailComp: React.FC<ArticleDetailProps> = ({route}) => {
  const {articleIndex} = route.params;
  const navigation = useNavigation<ArticleDetailNavigationProps>();
  const dispatch = useAppDispatch();
  const {topStories} = useAppSelector(x => x.articles);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const articleData = useMemo(() => {
    return topStories.data && topStories.data[articleIndex];
  }, [articleIndex]);
  useEffect(() => {}, []);
  return (
    <>
      <Box px={'2'} style={{flex: 1}} safeArea>
        <Pressable onPress={() => navigation.goBack()}>
          <Image
            p={'2'}
            my={'5'}
            alt={`backArrow`}
            source={images.icLeftArrow}
          />
        </Pressable>
        <VStack>
          <Heading mt={'2'} size={'xl'}>
            {articleData?.title}
          </Heading>
          <Text mt={'1'} italic fontSize={'lg'}>
            {articleData?.abstract}
          </Text>
          {articleData?.multimedia && (
            <RenderImageAndCaption
              imageUrl={articleData?.multimedia[0].url}
              caption={articleData?.multimedia[0].caption}
            />
          )}
          {articleData?.byline !== '' && (
            <RenderAuthorInfo
              avatarUrl={images.icAvatarPlaceholder}
              authorName={articleData?.byline ?? ''}
            />
          )}
          {articleData?.published_date && (
            <Text>
              {new Date(articleData?.published_date).toLocaleString()}
            </Text>
          )}
        </VStack>
      </Box>
    </>
  );
};

const styles = StyleSheet.create<Styles>({
  main: {flex: 1, backgroundColor: colors.white},
});

export const ArticleDetailScreen = memo(ArticleDetailComp, isEqual);
