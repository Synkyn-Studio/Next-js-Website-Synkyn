export { };

declare global {
  const gsap: any;
  const ScrollTrigger: any;
  const SplitText: any;
  const MotionPathPlugin: any;
  const Lenis: any;
  const Vimeo: any;

  interface Window {
    gsap?: any;
    ScrollTrigger?: any;
    SplitText?: any;
    MotionPathPlugin?: any;
    Lenis?: any;
    Springer?: any;
    Vimeo?: any;
    lenis?: any;
    dataLayer?: unknown[];
    instgrm?: any;
    openVideoModal?: () => void;
    closeVideoModal?: () => void;
    __synkynFX?: boolean;
  }
}
