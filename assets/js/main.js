document.addEventListener("DOMContentLoaded", () => {
  fetch('../assets/js/schema/person-schema.jsonld')
    .then(response => response.text())
    .then(jsonld => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = jsonld;
      document.head.appendChild(script);
    })
    .catch(err => console.error('Error to load JSON-LD:', err));

  const p = profileData;
  document.getElementById("name").textContent = p.name;
  document.getElementById("title").textContent = p.title;
  document.getElementById("sm-name").textContent = p.name;
  document.getElementById("sm-title").textContent = p.title;
  document.getElementById("about-master").textContent = p.aboutMaster;
  document.getElementById("about-grade").textContent = p.aboutGrade;
  document.getElementById("linkedin").href = p.linkedin;
  document.getElementById("contact-info").textContent = p.contact;
  document.getElementById("year").textContent = new Date().getFullYear();

  const expList = document.getElementById("experience-list");
  let shownCompanies = new Set();

  p.experience.forEach(e => {
    var showCompany = !shownCompanies.has(e.companyId);
    if (showCompany) shownCompanies.add(e.companyId);

    expList.innerHTML += `
      <div class="mb-3">
        ${showCompany ? `<h5><img src="${e.logo}" class="logo" alt="">${e.company}</h5>` : ""}
        <p><strong>${e.role}</strong> (${e.period})</p>
        <p>${e.description}</p>
      </div>
    `;
  });

  const eduList = document.getElementById("education-list");
  p.education.forEach(e => {
    eduList.innerHTML += `
      <div class="mb-4 d-flex align-items-center">
        <img src="${e.logo}" class="logo me-3" alt="${e.institution}">
        <div>
          <h5 class="mb-1">${e.degree} - ${e.year}</h5>
          <p class="mb-0 text-muted">${e.institution}</p>
        </div>
      </div>

    `;
  });

  const certList = document.getElementById("certification-list");
  p.certifications.forEach(c => {
    certList.innerHTML += `
      <div class="col-6 col-md-3 text-center mb-2">
        <a href="${c.link}" target="_blank" rel="noopener noreferrer">
          <div class="badge-container">
            <img src="${c.badge}" alt="${c.name}" class="img-fluid rounded badge-img" />
          </div>
        </a>
        <p><strong>${c.name}</strong><br><small>${c.issuer} - ${c.year} </small></p>
      </div>
    `;
  });

  const courList = document.getElementById("courses-list");
  p.courses.forEach(c => {
    courList.innerHTML += `
      <div class="col-6 col-md-3 text-center mb-2">
        <a href="${c.link}" target="_blank" rel="noopener noreferrer">
          <div class="badge-container">
            <img src="${c.badge}" alt="${c.name}" class="img-fluid rounded mb-2 badge-img" />
          </div>
        </a>
        <p><strong>${c.name}</strong><br><small>${c.issuer} - ${c.year} </small></p>
      </div>
    `;
  });

  const btnScrollTop = document.getElementById("btn-scroll-top");
  window.addEventListener("scroll", function() {
    if (window.scrollY > 200) { // Muestra el botón después de 200px de scroll
      btnScrollTop.style.display = "block";
    } else {
      btnScrollTop.style.display = "none";
    }
  });
  // Desplazar a la parte superior de la página
  btnScrollTop.addEventListener("click", function(event) {
    event.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth" // Desplazamiento suave
    });
  });
});
