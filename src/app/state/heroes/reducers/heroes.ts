import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { Hero } from "../../../core/models/hero.model";
import {
  ADD_HERO_SUCCESS, DELETE_HERO_SUCCESS, LOAD_HERO_SUCCESS, LOAD_HEROES_SUCCESS, HeroesAction, SELECT_HERO,
  UPDATE_HERO_SUCCESS,
  LOAD_HEROES,
  ADD_HERO_DIALOG_OPEN,
  ADD_HERO_DIALOG_CLOSE
} from "../actions/heroes";

export interface State extends EntityState<Hero> {
  addDialogShow: boolean;
  loading: boolean;
  selectedHeroId: number;
}

export const adapter: EntityAdapter<Hero> = createEntityAdapter();

const initialState: State = adapter.getInitialState({
  addDialogShow: false,
  loading: false,
  selectedHeroId: null
});

export function reducer(state: State = initialState, action: HeroesAction) {
  switch (action.type) {
    case ADD_HERO_DIALOG_OPEN:
      return {...state, addDialogShow: false};
    case ADD_HERO_DIALOG_CLOSE:
      return {...state, addDialogShow: true};
    case ADD_HERO_SUCCESS:
      return adapter.addOne(action.payload, state);
    case DELETE_HERO_SUCCESS:
      return adapter.removeOne(action.payload.id, state);
    case LOAD_HEROES:
      return {...state, loading: true};
    case LOAD_HEROES_SUCCESS:
      state = {...state, loading: false};
      return adapter.addAll(action.payload, state);
    case LOAD_HERO_SUCCESS:
      return adapter.addOne(action.payload, state);
    case SELECT_HERO:
      return { ...state, selectedHeroId: action.payload.id };
    case UPDATE_HERO_SUCCESS:
      return adapter.updateOne({
        id: action.payload.id,
        changes: action.payload
      }, state);
    default:
      return state;
  }
}

export const getSelectedHeroId = (state: State) => state.selectedHeroId;

export const isLoading = (state: State) => state.loading;