import { useQuery } from "@tanstack/react-query";
import { Status } from "../types";
import { baseKey } from "../constants";
import { queryKeys } from "../../../shared/src/constants";

export const useStatus = () => {
  return useQuery<Status>({
    queryKey: queryKeys.status,
  });
};
