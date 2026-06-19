/* ============================================================================
   세븐닷 관리자 - 헤더·사이드바 공통 Shell
   ----------------------------------------------------------------------------
   [사용법]
   HTML에서 <header> / <nav> 에 data-shell 속성 부여 후 이 파일을 로드:

     <header class="cd-topbar" data-shell="topbar"></header>
     <nav class="cd-side" data-shell="sidebar"></nav>
     <script src="../common/classroom-shell.js"></script>

   [수정 방법]
   · 상단 CONFIG 객체에서 사용자명·기관명·프로모 문구를 수정
   · 페이지별 오버라이드: window.SHELL_CONFIG = {...} 를 이 파일보다 먼저 정의

   [역할 (role)]
   "teacher"  : 담임·교과 교사 (기본)
   "principal": 원장 (학원 확장 시 추가 메뉴 노출)

   [반 전환기]
   CLASSES 배열에 접근 가능한 반 목록을 정의.
   학원 환경에서는 여러 반/과목을 단일 계정으로 관리.
   ============================================================================ */

(function () {
  /* ── 기본 설정 ── */
  const CFG = Object.assign(
    {
      userName:   "김선생님",
      orgName:    "세븐초등학교",
      className:  "4학년 1반",
      role:       "teacher",       // "teacher" | "principal"
      promoTitle: "세븐닷 사용 가이드",
      promoBody:  "학급 운영과 보상 설정이 처음이라면 FAQ에서 빠르게 확인하세요.",
      noticeHref: "../notice/notice_list.html",
      csHref:     "../inquiry/inquiry_list.html",
    },
    window.SHELL_CONFIG || {}
  );

  /* ── 접근 가능한 반 목록 (학원 확장 시 여러 반) ── */
  const CLASSES = (window.SHELL_CONFIG && window.SHELL_CONFIG.classes) || [
    { org: "세븐초등학교", label: "전체 관리", role: "head_teacher", active: false },
    { org: "세븐초등학교", label: "4학년 1반", role: "담임",  active: true  },
    { org: "세븐초등학교", label: "4학년 2반", role: "교과",  active: false },
    { org: "세븐학원",     label: "원장 · 학원 전체 관리", role: "원장", active: false },
    { org: "세븐학원",     label: "수학 중등반", role: "강사", active: false },
    { org: "세븐학원",     label: "영어 초등반", role: "강사", active: false },
  ];
  /* 모드(학교/학원장)·활성 반을 sessionStorage로 영속화 — 페이지를 넘어가도 유지 */
  var _savedMode = null, _savedActive = null;
  try { _savedMode = sessionStorage.getItem("cd_mode"); _savedActive = JSON.parse(sessionStorage.getItem("cd_active") || "null"); } catch (e) {}
  if (document.body.dataset.mode === "principal") {
    _savedMode = "principal"; // 학원장 페이지(대시보드·그룹 등)는 강제 원장 활성화
    CLASSES.forEach(function (c) { c.active = (c.role === "원장"); });
  } else if (_savedActive) {
    CLASSES.forEach(function (c) { c.active = (c.org === _savedActive.org && c.label === _savedActive.label); });
  } else if (_savedMode === "principal") {
    CLASSES.forEach(function (c) { c.active = (c.role === "원장"); });
  }
  if (_savedMode === "principal") CFG.role = "principal";
  try { sessionStorage.setItem("cd_mode", _savedMode || "teacher"); } catch (e) {}

  const roleLabel = { teacher: "교사", principal: "원장", default: "교사" };

  /* ── 탑바 ── */
  function topbarHTML() {
    const multi = CLASSES.length > 1;
    const active = CLASSES.find(c => c.active) || CLASSES[0];
    const roleCls = CFG.role === 'principal' ? 'warning' : 'info';
    return `
      <div class="cd-tb-brand"><img src="../../../image/sevendot/7dot-logo.png" alt="세븐닷" class="cd-tb-logo">세븐닷 교사용 관리자 <span class="cd-tb-sub" data-shell-slot="orgName">${active.org}</span></div>
      <div class="cd-tb-right">
        <button class="cd-tb-link" type="button" data-action="topAlert">알림</button>
        <a class="cd-tb-link" href="${CFG.noticeHref}">공지사항</a>
        <a class="cd-tb-link" href="${CFG.csHref}">고객센터</a>
        <button class="cd-tb-acct-btn" type="button"
                data-action="${multi ? 'openClassPicker' : 'openOrgInfo'}">
          <span class="badge ${roleCls} cd-tb-role-badge" data-shell-slot="roleBadge">${roleLabel[CFG.role] || roleLabel.default}</span>
          <span class="cd-tb-acct" data-shell-slot="userName">${CFG.userName}</span>
          <span class="cd-tb-sep">·</span>
          <span class="cd-tb-class" data-shell-slot="className">${active.label}</span>
          ${multi ? '<span class="material-symbols-outlined cd-tb-chevron">unfold_more</span>' : ''}
        </button>
      </div>
    `;
  }

  function sidebarHTML() {
    return `
      <div class="cd-side-menu" id="cdSideMenu"></div>
      <div class="cd-side-promo">
        <b>${CFG.promoTitle}</b>
        <span>${CFG.promoBody}</span>
      </div>
    `;
  }

  /* ── 반 선택기 팝오버 HTML (모달에 주입) ── */
  function classPickerHTML() {
    const byOrg = CLASSES.reduce((acc, c) => {
      (acc[c.org] = acc[c.org] || []).push(c);
      return acc;
    }, {});

    const rows = Object.entries(byOrg).map(([org, list]) => `
      <div class="cd-cp-group">
        <div class="cd-cp-group-title">${org}</div>
        ${list.map((c, i) => `
          <button class="cd-cp-item${c.active ? ' active' : ''}" type="button"
                  data-action="switchClass" data-org="${c.org}" data-class="${c.label}">
            <div class="cd-cp-item-info">
              <span class="cd-cp-label">${c.label}</span>
              <span class="badge neutral cd-cp-role">${c.role}</span>
            </div>
            ${c.active ? '<span class="material-symbols-outlined" style="color:#009d5b;font-size:18px">check_circle</span>' : ''}
          </button>
        `).join('')}
      </div>
    `).join('');

    return `
      <div class="modal-overlay" id="classPickerModal" style="display:none">
        <div class="modal cd-class-picker-modal">
          <div class="modal-head">
            <div class="title">반 전환</div>
            <button class="close" type="button" data-action="closeClassPicker">×</button>
          </div>
          <div class="modal-body">
            <p class="cd-desc" style="margin-bottom:16px">접근 가능한 반과 과목을 선택하세요.</p>
            <div class="cd-cp-list">${rows}</div>
          </div>
          <div class="modal-foot">
            <span class="cd-desc">학원·학교 추가는 관리자에게 문의하세요.</span>
          </div>
        </div>
      </div>
    `;
  }

  /* ── 렌더링 ── */
  function render() {
    document.querySelectorAll('[data-shell="topbar"]').forEach(function (el) {
      el.innerHTML = topbarHTML();
    });
    document.querySelectorAll('[data-shell="sidebar"]').forEach(function (el) {
      el.innerHTML = sidebarHTML();
    });
    /* 반 선택기 팝오버: body에 1회만 주입 */
    if (CLASSES.length > 1 && !document.getElementById('classPickerModal')) {
      const wrap = document.createElement('div');
      wrap.innerHTML = classPickerHTML();
      document.body.appendChild(wrap.firstElementChild);
    }
  }

  render();

  /* ── 공개 API ── */
  window.SHELL = {
    setUserName: function (name) {
      document.querySelectorAll('[data-shell-slot="userName"]').forEach(function (el) {
        el.textContent = name;
      });
    },
    setOrgName: function (name) {
      document.querySelectorAll('[data-shell-slot="orgName"]').forEach(function (el) {
        el.textContent = name;
      });
    },
    setClassName: function (name) {
      document.querySelectorAll('[data-shell-slot="className"]').forEach(function (el) {
        el.textContent = name;
      });
    },
    /** 반 전환 (학원 확장) */
    switchClass: function (org, label) {
      CLASSES.forEach(function (c) { c.active = (c.org === org && c.label === label); });
      /* 모드 판정: 원장 선택 = 학원장 / 원장 상태에서 학원 반 선택 = 드릴인(원장 유지) / 그 외 = 학교 교사 */
      var act = CLASSES.find(function (c) { return c.active; });
      var wasPrincipal = false;
      try { wasPrincipal = sessionStorage.getItem("cd_mode") === "principal"; } catch (e) {}
      var newMode;
      if (act && (act.role === "원장" || (wasPrincipal && act.org.indexOf("학원") >= 0))) {
        newMode = "principal";
      } else if (act && act.role === "head_teacher") {
        newMode = "head_teacher";
      } else {
        newMode = "teacher";
      }
      try {
        sessionStorage.setItem("cd_active", JSON.stringify({ org: org, label: label }));
        sessionStorage.setItem("cd_mode", newMode);
      } catch (e) {}
      if (newMode === "principal") CFG.role = "principal";
      /* 탑바 재렌더 (반 이름·배지 업데이트) */
      document.querySelectorAll('[data-shell="topbar"]').forEach(function (el) {
        el.innerHTML = topbarHTML();
      });
      /* 사이드바 재렌더 */
      document.querySelectorAll('[data-shell="sidebar"]').forEach(function (el) {
        el.innerHTML = sidebarHTML();
      });
      /* 모드가 바뀌면 홈으로 이동해 nav를 새로 그림 */
      window.location.href = '../classroom/classroom_home.html';
      return;
    },
    CLASSES: CLASSES,
    CFG: CFG,
  };
})();
