import { ChangeEvent, FC, useContext, useEffect, useState } from "react";
import {
  CheckboxWrapper,
  CustomControlCheckbox,
  CustomControlLabel,
  InputGroup,
  Line,
} from "../../../../styles/global";
import GetNodesNeighborsUseCase from "../../../domain/interactors/Network/Neighbors/GetNodesNeighborsUseCase";
import { NetworkCtx } from "../../util/NetworkCtx";
import useBaseView from "../../util/useGetBaseView";
import useGetNetworkFromQuery from "../../util/useGetNetworkFromQuery";
import NeighborsViewModel from "../../view-model/Neighbors/NeighborsViewModel";
import NeighborsViewModelImpl from "../../view-model/Neighbors/NeighborsViewModelImpl";
import { Title } from "../InfoNetwork/styles";

const NeighborsComponent: FC = () => {
  const [checked, setChecked] = useState<boolean>(false);
  const { networkHolders } = useContext(NetworkCtx);

  const networkHolder = useGetNetworkFromQuery(networkHolders);

  const [neighborViewModel, setNeighborViewModel] =
    useState<NeighborsViewModel>();
  const [update, baseView] = useBaseView<NeighborsViewModel>(neighborViewModel);

  useEffect(() => {
    const getNodesNeighborsUseCase: GetNodesNeighborsUseCase =
      new GetNodesNeighborsUseCase(networkHolder.getNetUI());

    const viewModel = new NeighborsViewModelImpl(
      networkHolder,
      getNodesNeighborsUseCase
    );

    viewModel.attachView(baseView);
    setNeighborViewModel(viewModel);

    return () => {
      viewModel.destroyListener();
    };
  }, [networkHolder, update]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChecked(e.currentTarget.checked);
    neighborViewModel?.onSwitchSelected();
  };

  return (
    <>
      <Title>Enable/Disable interaction</Title>
      <Line />

      <InputGroup>
        <CheckboxWrapper>
          <CustomControlCheckbox
            type="checkbox"
            id="neighbors"
            name="neighbors"
            checked={checked}
            onChange={handleChange}
          />
          <CustomControlLabel htmlFor="neighbors">Neighbors</CustomControlLabel>
        </CheckboxWrapper>
      </InputGroup>
    </>
  );
};

export default NeighborsComponent;
