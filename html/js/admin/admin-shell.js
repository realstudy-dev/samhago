/* ============================================================================
   세븐닷 관리자 - 헤더·사이드바 공통 Shell
   ----------------------------------------------------------------------------
   [사용법]
   HTML에서 <header> / <nav> 에 data-shell 속성 부여 후 이 파일을 로드:

     <header class="cd-topbar" data-shell="topbar"></header>
     <nav class="cd-side" data-shell="sidebar"></nav>
     <script src="../common/admin-shell.js"></script>

   [수정 방법]
   · 상단 CONFIG 객체에서 사용자명·기관명·프로모 문구를 수정
   · 페이지별 오버라이드: window.SHELL_CONFIG = {...} 를 이 파일보다 먼저 정의

   [메뉴 항목]
   사이드바 메뉴는 classroom_dashboard.js 의 renderSideMenu() 가 id="cdSideMenu"
   에 렌더링하므로 별도 수정 불필요.
   ============================================================================ */

(function () {
  /* ---- 기본 설정 ---- */
  const CFG = Object.assign(
    {
      userName: "김선생님",
      orgName: "세븐초등학교 (4-1)",
      promoTitle: "세븐브릭스 사용 가이드",
      promoBody: "학급 운영과 보상 설정이 처음이라면 FAQ에서 빠르게 확인하세요.",
      noticeHref: "../notice/notice_list.html",
      csHref: "../inquiry/inquiry_list.html",
    },
    window.SHELL_CONFIG || {}
  );

  /* ---- 탑바 HTML ---- */
  function topbarHTML() {
    return `
      <div class="cd-tb-brand">세븐닷 교사용 관리자 <span class="cd-tb-sub">세븐학원</span></div>
      <div class="cd-tb-right">
        <button class="cd-tb-link" type="button" data-action="topAlert">알림</button>
        <a class="cd-tb-link" href="${CFG.noticeHref}">공지사항</a>
        <a class="cd-tb-link" href="${CFG.csHref}">고객센터</a>
        <span class="cd-tb-acct" data-shell-slot="userName">${CFG.userName}</span>
      </div>
    `;
  }

  /* ---- 사이드바 HTML ---- */
  function sidebarHTML() {
    return `
      <button class="cd-side-acct" type="button" data-action="openOrgInfo">
        <span data-shell-slot="orgName">${CFG.orgName}</span>
        <span class="cd-arrow">›</span>
      </button>
      <div class="cd-side-menu" id="cdSideMenu"></div>
      <div class="cd-side-promo">
        <b>${CFG.promoTitle}</b>
        <span>${CFG.promoBody}</span>
      </div>
    `;
  }

  /* ---- 렌더링 ---- */
  function render() {
    document.querySelectorAll('[data-shell="topbar"]').forEach(function (el) {
      el.innerHTML = topbarHTML();
    });
    document.querySelectorAll('[data-shell="sidebar"]').forEach(function (el) {
      el.innerHTML = sidebarHTML();
    });
  }

  /* data-shell 요소는 이 스크립트보다 위에 있으므로 즉시 렌더 가능.
     DOMContentLoaded 로 미루면 뒤이어 실행되는 classroom_dashboard.js 의
     renderSideMenu() 가 #cdSideMenu 를 못 찾아 메뉴가 비어버린다. */
  render();

  /* ---- 공개 API ---- */
  window.SHELL = {
    /** 사용자명 업데이트 */
    setUserName: function (name) {
      document.querySelectorAll('[data-shell-slot="userName"]').forEach(function (el) {
        el.textContent = name;
      });
    },
    /** 기관명 업데이트 */
    setOrgName: function (name) {
      document.querySelectorAll('[data-shell-slot="orgName"]').forEach(function (el) {
        el.textContent = name;
      });
    },
  };
})();
