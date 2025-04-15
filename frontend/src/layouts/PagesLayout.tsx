import Navbar from "@/components/Navbar/Navbar";
import Image, { StaticImageData } from "next/image";

export default function PagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <div className="custom-container">{children}</div>
    </>
  );
}
