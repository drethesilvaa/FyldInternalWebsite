import { CardsProps } from "./Cards";
import { RichTextBlock } from "./RichTextBlock";
import { motion } from "framer-motion";
import { TiltCard } from "./TiltCard/TiltCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';


interface BentoGridProps {
    Color: string;
    Title: string;
    BentoItems: CardsProps;
    orientation: "left" | "right";
}

export const BentoGrid: React.FC<BentoGridProps> = ({
    Color,
    Title,
    BentoItems,
    orientation,
}) => {
    const cards = BentoItems?.cardsItems || [];

    const distributeCards = (
        cards: typeof BentoItems.cardsItems,
        orientation: "left" | "right"
    ) => {
        const left: typeof cards = [];
        const right: typeof cards = [];
        
        if (cards.length === 3 || cards.length === 2) {
            if (orientation !== "left") right.push(...cards);
            else { right.push(...cards); }
            return { left, right };
        }



        // General case: alternate groups of 2 starting with orientation
        let isLeftTurn = orientation === "left";
        let i = 0;

        while (i < cards.length) {
            const target = isLeftTurn ? right : left;
            const slice = cards.slice(i, i + 2);

            // Special case: if only 1 card left and other column is empty, keep it with the current column
            if (slice.length === 1 && left.length === 0 && right.length === 0) {
                (orientation === "left" ? right : left).push(...slice);
                break;
            }

            target.push(...slice);
            i += 2;
            isLeftTurn = !isLeftTurn;
        }

        return { left, right };
    };


    const { left: leftColumnCards, right: rightColumnCards } = distributeCards(cards, orientation);
    console.log(leftColumnCards)

    const colorVariants: { [hex: string]: string } = {
        hex004858: "bg-[#004858]",
        hex295B79: "bg-[#295B79]",
    };

    const fadeInProps = (delay: number) => ({
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, delay },
    });

    const TitleBlockAndLeftCards = (
        <div className="flex flex-col gap-4">
            <motion.div
                className={`text-white p-6 rounded-sm shadow-lg ${colorVariants[Color]}`}
                {...fadeInProps(0)}
            >
                <h2 className="text-3xl font-bold">{Title}</h2>
            </motion.div>

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
                            <img
                                src={member.Imagem?.url}
                                alt={member.Imagem?.alt}
                                className="w-full h-64 object-cover rounded-md mb-3"
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
                        <img
                            src={member.Imagem?.url}
                            alt={member.Imagem?.alt}
                            className="w-full h-64 object-cover rounded-md mb-3"
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
                        <TiltCard>
                            <motion.div
                                className="bg-white rounded-sm shadow-sm text-center pb-2 h-full"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ delay: 0.1 + index * 0.1, duration: 0.6 }}
                            >
                                <img
                                    src={member.Imagem?.url}
                                    alt={member.Imagem?.alt}
                                    className="w-full h-64 object-cover rounded-md mb-3"
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
                        {TitleBlockAndLeftCards}
                        {RightCardsGrid}
                    </>
                ) : (
                    <>
                        {RightCardsGrid}
                        {TitleBlockAndLeftCards}
                    </>
                )}
            </div>
        </>
    );

};
