import useSWR from "swr";
import axiosFetcher from "@/lib/axios/axios-fetcher";
import { endpoints } from "@/constants/endpoints";

const useUsers = (query: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    endpoints.user.getUsers(query),
    axiosFetcher,
    {
      revalidateIfStale: false,
    }
  );
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useUsers;
