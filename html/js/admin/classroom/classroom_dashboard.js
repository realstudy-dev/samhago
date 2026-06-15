/* ============================================================================
   교사용 반 대시보드 - 페이지 전용 스크립트
   ----------------------------------------------------------------------------
   현재는 mock 데이터 기반 프로토타입. 실제 연동 시 students/coupons/ledger 등을
   서버 응답으로 교체하고, 지급/승인 액션은 API 호출로 바꾼다.
   공통: fn_confirm (admin-common.js) 사용.
   ============================================================================ */

/* 학생: 실제 등록 폼 기준 데이터 구조 */
const students = [
  { name: "김우주",  loginId: "wuju.kim@sb.co.kr",    classNum: 1,  grade: "중2", birthDate: "2011-03-15", parentName: "김민수",  parentPhone: "01012345678", studentStatus: "정상이용", usageStart: "2026-03-01", usageEnd: "2026-12-31", notifications: true,  memo: "",                level: "6-1", lastLogin: "2026.06.12 09:14", points: 120, status: "오늘 학습 완료", tag: "연속 7일"  },
  { name: "김하랑",  loginId: "harang.kim@sb.co.kr",   classNum: 2,  grade: "중2", birthDate: "2011-07-22", parentName: "이수연",  parentPhone: "01098765432", studentStatus: "정상이용", usageStart: "2026-03-01", usageEnd: "2026-12-31", notifications: true,  memo: "",                level: "6-1", lastLogin: "2026.06.12 08:52", points: 165, status: "오늘 학습 완료", tag: "연속 11일" },
  { name: "박지한",  loginId: "jihan.park@sb.co.kr",   classNum: 3,  grade: "중2", birthDate: "2011-05-08", parentName: "박영철",  parentPhone: "01087654321", studentStatus: "정상이용", usageStart: "2026-03-01", usageEnd: "2026-12-31", notifications: false, memo: "",                level: "6-1", lastLogin: "2026.06.11 17:30", points: 98,  status: "오늘 학습 완료", tag: ""          },
  { name: "이서온",  loginId: "seon.lee@sb.co.kr",     classNum: 4,  grade: "중2", birthDate: "2011-09-30", parentName: "이기현",  parentPhone: "01076543210", studentStatus: "정상이용", usageStart: "2026-03-01", usageEnd: "2026-12-31", notifications: true,  memo: "",                level: "6-1", lastLogin: "2026.06.10 14:22", points: 82,  status: "칭찬 3회",      tag: ""          },
  { name: "이도현",  loginId: "dohyun.lee@sb.co.kr",   classNum: 5,  grade: "중2", birthDate: "2011-01-20", parentName: "이승준",  parentPhone: "01065432109", studentStatus: "정상이용", usageStart: "2026-03-01", usageEnd: "2026-12-31", notifications: true,  memo: "",                level: "6-1", lastLogin: "2026.06.12 07:48", points: 73,  status: "",              tag: "연속 5일"  },
  { name: "정민아",  loginId: "mina.jung@sb.co.kr",    classNum: 6,  grade: "중2", birthDate: "2011-11-14", parentName: "정태호",  parentPhone: "01054321098", studentStatus: "정상이용", usageStart: "2026-03-01", usageEnd: "2026-12-31", notifications: true,  memo: "",                level: "6-1", lastLogin: "2026.06.12 09:05", points: 104, status: "오늘 학습 완료", tag: "칭찬 2회"  },
  { name: "최민준",  loginId: "minjun.choi@sb.co.kr",  classNum: 7,  grade: "중2", birthDate: "2011-06-03", parentName: "최현우",  parentPhone: "01043210987", studentStatus: "정상이용", usageStart: "2026-03-01", usageEnd: "2026-12-31", notifications: false, memo: "",                level: "6-1", lastLogin: "2026.06.11 20:11", points: 56,  status: "오늘 학습 완료", tag: ""          },
  { name: "한예린",  loginId: "yerin.han@sb.co.kr",    classNum: 8,  grade: "중2", birthDate: "2011-08-17", parentName: "한정훈",  parentPhone: "01032109876", studentStatus: "정상이용", usageStart: "2026-03-01", usageEnd: "2026-12-31", notifications: true,  memo: "학습 집중력 우수", level: "6-1", lastLogin: "2026.06.12 08:37", points: 122, status: "연속 9일",       tag: "칭찬 4회"  },
  { name: "강서준",  loginId: "seojun.kang@sb.co.kr",  classNum: 9,  grade: "중2", birthDate: "2011-04-25", parentName: "강병호",  parentPhone: "01021098765", studentStatus: "이용중지", usageStart: "2026-03-01", usageEnd: "2026-06-30", notifications: false, memo: "6월 말 복귀 예정", level: "6-1", lastLogin: "2026.06.09 16:45", points: 86,  status: "오늘 학습 완료", tag: ""          },
  { name: "박소율",  loginId: "soyul.park@sb.co.kr",   classNum: 10, grade: "중2", birthDate: "2011-12-05", parentName: "박종민",  parentPhone: "01010987654", studentStatus: "정상이용", usageStart: "2026-03-01", usageEnd: "2026-12-31", notifications: true,  memo: "",                level: "6-1", lastLogin: "2026.06.11 13:08", points: 63,  status: "",              tag: "연속 4일"  },
  { name: "윤지후",  loginId: "jihoo.yoon@sb.co.kr",   classNum: 11, grade: "중2", birthDate: "2011-02-28", parentName: "윤재석",  parentPhone: "01009876543", studentStatus: "정상이용", usageStart: "2026-03-01", usageEnd: "2026-12-31", notifications: true,  memo: "",                level: "6-1", lastLogin: "2026.06.12 09:22", points: 104, status: "오늘 학습 완료", tag: "칭찬 3회"  },
  { name: "임서준",  loginId: "seojun.lim@sb.co.kr",   classNum: 12, grade: "중2", birthDate: "2011-10-11", parentName: "임현아",  parentPhone: "01098765001", studentStatus: "정상이용", usageStart: "2026-03-01", usageEnd: "2026-12-31", notifications: true,  memo: "",                level: "6-1", lastLogin: "2026.06.08 11:53", points: 46,  status: "",              tag: "연속 3일"  },
];

let selected = 7,
  target = 2240,
  resetOffset = 0,
  toastTimer,
  searchQuery = "";
let selBulk = new Set();
function updateBulkBar() {
  if ($("#bulkSelCount")) $("#bulkSelCount").textContent = selBulk.size + "명 선택";
  if ($("#bulkSelectAll")) $("#bulkSelectAll").checked = selBulk.size > 0 && selBulk.size >= students.length;
  if ($("#bulkGiveBtn")) $("#bulkGiveBtn").disabled = !selBulk.size;
}
/* 일괄 지급 사유: 커스텀 드롭다운 (Material 아이콘 표시 + 직접 입력) */
let bulkReasonIdx = 0,
  bulkReasonCustom = false;
function currentBulkReason() {
  if (bulkReasonCustom) {
    return {
      icon: "edit",
      name: ($("#customReasonName")?.value || "").trim() || "직접 입력 칭찬",
      brick: Math.max(1, +($("#customReasonBrick")?.value || 0) || 5),
    };
  }
  return praiseReasons[bulkReasonIdx] || praiseReasons[0];
}
function renderBulkReasonSelect() {
  const btn = $("#bulkReasonBtn"),
    menu = $("#bulkReasonMenu");
  if (!btn || !menu) return;
  if (bulkReasonIdx >= praiseReasons.length) bulkReasonIdx = 0;
  const cur = bulkReasonCustom ? { icon: "edit", name: "직접 입력" } : praiseReasons[bulkReasonIdx];
  btn.innerHTML = `${micon(cur.icon)}<span>${cur.name}${cur.brick ? ` (+${cur.brick})` : ""}</span><span class="material-symbols-outlined cd-dd-arrow">expand_more</span>`;
  menu.innerHTML =
    praiseReasons
      .map((r, i) => `<button type="button" class="cd-reason-dd-item${!bulkReasonCustom && i === bulkReasonIdx ? " active" : ""}" data-reasonidx="${i}">${micon(r.icon)}${r.name} (+${r.brick})</button>`)
      .join("") +
    `<button type="button" class="cd-reason-dd-item custom${bulkReasonCustom ? " active" : ""}" data-reasonidx="custom">${micon("edit")}직접 입력...</button>` +
    `<button type="button" class="cd-reason-dd-item manage" data-reasonidx="manage">${micon("add_circle")}칭찬 사유 추가하러 가기</button>`;
  if ($("#customReasonWrap")) $("#customReasonWrap").hidden = !bulkReasonCustom;
}

let praiseReasons = [
  { icon: "thumb_up", name: "칭찬 참여", brick: 5, desc: "수업과 학습에 성실하게 참여했습니다." },
  { icon: "chat_bubble", name: "오답 다시 풀기", brick: 5, desc: "틀린 문제를 포기하지 않고 다시 풀어보았습니다." },
  { icon: "favorite", name: "친구 도와주기", brick: 5, desc: "친구가 어려워하는 부분을 친절하게 도와주었습니다." },
  { icon: "track_changes", name: "수업 집중", brick: 5, desc: "수업 시간에 집중하며 학습 활동에 적극적으로 참여했습니다." },
];
let selectedPraiseReason = 0;

let aiTone = "따뜻하게",
  aiFocus = "꾸준한 학습 참여",
  aiComments = [];

let coupons = [
  { name: "자리 우선권", icon: "🪑", price: 30, stock: 5, day: "금요일", visible: "공개", desc: "하루 동안 원하는 자리를 먼저 선택할 수 있어요." },
  { name: "선생님 칭찬 카드", icon: "⭐", price: 20, stock: 10, day: "언제나", visible: "공개", desc: "선생님이 특별 칭찬 카드를 써줘요." },
  { name: "독서 자리 선택권", icon: "📚", price: 25, stock: 6, day: "언제나", visible: "공개", desc: "독서 시간에 원하는 독서 자리를 선택할 수 있어요." },
  { name: "아침활동 선택권", icon: "🍀", price: 35, stock: 4, day: "교사 승인 후", visible: "공개", desc: "아침활동 중 하나를 선택해 친구들과 함께 할 수 있어요." },
  { name: "미술 도구 우선 선택권", icon: "🎨", price: 25, stock: 5, day: "미술 있는 날", visible: "공개", desc: "미술 시간에 사용할 도구나 재료를 먼저 선택할 수 있어요." },
  { name: "반 음악 신청권", icon: "🎵", price: 15, stock: 8, day: "금요일", visible: "공개", desc: "쉬는 시간 또는 정리 시간에 들을 음악을 신청할 수 있어요." },
  { name: "정리 도우미 면제권", icon: "🧹", price: 40, stock: 3, day: "월 1회", visible: "공개", desc: "정해진 날의 정리 도우미 활동을 한 번 쉬어갈 수 있어요." },
  { name: "미니 게임 5분권", icon: "🎮", price: 50, stock: 2, day: "금요일", visible: "공개", desc: "반 약속을 지키고 금요일에 미니 게임 5분을 사용할 수 있어요." },
];
let couponRequests = [
  { student: "김하랑", coupon: "자리 우선권", price: 30, time: "오늘 09:10", status: "승인 대기" },
  { student: "윤지후", coupon: "반 음악 신청권", price: 15, time: "오늘 09:25", status: "승인" },
  { student: "한예린", coupon: "독서 자리 선택권", price: 25, time: "어제 14:40", status: "승인 대기" },
];
let ledger = [
  { time: "오늘 09:12", student: "김하랑", type: "적립", reason: "오늘 학습 완료", amount: 5, balance: 165, tier: "골드" },
  { time: "오늘 09:20", student: "한예린", type: "적립", reason: "오답 다시 풀기", amount: 5, balance: 122, tier: "실버" },
  { time: "오늘 09:35", student: "윤지후", type: "사용", reason: "반 음악 신청권 사용", amount: -15, balance: 104 },
  { time: "어제 14:40", student: "박소율", type: "적립", reason: "영어 단어 학습", amount: 3, balance: 63, tier: "브론즈" },
  { time: "어제 13:20", student: "김우주", type: "공동목표", reason: "공동목표 기여", amount: 5, balance: 120 },
];

const $ = (s) => document.querySelector(s);
function toast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2200);
}
function show(id) {
  const m = $(id);
  if (m) m.classList.add("show");
}
function hide(id) {
  const m = $(id);
  if (m) m.classList.remove("show");
}

function total() {
  return students.reduce((a, b) => a + (b.points || 0), 0);
}
function goalNow() {
  return Math.max(0, total() - resetOffset);
}

/* 아바타 제거됨 — 호출부 호환을 위해 빈 문자열 반환 */
function avatar() {
  return "";
}

/* ----- 활동 이력(통합 히스토리) ----- */
let historyFilter = "all";
function buildActivity() {
  const items = [];
  ledger.forEach((r) =>
    items.push({
      group: "brick",
      cat: r.type === "사용" ? "포인트 사용" : r.type === "공동목표" ? "공동목표" : "포인트 적립",
      tone: r.type === "사용" ? "warning" : r.type === "공동목표" ? "info" : "success",
      time: r.time,
      who: r.student,
      text: r.reason,
      tier: r.tier || null,
      meta: (r.amount > 0 ? "+" : "") + r.amount + "p",
    })
  );
  couponRequests.forEach((r) =>
    items.push({ group: "market", cat: "포인트장터", tone: r.status === "승인" ? "success" : "info", time: r.time, who: r.student, text: r.coupon + " · " + r.status, meta: r.price + "p" })
  );
  [
    ["오늘의 수업 안내", "오늘 09:30"],
    ["주간 준비물 안내", "어제 16:20"],
    ["아침활동 공지", "5/20"],
  ].forEach((b) => items.push({ group: "board", cat: "알림게시판", tone: "neutral", time: b[1], who: "전체 학생", text: b[0], meta: "" }));
  aiComments.forEach((c) => items.push({ group: "ai", cat: "AI 코멘트", tone: "info", time: "방금 전", who: c.student, text: c.purpose, meta: "" }));
  return items;
}
const TIER_CLS = { "골드": "gold", "실버": "silver", "브론즈": "bronze" };
function renderHistory() {
  const all = buildActivity();
  const rows = all.filter((i) => historyFilter === "all" || i.group === historyFilter);
  if ($("#historyRows"))
    $("#historyRows").innerHTML = rows.length
      ? rows
          .map(
            (r) => {
              const tierBadge = r.tier ? `<span class="cd-tier cd-tier-${TIER_CLS[r.tier]}">${r.tier}</span> ` : "";
              const amtCls = r.meta.startsWith("+") ? "money-plus" : r.meta.startsWith("-") ? "money-minus" : "money";
              const amtHtml = r.meta ? `<b class="${amtCls}">${r.meta}</b>` : "";
              return `<tr>
        <td class="muted">${r.time}</td>
        <td><span class="badge ${r.tone}">${r.cat}</span></td>
        <td>${r.who}</td><td>${r.text}</td>
        <td class="right">${tierBadge}${amtHtml}</td>
      </tr>`;
            }
          )
          .join("")
      : '<tr><td colspan="5" class="center muted empty-cell">이력이 없습니다.</td></tr>';
  if ($("#historyCount")) $("#historyCount").textContent = rows.length + "건";
  if ($("#histBrickCount")) $("#histBrickCount").textContent = all.filter((i) => i.group === "brick").length;
  if ($("#histMarketCount")) $("#histMarketCount").textContent = all.filter((i) => i.group === "market").length;
  if ($("#histBoardCount")) $("#histBoardCount").textContent = all.filter((i) => i.group === "board").length;
  if ($("#histAiCount")) $("#histAiCount").textContent = all.filter((i) => i.group === "ai").length;
}

/* ----- 날짜 네비게이터 (학습 이력 페이지) ----- */
let dateOffset = 0; // 0=오늘, -1=어제, ...
function _dateFromOffset(offset) {
  const d = new Date(2026, 5, 12); // mock: today=2026-06-12
  d.setDate(d.getDate() + offset);
  return d;
}
function formatDateNav(offset) {
  const d = _dateFromOffset(offset);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const dow = ["일", "월", "화", "수", "목", "금", "토"][d.getDay()];
  const suffix = offset === 0 ? " (오늘)" : offset === -1 ? " (어제)" : "";
  return `${y}.${m}.${day} ${dow}${suffix}`;
}
function renderDateNav() {
  const label = $("#dateNavLabel");
  const next = $("#dateNavNext");
  const todayBtn = $("#todayBtn");
  if (label) label.textContent = formatDateNav(dateOffset);
  if (next) next.disabled = dateOffset >= 0;
  if (todayBtn) todayBtn.style.display = dateOffset < 0 ? "" : "none";
}

/* ----- 오늘의 학습내역 ----- */
/* 포인트 등급: 정답률 기준 (골드≥90·5p / 실버≥80·3p / 브론즈<80·1p) */
function brickTier(acc) {
  if (acc >= 90) return { name: "골드", cls: "gold", pt: 5 };
  if (acc >= 80) return { name: "실버", cls: "silver", pt: 3 };
  return { name: "브론즈", cls: "bronze", pt: 1 };
}
function renderToday() {
  if (!$("#todayRows")) return;
  renderDateNav();
  const subjects = ["국어", "수학", "영어"];
  /* 표·요약 단일 소스 */
  const all = students.map((s, i) => {
    const acc = 70 + ((i * 7) % 30);
    return {
      num: i + 1,
      name: s.name,
      sub: subjects[i % 3],
      lv: `${s.grade} · ${8 + (i % 5)}회차`,
      acc,
      time: 15 + ((i * 3) % 25),
      done: !!(s.status?.includes("학습")),
      tier: brickTier(acc),
    };
  });
  /* 요약 카드: 반 전체 기준 (완료 학생만 집계) */
  const doneArr = all.filter((a) => a.done);
  const doneN = doneArr.length;
  const totPt = doneArr.reduce((a, b) => a + b.tier.pt, 0);
  const cnt = (c) => doneArr.filter((a) => a.tier.cls === c).length;
  if ($("#lhDone")) $("#lhDone").textContent = doneN + "명";
  if ($("#lhTotal")) $("#lhTotal").textContent = "전체 " + all.length + "명";
  if ($("#lhAcc")) $("#lhAcc").textContent = doneN ? Math.round(doneArr.reduce((a, b) => a + b.acc, 0) / doneN) : 0;
  if ($("#lhBrick")) $("#lhBrick").textContent = totPt;
  if ($("#lhBrickSub")) $("#lhBrickSub").textContent = `골드 ${cnt("gold")} · 실버 ${cnt("silver")} · 브론즈 ${cnt("bronze")}`;
  if ($("#lhTime")) $("#lhTime").textContent = doneN ? Math.round(doneArr.reduce((a, b) => a + b.time, 0) / doneN) : 0;
  /* 필터 + 표 */
  const subj = $("#todaySubject")?.value || "전체 과목";
  const q = ($("#todaySearch")?.value || "").trim();
  const rows = all.filter((r) => (subj === "전체 과목" || r.sub === subj) && (!q || r.name.includes(q)));
  $("#todayRows").innerHTML = rows.length
    ? rows
        .map(
          (r) => `<tr>
        <td class="center muted">${r.num}</td>
        <td>${r.name}</td><td>${r.sub}</td><td class="muted">${r.done ? r.lv : "-"}</td>
        <td class="center">${r.done ? r.acc + "%" : "-"}</td>
        <td class="right">${r.done ? `<span class="cd-tier cd-tier-${r.tier.cls}">${r.tier.name}</span> <b class="money-plus">+${r.tier.pt}p</b>` : '<span class="muted">-</span>'}</td>
        <td class="center">${r.done ? r.time + "분" : "-"}</td>
        <td class="center"><span class="badge ${r.done ? "success" : "neutral"}">${r.done ? "완료" : "미완료"}</span></td>
      </tr>`
        )
        .join("")
    : '<tr><td colspan="8" class="center muted empty-cell">결과가 없습니다.</td></tr>';
  $("#todayCount").textContent = rows.length;
}

/* ----- 월별 학습현황: 달력 히트맵 ----- */
function renderMonthly() {
  const cal = $("#monthCal");
  if (!cal) return;
  const first = new Date(2026, 5, 1).getDay(); // 2026-06-01 요일 (0=일)
  const days = new Date(2026, 6, 0).getDate(); // 6월 일수
  const today = 10;
  let html = "";
  for (let i = 0; i < first; i++) html += '<div class="cd-cal-cell empty"></div>';
  for (let d = 1; d <= days; d++) {
    if (d > today) {
      html += `<div class="cd-cal-cell future"><span>${d}</span></div>`;
      continue;
    }
    const lv = d % 6 === 0 ? 0 : (d * 7) % 5; // 0~4
    const pct = lv === 0 ? 0 : lv * 20 + 8;
    html += `<div class="cd-cal-cell lv${lv} ${d === today ? "today" : ""}" data-tip="6월 ${d}일 · 완료율 ${pct}%"><span>${d}</span></div>`;
  }
  cal.innerHTML = html;
  const calTip = (() => {
    let t = document.getElementById("cdCalTip");
    if (!t) { t = document.createElement("div"); t.id = "cdCalTip"; t.className = "cd-cal-tip"; t.hidden = true; document.body.appendChild(t); }
    return t;
  })();
  cal.querySelectorAll(".cd-cal-cell[data-tip]").forEach((cell) => {
    cell.addEventListener("mouseenter", () => { calTip.textContent = cell.dataset.tip; calTip.hidden = false; });
    cell.addEventListener("mousemove", (e) => { calTip.style.left = (e.clientX + 14) + "px"; calTip.style.top = (e.clientY - 38) + "px"; });
    cell.addEventListener("mouseleave", () => { calTip.hidden = true; });
  });
}

/* ----- FAQ ----- */
let faqs = [
  { cat: "학습", q: "오늘 학습이 기록되지 않을 때는 어떻게 하나요?", a: "학습 완료 후에도 기록이 보이지 않으면 앱을 새로고침하거나, 학습관리 > 오늘의 학습내역에서 동기화 상태를 확인하세요. 5분 이상 반영되지 않으면 문의관리로 접수해 주세요." },
  { cat: "포인트", q: "포인트는 어떻게 적립되나요?", a: "오늘 학습 완료, 오답 다시 풀기, 교사 칭찬, 공동목표 기여 등으로 적립됩니다. 적립 기준은 설정 > 학습 완료 보상에서 변경할 수 있습니다." },
  { cat: "포인트", q: "포인트를 잘못 지급했어요.", a: "포인트 > 통장 내역에서 해당 내역을 확인한 뒤, 반대 구분(사용)으로 조정 지급하면 됩니다. 이력은 활동 이력에 모두 남습니다." },
  { cat: "포인트장터", q: "쿠폰 신청을 어떻게 승인하나요?", a: "포인트장터 > 쿠폰 사용 신청 현황에서 승인/반려할 수 있습니다. 승인 시 학생 포인트가 차감됩니다." },
  { cat: "계정", q: "학생 계정 비밀번호를 초기화하고 싶어요.", a: "설정 > 반 정보에서 학생을 선택해 비밀번호를 초기화할 수 있습니다. (실제 앱 연동 예정)" },
  { cat: "학습", q: "월별 학습현황은 어디서 보나요?", a: "학습관리 > 월별 학습현황에서 달력 히트맵과 과목별 누적 완료율을 확인할 수 있습니다." },
];
let faqCat = "전체";
function renderFaq() {
  if (!$("#faqList")) return;
  const list = faqs.filter((f) => faqCat === "전체" || f.cat === faqCat);
  $("#faqList").innerHTML = list.length
    ? list
        .map(
          (f) => `<div class="cd-faq-item">
        <button class="cd-faq-q" type="button"><span><span class="chip">${f.cat}</span> ${f.q}</span><span class="cd-faq-ico">+</span></button>
        <div class="cd-faq-a">${f.a}</div>
      </div>`
        )
        .join("")
    : '<div class="empty-state">해당 카테고리의 FAQ가 없습니다.</div>';
}

/* ----- 반 홈: 주간 추이 영역 차트 (순수 SVG · 호버 툴팁) ----- */
function renderClassTrend() {
  const el = $("#classTrend");
  if (!el) return;
  // 하루 골드/실버/브론즈 분포 (v = 합계)
  const data = [
    { d: "월", g: 12, s: 11, b: 7 },
    { d: "화", g: 18, s: 15, b: 12 },
    { d: "수", g: 15, s: 13, b: 10 },
    { d: "목", g: 26, s: 22, b: 14 },
    { d: "금", g: 22, s: 18, b: 12 },
    { d: "토", g: 30, s: 24, b: 16 },
    { d: "일", g: 27, s: 22, b: 15 },
  ];
  data.forEach((x) => (x.v = x.g + x.s + x.b));
  const W = 700,
    H = 180,
    P = 16;
  const max = Math.max(...data.map((d) => d.v)) * 1.18;
  const x = (i) => P + (i * (W - 2 * P)) / (data.length - 1);
  const y = (v) => H - P - (v / max) * (H - 2 * P);
  const colW = (W - 2 * P) / (data.length - 1);
  const pts = data.map((d, i) => [x(i), y(d.v)]);
  const line = pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ");
  const area = `M ${x(0).toFixed(1)} ${H - P} ` + pts.map((p) => "L " + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ") + ` L ${x(data.length - 1).toFixed(1)} ${H - P} Z`;
  const dots = pts.map((p, i) => `<circle class="cd-trend-dot" data-i="${i}" cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="3.5" fill="#fff" stroke="#009d5b" stroke-width="2"/>`).join("");
  const cols = data.map((d, i) => `<rect class="cd-trend-col" data-i="${i}" x="${(x(i) - colW / 2).toFixed(1)}" y="0" width="${colW.toFixed(1)}" height="${H}" fill="transparent"/>`).join("");
  el.innerHTML =
    `<svg viewBox="0 0 ${W} ${H}" class="cd-area-svg" role="img" aria-label="주간 포인트 획득 추이">
      <defs><linearGradient id="cdAreaG" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#009d5b" stop-opacity=".22"/><stop offset="100%" stop-color="#009d5b" stop-opacity="0"/>
      </linearGradient></defs>
      <path d="${area}" fill="url(#cdAreaG)"/>
      <path d="${line}" fill="none" stroke="#009d5b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>
      ${dots}
      ${cols}
    </svg>` +
    `<div class="cd-area-x">${data.map((d) => `<span>${d.d}</span>`).join("")}</div>` +
    `<div class="cd-trend-tip" id="trendTip" hidden></div>`;

  const tip = el.querySelector("#trendTip");
  const showTip = (i, rect) => {
    const dd = data[i];
    tip.innerHTML =
      `<b>${dd.d}요일 · ${dd.v}포인트</b>` +
      `<div class="cd-trend-row"><span class="d gold"></span>골드 ${dd.g}</div>` +
      `<div class="cd-trend-row"><span class="d silver"></span>실버 ${dd.s}</div>` +
      `<div class="cd-trend-row"><span class="d bronze"></span>브론즈 ${dd.b}</div>`;
    tip.hidden = false;
    const cr = rect.getBoundingClientRect();
    const er = el.getBoundingClientRect();
    tip.style.left = (cr.left - er.left + cr.width / 2) + "px";
  };
  el.querySelectorAll(".cd-trend-col").forEach((rect) => {
    rect.addEventListener("mouseenter", () => {
      showTip(+rect.dataset.i, rect);
      el.querySelectorAll(".cd-trend-dot").forEach((c) => c.classList.toggle("on", c.dataset.i === rect.dataset.i));
    });
  });
  el.addEventListener("mouseleave", () => {
    tip.hidden = true;
    el.querySelectorAll(".cd-trend-dot").forEach((c) => c.classList.remove("on"));
  });
}

/* ----- 반 홈: 이번 주 칭찬 TOP ----- */
/* 이번 주 칭찬 랭킹 데이터 (랭킹 박스·학생 카드 TOP 배지 공용) */
const PRAISE_RANK = [
  { i: 1, n: 5 },
  { i: 7, n: 4 },
  { i: 10, n: 3 },
  { i: 5, n: 2 },
];
function renderPraiseRank() {
  const el = $("#praiseRank");
  if (!el) return;
  const ranks = PRAISE_RANK.filter((r) => students[r.i]);
  el.innerHTML = ranks
    .map(
      (r, idx) => `<div class="cd-rank-item">
        <span class="cd-rank-no r${idx + 1}">${idx + 1}</span>
        <div class="cd-rank-name">${students[r.i].name}</div>
        <span class="cd-rank-cnt">칭찬 ${r.n}회</span>
      </div>`
    )
    .join("");
}

/* ----- 반 홈: 이번 주 포인트 TOP (포인트 보유 상위) ----- */
function renderBrickRank() {
  const el = $("#brickRank");
  if (!el) return;
  const top = students
    .map((s, i) => ({ i, n: s.points }))
    .sort((a, b) => b.n - a.n)
    .slice(0, 4);
  el.innerHTML = top
    .map(
      (r, idx) => `<div class="cd-rank-item">
        <span class="cd-rank-no r${idx + 1}">${idx + 1}</span>
        <div class="cd-rank-name">${students[r.i].name}</div>
        <span class="cd-rank-cnt brick">${r.n.toLocaleString()}p</span>
      </div>`
    )
    .join("");
}

/* ----- 좌측 사이드바 메뉴 (아이콘 + 라벨, 그룹) ----- */
/* Google Material Symbols 이름 매핑 */
const ICONS = {
  home: "home",
  history: "history",
  list: "assignment",
  calendar: "calendar_month",
  groups: "groups",
  person: "person",
  chart: "monitoring",
  coin: "paid",
  store: "storefront",
  sun: "wb_sunny",
  chat: "forum",
  bell: "notifications",
  help: "help",
  gear: "settings",
  ext: "open_in_new",
};
function micon(name) {
  return `<span class="material-symbols-outlined">${ICONS[name] || name}</span>`;
}
/* 레일 = 대분류 (앱인토스 개발자센터형): 직행 메뉴 or 그룹(옆 패널 트리) */
const NAV = [
  { key: "home", label: "홈", icon: "home", menu: "class" },
  {
    key: "ops", label: "운영", icon: "groups", title: "반 운영",
    items: [
      { menu: "classmgmt", label: "반 관리" },
      { menu: "students", label: "학생 관리" },
      { menu: "board", label: "게시판" },
    ],
  },
  {
    key: "brick", label: "포인트", icon: "coin", title: "포인트 경제",
    items: [
      { menu: "brick", label: "포인트" },
      { menu: "market", label: "포인트장터" },
    ],
  },
  {
    key: "records", label: "이력", icon: "history", title: "이력",
    items: [
      { menu: "learning", label: "학습 이력" },
      { menu: "history", label: "활동 이력" },
    ],
  },
  { key: "faq", label: "FAQ", icon: "help", menu: "faq" },
  { key: "settings", label: "설정", icon: "gear", menu: "settings" },
];

/* 메뉴 키가 속한 레일 그룹 찾기 */
function _groupOf(menu) {
  for (const g of NAV) {
    if (!g.items) continue;
    for (const it of g.items) {
      if (it.menu === menu) return g;
      if (it.children && it.children.some((c) => c.menu === menu)) return g;
    }
  }
  return null;
}

function renderSideMenu() {
  const el = $("#cdSideMenu");
  if (!el) return;
  el.innerHTML = NAV.map((g) => {
    if (!g.items) {
      return `<button type="button" data-menu="${g.menu}">${micon(g.icon)}<span class="cd-si-full">${g.label}</span><span class="cd-si-short">${g.label}</span></button>`;
    }
    /* 그룹: 레일 버튼 + (모바일 전용) 평탄화 항목 */
    const flat = g.items
      .flatMap((it) => (it.children ? it.children : [it]))
      .map((c) => `<button type="button" data-menu="${c.menu}">${c.label}</button>`)
      .join("");
    return `<button type="button" class="cd-has-sub" data-group="${g.key}">${micon(g.icon)}<span class="cd-si-full">${g.label}</span><span class="cd-si-short">${g.label}</span></button><div class="cd-m-flat">${flat}</div>`;
  }).join("");
}

/* ----- 2차 패널: 그룹 메뉴 트리 (아코디언 2뎁스 · 열린 채 유지) ----- */
let _subPanel = null;
function getSubPanel() {
  if (!_subPanel) {
    _subPanel = document.createElement("div");
    _subPanel.className = "cd-subpanel";
    _subPanel.addEventListener("click", (e) => {
      const acc = e.target.closest(".cd-sp-acc-head");
      if (acc) {
        acc.parentElement.classList.toggle("open");
        return;
      }
      const btn = e.target.closest("[data-menu]");
      if (btn) setView(btn.dataset.menu);
    });
    document.body.appendChild(_subPanel);
  }
  return _subPanel;
}
function showSubPanel(key) {
  const g = NAV.find((x) => x.key === key);
  if (!g || !g.items) return;
  const panel = getSubPanel();
  panel.dataset.sub = key;
  const isActive = (menu) => menu === CURRENT_PAGE;
  panel.innerHTML =
    `<div class="cd-subpanel-head">${g.title}</div>` +
    g.items
      .map((it) => {
        if (it.children) {
          const childActive = it.children.some((c) => isActive(c.menu));
          return `<div class="cd-sp-acc${childActive ? " open" : ""}">
            <button type="button" class="cd-sp-acc-head">${it.label}<span class="material-symbols-outlined cd-sp-arrow" aria-hidden="true">expand_more</span></button>
            <div class="cd-sp-acc-body">${it.children.map((c) => `<button type="button" class="cd-subpanel-item sub${isActive(c.menu) ? " active" : ""}" data-menu="${c.menu}">${c.label}</button>`).join("")}</div>
          </div>`;
        }
        return `<button type="button" class="cd-subpanel-item${isActive(it.menu) ? " active" : ""}" data-menu="${it.menu}">${it.label}</button>`;
      })
      .join("");
  panel.classList.add("open");
  document.body.classList.add("subpanel-open");
  document.querySelectorAll(".cd-has-sub").forEach((b) => b.classList.toggle("sub-open", b.dataset.group === key));
}
function closeSubPanel() {
  if (_subPanel) _subPanel.classList.remove("open");
  document.body.classList.remove("subpanel-open");
  document.querySelectorAll(".cd-has-sub.sub-open").forEach((b) => b.classList.remove("sub-open"));
}

/* ----- 반 홈: 운영 위젯 (학습 미완료 명단 / 승인 대기 / 최근 활동) ----- */
function renderHomeOps() {
  const incompleteList = students.map((s, i) => ({ s, i })).filter(({ s }) => !(s.status?.includes("학습")));
  const inc = $("#homeIncomplete");
  if (inc) {
    const list = incompleteList;
    inc.innerHTML = list.length
      ? list.map(({ s, i }) => `<button type="button" class="cd-stu-chip" data-i="${i}"><span class="cd-stu-no c${i % 6}">${i + 1}</span>${s.name}</button>`).join("")
      : '<div class="cd-desc">모든 학생이 오늘 학습을 완료했어요.</div>';
    const cnt = $("#homeIncompleteCount");
    if (cnt) {
      cnt.textContent = list.length ? list.length + "명" : "완료";
      cnt.className = "badge " + (list.length ? "warning" : "success");
    }
  }
  /* 히어로·KPI·도넛: students 데이터 단일 소스로 동기화 */
  const total = students.length,
    done = total - incompleteList.length,
    pct = total ? Math.round((done / total) * 100) : 0;
  if ($("#heroDone")) $("#heroDone").textContent = done + "명";
  if ($("#heroLeft")) $("#heroLeft").textContent = incompleteList.length + "명";
  if ($("#kpiDonePct")) $("#kpiDonePct").innerHTML = pct + '<span class="u">%</span>';
  if ($("#kpiDoneSub")) $("#kpiDoneSub").textContent = done + " / " + total + "명 완료";
  if ($("#kpiNeed")) $("#kpiNeed").innerHTML = incompleteList.length + '<span class="u">명</span>';
  if ($("#donutToday")) $("#donutToday").style.setProperty("--pct", pct + "%");
  if ($("#donutPct")) $("#donutPct").textContent = pct + "%";
  if ($("#legendDone")) $("#legendDone").textContent = done + "명";
  if ($("#legendNeed")) $("#legendNeed").textContent = incompleteList.length + "명";
  if ($("#legendTotal")) $("#legendTotal").textContent = total + "명";
  const dateEl = $("#heroDate");
  if (dateEl) {
    const d = new Date(),
      days = ["일", "월", "화", "수", "목", "금", "토"];
    dateEl.textContent = `${d.getMonth() + 1}월 ${d.getDate()}일 ${days[d.getDay()]}요일 · 4학년 1반 · 학생 ${total}명`;
  }
  const ap = $("#homeApprovals");
  if (ap) {
    const waits = couponRequests.map((r, i) => ({ r, i })).filter(({ r }) => r.status === "승인 대기");
    ap.innerHTML = waits.length
      ? waits
          .map(
            ({ r, i }) => `<div class="cd-approve-row">
            <div class="cd-approve-info"><b>${r.student}</b><span class="cd-desc">${r.coupon} · ${r.price}포인트</span></div>
            <div class="cd-approve-btns"><button class="btn-sm approve" type="button" data-action="approveCoupon" data-i="${i}">승인</button><button class="btn-sm reject" type="button" data-action="rejectCoupon" data-i="${i}">반려</button></div>
          </div>`
          )
          .join("")
      : '<div class="cd-desc">처리할 신청이 없습니다.</div>';
  }
  const feed = $("#homeActivity");
  if (feed) {
    feed.innerHTML = buildActivity()
      .slice(0, 6)
      .map(
        (r) => `<div class="cd-feed-row"><span class="cd-feed-time">${r.time}</span><span class="badge ${r.tone}">${r.cat}</span><span class="cd-feed-text"><b>${r.who}</b> ${r.text}</span><span class="cd-feed-meta">${r.meta || ""}</span></div>`
      )
      .join("");
  }
  renderHomePraise();
  renderBriefing();
  /* 요약 카드: 연속 학습 스트릭 7일 이상인 학생 수 */
  if ($("#streakCount")) {
    const n = students.filter((s) => {
      const m = (s.tag || "").match(/연속\s*(\d+)일/);
      return m && +m[1] >= 7;
    }).length;
    $("#streakCount").innerHTML = n + '<span class="unit">명</span>';
  }
}

/* 반 홈: 오늘 브리핑 (할 일 3카운트 — 게시판/미완료/승인) */
function renderBriefing() {
  if (!$("#todayBriefing")) return;
  const posted = isMorningPostedToday();
  const incomplete = students.filter((s) => !(s.status || "").includes("학습")).length;
  const waits = couponRequests.filter((r) => r.status === "승인 대기").length;
  const mi = (n) => `<span class="material-symbols-outlined">${n}</span>`;
  const set = (id, warn, warnHTML, okHTML) => {
    const el = $(id);
    if (!el) return;
    el.classList.toggle("warn", warn);
    el.classList.toggle("ok", !warn);
    el.innerHTML = warn ? warnHTML : okHTML;
  };
  set("#briefMorning", !posted, mi("wb_sunny") + "게시판 미게시", mi("wb_sunny") + "게시판 게시 완료");
  set("#briefStudents", incomplete > 0, mi("school") + `학습 미완료 <b>${incomplete}명</b>`, mi("school") + "학습 모두 완료");
  set("#briefApprove", waits > 0, mi("storefront") + `승인 대기 <b>${waits}건</b>`, mi("storefront") + "승인 대기 없음");
  const cnt = (posted ? 0 : 1) + (incomplete ? 1 : 0) + (waits ? 1 : 0);
  if ($("#briefTitle")) $("#briefTitle").textContent = cnt ? `오늘 할 일 ${cnt}개` : "오늘 할 일 완료";
}

/* 칭찬 포인트 지급 후보 (연속 학습 등 칭찬할 만한 학생) — 처리할 일 카드 */
let praisedToday = new Set();
function renderHomePraise() {
  const el = $("#homePraise");
  if (!el) return;
  const cands = students.map((s, i) => ({ s, i })).filter(({ s }) => (s.tag || "").includes("연속")).slice(0, 4);
  el.innerHTML = cands.length
    ? cands
        .map(({ s, i }) => {
          const done = praisedToday.has(i);
          const reason = s.tag || "꾸준한 참여";
          return `<div class="cd-praise-cand">
            <span class="cd-stu-no c${i % 6}">${i + 1}</span>
            <div class="cd-pc-info"><b>${s.name}</b><span class="cd-desc">${reason}</span></div>
            ${done ? '<span class="badge success">지급 완료</span>' : `<button class="btn-sm approve" type="button" data-action="homeGivePraise" data-i="${i}">+5 지급</button>`}
          </div>`;
        })
        .join("")
    : '<div class="cd-desc">지금은 추천할 학생이 없습니다.</div>';
  const cnt = $("#homePraiseCount");
  if (cnt) {
    const remain = cands.filter(({ i }) => !praisedToday.has(i)).length;
    cnt.textContent = remain ? remain + "명" : "완료";
    cnt.className = "badge " + (remain ? "warning" : "success");
  }
}

/* ----- 요약카드 보조문구 등락 색 (증가=빨강, 하락=파랑) ----- */
function colorizeSub() {
  document.querySelectorAll(".summary-cards .sc-sub").forEach((el) => {
    const t = el.textContent;
    el.classList.remove("up", "down");
    if (/[+▲]/.test(t)) el.classList.add("up");
    else if (/[▼]/.test(t) || /(^|[^\d])-\s?\d/.test(t)) el.classList.add("down");
  });
}

/* ----- 학습 현황: 내부 탭(오늘/월별/주간리포트) ----- */
let currentLTab = "today";
function setLearningTab(name) {
  currentLTab = name;
  document.querySelectorAll("#learningTabs button").forEach((b) => b.classList.toggle("active", b.dataset.ltab === name));
  document.querySelectorAll(".cd-ltab-pane").forEach((p) => p.classList.toggle("active", p.dataset.lpane === name));
  if (name === "today") renderToday();
  if (name === "monthly") renderMonthly();
  if (name === "report") renderPraiseWeek();
}
/* 주간리포트: 학생별 이번 주 받은 칭찬 */
/* 주간리포트: 챙겨볼 학생 (이번 주 미완료 누적 — mock은 오늘 미완료 학생 기준) */
function renderReportCare() {
  const el = $("#rpNeedCare");
  if (!el) return;
  const list = students.map((s, i) => ({ s, i })).filter(({ s }) => !(s.status || "").includes("학습")).slice(0, 4);
  el.innerHTML = list.length
    ? list.map(({ s, i }) => `<button type="button" class="cd-stu-chip" data-i="${i}"><span class="cd-stu-no c${i % 6}">${i + 1}</span>${s.name}</button>`).join("")
    : '<div class="cd-desc">이번 주에는 챙겨볼 학생이 없어요.</div>';
}

function renderPraiseWeek() {
  const el = $("#praiseWeek");
  if (!el) return;
  el.innerHTML = students
    .map((s, i) => {
      const got = praiseReasons.filter((_, ri) => (i + ri) % 2 === 0).slice(0, 6);
      if (!got.length) return "";
      return `<div class="cd-pw-item" data-i="${i}">
        ${avatar(i)}
        <div class="cd-pw-body">
          <div class="cd-pw-name">${s.name} <span class="cd-pw-cnt">칭찬 ${got.length}회</span></div>
          <div class="cd-pw-tags">${got.map((g) => `<span class="cd-pw-tag">${micon(g.icon)} ${g.name}</span>`).join("")}</div>
        </div>
        <span class="material-symbols-outlined cd-pw-go">chevron_right</span>
      </div>`;
    })
    .filter(Boolean)
    .join("");
  /* 요약: 칭찬 받은 학생 수를 실제 렌더 결과와 동기화 (12명 반 기준) */
  const praised = el.querySelectorAll(".cd-pw-item").length;
  if ($("#rpPraised")) $("#rpPraised").textContent = praised + "명";
  if ($("#rpTotalSub")) $("#rpTotalSub").textContent = "전체 " + students.length + "명 중";
}

/* ----- 반 홈: 오늘 확인할 일 (체크 가능한 투두) ----- */
let todos = [
  { icon: "fact_check", title: "학습 미완료 학생 확인", desc: "오늘 세븐닷 학습 미완료 3명", menu: "learning", ltab: "today", action: "확인하기", done: false },
  { icon: "volunteer_activism", title: "칭찬 포인트 지급", desc: "오답 다시 풀기·꾸준한 참여 학생에게 지급", menu: "brick", action: "지급하기", done: false },
  { icon: "storefront", title: "포인트장터 신청 승인", desc: "자리 우선권 등 학생 신청 확인", menu: "market", action: "승인하기", done: false },
  { icon: "wb_sunny", title: "게시판 게시", desc: "오늘 안내가 학생 화면에 게시되었습니다", menu: "board", action: "보기", done: true },
];
function renderTodos() {
  const el = $("#todoList");
  if (!el) return;
  el.innerHTML = todos
    .map(
      (t, i) => `<div class="cd-todo ${t.done ? "done" : ""}">
        <button class="cd-todo-check" type="button" data-action="toggleTodo" data-i="${i}" title="완료 표시"><span class="material-symbols-outlined">${t.done ? "check_circle" : "radio_button_unchecked"}</span></button>
        <div class="cd-todo-body"><b>${t.title}</b><span class="cd-desc">${t.desc}</span></div>
        ${t.done ? '<span class="badge success">완료</span>' : `<button class="btn-sm approve" type="button" data-menu="${t.menu}"${t.ltab ? ` data-ltab="${t.ltab}"` : ""}>${t.action}</button>`}
      </div>`
    )
    .join("");
  const remain = todos.filter((t) => !t.done).length;
  const badge = $("#todoCount");
  if (badge) {
    badge.textContent = remain ? remain + "건 남음" : "모두 완료";
    badge.className = "badge " + (remain ? "warning" : "success");
  }
}

/* ----- 뷰 전환 (페이지 분리: 메뉴별 독립 HTML) ----- */
const PAGE_URLS = {
  class: "classroom_home.html",
  learning: "classroom_learning.html",
  history: "classroom_history.html",
  classmgmt: "classroom_manage.html",
  students: "classroom_students.html",
  brick: "classroom_brick.html",
  market: "classroom_market.html",
  board: "classroom_board.html",
  faq: "classroom_faq.html",
  settings: "classroom_settings.html",
};
const CURRENT_PAGE = document.body.dataset.page || "class";

const VIEW_TITLES = {
  class: "반 홈",
  classmgmt: "반 관리",
  students: "학생",
  brick: "포인트",
  market: "포인트장터",
  report: "주간리포트",
  board: "게시판",
  history: "활동 이력",
  learning: "학습 이력",
  faq: "FAQ",
  settings: "설정",
};

function setView(name, opts) {
  /* 다른 페이지의 메뉴면 해당 HTML로 이동 */
  if (name !== CURRENT_PAGE && PAGE_URLS[name]) {
    /* 일부 정적 서버가 clean-URL 리다이렉트로 쿼리를 제거하므로 sessionStorage에도 보관 */
    if (opts && opts.ltab) {
      try { sessionStorage.setItem("cd_ltab", opts.ltab); } catch (e) {}
    }
    window.location.href = PAGE_URLS[name] + (opts && opts.ltab ? "?ltab=" + opts.ltab : "");
    return;
  }
  const grp = _groupOf(name);
  /* 그룹 소속 화면이면 패널을 열어두고(항목 강조 갱신), 아니면 닫기 */
  if (!grp) {
    closeSubPanel();
  } else if (_subPanel && _subPanel.classList.contains("open") && _subPanel.dataset.sub === grp.key) {
    _subPanel.querySelectorAll(".cd-subpanel-item").forEach((b) => b.classList.toggle("active", b.dataset.menu === name));
  } else {
    showSubPanel(grp.key);
  }
  document.querySelectorAll(".cd-view").forEach((v) => v.classList.toggle("active", v.id === "view-" + name));
  document.querySelectorAll(".cd-side-menu > button").forEach((b) => {
    if (b.dataset.menu) b.classList.toggle("active", b.dataset.menu === name);
    else if (b.dataset.group) b.classList.toggle("active", !!grp && b.dataset.group === grp.key);
  });
  const h2 = document.querySelector(".page-header h2");
  if (h2 && VIEW_TITLES[name]) h2.textContent = VIEW_TITLES[name];
  if (name === "brick") renderBrick();
  if (name === "market") renderMarket();
  if (name === "history") renderHistory();
  if (name === "board") preview();
  if (name === "students") renderRoster();
  if (name === "classmgmt") { renderPraiseReasonList(); renderPraiseWeek(); renderReportCare(); }
  if (name === "learning") setLearningTab(currentLTab);
  if (name === "faq") renderFaq();
  updateAll();
}

/* ----- 학생 카드 ----- */
let studentSortMode = "number"; // "number" | "seating"

/* 칭찬·포인트 TOP3 순위 맵 — 홈 랭킹 박스와 동일 데이터로 카드에 배지 표시 */
let _topRanks = { praise: {}, brick: {} };
function computeTopRanks() {
  const praise = {}, brick = {};
  PRAISE_RANK.slice(0, 3).forEach((r, idx) => { if (students[r.i]) praise[r.i] = idx + 1; });
  students
    .map((s, i) => ({ i, n: s.points }))
    .sort((a, b) => b.n - a.n)
    .slice(0, 3)
    .forEach((r, idx) => { brick[r.i] = idx + 1; });
  _topRanks = { praise, brick };
}

function studentCard(s, i) {
  const learned = s.status?.includes("학습");
  const pr = _topRanks.praise[i], br = _topRanks.brick[i];
  const tag = s.tag || "";
  const streak = tag.includes("연속") ? tag : "";
  const praiseCnt = tag.includes("칭찬") ? tag : "";
  return `<article class="cd-student ${learned ? "done" : "undone"} ${selBulk.has(i) ? "sel" : ""}" data-i="${i}">
    <div class="cd-stu-top">
      <span class="cd-status-chip ${learned ? "done" : "undone"}">${learned ? "학습 완료" : "학습 미완료"}</span>
      <input type="checkbox" class="cd-stu-check" data-i="${i}" ${selBulk.has(i) ? "checked" : ""} title="일괄 지급 선택" />
    </div>
    <div class="cd-stu-main">
      <span class="cd-stu-no" title="반번호">${s.classNum ?? i + 1}</span>
      <div class="cd-stu-info">
        <div class="name">${s.name}</div>
        <div class="money">${s.points.toLocaleString()}<small>포인트</small></div>
      </div>
    </div>
    <div class="cd-stu-meta">
      ${streak ? `<span class="cd-meta-chip streak">${micon("local_fire_department")}${streak}</span>` : ""}
      ${praiseCnt ? `<span class="cd-meta-chip praise">${micon("thumb_up")}${praiseCnt}</span>` : ""}
      ${pr ? `<span class="cd-meta-chip rank-praise">${micon("emoji_events")}칭찬 ${pr}위</span>` : ""}
      ${br ? `<span class="cd-meta-chip rank-brick">${micon("emoji_events")}포인트 ${br}위</span>` : ""}
    </div>
  </article>`;
}

function renderStudents() {
  const q = searchQuery.trim().toLowerCase();
  computeTopRanks();
  /* 자리배치도 순으로 볼 때만 배치 변경 링크 노출 */
  if ($("#seatEditLink")) $("#seatEditLink").hidden = studentSortMode !== "seating";
  if ($("#studentCount")) $("#studentCount").innerHTML = '전체 <b class="text-green">' + students.length + "</b>명";
  if ($("#cmStudentTotal")) $("#cmStudentTotal").innerHTML = students.length + '<span class="unit">명</span>';
  const container = $("#students");
  if (!container) return;

  if (studentSortMode === "seating") {
    if (!seatMap.length) initSeatMap();
    container.style.gridTemplateColumns = `repeat(${seatCols}, 1fr)`;
    container.innerHTML = seatMap.map((si) => {
      if (si === null || si >= students.length) return '<div class="cd-student-empty">·</div>';
      const s = students[si];
      if (q && !s.name.includes(q)) return '<div class="cd-student-empty">·</div>';
      return studentCard(s, si);
    }).join("");
  } else {
    container.style.gridTemplateColumns = "";
    const list = students.map((s, i) => ({ s, i })).filter(({ s }) => !q || s.name.includes(q));
    container.innerHTML = list.length
      ? list.map(({ s, i }) => studentCard(s, i)).join("")
      : '<div class="empty-state">검색 결과가 없습니다.</div>';
  }
}

/* 학생 명단(등록·수정 전용) 테이블 */
function renderRoster() {
  if (!$("#rosterRows")) return;
  const q = ($("#rosterSearch")?.value || "").trim();
  const list = students.map((s, i) => ({ s, i })).filter(({ s }) => !q || s.name.includes(q));
  $("#rosterRows").innerHTML = list.length
    ? list
        .map(({ s, i }) => {
          const lvMaj = parseInt(s.level);
          const lvCls = lvMaj >= 5 ? "success" : lvMaj >= 3 ? "info" : "neutral";
          const stCls = s.studentStatus === "이용중지" ? "warning" : s.studentStatus === "탈퇴" ? "neutral" : "success";
          return `<tr class="cd-roster-link" data-rowi="${i}">
            <td class="center muted">${s.classNum ?? i + 1}</td>
            <td><b>${s.name}</b></td>
            <td class="muted" style="font-size:12px">${s.loginId}</td>
            <td class="center">${s.grade}</td>
            <td class="center"><span class="badge ${lvCls}">${s.level}</span></td>
            <td class="center" style="font-size:12px">${s.lastLogin}</td>
            <td class="center"><span class="badge ${stCls}">${s.studentStatus || "정상이용"}</span></td>
            <td class="right money">${s.points}p</td>
            <td class="right"><button class="btn-sm" type="button" data-action="editStudent" data-i="${i}">수정</button> <button class="btn-sm reject" type="button" data-action="deleteStudent" data-i="${i}">삭제</button></td>
          </tr>`;
        })
        .join("")
    : '<tr><td colspan="9" class="center muted empty-cell">학생이 없습니다.</td></tr>';
  if ($("#rosterCount")) $("#rosterCount").textContent = students.length;
}
function openStudentNew() {
  $("#studentModalTitle").textContent = "학생 등록";
  const fields = { newStudentName:"", newStudentLoginId:"", newStudentClassNum:"", newStudentBirthDate:"",
    newStudentParentName:"", newStudentParentPhone:"", newStudentPw:"", newStudentPwConfirm:"", newStudentMemo:"" };
  Object.entries(fields).forEach(([id, v]) => { if ($("#"+id)) $("#"+id).value = v; });
  if ($("#newStudentGrade")) $("#newStudentGrade").value = "중2";
  if ($("#newStudentLevel")) $("#newStudentLevel").value = "6-1";
  document.querySelector('input[name="studentStatusR"][value="정상이용"]')?.click();
  document.querySelector('input[name="notificationsR"][value="true"]')?.click();
  const today = "2026-06-12";
  if ($("#newStudentUsageStart")) $("#newStudentUsageStart").value = today;
  if ($("#newStudentUsageEnd")) $("#newStudentUsageEnd").value = "2026-12-31";
  delete $("#newStudentName").dataset.editIndex;
  show("#studentModal");
}
function openStudentEdit(i) {
  const s = students[i];
  if (!s) return;
  $("#studentModalTitle").textContent = "학생 수정";
  $("#newStudentName").value = s.name;
  if ($("#newStudentLoginId")) $("#newStudentLoginId").value = s.loginId || "";
  if ($("#newStudentClassNum")) $("#newStudentClassNum").value = s.classNum || "";
  if ($("#newStudentBirthDate")) $("#newStudentBirthDate").value = s.birthDate || "";
  if ($("#newStudentGrade")) $("#newStudentGrade").value = s.grade;
  if ($("#newStudentParentName")) $("#newStudentParentName").value = s.parentName || "";
  if ($("#newStudentParentPhone")) $("#newStudentParentPhone").value = s.parentPhone || "";
  if ($("#newStudentLevel")) $("#newStudentLevel").value = String(s.level);
  if ($("#newStudentMemo")) $("#newStudentMemo").value = s.memo || "";
  const stRadio = document.querySelector(`input[name="studentStatusR"][value="${s.studentStatus || "정상이용"}"]`);
  if (stRadio) stRadio.checked = true;
  const notiRadio = document.querySelector(`input[name="notificationsR"][value="${s.notifications ? "true" : "false"}"]`);
  if (notiRadio) notiRadio.checked = true;
  if ($("#newStudentUsageStart")) $("#newStudentUsageStart").value = s.usageStart || "";
  if ($("#newStudentUsageEnd")) $("#newStudentUsageEnd").value = s.usageEnd || "";
  $("#newStudentName").dataset.editIndex = i;
  show("#studentModal");
}

function updateAll() {
  const current = goalNow(),
    pct = target ? Math.min(100, Math.round((current / target) * 100)) : 0,
    left = Math.max(0, target - current);
  document.querySelectorAll(".totalNum").forEach((e) => (e.textContent = total().toLocaleString()));
  document.querySelectorAll(".cd-bar").forEach((e) => (e.style.width = pct + "%"));
  document.querySelectorAll(".cd-goal-inline-bar-fill").forEach((e) => (e.style.width = pct + "%"));
  document.querySelectorAll(".percent").forEach((e) => (e.textContent = pct + "%"));
  document.querySelectorAll(".cd-goal-left").forEach((e) => (e.textContent = `목표까지 ${left} 포인트 남음`));
  document.querySelectorAll(".classGoalPct").forEach((e) => (e.textContent = pct + "%"));
  document.querySelectorAll(".classGoalText").forEach((e) => (e.textContent = "목표까지 " + left + "포인트 남음"));
  document.querySelectorAll(".couponWait").forEach((e) => (e.textContent = couponRequests.filter((r) => r.status === "승인 대기").length + "건"));
  document.querySelectorAll(".goalNow").forEach((e) => (e.textContent = current.toLocaleString()));
  if ($("#goalCurrent")) $("#goalCurrent").value = current;
  if ($("#goalPreview")) $("#goalPreview").textContent = `${$("#goalTitle").value} · ${pct}% 달성 · 목표까지 ${left} 포인트 남았어요!`;
  renderStudents();
  renderBank();
  renderBrickRank();
  renderHomeOps();
}

/* ----- 게시판 ----- */
function makeSchedule() {
  if (!$("#schedule")) return;
  const subs = ["국어", "수학", "과학", "미술", "", ""];
  $("#schedule").innerHTML = subs
    .map((v, i) => `<div class="cd-period"><span>${i + 1}교시</span><input class="periodInput" data-p="${i + 1}" value="${v}" placeholder="입력" /></div>`)
    .join("");
}
function updateMorningStatus() {
  const periodInputs = [...document.querySelectorAll(".periodInput")];
  const subjects = periodInputs.map((x, i) => (x.value ? `${i + 1}교시 ${x.value}` : "")).filter(Boolean);
  const subjectText = subjects.length ? subjects.join(", ") : "아직 입력되지 않았습니다.";
  const subjectSummary = periodInputs.map((x) => x.value).filter(Boolean).slice(0, 4).join(" · ") || "미입력";
  if ($("#morningSubjectSummary")) $("#morningSubjectSummary").textContent = subjectSummary;
  if ($("#morningPreviewClass")) $("#morningPreviewClass").textContent = subjectText;
  if ($("#morningPreviewReady")) $("#morningPreviewReady").textContent = $("[data-field=ready]")?.value || "미입력";
  if ($("#morningPreviewMorning")) $("#morningPreviewMorning").textContent = $("[data-field=morning]")?.value || "미입력";
  if ($("#morningPreviewNotice")) $("#morningPreviewNotice").textContent = $("[data-field=notice]")?.value || "미입력";
}
function preview() {
  if (!$("#previewSchedule")) return;
  $("#previewSchedule").innerHTML = [...document.querySelectorAll(".periodInput")]
    .map((x) => `<span class="chip">${x.dataset.p}교시 ${x.value || "미입력"}</span>`)
    .join("");
  $("#pReady").textContent = $("[data-field=ready]").value;
  $("#pMorning").textContent = $("[data-field=morning]").value;
  $("#pNotice").textContent = $("[data-field=notice]").value;
  updateMorningStatus();
}

/* ----- 게시판 게시 이력 (게시판 리스트 + 보기/복제) ----- */
let morningPosts = [
  { title: "오늘의 수업 안내", date: "오늘 09:30", target: "전체 학생 21명", schedule: ["국어", "수학", "과학", "미술", "", ""], ready: "국어 공책, 수학 익힘책, 색연필 준비", morning: "세븐닷 학습 완료 후 독서 10분 하기", notice: "오늘은 미술 준비물을 꼭 챙겨 주세요." },
  { title: "주간 준비물 안내", date: "어제 16:20", target: "전체 학생 21명", schedule: ["국어", "수학", "체육", "음악", "", ""], ready: "색연필, 풀, 수학 익힘책 준비", morning: "아침 독서 10분 하기", notice: "준비물을 미리 챙겨 주세요." },
  { title: "아침활동 공지", date: "5/20", target: "전체 학생 21명", schedule: ["국어", "수학", "통합", "창체", "", ""], ready: "독서록 준비", morning: "세븐닷 학습 완료 후 독서 10분", notice: "아침활동 약속을 잘 지켜요." },
];
let mvIndex = 0;

/* 오늘 게시 여부 (board에서 게시하면 sessionStorage로 home에 반영) */
function _todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}
function isMorningPostedToday() {
  try {
    return sessionStorage.getItem("cd_morning_posted") === _todayKey();
  } catch (e) {
    return false;
  }
}
function setMorningPostedToday() {
  try {
    sessionStorage.setItem("cd_morning_posted", _todayKey());
  } catch (e) {}
}
/* 반 홈 상단 게시판 배너 (미게시=촉구 / 게시 완료=요약) */
function renderMorningBanner() {
  const el = $("#morningBanner");
  if (!el) return;
  const posted = isMorningPostedToday();
  const today = morningPosts[0];
  el.dataset.posted = posted ? "true" : "false";
  const status = $("#mbStatus"),
    desc = $("#mbDesc"),
    prev = $("#mbPreview"),
    btn = $("#mbBtn");
  if (posted) {
    if (status) {
      status.textContent = "게시 완료";
      status.className = "badge success";
    }
    if (desc) desc.textContent = today.title + " · 오늘 학생 화면에 게시되었습니다.";
    if (prev) {
      const subj = today.schedule.filter(Boolean).slice(0, 4).join(" · ") || "-";
      prev.hidden = false;
      prev.innerHTML = `<span class="cd-mb-chip"><b>오늘의 수업</b> ${subj}</span><span class="cd-mb-chip"><b>확인</b> 18명 확인 · 3명 미확인</span>`;
    }
    if (btn) btn.textContent = "게시글 수정";
  } else {
    if (status) {
      status.textContent = "아직 미게시";
      status.className = "badge warning";
    }
    if (desc) desc.textContent = "아직 오늘 게시판을 올리지 않았어요. 학생들이 등교 전 확인할 수 있도록 게시해 주세요.";
    if (prev) prev.hidden = true;
    if (btn) btn.textContent = "지금 작성하기";
  }
  renderBriefing();
}

function renderMorningPosts() {
  const tb = $("#boardHistory");
  if (!tb) return;
  tb.innerHTML = morningPosts
    .map((p, i) => {
      const subj = p.schedule.filter(Boolean).slice(0, 4).join(" · ") || "-";
      return `<tr data-action="viewMorning" data-i="${i}">
        <td><b>${p.title}</b>${i === 0 ? ' <span class="badge success">게시 중</span>' : ' <span class="badge neutral">게시 종료</span>'}<div class="cd-desc">${subj}</div></td>
        <td><span class="badge neutral">${p.target}</span></td>
        <td class="muted">${p.date}</td>
        <td class="right"><button class="btn-sm" type="button" data-action="viewMorning" data-i="${i}">보기</button> <button class="btn-sm" type="button" data-action="dupMorning" data-i="${i}">복제</button></td>
      </tr>`;
    })
    .join("");
}
function viewMorning(i) {
  const p = morningPosts[i];
  if (!p) return;
  mvIndex = i;
  $("#mvTitle").textContent = p.title;
  $("#mvMeta").textContent = p.date + " · " + p.target;
  $("#mvSchedule").innerHTML = p.schedule.map((v, idx) => (v ? `<span class="chip">${idx + 1}교시 ${v}</span>` : "")).join("") || '<span class="cd-desc">미입력</span>';
  $("#mvReady").textContent = p.ready || "미입력";
  $("#mvMorning").textContent = p.morning || "미입력";
  $("#mvNotice").textContent = p.notice || "미입력";
  show("#morningViewModal");
}
function dupMorning(i) {
  const p = morningPosts[i];
  if (!p) return;
  [...document.querySelectorAll("#schedule .periodInput")].forEach((inp, idx) => {
    inp.value = p.schedule[idx] || "";
  });
  if ($("[data-field=ready]")) $("[data-field=ready]").value = p.ready || "";
  if ($("[data-field=morning]")) $("[data-field=morning]").value = p.morning || "";
  if ($("[data-field=notice]")) $("[data-field=notice]").value = p.notice || "";
  preview();
  hide("#morningViewModal");
  window.scrollTo({ top: 0, behavior: "smooth" });
  toast("이전 게시글을 복제했습니다. 수정 후 게시하세요.");
}

/* ----- 학생 상세 모달 (헤더 고정 + 내부 서브탭) ----- */
function setStudentTab(name) {
  document.querySelectorAll("#sdTabs button").forEach((b) => b.classList.toggle("active", b.dataset.sdtab === name));
  document.querySelectorAll(".cd-sd-pane").forEach((p) => p.classList.toggle("active", p.dataset.sdpane === name));
  const body = document.querySelector(".cd-sd-panes");
  if (body) body.scrollTop = 0;
}
function openStudentDetail(i) {
  selected = i;
  const s = students[i],
    base = i + 1;
  const data = {
    kor: [(base % 3) + 1, (base + 1) % 3, base % 2],
    math: [((base + 2) % 3) + 1, base % 3, (base + 1) % 2],
    eng: [((base + 1) % 3) + 1, (base + 2) % 3, base % 2],
  };
  $("#sdTitle").innerHTML = `${s.name} 학생 상세 <span class="cd-desc" id="sdPos">${i + 1} / ${students.length}</span>`;
  $("#sdName").textContent = s.name;
  $("#sdBalance").textContent = s.points;
  const learned = s.status?.includes("학습");
  $("#sdTags").innerHTML =
    `<span class="badge ${learned ? "success" : "neutral"}">${learned ? "오늘 학습 완료" : "오늘 학습 미완료"}</span>` +
    (s.tag ? ` <span class="badge warning">${s.tag}</span>` : "");

  const subs = [
    ["국어 레벨 2-1", "어휘 학습 완료", "kor"],
    ["수학 레벨 2-1", "연산 학습 완료", "math"],
    ["영어 레벨 A-1", "단어 학습 완료", "eng"],
  ];
  $("#sdLearningCards").innerHTML = subs
    .map(
      (x, idx) => `<div class="cd-learning-card">
        <div class="level">${x[0]}</div>
        <div class="round">${8 + (base % 4) + idx} 회차</div>
        <div class="cd-brick-count gold">골드포인트 <span>${data[x[2]][0]}</span></div>
        <div class="cd-brick-count silver">실버포인트 <span>${data[x[2]][1]}</span></div>
        <div class="cd-brick-count bronze">브론즈포인트 <span>${data[x[2]][2]}</span></div>
        <div class="cd-subject-summary">${x[1]}</div>
      </div>`
    )
    .join("");
  if ($("#sdStreak")) $("#sdStreak").textContent = s.tag?.includes("연속") ? s.tag.replace("연속 ", "") : i + 1 + "일";
  if ($("#sdDone")) $("#sdDone").textContent = learned ? "완료" : "미완료";
  if ($("#praiseList")) {
    $("#praiseList").innerHTML = [
      "성실 참여 · 세븐닷 학습에 꾸준히 참여했어요.",
      "오답 다시 풀기 · 어려운 문제도 끝까지 다시 도전했어요.",
      "수업 집중 · 오늘 수업에 집중하는 모습이 좋았어요.",
    ]
      .slice(0, (base % 3) + 1)
      .map((p) => `<div class="cd-praise-item">${p}</div>`)
      .join("");
  }
  renderPraiseReasons();
  renderStudentLedger(i);
  if ($("#quickTargetName")) $("#quickTargetName").textContent = s.name;
  if ($("#sdPos")) $("#sdPos").textContent = `${i + 1} / ${students.length}`;
  setStudentTab("learning");
  show("#studentDetailModal");
}
/* 상세 모달에서 옆 학생으로 이동 (화살표 버튼·방향키) */
function stepStudentDetail(dir) {
  openStudentDetail((selected + dir + students.length) % students.length);
}
document.addEventListener("keydown", (e) => {
  const modal = $("#studentDetailModal");
  if (!modal || getComputedStyle(modal).display === "none") return;
  if (e.target instanceof Element && e.target.matches("input, textarea, select")) return;
  if (e.key === "ArrowLeft") stepStudentDetail(-1);
  if (e.key === "ArrowRight") stepStudentDetail(1);
});

function renderStudentLedger(idx) {
  const el = $("#sdLedger");
  if (!el) return;
  const s = students[idx];
  const studentLedger = ledger.filter((r) => r.student === s.name);
  if (!studentLedger.length) {
    el.innerHTML = `<div class="cd-desc" style="padding:16px 0">아직 입출금 내역이 없습니다.</div>`;
    return;
  }
  el.innerHTML = studentLedger
    .map((r) => {
      const isIn = r.amount > 0;
      return `<div class="cd-ledger-row">
        <div class="cd-ledger-info">
          <span class="cd-ledger-reason">${r.reason || r.type || "-"}</span>
          <span class="cd-ledger-time muted">${r.time}</span>
        </div>
        <div class="cd-ledger-right">
          <span class="cd-ledger-amt ${isIn ? "text-green" : "text-red"}">${isIn ? "+" : ""}${r.amount} 포인트</span>
          <span class="cd-ledger-bal muted">${r.balance} 포인트</span>
        </div>
      </div>`;
    })
    .join("");
}

/* ----- 포인트장터 ----- */
function resetCouponForm() {
  if (!$("#couponName")) return;
  $("#couponName").value = "";
  $("#couponIcon").value = "🪑";
  $("#couponPrice").value = 30;
  $("#couponStock").value = 5;
  $("#couponDay").value = "언제나";
  $("#couponVisible").value = "공개";
  $("#couponDesc").value = "";
  delete $("#couponName").dataset.editIndex;
}
function renderMarket() {
  if (!$("#couponGrid")) return;
  $("#couponGrid").innerHTML = coupons
    .map(
      (c, i) => `<article class="cd-coupon">
        <div class="cd-coupon-top"><div class="cd-coupon-icon">${c.icon}</div><span class="badge ${c.visible === "공개" ? "success" : "neutral"}">${c.visible}</span></div>
        <div class="cd-coupon-title">${c.name}</div>
        <div class="cd-coupon-desc">${c.desc}</div>
        <div class="cd-coupon-meta"><span class="cd-price">${c.price} 포인트</span><span class="cd-desc">남은 수량 ${c.stock}</span></div>
        <div class="cd-desc">사용 가능: ${c.day}</div>
        <div class="cd-coupon-actions">
          <button class="btn-sm" type="button" data-action="editCoupon" data-i="${i}">수정</button>
          <button class="btn-sm" type="button" data-action="hideCoupon" data-i="${i}">${c.visible === "공개" ? "숨김" : "공개"}</button>
          <button class="btn-sm reject" type="button" data-action="deleteCoupon" data-i="${i}">삭제</button>
        </div>
      </article>`
    )
    .join("");
  $("#couponCount").textContent = coupons.length;
  $("#popularCoupon").textContent = coupons[0]?.name || "-";
  $("#couponRequests").innerHTML = couponRequests
    .map(
      (r, i) => `<tr>
        <td>${r.student}</td><td>${r.coupon}</td><td class="right">${r.price}포인트</td><td class="muted">${r.time}</td>
        <td class="center"><span class="badge ${r.status === "승인" ? "success" : "warning"}">${r.status}</span></td>
        <td class="right"><button class="btn-sm approve" type="button" data-action="approveCoupon" data-i="${i}">승인</button> <button class="btn-sm reject" type="button" data-action="rejectCoupon" data-i="${i}">반려</button></td>
      </tr>`
    )
    .join("");
  updateAll();
}

/* ----- 포인트 ----- */
function renderBrick() {
  renderLedger();
  renderBank();
  document.querySelectorAll(".brickPlus").forEach((e) => (e.textContent = ledger.filter((x) => x.amount > 0).reduce((a, b) => a + b.amount, 0)));
  document.querySelectorAll(".brickMinus").forEach((e) => (e.textContent = Math.abs(ledger.filter((x) => x.amount < 0).reduce((a, b) => a + b.amount, 0))));
}
function renderLedger() {
  const type = $("#brickTypeFilter")?.value || "전체",
    q = ($("#brickSearch")?.value || "").trim();
  const rows = ledger.filter((r) => (type === "전체" || r.type === type) && (!q || r.student.includes(q)));
  if (!$("#brickLedgerRows")) return;
  $("#brickLedgerRows").innerHTML =
    rows
      .map(
        (r) => `<tr>
          <td class="muted">${r.time}</td><td>${r.student}</td>
          <td><span class="badge ${r.type === "사용" ? "warning" : r.type === "공동목표" ? "info" : "success"}">${r.type}</span></td>
          <td>${r.reason}</td><td class="right money ${r.amount < 0 ? 'money-minus' : 'money-plus'}">${r.amount > 0 ? "+" : ""}${r.amount}p</td><td class="right">${r.balance}p</td>
        </tr>`
      )
      .join("") || '<tr><td colspan="6" class="center muted empty-cell">내역이 없습니다.</td></tr>';
}
function renderBank() {
  if (!$("#bankList")) return;
  $("#bankList").innerHTML = students
    .map(
      (s, i) => `<div class="cd-bank-item" data-bank="${i}">
        ${avatar(i)}
        <div><div class="name">${s.name}</div><div class="cd-desc">${s.status?.includes("학습") ? "오늘 학습 완료" : "학습 미완료"} · ${s.tag || "연속 기록 없음"}</div></div>
        <div class="cd-balance-pill">${s.points}p</div>
      </div>`
    )
    .join("");
  if ($("#brickGiveStudent")) $("#brickGiveStudent").innerHTML = students.map((s, i) => `<option value="${i}">${s.name} · ${s.points}p</option>`).join("");
}
function addBrick(i, type, reason, amount) {
  const signed = type === "사용" ? -Math.abs(amount) : Math.abs(amount);
  students[i].points = Math.max(0, students[i].points + signed);
  ledger.unshift({ time: "방금 전", student: students[i].name, type, reason, amount: signed, balance: students[i].points });
  selected = i;
  if ($("#sdBalance")) $("#sdBalance").textContent = students[i].points;
  updateAll();
  renderBrick();
}

/* ----- AI 코멘트 ----- */
function updateAIStudentSelect() {
  const sel = $("#aiStudentSelect");
  if (!sel) return;
  sel.innerHTML = students.map((s, i) => `<option value="${i}">${s.name} · ${s.points}p</option>`).join("");
  sel.value = selected;
}
function getStudentLearningSummary(i) {
  const s = students[i];
  return { name: s.name, money: s.points, learned: s.status?.includes("학습"), streak: s.tag || "연속 기록 없음" };
}
function generateAICommentText() {
  const idx = Number($("#aiStudentSelect")?.value ?? selected);
  const info = getStudentLearningSummary(idx);
  const purpose = $("#aiCommentPurpose")?.value || "weekly";
  const memo = ($("#aiCommentMemo")?.value || "").trim();
  const focus = aiFocus,
    tone = aiTone;
  let intro = "",
    body = "",
    closing = "";
  if (purpose === "parent") {
    intro = `${info.name}이는 이번 주 세븐닷 학습에 ${info.learned ? "성실하게 참여하며" : "참여를 시작하며"} 자신의 학습 습관을 만들어가고 있습니다.`;
    body = `특히 ${focus} 부분에서 긍정적인 모습을 보였고, 현재 ${info.money}포인트을 모으며 학습 동기를 이어가고 있습니다.`;
    closing = "가정에서도 꾸준히 응원해 주시면 자기주도 학습 습관 형성에 큰 도움이 될 것 같습니다.";
  } else if (purpose === "student") {
    intro = `${info.name}아, 이번 주도 세븐닷 학습에 도전한 모습이 참 좋았어.`;
    body = `특히 ${focus}을 보여준 점이 멋졌고, 지금처럼 조금씩 쌓아가면 더 크게 성장할 수 있어.`;
    closing = "다음 학습도 자신 있게 도전해 보자. 선생님이 응원할게!";
  } else if (purpose === "praise") {
    intro = `${info.name}이는 ${focus}의 모습이 돋보였습니다.`;
    body = "학습을 꾸준히 이어가며 스스로 노력하는 태도가 좋아 포인트 칭찬을 받을 만합니다.";
    closing = "앞으로도 지금처럼 차분히 참여하는 모습을 기대합니다.";
  } else {
    intro = `${info.name}이는 이번 주 세븐닷 학습에 꾸준히 참여하며 성장하는 모습을 보여주었습니다.`;
    body = `특히 ${focus}에서 긍정적인 변화가 보였고, ${info.streak} 기록을 통해 학습 습관도 잘 이어가고 있습니다.`;
    closing = "다음 주에도 스스로 계획하고 끝까지 도전하는 모습을 기대합니다.";
  }
  if (tone === "간단하게") return `${info.name}이는 ${focus}에서 좋은 모습을 보였습니다. 꾸준히 학습에 참여하며 성장하고 있어 앞으로의 변화가 기대됩니다.`;
  if (tone === "학생 격려용") return `${info.name}아, ${focus}을 보여준 점이 정말 멋졌어. 지금처럼 조금씩 도전하면 더 많이 성장할 수 있어. 선생님이 계속 응원할게!`;
  if (memo) body += ` ${memo}`;
  return `${intro} ${body} ${closing}`;
}
function renderAIHistory() {
  const box = $("#aiCommentHistory");
  if (!box) return;
  box.innerHTML = aiComments.length
    ? aiComments.slice(0, 6).map((c) => `<div class="cd-ai-history-item"><b>${c.student}</b> · ${c.purpose}<br>${c.text}</div>`).join("")
    : '<div class="cd-ai-history-item">아직 저장된 코멘트가 없습니다.</div>';
}
function openAICommentModal() {
  updateAIStudentSelect();
  show("#aiCommentModal");
  renderAIHistory();
  updateAILimitUI();
  if ($("#aiCommentStatus")) $("#aiCommentStatus").textContent = "학생과 용도를 선택한 뒤 생성하세요.";
}

/* ----- AI 코멘트 1일 사용 제한 (무료 플랜: 3회/일) ----- */
const AI_DAILY_LIMIT = 3;
function aiUsedToday() {
  try {
    const raw = JSON.parse(localStorage.getItem("cd_ai_usage") || "{}");
    return raw.date === _todayKey() ? raw.count || 0 : 0;
  } catch (e) {
    return 0;
  }
}
function aiRemaining() {
  return Math.max(0, AI_DAILY_LIMIT - aiUsedToday());
}
function updateAILimitUI() {
  const remain = aiRemaining();
  const badge = $("#aiLimitBadge");
  if (badge) {
    badge.textContent = `오늘 ${remain} / ${AI_DAILY_LIMIT}회 남음`;
    badge.className = "badge " + (remain ? "info" : "neutral");
  }
  const note = $("#aiLimitNote");
  if (note) note.hidden = remain !== 0;
  document.querySelectorAll('[data-action="generateAIComment"], [data-action="regen"]').forEach((b) => {
    b.disabled = remain === 0;
  });
}
/* 한도 확인 후 1회 차감 (소진 시 false) */
function aiTryConsume() {
  if (aiRemaining() <= 0) {
    toast(`오늘 AI 코멘트 생성 횟수(무료 ${AI_DAILY_LIMIT}회)를 모두 사용했어요. 내일 다시 충전됩니다.`);
    updateAILimitUI();
    return false;
  }
  const used = aiUsedToday() + 1;
  try {
    localStorage.setItem("cd_ai_usage", JSON.stringify({ date: _todayKey(), count: used }));
  } catch (e) {}
  updateAILimitUI();
  return true;
}

/* ----- 칭찬 사유 ----- */
function renderPraiseReasons() {
  const wrap = $("#praiseReasons");
  if (wrap) {
    wrap.innerHTML =
      praiseReasons.map((r, i) => `<button class="cd-reason ${i === selectedPraiseReason ? "active" : ""}" type="button" data-praise-index="${i}">${micon(r.icon)} ${r.name}</button>`).join("") +
      `<button class="cd-reason add" type="button" data-action="openPraiseReasonManage">＋ 추가</button>`;
  }
  renderPraiseReasonList();
  renderBulkReasonSelect();
  const active = praiseReasons[selectedPraiseReason] || praiseReasons[0];
  if (active && $("#giveBtn")) {
    $("#giveBtn").textContent = `+${active.brick} 포인트 지급`;
    const step = $("#giveAmount");
    if (step) step.textContent = active.brick;
  }
}
function renderPraiseReasonList() {
  const containers = document.querySelectorAll(".cd-praise-reason-list");
  if (!containers.length) return;
  const html = praiseReasons
    .map(
      (r, i) => `<div class="cd-praise-reason-item">
        <span><b>${micon(r.icon)} ${r.name}</b><small>${r.desc || "설명 없음"} · ${r.brick}포인트</small></span>
        <span class="cd-head-actions">
          <button class="btn-sm" type="button" data-action="editPraiseReason" data-praise-index="${i}">수정</button>
          <button class="btn-sm reject" type="button" data-action="deletePraiseReason" data-praise-index="${i}">삭제</button>
        </span>
      </div>`
    )
    .join("");
  containers.forEach((c) => (c.innerHTML = html));
}
/* 아이콘 피커(hidden input + 버튼 행) 값 설정 + active 동기화 */
function setIconPick(inputId, icon) {
  const input = $("#" + inputId);
  if (!input) return;
  input.value = icon;
  document.querySelectorAll(`[data-iconpick="${inputId}"] [data-icon]`).forEach((b) => b.classList.toggle("active", b.dataset.icon === icon));
}
function resetPraiseForm() {
  setIconPick("newPraiseIcon", "thumb_up");
  if ($("#newPraiseName")) { $("#newPraiseName").value = ""; delete $("#newPraiseName").dataset.editIndex; }
  if ($("#newPraiseBrick")) $("#newPraiseBrick").value = 5;
  if ($("#newPraiseDesc")) $("#newPraiseDesc").value = "";
}
function resetPraiseFormTab() {
  setIconPick("newPraiseIconTab", "thumb_up");
  if ($("#newPraiseNameTab")) { $("#newPraiseNameTab").value = ""; delete $("#newPraiseNameTab").dataset.editIndex; }
  if ($("#newPraiseBrickTab")) $("#newPraiseBrickTab").value = 5;
  if ($("#newPraiseDescTab")) $("#newPraiseDescTab").value = "";
}
function loadPraiseExamples() {
  praiseReasons = [
    { icon: "thumb_up", name: "칭찬 참여", brick: 5, desc: "수업과 학습에 성실하게 참여했습니다." },
    { icon: "chat_bubble", name: "오답 다시 풀기", brick: 5, desc: "틀린 문제를 포기하지 않고 다시 풀어보았습니다." },
    { icon: "favorite", name: "친구 도와주기", brick: 5, desc: "친구가 어려워하는 부분을 친절하게 도와주었습니다." },
    { icon: "track_changes", name: "수업 집중", brick: 5, desc: "수업 시간에 집중하며 학습 활동에 적극적으로 참여했습니다." },
    { icon: "menu_book", name: "독서 습관", brick: 3, desc: "아침 독서와 독후 활동에 차분히 참여했습니다." },
    { icon: "auto_awesome", name: "스스로 계획하기", brick: 4, desc: "오늘 할 일을 스스로 계획하고 실천했습니다." },
    { icon: "handshake", name: "협동 활동", brick: 4, desc: "모둠 활동에서 친구들과 협력했습니다." },
    { icon: "local_fire_department", name: "연속 학습", brick: 5, desc: "꾸준히 세븐닷 학습을 이어갔습니다." },
  ];
  selectedPraiseReason = 0;
  renderPraiseReasons();
  toast("칭찬 사유 예시를 불러왔습니다.");
}

/* ----- 일괄 등록 (파일 업로드) ----- */
let bulkRows = [];
function handleBulkFile(file) {
  if (!file) return;
  const isCSV = /\.csv$/i.test(file.name);
  const reader = new FileReader();
  reader.onload = (evt) => {
    try {
      let matrix;
      if (isCSV) {
        matrix = evt.target.result.split(/\r?\n/).map((l) => l.split(",").map((c) => c.trim()));
      } else if (typeof XLSX !== "undefined") {
        const wb = XLSX.read(new Uint8Array(evt.target.result), { type: "array" });
        const ws = wb.Sheets[wb.SheetNames[0]];
        matrix = XLSX.utils.sheet_to_json(ws, { header: 1 });
      } else {
        toast("xlsx 파서를 불러오는 중입니다. CSV를 사용해 주세요.");
        return;
      }
      processBulkMatrix(matrix, file.name);
    } catch (_) { toast("파일을 읽을 수 없습니다."); }
  };
  isCSV ? reader.readAsText(file, "UTF-8") : reader.readAsArrayBuffer(file);
}
function processBulkMatrix(matrix, fileName) {
  if (!matrix || matrix.length < 2) { toast("데이터가 없습니다."); return; }
  const existing = new Set(students.map((s) => s.name));
  const hdr = matrix[0].map((h) => String(h || "").trim());
  const col = (k) => hdr.findIndex((h) => h.includes(k));
  const ni = col("이름"), ii = col("아이디"), gi = col("학년"), li = col("레벨"), mi = col("포인트");
  if (ni === -1) { toast("'이름' 열이 없습니다."); return; }
  bulkRows = matrix.slice(1)
    .filter((row) => String(row[ni] || "").trim())
    .map((row) => {
      const name = String(row[ni] || "").trim();
      return {
        name,
        loginId: ii >= 0 ? String(row[ii] || "").trim() : "",
        grade:   gi >= 0 ? String(row[gi] || "중2").trim() : "중2",
        level:  li >= 0 ? String(row[li] || "6-1").trim() : "6-1",
        points: mi >= 0 ? Number(row[mi] || 0) : 0,
        duplicate: existing.has(name),
      };
    });
  const newN = bulkRows.filter((s) => !s.duplicate).length;
  if ($("#bulkFileName")) $("#bulkFileName").textContent = fileName + "  ·  " + bulkRows.length + "명";
  if ($("#bulkDropArea"))   $("#bulkDropArea").style.display = "none";
  if ($("#bulkPreviewWrap")) $("#bulkPreviewWrap").style.display = "";
  if ($("#saveBulkBtn")) { $("#saveBulkBtn").disabled = newN === 0; $("#saveBulkBtn").textContent = newN + "명 등록"; }
  if ($("#bulkRows")) $("#bulkRows").innerHTML = bulkRows.map((s) =>
    `<tr class="${s.duplicate ? "cd-dupe" : ""}">
      <td><b>${s.name}</b></td>
      <td class="muted" style="font-size:12px">${s.loginId || "-"}</td>
      <td class="center">${s.grade}</td>
      <td class="center">${s.level}</td>
      <td class="right">${s.points}p</td>
      <td class="center">${s.duplicate ? '<span class="badge warning">중복</span>' : '<span class="badge success">신규</span>'}</td>
    </tr>`
  ).join("") || '<tr><td colspan="6" class="center muted empty-cell">등록할 학생이 없습니다.</td></tr>';
}

/* ----- 클릭 위임 ----- */
document.addEventListener("click", (e) => {
  const subBtn = e.target.closest(".cd-has-sub");
  if (subBtn) {
    if (_subPanel && _subPanel.classList.contains("open") && _subPanel.dataset.sub === subBtn.dataset.group) {
      closeSubPanel();
    } else {
      showSubPanel(subBtn.dataset.group);
    }
    return;
  }
  const navBtn = e.target.closest("[data-menu]"),
    sdTab = e.target.closest("[data-sdtab]"),
    lTabBtn = e.target.closest("[data-ltab]"),
    mTabBtn = e.target.closest("[data-mtab]"),
    gameTabBtn = e.target.closest("[data-game]"),
    seatCell = e.target.closest("[data-seatidx]"),
    ladiBtn = e.target.closest("[data-ladi]"),
    lotNameBtn = e.target.closest("[data-lotidx]"),
    hFilter = e.target.closest("[data-hfilter]"),
    faqCatBtn = e.target.closest("[data-faqcat]"),
    faqQ = e.target.closest(".cd-faq-q"),
    st = e.target.closest(".cd-student"),
    pwItem = e.target.closest(".cd-pw-item"),
    bank = e.target.closest(".cd-bank-item"),
    reason = e.target.closest(".cd-reason"),
    aiOpt = e.target.closest(".cd-ai-option"),
    step = e.target.closest(".cd-stepper button"),
    a = e.target.closest("[data-action]");

  const sortModeBtn = e.target.closest("[data-sortmode]");
  if (sortModeBtn) {
    studentSortMode = sortModeBtn.dataset.sortmode;
    document.querySelectorAll("[data-sortmode]").forEach((b) => b.classList.toggle("active", b.dataset.sortmode === studentSortMode));
    renderStudents();
    return;
  }
  if (mTabBtn) { switchManageTab(mTabBtn.dataset.mtab); return; }
  if (gameTabBtn) { switchGameTab(gameTabBtn.dataset.game); return; }
  if (seatCell && !e.target.closest("[data-action]")) { clickSeat(+seatCell.dataset.seatidx); return; }
  if (ladiBtn) { clickLadderName(+ladiBtn.dataset.ladi); return; }
  if (lotNameBtn) {
    const i = +lotNameBtn.dataset.lotidx;
    if (lotteryExclude.has(i)) lotteryExclude.delete(i); else lotteryExclude.add(i);
    renderLotteryNames();
    return;
  }

  if (sdTab) {
    setStudentTab(sdTab.dataset.sdtab);
    return;
  }
  if (hFilter) {
    historyFilter = hFilter.dataset.hfilter;
    document.querySelectorAll("#historyFilter button").forEach((b) => b.classList.toggle("active", b === hFilter));
    renderHistory();
    return;
  }
  if (faqCatBtn) {
    faqCat = faqCatBtn.dataset.faqcat;
    document.querySelectorAll("#faqFilter button").forEach((b) => b.classList.toggle("active", b === faqCatBtn));
    renderFaq();
    return;
  }
  if (faqQ) {
    faqQ.closest(".cd-faq-item").classList.toggle("open");
    return;
  }
  if (navBtn) {
    setView(navBtn.dataset.menu, { ltab: navBtn.dataset.ltab });
    if (navBtn.dataset.menu === CURRENT_PAGE && navBtn.dataset.ltab) setLearningTab(navBtn.dataset.ltab);
    return;
  }
  if (lTabBtn) {
    setLearningTab(lTabBtn.dataset.ltab);
    return;
  }
  if (step) {
    let v = $("#giveAmount"),
      n = +v.textContent;
    n = step.dataset.step === "+" ? n + 1 : Math.max(1, n - 1);
    v.textContent = n;
    $("#giveBtn").textContent = "+" + n + " 포인트 지급";
    return;
  }
  const chk = e.target.closest(".cd-stu-check");
  if (chk) {
    const i = +chk.dataset.i;
    if (chk.checked) selBulk.add(i);
    else selBulk.delete(i);
    chk.closest(".cd-student")?.classList.toggle("sel", chk.checked);
    updateBulkBar();
    return;
  }
  if (st) {
    openStudentDetail(+st.dataset.i);
    return;
  }
  const stuChip = e.target.closest(".cd-stu-chip");
  if (stuChip) {
    openStudentDetail(+stuChip.dataset.i);
    return;
  }
  if (pwItem) {
    openStudentDetail(+pwItem.dataset.i);
    return;
  }
  if (bank) {
    selected = +bank.dataset.bank;
    if ($("#quickTargetName")) $("#quickTargetName").textContent = students[selected].name;
    renderBank();
    toast(students[selected].name + " 학생을 선택했습니다.");
    return;
  }
  if (reason && reason.dataset.praiseIndex !== undefined) {
    selectedPraiseReason = Number(reason.dataset.praiseIndex);
    renderPraiseReasons();
    toast(praiseReasons[selectedPraiseReason].name + " 사유를 선택했습니다.");
    return;
  }
  if (aiOpt) {
    document.querySelectorAll(".cd-ai-option").forEach((o) => o.classList.remove("active"));
    aiOpt.classList.add("active");
    aiFocus = aiOpt.dataset.aiFocus;
    toast("강조 내용을 " + aiFocus + "로 설정했습니다.");
    return;
  }
  /* 사유 드롭다운: 바깥 클릭 시 닫기 */
  if (!e.target.closest(".cd-reason-dd") && $("#bulkReasonMenu")) $("#bulkReasonMenu").hidden = true;
  /* 사유 드롭다운 항목 선택 */
  const ddItem = e.target.closest(".cd-reason-dd-item");
  if (ddItem) {
    if (ddItem.dataset.reasonidx === "manage") {
      /* 칭찬 사유 관리(추가)로 이동 — 반 관리 > 칭찬 사유 탭 */
      if (document.querySelector('[data-mtabpane="praise"]')) switchManageTab("praise");
      else window.location.href = PAGE_URLS.classmgmt + "#mtab=praise";
      return;
    }
    if (ddItem.dataset.reasonidx === "custom") {
      bulkReasonCustom = true;
    } else {
      bulkReasonCustom = false;
      bulkReasonIdx = +ddItem.dataset.reasonidx;
    }
    $("#bulkReasonMenu").hidden = true;
    renderBulkReasonSelect();
    if (bulkReasonCustom) $("#customReasonName")?.focus();
    return;
  }
  /* 아이콘 선택 버튼 행 (칭찬 사유 폼) */
  const iconBtn = e.target.closest("[data-iconpick] [data-icon]");
  if (iconBtn) {
    const pick = iconBtn.closest("[data-iconpick]");
    const input = $("#" + pick.dataset.iconpick);
    if (input) input.value = iconBtn.dataset.icon;
    pick.querySelectorAll("[data-icon]").forEach((b) => b.classList.toggle("active", b === iconBtn));
    return;
  }
  /* 학생 명단 테이블: 행 클릭 → 학생 상세 (수정·삭제 버튼은 data-action이 우선) */
  if (!a) {
    const rosterRow = e.target.closest("[data-rowi]");
    if (rosterRow) openStudentDetail(+rosterRow.dataset.rowi);
    return;
  }
  const act = a.dataset.action;

  switch (act) {
    /* 일괄 지급 사유 드롭다운 토글 */
    case "toggleReasonDD": {
      const menu = $("#bulkReasonMenu");
      if (menu) menu.hidden = !menu.hidden;
      break;
    }
    /* 학생 상세 */
    case "closeStudentDetail":
      hide("#studentDetailModal");
      break;
    case "sdPrev":
      stepStudentDetail(-1);
      break;
    case "sdNext":
      stepStudentDetail(1);
      break;

    /* AI 코멘트 */
    case "openAIComment":
      openAICommentModal();
      break;
    case "closeAIComment":
      hide("#aiCommentModal");
      break;
    case "setAITone":
      aiTone = a.dataset.tone;
      toast("문장 톤을 " + aiTone + "로 설정했습니다.");
      break;
    case "generateAIComment":
      if (!aiTryConsume()) break;
      $("#aiGeneratedComment").textContent = generateAICommentText();
      $("#aiCommentStatus").textContent = `AI 코멘트가 생성되었습니다. (오늘 ${aiRemaining()}회 남음)`;
      toast("AI 코멘트를 생성했습니다.");
      break;
    case "applyAIComment": {
      const text = $("#aiGeneratedComment").textContent.trim();
      if (!text || text.includes("학생을 선택")) {
        toast("먼저 AI 코멘트를 생성해 주세요.");
        break;
      }
      $("#sdComment").textContent = text;
      toast("학생 상세 코멘트에 반영했습니다.");
      break;
    }
    case "saveAIComment": {
      const idx = Number($("#aiStudentSelect")?.value ?? selected);
      const text = $("#aiGeneratedComment").textContent.trim();
      if (!text || text.includes("학생을 선택")) {
        toast("먼저 AI 코멘트를 생성해 주세요.");
        break;
      }
      aiComments.unshift({ student: students[idx].name, purpose: $("#aiCommentPurpose").selectedOptions[0].textContent, text });
      renderAIHistory();
      $("#weeklyComment").textContent = text;
      toast("주간리포트에 AI 코멘트를 저장했습니다.");
      break;
    }

    /* 칭찬 사유 관리 */
    case "openPraiseReasonManage":
      hide("#studentDetailModal");
      /* 반 관리 페이지면 탭 전환, 다른 페이지면 반 관리의 칭찬 사유 탭으로 이동 */
      if (document.querySelector('[data-mtabpane="praise"]')) switchManageTab("praise");
      else window.location.href = PAGE_URLS.classmgmt + "#mtab=praise";
      break;
    case "closePraiseReasonManage":
      hide("#praiseReasonModal");
      break;
    case "resetPraiseForm":
      resetPraiseForm();
      break;
    case "resetPraiseFormTab":
      resetPraiseFormTab();
      break;
    case "loadPraiseExamples":
      loadPraiseExamples();
      break;
    case "savePraiseReasonTab": {
      const nameT = $("#newPraiseNameTab");
      const name = nameT ? nameT.value.trim() : "";
      if (!name) { toast("칭찬 사유명을 입력해 주세요."); break; }
      const item = {
        icon: $("#newPraiseIconTab")?.value || "thumb_up",
        name,
        brick: Number($("#newPraiseBrickTab")?.value || 5),
        desc: $("#newPraiseDescTab")?.value.trim() || "교사가 추가한 칭찬 사유입니다.",
      };
      const editIndex = nameT.dataset.editIndex;
      if (editIndex !== undefined) {
        praiseReasons[Number(editIndex)] = item;
        delete nameT.dataset.editIndex;
        toast("칭찬 사유를 수정했습니다.");
      } else {
        praiseReasons.push(item);
        selectedPraiseReason = praiseReasons.length - 1;
        toast("칭찬 사유를 추가했습니다.");
      }
      resetPraiseFormTab();
      renderPraiseReasons();
      break;
    }
    case "savePraiseReason": {
      const name = $("#newPraiseName")?.value.trim();
      if (!name) {
        toast("칭찬 사유명을 입력해 주세요.");
        break;
      }
      const item = {
        icon: $("#newPraiseIcon")?.value || "thumb_up",
        name,
        brick: Number($("#newPraiseBrick")?.value || 5),
        desc: $("#newPraiseDesc")?.value.trim() || "교사가 추가한 칭찬 사유입니다.",
      };
      const editIndex = $("#newPraiseName")?.dataset.editIndex;
      if (editIndex !== undefined) {
        praiseReasons[Number(editIndex)] = item;
        delete $("#newPraiseName").dataset.editIndex;
        toast("칭찬 사유를 수정했습니다.");
      } else {
        praiseReasons.push(item);
        selectedPraiseReason = praiseReasons.length - 1;
        toast("칭찬 사유를 추가했습니다.");
      }
      resetPraiseForm();
      renderPraiseReasons();
      break;
    }
    case "editPraiseReason": {
      const r = praiseReasons[Number(a.dataset.praiseIndex)];
      switchManageTab("praise");
      const nameT = $("#newPraiseNameTab");
      setIconPick("newPraiseIconTab", r.icon);
      if (nameT) { nameT.value = r.name; nameT.dataset.editIndex = a.dataset.praiseIndex; }
      if ($("#newPraiseBrickTab")) $("#newPraiseBrickTab").value = r.brick;
      if ($("#newPraiseDescTab")) $("#newPraiseDescTab").value = r.desc;
      toast("칭찬 사유를 수정합니다. 내용을 변경한 뒤 저장을 눌러주세요.");
      break;
    }
    case "deletePraiseReason": {
      const idx = Number(a.dataset.praiseIndex);
      if (praiseReasons.length <= 1) {
        toast("칭찬 사유는 최소 1개 이상 필요합니다.");
        break;
      }
      fn_confirm("이 칭찬 사유를 삭제할까요?", () => {
        praiseReasons.splice(idx, 1);
        selectedPraiseReason = Math.max(0, Math.min(selectedPraiseReason, praiseReasons.length - 1));
        renderPraiseReasons();
        toast("칭찬 사유를 삭제했습니다.");
      });
      break;
    }

    /* 공동목표 */
    case "goal":
      show("#goalModal");
      updateAll();
      break;
    case "goalClose":
      hide("#goalModal");
      break;
    case "goalSave":
      target = +$("#goalTarget").value || 1000;
      document.querySelectorAll(".cd-goal-title").forEach((e) => (e.textContent = $("#goalTitle").value));
      hide("#goalModal");
      updateAll();
      toast("공동목표를 저장했습니다.");
      break;
    case "goalReset":
      fn_confirm("공동목표 진행률을 0으로 새로고침할까요?", () => {
        resetOffset = total();
        updateAll();
        toast("공동목표 진행률을 0으로 초기화했습니다.");
      });
      break;

    /* 학생 등록 */
    case "openStudent":
      openStudentNew();
      break;
    case "closeStudent":
      hide("#studentModal");
      break;
    case "editStudent":
      openStudentEdit(+a.dataset.i);
      break;
    case "deleteStudent": {
      const di = +a.dataset.i;
      fn_confirm(students[di].name + " 학생을 명단에서 삭제할까요?", () => {
        students.splice(di, 1);
        if (selected >= students.length) selected = Math.max(0, students.length - 1);
        renderRoster();
        updateAll();
        toast("학생을 삭제했습니다.");
      });
      break;
    }
    case "saveStudent": {
      const name = $("#newStudentName").value.trim();
      if (!name) {
        toast("학생 이름을 입력해 주세요.");
        break;
      }
      const rec = {
        name,
        loginId: $("#newStudentLoginId")?.value.trim() || "",
        classNum: Number($("#newStudentClassNum")?.value || students.length + 1),
        grade: $("#newStudentGrade")?.value || "중2",
        birthDate: $("#newStudentBirthDate")?.value || "",
        parentName: $("#newStudentParentName")?.value.trim() || "",
        parentPhone: $("#newStudentParentPhone")?.value.trim() || "",
        studentStatus: document.querySelector('input[name="studentStatusR"]:checked')?.value || "정상이용",
        usageStart: $("#newStudentUsageStart")?.value || "2026-03-01",
        usageEnd: $("#newStudentUsageEnd")?.value || "2026-12-31",
        notifications: document.querySelector('input[name="notificationsR"]:checked')?.value !== "false",
        memo: $("#newStudentMemo")?.value.trim() || "",
        level: $("#newStudentLevel")?.value || "6-1",
        lastLogin: "-",
        points: 0,
        status: "",
        tag: "",
        gender: "",
      };
      const editIndex = $("#newStudentName").dataset.editIndex;
      if (editIndex !== undefined) {
        students[Number(editIndex)] = rec;
        delete $("#newStudentName").dataset.editIndex;
        toast(name + " 학생 정보를 수정했습니다.");
      } else {
        students.push(rec);
        selected = students.length - 1;
        toast(name + " 학생을 등록했습니다.");
      }
      hide("#studentModal");
      renderRoster();
      updateAll();
      break;
    }

    /* 일괄 등록 */
    case "openBulk":
      bulkRows = [];
      if ($("#bulkDropArea"))    { $("#bulkDropArea").style.display = ""; }
      if ($("#bulkPreviewWrap")) { $("#bulkPreviewWrap").style.display = "none"; }
      if ($("#bulkFileInput"))   { $("#bulkFileInput").value = ""; }
      if ($("#saveBulkBtn"))     { $("#saveBulkBtn").disabled = true; $("#saveBulkBtn").textContent = "일괄 등록"; }
      show("#bulkModal");
      break;
    case "closeBulk":
      hide("#bulkModal");
      break;
    case "pickBulkFile":
      $("#bulkFileInput")?.click();
      break;
    case "clearBulkFile":
      bulkRows = [];
      if ($("#bulkDropArea"))    { $("#bulkDropArea").style.display = ""; }
      if ($("#bulkPreviewWrap")) { $("#bulkPreviewWrap").style.display = "none"; }
      if ($("#bulkFileInput"))   { $("#bulkFileInput").value = ""; }
      if ($("#saveBulkBtn"))     { $("#saveBulkBtn").disabled = true; $("#saveBulkBtn").textContent = "일괄 등록"; }
      break;
    case "downloadTemplate": {
      const csv = "﻿학생명,로그인아이디(이메일),반번호,학년,레벨,초기 포인트(포인트)\n홍길동,hong@sb.co.kr,13,중2,6-1,0\n김영희,kim@sb.co.kr,14,중2,6-1,0\n";
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const dl = document.createElement("a");
      dl.href = url; dl.download = "학생_등록_서식.csv"; dl.click();
      URL.revokeObjectURL(url);
      break;
    }
    case "saveBulk": {
      const newStudents = bulkRows.filter((s) => !s.duplicate);
      const base = students.length;
      newStudents.forEach((s, idx) => students.push({
        name: s.name,
        loginId: s.loginId || "",
        classNum: base + idx + 1,
        gender: "",
        grade: s.grade || "중2",
        level: s.level || "6-1",
        lastLogin: "-",
        points: s.points || 0,
        status: "",
        tag: "",
      }));
      hide("#bulkModal");
      bulkRows = [];
      renderRoster();
      updateAll();
      toast(newStudents.length + "명의 학생을 일괄 등록했습니다.");
      break;
    }

    /* 쿠폰 */
    case "openCoupon":
      resetCouponForm();
      show("#couponModal");
      break;
    case "closeCoupon":
      hide("#couponModal");
      break;
    case "saveCoupon": {
      const name = $("#couponName").value.trim();
      if (!name) {
        toast("쿠폰명을 입력해 주세요.");
        break;
      }
      const data = {
        name,
        icon: $("#couponIcon").value,
        price: Number($("#couponPrice").value || 0),
        stock: Number($("#couponStock").value || 0),
        day: $("#couponDay").value,
        visible: $("#couponVisible").value,
        desc: $("#couponDesc").value || "선생님이 등록한 쿠폰입니다.",
      };
      const editIndex = $("#couponName").dataset.editIndex;
      if (editIndex !== undefined) {
        coupons[Number(editIndex)] = data;
        toast(name + " 쿠폰을 수정했습니다.");
      } else {
        coupons.unshift(data);
        toast(name + " 쿠폰을 등록했습니다.");
      }
      hide("#couponModal");
      renderMarket();
      break;
    }
    case "loadCouponExamples":
      renderMarket();
      toast("쿠폰 예시를 업데이트했습니다.");
      break;
    case "hideCoupon": {
      const c = coupons[+a.dataset.i];
      c.visible = c.visible === "공개" ? "비공개" : "공개";
      renderMarket();
      break;
    }
    case "deleteCoupon":
      fn_confirm("이 쿠폰을 삭제할까요?", () => {
        coupons.splice(+a.dataset.i, 1);
        renderMarket();
        toast("쿠폰을 삭제했습니다.");
      });
      break;
    case "editCoupon": {
      const c = coupons[+a.dataset.i];
      $("#couponName").value = c.name;
      $("#couponIcon").value = c.icon;
      $("#couponPrice").value = c.price;
      $("#couponStock").value = c.stock;
      $("#couponDay").value = c.day;
      $("#couponVisible").value = c.visible;
      $("#couponDesc").value = c.desc;
      $("#couponName").dataset.editIndex = a.dataset.i;
      show("#couponModal");
      break;
    }
    case "approveCoupon": {
      const r = couponRequests[+a.dataset.i];
      if (r.status !== "승인") {
        // 반 경제: 승인 시 해당 학생 통장에서 출금(사용) + 내역 기록 + 재고 차감
        const si = students.findIndex((s) => s.name === r.student);
        if (si >= 0) addBrick(si, "사용", r.coupon + " 구매", r.price);
        const c = coupons.find((x) => x.name === r.coupon);
        if (c && c.stock > 0) c.stock -= 1;
        r.status = "승인";
      }
      renderMarket();
      renderHomeOps();
      updateAll();
      toast(r.student + " 통장에서 " + r.price + "포인트 출금 · 승인 완료");
      break;
    }
    case "rejectCoupon":
      couponRequests.splice(+a.dataset.i, 1);
      renderMarket();
      renderHomeOps();
      updateAll();
      toast("쿠폰 신청을 반려했습니다.");
      break;
    case "homeGivePraise": {
      const i = +a.dataset.i;
      praisedToday.add(i);
      addBrick(i, "적립", "연속 학습 칭찬", 5);
      toast(students[i].name + " 학생에게 칭찬 +5p 지급했습니다.");
      break;
    }

    /* 포인트 지급 */
    case "openBrickGive":
      show("#brickGiveModal");
      renderBank();
      $("#brickGiveStudent").value = selected;
      break;
    case "closeBrickGive":
      hide("#brickGiveModal");
      break;
    case "saveBrickGive":
      addBrick(+$("#brickGiveStudent").value, $("#brickGiveType").value, $("#brickGiveReason").value, +$("#brickGiveAmount").value || 0);
      hide("#brickGiveModal");
      toast("포인트를 지급했습니다.");
      break;
    case "openBonus":
      show("#bonusModal");
      break;
    case "closeBonus":
      hide("#bonusModal");
      break;
    case "saveBonus": {
      const amount = +$("#bonusAmount").value || 0,
        reason = $("#bonusReason").value || "반 보너스";
      students.forEach((s, i) => addBrick(i, "적립", reason, amount));
      hide("#bonusModal");
      toast("전체 보너스를 지급했습니다.");
      break;
    }
    case "givePraiseSelected": {
      if (!selBulk.size) {
        toast("학생을 먼저 선택해 주세요.");
        break;
      }
      const r = currentBulkReason();
      const ids = [...selBulk];
      ids.forEach((i) => addBrick(i, "적립", r.name, r.brick));
      selBulk.clear();
      renderStudents();
      updateBulkBar();
      toast(ids.length + "명에게 " + r.name + " " + r.brick + "포인트씩 지급했습니다.");
      break;
    }
    case "givePraiseAll": {
      const r = currentBulkReason();
      fn_confirm("전체 " + students.length + "명에게 " + r.name + " " + r.brick + "포인트씩 지급할까요?", () => {
        students.forEach((_, i) => addBrick(i, "적립", r.name, r.brick));
        selBulk.clear();
        renderStudents();
        updateBulkBar();
        toast("전체 " + students.length + "명에게 " + r.name + "을(를) 지급했습니다.");
      });
      break;
    }
    case "quickLearning":
      addBrick(selected, "적립", "오늘 학습 완료", 5);
      toast(students[selected].name + " +5p");
      break;
    case "quickRetry":
      addBrick(selected, "적립", "오답 다시 풀기", 3);
      toast(students[selected].name + " +3p");
      break;
    case "quickPraise":
      addBrick(selected, "적립", "수업 집중 칭찬", 5);
      toast(students[selected].name + " +5p");
      break;
    case "quickGoal":
      addBrick(selected, "공동목표", "공동목표 기여", 5);
      toast(students[selected].name + " 공동목표 +5p");
      break;

    /* 칭찬 지급 (학생 상세) */
    case "give": {
      const r = praiseReasons[selectedPraiseReason] || { name: "교사 칭찬", desc: "칭찬할 만한 모습을 보여주었습니다." };
      const n = +$("#giveAmount").textContent || r.brick;
      addBrick(selected, "적립", r.name, n);
      $("#sdComment").textContent = students[selected].name + "이는 " + r.desc + " 앞으로도 좋은 모습을 기대합니다!";
      $("#sdBalance").textContent = students[selected].points;
      toast(students[selected].name + " 학생에게 " + r.name + " " + n + "p 지급했습니다.");
      break;
    }
    case "regen": {
      if (!aiTryConsume()) break;
      updateAIStudentSelect();
      if ($("#aiStudentSelect")) $("#aiStudentSelect").value = selected;
      $("#sdComment").textContent = generateAICommentText();
      toast(`AI 코멘트를 빠르게 생성했습니다. (오늘 ${aiRemaining()}회 남음)`);
      break;
    }

    /* 게시판 */
    case "morning":
      setView("board");
      break;
    case "briefStudents":
      $("#students")?.closest(".section-box")?.scrollIntoView({ behavior: "smooth", block: "start" });
      break;
    case "gotoSeating":
      /* 반 관리 > 자리배치 탭으로 (같은 페이지면 탭 전환) */
      if (document.querySelector('[data-mtabpane="seating"]')) switchManageTab("seating");
      else window.location.href = PAGE_URLS.classmgmt + "#mtab=seating";
      break;
    case "briefApprove":
      $("#homeApprovals")?.closest(".section-box")?.scrollIntoView({ behavior: "smooth", block: "start" });
      break;
    case "polish":
      $("[data-field=notice]").value = "오늘은 미술 준비물을 꼭 챙겨 주세요. 세븐닷 학습 후 차분히 수업을 시작하겠습니다.";
      preview();
      toast("문장을 다듬었습니다.");
      break;
    case "draft":
      ["국어", "수학", "과학", "미술", "창체", "체육"].forEach((v, i) => {
        document.querySelectorAll(".periodInput")[i].value = v;
      });
      $("[data-field=ready]").value = "국어 공책, 수학 익힘책, 색연필, 풀 준비";
      $("[data-field=morning]").value = "세븐닷 오늘 학습 완료 후 독서 10분 하기";
      $("[data-field=notice]").value = "오늘은 미술 활동이 있으니 준비물을 꼭 확인해 주세요.";
      preview();
      toast("AI 초안을 생성했습니다.");
      break;
    case "postMorning":
    case "post": {
      const sched = [...document.querySelectorAll("#schedule .periodInput")].map((x) => x.value);
      const titleEl = $("#morningTitle");
      const targetEl = $("#morningTarget");
      morningPosts.unshift({
        title: titleEl ? titleEl.value.trim() || "오늘의 수업 안내" : "오늘의 수업 안내",
        date: "방금 전",
        target: targetEl ? targetEl.value + " " + students.length + "명" : "전체 학생 " + students.length + "명",
        schedule: sched,
        ready: $("[data-field=ready]")?.value || "",
        morning: $("[data-field=morning]")?.value || "",
        notice: $("[data-field=notice]")?.value || "",
      });
      setMorningPostedToday();
      renderMorningPosts();
      renderMorningBanner();
      const live = morningPosts[0];
      if ($("#boardLiveInfo")) $("#boardLiveInfo").textContent = live.title + " · " + live.date + " · " + live.target;
      if ($("#boards")) $("#boards").insertAdjacentHTML("afterbegin", '<tr><td>오늘의 수업 안내</td><td><span class="badge neutral">전체 학생</span> 21명</td><td class="right muted">방금 전</td></tr>');
      toast("게시판을 게시했습니다.");
      break;
    }
    case "viewMorning":
      viewMorning(+a.dataset.i);
      break;
    case "dupMorning":
      dupMorning(+a.dataset.i);
      break;
    case "closeMorningView":
      hide("#morningViewModal");
      break;
    case "dupMorningFromView":
      dupMorning(mvIndex);
      break;

    /* 날짜 네비게이터 */
    case "prevDay":
      dateOffset--;
      renderToday();
      break;
    case "nextDay":
      if (dateOffset < 0) { dateOffset++; renderToday(); }
      break;
    case "goToday":
      dateOffset = 0;
      renderToday();
      break;

    /* 리포트 / 설정 */
    case "generateReport":
      $("#weeklyComment").textContent = "이번 주 학생들은 세븐닷 학습을 통해 꾸준한 참여와 오답 다시 풀기 습관을 보여주었습니다.";
      toast("AI 주간리포트를 생성했습니다.");
      break;
    case "filterLedger":
      renderLedger();
      break;
    case "saveSettings":
      toast("설정을 저장했습니다.");
      break;
    case "topAlert":
      toast("새 알림 3건이 있습니다.");
      break;
    case "toggleTodo": {
      const t = todos[+a.dataset.i];
      t.done = !t.done;
      renderTodos();
      toast(t.title + (t.done ? " · 완료 처리했습니다." : " · 다시 확인이 필요합니다."));
      break;
    }
    case "openOrgInfo":
      show("#orgModal");
      break;
    case "closeOrgInfo":
      hide("#orgModal");
      break;
    case "orgToSettings":
      hide("#orgModal");
      setView("settings");
      break;
    case "randomSeating": randomSeating(); break;
    case "resetSeating": resetSeating(); break;
    case "toggleSeatPin": {
      const idx = +a.dataset.pinidx;
      if (seatPinned.has(idx)) seatPinned.delete(idx); else seatPinned.add(idx);
      renderSeating();
      break;
    }
    case "runLottery": runLottery(); break;
    case "runTeams": runTeams(); break;
    case "generateLadder": generateLadder(); break;
    case "revealAllLadder": revealAllLadder(); break;
    case "addLadderPrize":
      ladderPrizes.push("새 항목");
      renderLadderPrizes();
      break;
    case "removeLadderPrize": {
      const idx = +a.dataset.prizeidx;
      ladderPrizes.splice(idx, 1);
      renderLadderPrizes();
      break;
    }
  }
});

/* 바깥 클릭으로 모달 닫기 */
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal-overlay")) e.target.classList.remove("show");
});

document.addEventListener("input", (e) => {
  if (e.target.matches(".periodInput") || e.target.matches("[data-field]")) preview();
  if (e.target.matches("#goalTitle,#goalTarget")) updateAll();
  if (e.target.matches("#studentSearch")) {
    searchQuery = e.target.value;
    renderStudents();
  }
  if (e.target.matches("#brickSearch")) renderLedger();
  if (e.target.matches("#rosterSearch")) renderRoster();
  if (e.target.matches("#todaySearch")) renderToday();
  if (e.target.matches("#seatCols,#seatRows")) {
    seatCols = Math.max(2, Math.min(10, parseInt($("#seatCols")?.value || 5)));
    seatRows = Math.max(2, Math.min(10, parseInt($("#seatRows")?.value || 4)));
    seatMap = [];
    selectedSeat = -1;
    initSeatMap();
    renderSeating();
  }
  if (e.target.matches("[data-prizeidx]")) {
    const idx = +e.target.dataset.prizeidx;
    ladderPrizes[idx] = e.target.value;
  }
});
document.addEventListener("change", (e) => {
  if (e.target.matches("#bulkFileInput")) handleBulkFile(e.target.files[0]);
  if (e.target.matches("#brickTypeFilter")) renderLedger();
  if (e.target.matches("#todaySubject")) renderToday();
  if (e.target.matches("#bulkSelectAll")) {
    selBulk.clear();
    if (e.target.checked) students.forEach((_, i) => selBulk.add(i));
    renderStudents();
    updateBulkBar();
  }
});

/* ======================================================================
   반관리 탭 전환
   ====================================================================== */
function switchManageTab(tab) {
  document.querySelectorAll("[data-mtab]").forEach((b) => b.classList.toggle("active", b.dataset.mtab === tab));
  document.querySelectorAll("[data-mtabpane]").forEach((p) => p.classList.toggle("active", p.dataset.mtabpane === tab));
  if (tab === "seating") { if (!seatMap.length) initSeatMap(); renderSeating(); }
  if (tab === "game") { renderLotteryNames(); if (!ladderData) generateLadder(); }
  if (tab === "report") { updateAll(); renderReportCare(); }
  if (tab === "praise") renderPraiseReasons();
  if (tab === "morning") { renderMorningPosts(); makeSchedule(); preview(); }
  /* 해시로 탭 유지 → 새로고침해도 보던 탭 그대로 */
  if (document.querySelector(`[data-mtabpane="${tab}"]`)) history.replaceState(null, "", "#mtab=" + tab);
}

function switchGameTab(tab) {
  document.querySelectorAll("[data-game]").forEach((b) => b.classList.toggle("active", b.dataset.game === tab));
  document.querySelectorAll("[data-gamepane]").forEach((p) => p.classList.toggle("active", p.dataset.gamepane === tab));
  if (tab === "ladder" && !ladderData) generateLadder();
}

/* ======================================================================
   자리배치
   ====================================================================== */
let seatCols = 5, seatRows = 4, seatMap = [], selectedSeat = -1;
const seatPinned = new Set();

function initSeatMap() {
  const total = seatCols * seatRows;
  seatMap = Array(total).fill(null);
  students.slice(0, total).forEach((_, si) => { seatMap[si] = si; });
}

function renderSeating() {
  const grid = $("#seatGrid");
  if (!grid) return;
  grid.style.gridTemplateColumns = `repeat(${seatCols}, 1fr)`;
  grid.innerHTML = seatMap.map((si, idx) => {
    const s = si !== null && si < students.length ? students[si] : null;
    const pinned = seatPinned.has(idx);
    return `<div class="cd-seat ${s ? "occupied" : "empty"} ${selectedSeat === idx ? "sel" : ""} ${pinned ? "pinned" : ""}" data-seatidx="${idx}">
      ${s ? `
        <button class="cd-seat-pin-btn${pinned ? " on" : ""}" type="button" data-action="toggleSeatPin" data-pinidx="${idx}" title="${pinned ? "고정 해제" : "자리 고정"}">
          <span class="material-symbols-outlined">${pinned ? "lock" : "lock_open"}</span>
        </button>
        <span class="cd-seat-name">${s.name}</span>
        <span class="cd-seat-num">${s.classNum ?? si + 1}번</span>
      ` : '<span class="cd-seat-empty">·</span>'}
    </div>`;
  }).join("");
}

function randomSeating() {
  const total = seatCols * seatRows;
  // 고정된 학생 수집
  const pinnedStudents = new Set();
  seatPinned.forEach((slotIdx) => { if (seatMap[slotIdx] !== null) pinnedStudents.add(seatMap[slotIdx]); });
  // 고정 안 된 학생 셔플
  const available = students.map((_, i) => i).filter((i) => !pinnedStudents.has(i));
  for (let i = available.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [available[i], available[j]] = [available[j], available[i]];
  }
  // 고정 안 된 슬롯에 배분
  let ai = 0;
  for (let idx = 0; idx < total; idx++) {
    if (seatPinned.has(idx)) continue;
    seatMap[idx] = ai < available.length ? available[ai++] : null;
  }
  selectedSeat = -1;
  renderSeating();
  const n = seatPinned.size;
  toast(n ? `랜덤 배치 완료 · ${n}명 고정 유지` : "자리가 랜덤으로 배치됐습니다.");
}

function resetSeating() {
  seatMap = [];
  selectedSeat = -1;
  seatPinned.clear();
  initSeatMap();
  renderSeating();
  toast("자리가 초기화됐습니다.");
}

function clickSeat(idx) {
  if (selectedSeat === -1) {
    selectedSeat = idx;
  } else if (selectedSeat === idx) {
    selectedSeat = -1;
  } else {
    // 고정된 자리는 교체 불가
    if (seatPinned.has(selectedSeat) || seatPinned.has(idx)) {
      toast("고정된 자리는 교체할 수 없습니다.");
      selectedSeat = -1;
      renderSeating();
      return;
    }
    [seatMap[selectedSeat], seatMap[idx]] = [seatMap[idx], seatMap[selectedSeat]];
    selectedSeat = -1;
    toast("자리를 바꿨습니다.");
  }
  renderSeating();
}

/* ======================================================================
   제비뽑기
   ====================================================================== */
let lotteryRunning = false;
const lotteryExclude = new Set();

function renderLotteryNames() {
  const c = $("#lotteryNames");
  if (!c) return;
  c.innerHTML = students.map((s, i) =>
    `<button class="cd-lot-name ${lotteryExclude.has(i) ? "excluded" : ""}" data-lotidx="${i}">${s.name}</button>`
  ).join("");
}

function runLottery() {
  if (lotteryRunning) return;
  const candidates = students.filter((_, i) => !lotteryExclude.has(i));
  if (!candidates.length) { toast("추첨 가능한 학생이 없습니다."); return; }
  lotteryRunning = true;
  const result = $("#lotteryResult"), sub = $("#lotterySubText"), btn = $("#lotteryBtn");
  if (result) { result.classList.remove("picked"); result.classList.add("spinning"); }
  if (btn) { btn.disabled = true; btn.textContent = "추첨 중..."; }
  if (sub) sub.textContent = "...";
  let count = 0;
  const frames = 28;
  const iv = setInterval(() => {
    const rand = candidates[Math.floor(Math.random() * candidates.length)];
    if (result) result.textContent = rand.name;
    count++;
    if (count >= frames) {
      clearInterval(iv);
      const winner = candidates[Math.floor(Math.random() * candidates.length)];
      if (result) { result.classList.remove("spinning"); result.textContent = winner.name; result.classList.add("picked"); }
      if (sub) sub.textContent = "당첨!";
      if (btn) { btn.disabled = false; btn.textContent = "다시 추첨"; }
      lotteryRunning = false;
    }
  }, 70);
}

/* ======================================================================
   팀 나누기
   ====================================================================== */
function runTeams() {
  const n = parseInt($("#teamCount")?.value || 3);
  const shuffled = [...students].sort(() => Math.random() - 0.5);
  const teams = Array.from({ length: n }, () => []);
  shuffled.forEach((s, i) => teams[i % n].push(s));
  const c = $("#teamsResult");
  if (!c) return;
  c.innerHTML = `<div class="cd-teams-grid">${
    teams.map((team, i) =>
      `<div class="cd-team-card">
        <div class="cd-team-head">${i + 1}팀 <span class="cd-desc">${team.length}명</span></div>
        <div class="cd-team-members">${team.map((s) => `<div class="cd-team-member">${s.name}</div>`).join("")}</div>
      </div>`
    ).join("")
  }</div>`;
}

/* ======================================================================
   사다리타기
   ====================================================================== */
let ladderData = null;
let ladderHighlight = -1;
const ladderRevealed = new Set();
let ladderPrizes = ["발표자", "청소 당번", "자유 선택", "오늘 쉬기", "숙제 패스", "칭찬 포인트 +5", "조장", "간식 선택"];

function renderLadderPrizes() {
  const c = $("#ladderPrizeList");
  if (!c) return;
  c.innerHTML = ladderPrizes.map((p, i) =>
    `<div class="cd-ladder-prize-row">
      <input class="form-input" style="flex:1" value="${p}" data-prizeidx="${i}" />
      <button class="cd-link" style="flex-shrink:0" type="button" data-action="removeLadderPrize" data-prizeidx="${i}">×</button>
    </div>`
  ).join("");
}

function generateLadder() {
  const canvas = $("#ladderCanvas"), tops = $("#ladderTops"), bots = $("#ladderBots");
  if (!canvas || !tops || !bots) return;
  const n = Math.min(students.length, ladderPrizes.length, 8);
  if (n < 2) return;

  const rowCount = 14;
  const rungs = [];
  for (let r = 0; r < rowCount; r++) {
    const row = [];
    for (let c = 0; c < n - 1; c++) {
      if (row.includes(c - 1)) continue;
      if (Math.random() < 0.38) row.push(c);
    }
    rungs.push(row);
  }

  const destinations = Array.from({ length: n }, (_, start) => {
    let col = start;
    for (let r = 0; r < rowCount; r++) {
      if (rungs[r].includes(col)) col++;
      else if (rungs[r].includes(col - 1)) col--;
    }
    return col;
  });

  ladderData = { n, names: students.slice(0, n).map((s) => s.name), prizes: ladderPrizes.slice(0, n), rungs, rowCount, destinations };
  ladderHighlight = -1;
  ladderRevealed.clear();

  tops.innerHTML = ladderData.names.map((name, i) =>
    `<button class="cd-ladder-name" data-ladi="${i}">${name}</button>`
  ).join("");
  bots.innerHTML = ladderData.prizes.map((p) =>
    `<div class="cd-ladder-prize-label">${p}</div>`
  ).join("");

  renderLadderPrizes();
  const res = $("#ladderResults");
  if (res) res.innerHTML = "";
  requestAnimationFrame(() => drawLadder(-1));
}

function drawLadder(highlight) {
  const canvas = $("#ladderCanvas");
  if (!canvas || !ladderData) return;
  const { n, rungs, rowCount } = ladderData;
  const W = canvas.parentElement?.offsetWidth || 640;
  const H = 240;
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, W, H);

  const pad = 36;
  const xs = Array.from({ length: n }, (_, i) => pad + (i * (W - pad * 2)) / (n - 1));
  const rowH = H / (rowCount + 1);

  ctx.lineWidth = 2; ctx.strokeStyle = "#D1D6DB";
  xs.forEach((x) => { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); });

  ctx.strokeStyle = "#B0B8C1";
  rungs.forEach((row, r) => {
    const y = rowH * (r + 1);
    row.forEach((c) => { ctx.beginPath(); ctx.moveTo(xs[c], y); ctx.lineTo(xs[c + 1], y); ctx.stroke(); });
  });

  const tracePath = (startCol, color, width) => {
    ctx.strokeStyle = color; ctx.lineWidth = width;
    ctx.beginPath();
    let col = startCol;
    ctx.moveTo(xs[col], 0);
    for (let r = 0; r < rowCount; r++) {
      const y = rowH * (r + 1);
      ctx.lineTo(xs[col], y);
      if (rungs[r].includes(col)) { col++; ctx.lineTo(xs[col], y); }
      else if (rungs[r].includes(col - 1)) { col--; ctx.lineTo(xs[col], y); }
    }
    ctx.lineTo(xs[col], H); ctx.stroke();
  };

  ladderRevealed.forEach((s) => { if (s !== highlight) tracePath(s, "rgba(0,157,91,0.22)", 2); });
  if (highlight >= 0) tracePath(highlight, "#009d5b", 3.5);
}

function clickLadderName(i) {
  ladderHighlight = i;
  ladderRevealed.add(i);
  drawLadder(i);
  const dest = ladderData.destinations[i];
  const res = $("#ladderResults");
  if (res) res.innerHTML = `<div class="cd-ladder-reveal"><b>${ladderData.names[i]}</b> <span class="muted">→</span> <span class="badge success">${ladderData.prizes[dest]}</span></div>`;
  document.querySelectorAll(".cd-ladder-name").forEach((btn, idx) => {
    btn.classList.toggle("traced", ladderRevealed.has(idx));
    btn.classList.toggle("active", idx === i);
  });
}

function revealAllLadder() {
  if (!ladderData) return;
  ladderData.names.forEach((_, i) => ladderRevealed.add(i));
  ladderHighlight = -1;
  drawLadder(-1);
  const res = $("#ladderResults");
  if (res) res.innerHTML = `<div class="cd-ladder-reveal-all">${
    ladderData.names.map((name, i) => {
      const dest = ladderData.destinations[i];
      return `<div class="cd-ladder-result-row"><b>${name}</b> <span class="muted">→</span> <span class="badge success">${ladderData.prizes[dest]}</span></div>`;
    }).join("")
  }</div>`;
  document.querySelectorAll(".cd-ladder-name").forEach((btn) => btn.classList.add("traced"));
}

/* 드래그&드롭 업로드 */
(function initBulkDrop() {
  const area = document.getElementById("bulkDropArea");
  if (!area) return;
  area.addEventListener("dragover", (e) => { e.preventDefault(); area.classList.add("drag-over"); });
  area.addEventListener("dragleave", () => area.classList.remove("drag-over"));
  area.addEventListener("drop", (e) => {
    e.preventDefault();
    area.classList.remove("drag-over");
    handleBulkFile(e.dataTransfer.files[0]);
  });
  area.addEventListener("click", (e) => {
    if (e.target.closest("[data-action]")) return;
    document.getElementById("bulkFileInput")?.click();
  });
})();

/* 초기화 — 첫 페인트 전까지 transition 억제 (subpanel-open 등 초기 상태 점프 방지) */
document.body.classList.add("no-transition");
makeSchedule();
renderMarket();
renderBrick();
preview();
updateMorningStatus();
renderPraiseReasons();
renderBulkReasonSelect();
renderClassTrend();
renderSideMenu();
renderMorningPosts();
renderMorningBanner();
renderTodos();
renderRoster();
renderPraiseRank();
updateAILimitUI();
setView(CURRENT_PAGE);
/* 학습 이력 페이지: ?ltab= 쿼리(또는 sessionStorage 백업)로 내부 탭 딥링크 */
let _ltabParam = new URLSearchParams(window.location.search).get("ltab");
if (!_ltabParam) {
  try {
    _ltabParam = sessionStorage.getItem("cd_ltab");
    sessionStorage.removeItem("cd_ltab");
  } catch (e) {}
}
if (CURRENT_PAGE === "learning" && _ltabParam) setLearningTab(_ltabParam);
/* 반 관리: #mtab= 해시로 내부 탭 복원 */
const _mtabParam = (window.location.hash.match(/mtab=(\w+)/) || [])[1];
if (_mtabParam && document.querySelector(`[data-mtabpane="${_mtabParam}"]`)) switchManageTab(_mtabParam);
colorizeSub();
/* init 완료 후 transition 복원 → 이후 사용자 인터랙션은 부드럽게 애니메이션 */
setTimeout(() => { document.body.classList.remove("no-transition"); }, 0);
