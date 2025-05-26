import { useRouter } from "next/navigation"

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



export const GroupLinks: React.FC<GroupLinkProps> = ({ links }) => {


  const router = useRouter()

  if (!links) return ""



  return <div className="grid grid-cols-2 gap-4">
    {links.map((link) => (
      <div className="card lg:card-side bg-base-100 shadow-sm">
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
      </div>
    ))}
  </div>
};
