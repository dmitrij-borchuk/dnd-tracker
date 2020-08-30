import { ICampaignsStore } from './campaignsStore'
import { IScenariosStore } from './scenariosStore'
import { IResourcesStore } from './resourcesStore'
import { IContainersStore } from './containersStore'
import { ILinkedResourcesStore } from './linkedResourcesStore'
import { IAuthStore } from './authStore'
import { IPointsStore } from './pointsStore'

export interface IStore {
  campaigns: ICampaignsStore
  scenarios: IScenariosStore
  resources: IResourcesStore
  containers: IContainersStore
  linkedResources: ILinkedResourcesStore
  auth: IAuthStore
  points: IPointsStore
}
