import { ICampaign } from './campaign'

export interface ICampaignsStore {
  currentCampaign: ICampaign,
  error: Error,
  loading: boolean,
}
