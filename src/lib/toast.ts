/* Small status toast (styles: .sk-toast in public/assets/navbar.css). */

let timer: number | undefined;

export function toast(message: string) {
  let el = document.getElementById("sk-toast");
  if (!el) {
    el = document.createElement("div");
    el.id = "sk-toast";
    el.className = "sk-toast";
    el.setAttribute("role", "status");
    el.setAttribute("aria-live", "polite");
    document.body.appendChild(el);
  }
  el.textContent = message;
  // Restart the entrance if a second toast lands while one is still showing.
  el.classList.remove("is-visible");
  void el.offsetWidth;
  el.classList.add("is-visible");
  window.clearTimeout(timer);
  timer = window.setTimeout(() => el?.classList.remove("is-visible"), 2600);
}

/** Copies text to the clipboard, falling back to execCommand where the API is unavailable. */
export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.cssText = "position:fixed;top:0;left:0;opacity:0;pointer-events:none";
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try { ok = document.execCommand("copy"); } catch { /* unsupported */ }
    ta.remove();
    return ok;
  }
}
