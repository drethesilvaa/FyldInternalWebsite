import { useRouter } from "next/navigation"
import { motion } from "framer-motion";

interface GroupLinkProps {
  links: {
    linkTitle: string
    page: {
      slug: string
      pageBanner: {
        alternativeText: string
        url: string
      }
      ParentPage: {
        slug: string
      }
    }
  }[]
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
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



export const GroupLinks: React.FC<GroupLinkProps> = ({ links }) => {


  const router = useRouter()

  if (!links) return ""



  return <div className="grid grid-cols-2 gap-4">
    {links.map((link, i) => (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={cardVariants}
        className="card lg:card-side bg-base-100 shadow-sm"
        key={i}
      >
        <figure className="aspect-video">
          <img
            src={link.page.pageBanner.url || "https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp"}
            alt={link.page.pageBanner.alternativeText || "Placeholder Page Picture"} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{link.linkTitle}</h2>
          <p>Clica no botão para aceder à pagina {link.linkTitle}</p>
          <div className="card-actions justify-end">
            <button onClick={() => { router.push(`${link.page.ParentPage.slug}/${link.page.slug}`) }} className="btn btn-primary">Aceder</button>
          </div>
        </div>
      </motion.div>
    ))}
  </div>
};
