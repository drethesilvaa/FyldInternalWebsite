import { useQuery } from "@tanstack/react-query";

export interface Footer {
  address: string;
  SocialLinks: {
    link: string;
    SocialMedia: string;
  }[];
}

const fetchData = async () => {
  const res = await fetch(`/api/footer`);

  if (!res.ok) {
    throw new Error("Failed to fetch footer data");
  }

  const data = await res.json();
  return data?.footer as Footer;
};

export const useFooterData = () => {
  return useQuery({
    queryKey: ["Footer Data"],
    queryFn: () => fetchData(),
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
};
