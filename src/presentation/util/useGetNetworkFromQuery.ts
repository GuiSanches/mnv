import { useRouter } from "next/router";
import { useMemo } from "react";
import NetworkHolder from "../../domain/entity/Network/models/NetworkHolder";

/**
 * Get current networkholder from query params
 */
const useGetNetworkFromQuery = (
  networkHolders: NetworkHolder[]
): [NetworkHolder, number] => {
  const router = useRouter();
  const networkId = useMemo(() => Number(router.query["net"]) || 0, [router]);

  const network = networkHolders[networkId];

  if (network) return [network, networkId];
  else {
    router.replace({
      query: {
        net: 0,
      },
    });
    return [networkHolders[0], 0];
  }
};

export default useGetNetworkFromQuery;
