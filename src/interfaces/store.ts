import { ICampaignsStore } from './campaignsStore'
import { IScenariosStore } from './scenariosStore'
import { IResourcesStore } from './resourcesStore'
import { IContainersStore } from './containersStore'
import { IAuthStore } from './authStore'

export interface IStore {
  campaigns: ICampaignsStore
  scenarios: IScenariosStore
  resources: IResourcesStore
  containers: IContainersStore
  auth: IAuthStore
}
