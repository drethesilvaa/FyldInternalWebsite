import { useQuery } from "@tanstack/react-query";

const fetchData = async () => {
  const res = await fetch(`/api/home`);

  if (!res.ok) {
    throw new Error("Failed to fetch home data");
  }

  const data = await res.json();
  return data?.home;
};

export const useHomeData = () => {
  return useQuery({
    queryKey: ["Home"],
    queryFn: () => fetchData(),
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
};
