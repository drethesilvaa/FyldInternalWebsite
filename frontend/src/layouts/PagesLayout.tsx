import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar/Navbar";
import Image, { StaticImageData } from "next/image";
import PageLoader from "./PageLoader";
import { strapiUrl } from "@/data/strapiUrl";

export default function PagesLayout({
  children,
  banner,
  title,
  isLoading,
}: Readonly<{
  children: React.ReactNode;
  banner?: {
    url: string;
    alternativeText: string;
  };
  title?: string;
  isLoading: boolean;
}>) {
  return (
    <>
      {isLoading && <PageLoader />}
      <Navbar />
      {banner?.url && (
        <div className="relative">
          <img
            src={`${strapiUrl}${banner?.url}`}
            className="object-cover aspect-[12/1] brightness-50 max-h-40 w-full"
            alt={banner?.alternativeText}
          />
        </div>
      )}
      <Breadcrumb />
      <div className="custom-container my-8">
        {title && (
          <h2 className="heading-5xl text-primary font-extrabold text-center">
            {title}
          </h2>
        )}
        <div className="mt-5">{children}</div>
      </div>
      <Footer />
    </>
  );
}
