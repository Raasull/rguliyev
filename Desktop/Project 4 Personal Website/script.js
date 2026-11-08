const revealTargets = document.querySelectorAll("[data-reveal]");
const siteHeader = document.querySelector(".site-header");

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".site-nav").forEach((nav) => {
    const pill = nav.querySelector(".nav-pill");
    const links = nav.querySelectorAll(".nav-link");
    const activeLink = nav.querySelector(".nav-link.active");
    let hoveredLink = null;

    if (!pill || !activeLink) {
      return;
    }

    function movePill(target) {
      if (!target) return;
      pill.style.width = `${target.offsetWidth}px`;
      pill.style.transform = `translateX(${target.offsetLeft}px)`;
    }

    pill.style.transition = "none";
    movePill(activeLink);
    pill.getBoundingClientRect();
    pill.style.removeProperty("transition");
    nav.classList.add("is-ready");

    const updatePill = () => movePill(hoveredLink || activeLink);

    links.forEach((link) => {
      link.addEventListener("pointerenter", () => {
        hoveredLink = link;
        movePill(link);
      });
      link.addEventListener("click", () => {
        hoveredLink = link;
        movePill(link);
      });
    });

    nav.addEventListener("pointerleave", () => {
      hoveredLink = nav.contains(document.activeElement) && document.activeElement instanceof HTMLAnchorElement
        ? document.activeElement
        : null;
      updatePill();
    });

    nav.addEventListener("focusin", (event) => {
      if (event.target instanceof HTMLAnchorElement) {
        hoveredLink = event.target;
        movePill(event.target);
      }
    });

    nav.addEventListener("focusout", (event) => {
      if (!nav.contains(event.relatedTarget)) {
        hoveredLink = null;
        updatePill();
      }
    });

    window.addEventListener("resize", updatePill);
  });
});

if (siteHeader) {
  const updateHeader = () => {
    siteHeader.classList.toggle("is-scrolled", window.scrollY > 8);
  };

  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();
}

if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -32px 0px"
  });

  document.documentElement.classList.add("reveal-ready");
  revealTargets.forEach((target) => revealObserver.observe(target));
}

document.querySelectorAll("[data-quest]").forEach((quest) => {
  const items = quest.querySelectorAll("[data-quest-item]");
  const progress = quest.querySelector("[data-quest-progress]");
  const status = quest.querySelector("[data-quest-status]");
  const completion = quest.querySelector("[data-quest-complete]");
  const discovered = new Set();

  items.forEach((item) => {
    item.addEventListener("toggle", () => {
      if (!item.open || discovered.has(item)) {
        return;
      }

      discovered.add(item);
      progress.value = discovered.size;

      if (discovered.size === items.length) {
        status.textContent = `All ${items.length} field notes discovered.`;
        completion.hidden = false;
        return;
      }

      status.textContent = `${discovered.size} of ${items.length} field notes discovered.`;
    });
  });
});
