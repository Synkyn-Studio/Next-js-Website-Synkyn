/* Leadership team shown in the About page chroma grid. */

export interface TeamMember {
  name: string;
  role: string;
  photo: string;
  alt: string;
  accent: string;
  /** Profile links shown on the card, in order. */
  profiles: { kind: "imdb" | "linkedin"; href: string }[];
}

export const TEAM: TeamMember[] = [
  {
    name: "Dhiraj Kishore",
    role: "Co-founder",
    photo: "/images/album/Dhiraj.png",
    alt: "Dhiraj Kishore - Co-founder of Synkyn Studios",
    accent: "#06b6d4",
    profiles: [
      { kind: "imdb", href: "https://www.imdb.com/name/nm14718630/?ref_=ext_shr_lnk" },
      { kind: "linkedin", href: "https://www.linkedin.com/in/dhiraj-kishore-3a5872393/" },
    ],
  },
  {
    name: "Deepen Ingale",
    role: "Co-founder",
    photo: "/images/album/Deepen.png",
    alt: "Deepen Ingale - Co-founder of Synkyn Studios",
    accent: "#3b82f6",
    profiles: [{ kind: "linkedin", href: "https://www.linkedin.com/in/deepeningale/" }],
  },
  {
    name: "Pruthvij Prabhu",
    role: "Gen AI artist",
    photo: "/images/album/Pruthvij.png",
    alt: "Pruthvij Prabhu - Gen AI Artist at Synkyn Studios",
    accent: "#a855f7",
    profiles: [{ kind: "linkedin", href: "https://www.linkedin.com/in/pruthvij-v-prabhu-b58bb6299/" }],
  },
];
