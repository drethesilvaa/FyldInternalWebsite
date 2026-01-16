import { CardsProps } from "./Cards";
import { RichTextBlock } from "./RichTextBlock";
import { motion } from "framer-motion";
import { TiltCard } from "./TiltCard/TiltCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Image from "next/image";


interface BentoGridProps {
    Color: string;
    Title: string;
    items: CardsProps;
    orientation: "left" | "right";
}

export const BentoGrid: React.FC<BentoGridProps> = ({
    Color,
    Title,
    items,
    orientation,
}) => {
    const cards = items?.Items || [];

    const distributeCards = (
        cards: typeof items.Items,
        orientation: "left" | "right"
    ) => {
        return orientation === "left"
            ? { left: [], right: cards }
            : { left: cards, right: [] };
    };


    const { left: leftColumnCards, right: rightColumnCards } = distributeCards(cards, orientation);


    const colorVariants: { [hex: string]: string } = {
        hex004858: "bg-[#323439]",
        hex295B79: "bg-[#4d575e]",
    };

    const fadeInProps = (delay: number) => ({
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, delay },
    });

    const TitleBlock = (
        <motion.div
            className={`text-white p-6 rounded-sm shadow-lg ${colorVariants[Color]} sticky top-5`}
            {...fadeInProps(0)}
        >
            <h2 className="text-3xl font-bold">{Title}</h2>
        </motion.div>
    )

    const LeftCardsGrid = (
        <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
                {leftColumnCards.map((member, index) => (
                    <TiltCard key={index}>
                        <motion.div
                            className="bg-white rounded-sm shadow-sm text-center pb-2 h-full"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ delay: 0.1 + index * 0.1, duration: 0.6 }}
                        >
                            <Image
                                src={member.Imagem?.url || "/placeholder.jpg"}
                                alt={member.Imagem?.alt || "Image"}
                                width={400}
                                height={256}
                                className="w-full h-64 object-cover rounded-md mb-3 aspect-[4/3]"
                                style={{ width: "100%", height: "auto" }}
                            />
                            <RichTextBlock Content={member.Content} />
                        </motion.div>
                    </TiltCard>
                ))}
            </div>
        </div>
    );

    const RightCardsGrid = (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
            {rightColumnCards.map((member, index) => (
                <TiltCard key={index}>
                    <motion.div
                        className="bg-white rounded-sm shadow-sm text-center pb-2 h-full"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ delay: 0.1 + index * 0.1, duration: 0.6 }}
                    >
                        <Image
                            src={member.Imagem?.url || "/placeholder.jpg"}
                            alt={member.Imagem?.alt || "Image"}
                            width={400}
                            height={256}
                            className="w-full h-64 object-cover rounded-md mb-3 aspect-[4/3]"
                            style={{ width: "100%", height: "auto" }}
                        />
                        <RichTextBlock Content={member.Content} />
                    </motion.div>
                </TiltCard>
            ))}
        </div>
    );

    const MobileCarousel = (
        <div className="md:hidden py-8">
            <motion.div
                className={`text-white p-6 rounded-sm shadow-lg ${colorVariants[Color]} mb-4`}
                {...fadeInProps(0)}
            >
                <h2 className="text-3xl font-bold">{Title}</h2>
            </motion.div>
            <Swiper
                spaceBetween={16}
                slidesPerView={2.2}
                pagination={{ clickable: true }}
                modules={[Pagination]}
                className="!pb-10"
            >
                {cards.map((member, index) => (
                    <SwiperSlide key={index}>
                        <TiltCard key={index}>
                            <motion.div
                                className="bg-white rounded-sm shadow-sm text-center pb-2 h-full"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ delay: 0.1 + index * 0.1, duration: 0.6 }}
                            >
                                <Image
                                    src={member.Imagem?.url || "/placeholder.jpg"}
                                    alt={member.Imagem?.alt || "Image"}
                                    width={400}
                                    height={256}
                                    className="w-full h-64 object-cover rounded-md mb-3 aspect-[4/3]"
                                    style={{ width: "100%", height: "auto" }}
                                />
                                <RichTextBlock Content={member.Content} />
                            </motion.div>
                        </TiltCard>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );


    return (
        <>

            {MobileCarousel}

            <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-6 py-8 items-start">
                {orientation === 'left' ? (
                    <>
                        {TitleBlock}
                        {RightCardsGrid}
                    </>
                ) : (
                    <>
                        {LeftCardsGrid}
                        {TitleBlock}
                    </>
                )}
            </div>

        </>
    );

};
