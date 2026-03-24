const form = document.getElementById("lead-form");
const note = document.getElementById("form-note");
const tabsRoot = document.querySelector("[data-tabs]");

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const name = String(formData.get("name") || "").trim();

  note.textContent = name
    ? `Спасибо, ${name}! Заявка принята, скоро свяжемся.`
    : "Спасибо! Заявка принята, скоро свяжемся.";

  form.reset();
});

if (tabsRoot) {
  const buttons = tabsRoot.querySelectorAll("[data-tab-button]");
  const panels = tabsRoot.querySelectorAll("[data-tab-panel]");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const key = button.getAttribute("data-tab-button");
      if (!key) return;

      buttons.forEach((item) => {
        item.classList.remove("is-active");
        item.setAttribute("aria-selected", "false");
      });

      panels.forEach((panel) => {
        const isMatch = panel.getAttribute("data-tab-panel") === key;
        panel.classList.toggle("is-active", isMatch);
        panel.hidden = !isMatch;
      });

      button.classList.add("is-active");
      button.setAttribute("aria-selected", "true");
    });
  });
}
