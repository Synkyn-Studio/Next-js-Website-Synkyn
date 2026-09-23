/* Leadership team shown in the About page chroma grid. */

export interface TeamMember {
  name: string;
  role: string;
  photo: string;
  alt: string;
  accent: string;
  profile: { kind: "imdb" | "linkedin"; href: string };
}

export const TEAM: TeamMember[] = [
  {
    name: "Dhiraj Kishore",
    role: "Co-founder, CBO",
    photo: "/images/album/Dhiraj.png",
    alt: "Dhiraj Kishore - Co-founder and CBO of Synkyn Studios",
    accent: "#06b6d4",
    profile: { kind: "imdb", href: "https://www.imdb.com/name/nm14718630/?ref_=ext_shr_lnk" },
  },
  {
    name: "Bhuvan Gowda",
    role: "Managing Director",
    photo: "/images/album/Bhuvan.png",
    alt: "Bhuvan Gowda - Managing Director and Cinematographer at Synkyn Studios",
    accent: "#f59e0b",
    profile: { kind: "imdb", href: "https://www.imdb.com/name/nm6703377/?ref_=ext_shr_lnk" },
  },
  {
    name: "Deepen Ingale",
    role: "Co-founder, CEO",
    photo: "/images/album/Deepen.png",
    alt: "Deepen Ingale - Co-founder and CEO of Synkyn Studios",
    accent: "#3b82f6",
    profile: { kind: "linkedin", href: "https://www.linkedin.com/in/deepeningale/" },
  },
  {
    name: "Pruthvij Prabhu",
    role: "Gen AI artist",
    photo: "/images/album/Pruthvij.png",
    alt: "Pruthvij Prabhu - Co-founder and Gen AI Artist at Synkyn Studios",
    accent: "#a855f7",
    profile: { kind: "linkedin", href: "https://www.linkedin.com/in/pruthvij-v-prabhu-b58bb6299/" },
  },
];
