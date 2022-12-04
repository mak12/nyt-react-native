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
import {
  ArticlesAction,
  fetchArticles,
  searchArticles,
} from '@redux/reducer/ArticlesSlice';
import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {
  ISearchedArticles,
  ISearchedArticlesResponse,
  ITopStories,
} from '@models/APIModels';
import {APP_URLS, ArticlesTypes} from '@utilities/constants';
import {Loader} from '@common/Loader';
import {images} from '@assets/images';
import {AutoComplete} from '@common/autoCompleteInput';
import API from '@lib/API';
import {getExceptionPayload} from '@utilities/utils';
import {SearchListItem} from '@common/searchListItem';
interface Styles {
  main: ViewStyle;
}

type SearchArticlesProps = NativeStackScreenProps<
  RootStackParamList,
  APP_SCREEN.SEARCH_ARTICLES
>;
type SearchArticlesNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  APP_SCREEN.SEARCH_ARTICLES
>;

const SearchArticlesComp: React.FC<SearchArticlesProps> = ({route}) => {
  const navigation = useNavigation<SearchArticlesNavigationProps>();
  const dispatch = useAppDispatch();
  const {searchedArticlesHistory} = useAppSelector(x => x.articles);
  const {apiKey} = useAppSelector(x => x.auth);
  const [searchedArticlesData, setSearchedArticlesData] = useState<
    ISearchedArticles[]
  >([]);
  const [querryString, setQuerryString] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {}, []);

  const fetchArticlesByQuerry = async (querry: string, pageNumber: number) => {
    setLoading(true);
    try {
      const response = await API.get<ISearchedArticlesResponse>(
        `${APP_URLS.SEACRH_ARTICLES}${querry}&page=${pageNumber}&api-key=${apiKey}`,
      );
      setLoading(false);
      setSearchedArticlesData(data => [
        ...data,
        ...response.data.response.docs,
      ]);
    } catch (error) {
      setLoading(false);
      //   return getExceptionPayload(error);
    }
  };

  const dispatchQuerry = async (querry: string) => {
    dispatch(ArticlesAction.onSetArticleQuerry(querry));
  };
  return (
    <>
      <Box px={'2'} py={'3'} style={{flex: 1}} safeArea>
        <VStack flex={1}>
          <AutoComplete
            data={searchedArticlesHistory}
            onQuerySelected={querry => {
              fetchArticlesByQuerry(querry, currentPage);
              dispatchQuerry(querry);
            }}
          />
          <FlatList
            data={searchedArticlesData ?? []}
            keyExtractor={(item, index) => `${index}`}
            renderItem={({
              item,
              index,
            }: {
              item: ISearchedArticles;
              index: number;
            }) => (
              <SearchListItem
                index={index}
                item={item}
                key={`searchList${index}`}
              />
            )}
            scrollEventThrottle={250}
            onEndReachedThreshold={0.01}
            onEndReached={() => {
              if (!loading && currentPage <= 9) {
                let page = currentPage + 1;
                setCurrentPage(page);
                const lastQuerry = searchedArticlesHistory[0];
                fetchArticlesByQuerry(lastQuerry, page);
              }
            }}
            // ListFooterComponent={() => {
            //   return loadingMore ? (
            //     <Center>
            //       <Text>Loading More...!!</Text>
            //     </Center>
            //   ) : null;
            // }}
          />
        </VStack>
        <Loader isLoading={loading} />
      </Box>
    </>
  );
};

const styles = StyleSheet.create<Styles>({
  main: {flex: 1, backgroundColor: colors.white},
});

export const SearchArticlesScreen = memo(SearchArticlesComp, isEqual);
