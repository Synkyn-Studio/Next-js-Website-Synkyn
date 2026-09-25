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
}

export const WORKS: Work[] = [
  {
    id: "work-ig-1",
    title: "Skroman Smart Switches",
    category: "reels",
    tag: "Reels",
    ratio: "9:16",
    thumbnail: "https://ik.imagekit.io/mkzeqs9lt/For-Website-Synkyn/For%20Album/Album%20Covers/hf_20260621_211115_a8ae6a61-15eb-4fcd-a87e-8b37d91256cf.png?updatedAt=1784388403481",
    description: "Your home should be as smart as your smartphone ✨<br><br>Imagine controlling your lights, security, curtains & appliances with just one tap or voice command.<br><br>Welcome to the future with Skroman Smart Home Automation.<br><br>🔥 Smart Lighting<br>🔐 Advanced Home Security<br>🎙 Voice & App Control<br>⚡ Energy Saving Automation<br>🏠 Luxury Smart Living Experience<br><br>Turn your ordinary home into an intelligent lifestyle.<br><br>Comfort. Security. Convenience. All automated.",
    sources: [{ type: "vimeo", src: "https://player.vimeo.com/video/1211043365" }],
  },
  {
    id: "work-dragon",
    title: "Dragon",
    category: "Dragon Glimpse",
    tag: "Youtube",
    ratio: "16:9",
    description: "<strong>Dragon Glimpse – Telugu</strong><br><br><strong>Featuring:</strong> NTR, Anil Kapoor & Rukmini Vasanth<br><strong>Music:</strong> Ravi Basrur<br><strong>Directed by:</strong> Prashanth Neel",
    sources: [{ type: "youtube", src: "https://youtu.be/FlOzIM7Yov4?si=pdGIj50dAFhKnGQ5" }],
  },
  {
    id: "work-nbk111",
    title: "NBK111",
    category: "NBK111 Glimpse",
    tag: "YouTube",
    description: "<strong>NBK 111 – Entry of an Era</strong><br><br><strong>Starring:</strong> Nandamuri Balakrishna<br><strong>Directed by:</strong> Gopichand Malineni<br><strong>Cinematography:</strong> Arvind S. Kashyap<br><strong>Music:</strong> S. Thaman<br><strong>Production:</strong> Vriddhi Cinemas",
    sources: [{ type: "youtube", src: "https://youtu.be/3u_wE0ocFus?si=JHUwwCjkXAab_VFG" }],
  },
  {
    id: "work-camel-2",
    title: "Camel",
    category: "Crayons",
    tag: "Film",
    thumbnail: "https://ik.imagekit.io/mkzeqs9lt/For-Website-Synkyn/For%20Album/Album%20Covers/hf_20260303_194843_2dc8f410-cfc2-417f-9dbd-b15e9bdd28c6.png?updatedAt=1784389455208",
    description: "<strong>Camel – Spec AI Film</strong><br><br><strong>Concept:</strong> Reimagining the world of Camel Crayons through AI-driven visual storytelling.",
    sources: [{ type: "vimeo", src: "https://player.vimeo.com/video/1208876567" }],
  },
  {
    id: "work-tata-sampann",
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
    title: "RedBus",
    category: "Ad Film",
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
    title: "skroman automation",
    category: "Ad Film",
    tag: "Insta",
    thumbnail: "https://ik.imagekit.io/mkzeqs9lt/For-Website-Synkyn/skorman_web.png",
    description: "<strong>Skroman Smart Home Automation</strong><br><br><strong>Concept:</strong> Intelligent living, reimagined.<br><strong>Focus:</strong> Smart lighting · Home security · Voice & App Control · Energy Automation<br><br><strong>Experience:</strong> A sleek lifestyle film showcasing the seamless intersection of technology, comfort and modern living.",
    sources: [{ type: "instagram", src: "https://www.instagram.com/reel/DZCmDTOhcIK/" }],
  },
];

/*
  The row of three 16:9 videos under the bento grid (LibraryWorks.tsx).
  Fill in each entry:
    - title / category / description: text on the card and in the modal
      (description is HTML, like the works above).
    - thumbnail: the card's cover image URL.
    - sources[0].src: the video URL. `type` is "vimeo" for a
      player.vimeo.com/video/<id> link; use "youtube" for a YouTube link or
      "video" for a direct .mp4 file.
  A card with no video URL shows an empty placeholder and does not open.
*/
export const WORKS_ROW: Work[] = [
  {
    id: "work-red-bus",
    title: "RedBus",
    category: "Ad Film",
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
    id: "work-row-2",
    title: "",
    category: "",
    tag: "Film",
    ratio: "16:9",
    thumbnail: "",
    description: "",
    sources: [{ type: "vimeo", src: "" }],
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

/** Every card on the Library page: the bento grid, then the row under it. */
export const ALL_WORKS: Work[] = [...WORKS, ...WORKS_ROW];

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
