/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router";
import {
  ChangeEvent,
  FC,
  useContext,
  useMemo,
  useState,
} from "react";
import NetworkHolder from "../../domain/entity/Network/models/NetworkHolder";
import { NetworkCtx } from "../../presentation/util/NetworkCtx";
import { Select } from "./styles";

const SelectNetwork: FC = () => {
  const { networkHolders, setNetworkHolders } = useContext(NetworkCtx);
  const [value, setValue] = useState<number>(0);
  const [updated, setUpdated] = useState<boolean>(false);
  const router = useRouter();

  const options = useMemo(() => {
    const options = [];

    let length = networkHolders.length === 1 ? 2 : networkHolders.length;

    const add1 =
      networkHolders[networkHolders.length - 1].getNetwork().network !==
      undefined
        ? 1
        : 0;

    for (let i = 0; i < length + add1; i++)
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      );

    return options;
  }, [networkHolders, updated]);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const id = parseInt(e.target.value);
    if (!networkHolders[id]) {
      networkHolders[id] = new NetworkHolder();
      setNetworkHolders!(networkHolders);
    }
    setUpdated(!updated);
    setValue(id);
    router.replace({
      query: {
        net: String(id),
      },
    });
  };

  return (
    <Select value={value} onChange={handleChange}>
      {options}
    </Select>
  );
};

export default SelectNetwork;
