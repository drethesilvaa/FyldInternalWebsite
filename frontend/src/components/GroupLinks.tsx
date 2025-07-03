import { useRouter } from "next/navigation"
import { animate, motion } from "framer-motion";

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



  return <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
    {links.map((link, i) => (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={cardVariants}
        className="card bg-[#dbddde] card-md shadow-sm lg:max-h-52 hover:-translate-y-1.5 transition-transform"
        key={i}
      >
        <div className="card-body">
          <h2 className="card-title">{link.linkTitle}</h2>
          <p>Clica no botão para aceder à pagina {link.linkTitle}</p>
          <div className="card-actions justify-end">
            <button onClick={() => { router.push(`${link.page.ParentPage.slug}/${link.page.slug}`) }} className="btn btn-md btn-secondary">ACEDER</button>
          </div>
        </div>
      </motion.div>
    ))}
  </div>
};
