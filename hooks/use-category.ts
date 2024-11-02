import useSWR from "swr";
import axiosFetcher from "@/lib/axios/axios-fetcher";
import { endpoints } from "@/constants/endpoints";

const useCategory = () => {
  const { data, error, isLoading, mutate } = useSWR(
    endpoints.category.getCategories,
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

export default useCategory;
