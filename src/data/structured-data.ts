/* schema.org JSON-LD blocks from each static page's <head> (clean URLs). */

import type { PageKey } from "./seo-meta";

export const STRUCTURED_DATA: Record<PageKey, object[]> = {
  "notFound": [
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": "https://www.synkynstudios.com/#organization",
          "name": "Synkyn Studios",
          "alternateName": [
            "Synkyn Studio",
            "Synkyn"
          ],
          "url": "https://www.synkynstudios.com/",
          "logo": {
            "@type": "ImageObject",
            "@id": "https://www.synkynstudios.com/#logo",
            "url": "https://www.synkynstudios.com/images/logo.png",
            "width": 1200,
            "height": 630
          },
          "description": "Synkyn Studios is an AI-first film and creative production studio in Bengaluru creating commercials, product films, CGI visuals, and social content.",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Bengaluru",
            "addressRegion": "Karnataka",
            "addressCountry": "IN"
          },
          "sameAs": [
            "https://www.instagram.com/synkyn_studios/",
            "https://www.linkedin.com/company/synkynstudios/"
          ]
        },
        {
          "@type": "WebSite",
          "@id": "https://www.synkynstudios.com/#website",
          "url": "https://www.synkynstudios.com/",
          "name": "Synkyn Studios",
          "publisher": {
            "@id": "https://www.synkynstudios.com/#organization"
          },
          "inLanguage": "en"
        }
      ]
    }
  ],
  "home": [
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": [
            "Organization",
            "ProfessionalService"
          ],
          "@id": "https://www.synkynstudios.com/#organization",
          "name": "Synkyn Studios",
          "alternateName": [
            "Synkyn Studio",
            "Synkyn"
          ],
          "url": "https://www.synkynstudios.com/",
          "logo": {
            "@type": "ImageObject",
            "@id": "https://www.synkynstudios.com/#logo",
            "url": "https://www.synkynstudios.com/images/logo.png",
            "contentUrl": "https://www.synkynstudios.com/images/logo.png",
            "caption": "Synkyn Studios Logo"
          },
          "image": "https://www.synkynstudios.com/images/logo.png",
          "description": "An AI-first film and creative production studio in Bengaluru creating commercials, product films, CGI visuals, AI VFX, and social content.",
          "foundingDate": "2023",
          "priceRange": "$$$",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Bengaluru",
            "addressRegion": "Karnataka",
            "addressCountry": "IN"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 12.9716,
            "longitude": 77.5946
          },
          "areaServed": [
            {
              "@type": "Country",
              "name": "India"
            },
            {
              "@type": "Country",
              "name": "United States"
            },
            {
              "@type": "Country",
              "name": "United Kingdom"
            },
            {
              "@type": "Country",
              "name": "United Arab Emirates"
            }
          ],
          "knowsAbout": [
            "AI Film Production",
            "Commercials & Advertising",
            "CGI Visuals & 3D Animation",
            "Generative Video",
            "Set Extension & AI VFX",
            "Creative Direction"
          ],
          "sameAs": [
            "https://www.instagram.com/synkyn_studios/",
            "https://www.linkedin.com/company/synkynstudios/"
          ]
        },
        {
          "@type": "WebSite",
          "@id": "https://www.synkynstudios.com/#website",
          "url": "https://www.synkynstudios.com/",
          "name": "Synkyn Studios",
          "description": "AI Film Studio & Creative Production in Bengaluru",
          "publisher": {
            "@id": "https://www.synkynstudios.com/#organization"
          },
          "potentialAction": {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://www.synkynstudios.com/library?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          },
          "inLanguage": "en-US"
        },
        {
          "@type": "WebPage",
          "@id": "https://www.synkynstudios.com/#webpage",
          "url": "https://www.synkynstudios.com/",
          "name": "Synkyn Studios | AI Film Studio & Creative Production in Bengaluru",
          "isPartOf": {
            "@id": "https://www.synkynstudios.com/#website"
          },
          "about": {
            "@id": "https://www.synkynstudios.com/#organization"
          },
          "primaryImageOfPage": {
            "@id": "https://www.synkynstudios.com/#logo"
          },
          "description": "Synkyn Studios is an AI film studio in Bengaluru creating commercials, product films, CGI visuals, and social media content for modern brands without delays.",
          "inLanguage": "en-US"
        },
        {
          "@type": "VideoObject",
          "@id": "https://www.synkynstudios.com/#showreel",
          "name": "Synkyn Studios SHOWREEL 2026 — AI Film & Creative Production",
          "description": "Synkyn Studios SHOWREEL 2026 highlighting AI-powered commercials, product films, CGI visuals, and cinematic brand storytelling made in Bengaluru, India.",
          "thumbnailUrl": [
            "https://www.synkynstudios.com/images/logo.png"
          ],
          "uploadDate": "2026-01-01T00:00:00+05:30",
          "embedUrl": "https://player.vimeo.com/video/1210886734",
          "publisher": {
            "@id": "https://www.synkynstudios.com/#organization"
          }
        },
        {
          "@type": "SiteNavigationElement",
          "@id": "https://www.synkynstudios.com/#navigation",
          "name": "Primary Navigation",
          "hasPart": [
            {
              "@type": "WebPage",
              "name": "Work Library",
              "description": "Selected AI film, ad, and key-art portfolio",
              "url": "https://www.synkynstudios.com/library"
            },
            {
              "@type": "WebPage",
              "name": "Print Album",
              "description": "Gallery of prints, installations, and key art",
              "url": "https://www.synkynstudios.com/printalbum"
            },
            {
              "@type": "WebPage",
              "name": "About Studio",
              "description": "Our story, founding team, and vision",
              "url": "https://www.synkynstudios.com/about-us"
            },
            {
              "@type": "WebPage",
              "name": "Contact",
              "description": "Get in touch with Synkyn Studios",
              "url": "https://www.synkynstudios.com/contact"
            },
            {
              "@type": "WebPage",
              "name": "Terms & Conditions",
              "description": "Terms and conditions of service",
              "url": "https://www.synkynstudios.com/terms"
            }
          ]
        }
      ]
    }
  ],
  "about": [
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": "https://www.synkynstudios.com/#organization",
          "name": "Synkyn Studios",
          "alternateName": [
            "Synkyn Studio",
            "Synkyn"
          ],
          "url": "https://www.synkynstudios.com/",
          "logo": {
            "@type": "ImageObject",
            "@id": "https://www.synkynstudios.com/#logo",
            "url": "https://www.synkynstudios.com/images/logo.png",
            "width": 1200,
            "height": 630
          },
          "description": "Synkyn Studios is a cinematic, AI-first creative studio based in Bengaluru, India, producing commercials, product films, CGI visuals, key art, and social content for brands that want a premium look without slow production timelines.",
          "foundingDate": "2023",
          "industry": "Creative Production / Advertising",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Bengaluru",
            "addressRegion": "Karnataka",
            "addressCountry": "IN"
          },
          "knowsAbout": [
            "AI film production",
            "Generative video",
            "CGI visuals",
            "Brand films",
            "Commercials",
            "Key art",
            "Social content"
          ],
          "sameAs": [
            "https://www.instagram.com/synkyn_studios/",
            "https://www.linkedin.com/company/synkynstudios/"
          ],
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "sales",
            "url": "https://www.synkynstudios.com/contact",
            "availableLanguage": "English"
          }
        },
        {
          "@type": "WebSite",
          "@id": "https://www.synkynstudios.com/#website",
          "url": "https://www.synkynstudios.com/",
          "name": "Synkyn Studios",
          "description": "A cinematic, AI-first creative studio producing commercials, product films, CGI, and social content for brands.",
          "publisher": {
            "@id": "https://www.synkynstudios.com/#organization"
          },
          "inLanguage": "en"
        },
        {
          "@type": "AboutPage",
          "@id": "https://www.synkynstudios.com/about-us#aboutpage",
          "url": "https://www.synkynstudios.com/about-us",
          "name": "About Synkyn Studios | AI Film Studio in Bengaluru",
          "description": "About Synkyn Studios — an AI-first film and creative production studio in Bengaluru creating commercials, product films, CGI visuals, and social content for modern brands.",
          "isPartOf": {
            "@id": "https://www.synkynstudios.com/#website"
          },
          "about": {
            "@id": "https://www.synkynstudios.com/#organization"
          },
          "inLanguage": "en"
        },
        {
          "@type": "BreadcrumbList",
          "@id": "https://www.synkynstudios.com/about-us#breadcrumb",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://www.synkynstudios.com/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "About Us",
              "item": "https://www.synkynstudios.com/about-us"
            }
          ]
        }
      ]
    }
  ],
  "library": [
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": "https://www.synkynstudios.com/#organization",
          "name": "Synkyn Studios",
          "alternateName": [
            "Synkyn Studio",
            "Synkyn"
          ],
          "url": "https://www.synkynstudios.com/",
          "logo": {
            "@type": "ImageObject",
            "@id": "https://www.synkynstudios.com/#logo",
            "url": "https://www.synkynstudios.com/images/logo.png",
            "width": 1200,
            "height": 630
          },
          "description": "Synkyn Studios is an AI-first film and creative production studio in Bengaluru creating commercials, product films, CGI visuals, and social content.",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Bengaluru",
            "addressRegion": "Karnataka",
            "addressCountry": "IN"
          },
          "sameAs": [
            "https://www.instagram.com/synkyn_studios/",
            "https://www.linkedin.com/company/synkynstudios/"
          ]
        },
        {
          "@type": "WebSite",
          "@id": "https://www.synkynstudios.com/#website",
          "url": "https://www.synkynstudios.com/",
          "name": "Synkyn Studios",
          "publisher": {
            "@id": "https://www.synkynstudios.com/#organization"
          },
          "inLanguage": "en"
        },
        {
          "@type": "CollectionPage",
          "@id": "https://www.synkynstudios.com/library#collectionpage",
          "url": "https://www.synkynstudios.com/library",
          "name": "Synkyn Studios | Library — AI Film & Creative Portfolio",
          "description": "Explore Synkyn Studios' curated library of AI films, commercials, CGI visuals, and key-art works directed with a filmmaker's eye in Bengaluru, India.",
          "isPartOf": {
            "@id": "https://www.synkynstudios.com/#website"
          },
          "about": {
            "@id": "https://www.synkynstudios.com/#organization"
          },
          "inLanguage": "en"
        },
        {
          "@type": "BreadcrumbList",
          "@id": "https://www.synkynstudios.com/library#breadcrumb",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://www.synkynstudios.com/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Library",
              "item": "https://www.synkynstudios.com/library"
            }
          ]
        }
      ]
    }
  ],
  "contact": [
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": "https://www.synkynstudios.com/#organization",
          "name": "Synkyn Studios",
          "alternateName": [
            "Synkyn Studio",
            "Synkyn"
          ],
          "url": "https://www.synkynstudios.com/",
          "logo": {
            "@type": "ImageObject",
            "@id": "https://www.synkynstudios.com/#logo",
            "url": "https://www.synkynstudios.com/images/logo.png",
            "width": 1200,
            "height": 630
          },
          "description": "Synkyn Studios is a cinematic, AI-first creative studio in Bengaluru, India creating commercials, product films, CGI visuals, and social content.",
          "foundingDate": "2023",
          "industry": "Creative Production / Film & AI",
          "sameAs": [
            "https://www.instagram.com/synkyn_studios/",
            "https://www.linkedin.com/company/synkynstudios/"
          ],
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer service",
            "email": "contact@synkynstudios.com",
            "url": "https://www.synkynstudios.com/contact",
            "availableLanguage": "English"
          }
        },
        {
          "@type": "ContactPage",
          "@id": "https://www.synkynstudios.com/contact#webpage",
          "url": "https://www.synkynstudios.com/contact",
          "name": "Contact Synkyn Studios | AI Film Studio in Bengaluru",
          "description": "Get in touch with Synkyn Studios — an AI-first film and creative production studio in Bengaluru for commercials, product films, CGI visuals, and social content.",
          "isPartOf": {
            "@id": "https://www.synkynstudios.com/#website"
          },
          "about": {
            "@id": "https://www.synkynstudios.com/#organization"
          },
          "inLanguage": "en"
        },
        {
          "@type": "BreadcrumbList",
          "@id": "https://www.synkynstudios.com/contact#breadcrumb",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://www.synkynstudios.com/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Contact",
              "item": "https://www.synkynstudios.com/contact"
            }
          ]
        },
        {
          "@type": "LocalBusiness",
          "@id": "https://www.synkynstudios.com/#localbusiness",
          "name": "Synkyn Studios",
          "image": "https://www.synkynstudios.com/images/logo.png",
          "url": "https://www.synkynstudios.com/contact",
          "logo": "https://www.synkynstudios.com/images/logo.png",
          "description": "AI-first film and creative production studio in Bengaluru producing commercials, product films, CGI visuals, and social content.",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Bengaluru",
            "addressRegion": "Karnataka",
            "postalCode": "560001",
            "addressCountry": "IN"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 12.9716,
            "longitude": 77.5946
          },
          "openingHoursSpecification": [
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday"
              ],
              "opens": "09:00",
              "closes": "18:00"
            }
          ],
          "sameAs": [
            "https://www.instagram.com/synkyn_studios/",
            "https://www.linkedin.com/company/synkynstudios/"
          ]
        },
        {
          "@type": "WebSite",
          "@id": "https://www.synkynstudios.com/#website",
          "url": "https://www.synkynstudios.com/",
          "name": "Synkyn Studios",
          "publisher": {
            "@id": "https://www.synkynstudios.com/#organization"
          },
          "inLanguage": "en"
        }
      ]
    }
  ],
  "printAlbum": [
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": "https://www.synkynstudios.com/#organization",
          "name": "Synkyn Studios",
          "alternateName": [
            "Synkyn Studio",
            "Synkyn"
          ],
          "url": "https://www.synkynstudios.com/",
          "logo": {
            "@type": "ImageObject",
            "@id": "https://www.synkynstudios.com/#logo",
            "url": "https://www.synkynstudios.com/images/logo.png",
            "width": 1200,
            "height": 630
          },
          "description": "Synkyn Studios is an AI-first film and creative production studio in Bengaluru creating commercials, product films, CGI visuals, and social content.",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Bengaluru",
            "addressRegion": "Karnataka",
            "addressCountry": "IN"
          },
          "sameAs": [
            "https://www.instagram.com/synkyn_studios/",
            "https://www.linkedin.com/company/synkynstudios/"
          ]
        },
        {
          "@type": "WebSite",
          "@id": "https://www.synkynstudios.com/#website",
          "url": "https://www.synkynstudios.com/",
          "name": "Synkyn Studios",
          "publisher": {
            "@id": "https://www.synkynstudios.com/#organization"
          },
          "inLanguage": "en"
        },
        {
          "@type": "CollectionPage",
          "@id": "https://www.synkynstudios.com/printalbum#collectionpage",
          "url": "https://www.synkynstudios.com/printalbum",
          "name": "Synkyn Studios | Prints & Creative Works Album",
          "description": "A premium gallery of completed AI works, prints, key art, and creative visual installations by Synkyn Studios. Made in Bengaluru, India.",
          "isPartOf": {
            "@id": "https://www.synkynstudios.com/#website"
          },
          "about": {
            "@id": "https://www.synkynstudios.com/#organization"
          },
          "inLanguage": "en"
        },
        {
          "@type": "BreadcrumbList",
          "@id": "https://www.synkynstudios.com/printalbum#breadcrumb",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://www.synkynstudios.com/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Print Album",
              "item": "https://www.synkynstudios.com/printalbum"
            }
          ]
        }
      ]
    }
  ],
  "terms": [
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": "https://www.synkynstudios.com/#organization",
          "name": "Synkyn Studios",
          "alternateName": [
            "Synkyn Studio",
            "Synkyn"
          ],
          "url": "https://www.synkynstudios.com/",
          "logo": {
            "@type": "ImageObject",
            "@id": "https://www.synkynstudios.com/#logo",
            "url": "https://www.synkynstudios.com/images/logo.png",
            "width": 1200,
            "height": 630
          },
          "description": "Synkyn Studios is an AI-first film and creative production studio in Bengaluru creating commercials, product films, CGI visuals, and social content.",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Bengaluru",
            "addressRegion": "Karnataka",
            "addressCountry": "IN"
          },
          "sameAs": [
            "https://www.instagram.com/synkyn_studios/",
            "https://www.linkedin.com/company/synkynstudios/"
          ]
        },
        {
          "@type": "WebSite",
          "@id": "https://www.synkynstudios.com/#website",
          "url": "https://www.synkynstudios.com/",
          "name": "Synkyn Studios",
          "publisher": {
            "@id": "https://www.synkynstudios.com/#organization"
          },
          "inLanguage": "en"
        },
        {
          "@type": "WebPage",
          "@id": "https://www.synkynstudios.com/terms#webpage",
          "url": "https://www.synkynstudios.com/terms",
          "name": "Synkyn Studios | Terms & Conditions",
          "description": "The Terms & Conditions governing the use of Synkyn Studios website and AI-native production services.",
          "isPartOf": {
            "@id": "https://www.synkynstudios.com/#website"
          },
          "about": {
            "@id": "https://www.synkynstudios.com/#organization"
          },
          "inLanguage": "en"
        },
        {
          "@type": "BreadcrumbList",
          "@id": "https://www.synkynstudios.com/terms#breadcrumb",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://www.synkynstudios.com/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Terms & Conditions",
              "item": "https://www.synkynstudios.com/terms"
            }
          ]
        }
      ]
    }
  ]
};
