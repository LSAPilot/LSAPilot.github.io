
const nav = document.querySelector("#nav");

const onScroll = () => {
  let scrollPosition = window.pageYOffset;

    nav.classList.toggle("scrolled-down", scrollPosition>56);
};

document.addEventListener("scroll", onScroll, {passive: true})


gsap.registerPlugin(ScrollTrigger);

const sections = gsap.utils.toArray(".panel"),
container = document.querySelector(".container");

gsap.to(sections, {
  xPercent: -100 * (sections.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: ".container",
    pin: true,
    scrub: 1,
    snap: 1 / (sections.length - 1),
    end: () => "+=" + container.offsetWidth,
  },
});
