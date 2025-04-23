"use client";

import { usePages } from "@/providers/PagesProvider";
import { RichTextBlock } from "./RichTextBlock";
import {
  FacebookLogo,
  GoogleChromeLogo,
  InstagramLogo,
  LinkedinLogo,
  SpotifyLogo,
} from "@phosphor-icons/react";

enum SocialMedias {
  Website = "Website",
  Linkedin = "Linkedin",
  Instagram = "Instagram",
  Facebook = "Facebook",
  Spotify = "Spotify",
}

export const Footer = () => {
  const { footer, isLoadingFooter } = usePages();
  const currentYear = new Date().getFullYear();

  const iconProps = {
    size: 40,
    color: "var(--color-neutral)",
  };

  const renderSocialLink = (socialMedia: SocialMedias, link: string) => {
    switch (socialMedia) {
      case SocialMedias.Website:
        return (
          <a href={link} target="_blank" rel="noopener noreferrer">
            <GoogleChromeLogo {...iconProps} />
          </a>
        );
      case SocialMedias.Linkedin:
        return (
          <a href={link} target="_blank" rel="noopener noreferrer">
            <LinkedinLogo {...iconProps} />
          </a>
        );
      case SocialMedias.Instagram:
        return (
          <a href={link} target="_blank" rel="noopener noreferrer">
            <InstagramLogo {...iconProps} />
          </a>
        );
      case SocialMedias.Facebook:
        return (
          <a href={link} target="_blank" rel="noopener noreferrer">
            <FacebookLogo {...iconProps} />
          </a>
        );
      case SocialMedias.Spotify:
        return (
          <a href={link} target="_blank" rel="noopener noreferrer">
            <SpotifyLogo {...iconProps} />
          </a>
        );
      default:
        return null;
    }
  };

  return (
    <footer className="mt-20 bg-[#CFEAE1] py-14 text-center">
      <div className="custom-container">
        <RichTextBlock
          Content={footer?.address || ""}
          configs={{ paragraph: "text-center text-neutral" }}
        />

        <div className="flex gap-4 items-center justify-center mt-10">
          {footer?.SocialLinks &&
            footer.SocialLinks.map((social, index) => {
              const socialMediaEnum =
                SocialMedias[social.SocialMedia as keyof typeof SocialMedias];

              if (socialMediaEnum) {
                return (
                  <div key={index}>
                    {renderSocialLink(socialMediaEnum, social.link)}
                  </div>
                );
              }
              return null; 
            })}
        </div>

        <div className="mt-10 text-neutral">
          Copyright© Mainfyld® {currentYear}. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
