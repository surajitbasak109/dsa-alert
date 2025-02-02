import { Context } from '@/store';
import postFormAction from './post-form';
import postAction from './post';
import postTableAction from './post-table';

const setIsEditorReady = ({ state }: Context, isReady: boolean) => {
  state.editor.isEditorReady = isReady;
};

const clearApiErrors = ({ state }: Context) => {
  state.apiErrors = null;
};

export {
  setIsEditorReady,
  clearApiErrors,
  postAction,
  postFormAction,
  postTableAction
};
