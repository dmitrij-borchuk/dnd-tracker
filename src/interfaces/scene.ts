export interface IRawScene {
  name: string
  description: string
  scenarioId: string
}

export interface IScene extends IRawScene {
  id: string
}
