import qs from "query-string";
import { useInfiniteQuery } from "@tanstack/react-query";

interface TeamQueryProps {
  queryKey: string;
  apiUrl: string;

}

export const useQuery = ({
  queryKey,
  apiUrl,

}: TeamQueryProps) => {

// The cursor parameter is often used in APIs for pagination. 
// It is a way to specify where the next set of results should start from.
  const fetchData = async ({ pageParam = undefined }) => {
    const url = qs.stringifyUrl(
      {
        url: apiUrl,
        query: {
          cursor: pageParam,
        },
      },
      { skipNull: true }
    );

    const res = await fetch(url);
    return res.json();
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: [queryKey],
      initialPageParam: undefined,
      queryFn: fetchData,
      getNextPageParam: (lastPage) => lastPage?.nextCursor,
      refetchInterval: 10000,
    });

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  };
};
