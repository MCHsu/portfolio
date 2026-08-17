import { useEffect, useState } from "react";

type UseActiveSectionOptions = {
  /** Viewport height ratio used as the scroll-spy activation line. */
  offsetRatio?: number;
};

function getActiveFromScroll(
  ids: readonly string[],
  offsetRatio: number,
  fallback: string,
) {
  const offset = window.innerHeight * offsetRatio;
  let active = fallback;

  for (const id of ids) {
    const element = document.getElementById(id);
    if (!element) continue;
    if (element.getBoundingClientRect().top <= offset) {
      active = id;
    }
  }

  return active;
}

export function useActiveSection(
  ids: readonly string[],
  initial = ids[0] ?? "",
  options: UseActiveSectionOptions = {},
) {
  const { offsetRatio = 0.25 } = options;
  const [active, setActive] = useState(initial);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      setActive(getActiveFromScroll(ids, offsetRatio, initial));
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, [ids.join(","), offsetRatio, initial]);

  return active;
}
