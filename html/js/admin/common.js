/* ============================================================================
   세븐닷 관리자 - 공통 JS (notify/confirm 모달)
   ============================================================================

   [사용법]
   페이지의 </head> 또는 </body> 직전에 추가:
     <script src="admin-common.js"></script>

   [API]
     fn_notify(message, opts?)
       - 알림 모달 (기존 alert 대체)
       - opts: { title?: string, okText?: string, onOk?: fn, tone?: 'info'|'success'|'warn'|'error' }

     fn_confirm(message, onYes, opts?)
       - 확인 모달 (기존 confirm 대체, 콜백 기반)
       - opts: { title?: string, yesText?: string, noText?: string, onNo?: fn, tone?: 'info'|'warn'|'error' }

   admin-common.css 의 .modal-overlay / .modal / .modal-head / .modal-body /
   .modal-foot 스타일을 그대로 재사용한다.
   ============================================================================ */

(function () {
  /* 모달 DOM (한 번만 생성, 페이지 어디서든 재사용) */
  var OVERLAY_ID = "admin-common-modal";

  function ensureOverlay() {
    var el = document.getElementById(OVERLAY_ID);
    if (el) return el;

    el = document.createElement("div");
    el.id = OVERLAY_ID;
    el.className = "modal-overlay";
    el.innerHTML =
      '<div class="modal" style="max-width:420px;">' +
      '<div class="modal-head">' +
      '<div class="title" data-role="title">알림</div>' +
      '<button class="close" type="button" data-role="x">×</button>' +
      "</div>" +
      '<div class="modal-body" data-role="body" style="font-size:14px;line-height:1.65;color:rgba(49,58,70,.9);white-space:pre-line;"></div>' +
      '<div class="modal-foot" data-role="foot"></div>' +
      "</div>";

    /* 바깥 클릭 시 닫기 */
    el.addEventListener("click", function (e) {
      if (e.target === el) close();
    });

    /* X 버튼 */
    el.querySelector('[data-role="x"]').addEventListener("click", close);

    /* CSS가 .sevendot-admin 하위로 스코핑돼 있으므로,
       모달도 .sevendot-admin 래퍼 안에 넣어야 스타일이 적용된다.
       (페이지에 이미 .sevendot-admin 영역이 있으면 그 안에, 없으면 body 직속에 래퍼 생성) */
    var host = document.querySelector(".sevendot-admin") || document.body;
    if (host.classList && host.classList.contains("sevendot-admin")) {
      host.appendChild(el);
    } else {
      var wrap = document.createElement("div");
      wrap.className = "sevendot-admin";
      wrap.appendChild(el);
      document.body.appendChild(wrap);
    }
    return el;
  }

  function close() {
    var el = document.getElementById(OVERLAY_ID);
    if (el) el.classList.remove("show");
  }

  function open(opts) {
    var el = ensureOverlay();
    el.querySelector('[data-role="title"]').textContent = opts.title || "알림";
    el.querySelector('[data-role="body"]').textContent = opts.message || "";

    var foot = el.querySelector('[data-role="foot"]');
    foot.innerHTML = "";

    (opts.buttons || []).forEach(function (b) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "btn" + (b.primary ? " primary" : "");
      btn.textContent = b.label;
      btn.addEventListener("click", function () {
        close();
        if (typeof b.onClick === "function") b.onClick();
      });
      foot.appendChild(btn);
    });

    el.classList.add("show");
  }

  /* ----- public API ----- */

  window.fn_notify = function (message, opts) {
    opts = opts || {};
    open({
      title: opts.title || "알림",
      message: message,
      buttons: [{ label: opts.okText || "확인", primary: true, onClick: opts.onOk }],
    });
  };

  window.fn_confirm = function (message, onYes, opts) {
    opts = opts || {};
    open({
      title: opts.title || "확인",
      message: message,
      buttons: [
        { label: opts.noText || "취소", primary: false, onClick: opts.onNo },
        { label: opts.yesText || "확인", primary: true, onClick: onYes },
      ],
    });
  };

  window.fn_modalClose = close;
})();
