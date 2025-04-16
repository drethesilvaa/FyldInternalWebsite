"use client";
import { useHomeData } from "@/hooks/home/useHomeData";
import { Hero } from "../components/Hero";
import { Navbar } from "@/components/Navbar/Navbar";
import { Footer } from "@/components/Footer";
import { useRenderComponent } from "@/hooks/useRenderComponent";

export const HomePage = () => {
  const { data: home, error, isLoading } = useHomeData();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const renderComponent = (section: any, typename: any) =>
    useRenderComponent(section, typename);

  return (
    <>
      <Hero
        videoUrl={home.VideoLink}
        bannerImage={home.placeholderImage}
        logo={home.FyldIcon}
      />
      <Navbar />

      <div className="flex flex-col">
        <div className="custom-container my-11">
          {home.Empresa?.map((section: any) => (
            <div key={section.id}>
              {renderComponent(section, section.__typename)}
            </div>
          ))}
        </div>

        <div className="bg-[#e8f6e3] my-11 py-16">
          <div className="custom-container">
            {home.TyFyld?.map((section: any) => (
              <div key={section.id}>
                {renderComponent(section, section.__typename)}
              </div>
            ))}
          </div>
        </div>
        <div className="custom-container my-11">
          {home.ParteDaFyld?.map((section: any) => (
            <div key={section.id}>
              {renderComponent(section, section.__typename)}
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};
