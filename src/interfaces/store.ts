import { ICampaignsStore } from './campaignsStore';
import { IScenariosStore } from './scenariosStore';
import { IResourcesStore } from './resourcesStore';

export interface IStore {
  campaigns: ICampaignsStore
  scenarios: IScenariosStore
  resources: IResourcesStore
}
