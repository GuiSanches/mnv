import {
  ChangeEvent,
  FC,
  MouseEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import { Container, Input, Select, Submit } from "./styles";
import {
  Line,
  Label,
  InputGroupPrepend,
  InputGroupText,
} from "../../../../../styles/global";
import { ClipLoader } from "react-spinners";
import { NetworkCtx } from "../../../util/NetworkCtx";
import LoadDefaultNetworkChildUseCase from "../../../../domain/interactors/Network/LoadingNetwork/LoadDefaultNetworkChildUseCase";
import NetworkHolder from "../../../../domain/entity/Network/models/NetworkHolder";
import LoadNetworkChildViewModelImpl from "../../../view-model/LoadChild/LoadNetworkChildViewModelImpl";
import LoadNetworkChildViewModel from "../../../view-model/LoadChild/LoadNetworkChildViewModel";
import useBaseView from "../../../util/useGetBaseView";

interface Props {
  networkHolder: NetworkHolder;
  options: string[];
}

const DefaultChildNetwork: FC<Props> = ({ networkHolder, options }) => {
  const title = `Default child (Select the same as parent)`;
  const label = `Load a network:`;

  const { networkHolders, setNetworkHolders, networkRepository } =
    useContext(NetworkCtx);

  const [loadNetworkChildViewModel, setLoadNetworkChildViewModel] =
    useState<LoadNetworkChildViewModel>();

  const [, baseView] = useBaseView<LoadNetworkChildViewModel>(
    loadNetworkChildViewModel
  );

  const [selectedValue, setSelectedValue] = useState("-1");

  useEffect(() => {
    const loadNetworksChildUseCase: LoadDefaultNetworkChildUseCase =
      new LoadDefaultNetworkChildUseCase(networkRepository, networkHolder);

    const viewModel = new LoadNetworkChildViewModelImpl(
      loadNetworksChildUseCase
    );

    setLoadNetworkChildViewModel(viewModel);
  }, [networkHolder]);

  useEffect(() => {
    if (loadNetworkChildViewModel) {
      loadNetworkChildViewModel.attachView(baseView);
    }
  });

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(e.target.value);
  };

  const handleSubmit = async (e: MouseEvent<HTMLInputElement>) => {
    e.preventDefault();

    const newNet = await loadNetworkChildViewModel?.onLoadDefaultNetwork(
      selectedValue
    );
    if (newNet && setNetworkHolders) {
      setNetworkHolders([...networkHolders, newNet]);
      newNet.onNetworkChanged();
    }
  };

  return (
    <Container>
      <Label>{title}</Label>
      <Line />
      <InputGroupPrepend>
        <InputGroupText className="span-125">{label}</InputGroupText>
        <Select value={selectedValue} onChange={handleChange}>
          <option value="-1">Select</option>
          {options.map((option) => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </Select>
        <Submit>
          <ClipLoader
            color={"#ffffff"}
            loading={loadNetworkChildViewModel?.isLoaded}
            css={"border: red"}
            size={15}
          />
          <Input as="input" type="submit" value="Load" onClick={handleSubmit} />
        </Submit>
      </InputGroupPrepend>
    </Container>
  );
};

export default DefaultChildNetwork;
