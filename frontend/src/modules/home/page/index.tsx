"use client";
import { useHomeData } from "@/hooks/home/useHomeData";
import { Hero } from "../components/Hero";
import { Navbar } from "@/components/Navbar/Navbar";
import { Footer } from "@/components/Footer";
import { useRenderComponent } from "@/hooks/useRenderComponent";
import PageLoader from "@/layouts/PageLoader";
import { usePages } from "@/providers/PagesProvider";

export const HomePage = () => {
  const { data: home, error, isLoading } = useHomeData();
  const { fyldIcon } = usePages();

  if (error) return <p>Error: {error.message}</p>;

  const renderComponent = (section: any, typename: any) =>
    useRenderComponent(section, typename);

  return (
    <>
      {isLoading && <PageLoader />}

      <Hero
        videoUrl={home?.VideoLink}
        bannerImage={home?.placeholderImage}
        logo={home?.FyldIcon}
      />
      <Navbar />

      <div className="flex flex-col">
        {/* Render Empresa section */}
        <div className="custom-container my-11">
          {home?.Empresa && Array.isArray(home.Empresa)
            ? home.Empresa.map((section: any) => (
                <div key={section.id}>
                  {renderComponent(section, section.__component)}
                </div>
              ))
            : null}
        </div>

        {/* Render TyFyld section */}
        <div className="bg-[#b7bbbe] my-11 py-16">
          <div className="custom-container">
            {home?.TyFyld && Array.isArray(home.TyFyld)
              ? home.TyFyld.map((section: any) => (
                  <div key={section.id}>
                    {renderComponent(section, section.__component)}
                  </div>
                ))
              : null}
          </div>
        </div>

        {/* Render ParteDaFyld section */}
        <div className="custom-container my-11">
          {home?.ParteDaFyld && Array.isArray(home.ParteDaFyld)
            ? home.ParteDaFyld.map((section: any) => (
                <div key={section.id}>
                  {renderComponent(section, section.__component)}
                </div>
              ))
            : null}
        </div>
      </div>

      <Footer />
    </>
  );
};
