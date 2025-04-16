import { Pagination } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";
import { RichTextBlock } from "./RichTextBlock";
import "swiper/css";
import "swiper/css/pagination";

// src/components/Carousel.tsx
interface CarouselProps {
  Items: {
    Content: string;
    Imagem: { url: string; alt: string } | null;
  }[];
  Slides: number;
}

export const Carousel = ({ Items, Slides }: CarouselProps) => {
  return (
    <div className="relative w-full overflow-hidden my-6">
      <Swiper
        slidesPerView={2}
        spaceBetween={16}
        pagination={{ clickable: true }}
        modules={[Pagination]}
        className="mySwiper pb-10"
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: Slides,
          },
        }}
      >
        {Items.map((item, index) => (
          <SwiperSlide key={index} className="pb-10">
            <div className="w-full h-full">
              <img
                src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${item.Imagem?.url}`}
                alt={item.Imagem?.alt}
              />
              <RichTextBlock content={item.Content} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
