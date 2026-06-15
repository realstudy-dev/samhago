/* ============================================================================
   세븐닷 - 사이트 공통 푸터 (PG 심사 필수 표기)
   ============================================================================

   [사용법]
   페이지의 </body> 직전에 아래 2줄만 추가하면 자동 렌더됩니다.

     <div id="site-footer-mount"></div>
     <script src="footer.js"></script>

   [수정 방법]
   ① 사업자 정보가 바뀌면 아래 BIZ_INFO 객체만 수정
   ② 정책 링크의 동작은 페이지에서 fn_openPolicy(type) 함수를 정의하면
      해당 함수가 우선 호출됨. 없으면 이 파일의 기본 alert 동작 사용.
   ③ 디자인 변경 시 CSS 변수만 손봐도 됨.

   [PG 가맹점 심사 필수 항목]
   - 상호명 / 대표자 / 사업자등록번호 / 통신판매신고번호
   - 사업장 주소 / 고객센터 / 이메일
   - 개인정보보호책임자
   - 이용약관 / 개인정보처리방침 / 청약철회·환불정책 링크
   ============================================================================ */

(function () {
  /* --------------------------------------------------------------------------
     [수정 영역] 사업자 정보 - 사업자등록증 / 통신판매업 신고증 기준 정확히 입력
     -------------------------------------------------------------------------- */
  const BIZ_INFO = {
    company: "(주)리얼스터디",
    ceo: "문현경",
    bizNo: "636-86-03095",
    mailOrderNo: "제 2023-서울금천-2115 호",
    address: "서울시 금천구 가산디지털2로 173, 323호",
    tel: "02-6263-0982",
    telHours: "평일 08:00~17:00 / 점심 11:30~12:30",
    email: "service@real-study.co.kr",
    privacyOfficer: "정상률",
    brand: "SEVENDOT",
    copyright: "Copyright @Real-study All Reserved",
  };

  /* --------------------------------------------------------------------------
     공통 CSS - 모든 페이지에 동일하게 주입
     -------------------------------------------------------------------------- */
  const CSS = `
    .site-footer{
      margin-top:30px;padding:24px 14px;
      background:#f5f7f7;
      border-top:1px solid #dee2e6;
      font-size:13px;color:#97989b;line-height:1.7;
      font-family:"Pretendard Variable",Pretendard,system-ui,"Apple SD Gothic Neo","Malgun Gothic",sans-serif;
    }
    .site-footer *{box-sizing:border-box;}
    .site-footer .ft-inner{margin:0 auto;}

    /* 정책 링크 */
    .site-footer .ft-links{
      margin-bottom:16px;padding-bottom:14px;
      border-bottom:1px solid #dee2e6;
      display:flex;gap:18px;flex-wrap:wrap;align-items:center;
    }
    .site-footer .ft-links a{
      color:rgba(49,58,70,.85);text-decoration:none;
      font-size:14px;font-weight:700;cursor:pointer;
      display:inline-flex;align-items:center;gap:4px;
    }
    .site-footer .ft-links a:hover{color:#009D5B;text-decoration:underline;}
    .site-footer .ft-links a.em{color:#009D5B;}
    .site-footer .ft-links .ft-sep{color:#dee2e6;}

    /* 사업자 정보 그리드 */
    .site-footer .ft-info{
      display:grid;grid-template-columns:repeat(2,1fr);
      gap:6px 32px;
    }
    .site-footer .ft-info .row{display:flex;gap:10px;font-size:13px;}
    .site-footer .ft-info .row .k{
      color:rgba(49,58,70,.85);font-weight:700;
      min-width:104px;flex-shrink:0;
    }
    .site-footer .ft-info .row .v{color:#97989b;flex:1;word-break:keep-all;}
    .site-footer .ft-info .row .v a.biz-check{
      color:#009D5B;cursor:pointer;font-weight:700;margin-left:4px;
    }
    .site-footer .ft-info .row .v a.biz-check:hover{text-decoration:underline;}

    /* 카피 라이트 */
    .site-footer .ft-copy{
      margin-top:16px;padding-top:14px;
      border-top:1px solid #dee2e6;
      display:flex;justify-content:space-between;align-items:center;
      gap:8px;flex-wrap:wrap;
    }
    .site-footer .ft-copy .copy-brand{
      font-size:14px;font-weight:800;letter-spacing:1px;
      color:rgba(49,58,70,.85);
    }
    .site-footer .ft-copy .copy-text{font-size:13px;color:#97989b;}

    /* 모바일 대응 */
    @media (max-width: 768px){
      .site-footer{padding:18px 12px;margin-top:24px;}
      .site-footer .ft-links{gap:10px 14px;margin-bottom:12px;padding-bottom:10px;}
      .site-footer .ft-links a{font-size:13px;}
      .site-footer .ft-info{grid-template-columns:1fr;gap:4px;}
      .site-footer .ft-info .row .k{min-width:90px;}
      .site-footer .ft-copy{flex-direction:column;align-items:flex-start;}
    }
  `;

  /* --------------------------------------------------------------------------
     HTML 빌더 - BIZ_INFO 값으로 렌더링
     -------------------------------------------------------------------------- */
  function buildHtml(b) {
    return `
    <footer class="site-footer">
      <div class="ft-inner">

        <!-- 정책 링크 (PG 심사 필수) -->
        <div class="ft-links">
          <a onclick="fn_openPolicy('terms')">이용약관</a>
          <a class="em" onclick="fn_openPolicy('privacy')">개인정보처리방침</a>
          <a onclick="fn_openPolicy('refund')">청약철회 · 환불정책</a>
          <a onclick="fn_openPolicy('biz')">사업자정보확인</a>
          <a onclick="fn_openPolicy('cs')">고객센터</a>
        </div>

        <!-- 사업자 정보 -->
        <div class="ft-info">
          <div class="row"><div class="k">상호명</div><div class="v">${b.company}</div></div>
          <div class="row"><div class="k">대표자</div><div class="v">${b.ceo}</div></div>
          <div class="row"><div class="k">사업자등록번호</div><div class="v">${b.bizNo} <a class="biz-check" onclick="fn_openBizCheck()">[사업자정보확인]</a></div></div>
          <div class="row"><div class="k">통신판매신고번호</div><div class="v">${b.mailOrderNo}</div></div>
          <div class="row"><div class="k">사업장 주소</div><div class="v">${b.address}</div></div>
          <div class="row"><div class="k">고객센터</div><div class="v">${b.tel} <span style="color:#cbd1d8;">(${b.telHours})</span></div></div>
          <div class="row"><div class="k">이메일</div><div class="v">${b.email}</div></div>
          <div class="row"><div class="k">개인정보보호책임자</div><div class="v">${b.privacyOfficer}</div></div>
        </div>

        <!-- 카피라이트 -->
        <div class="ft-copy">
          <div class="copy-brand">${b.brand}</div>
          <div class="copy-text">${b.copyright}</div>
        </div>
      </div>
    </footer>`;
  }

  /* --------------------------------------------------------------------------
     기본 핸들러 - 페이지에서 같은 이름 함수를 정의하면 그쪽이 우선
     -------------------------------------------------------------------------- */
  /* 이 footer.js 가 로드된 경로로부터 admin 루트까지의 상대 prefix 계산
     예) <script src="common/footer.js">      → ""        (루트)
         <script src="../common/footer.js">   → "../"     (서브폴더)
         <script src="../../common/footer.js">→ "../../"  (2단계) */
  function rootPrefix() {
    const scripts = document.getElementsByTagName("script");
    for (let i = scripts.length - 1; i >= 0; i--) {
      const src = scripts[i].getAttribute("src") || "";
      const m = src.match(/^(.*?)common\/footer\.js(?:\?.*)?$/);
      if (m) return m[1]; // common/ 앞부분이 곧 루트까지의 prefix
    }
    return "";
  }

  if (typeof window.fn_openPolicy !== "function") {
    window.fn_openPolicy = function (type) {
      const base = rootPrefix();
      const map = {
        terms: base + "policy/terms.html",
        privacy: base + "policy/privacy.html",
        refund: base + "policy/refund.html",
        biz: base + "policy/business.html",
        cs: base + "inquiry/inquiry_list.html",
      };
      const url = map[type];
      if (!url) return;
      // 정책 페이지는 새 탭, 내부 메뉴는 현재 탭 이동
      if (type === "cs") {
        window.location.href = url;
      } else {
        window.open(url, "_blank");
      }
    };
  }
  if (typeof window.fn_openBizCheck !== "function") {
    window.fn_openBizCheck = function () {
      // 공정거래위원회 사업자정보 조회 페이지
      // window.open('https://www.ftc.go.kr/bizCommPop.do?wrkr_no=' + BIZ_INFO.bizNo.replace(/-/g,''), '_blank');
      alert("공정거래위원회 사업자정보 조회 페이지로 이동합니다.");
    };
  }

  /* --------------------------------------------------------------------------
     주입 - CSS는 head에, HTML은 #site-footer-mount 자리에
     -------------------------------------------------------------------------- */
  function inject() {
    if (!document.getElementById("site-footer-css")) {
      const style = document.createElement("style");
      style.id = "site-footer-css";
      style.textContent = CSS;
      document.head.appendChild(style);
    }
    const mount = document.getElementById("site-footer-mount");
    if (mount) mount.outerHTML = buildHtml(BIZ_INFO);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inject);
  } else {
    inject();
  }
})();
