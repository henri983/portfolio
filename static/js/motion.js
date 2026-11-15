/**
 * Henri Nyame Bouelle - Portfolio Recrutement Ingénieur DevSecOps
 * Filtres de Projets, Gestion du Formulaire Recruteur & Navigation Fluide
 */

document.addEventListener("DOMContentLoaded", () => {
  initProjectFilters();
  initRecruiterForm();
  initSmoothScroll();
});

/**
 * 1. Filtres interactifs par catégorie de projet
 */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll(".tab-filter");
  const projectCards = document.querySelectorAll(".project-card");

  if (!filterBtns.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      projectCards.forEach((card) => {
        const category = card.getAttribute("data-category");
        if (filter === "all" || category === filter) {
          card.style.display = "block";
          card.style.opacity = "1";
        } else {
          card.style.display = "none";
          card.style.opacity = "0";
        }
      });
    });
  });
}

/**
 * 2. Soumission du Formulaire Recruteur
 */
function initRecruiterForm() {
  const form = document.getElementById("recruiter-form");
  const responseDiv = document.getElementById("contact-response");

  if (!form || !responseDiv) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const company = document.getElementById("company").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const submitBtn = form.querySelector("button[type='submit']");

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerText = "Transmission en cours...";
    }

    try {
      const response = await fetch("/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${name} (${company})`,
          email,
          message,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        responseDiv.className = "mt-4 p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs";
        responseDiv.innerHTML = `<strong>Opportunité transmise avec succès !</strong> Merci ${name} (${company}). Henri a bien reçu votre demande et vous recontactera très rapidement à l'adresse ${email}.`;
        responseDiv.classList.remove("hidden");
        form.reset();
      } else {
        throw new Error(data.error || "Erreur de transmission");
      }
    } catch (err) {
      // In static preview mode
      responseDiv.className = "mt-4 p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs";
      responseDiv.innerHTML = `<strong>Message enregistré !</strong> Merci ${name} (${company}). Votre demande a été préparée pour Henri Nyame (${email}).`;
      responseDiv.classList.remove("hidden");
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<span>Transmettre l'opportunité d'entretien</span><span class="font-mono text-xs">→</span>`;
      }
    }
  });
}

/**
 * 3. Défilement fluide des ancres
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}
