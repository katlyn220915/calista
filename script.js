const testimonialsContainer = document.querySelector(".testimonials");
const navigationItems = document.querySelector(".navigation-list");
const sections = document.querySelectorAll("section");

window.addEventListener("load", () => {
  resizeImages();
  navigationItems.addEventListener("click", (e) => {
    e.preventDefault();
    const sectionId = e.target.dataset.section;
    const section = document.getElementById(`section-${sectionId}`);
    section.scrollIntoView({ behavior: "smooth", block: "center" });
  });

  sections.forEach((section) => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const sectionName = entries[0].target.dataset.section;
          const link = document.getElementById(`link-${sectionName}`);
          const lastLink = document.querySelector(".active-item");
          if (lastLink) {
            lastLink.classList.remove("active-item");
          }
          link.classList.add("active-item");
        }
      },
      {
        threshold: 1,
      }
    );
    // 开始监听
    observer.observe(section);
  });
});

function resizeImages() {
  const testimonialsImages = document.querySelectorAll(".testimonials-img");
  testimonialsImages.forEach((image) => {
    const { naturalHeight, naturalWidth } = image;
    const targetWidth = naturalWidth % 400;
    const scalingFactor = targetWidth / naturalWidth;
    const targetHeight = naturalHeight * scalingFactor;
    image.style.width = `${targetWidth / 10}rem`;
    image.style.height = `${targetHeight / 10}rem`;
  });
}

if (!window.matchMedia("(prefers-reduce-motion: reduce").matches) {
  addAnimation();
}

function addAnimation() {
  testimonialsContainer.setAttribute("data-animated", true);
  const gallery = document.querySelector(".testimonials-gallery");
  const galleryContent = Array.from(gallery.children);
  galleryContent.forEach((item) => {
    const duplicatedItem = item.cloneNode(true);
    duplicatedItem.setAttribute("aria-hidden", true);
    gallery.appendChild(duplicatedItem);
  });
}
