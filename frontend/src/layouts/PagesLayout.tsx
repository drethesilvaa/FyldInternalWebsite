import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar/Navbar";
import Image, { StaticImageData } from "next/image";

export default function PagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <Breadcrumb />
      <div className="custom-container">{children}</div>
      <Footer />
    </>
  );
}
