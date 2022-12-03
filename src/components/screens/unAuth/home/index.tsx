import React, {memo, useEffect, useMemo, useState} from 'react';
import {ViewStyle, StyleSheet} from 'react-native';
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
  Pressable,
} from 'native-base';
import {fetchArticles} from '@redux/reducer/ArticlesSlice';
import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {ITopStories} from '@models/APIModels';
import {ArticlesTypes} from '@utilities/constants';
import {Loader} from '@common/Loader';
import {ArticleListItem} from '@common/articleListItem';

interface Styles {
  main: ViewStyle;
}

type HomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  APP_SCREEN.HOME
>;
type HomeScreenNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  APP_SCREEN.HOME
>;
const HomeScreenComp: React.FC<HomeScreenProps> = () => {
  const navigation = useNavigation<HomeScreenNavigationProps>();
  const dispatch = useAppDispatch();
  const {topStories, selectedCategory, loading} = useAppSelector(
    x => x.articles,
  );
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const articlesData = useMemo(() => {
    return topStories.data;
  }, [topStories]);
  const isSceinceCat = selectedCategory === ArticlesTypes.science;
  const fetchArticlesByCat = (cat: string) => {
    dispatch(fetchArticles(cat));
  };
  useEffect(() => {
    if (!articlesData?.length) fetchArticlesByCat(ArticlesTypes.science);
  }, []);
  return (
    <Box style={{flex: 1}} safeArea>
      <HStack justifyContent={'space-around'} mb={5}>
        <Button
          onPress={() => fetchArticlesByCat(ArticlesTypes.science)}
          variant={isSceinceCat ? 'solid' : 'ghost'}>
          <Text textTransform={'capitalize'}>{ArticlesTypes.science}</Text>
        </Button>
        <Button
          onPress={() => fetchArticlesByCat(ArticlesTypes.world)}
          variant={!isSceinceCat ? 'solid' : 'ghost'}>
          <Text textTransform={'capitalize'}>{ArticlesTypes.world}</Text>
        </Button>
      </HStack>
      <FlatList
        data={articlesData ?? []}
        ListEmptyComponent={() => (
          <Box>
            <Center>
              <Text>No articles found</Text>
            </Center>
          </Box>
        )}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({item, index}: {item: ITopStories; index: number}) => (
          <ArticleListItem
            index={index}
            item={item}
            key={`articleListItem${index}`}
            onPress={index => {
              navigation.navigate(APP_SCREEN.ARTICLE_DETAILS, {
                articleIndex: index,
              });
            }}
          />
        )}
        // onEndReached={() => {
        //   setLoadingMore(true);
        // }}
        // ListFooterComponent={() => {
        //   return (
        //     <Center>
        //       <Text>Loading More...!!</Text>
        //     </Center>
        //   );
        // }}
      />
      <Loader isLoading={loading} />
    </Box>
  );
};

const styles = StyleSheet.create<Styles>({
  main: {flex: 1, backgroundColor: colors.white},
});

export const HomeScreen = memo(HomeScreenComp, isEqual);
