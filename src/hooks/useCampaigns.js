import { useEffect, useState } from "react";
import { useConnection } from "../context/connection";
import { ethers } from "ethers";

const useCampaigns = (contractAddress) => {
  const [campaigns, setCampaigns] = useState([]);
  const { provider } = useConnection();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const abi = ["mapping(uint => CrowdFund) public crowd"];
    const contract = new ethers.Contract(contractAddress, abi, provider);
    contract.crowd
      .then((data) => {
        setCampaigns(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [contractAddress, provider]);

  return [campaigns, loading];
};

export default useCampaigns;
