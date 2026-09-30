/*
  java.js: controla a lógica do site.
  Ele cria, edita, exclui, pesquisa e salva atividades no localStorage.
  Também controla o nome e a foto do perfil.
*/

const STORAGE_KEY = "reposchool.activities";
const PROFILE_KEY = "reposchool.profile";
const PHOTO_KEY = "reposchool.profilePhoto";
const IMAGES_ROOT = "./images/"
//Versionamento.
const sampleActivities = [
  {
    id: createId(),
    title: "Semana15",
    subject: "Versionamento",
    description: "tilização do Git para registrar e consultar diferentes versões do código.",
    content: "https://github.com/luig1b/3bim-.git",
    dueDate: "",
    status: "",
    tags: ["Versionamento"],
    createdAt: new Date().toISOString()
  },
 {
    id: createId(),
    title: "Semana16",
    subject: "Versionamento",
    description: "estudo de Trunk-based Development e dos problemas causados pela divergência entre branches.",
    content: "https://github.com/luig1b/3bim-.git",
    dueDate: "",
    status: "",
    tags: ["Versionamento"],
    createdAt: new Date().toISOString()
  },
{
    id: createId(),
    title: "Semana17",
    subject: "Versionamento",
    description: "resolução de conflitos entre alterações de diferentes desenvolvedores e revisão de conceitos do GitHub.",
    content: "https://github.com/luig1b/3bim-.git",
    dueDate: "",
    status: "",
    tags: ["Versionamento"],
    createdAt: new Date().toISOString()
  },
{
    id: createId(),
    title: "Semana18",
    subject: "Versionamento",
    description: "atividade com um pequeno código em Python relacionado ao material de versionamento.",
    content: "https://github.com/luig1b/3bim-.git",
    dueDate: "",
    status: "",
    tags: ["Versionamento"],
    createdAt: new Date().toISOString()
  },
{
    id: createId(),
    title: "Semana19",
    subject: "Versionamento",
    description: "representação de um sistema de pedidos utilizando eventos e Apache Kafka.",
    content: "https://github.com/luig1b/3bim-.git",
    dueDate: "",
    status: "",
    tags: ["Versionamento"],
    createdAt: new Date().toISOString()
  },
{
    id: createId(),
    title: "Semana20",
    subject: "Versionamento",
    description: "representação do fluxo de envio, validação e processamento de mensagens.",
    content: "https://github.com/luig1b/3bim-.git",
    dueDate: "",
    status: "",
    tags: ["Versionamento"],
    createdAt: new Date().toISOString()
  },
//Back-end
  {
    id: createId(),
    title: "Semana15",
    subject: "Back-end",
    description: "criação de uma API com login, JWT, proteção de rotas e diferentes níveis de acesso.",
    content: "https://github.com/luig1b/3bim-.git",
    dueDate: "",
    status: "",
    tags: ["backend"],
    createdAt: new Date().toISOString()
  },
  {
    id: createId(),
    title: "Semana16",
    subject: "Back-end",
    description: "estudo de CORS, OAuth 2.0, JWT e segurança de APIs.",
    content: "https://github.com/luig1b/3bim-.git",
    dueDate: "",
    status: "",
    tags: ["backend"],
    createdAt: new Date().toISOString()
  },
{
    id: createId(),
    title: "Semana17",
    subject: "Back-end",
    description: "studo de integração com APIs de terceiros, SDKs e tratamento de erros.",
    content: "https://github.com/luig1b/3bim-.git",
    dueDate: "",
    status: "",
    tags: ["backend"],
    createdAt: new Date().toISOString()
  },
{
    id: createId(),
    title: "Semana19",
    subject: "Back-end",
    description: "atividade de backend cujo conteúdo está no arquivo DOCX do repositório.",
    content: "https://github.com/luig1b/3bim-.git",
    dueDate: "",
    status: "",
    tags: ["backend"],
    createdAt: new Date().toISOString()
  },
{
    id: createId(),
    title: "Semana20",
    subject: "Back-end",
    description: "estudo de contêineres e Docker.",
    content: "https://github.com/luig1b/3bim-.git",
    dueDate: "",
    status: "",
    tags: ["backend"],
    createdAt: new Date().toISOString()
  },
{
    id: createId(),
    title: "Semana21",
    subject: "Back-end",
    description: "estudo de Docker, Kubernetes, microsserviços, monitoramento e logs.",
    content: "https://github.com/luig1b/3bim-.git",
    dueDate: "",
    status: "",
    tags: ["backend"],
    createdAt: new Date().toISOString()
  },
//Front-end
  {
    id: createId(),
    title: "Semana15",
    subject: "Front-end",
    description: "criação de uma galeria responsiva e otimizada com HTML, CSS Grid, responsividade e otimização",
    content: "https://github.com/luig1b/3bim-.git",
    dueDate: "",
    status: "",
    image: `${IMAGES_ROOT}/frontend/SEM15.jpg`,
    tags: ["frontend"],
    createdAt: new Date().toISOString()
  },
  {
    id: createId(),
    title: "Semana16",
    subject: "Front-end",
    description: "criação de uma tela de login com interações e animações.",
    content: "https://github.com/luig1b/3bim-.git",
    dueDate: "",
    status: "",
    tags: ["frontend"],
    createdAt: new Date().toISOString()
  },
{
    id: createId(),
    title: "Semana17",
    subject: "Front-end",
    description: "estudo de APIs, requisições, WebSocket e GraphQL.",
    content: "https://github.com/luig1b/3bim-.git",
    dueDate: "",
    status: "",
    tags: ["frontend"],
    createdAt: new Date().toISOString()
  },
{
    id: createId(),
    title: "Semana19",
    subject: "Front-end",
    description: "criação de uma lista de tarefas usando React, Vite e Redux.",
    content: "https://github.com/luig1b/3bim-.git",
    dueDate: "",
    status: "",
    tags: ["frontend"],
    createdAt: new Date().toISOString()
  },
{
    id: createId(),
    title: "Semana20",
    subject: "Front-end",
    description: "criação de uma página de produto com interações e animações.",
    content: "https://github.com/luig1b/3bim-.git",
    dueDate: "",
    status: "",
    tags: ["frontend"],
    createdAt: new Date().toISOString()
  },
//inteligencia-Artificial
  {
    id: createId(),
    title: "Semana15",
    subject: "Inteligência-Artificial",
    description: "Uso de IA para interpretar sintomas e classificar riscos",
    content: "https://github.com/luig1b/3bim-.git",
    dueDate: "",
    status: "",
    tags: ["IA"],
    createdAt: new Date().toISOString()
  },
  {
    id: createId(),
    title: "Semana16",
    subject: "Inteligência-Artificial",
    description: "Árvore de Decisão, treinamento, teste e acurácia.",
    content: "https://github.com/luig1b/3bim-.git",
    dueDate: "",
    status: "",
    tags: ["IA"],
    createdAt: new Date().toISOString()
  },
{
    id: createId(),
    title: "Semana17",
    subject: "Inteligência-Artificial",
    description: "A atividade trabalhou com a preparação dos dados para modelos de Machine Learning",
    content: "https://github.com/luig1b/3bim-.git",
    dueDate: "",
    status: "",
    tags: ["IA"],
    createdAt: new Date().toISOString()
  },
{
    id: createId(),
    title: "Semana18",
    subject: "Inteligência-Artificial",
    description: "Arquiteturas reativa, deliberativa e híbrida",
    content: "https://github.com/luig1b/3bim-.git",
    dueDate: "",
    status: "",
    tags: ["IA"],
    createdAt: new Date().toISOString()
  },
{
    id: createId(),
    title: "Semana19",
    subject: "Inteligência-Artificial",
    description: "Classificação de riscos de IA pelo EU AI Act",
    content: "https://github.com/luig1b/3bim-.git",
    dueDate: "",
    status: "",
    tags: ["IA"],
    createdAt: new Date().toISOString()
  },
{
    id: createId(),
    title: "Semana20",
    subject: "Inteligência-Artificial",
    description: "Memória de curto e longo prazo em agentes conversacionais",
    content: "https://github.com/luig1b/3bim-.git",
    dueDate: "",
    status: "",
    tags: ["IA"],
    createdAt: new Date().toISOString()
  },
//Projeto-multidiciplinar
  {
    id: createId(),
    title: "Semana15",
    subject: "Projeto-multidiciplinar",
    description: "Avanço da documentação do tcc",
    content: "https://github.com/luig1b/3bim-.git",
    dueDate: "",
    status: "",
    tags: ["TCC"],
    createdAt: new Date().toISOString()
  },
  {
    id: createId(),
    title: "Semana16",
    subject: "Projeto-multidiciplinar",
    description: "Avanço na programação do projeto",
    content: "https://github.com/luig1b/3bim-.git",
    dueDate: "",
    status: "",
    tags: ["TCC"],
    createdAt: new Date().toISOString()
  },
{
    id: createId(),
    title: "Semana17",
    subject: "Projeto-multidiciplinar",
    description: "Pesquisa de campo para o projeto",
    content: "https://github.com/luig1b/3bim-.git",
    dueDate: "",
    status: "",
    tags: ["TCC"],
    createdAt: new Date().toISOString()
  },
{
    id: createId(),
    title: "Semana18",
    subject: "Projeto-multidiciplinar",
    description: "Avanço da documentação",
    content: "https://github.com/luig1b/3bim-.git",
    dueDate: "",
    status: "",
    tags: ["TCC"],
    createdAt: new Date().toISOString()
  },
{
    id: createId(),
    title: "Semana19",
    subject: "Projeto-multidiciplinar",
    description: "Avanço da documentação do projeto",
    content: "https://github.com/luig1b/3bim-.git",
    dueDate: "",
    status: "",
    tags: ["TCC"],
    createdAt: new Date().toISOString()
  },
{
    id: createId(),
    title: "Semana20",
    subject: "Projeto-multidiciplinar",
    description: "Matriz swot do projeto",
    content: "https://github.com/luig1b/3bim-.git",
    dueDate: "",
    status: "",
    tags: ["TCC"],
    createdAt: new Date().toISOString()
  },
{
    id: createId(),
    title: "Semana21",
    subject: "Projeto-multidiciplinar",
    description: "Documentação final do projeto e link do repositorio do projeto",
    content: "https://github.com/luig1b/3bim-.git",
    dueDate: "",
    status: "",
    tags: ["TCC"],
    createdAt: new Date().toISOString()
  },
//Modelagem
  {
    id: createId(),
    title: "Semana15",
    subject: "modelagem dados",
    description: "Texto para atividade de modelagem",
    content: "",
    dueDate: "",
    status: "",
    image: `${IMAGES_ROOT}/modelagem/SEM15.png`,
    tags: ["modelagem"],
    createdAt: new Date().toISOString()
  },
  {
    id: createId(),
    title: "Semana16",
    subject: "modelagem dados",
    description: "arquivo de texo com perguntas do roteiro",
    content: "",
    dueDate: "",
    status: "",
    image: `${IMAGES_ROOT}/modelagem/SEM16.png`,
    tags: ["modelagem"],
    createdAt: new Date().toISOString()
  },
  {
    id: createId(),
    title: "Semana17",
    subject: "modelagem dados",
    description: "arquivo de texo com perguntas do roteiro",
    content: "",
    dueDate: "",
    status: "",
    image: `${IMAGES_ROOT}/modelagem/SEM17.png`,
    tags: ["modelagem"],
    createdAt: new Date().toISOString()
  },
  {
    id: createId(),
    title: "Semana18",
    subject: "modelagem dados",
    description: "aplicando banco de dados",
    content: "",
    dueDate: "",
    status: "",
    image: `${IMAGES_ROOT}/modelagem/SEM18.png`,
    tags: ["modelagem"],
    createdAt: new Date().toISOString()
  },
 {
    id: createId(),
    title: "Semana19",
    subject: "modelagem dados",
    description: "Perrguntas ",
    content: "",
    dueDate: "",
    status: "",
    image: `${IMAGES_ROOT}/modelagem/SEM19.png`,
    tags: ["modelagem"],
    createdAt: new Date().toISOString()
  },
  {
    id: createId(),
    title: "Semana20",
    subject: "modelagem dados",
    description: "aplicando banco de dados2",
    content: "",
    dueDate: "",
    status: "",
    image: `${IMAGES_ROOT}/modelagem/SEM20.png`,
    tags: ["modelagem"],
    createdAt: new Date().toISOString()
  },
  {
    id: createId(),
    title: "Semana21",
    subject: "modelagem dados",
    description: "aplicando banco de dados3",
    content: "",
    dueDate: "",
    status: "",
    image: `${IMAGES_ROOT}/modelagem/SEM21.png`,
    tags: ["modelagem"],
    createdAt: new Date().toISOString()
  },
//mobile
  {
    id: createId(),
    title: "Semana15",
    subject: "mobile",
    description: "Texto para atividade de mobile",
    content: "",
    dueDate: "",
    status: "",
    image: `${IMAGES_ROOT}/mobile/SEM15.png`,
    tags: ["mobile"],
    createdAt: new Date().toISOString()
  },
  {
    id: createId(),
    title: "Semana16",
    subject: "mobile",
    description: "arquivo de texo com perguntas do roteiro",
    content: "",
    dueDate: "",
    status: "",
    image: `${IMAGES_ROOT}/mobile/SEM16.png`,
    tags: ["mobile"],
    createdAt: new Date().toISOString()
  },
  {
    id: createId(),
    title: "Semana17",
    subject: "mobile",
    description: "Atividade de texto",
    content: "",
    dueDate: "",
    status: "",
    image: `${IMAGES_ROOT}/mobile/SEM17.png`,
    tags: ["mobile"],
    createdAt: new Date().toISOString()
  },
  {
    id: createId(),
    title: "Semana18",
    subject: "mobile",
    description: "atividade em texto sobre api",
    content: "",
    dueDate: "",
    status: "",
    image: `${IMAGES_ROOT}/mobile/SEM18.png`,
    tags: ["mobile"],
    createdAt: new Date().toISOString()
  },
 {
    id: createId(),
    title: "Semana19",
    subject: "mobile",
    description: "Texto sobre lgpd",
    content: "",
    dueDate: "",
    status: "",
    image: `${IMAGES_ROOT}/mobile/SEM19.png`,
    tags: ["mobile"],
    createdAt: new Date().toISOString()
  },
  {
    id: createId(),
    title: "Semana20",
    subject: "mobile",
    description: "Texto da atividade2",
    content: "",
    dueDate: "",
    status: "",
    image: `${IMAGES_ROOT}/mobile/SEM20.png`,
    tags: ["modelage"],
    createdAt: new Date().toISOString()
  },
  {
    id: createId(),
    title: "Semana21",
    subject: "modelagem dados",
    description: "atividade aula 4, perguntas sobre um projeto",
    content: "",
    dueDate: "",
    status: "",
    image: `${IMAGES_ROOT}/mobile/SEM21.png`,
    tags: ["modelagem"],
    createdAt: new Date().toISOString()
  },

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

  localStorage.setItem(STORAGE_KEY, JSON.stringify(   ));
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

      <div class="detail-block">
        <h3>Evidência</h3>
        <img src="${escapeHTML(activity.image)}">
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
