import socialIconX from "../../../../../assets/icons/socials/social-x.svg?react";
import socialIconYoutube from "../../../../../assets/icons/socials/social-youtube.svg?react";
import socialIconLinkedIn from "../../../../../assets/icons/socials/social-linkedin.svg?react";
import socialIconInstagram from "../../../../../assets/icons/socials/social-instagram.svg?react";
import socialIconFacebook from "../../../../../assets/icons/socials/social-facebook.svg?react";
import socialIconTiktok from "../../../../../assets/icons/socials/social-tiktok.svg?react";

const socialLinks = [
  {
    icon: socialIconX,
    name: "X",
    link: "",
  },
  {
    icon: socialIconYoutube,
    name: "Youtube",
    link: "",
  },
  {
    icon: socialIconLinkedIn,
    name: "LinkedIn",
    link: "",
  },
  {
    icon: socialIconInstagram,
    name: "Instagram",
    link: "",
  },
  {
    icon: socialIconFacebook,
    name: "Facebook",
    link: "",
  },
  {
    icon: socialIconTiktok,
    name: "Tiktok",
    link: "",
  },
];

function FooterSocials() {
  return (
    <div className="footer-socials">
      <div className="footer-socials_title">
        <p>
          Follow our <strong>Blog</strong>
        </p>
      </div>
      <ul className="footer-socials_links">
        {socialLinks.map((item, index) => {
          const Icon = item.icon;
          return (
            <li key={`${item}-${index}`}>
              <button type="button">
                <Icon />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default FooterSocials;
