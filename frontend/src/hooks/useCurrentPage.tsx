import { usePathname } from "next/navigation";

export const useCurrentPage = () => {
  const pathName = usePathname();

  const isLandingPage = pathName === "/";

  return { pathName, isLandingPage };
};
