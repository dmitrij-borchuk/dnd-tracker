import { IScenario } from "./scenario";

export interface IScenariosStore {
  loading: boolean
  list: IScenario[]
  error: Error
}
