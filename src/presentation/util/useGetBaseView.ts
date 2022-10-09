import { useMemo, useState } from "react";
import BaseViewModel from "../view-model/BaseViewModel";
import BaseView from "../view/BaseView";

/**
 * BaseView hook for updates listeners
 */
const useBaseView = <T extends BaseViewModel>(
  viewModel?: T
): [boolean, BaseView] => {
  const [update, setUpdate] = useState<boolean>(false);

  const baseView: BaseView = useMemo(() => {
    const view = {
      onViewModelChanged: () => {
        setUpdate(!update);
      },
    };

    if (viewModel) {
      viewModel.detachView();
      viewModel.attachView(view);
    }

    return view;
  }, [viewModel, update]);

  return [update, baseView];
};

export default useBaseView;
