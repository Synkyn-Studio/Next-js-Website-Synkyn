/* Print Album projects (previously the `projects` array inside printalbum.html). */

export interface PrintProject {
  id: string;
  title: string;
  category: string;
  description: string;
  featured?: boolean;
  /** Width / height of the cover, used by the justified-row gallery. */
  aspectRatio: number;
  images: string[];
}

export const PRINT_PROJECTS: PrintProject[] = [
  {
    "id": "project-1",
    "title": "Zlade",
    "category": "Grooming",
    "description": "A bold print campaign for Zlade – a men’s grooming brand that blends sharp design with clean formulas. Through striking visuals and a confident tone, we capture the essence of precision, performance, and modern self-care.",
    "featured": true,
    "aspectRatio": 2.33,
    "images": [
      "https://ik.imagekit.io/mkzeqs9lt/For-Website-Synkyn/Prints/Zlade_horizontal.png",
      "https://ik.imagekit.io/mkzeqs9lt/For-Website-Synkyn/Prints/hf_20260704_062814_0edf2927-4afc-4ffa-801d-5803824143c6.png",
      "https://ik.imagekit.io/mkzeqs9lt/For-Website-Synkyn/Prints/hf_20260706_110951_2529f6dd-cc1b-4900-aece-190f51613453.png",
      "https://ik.imagekit.io/mkzeqs9lt/For-Website-Synkyn/Prints/hf_20260706_114824_431b8ca4-2b51-4fde-b83a-7eb9779ea840.png",
      "https://ik.imagekit.io/mkzeqs9lt/For-Website-Synkyn/Prints/Zlade/6.png?updatedAt=1783525136871"
    ]
  },
  {
    "id": "project-8",
    "title": "Dot & Key",
    "category": "Skincare",
    "description": "A curated selection of print materials for Dot & Key, where every layout tells a story of radiance and care.",
    "featured": true,
    "aspectRatio": 0.8,
    "images": [
      "https://ik.imagekit.io/mkzeqs9lt/For-Website-Synkyn/Prints/Dot%20&%20Key/10515238-fdec-4a88-8ecd-ffcef3a5eadd.JPG?updatedAt=1784389349017",
      "https://ik.imagekit.io/mkzeqs9lt/For-Website-Synkyn/Prints/Dot%20&%20Key/cc8134ce-3885-4671-9197-fb5bc4694693.JPG?updatedAt=1784389348237",
      "https://ik.imagekit.io/mkzeqs9lt/For-Website-Synkyn/Prints/Dot%20&%20Key/hf_20260225_192508_24987b5c-45f2-430f-a659-ce377b43ba38.JPEG?updatedAt=1784389349501"
    ]
  },
  {
    "id": "project-3",
    "title": "Porter",
    "category": "Delivery",
    "description": "A high-end product catalogue for Porter, India’s leading on-demand logistics platform. Designed to communicate speed, reliability, and efficiency through bold layouts and precision-driven graphics.",
    "featured": true,
    "aspectRatio": 0.8,
    "images": [
      "https://ik.imagekit.io/mkzeqs9lt/For-Website-Synkyn/Prints/Porter/11.png?updatedAt=1783525203490",
      "https://ik.imagekit.io/mkzeqs9lt/For-Website-Synkyn/Prints/Porter/10.png?updatedAt=1783525203309",
      "https://ik.imagekit.io/mkzeqs9lt/For-Website-Synkyn/Prints/Porter/12.png?updatedAt=1783525202054"
    ]
  },
  {
    "id": "project-4",
    "title": "Visa",
    "category": "Cards",
    "description": "Premium metallic Visa credit cards with custom die-cut, foil stamping, and lenticular printing, designed for luxury banking clients.",
    "featured": true,
    "aspectRatio": 2.33,
    "images": [
      "https://ik.imagekit.io/mkzeqs9lt/For-Website-Synkyn/Prints/Visa/212221.png?updatedAt=1783514163848",
      "https://ik.imagekit.io/mkzeqs9lt/For-Website-Synkyn/Prints/Visa/visa1.png?updatedAt=1783525383204",
      "https://ik.imagekit.io/mkzeqs9lt/For-Website-Synkyn/Prints/Visa/15.png?updatedAt=1783537581123",
      "https://ik.imagekit.io/mkzeqs9lt/For-Website-Synkyn/Prints/Visa/16.png?updatedAt=1783537581053",
      "https://ik.imagekit.io/mkzeqs9lt/For-Website-Synkyn/Prints/Visa/visa4.png?updatedAt=1783544356080"
    ]
  },
  {
    "id": "project-5",
    "title": "Comet",
    "category": "Shoes",
    "description": "A premium print catalogue for Comet, featuring bold, editorial layouts and dynamic product spreads that bring the brand’s energetic identity to life.",
    "featured": true,
    "aspectRatio": 2.33,
    "images": [
      "https://ik.imagekit.io/mkzeqs9lt/For-Website-Synkyn/Prints/Comet/10.png?updatedAt=1783513871971",
      "https://ik.imagekit.io/mkzeqs9lt/For-Website-Synkyn/Prints/Comet/2.png?updatedAt=1783514672985",
      "https://ik.imagekit.io/mkzeqs9lt/For-Website-Synkyn/Prints/Comet/3.png?updatedAt=1783514673418",
      "https://ik.imagekit.io/mkzeqs9lt/For-Website-Synkyn/Prints/Comet/1.png?updatedAt=1783514673680"
    ]
  },
  {
    "id": "project-6",
    "title": "Volkswagen Taigun",
    "category": "Car",
    "description": "The Taigun Print Catalogue: where bold typography meets automotive excellence. Every page is designed to reflect the car’s dynamic performance and sophisticated design.",
    "aspectRatio": 2.33,
    "images": [
      "https://ik.imagekit.io/mkzeqs9lt/For-Website-Synkyn/Prints/Volkswagon%20Taigun/hf_20260711_180154_abe9bd6c-02f9-4458-83ad-d405b29509e1.png?updatedAt=1784389999938",
      "https://ik.imagekit.io/mkzeqs9lt/For-Website-Synkyn/Prints/Volkswagon%20Taigun/hf_20260711_175607_87c650d5-f2e7-46da-aaf8-1fafe3e3639f.png?updatedAt=1784390000259",
      "https://ik.imagekit.io/mkzeqs9lt/For-Website-Synkyn/Prints/Volkswagon%20Taigun/hf_20260711_185629_d992f8f7-386e-408d-b0b0-30e5b9dd0bbb.png?updatedAt=1784389996289"
    ]
  },
  {
    "id": "project-7",
    "title": "Yonex",
    "category": "Sports",
    "description": "The Yonex Print Catalogue: A dynamic blend of high-octane visuals and precision typography, designed to reflect the precision and energy of the sport.",
    "aspectRatio": 0.8,
    "images": [
      "https://ik.imagekit.io/mkzeqs9lt/For-Website-Synkyn/Prints/Yonex/yonext.png?updatedAt=1784389326671"
    ]
  },
  {
    "id": "project-2",
    "title": "Skroman",
    "category": "Smart Home",
    "description": "Magnific: A premium vertical product catalogue designed for Skroman Smart Home systems, presenting next-generation automation panels and switches in an elegant print layout.",
    "aspectRatio": 0.8,
    "images": [
      "https://ik.imagekit.io/mkzeqs9lt/For-Website-Synkyn/Prints/Skroman/el02.png?updatedAt=1783594290438",
      "https://ik.imagekit.io/mkzeqs9lt/For-Website-Synkyn/Prints/Skroman/el01.png?updatedAt=1783594290985",
      "https://ik.imagekit.io/mkzeqs9lt/For-Website-Synkyn/Prints/Skroman/magnific_a-premium-product-catalog_kLI2XdZ16B.png?updatedAt=1783594309942",
      "https://ik.imagekit.io/mkzeqs9lt/For-Website-Synkyn/Prints/Skroman/el03.png?updatedAt=1783594290771",
      "https://ik.imagekit.io/mkzeqs9lt/For-Website-Synkyn/Prints/Skroman/magnific_a-premium-product-catalog_74Hp49HJAL.png?updatedAt=1783594310051",
      "https://ik.imagekit.io/mkzeqs9lt/For-Website-Synkyn/Prints/Skroman/magnific__a-premium-product-catalogue-post-vertical-45-compo__26798.png?updatedAt=1783594319873",
      "https://ik.imagekit.io/mkzeqs9lt/For-Website-Synkyn/Prints/Skroman/magnific_a-premium-product-catalog_fFTyRWjCDY.png?updatedAt=1783594310078",
      "https://ik.imagekit.io/mkzeqs9lt/For-Website-Synkyn/Prints/Skroman/magnific_a-premium-product-catalog_1stz7qhr4r.png?updatedAt=1783594310336",
      "https://ik.imagekit.io/mkzeqs9lt/For-Website-Synkyn/Prints/Skroman/k12pro.png?updatedAt=1783594290518"
    ]
  }
];
