import { ApiErrorResponse, CompanySearchType, PlatformSelectProp, Post, SearchTag } from '@/types';
import postForm, { type PostForm } from './post-form';
import editorOPtions, { type EditorOptionsType } from './editor';
import { PostTableStateType } from './post-table';
import postTable from './post-table';

export type StoreState = {
  posts: Post[];
  post: null | Post;
  platformSelectData: PlatformSelectProp[];
  searchTagsData: SearchTag[];
  searchCompaniesData: CompanySearchType[];
  postTable: PostTableStateType;
  postForm: PostForm;
  apiErrors: null | ApiErrorResponse;
  editor: EditorOptionsType;
};

const initialState: StoreState = {
  posts: [],
  post: null,
  searchTagsData: [],
  searchCompaniesData: [],
  platformSelectData: [],
  postTable,
  postForm,
  apiErrors: null,
  editor: editorOPtions
};

export { initialState };
