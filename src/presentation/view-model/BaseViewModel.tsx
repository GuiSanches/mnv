import BaseView from '../view/BaseView';

export default interface BaseViewModel {
  // baseView: BaseView
  attachView(baseView: BaseView): void;
  detachView(): void;
}