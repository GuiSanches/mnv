import {
  ChangeEvent,
  FC,
  memo,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ClipLoader } from "react-spinners";
import {
  CheckboxWrapper,
  CustomControlCheckbox,
  CustomControlLabel,
  InputGroup,
  Line,
} from "../../../../styles/global";
import { NetworkCtx } from "../../util/NetworkCtx";
import useBaseView from "../../util/useGetBaseView";
import useGetNetworkFromQuery from "../../util/useGetNetworkFromQuery";
import LayoutViewModel from "../../view-model/Layout/LayoutViewModel";
import LayoutViewModelImpl from "../../view-model/Layout/LayoutViewModelImpl";
import { Title } from "../InfoNetwork/styles";

interface Props {}

const LayoutComponent: FC<Props> = ({}) => {
  const title = "Enable/Disable Grid Visualization";
  const label = "Grid (See child network)";

  const [checked, setChecked] = useState<boolean>(false);

  const [layoutViewModel, setLayoutViewModel] = useState<LayoutViewModel>();
  const [update, baseView] = useBaseView<LayoutViewModel>(layoutViewModel);

  const { options, setOptions, networkHolders } = useContext(NetworkCtx);
  const [netFromQuery] = useGetNetworkFromQuery(networkHolders);
  const previousOption = useMemo(() => options, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const checked = e.currentTarget.checked;
      setChecked(checked);
      if (setOptions) {
        if (checked && layoutViewModel) {
          setOptions(layoutViewModel.viewOption);
        } else setOptions(previousOption);
      }
    } catch (e: any) {
      alert(e.message);
    }
  };

  useEffect(() => {
    const viewModel = new LayoutViewModelImpl(netFromQuery);

    viewModel.attachView(baseView);
    setLayoutViewModel(viewModel);

    return () => {
      viewModel.destroyListener();
    };
  }, [netFromQuery]);

  useEffect(() => {
    setOptions!({
      ...options,
      loading: false,
    });
  }, [update]);

  return (
    <>
      <Title>{title}</Title>
      <Line />

      <InputGroup>
        <CheckboxWrapper>
          <CustomControlCheckbox
            type="checkbox"
            id="layout"
            name="layout"
            checked={checked}
            onChange={handleChange}
          />
          <CustomControlLabel htmlFor="layout">
            <ClipLoader
              color={"#e3e3e3"}
              loading={options.loading}
              css={"border: red"}
              size={15}
            />

            {label}
          </CustomControlLabel>
        </CheckboxWrapper>
      </InputGroup>
    </>
  );
};

export default memo(LayoutComponent);
