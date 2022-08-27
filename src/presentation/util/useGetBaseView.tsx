import { useMemo, useState } from "react";
import NetworkHolder from "../../domain/entity/Network/models/NetworkHolder";
import BaseViewModel from "../view-model/BaseViewModel";
import BaseView from "../view/BaseView";

const useBaseView = <T extends BaseViewModel>(
  networkHolder: NetworkHolder,
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
  }, [update, networkHolder]);

  return [update, baseView];
};

export default useBaseView;
