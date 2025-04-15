import { useQuery } from "@tanstack/react-query";

const fetchData = async (slug: string) => {
  const res = await fetch(`/api/page/${slug}`);

  if (!res.ok) {
    throw new Error("Failed to fetch page data");
  }

  const data = await res.json();
  return data;
};

export const usepageData = (slug: string) => {
  return useQuery({
    queryKey: ["page", slug],
    queryFn: () => fetchData(slug),
    enabled: !!slug,
    retry: false,
  });
};
