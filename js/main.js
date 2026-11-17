/**
 * Sandra Premkumar - Portfolio Website
 * Pure Vanilla JavaScript (No frameworks, high performance)
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. STICKY HEADER SCROLL EFFECT
  const header = document.querySelector(".site-header");
  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };
  window.addEventListener("scroll", handleScroll);
  handleScroll();

  // 2. MOBILE HAMBURGER MENU
  const mobileToggle = document.querySelector(".mobile-toggle");
  const mobileDrawer = document.querySelector(".mobile-nav-drawer");
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener("click", () => {
      mobileDrawer.classList.toggle("open");
    });

    mobileDrawer.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mobileDrawer.classList.remove("open");
      });
    });
  }

  // 3. SKILLS CATEGORY FILTER
  const skillFilterPills = document.querySelectorAll(".filter-pill[data-skill-filter]");
  const skillCards = document.querySelectorAll(".skill-box-card");

  skillFilterPills.forEach(pill => {
    pill.addEventListener("click", () => {
      skillFilterPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");

      const filterVal = pill.getAttribute("data-skill-filter");
      skillCards.forEach(card => {
        const cat = card.getAttribute("data-category");
        if (filterVal === "all" || cat === filterVal) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // 4. PROJECTS CATEGORY FILTER
  const projectFilterPills = document.querySelectorAll(".filter-pill[data-project-filter]");
  const projectCards = document.querySelectorAll(".project-card");

  projectFilterPills.forEach(pill => {
    pill.addEventListener("click", () => {
      projectFilterPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");

      const filterVal = pill.getAttribute("data-project-filter");
      projectCards.forEach(card => {
        const cat = card.getAttribute("data-project-category");
        if (filterVal === "all" || cat === filterVal) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // 5. PROJECT DETAILS MODAL DATA & HANDLER
  const projectDataMap = {
    "ai-diet": {
      title: "AI Diet Plan Management System",
      category: "AI & Full-Stack Web Application",
      image: "images/work/work-diet.svg",
      description: "Developed a web-based healthcare application that generates personalized diet recommendations using Gemini AI based on users' health profiles, fitness goals, and food allergies.",
      highlights: [
        "Integrated AI-generated 7-day personalized diet plans with meal schedules and nutritional recommendations.",
        "Enabled diet consultants to review, modify, and approve AI-generated diet plans before sharing them with users.",
        "Implemented interactive dashboard tracking calorie targets, macronutrients, and food allergy constraints.",
        "Engineered full frontend interfaces using HTML5, CSS3, JavaScript, and Bootstrap with Laravel backend."
      ],
      technologies: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "PHP", "Laravel", "MySQL", "Gemini AI"],
      client: "AI Healthcare & Nutrition Project"
    },
    "carelink": {
      title: "Carelink — Main Healthcare Project",
      category: "Full-Stack Web Platform (Python Django)",
      image: "images/work/work-carelink.svg",
      description: "Developed a comprehensive web application for booking medical devices and home nurse services, with an integrated product purchasing platform.",
      highlights: [
        "Successfully completed as capstone project during Project Trainee internship at Luminar Technohub Pvt. Ltd.",
        "Developed full frontend using HTML, CSS, and JavaScript with Python Django backend.",
        "Engineered home nurse appointment scheduling with specialization filters.",
        "Implemented secure medical device product catalog, order workflows, and MySQL relational database management."
      ],
      technologies: ["HTML5", "CSS3", "JavaScript", "Python", "Django", "MySQL"],
      client: "Luminar Technohub Academic Project"
    },
    "salon-spa": {
      title: "Salon and Spa Web Application",
      category: "PHP & MySQL Web Application",
      image: "images/work/work-salon.svg",
      description: "Built a complete Salon and Spa web application as an intensive hands-on practical project during a 3-month web application training program at G-TEC Computer Education.",
      highlights: [
        "Completed a 3-month practical training program focused on web application development.",
        "Developed responsive frontend user interfaces using HTML, CSS, and JavaScript.",
        "Implemented backend server-side logic and relational database management using PHP and MySQL.",
        "Gained practical experience in designing, testing, and managing web-based applications."
      ],
      technologies: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL"],
      client: "G-TEC Computer Education Project"
    }
  };

  const modalOverlay = document.getElementById("projectModal");
  const modalCloseBtn = document.getElementById("modalCloseBtn");
  const modalCategory = document.getElementById("modalCategory");
  const modalTitle = document.getElementById("modalTitle");
  const modalImage = document.getElementById("modalImage");
  const modalDesc = document.getElementById("modalDesc");
  const modalHighlights = document.getElementById("modalHighlights");
  const modalTechStack = document.getElementById("modalTechStack");
  const modalClient = document.getElementById("modalClient");

  const openProjectModal = (projectId) => {
    const data = projectDataMap[projectId];
    if (!data) return;

    modalCategory.textContent = data.category;
    modalTitle.textContent = data.title;
    modalImage.src = data.image;
    modalImage.alt = data.title;
    modalDesc.textContent = data.description;
    modalClient.textContent = "Context: " + data.client;

    // Highlights list
    modalHighlights.innerHTML = "";
    data.highlights.forEach(h => {
      const li = document.createElement("li");
      li.textContent = h;
      modalHighlights.appendChild(li);
    });

    // Tech badges
    modalTechStack.innerHTML = "";
    data.technologies.forEach(t => {
      const span = document.createElement("span");
      span.className = "project-tag-pill";
      span.textContent = t;
      modalTechStack.appendChild(span);
    });

    modalOverlay.classList.add("open");
    document.body.style.overflow = "hidden";
  };

  const closeProjectModal = () => {
    modalOverlay.classList.remove("open");
    document.body.style.overflow = "";
  };

  document.querySelectorAll("[data-project-trigger]").forEach(el => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const pId = el.getAttribute("data-project-trigger");
      openProjectModal(pId);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeProjectModal);
  if (modalOverlay) {
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) closeProjectModal();
    });
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalOverlay.classList.contains("open")) {
      closeProjectModal();
    }
  });

  // 6. CONTACT FORM SUBMISSION
  const contactForm = document.getElementById("contactForm");
  const contactSuccess = document.getElementById("contactSuccess");
  const sendAnotherBtn = document.getElementById("sendAnotherBtn");

  if (contactForm && contactSuccess) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = "<span>Sending Message...</span>";
      submitBtn.disabled = true;

      setTimeout(() => {
        contactForm.reset();
        contactForm.style.display = "none";
        contactSuccess.classList.add("visible");
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 500);
    });

    if (sendAnotherBtn) {
      sendAnotherBtn.addEventListener("click", () => {
        contactSuccess.classList.remove("visible");
        contactForm.style.display = "flex";
      });
    }
  }

  // 7. DOWNLOAD PDF RESUME (WINDOW.PRINT)
  window.downloadResumePDF = () => {
    window.print();
  };

  // 8. BACK TO TOP
  const backToTopBtn = document.getElementById("backToTopBtn");
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
