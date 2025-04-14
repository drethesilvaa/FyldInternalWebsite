"use client";

import { useHomeData } from "@/hooks/home/useHomeData";
import { Hero } from "../components/Hero";

export const HomePage = () => {
  const { data: home, error, isLoading } = useHomeData();

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <Hero videoUrl={home.VideoLink} bannerImage={home.placeholderImage} />
    </>
  );
};
