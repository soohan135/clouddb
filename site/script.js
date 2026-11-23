// 프로젝트 데이터 — 실제 내용으로 수정하세요. (date 기준 최신순 자동 정렬)
const PROJECTS = [
  {
    id: 1,
    title: "자기소개 포트폴리오 웹앱",
    date: "2026-11",
    period: "2026.11 ~ 2026.12",
    summary: "AWS S3·CloudFront 기반으로 배포한 개인 포트폴리오 사이트",
    role: "기획, 프론트엔드, AWS 인프라 구성 (개인 프로젝트)",
    tech: "HTML, CSS, JavaScript, S3, CloudFront, Route 53, ACM, Lambda, API Gateway",
    result: "정적 웹사이트를 S3에 호스팅하고 CloudFront로 HTTPS 제공",
    github: "https://github.com/"
  },
  {
    id: 2,
    title: "프로젝트 이름 2",
    date: "2026-06",
    period: "2026.03 ~ 2026.06",
    summary: "프로젝트 한 줄 설명을 입력하세요.",
    role: "담당 역할",
    tech: "사용 기술",
    result: "프로젝트 결과",
    github: "https://github.com/"
  },
  {
    id: 3,
    title: "프로젝트 이름 3",
    date: "2025-12",
    period: "2025.09 ~ 2025.12",
    summary: "프로젝트 한 줄 설명을 입력하세요.",
    role: "담당 역할",
    tech: "사용 기술",
    result: "프로젝트 결과",
    github: "https://github.com/"
  },
  {
    id: 4,
    title: "프로젝트 이름 4",
    date: "2025-06",
    period: "2025.03 ~ 2025.06",
    summary: "프로젝트 한 줄 설명을 입력하세요.",
    role: "담당 역할",
    tech: "사용 기술",
    result: "프로젝트 결과",
    github: "https://github.com/"
  }
];

const PAGE_SIZE = 6;
let shown = 0;

const list = document.getElementById("project-list");
const moreBtn = document.getElementById("more-btn");
const sorted = [...PROJECTS].sort((a, b) => b.date.localeCompare(a.date));

function renderMore() {
  sorted.slice(shown, shown + PAGE_SIZE).forEach(p => {
    const card = document.createElement("article");
    card.className = "card project-card";
    card.innerHTML = `
      <span class="period">${p.period}</span>
      <h3>${p.title}</h3>
      <p>${p.summary}</p>
      <button class="btn btn-ghost" data-id="${p.id}">자세히 보기</button>`;
    list.appendChild(card);
  });
  shown += PAGE_SIZE;
  moreBtn.hidden = shown >= sorted.length;
}

// 모달
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalBody = document.getElementById("modal-body");

function openModal(id) {
  const p = PROJECTS.find(x => x.id === id);
  if (!p) return;
  modalTitle.textContent = p.title;
  modalBody.innerHTML = `
    <dt>기간</dt><dd>${p.period}</dd>
    <dt>담당 역할</dt><dd>${p.role}</dd>
    <dt>사용 기술</dt><dd>${p.tech}</dd>
    <dt>결과</dt><dd>${p.result}</dd>
    <dt>GitHub</dt><dd><a class="modal-body-link" href="${p.github}" target="_blank" rel="noopener">${p.github}</a></dd>`;
  modal.hidden = false;
}
function closeModal() { modal.hidden = true; }

list.addEventListener("click", e => {
  const btn = e.target.closest("button[data-id]");
  if (btn) openModal(Number(btn.dataset.id));
});
modal.addEventListener("click", e => {
  if (e.target === modal || e.target.classList.contains("modal-close")) closeModal();
});
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });
moreBtn.addEventListener("click", renderMore);

renderMore();
