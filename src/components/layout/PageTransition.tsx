import { type ReactNode, ViewTransition } from "react";

/*
  Route cross-fade. Wraps each page's <main> (not the layout: layouts persist
  across navigations, so enter/exit would never fire there). The old page fades
  out and the new one fades up; the header and other fixed chrome sit outside
  it and stay put. The animations are defined in layout.tsx (PAGE_TRANSITION_CSS).
  Browsers without the View Transitions API simply navigate without it.
*/
export default function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
      {children}
    </ViewTransition>
  );
}
