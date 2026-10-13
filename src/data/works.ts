/*
  Library works (previously the `worksData` array inside library.html).
  `description` is trusted, hand-written HTML shown in the media modal.
*/

export type WorkSourceType = "vimeo" | "youtube" | "instagram" | "image" | "video";

export interface WorkSource {
  type: WorkSourceType;
  src: string;
  thumbnail?: string;
}

export interface Work {
  id: string;
  title: string;
  category: string;
  tag?: string;
  ratio?: "9:16" | "16:9";
  thumbnail?: string;
  description: string;
  sources: WorkSource[];
  /** URL slug of the project's own page (/work/<slug>); only set for verified, Synkyn-hosted films. */
  slug?: string;
  /** Independent concept work, not commissioned by the brand shown. Labelled as such wherever it appears. */
  spec?: boolean;
  /** For Vimeo-hosted films: publish date and length (from Vimeo), used for VideoObject structured data. */
  published?: { uploadDate: string; seconds: number };
}

export const WORKS: Work[] = [
  {
    id: "work-ig-1",
    slug: "skroman-smart-switches",
    published: { uploadDate: "2026-07-18T11:23:34+05:30", seconds: 16 },
    title: "Skroman Smart Switches",
    category: "Social Reel",
    tag: "Reels",
    ratio: "9:16",
    thumbnail: "https://ik.imagekit.io/mkzeqs9lt/For-Website-Synkyn/For%20Album/Album%20Covers/hf_20260621_211115_a8ae6a61-15eb-4fcd-a87e-8b37d91256cf.png?updatedAt=1784388403481",
    description: "Your home should be as smart as your smartphone ✨<br><br>Imagine controlling your lights, security, curtains & appliances with just one tap or voice command.<br><br>Welcome to the future with Skroman Smart Home Automation.<br><br>🔥 Smart Lighting<br>🔐 Advanced Home Security<br>🎙 Voice & App Control<br>⚡ Energy Saving Automation<br>🏠 Luxury Smart Living Experience<br><br>Turn your ordinary home into an intelligent lifestyle.<br><br>Comfort. Security. Convenience. All automated.",
    sources: [{ type: "vimeo", src: "https://player.vimeo.com/video/1211043365" }],
  },
  {
    id: "work-dragon",
    title: "Dragon",
    category: "Film / Trailer",
    tag: "YouTube",
    ratio: "16:9",
    description: "<strong>Dragon Glimpse – Telugu</strong><br><br><strong>Featuring:</strong> NTR, Anil Kapoor & Rukmini Vasanth<br><strong>Music:</strong> Ravi Basrur<br><strong>Directed by:</strong> Prashanth Neel",
    sources: [{ type: "youtube", src: "https://youtu.be/FlOzIM7Yov4?si=pdGIj50dAFhKnGQ5" }],
  },
  {
    id: "work-nbk111",
    title: "NBK111",
    category: "Film / Trailer",
    tag: "YouTube",
    description: "<strong>NBK 111 – Entry of an Era</strong><br><br><strong>Starring:</strong> Nandamuri Balakrishna<br><strong>Directed by:</strong> Gopichand Malineni<br><strong>Cinematography:</strong> Arvind S. Kashyap<br><strong>Music:</strong> S. Thaman<br><strong>Production:</strong> Vriddhi Cinemas",
    sources: [{ type: "youtube", src: "https://youtu.be/3u_wE0ocFus?si=JHUwwCjkXAab_VFG" }],
  },
  {
    id: "work-camel-2",
    slug: "camel-crayons",
    spec: true,
    published: { uploadDate: "2026-07-10T13:30:58+05:30", seconds: 41 },
    title: "Camel",
    category: "Spec Ad Film",
    tag: "Film",
    thumbnail: "https://ik.imagekit.io/mkzeqs9lt/For-Website-Synkyn/For%20Album/Album%20Covers/hf_20260303_194843_2dc8f410-cfc2-417f-9dbd-b15e9bdd28c6.png?updatedAt=1784389455208",
    description: "<strong>Camel – Spec AI Film</strong><br><br><strong>Concept:</strong> Reimagining the world of Camel Crayons through AI-driven visual storytelling.",
    sources: [{ type: "vimeo", src: "https://player.vimeo.com/video/1208876567" }],
  },
  {
    id: "work-tata-sampann",
    slug: "tata-sampann",
    published: { uploadDate: "2026-07-18T11:28:54+05:30", seconds: 4 },
    title: "Tata Sampann",
    category: "Ad Film",
    tag: "Film",
    thumbnail: "https://ik.imagekit.io/mkzeqs9lt/For-Website-Synkyn/For%20Album/Tata%20Cover%20for%20web.png?updatedAt=1783526676609",
    description: "<strong>Tata Sampann – Dal Product Window</strong><br><br><strong>Brand:</strong> Tata Sampann<br><strong>Crafted through:</strong> Product-focused visual storytelling<br><strong>Focus:</strong> Texture, richness and the everyday appeal of premium dals.",
    sources: [
      { type: "vimeo", src: "https://player.vimeo.com/video/1211044048" },
      { type: "image", src: "https://ik.imagekit.io/mkzeqs9lt/For-Website-Synkyn/For%20Album/pw%20dal%202.png?updatedAt=1783526325276" },
      { type: "vimeo", src: "https://player.vimeo.com/video/1208145520" },
    ],
  },
  {
    id: "work-red-bus",
    slug: "redbus",
    published: { uploadDate: "2026-07-08T12:07:41+05:30", seconds: 20 },
    title: "RedBus",
    category: "AI VFX",
    tag: "Film",
    thumbnail: "https://ik.imagekit.io/mkzeqs9lt/For-Website-Synkyn/For%20Album/Album%20Covers/redbuss.png?updatedAt=1784389746357",
    description: "<strong>RedBus – GenAI Cleanups</strong><br><br><strong>Craft:</strong> Generative AI · VFX<br><strong>Focus:</strong> Seamless cleanups, frame refinement and photorealistic visual enhancement.",
    sources: [
      { type: "vimeo", src: "https://player.vimeo.com/video/1208148385" },
      { type: "vimeo", src: "https://player.vimeo.com/video/1208148389" },
      { type: "vimeo", src: "https://player.vimeo.com/video/1208148384" },
      { type: "vimeo", src: "https://player.vimeo.com/video/1208148386" },
    ],
  },
  {
    id: "work-skroman",
    title: "Skroman Automation",
    category: "Social Reel",
    tag: "Instagram",
    thumbnail: "https://ik.imagekit.io/mkzeqs9lt/For-Website-Synkyn/skorman_web.png",
    description: "<strong>Skroman Smart Home Automation</strong><br><br><strong>Concept:</strong> Intelligent living, reimagined.<br><strong>Focus:</strong> Smart lighting · Home security · Voice & App Control · Energy Automation<br><br><strong>Experience:</strong> A sleek lifestyle film showcasing the seamless intersection of technology, comfort and modern living.",
    sources: [{ type: "instagram", src: "https://www.instagram.com/reel/DZCmDTOhcIK/" }],
  },
];

export const WORKS_ROW: Work[] = [
  {
    id: "work-tata-sampann-haldi",
    slug: "tata-sampann-haldi",
    published: { uploadDate: "2026-10-13T08:37:17+05:30", seconds: 20 },
    title: "Tata Sampann Haldi",
    category: "Ad Film",
    tag: "Film",
    ratio: "16:9",
    thumbnail: "https://ik.imagekit.io/mkzeqs9lt/13-10-26/haldi%20thumbnail.png?updatedAt=1791894471499",
    description: "<strong>Tata Sampann – Haldi</strong><br><br><strong>Brand:</strong> Tata Sampann<br><strong>Product:</strong> Turmeric Powder with natural oils<br><strong>Line:</strong> “Har baar, har mausam, Sunehri haldi.”",
    sources: [
      { type: "vimeo", src: "https://player.vimeo.com/video/1235396466" },
      { type: "vimeo", src: "https://player.vimeo.com/video/1235394944" },
    ],
  },
  {
    id: "work-row-3",
    title: "",
    category: "",
    tag: "Film",
    ratio: "16:9",
    thumbnail: "",
    description: "",
    sources: [{ type: "vimeo", src: "" }],
  },
];

/** A work is only shown once it has a title and at least one real source (no empty placeholder cards). */
export const isPublished = (w: Work) => !!w.title.trim() && w.sources.some((src) => !!src.src);

/** Every card on the Library page: the bento grid, then the row under it. */
export const ALL_WORKS: Work[] = [...WORKS, ...WORKS_ROW].filter(isPublished);

export function getYouTubeId(url: string) {
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|v\/))([A-Za-z0-9_-]{11})/);
  return m ? m[1] : null;
}
export const getYouTubeThumbnail = (videoId: string) => `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
export function getInstagramShortcode(url: string) {
  const m = url.match(/instagram\.com\/(?:p|reel)\/([A-Za-z0-9_-]+)/);
  return m ? m[1] : null;
}
export function getVimeoId(url: string) {
  const m = String(url).match(/vimeo\.com\/(?:video\/)?(\d+)/) || String(url).match(/(\d{6,})/);
  return m ? m[1] : null;
}

/** Works that have their own project page, in Library order. */
export const PROJECT_WORKS: Work[] = ALL_WORKS.filter((w) => !!w.slug);
