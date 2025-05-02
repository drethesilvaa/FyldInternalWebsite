import { Page } from "@/providers/PagesProvider";
import { useQuery } from "@tanstack/react-query";

const fetchData = async () => {
  const res = await fetch(`/api/navbar`);

  if (!res.ok) {
    throw new Error("Failed to fetch navbar data");
  }

  const data = await res.json();
  return data as { home: { FyldIcon: { url?: string } }; pages: Page[] };
};

export const useNavbarData = () => {
  return useQuery({
    queryKey: ["Nav Data"],
    queryFn: () => fetchData(),
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
};
