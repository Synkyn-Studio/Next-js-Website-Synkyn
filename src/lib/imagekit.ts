
const IK_HOST = "ik.imagekit.io";

export function ikImage(url: string, width: number): string {
  if (!url || !url.includes(IK_HOST) || /[?&]tr=/.test(url)) return url;
  return `${url}${url.includes("?") ? "&" : "?"}tr=w-${width}`;
}

export const IK_CARD = 1200;
export const IK_FULL = 2560;
export const IK_THUMB = 240;
