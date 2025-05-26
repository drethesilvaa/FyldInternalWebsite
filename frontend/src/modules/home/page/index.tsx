"use client";
import { useHomeData } from "@/hooks/home/useHomeData";
import { Hero } from "../components/Hero";
import { Navbar } from "@/components/Navbar/Navbar";
import { Footer } from "@/components/Footer";
import { useRenderComponent } from "@/hooks/useRenderComponent";
import PageLoader from "@/layouts/PageLoader";
import { Tree, TreeNode } from "react-organizational-chart";

export const HomePage = () => {
  const { data: home, error, isLoading } = useHomeData();

  if (error) return <p>Error: {error.message}</p>;

  const renderComponent = (section: any, typename: any) =>
    useRenderComponent(section, typename);

  return (
    <>
      {isLoading && <PageLoader />}

      <Hero
        videoUrl={home?.VideoLink}
        bannerImage={home?.placeholderImage}
        logo={home?.FyldIcon}
      />
      <Navbar />

      <div className="flex flex-col">
        <div className="custom-container my-11">
          {home?.Empresa?.map((section: any) => (
            <div key={section.id}>
              {renderComponent(section, section.__typename)}
            </div>
          ))}
        </div>

        <div className="bg-[#e8f6e3] my-11 py-16">
          <div className="custom-container">
            {home?.TyFyld?.map((section: any) => (
              <div key={section.id}>
                {renderComponent(section, section.__typename)}
              </div>
            ))}
          </div>
        </div>
        <div>
          <Tree lineWidth={"2px"} label={<div>Filipa Sequeira</div>}>
            <TreeNode label={<div>Administration</div>}>
              <TreeNode label={<div className="flex gap-2 justify-center">
                <div>Filipe Almeida</div>
                <div>Cátia Teixeira</div>
              </div>}>
                <TreeNode label={<div>Operations</div>}>
                  <TreeNode label={<div>Management Team</div>}>
                    <TreeNode label={<div>International Team</div>}>
                      <TreeNode label={<div>Jean Testut</div>}>
                        <TreeNode label={<div>Axel David</div>} />
                      </TreeNode>
                    </TreeNode>
                    <TreeNode label={<div>National Team</div>}>
                      <TreeNode label={<div>Joana Gonçalves</div>} />
                      <TreeNode label={<div>Marta Alves</div>} />
                      <TreeNode label={<div>Rúben Cunha</div>} />
                      <TreeNode label={<div>Diogo Martinho</div>} />
                      <TreeNode label={<div>Gonçalo Guerreiro</div>} />
                    </TreeNode>
                  </TreeNode>
                  <TreeNode label={<div>Recruitment Team</div>}>
                    <TreeNode label={<div>Catarina Almeida</div>}>
                      <TreeNode label={<div>Sara Espirito Santo</div>} />
                      <TreeNode label={<div>Daniela Vito</div>} />
                      <TreeNode label={<div>Samuel Rodrigues</div>} />
                      <TreeNode label={<div>Beatriz Pires</div>} />
                    </TreeNode>
                  </TreeNode>
                </TreeNode>
                <TreeNode label={<div>Support</div>}>
                  <TreeNode label={<div>Billing & Collection Team</div>}>
                    <TreeNode label={<div>Cátia Godinho</div>} />
                  </TreeNode>
                  <TreeNode label={<div>Marketing Team</div>}>
                    <TreeNode label={<div>Carolina Pereira</div>} >
                      <TreeNode label={<div>Sofia Lopes</div>} />
                      <TreeNode label={<div>Filipa</div>} />
                    </TreeNode>

                  </TreeNode>
                </TreeNode>
                <TreeNode label={<div>HR Team</div>}>
                  <TreeNode label={<div>HR Operations</div>}>
                    <TreeNode label={<div>Joana Carvalho</div>} >
                      <TreeNode label={<div>Sofia Lopes</div>} />
                    </TreeNode>
                  </TreeNode>
                  <TreeNode label={<div>Learning & Development</div>}>
                    <TreeNode label={<div>Yvonne Pacheco</div>} />
                  </TreeNode>
                </TreeNode>
              </TreeNode>
            </TreeNode>
          </Tree>
        </div>
        <div className="custom-container my-11">
          {home?.ParteDaFyld?.map((section: any) => (
            <div key={section.id}>
              {renderComponent(section, section.__typename)}
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};
