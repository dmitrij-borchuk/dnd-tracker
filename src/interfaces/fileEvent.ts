export interface IFileEvent {
  target: {
    files: string[]
  }
}
export interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}
