import { Pagination } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";
import { RichTextBlock } from "./RichTextBlock";
import "swiper/css";
import "swiper/css/pagination";
import { motion } from "framer-motion";
import { AspectRatio } from "@/data/AspectRatio";
import { ratioClass } from "./Cards";
import { strapiUrl } from "@/data/strapiUrl";
import { optimizeImage } from "@/util/optimizeImage";

interface CarouselProps {
  Items: {
    Content: string;
    Imagem: { url: string; alt: string } | null;
    aspectRatio: AspectRatio;
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
        slidesPerView={Slides > 2 ? 2 : Slides}
        spaceBetween={16}
        pagination={{ clickable: true }}
        modules={[Pagination]}
        className="mySwiper pb-10"
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: Slides > 2 ? 2 : Slides,
          },
          768: {
            slidesPerView: Slides > 3 ? 3 : Slides,
          },
          1024: {
            slidesPerView: Slides,
          },
        }}
      >
        {Items.map((item, index) => (
          <SwiperSlide key={index} className="pb-10">
            <motion.div
              className=""
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={slideVariants}
            >
              <img
                style={{ margin: "0 auto" }}
                src={optimizeImage(`${strapiUrl}${item.Imagem?.url}`)}
                alt={item.Imagem?.alt}
                className={`object-cover ${
                  ratioClass
                    ? ratioClass[item.aspectRatio]
                    : ratioClass[AspectRatio.FiveByFour]
                }`}
              />
              {item.Content && <RichTextBlock Content={item.Content} />}
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
