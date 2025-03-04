import { IContext } from 'overmind';
import {
  createStateHook,
  createActionsHook,
  createEffectsHook,
  createReactionHook
} from 'overmind-react';
import { initialState } from './state';
import * as actions from './actions';
import * as effects from './effects';

export const config = {
  state: initialState,
  actions,
  effects
};

export type Context = IContext<typeof config>;
export const useAppState = createStateHook<Context>();
export const useActions = createActionsHook<Context>();
export const useEffects = createEffectsHook<Context>();
export const useReaction = createReactionHook<Context>();
