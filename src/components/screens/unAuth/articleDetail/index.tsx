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
} from 'native-base';
import {fetchArticles} from '@redux/reducer/ArticlesSlice';
import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {ITopStories} from '@models/APIModels';
import {ArticlesTypes} from '@utilities/constants';
import {Loader} from '@common/Loader';

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
const ArticleDetailComp: React.FC<ArticleDetailProps> = ({route}) => {
  const {articleIndex} = route.params;
  const navigation = useNavigation<ArticleDetailNavigationProps>();
  const dispatch = useAppDispatch();
  const {topStories, selectedCategory, loading} = useAppSelector(
    x => x.articles,
  );
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const articleData = useMemo(() => {
    return topStories.data && topStories.data[articleIndex];
  }, [articleIndex]);
  const isSceinceCat = selectedCategory === ArticlesTypes.science;
  const fetchArticlesByCat = (cat: string) => {
    dispatch(fetchArticles(cat));
  };
  useEffect(() => {}, []);
  return (
    <Box style={{flex: 1}} safeArea>
      <Loader isLoading={loading} />
    </Box>
  );
};

const styles = StyleSheet.create<Styles>({
  main: {flex: 1, backgroundColor: colors.white},
});

export const ArticleDetailScreen = memo(ArticleDetailComp, isEqual);
