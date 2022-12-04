import {ITopStories, ITopStoriesResponse} from '@models/APIModels';
import {SLICE_NAME} from '@models/generalTypes';
import {store} from '@redux/store';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {APP_URLS, ArticlesTypes} from '@utilities/constants';
import {APIError, APIResponse, APIStatus} from '@utilities/types';
import {getExceptionPayload} from '@utilities/utils';
import API from '../../lib/API';

interface AppState {
  topStories: APIResponse<ITopStories[]>;
  selectedCategory: string;
  searchedArticlesHistory: string[];
  loading: boolean;
}

const initialAppState: AppState = {
  topStories: {
    status: APIStatus.IDLE,
  },
  loading: false,
  searchedArticlesHistory: [],
  selectedCategory: ArticlesTypes.science,
};

export const fetchArticles = createAsyncThunk(
  'nyt/fetchArticles',
  async (category: string, thunkAPI) => {
    console.log('category ', category);
    const {rejectWithValue} = thunkAPI;
    try {
      const response = await API.get<ITopStoriesResponse>(
        `${APP_URLS.TOP_STORIES}${category}.json?api-key=${
          store.getState().auth.apiKey
        }`,
      ); //here you fetch data with catgeories
      return await response.data;
    } catch (error) {
      return rejectWithValue(getExceptionPayload(error));
    }
  },
);

export const searchArticles = createAsyncThunk(
  'nyt/searchArticles',
  async (searchQuerry: string, thunkAPI) => {
    console.log('category ', searchQuerry);
    const {rejectWithValue} = thunkAPI;
    try {
      const response = await API.get<ITopStoriesResponse>(
        `${APP_URLS.SEACRH_ARTICLES}${searchQuerry}&api-key=${
          store.getState().auth.apiKey
        }`,
      ); //here you fetch data with catgeories
      console.log('search res ', response.data);
      return await response.data;
    } catch (error) {
      return rejectWithValue(getExceptionPayload(error));
    }
  },
);
const articlesSlice = createSlice({
  name: SLICE_NAME.NYT_POSTS,
  initialState: initialAppState,
  reducers: {
    onSetArticleQuerry: (state, {payload}: PayloadAction<string>) => {
      let arr = [...state.searchedArticlesHistory];
      arr.unshift(payload);
      arr.length = 5;
      state.searchedArticlesHistory = [...arr];
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchArticles.pending, state => {
      state.topStories.status = APIStatus.PENDING;
      state.loading = true;
    }),
      builder.addCase(fetchArticles.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.topStories.data = payload.results.filter(item => {
          return item.title !== '' && item.abstract !== '';
        });
        state.selectedCategory = payload.section.toLowerCase();
        state.topStories.status = APIStatus.FULFILLED;
      });
    builder.addCase(fetchArticles.rejected, (state, {payload}) => {
      state.loading = false;
      state.topStories.error = payload as APIError;
      state.topStories.status = APIStatus.FULFILLED;
    });
  },
});

export const ArticlesReducer = articlesSlice.reducer;

export const ArticlesAction = {
  ...articlesSlice.actions,
};
