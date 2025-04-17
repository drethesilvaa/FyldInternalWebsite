import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar/Navbar";
import Image, { StaticImageData } from "next/image";

export default function PagesLayout({
  children,
  banner,
  title,
}: Readonly<{
  children: React.ReactNode;
  banner?: {
    url: string;
    alternativeText: string;
  };
  title?: string;
}>) {
  return (
    <>
      <Navbar />
      {banner?.url && (
        <div className="relative">
          <img
            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${banner?.url}`}
            className="object-cover aspect-[12/1] brightness-50"
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
