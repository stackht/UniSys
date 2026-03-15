const root = document.documentElement;
const toggle = document.getElementById("theme-toggle");
const savedTheme = localStorage.getItem("unisys-theme");
if (savedTheme) root.setAttribute("data-theme", savedTheme);
if (toggle) {
  toggle.textContent = root.getAttribute("data-theme") === "light" ? "🌙" : "☀️";
  toggle.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    localStorage.setItem("unisys-theme", next);
    toggle.textContent = next === "light" ? "🌙" : "☀️";
  });
}

// Scroll reveal animations
const revealItems = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
revealItems.forEach((el, i) => {
  el.style.transitionDelay = `${Math.min(i * 60, 360)}ms`;
  observer.observe(el);
});


const tabs = document.querySelectorAll(".pattern-tabs .tab");
const cards = document.querySelectorAll(".pattern-card");
let activeTab = "admissions";
let tabTimer;

const setActiveTab = (tab) => {
  activeTab = tab;
  tabs.forEach((t) => t.classList.toggle("active", t.dataset.tab === tab));
  cards.forEach((c) => {
    const match = c.dataset.tab === tab;
    c.style.opacity = match ? "1" : "0.35";
    c.style.transform = match ? "translateY(0)" : "translateY(8px)";
  });
};

const startAuto = () => {
  const order = ["admissions", "attendance", "exams", "finance", "hr"];
  let idx = order.indexOf(activeTab);
  tabTimer = setInterval(() => {
    idx = (idx + 1) % order.length;
    setActiveTab(order[idx]);
  }, 2600);
};

const stopAuto = () => {
  if (tabTimer) clearInterval(tabTimer);
};

tabs.forEach((tab) => {
  tab.addEventListener("mouseenter", () => { stopAuto(); setActiveTab(tab.dataset.tab); });
  tab.addEventListener("mouseleave", () => { startAuto(); });
  tab.addEventListener("click", () => { stopAuto(); setActiveTab(tab.dataset.tab); startAuto(); });
});

setActiveTab(activeTab);
startAuto();
