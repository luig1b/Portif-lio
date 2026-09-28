/*
  java.js: controla a lógica do site.
  Ele cria, edita, exclui, pesquisa e salva atividades no localStorage.
  Também controla o nome e a foto do perfil.
*/

const STORAGE_KEY = "reposchool.activities";
const PROFILE_KEY = "reposchool.profile";
const PHOTO_KEY = "reposchool.profilePhoto";

const sampleActivities = [
  {
    id: createId(),
    title: "Equações quadráticas",
    subject: "Matemática",
    description: "Resolver a lista de exercícios sobre fórmula de Bhaskara.",
    content: "Resolver os exercícios 1 a 12 do capítulo 4 e registrar os cálculos no caderno.",
    dueDate: "2026-09-30",
    status: "pending",
    tags: ["matemática", "álgebra"],
    createdAt: new Date().toISOString()
  },
  {
    id: createId(),
    title: "Resumo de ecossistemas",
    subject: "Biologia",
    description: "Produzir um resumo visual sobre cadeias alimentares.",
    content: "Pesquisar produtores, consumidores e decompositores. Incluir um exemplo de cadeia alimentar brasileira.",
    dueDate: "2026-10-03",
    status: "pending",
    tags: ["biologia", "resumo"],
    createdAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: createId(),
    title: "Leitura: Modernismo",
    subject: "Literatura",
    description: "Leitura e anotações do primeiro capítulo.",
    content: "Anotar as características da primeira fase modernista e selecionar uma citação importante.",
    dueDate: "2026-09-24",
    status: "completed",
    tags: ["literatura"],
    createdAt: new Date(Date.now() - 172800000).toISOString()
  }
];

let activities = loadActivities();
let activeSubject = "all";
let currentDetailId = null;
let sortNewest = true;

const $ = (id) => document.getElementById(id);

function createId() {
  if (crypto.randomUUID) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function loadActivities() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch (error) {
    console.error("Não foi possível carregar as atividades:", error);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleActivities));
  return sampleActivities;
}

function saveActivities() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));
}

function loadProfile() {
  const name = localStorage.getItem(PROFILE_KEY) || "";
  const photo = localStorage.getItem(PHOTO_KEY) || "";

  $("profileName").textContent = name || "Meu perfil";
  $("profileInitial").textContent = name ? name.trim()[0].toUpperCase() : "?";

  $("profilePhoto").src = photo;
  $("profilePhoto").hidden = !photo;
  $("profileInitial").hidden = Boolean(photo);
}

function escapeHTML(value = "") {
  return String(value).replace(/[&<>'"]/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#039;",
    '"': "&quot;"
  }[char]));
}

function formatDate(value) {
  if (!value) return "Sem prazo";
  const date = new Date(`${value}T12:00:00`);
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(date).replace(".", "");
}

function isUpcoming(value) {
  if (!value) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const due = new Date(`${value}T12:00:00`);
  const limit = new Date(today.getTime() + 7 * 86400000);

  return due >= today && due <= limit;
}

function isOverdue(activity) {
  if (activity.status !== "pending" || !activity.dueDate) return false;
  return new Date(`${activity.dueDate}T12:00:00`) < new Date();
}

function allSubjects() {
  return [...new Set(
    activities.map((activity) => activity.subject).filter(Boolean)
  )].sort((a, b) => a.localeCompare(b));
}

function filteredActivities() {
  const query = $("searchInput").value.trim().toLowerCase();
  const status = $("statusFilter").value;
  const subject = $("subjectFilter").value;

  return activities
    .filter((activity) => {
      const haystack = [
        activity.title,
        activity.subject,
        activity.description,
        activity.content,
        ...(activity.tags || [])
      ].join(" ").toLowerCase();

      return (
        (!query || haystack.includes(query)) &&
        (status === "all" || activity.status === status) &&
        (subject === "all" || activity.subject === subject) &&
        (activeSubject === "all" || activity.subject === activeSubject)
      );
    })
    .sort((a, b) =>
      sortNewest
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt)
    );
}

function render() {
  renderStats();
  renderSubjects();
  renderList();
}

function renderStats() {
  $("totalStat").textContent = activities.length;
  $("pendingStat").textContent = activities.filter((a) => a.status === "pending").length;
  $("completedStat").textContent = activities.filter((a) => a.status === "completed").length;
  $("upcomingStat").textContent = activities.filter(
    (a) => a.status === "pending" && isUpcoming(a.dueDate)
  ).length;
  $("allCount").textContent = activities.length;
}

function renderSubjects() {
  const subjects = allSubjects();
  const selected = $("subjectFilter").value;

  $("subjectCount").textContent = subjects.length;
  $("subjectFilter").innerHTML =
    '<option value="all">Todas as matérias</option>' +
    subjects.map((subject) =>
      `<option value="${escapeHTML(subject)}">${escapeHTML(subject)}</option>`
    ).join("");

  if (subjects.includes(selected)) {
    $("subjectFilter").value = selected;
  }

  $("subjectNav").innerHTML = subjects.length
    ? subjects.map((subject) => `
        <button class="subject-item ${activeSubject === subject ? "active" : ""}"
          data-subject="${escapeHTML(subject)}">
          ${escapeHTML(subject)}
          <span>${activities.filter((a) => a.subject === subject).length}</span>
        </button>
      `).join("")
    : '<p class="sidebar-empty">Nenhuma ainda</p>';

  document.querySelectorAll("[data-subject]").forEach((button) => {
    button.addEventListener("click", () => {
      activeSubject = button.dataset.subject;
      $("listTitle").textContent = activeSubject;
      render();
    });
  });
}

function renderList() {
  const list = filteredActivities();
  $("resultCount").textContent = `${list.length} ${list.length === 1 ? "item" : "itens"}`;

  const container = $("activityList");

  if (!list.length) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">✦</div>
        <h3>Nada encontrado por aqui</h3>
        <p>Tente mudar os filtros ou adicione uma nova atividade.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = list.map((activity) => `
    <article class="activity-card ${activity.status === "completed" ? "completed" : ""}"
      data-id="${escapeHTML(activity.id)}">
      <div class="card-top">
        <div>
          <p class="subject-label">${escapeHTML(activity.subject)}</p>
          <h3 class="card-title">${escapeHTML(activity.title)}</h3>
        </div>
        <span class="status-badge ${activity.status === "completed" ? "completed" : ""}">
          ${activity.status === "completed" ? "✓ Concluída" : "○ Pendente"}
        </span>
      </div>

      <p class="card-description">
        ${escapeHTML(activity.description || "Sem descrição adicionada.")}
      </p>

      <div class="card-bottom">
        <span class="due-date ${isOverdue(activity) ? "overdue" : ""}">
          ⌁ ${activity.dueDate
            ? `${isOverdue(activity) ? "Atrasada · " : "Entrega · "}${formatDate(activity.dueDate)}`
            : "Sem prazo definido"}
        </span>

        <div class="tags">
          ${(activity.tags || []).map((tag) =>
            `<span class="tag">#${escapeHTML(tag)}</span>`
          ).join("")}
        </div>
      </div>
    </article>
  `).join("");

  document.querySelectorAll(".activity-card").forEach((card) => {
    card.addEventListener("click", () => openDetail(card.dataset.id));
  });
}

function openModal(activity = null) {
  $("activityForm").reset();
  $("activityId").value = activity?.id || "";

  $("modalEyebrow").textContent = activity ? "editar atividade" : "nova atividade";
  $("modalTitle").textContent = activity ? "Editar atividade" : "Adicionar atividade";

  if (activity) {
    $("titleInput").value = activity.title;
    $("subjectInput").value = activity.subject;
    $("descriptionInput").value = activity.description;
    $("contentInput").value = activity.content;
    $("dueDateInput").value = activity.dueDate;
    $("statusInput").value = activity.status;
    $("tagsInput").value = (activity.tags || []).join(", ");
  }

  $("modalBackdrop").hidden = false;
  $("titleInput").focus();
}

function closeModal() {
  $("modalBackdrop").hidden = true;
}

function submitActivity(event) {
  event.preventDefault();

  const data = {
    title: $("titleInput").value.trim(),
    subject: $("subjectInput").value.trim(),
    description: $("descriptionInput").value.trim(),
    content: $("contentInput").value.trim(),
    dueDate: $("dueDateInput").value,
    status: $("statusInput").value,
    tags: $("tagsInput").value
      .split(",")
      .map((tag) => tag.trim().toLowerCase())
      .filter(Boolean)
  };

  const id = $("activityId").value;

  if (id) {
    const index = activities.findIndex((activity) => activity.id === id);
    if (index !== -1) {
      activities[index] = { ...activities[index], ...data };
    }
    toast("Atividade atualizada");
  } else {
    activities.unshift({
      ...data,
      id: createId(),
      createdAt: new Date().toISOString()
    });
    toast("Atividade salva no navegador");
  }

  saveActivities();
  closeModal();
  render();
}

function openDetail(id) {
  const activity = activities.find((item) => item.id === id);
  if (!activity) return;

  currentDetailId = id;
  $("detailSubject").textContent = activity.subject;
  $("detailTitle").textContent = activity.title;

  $("detailBody").innerHTML = `
    <div class="detail-content">
      <div class="detail-meta">
        <div>
          <span>Status</span>
          <strong class="${activity.status === "completed" ? "success" : ""}">
            ${activity.status === "completed" ? "✓ Concluída" : "○ Pendente"}
          </strong>
        </div>
        <div>
          <span>Criada em</span>
          <strong>${formatDate(activity.createdAt.slice(0, 10))}</strong>
        </div>
        <div>
          <span>Entrega</span>
          <strong>${formatDate(activity.dueDate)}</strong>
        </div>
      </div>

      <div class="detail-block">
        <h3>Descrição</h3>
        <p>${escapeHTML(activity.description || "Sem descrição.")}</p>
      </div>

      <div class="detail-block">
        <h3>Conteúdo / resposta</h3>
        <p>${escapeHTML(activity.content || "Nenhum conteúdo adicionado.")}</p>
      </div>

      <div class="tags">
        ${(activity.tags || []).map((tag) =>
          `<span class="tag">#${escapeHTML(tag)}</span>`
        ).join("")}
      </div>
    </div>
  `;

  $("toggleDetail").textContent =
    activity.status === "completed" ? "Marcar pendente" : "Marcar concluída";

  $("detailBackdrop").hidden = false;
}

function closeDetail() {
  $("detailBackdrop").hidden = true;
  currentDetailId = null;
}

function deleteActivity(id) {
  const activity = activities.find((item) => item.id === id);
  if (!activity) return;

  const confirmed = confirm(`Excluir "${activity.title}"? Esta ação não pode ser desfeita.`);
  if (!confirmed) return;

  activities = activities.filter((item) => item.id !== id);
  saveActivities();
  closeDetail();
  render();
  toast("Atividade excluída");
}

function toggleActivity(id) {
  const activity = activities.find((item) => item.id === id);
  if (!activity) return;

  activity.status = activity.status === "completed" ? "pending" : "completed";
  saveActivities();
  render();

  if (!$("detailBackdrop").hidden) openDetail(id);

  toast(activity.status === "completed"
    ? "Marcada como concluída"
    : "Marcada como pendente");
}

function editProfileName() {
  const currentName = localStorage.getItem(PROFILE_KEY) || "";
  const name = prompt("Como você quer ser chamado?", currentName);

  if (name === null) return;

  localStorage.setItem(PROFILE_KEY, name.trim());
  loadProfile();
  toast("Perfil atualizado");
}

function changeProfilePhoto(event) {
  const file = event.target.files[0];
  if (!file) return;

  if (!file.type.startsWith("image/")) {
    toast("Escolha uma imagem válida.");
    return;
  }

  const reader = new FileReader();

  reader.onload = () => {
    localStorage.setItem(PHOTO_KEY, reader.result);
    loadProfile();
    toast("Foto de perfil atualizada");
  };

  reader.readAsDataURL(file);
  event.target.value = "";
}

function toast(message) {
  const element = $("toast");
  element.textContent = message;
  element.classList.add("show");

  setTimeout(() => element.classList.remove("show"), 2600);
}

/* Eventos dos botões e campos */
document.querySelectorAll('[data-action="new"]').forEach((button) => {
  button.addEventListener("click", () => openModal());
});

document.querySelectorAll("[data-close-modal]").forEach((button) => {
  button.addEventListener("click", closeModal);
});

document.querySelectorAll("[data-close-detail]").forEach((button) => {
  button.addEventListener("click", closeDetail);
});

$("activityForm").addEventListener("submit", submitActivity);

$("searchInput").addEventListener("input", renderList);

$("statusFilter").addEventListener("change", renderList);

$("subjectFilter").addEventListener("change", (event) => {
  activeSubject = "all";
  $("listTitle").textContent = "Todas as atividades";
  renderList();
});

$("sortButton").addEventListener("click", () => {
  sortNewest = !sortNewest;
  $("sortButton").textContent = sortNewest ? "Mais recentes ↕" : "Mais antigas ↕";
  renderList();
});

$("allActivitiesBtn").addEventListener("click", () => {
  activeSubject = "all";
  $("listTitle").textContent = "Todas as atividades";
  $("subjectFilter").value = "all";
  render();
});

$("editDetail").addEventListener("click", () => {
  const activity = activities.find((item) => item.id === currentDetailId);
  closeDetail();
  if (activity) openModal(activity);
});

$("deleteDetail").addEventListener("click", () => {
  if (currentDetailId) deleteActivity(currentDetailId);
});

$("toggleDetail").addEventListener("click", () => {
  if (currentDetailId) toggleActivity(currentDetailId);
});

$("profileEdit").addEventListener("click", editProfileName);

$("profileButton").addEventListener("click", () => {
  $("profilePhotoInput").click();
});

$("profilePhotoInput").addEventListener("change", changeProfilePhoto);

$("mobileMenu").addEventListener("click", () => {
  document.querySelector(".sidebar").classList.toggle("open");
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
    closeDetail();
  }
});

loadProfile();
render();
