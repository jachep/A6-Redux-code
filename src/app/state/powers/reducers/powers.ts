import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { Power } from "../../../core/models/power.model";
import  * as PowerActions from "../actions/powers";

export interface State extends EntityState<Power> {
  addDialogShow: boolean;
  loading: boolean;
  selectedPowerId: number;
}

export const adapter: EntityAdapter<Power> = createEntityAdapter();

const initialState: State = adapter.getInitialState({
  addDialogShow: false,
  loading: false,
  selectedPowerId: null
});

export function reducer(state: State = initialState, action: PowerActions.PowersAction) {
  switch (action.type) {
    case PowerActions.ADD_POWER_DIALOG_CLOSE:
      return {...state, addDialogShow: false};
    case PowerActions.ADD_POWER_DIALOG_OPEN:
      return {...state, addDialogShow: true};
    case PowerActions.ADD_POWER_SUCCESS:
      return adapter.addOne(action.payload, state);
    case PowerActions.DELETE_POWER_SUCCESS:
      return adapter.removeOne(action.payload.id, state);
    case PowerActions.LOAD_POWER_SUCCESS:
      return adapter.addOne(action.payload, state);
    case PowerActions.LOAD_POWERS:
      return {...state, loading: true};
    case PowerActions.LOAD_POWERS_SUCCESS:
      state = {...state, loading: false};
      return adapter.addAll(action.payload, state);
    case PowerActions.SELECT_POWER:
      return {...state, selectedPowerId: action.payload.id};
    case PowerActions.UPDATE_POWER_SUCCESS:
      return adapter.updateOne({
        id: action.payload.id,
        changes: action.payload
      }, state);
    default:
      return state;
  }
}

export const getSelectedPowerId = (state: State) => state.selectedPowerId;

export const isLoading = (state: State) => state.loading;
