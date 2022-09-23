import BaseViewModel from "./BaseViewModel";

export default interface BaseModalModel extends BaseViewModel {
  isKeep: boolean;
  onModalClick(): void;
}