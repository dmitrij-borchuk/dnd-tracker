import { Dispatch } from "redux"

export const mapDispatchToActions = (dispatch: Dispatch<any>, actions: Function[]) => {
  return actions.map((action) => (...args: any[]) => dispatch(action(...args)))
}
