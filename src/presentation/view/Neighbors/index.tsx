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
  const title = "Enable/Disable interaction";
  const label = "Neighbors";
  
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
    setChecked(false);
    setNeighborViewModel(viewModel);

    return () => {
      viewModel.destroyListener();
    };
  }, [networkHolder, update]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    try {
      neighborViewModel?.onSwitchSelected();
      setChecked(e.currentTarget.checked);
    } catch (e: any) {
      alert(e.message);
    }
  };

  return (
    <>
      <Title>{title}</Title>
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
          <CustomControlLabel htmlFor="neighbors">{label}</CustomControlLabel>
        </CheckboxWrapper>
      </InputGroup>
    </>
  );
};

export default NeighborsComponent;
