import { useRouter } from "next/router";
import { FC, useEffect, useMemo } from "react";
import NetworkHolder from "../../domain/entity/Network/models/NetworkHolder";

const useGetNetworkFromQuery = (networkHolders: NetworkHolder[]) => {
  const router = useRouter();
  const networkId = useMemo(() => Number(router.query["net"]) || 0, [router]);

  const network = networkHolders[networkId];

  if (network) return network;
  else {
    router.replace({
      query: {
        net: 0,
      },
    });
    return networkHolders[0];
  }
};

export default useGetNetworkFromQuery;
