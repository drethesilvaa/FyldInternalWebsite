import { Pagination } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { motion } from "framer-motion";
import { Clipboard } from "@phosphor-icons/react/dist/ssr";
import { MagneticCard } from "./Magnetic Card/MagneticCard";
import Image from "next/image";
import { optimizeImage } from "@/util/optimizeImage";


interface ContactsCarrouselProps {
  title: string;
  contacts: {
    email: string;
    name: string;
    role: string;
    photo: { url: string; alternativeText: string } | null;
  }[];
}

export const ContactsCarrousel = ({ title, contacts }: ContactsCarrouselProps) => {
  return (
    <div className="space-y-4">
      <h2 className="heading-2xl text-primary font-black mb-0">{title}</h2>
      <div className="divider divider-primary my-1"></div>
      <Swiper
        spaceBetween={16}
        slidesPerView={3}
        breakpoints={{
          0: {
            slidesPerView: 1.2,
          },
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        pagination={{ clickable: true }}
        modules={[Pagination]}
        className="!pb-10 mt-2"
      >
        {contacts.map((contact, index) => (
          <SwiperSlide key={index}>
            <MagneticCard>
              <motion.div
                className="card bg-base-100 shadow-sm p-4 items-start"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: 0.1 + index * 0.1, duration: 0.6 }}
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="avatar">
                    <div className="w-16 h-16 rounded-full overflow-hidden relative">
                      <Image
                        src={contact.photo?.url ? optimizeImage(contact.photo.url) : "/placeholder.jpg"}
                        alt={contact.photo?.alternativeText || contact.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-md capitalize">{contact.name}</p>
                    <p className="text-sm text-gray-500">{contact.role}</p>
                  </div>
                </div>
                <div className="flex items-center bg-gray-100 px-3 py-2 rounded-md w-full justify-between">
                  <span className="text-sm font-medium">{contact.email}</span>
                  <button
                    className="btn btn-ghost btn-xs"
                    onClick={() => navigator.clipboard.writeText(contact.email)}
                  >
                    <Clipboard size={16} />
                  </button>
                </div>
              </motion.div>
            </MagneticCard>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

