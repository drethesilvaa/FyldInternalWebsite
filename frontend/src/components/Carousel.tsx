import { Pagination } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";
import { RichTextBlock } from "./RichTextBlock";
import "swiper/css";
import "swiper/css/pagination";
import { motion } from "framer-motion";

interface CarouselProps {
  Items: {
    Content: string;
    Imagem: { url: string; alt: string } | null;
  }[];
  Slides: number;
}

const slideVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      delay: i * 0.1,
    },
  }),
};

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
            <motion.div
              className="w-full h-full"
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={slideVariants}
            >
              <img src={`${item.Imagem?.url}`} alt={item.Imagem?.alt} />
              {item.Content && <RichTextBlock content={item.Content} />}
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
