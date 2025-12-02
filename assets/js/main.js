document.addEventListener("DOMContentLoaded", async () => {
  await loadJsonLd();
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
    if (c.link && c.link.trim() !== "") {
      courList.innerHTML += `
        <div class="col-6 col-md-3 text-center mb-2">
          <a href="${c.link}" target="_blank" rel="noopener noreferrer">
            <div class="badge-container">
              <img src="${c.badge}" alt="${c.name}" class="img-fluid mb-2 badge-img" />
            </div>
          </a>
          <p><strong>${c.name}</strong><br><small>${c.issuer} - ${c.year} </small></p>
        </div>
      `;
    } else if (c.badgeFull && c.badgeFull.trim() !== ""){
      courList.innerHTML += `
        <div class="col-6 col-md-3 text-center mb-2">
          <div class="badge-container">
            <img src="${c.badge}" alt="${c.name}" 
                 class="img-fluid mb-2 badge-img rounded shadow-sm open-modal" 
                 data-img="${c.badgeFull || c.badge}" />
          </div>
          <p><strong>${c.name}</strong><br><small>${c.issuer} - ${c.year}</small></p>
        </div>
      `;
    } else {
      courList.innerHTML += `
        <div class="col-6 col-md-3 text-center mb-2">
          <div class="badge-container">
            <img src="${c.badge}" alt="${c.name}" 
                 class="img-fluid mb-2 badge-img rounded shadow-sm" 
                 data-img="${c.badge}" />
          </div>
          <p><strong>${c.name}</strong><br><small>${c.issuer} - ${c.year}</small></p>
        </div>
      `;
    }    
  });

   // Inicializar el modal Bootstrap  
  const modalElement = document.getElementById('certificateModal');
  const modal = new bootstrap.Modal(modalElement);
  var modalImg = document.getElementById('certificateImage'); 

  courList.addEventListener('click', (e) => {
    const target = e.target.closest('.open-modal');
    if (target) {
      const imageSrc = target.getAttribute('data-img');
      modalImg.src = imageSrc;
      modal.show();
    }
  });

  // Cuando se cierra el modal, limpiamos el src (buena práctica de rendimiento)
  modalElement.addEventListener('hidden.bs.modal', () => {
    modalImg.src = '';
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

async function loadJsonLd() {
  try {
    const pathParts = window.location.pathname.split("/").filter(p => p.length > 0);
    const basePath = pathParts.length > 0 ? `/${pathParts[0]}` : "";
    const jsonldUrl = `${basePath}/assets/js/schema/person-schema.jsonld`;

    const response = await fetch(jsonldUrl);
    if (!response.ok) throw new Error(`HTTP error! status : ${response.status}`);
    const data = await response.text();

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = data;
    document.head.appendChild(script);
  } catch (error) {
    console.error("Error al cargar el JSON-LD: ", error);
  }
}
