export interface IContainerToSave {
  id?: string
  name: string
  description: string
  parentId: string
}
export interface IContainer extends IContainerToSave {
  id: string
}
