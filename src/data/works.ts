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
  /**
   * Optional brand logo (image URL, e.g. ImageKit). Shown above the category in
   * the Library modal and on the project page; leave it out and nothing shows.
   */
  logo?: string;
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
    logo: "https://www.skromanglobal.com/assets/images/logo/skroman.png",
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
    logo: "https://companieslogo.com/img/orig/KOKUYOCMLN.NS_BIG-a8b32293.png?t=1731048476",
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
    logo: "https://www.tataconsumer.com/brands/foods/tata-sampann/cfa-details/images/tata%20sampan%20logo%20png.png",
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
    logo: "data:image/png;base64,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",
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
    logo: "https://www.skromanglobal.com/assets/images/logo/skroman.png",
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
    logo: "https://www.tataconsumer.com/brands/foods/tata-sampann/cfa-details/images/tata%20sampan%20logo%20png.png",
    category: "Ad Film",
    tag: "Film",
    ratio: "16:9",
    thumbnail: "https://ik.imagekit.io/mkzeqs9lt/13-10-26/haldi%20thumbnail.png?updatedAt=1791894471499",
    description: "<strong>Tata Sampann – Haldi</strong><br><br><strong>Brand:</strong> Tata Sampann<br><strong>Product:</strong> Turmeric Powder with natural oils<br><strong>Line:</strong> “Har baar, har mausam, Sunehri haldi.”",
    sources: [
      { type: "vimeo", src: "https://player.vimeo.com/video/1235394944" },
      { type: "vimeo", src: "https://player.vimeo.com/video/1235396466" },
    ],
  },
  {
    id: "work-the-reserve-club",
    slug: "the-reserve-club",
    published: { uploadDate: "2026-10-13T12:56:43+05:30", seconds: 62 },
    title: "The Reserve Club",
    logo: "https://www.thereserveclub.in/assets/images/logo/trc-logo.webp",
    category: "Ad Film",
    tag: "Film",
    ratio: "16:9",
    thumbnail: "https://ik.imagekit.io/mkzeqs9lt/13-10-26/2.png?updatedAt=1791894484002",
    description: "<strong>The Reserve Club</strong><br><br><strong>Brand:</strong> The Reserve Club<br><strong>Product:</strong> Gym<br><strong>Line:</strong> Fitness, Redefined",
    sources: [{ type: "vimeo", src: "https://player.vimeo.com/video/1235488798" }],
  },
  {
    id: "work-418",
    title: "#418 – The Last Warning",
    category: "Film / Trailer",
    tag: "YouTube",
    ratio: "16:9",
    thumbnail: "/images/works/418.avif",
    description: "<strong>#418 – Official Trailer (Hindi)</strong><br><br><strong>Presented by:</strong> Prashanth Neel<br><strong>Written &amp; directed by:</strong> Kirtan Nadagouda<br><strong>Production:</strong> Mythri Movie Makers<br><strong>In cinemas:</strong> 23 October 2026",
    sources: [{ type: "youtube", src: "https://youtu.be/SoTw56f1-OA" }],
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
