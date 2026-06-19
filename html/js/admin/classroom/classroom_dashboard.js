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
/* [MOCK] 학원 전체 학생 — 학원장 홈 '학생 현황'을 반별로 보여주는 데모 데이터.
   실제로는 학원 소속 전체 학생을 API로 받아 s.cls(소속 반) 기준으로 그룹핑한다.
   그룹핑이 cls 필드 기반이라 학생/반 수가 늘어도(50·100·200명) 코드 변경 없이 동작.
   (교사 모드의 students[12]와 분리 — 교사는 자기 반, 학원장은 학원 전체) */
const academyStudents = (function () {
  const SUR = ["김", "이", "박", "최", "정", "강", "조", "윤", "장", "임", "한", "오"];
  const GIV = ["민준", "서연", "도윤", "하은", "지호", "수아", "예준", "지유", "주원", "서윤", "건우", "채원", "현우", "다은", "유진", "정우", "소율", "시우", "하린", "준서", "예린", "연우", "지안", "서아", "도현", "수빈", "지민", "하준", "아윤", "태윤"];
  const CLASSES = ["초등 국어 A반", "초등 영어 B반", "초등 종합반", "중등 수학반", "중등 영어반", "중등 종합반"];
  const PER = 8;
  const list = [];
  let n = 0;
  CLASSES.forEach((cls) => {
    const elem = cls.startsWith("초등");
    for (let k = 0; k < PER; k++) {
      list.push({
        classNum: k + 1,
        name: SUR[(n * 7) % SUR.length] + GIV[n % GIV.length],
        grade: elem ? "초" + (3 + (k % 4)) : "중" + (1 + (k % 3)),
        level: elem ? "레벨 1-" + (1 + (k % 3)) : "레벨 2-" + (1 + (k % 2)),
        points: 40 + ((n * 37) % 170),
        done: n % 3 !== 0,
        tag: n % 6 === 0 ? "연속 " + (3 + (n % 9)) + "일" : "",
        cls,
      });
      n++;
    }
  });
  return list;
})();

let selected = 7,
  target = 2240,
  resetOffset = 0,
  toastTimer,
  searchQuery = "";
/* 공동목표 달성 보상 (전용 페이지 표시) */
let goalReward = { reward: "금요일 5분 놀이 시간", period: "이번 주 월요일 ~ 금요일" };
/* 학원 전체 공동목표 (학원장 홈 — 전체 반 선택 시) */
const academyGoal = { title: "6월 전원 학습 완주", target: 5000, current: 2840, reward: "학원 여름 파티" };
/* 반별 공동목표 (학원장 홈 — 특정 반 선택 시) */
const classGoals = {
  "초등 국어 A반": { title: "받아쓰기 100점 챌린지", target: 800, current: 520 },
  "초등 영어 B반": { title: "영어 단어 1000개 마스터", target: 1000, current: 340 },
  "초등 종합반":   { title: "한 달 개근 도전",        target: 900,  current: 720 },
  "중등 수학반":   { title: "오답노트 완성 챌린지",    target: 1200, current: 480 },
  "중등 영어반":   { title: "영어 에세이 10편 완성",   target: 1100, current: 870 },
  "중등 종합반":   { title: "친구 칭찬 릴레이",        target: 1000, current: 610 },
};
/* 지난 공동목표 히스토리 (달성 기록) */
let goalHistory = [
  { title: "받아쓰기 100점 챌린지", target: 1800, achievedDate: "5월 30일", reward: "다같이 보드게임 시간", period: "5월 1일 ~ 5월 30일", contributors: 12, topContributor: "김하랑", topPoints: 280, note: "받아쓰기 연습을 꾸준히 해서 반 평균 92점을 달성하며 목표를 이뤘어요." },
  { title: "한 달 개근 도전", target: 1500, achievedDate: "4월 28일", reward: "교실 피크닉", period: "4월 1일 ~ 4월 28일", contributors: 11, topContributor: "한예린", topPoints: 240, note: "한 달 동안 큰 결석 없이 모두 함께 출석해 목표 포인트를 모았어요." },
  { title: "친구 칭찬 릴레이", target: 1200, achievedDate: "3월 29일", reward: "자유 독서 시간", period: "3월 2일 ~ 3월 29일", contributors: 10, topContributor: "윤지후", topPoints: 200, note: "서로 칭찬을 주고받으며 따뜻한 반 분위기 속에서 목표를 달성했어요." },
];
let sdMonthOffset = 0;
let sdDayOffset = 0;
const studentReports = {}; // [studentIdx] → { week: [...], month: [...] }
let reportPeriod = "week";
let selBulk = new Set();
function updateBulkBar() {
  if ($("#bulkSelCount")) {
    $("#bulkSelCount").textContent = selBulk.size + "명 선택";
    $("#bulkSelCount").hidden = selBulk.size === 0;
  }
  if ($("#bulkSelectAll")) $("#bulkSelectAll").checked = selBulk.size > 0 && selBulk.size >= students.length;
  if ($("#bulkGiveBtn")) $("#bulkGiveBtn").disabled = !selBulk.size;
}
let selBulkMgr = new Set(); // 기관 관리자 학생 선택 (academyStudents 인덱스 기준)
function updateBulkBarMgr() {
  if ($("#bulkSelCount")) {
    $("#bulkSelCount").textContent = selBulkMgr.size + "명 선택";
    $("#bulkSelCount").hidden = selBulkMgr.size === 0;
  }
  if ($("#bulkGiveBtn")) $("#bulkGiveBtn").disabled = !selBulkMgr.size;
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
  { name: "자리 우선권", icon: "event_seat", category: "자리", price: 30, stock: 5, day: "금요일", visible: "공개", desc: "하루 동안 원하는 자리를 먼저 선택할 수 있어요." },
  { name: "선생님 칭찬 카드", icon: "star", category: "보상", price: 20, stock: 10, day: "언제나", visible: "공개", desc: "선생님이 특별 칭찬 카드를 써줘요." },
  { name: "독서 자리 선택권", icon: "menu_book", category: "자리", price: 25, stock: 6, day: "언제나", visible: "공개", desc: "독서 시간에 원하는 독서 자리를 선택할 수 있어요." },
  { name: "아침활동 선택권", icon: "wb_sunny", category: "활동", price: 35, stock: 4, day: "교사 승인 후", visible: "공개", desc: "아침활동 중 하나를 선택해 친구들과 함께 할 수 있어요." },
  { name: "미술 도구 우선 선택권", icon: "palette", category: "활동", price: 25, stock: 5, day: "미술 있는 날", visible: "공개", desc: "미술 시간에 사용할 도구나 재료를 먼저 선택할 수 있어요." },
  { name: "반 음악 신청권", icon: "music_note", category: "활동", price: 15, stock: 8, day: "금요일", visible: "공개", desc: "쉬는 시간 또는 정리 시간에 들을 음악을 신청할 수 있어요." },
  { name: "정리 도우미 면제권", icon: "cleaning_services", category: "특전", price: 40, stock: 3, day: "월 1회", visible: "공개", desc: "정해진 날의 정리 도우미 활동을 한 번 쉬어갈 수 있어요." },
  { name: "미니 게임 5분권", icon: "sports_esports", category: "특전", price: 50, stock: 2, day: "금요일", visible: "공개", desc: "반 약속을 지키고 금요일에 미니 게임 5분을 사용할 수 있어요." },
];
/* 쿠폰 분류별 색상 (티켓 액센트) */
const CATEGORY_COLOR = {
  "자리": { c: "#009d5b", bg: "#EBF9F3" },
  "보상": { c: "#F59E0B", bg: "#FFF7E6" },
  "활동": { c: "#4B6EE8", bg: "#EEF2FE" },
  "특전": { c: "#8B5CF6", bg: "#F3EEFE" },
};
let couponRequests = [
  { student: "김하랑", coupon: "자리 우선권", price: 30, time: "오늘 09:10", status: "승인 대기", used: false },
  { student: "윤지후", coupon: "반 음악 신청권", price: 15, time: "오늘 09:25", status: "승인" },
  { student: "한예린", coupon: "독서 자리 선택권", price: 25, time: "어제 14:40", status: "승인 대기", used: false },
  { student: "박지한", coupon: "자리 우선권", price: 30, time: "어제 15:20", status: "승인", used: false },
  { student: "이도현", coupon: "독서 자리 선택권", price: 25, time: "그제 16:05", status: "승인", used: true },
];
/* 자리 관련 이용권 식별 (이름에 "자리" 포함) */
const SEAT_COUPON_RE = /자리/;
/*
 * pointType 구분 (표시명)
 *   "brick"  → 브릭포인트  — 세븐닷 학습 자동 적립 (학습 완료·오답 재풀기 등)
 *   "praise" → 선생님포인트 — 선생님이 직접 지급
 *   "parent" → 칭찬머니    — 학부모 하트/포인트 (추후)
 */
const POINT_TYPE_LABEL = { brick: "브릭포인트", praise: "선생님포인트", parent: "칭찬머니" };
const BRICK_REASONS  = new Set(["학습 완료", "오답 다시 풀기", "영어 단어 학습", "공동목표 기여", "연속 학습 칭찬", "오늘 학습 완료"]);
const PRAISE_REASONS = new Set(["칭찬 참여", "오답 다시 풀기(칭찬)", "친구 도와주기", "수업 집중", "수업 집중 칭찬", "직접 입력 칭찬"]);
function getPointType(reason) {
  if (!reason) return "brick";
  if (PRAISE_REASONS.has(reason)) return "praise";
  return "brick";
}

let ledger = [
  { time: "오늘 09:12", student: "김하랑", type: "적립", reason: "학습 완료",      amount: 5,  balance: 165, tier: "골드",   subject: "수학", pointType: "brick"  },
  { time: "오늘 09:30", student: "김하랑", type: "적립", reason: "오답 다시 풀기", amount: 3,  balance: 168, tier: "실버",   subject: "영어", pointType: "brick"  },
  { time: "오늘 09:05", student: "김하랑", type: "적립", reason: "친구 도와주기",  amount: 5,  balance: 160, tier: null,     subject: null,   pointType: "praise" },
  { time: "오늘 08:55", student: "한예린", type: "적립", reason: "학습 완료",      amount: 5,  balance: 117, tier: "골드",   subject: "수학", pointType: "brick"  },
  { time: "오늘 09:20", student: "한예린", type: "적립", reason: "오답 다시 풀기", amount: 5,  balance: 122, tier: "실버",   subject: "영어", pointType: "brick"  },
  { time: "오늘 08:40", student: "한예린", type: "적립", reason: "수업 집중",      amount: 5,  balance: 112, tier: null,     subject: null,   pointType: "praise" },
  { time: "오늘 09:10", student: "윤지후", type: "적립", reason: "학습 완료",      amount: 5,  balance: 119, tier: "브론즈", subject: "국어", pointType: "brick"  },
  { time: "오늘 09:35", student: "윤지후", type: "사용", reason: "반 음악 신청권 사용", amount: -15, balance: 104 },
  { time: "어제 14:40", student: "박소율", type: "적립", reason: "영어 단어 학습", amount: 3,  balance: 63,  tier: "브론즈", subject: "영어", pointType: "brick"  },
  { time: "어제 13:20", student: "김우주", type: "공동목표", reason: "공동목표 기여", amount: 5, balance: 120, pointType: "brick" },
  { time: "어제 16:00", student: "정민아", type: "적립", reason: "칭찬 참여",      amount: 5,  balance: 99,  tier: null,     subject: null,   pointType: "praise" },
  { time: "어제 11:30", student: "이서온", type: "적립", reason: "칭찬 참여",      amount: 5,  balance: 77,  tier: null,     subject: null,   pointType: "praise" },
];

/* academy 학생용 오늘 학습 ledger 자동 생성 (done:true 인 학생만) */
(function () {
  const SUBJS  = ["국어", "수학", "영어", "과학"];
  const TIERS  = ["골드", "골드", "실버", "실버", "브론즈"];
  const TIER_PT = { "골드": 5, "실버": 3, "브론즈": 1 };
  academyStudents.forEach(function (s, i) {
    if (!s.done) return;
    const subj = SUBJS[i % SUBJS.length];
    const tier = TIERS[i % TIERS.length];
    const hr = 8 + (i % 3);
    const min = String(10 + (i * 7) % 50).padStart(2, "0");
    ledger.push({ time: "오늘 0" + hr + ":" + min, student: s.name, type: "적립", reason: "학습 완료", amount: TIER_PT[tier], balance: s.points, tier: tier, subject: subj, pointType: "brick" });
    /* 일부 학생에게 칭찬포인트도 추가 */
    if (i % 5 === 0) {
      ledger.push({ time: "오늘 0" + hr + ":" + String(+min + 5).padStart(2, "0"), student: s.name, type: "적립", reason: "칭찬 참여", amount: 5, balance: s.points + 5, tier: null, subject: null, pointType: "praise" });
    }
  });
})();

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
  const dayData = []; // 1..today: { lv, pct }
  let html = "";
  for (let i = 0; i < first; i++) html += '<div class="cd-cal-cell empty"></div>';
  for (let d = 1; d <= days; d++) {
    if (d > today) {
      html += `<div class="cd-cal-cell future"><span>${d}</span></div>`;
      continue;
    }
    const lv = d % 6 === 0 ? 0 : (d * 7) % 5; // 0~4
    const pct = lv === 0 ? 0 : lv * 20 + 8;
    dayData[d] = { lv, pct };
    html += `<div class="cd-cal-cell lv${lv} ${d === today ? "today" : ""}" data-tip="6월 ${d}일 · 완료율 ${pct}%"><span>${d}</span></div>`;
  }
  cal.innerHTML = html;

  /* 월별 KPI·주차별 — 달력 히트맵 데이터 기준 계산 (고정값 제거) */
  const learnDays = [];
  for (let d = 1; d <= today; d++) if (dayData[d] && dayData[d].lv > 0) learnDays.push(d);
  const studyCount = learnDays.length;
  const avgPct = studyCount ? Math.round(learnDays.reduce((a, d) => a + dayData[d].pct, 0) / studyCount) : 0;
  let streak = 0, bestStreak = 0;
  for (let d = 1; d <= today; d++) {
    if (dayData[d] && dayData[d].lv > 0) { streak++; bestStreak = Math.max(bestStreak, streak); }
    else streak = 0;
  }
  const monthBrick = learnDays.reduce((a, d) => a + dayData[d].pct, 0); // 완료율 합 기반 누적 브릭
  if ($("#lmDays")) $("#lmDays").innerHTML = studyCount + '<span class="unit">일</span>';
  if ($("#lmDaysSub")) $("#lmDaysSub").textContent = "전체 " + days + "일 중";
  if ($("#lmAvg")) $("#lmAvg").innerHTML = avgPct + '<span class="unit">%</span>';
  if ($("#lmStreak")) $("#lmStreak").innerHTML = bestStreak + '<span class="unit">일</span>';
  if ($("#lmBrick")) $("#lmBrick").textContent = monthBrick.toLocaleString();

  const weekList = $("#lmWeekList");
  if (weekList) {
    const weeks = [];
    for (let d = 1; d <= today; d++) {
      const wk = Math.floor((first + d - 1) / 7);
      weeks[wk] = (weeks[wk] || 0) + (dayData[d] && dayData[d].lv > 0 ? 1 : 0);
    }
    weekList.innerHTML = weeks
      .map((n, wk) => {
        const cls = n >= 5 ? "success" : n >= 3 ? "warning" : "neutral";
        return `<div class="cd-check-item"><span><b>${wk + 1}주차</b></span><span class="badge ${cls}">${n}일</span></div>`;
      })
      .join("");
  }
  /* 과목별 누적 완료율 — 월 평균(avgPct) 기준 과목별 편차 적용 (고정값 제거) */
  const subjEl = $("#lmSubjects");
  if (subjEl) {
    const subs = [{ k: "국어", off: 8 }, { k: "수학", off: 1 }, { k: "영어", off: -4 }];
    subjEl.innerHTML = subs
      .map((s) => {
        const p = Math.max(0, Math.min(100, avgPct + s.off));
        return `<div class="cd-metric-row"><span class="k">${s.k}</span><span class="track"><span class="fill" style="width:${p}%"></span></span><span class="v">${p}%</span></div>`;
      })
      .join("");
  }
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
  { i: 2, n: 2 },
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
/* ----- 반 홈: 주간 목표 기여도 순위 ----- */
function renderGoalContribRank() {
  const el = $("#goalContribRank");
  if (!el) return;
  const classTotal = students.reduce((a, s) => a + s.points, 0);
  const sorted = students
    .map((s, i) => ({ i, name: s.name, pts: s.points, pct: classTotal ? Math.round(s.points / classTotal * 100) : 0 }))
    .sort((a, b) => b.pts - a.pts)
    .slice(0, 5);
  const max = sorted[0]?.pts || 1;
  el.innerHTML = sorted.map((r, idx) =>
    `<div class="cd-contrib-row" data-i="${r.i}">
      <span class="cd-rank-no r${Math.min(idx + 1, 4)}">${idx + 1}</span>
      <span class="cd-contrib-name">${r.name}</span>
      <div class="cd-contrib-track"><div class="cd-contrib-fill" style="width:${Math.round(r.pts / max * 100)}%"></div></div>
      <span class="cd-contrib-pct">${r.pct}%</span>
    </div>`
  ).join("");
}

/* ----- 우리 반 공동목표 전용 페이지 (classroom_goal) ----- */
function renderGoalPage() {
  const cur = goalNow(), tgt = target || 1;
  const pct = Math.min(100, Math.round((cur / tgt) * 100));
  if ($("#goalContribCount")) $("#goalContribCount").textContent = "기여 " + students.filter((s) => s.points > 0).length + "명";
  /* 달성 시 보상 (전용 페이지 강조 카드) */
  if ($("#goalRewardBox")) $("#goalRewardBox").innerHTML = `<div class="cd-goalp-reward-big">
    <span class="material-symbols-outlined cd-goalp-reward-ico">redeem</span>
    <div class="cd-goalp-reward-name">${goalReward.reward}</div>
    <div class="cd-desc">${goalReward.period}</div>
    <div class="cd-goalp-reward-hint">목표 달성 시 우리 반 모두에게</div>
  </div>`;
  /* 최근 적립 흐름 (전체 적립 ledger — 공동목표에 쌓이는 포인트) */
  if ($("#goalHistoryRows")) {
    const rows = ledger.filter((r) => r.type === "적립").slice(0, 8);
    $("#goalHistoryRows").innerHTML = rows.length
      ? rows.map((r) => `<tr><td class="muted">${r.time}</td><td><b>${r.student}</b></td><td>${r.reason}</td><td class="right"><span class="badge info">+${r.amount}p</span></td></tr>`).join("")
      : `<tr><td colspan="4" class="cd-desc" style="padding:16px;text-align:center">최근 적립 내역이 없습니다.</td></tr>`;
  }
  /* 지난 공동목표 히스토리 — 1열 클릭 카드 (클릭 시 상세 모달) */
  if ($("#goalHistoryList")) {
    $("#goalHistoryList").innerHTML = goalHistory.length
      ? goalHistory.map((h, i) => `<button type="button" class="cd-pastgoal-item" data-action="openGoalPast" data-i="${i}">
          <span class="cd-pastgoal-main">
            <span class="cd-pastgoal-title">${h.title}</span>
            <span class="cd-desc">${h.achievedDate} 달성 · 목표 ${h.target.toLocaleString()}p · 기여 ${h.contributors}명</span>
          </span>
          <span class="badge success">${h.reward}</span>
          <span class="material-symbols-outlined cd-pastgoal-arrow">chevron_right</span>
        </button>`).join("")
      : `<div class="cd-desc" style="padding:16px;text-align:center">지난 공동목표 기록이 없습니다.</div>`;
  }
}

function renderBrickRank() {
  const el = $("#brickRank");
  if (!el) return;
  const top = students
    .map((s, i) => ({ i, n: s.points }))
    .sort((a, b) => b.n - a.n)
    .slice(0, 5);
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

/* ----- 반 홈: 과목별 학습 현황 테이블 ----- */
function renderHomeSubjTable() {
  const tbody = $("#homeSubjRows");
  if (!tbody) return;
  /* 오늘 학습 완료 항목을 ledger에서 뽑아 학생×과목 매핑 */
  const SUBJS = ["국어", "수학", "영어", "과학"];
  /* 과목 헤더 */
  SUBJS.forEach((s, idx) => {
    const th = document.getElementById("homeSubjH" + (idx + 1));
    if (th) th.textContent = s;
  });
  /* 학생별 오늘 완료 과목 집계 */
  const byStudent = {};
  ledger.forEach(function (e) {
    if (!e.subject || e.type !== "적립") return;
    if (!byStudent[e.student]) byStudent[e.student] = new Set();
    byStudent[e.student].add(e.subject);
  });
  /* students 순서 기준으로 행 생성 */
  const rows = students.map(function (s) {
    const done = byStudent[s.name] || new Set();
    const cells = SUBJS.map(function (subj) {
      if (done.has(subj)) {
        return '<td class="center"><span class="badge success" style="font-size:12px">완료</span></td>';
      }
      return '<td class="center"><span style="color:#8B95A1;font-size:13px">-</span></td>';
    }).join("");
    return "<tr><td>" + s.name + "</td>" + cells + "</tr>";
  });
  tbody.innerHTML = rows.join("") || '<tr><td colspan="5" class="cd-empty-state">학습 데이터가 없습니다.</td></tr>';
}

/* ----- 반 홈: 공동목표 배너 전환 ----- */
function applyGoalBannerData(el, g) {
  const action = el.querySelector('.cd-goal-inline-action');
  const info   = el.querySelector('.cd-goal-banner-info');
  if (!g) {
    if (info) info.innerHTML =
      '<div class="cd-goal-banner-head" style="margin-bottom:0">' +
        '<span class="muted" style="font-size:14px">설정된 공동목표가 없습니다.</span>' +
      '</div>';
    if (action) action.hidden = false;
    return;
  }
  const pct  = g.target ? Math.round(g.current / g.target * 100) : 0;
  const left = (g.target - g.current).toLocaleString();
  if (info) info.innerHTML =
    '<div class="cd-goal-banner-head">' +
      '<span class="badge ' + (g.academy ? 'warning' : 'success') + '">' + (g.academy ? '학원 공동목표' : '우리 반 공동목표') + '</span>' +
      '<span class="cd-goal-title">' + g.title + '</span>' +
    '</div>' +
    '<div class="cd-progress lg"><div class="cd-bar" style="width:' + pct + '%"></div></div>' +
    '<div class="cd-goal-foot">' +
      '<span class="cd-sub">달성률 <b class="percent">' + pct + '%</b></span>' +
      '<span class="cd-sub cd-goal-left">목표까지 ' + left + ' 포인트 남음</span>' +
    '</div>';
  if (action) action.hidden = true;
}

function renderGoalBanner() {
  const acEl = document.getElementById('goalBannerAcademy');
  const clEl = document.getElementById('goalBannerClass');
  if (!acEl || !clEl) return;
  const showAcademy = isPrincipal() && !selectedClass;
  acEl.hidden = !showAcademy;
  clEl.hidden = showAcademy;
  if (showAcademy) {
    const g = (academyGoal && academyGoal.title) ? Object.assign({ academy: true }, academyGoal) : null;
    applyGoalBannerData(acEl, g);
  } else {
    let g = null;
    if (isPrincipal() && selectedClass) {
      const cg = classGoals[selectedClass];
      g = cg ? { title: cg.title, target: cg.target, current: cg.current, academy: false } : null;
    } else {
      g = target > 0 ? { title: goalReward.reward || '공동목표', target, current: Math.min(selected, target), academy: false } : null;
    }
    applyGoalBannerData(clEl, g);
  }
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
/* NAV 접근 플래그
   institutionMgr: true  — 기관 관리자(학원장·학교 담당선생님) 전용
   academyOnly: true     — 학원장(principal)만
   hideMgr: true         — 기관 관리자면 숨김(반 선생님 전용 중복 항목)
   school: true          — 학교 전용
   플래그 없음           — 전체(반 선생님 포함) */
const NAV = [
  { key: "home", label: "홈", icon: "home", menu: "class" },
  {
    key: "ops", label: "운영", icon: "groups", title: "반 운영",
    items: [
      { menu: "agroup", label: "그룹(반) 관리", institutionMgr: true },
      { menu: "astudent", label: "학생 관리", institutionMgr: true },
      { menu: "ateacher", label: "선생님 관리", institutionMgr: true },
      { menu: "classmgmt", label: "반 관리", teacherOnly: true },
      { menu: "students", label: "학생 관리", hideMgr: true },
      { menu: "board", label: "아침게시판", school: true },
      { menu: "goal", label: "공동목표" },
    ],
  },
  {
    key: "learn", label: "학습", icon: "chart", title: "학습",
    items: [
      { menu: "learning", label: "학습 현황" },
      { menu: "learnreport", label: "학습 보고서" },
      { menu: "diagnosis", label: "진단 보고서" },
      { menu: "areport", label: "보고서·알림" },
    ],
  },
  {
    key: "content", label: "콘텐츠", icon: "menu_book", title: "콘텐츠",
    items: [
      { menu: "content", label: "콘텐츠 미리보기" },
      { menu: "worksheet", label: "워크시트" },
      { menu: "alevel", label: "콘텐츠·레벨" },
    ],
  },
  {
    key: "brick", label: "포인트", icon: "coin", title: "포인트 경제",
    items: [
      { menu: "brick", label: "포인트" },
      { menu: "market", label: "포인트장터" },
      { menu: "praiserule", label: "칭찬 사유" },
      { menu: "history", label: "활동 이력" },
    ],
  },
  { key: "asub", label: "구독", icon: "credit_card", menu: "asub", academyOnly: true },
  { key: "adep", label: "적립금", icon: "account_balance_wallet", menu: "adep", academyOnly: true },
  { key: "ashop", label: "아이템 샵", icon: "store", menu: "ashop", academyOnly: true },
  { key: "faq", label: "FAQ", icon: "help", menu: "faq" },
  { key: "settings", label: "설정", icon: "gear", menu: "settings" },
];

const ACADEMY_STUBS = new Set();
/* 역할 체크 헬퍼
   cd_mode 값: "principal"(학원장) | "head_teacher"(학교 담당선생님) | "teacher"(반 선생님)
   기관 관리자 = 학원장 OR 학교 담당선생님 — 반 생성·전체 학생 조회·반별 그룹 보기 가능
   학원 전용 = 학원장만 — 구독·적립금·아이템샵 */
function _getMode() { try { return sessionStorage.getItem("cd_mode") || document.body.dataset.mode || "teacher"; } catch(e) { return document.body.dataset.mode || "teacher"; } }
function isPrincipal() { return _getMode() === "principal"; }
function isHeadTeacher() { return _getMode() === "head_teacher"; }
function isInstitutionManager() { var m = _getMode(); return m === "principal" || m === "head_teacher"; }
/* 현재 노출 nav: 역할별 필터 */
function currentNav() {
  return NAV.filter(function (g) {
    if (g.academyOnly) return isPrincipal();
    if (g.institutionMgr) return isInstitutionManager();
    return true;
  });
}

/* 메뉴 키가 속한 레일 그룹 찾기 */
function _groupOf(menu) {
  for (const g of currentNav()) {
    if (!g.items) continue;
    for (const it of g.items) {
      if (it.menu === menu) return g;
      if (it.children && it.children.some((c) => c.menu === menu)) return g;
    }
  }
  return null;
}

/* 기관 타입: active 반의 org명에 "학원" 포함 시 학원, 아니면 학교
   (학교 전용 기능: 아침게시판 등 — school:true 항목은 학원이면 숨김) */
function activeOrg() {
  try { const c = (window.SHELL && window.SHELL.CLASSES || []).find((x) => x.active); return c ? c.org : "세븐초등학교"; } catch (e) { return "세븐초등학교"; }
}
function isSchoolOrg() { return !activeOrg().includes("학원"); }
const SCHOOL_BADGE = '<span class="badge neutral cd-nav-school-badge">학교</span>';
const TEACHER_BADGE = '<span class="badge neutral cd-nav-school-badge">선생님</span>';
function _navVisible(c) {
  if (c.school && !isSchoolOrg()) return false;              // 학교 전용(아침게시판) — 학원 숨김
  if (c.institutionMgr && !isInstitutionManager()) return false; // 기관 관리자 전용
  if (c.academyOnly && !isPrincipal()) return false;         // 학원장 전용
  if (c.hideMgr && isInstitutionManager()) return false;     // 기관 관리자면 숨김(반 단위 항목)
  return true;
}

function renderSideMenu() {
  const el = $("#cdSideMenu");
  if (!el) return;
  el.innerHTML = currentNav().map((g) => {
    if (!g.items) {
      return `<button type="button" data-menu="${g.menu}">${micon(g.icon)}<span class="cd-si-full">${g.label}</span><span class="cd-si-short">${g.label}</span></button>`;
    }
    /* 그룹: 레일 버튼 + (모바일 전용) 평탄화 항목 */
    const flat = g.items
      .flatMap((it) => (it.children ? it.children : [it]))
      .filter(_navVisible)
      .map((c) => `<button type="button" data-menu="${c.menu}">${c.label}${c.school ? SCHOOL_BADGE : ""}${c.teacherOnly ? TEACHER_BADGE : ""}</button>`)
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
  const g = currentNav().find((x) => x.key === key);
  if (!g || !g.items) return;
  const panel = getSubPanel();
  panel.dataset.sub = key;
  const isActive = (menu) => menu === CURRENT_PAGE;
  panel.innerHTML =
    `<div class="cd-subpanel-head">${g.title}</div>` +
    g.items
      .filter(_navVisible)
      .map((it) => {
        if (it.children) {
          const childActive = it.children.some((c) => isActive(c.menu));
          return `<div class="cd-sp-acc${childActive ? " open" : ""}">
            <button type="button" class="cd-sp-acc-head">${it.label}<span class="material-symbols-outlined cd-sp-arrow" aria-hidden="true">expand_more</span></button>
            <div class="cd-sp-acc-body">${it.children.filter(_navVisible).map((c) => `<button type="button" class="cd-subpanel-item sub${isActive(c.menu) ? " active" : ""}" data-menu="${c.menu}">${c.label}${c.school ? SCHOOL_BADGE : ""}${c.teacherOnly ? TEACHER_BADGE : ""}</button>`).join("")}</div>
          </div>`;
        }
        return `<button type="button" class="cd-subpanel-item${isActive(it.menu) ? " active" : ""}" data-menu="${it.menu}">${it.label}${it.school ? SCHOOL_BADGE : ""}${it.teacherOnly ? TEACHER_BADGE : ""}</button>`;
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
  /* 반 관리 홈: 승인 알림 배너 */
  const notice = $("#manageApproveNotice");
  if (notice) {
    const waits = couponRequests.filter(r => r.status === "승인 대기").length;
    notice.hidden = waits === 0;
    notice.querySelectorAll(".couponWait").forEach(el => { el.textContent = waits + "건"; });
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
  /* 반 현황 요약 카드 — 실데이터 연동 (목업 증감 제거) */
  if ($("#sumRate")) $("#sumRate").textContent = pct + "%";
  if ($("#sumRateSub")) $("#sumRateSub").textContent = done + " / " + total + "명 완료";
  const todayEarned = ledger.filter((r) => (r.time || "").includes("오늘") && r.type === "적립").reduce((a, r) => a + r.amount, 0);
  if ($("#sumPointsSub")) $("#sumPointsSub").textContent = "오늘 +" + todayEarned.toLocaleString() + "p";
  const praiseTotal = students.reduce((a, s, i) => a + praiseReasons.filter((_, ri) => (i + ri) % 2 === 0).length, 0);
  if ($("#sumPraise")) $("#sumPraise").textContent = praiseTotal;
  const orgTitleEl = $("#homeOrgTitle");
  if (orgTitleEl) orgTitleEl.textContent = activeOrg();
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
            <div class="cd-approve-btns"><button class="btn-sm approve" type="button" data-action="approveCoupon" data-i="${i}">승인</button><button class="btn-sm reject" type="button" data-action="promptReject" data-i="${i}">반려</button></div>
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

/* ----- 반 홈: 오늘 할 일 인라인 확장 (학습 미완료 학생 목록) ----- */
function renderBriefExpand(showAll) {
  const list = students.map((s, i) => ({ s, i })).filter(({ s }) => !(s.status?.includes("학습")));
  const container = $("#briefIncompleteList");
  const moreBtn = $("#briefExpandMore");
  if (!container) return;
  const SHOW = 5;
  const items = showAll ? list : list.slice(0, SHOW);
  const remaining = showAll ? 0 : Math.max(0, list.length - SHOW);
  container.innerHTML = items.length
    ? items.map(({ s, i }) => `<button type="button" class="cd-stu-chip" data-i="${i}"><span class="cd-stu-no c${i % 6}">${s.classNum}</span>${s.name}</button>`).join("")
    : '<span class="cd-desc">미완료 학생이 없습니다.</span>';
  if (moreBtn) {
    if (remaining > 0) {
      moreBtn.hidden = false;
      moreBtn.textContent = remaining + "명 더보기";
    } else {
      moreBtn.hidden = true;
    }
  }
}

/* ----- 반 관리 홈(관리 요약): 관리 필요 학생 — 오늘 학습 미완료 명단 ----- */
function renderManageIncomplete() {
  const el = $("#homeIncomplete");
  if (!el) return;
  const list = students.map((s, i) => ({ s, i })).filter(({ s }) => !(s.status || "").includes("학습"));
  el.innerHTML = list.length
    ? list.map(({ s, i }) => `<button type="button" class="cd-stu-chip" data-i="${i}"><span class="cd-stu-no c${i % 6}">${s.classNum}</span>${s.name}</button>`).join("")
    : '<div class="cd-desc">오늘 모든 학생이 학습을 완료했어요.</div>';
  const cnt = $("#homeIncompleteCount");
  if (cnt) {
    cnt.textContent = list.length ? list.length + "명" : "완료";
    cnt.className = "badge " + (list.length ? "warning" : "success");
  }
}

/* ----- 반 관리 홈: 이번 주 학습 완료율 막대 차트 (주 단위 네비) ----- */
let weekNavOffset = 0; // 0=이번주, -1=저번주, ...
let rptWeekOffset = 0;

const WEEK_MOCK = [
  [92, 78, 95, 88, 74],   // 이번 주 (offset 0)
  [88, 91, 83, 76, 90],   // 저번 주 (offset -1)
  [79, 85, 70, 82, 88],   // 2주 전
];

function weekLabel(offset) {
  const REF = new Date(2026, 5, 16);
  const mon = new Date(REF);
  mon.setDate(mon.getDate() + offset * 7);
  const fri = new Date(mon);
  fri.setDate(fri.getDate() + 4);
  return `${mon.getMonth()+1}/${mon.getDate()} - ${fri.getMonth()+1}/${fri.getDate()}`;
}

function renderWeeklyCompletion() {
  const el = $("#weeklyCompletion");
  if (!el) return;
  const today = new Date().getDay();
  const days = ["월", "화", "수", "목", "금"];
  const todayIdx = today === 0 ? 4 : Math.min(today - 1, 4);
  const mockIdx = Math.min(Math.abs(weekNavOffset), WEEK_MOCK.length - 1);
  const base = WEEK_MOCK[mockIdx];
  const isCurrentWeek = weekNavOffset === 0;

  const rates = days.map((_, i) => {
    if (isCurrentWeek && i > todayIdx) return null;
    if (i === todayIdx && isCurrentWeek) {
      const done = students.filter(s => s.status?.includes("학습")).length;
      return students.length ? Math.round((done / students.length) * 100) : base[i];
    }
    return base[i];
  });

  el.innerHTML = days.map((d, i) => {
    const r = rates[i];
    const isEmpty = r === null;
    const color = isEmpty ? "#e6e8eb" : r >= 90 ? "#009d5b" : r >= 70 ? "#F59E0B" : "#E53935";
    return `<div class="cd-wb-col">
      <div class="cd-wb-bar-wrap">
        <div class="cd-wb-bar" style="height:${isEmpty ? 0 : r}%;background:${color}"></div>
      </div>
      <span class="cd-wb-pct" style="color:${isEmpty ? '#c1c7cf' : color}">${isEmpty ? '-' : r + '%'}</span>
      <span class="cd-wb-day${i === todayIdx && isCurrentWeek ? ' today' : ''}">${d}</span>
    </div>`;
  }).join("");

  const lbl = $("#weekNavLabel");
  if (lbl) lbl.textContent = weekLabel(weekNavOffset);
  const nextBtn = $("#weekNavNext");
  if (nextBtn) nextBtn.disabled = weekNavOffset >= 0;
}

/* ----- 주간 리포트 탭: 학생별 현황 테이블 ----- */
function renderRptStudentTable() {
  const el = $("#rptStudentTable");
  if (!el) return;

  const mockIdx = Math.min(Math.abs(rptWeekOffset), WEEK_MOCK.length - 1);
  const weekRate = WEEK_MOCK[mockIdx];
  const avgRate = Math.round(weekRate.reduce((a, v) => a + v, 0) / weekRate.length);

  const classTotal = students.reduce((a, s) => a + s.points, 0) || 1;
  const praised = students.map((s, i) => praiseReasons.filter((_, ri) => (i + ri) % 2 === 0).length);

  /* 학생별 지표 + '챙겨볼 학생' 사유 산출 */
  const rows = students.map((s, i) => {
    const pct = 60 + (i * 7) % 41; // mock per-student completion
    const praiseCnt = praised[i];
    const contrib = classTotal ? Math.round((s.points / classTotal) * 100) : 0;
    const reasons = [];
    if (pct < 70) reasons.push(`이번 주 완료율 ${pct}% · 반 기준(70%) 미만`);
    if (!(s.status || "").includes("학습")) reasons.push("오늘 세븐닷 학습 미완료");
    if (praiseCnt === 0) reasons.push("이번 주 받은 칭찬 없음");
    if (contrib < 5) reasons.push(`포인트 기여도 낮음 (${contrib}%)`);
    /* 완료율 70% 미만이 1차 기준 → 챙겨볼 학생 */
    const needsAttention = pct < 70;
    return { s, i, pct, praiseCnt, contrib, reasons, needsAttention };
  });

  const needCareCount = rows.filter((r) => r.needsAttention).length;
  if ($("#rpNeedCareCount")) $("#rpNeedCareCount").textContent = needCareCount + "명";
  if ($("#rpPraised")) $("#rpPraised").textContent = praised.reduce((a, v) => a + v, 0) + "회";
  if ($("#rptWeekLabel")) $("#rptWeekLabel").textContent = weekLabel(rptWeekOffset);
  const rptNext = $("#rptWeekNext"); if (rptNext) rptNext.disabled = rptWeekOffset >= 0;

  el.innerHTML = `
    <div class="cd-rpt-stu-head">
      <span class="cd-rpt-stu-name">학생</span>
      <span class="cd-rpt-stu-rate">완료율</span>
      <span class="cd-rpt-stu-praise">칭찬</span>
      <span class="cd-rpt-stu-pts">포인트</span>
      <span class="cd-rpt-stu-contrib">기여도</span>
      <span class="cd-rpt-stu-act"></span>
    </div>
    ${rows.map((r) => {
      const { s, i, pct, praiseCnt, contrib, reasons, needsAttention } = r;
      const barColor = pct >= 90 ? "#009d5b" : pct >= 70 ? "#F59E0B" : "#E53935";
      const tip = needsAttention
        ? `<span class="cd-rpt-care-tip" role="tooltip">
             <span class="cd-rpt-care-tip-hd">챙겨볼 이유</span>
             ${reasons.map((x) => `<span class="cd-rpt-care-reason">${x}</span>`).join("")}
           </span>`
        : "";
      return `<div class="cd-rpt-stu-row${needsAttention ? ' needs-care' : ''}" data-action="openRptStudent" data-i="${i}">
        <span class="cd-rpt-stu-name">
          ${needsAttention ? '<span class="material-symbols-outlined cd-rpt-care-ico">warning</span> ' : ''}
          <b>${s.name}</b>
          ${tip}
        </span>
        <span class="cd-rpt-stu-rate">
          <span class="cd-rpt-mini-bar"><span style="width:${pct}%;background:${barColor}"></span></span>
          <span style="font-size:14px;color:${barColor};font-weight:700">${pct}%</span>
        </span>
        <span class="cd-rpt-stu-praise">${praiseCnt}회</span>
        <span class="cd-rpt-stu-pts">+${s.points % 40 + 10}p</span>
        <span class="cd-rpt-stu-contrib">${contrib}%</span>
        <span class="cd-rpt-stu-act">
          <button class="btn-sm" type="button" data-action="openRptStudent" data-i="${i}">리포트 →</button>
        </span>
      </div>`;
    }).join("")}
  `;
}

/* ----- 반 전환 (학원 확장) ----- */
function handleSwitchClass(org, label) {
  if (window.SHELL && window.SHELL.switchClass) window.SHELL.switchClass(org, label);
  const el = document.getElementById("classPickerModal");
  if (el) el.style.display = "none";
  /* 모드는 shell이 sessionStorage에 영속화함 — 학교/원장 모두 홈(classroom_home)으로 이동(원장은 상단 학원 블록 노출) */
  window.location.href = PAGE_URLS.class;
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
  /* 아침게시판은 학교 전용 — 학원이면 칩 숨김 + 할 일 카운트에서 제외 */
  const school = isSchoolOrg();
  if ($("#briefMorning")) $("#briefMorning").hidden = !school;
  if (school) set("#briefMorning", !posted, mi("wb_sunny") + "아침게시판 미게시", mi("wb_sunny") + "아침게시판 게시 완료");
  set("#briefStudents", incomplete > 0, mi("school") + `학습 미완료 <b>${incomplete}명</b>`, mi("school") + "학습 모두 완료");
  set("#briefApprove", waits > 0, mi("storefront") + `승인 대기 <b>${waits}건</b>`, mi("storefront") + "승인 대기 없음");
  /* urgent 상태: 처리할 항목 있을 때 amber 점 pulse + 왼쪽 강조선 */
  if ($("#briefStudents")) $("#briefStudents").classList.toggle("urgent", incomplete > 0);
  if ($("#briefApprove"))  $("#briefApprove").classList.toggle("urgent", waits > 0);
  const cnt = (school && !posted ? 1 : 0) + (incomplete ? 1 : 0) + (waits ? 1 : 0);
  if ($("#briefTitle")) $("#briefTitle").textContent = cnt ? `오늘 할 일 ${cnt}개` : "오늘 할 일 완료";
  /* 로드 시 처리 항목 있으면 해당 패널 자동 펼침 */
  if (incomplete > 0) {
    const ex = $("#briefExpand");
    if (ex && ex.hidden) { ex.hidden = false; renderBriefExpand(false); }
  }
  if (waits > 0) {
    const ax = $("#briefApproveExpand");
    if (ax && ax.hidden) { ax.hidden = false; renderApprovalStrip(); }
  }
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
  /* 해당 탭 패널이 이 페이지에 없으면 기본 탭으로 폴백 (딥링크/구버전 해시 안전) */
  if (!document.querySelector('.cd-ltab-pane[data-lpane="' + name + '"]')) name = "today";
  currentLTab = name;
  document.querySelectorAll("#learningTabs button").forEach((b) => b.classList.toggle("active", b.dataset.ltab === name));
  document.querySelectorAll(".cd-ltab-pane").forEach((p) => p.classList.toggle("active", p.dataset.lpane === name));
  if (name === "today") renderToday();
  if (name === "weekly") renderClassWeekly();
  if (name === "monthly") renderMonthly();
  if (name === "report") renderPraiseWeek();
}

/* 반 전체 주간 학습 집계 (세븐닷 주간 보고서 롤업) */
function renderClassWeekly() {
  if (!$("#cwHeatmap")) return;
  const dow = ["월", "화", "수", "목", "금", "토", "일"];
  const set = (id, v) => { if ($(id)) $(id).textContent = v; };
  const rows = students.map((s, i) => {
    const daily = studentDailyStatus(i);
    const thisDays = daily.filter((d) => d.status > 0).length;
    const lastDays = Math.floor(_gRand(i * 31 + 999) * 7);
    return { i, s, daily, thisDays, lastDays, dropped: thisDays < lastDays, none: thisDays === 0 };
  });
  const participated = rows.filter((r) => r.thisDays > 0).length;
  const noneCount = rows.filter((r) => r.none).length;
  const droppedRows = rows.filter((r) => r.dropped);
  let sum = 0;
  const subjAvg = GROWTH_SUBJECTS.map((_, si) => {
    let s = 0;
    students.forEach((_, i) => { const p = studentSubjectProgress(i, si).pct; s += p; sum += p; });
    return { subject: GROWTH_SUBJECTS[si], avg: Math.round(s / students.length) };
  });
  const avgProgress = Math.round(sum / (students.length * GROWTH_SUBJECTS.length));

  set("#cwParticipated", participated + "/" + students.length + "명");
  set("#cwNone", noneCount + "명");
  set("#cwAvgProgress", avgProgress + "%");
  set("#cwDropped", droppedRows.length + "명");

  const ico = (st) => micon(st === 2 ? "check_circle" : st === 1 ? "change_history" : "close");
  const head = `<div class="cw-hm-row cw-hm-head"><span class="cw-hm-name">학생</span>${dow.map((d) => `<span class="cw-hm-cell">${d}</span>`).join("")}<span class="cw-hm-sum">학습일</span></div>`;
  const body = rows.map((r) => `<div class="cw-hm-row${r.none ? " none" : ""}">
    <button type="button" class="cw-hm-name link" data-action="weeklyStudent" data-i="${r.i}"><span class="cd-stu-no c${r.i % 6}">${r.i + 1}</span>${r.s.name}</button>
    ${r.daily.map((d) => `<span class="cw-hm-cell s${d.status}">${ico(d.status)}</span>`).join("")}
    <span class="cw-hm-sum"><b>${r.thisDays}</b>일${r.dropped ? ` <span class="material-symbols-outlined cw-drop">arrow_downward</span>` : ""}</span>
  </div>`).join("");
  $("#cwHeatmap").innerHTML = head + body;

  $("#cwSubjects").innerHTML = subjAvg.map((sa) => `<div class="cw-subj-row">
    <span class="cw-subj-name">${sa.subject}</span>
    <span class="cw-subj-track"><span class="cw-subj-fill" style="width:${Math.max(2, sa.avg)}%"></span></span>
    <span class="cw-subj-pct">${sa.avg}%</span>
  </div>`).join("");

  const care = rows.filter((r) => r.none || r.dropped);
  $("#cwCare").innerHTML = care.length
    ? care.map((r) => `<button type="button" class="cd-stu-chip" data-action="weeklyStudent" data-i="${r.i}"><span class="cd-stu-no c${r.i % 6}">${r.i + 1}</span>${r.s.name} <span class="cd-desc">${r.none ? "미학습" : "하락"}</span></button>`).join("")
    : '<div class="cd-desc">이번 주 주의 학생이 없어요.</div>';
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
  agroup: "classroom_group.html",
  astudent: "academy_student.html",
  ateacher: "academy_teacher.html",
  alevel: "academy_level.html",
  areport: "academy_report.html",
  abilling: "academy_billing.html",
  anotice: "academy_notice.html",
  learning: "classroom_learning.html",
  history: "classroom_history.html",
  classmgmt: "classroom_manage.html",
  students: "classroom_students.html",
  brick: "classroom_brick.html",
  market: "classroom_market.html",
  praiserule: "classroom_praiserule.html",
  goal: "classroom_goal.html",
  board: "classroom_board.html",
  content: "classroom_content.html",
  worksheet: "classroom_worksheet.html",
  learnreport: "classroom_learnreport.html",
  diagnosis: "classroom_diagnosis.html",
  faq: "classroom_faq.html",
  settings: "classroom_settings.html",
  asub: "classroom_subscription.html",
  adep: "classroom_deposit.html",
  ashop: "classroom_itemshop.html",
  apay: "classroom_payment_history.html",
  agate: "classroom_payment_gate.html",
};
const CURRENT_PAGE = document.body.dataset.page || "class";

const VIEW_TITLES = {
  class: "반 홈",
  agroup: "그룹(반) 관리",
  astudent: "학생 관리",
  ateacher: "선생님 관리",
  alevel: "콘텐츠·레벨",
  areport: "보고서·알림",
  abilling: "결제·구독",
  anotice: "공지·문의",
  classmgmt: "반 관리",
  students: "학생",
  brick: "포인트",
  market: "포인트장터",
  praiserule: "칭찬 사유",
  goal: "우리 반 공동목표",
  report: "주간리포트",
  board: "게시판",
  content: "세븐닷 콘텐츠",
  worksheet: "워크시트",
  learnreport: "학습 보고서",
  diagnosis: "진단 보고서",
  history: "활동 이력",
  learning: "학습 현황",
  faq: "FAQ",
  settings: "설정",
  asub: "구독 관리",
  adep: "적립금",
  ashop: "아이템 샵",
  apay: "결제 내역",
  agate: "첫 결제",
};

function setView(name, opts) {
  /* 아침게시판은 학교 전용 — 학원 계정이면 홈으로 폴백 */
  if (name === "board" && !isSchoolOrg()) name = "class";
  /* 다른 페이지의 메뉴면 해당 HTML로 이동 */
  if (name !== CURRENT_PAGE && PAGE_URLS[name]) {
    /* 일부 정적 서버가 clean-URL 리다이렉트로 쿼리를 제거하므로 sessionStorage에도 보관 */
    if (opts && opts.ltab) {
      try { sessionStorage.setItem("cd_ltab", opts.ltab); } catch (e) {}
    }
    let url = PAGE_URLS[name];
    if (opts && opts.ltab) url += "?ltab=" + opts.ltab;
    if (opts && opts.mtab) url += "#mtab=" + opts.mtab;
    window.location.href = url;
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
  if (name === "class") {
    const blk = $("#academyHomeBlock");
    if (blk) { blk.hidden = !isPrincipal(); if (isPrincipal()) renderAcademyDashboard(); }
  }
  if (name === "agroup") renderAcademyGroups();
  if (name === "content") renderContentRounds();
  if (name === "worksheet") renderWorksheets();
  if (name === "learnreport") renderLearnReports();
  if (name === "diagnosis") renderDiagnosis();
  if (name === "students") renderRoster();
  if (name === "classmgmt") { renderPraiseWeek(); renderReportCare(); renderPraiseRank(); renderManageStudentList(); }
  if (name === "praiserule") renderPraiseReasonList();
  if (name === "learning") setLearningTab(currentLTab);
  if (name === "faq") renderFaq();
  updateAll();
}

/* ----- 학생 카드 ----- */
let studentSortMode = "number"; // "number" | "seating" | "class"(기관 관리자 전용)
let selectedClass = null; // 기관 관리자 반 필터: null=전체, 문자열=반 이름

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
  const num = s.classNum ?? i + 1;
  const sel = selBulk.has(i) ? "sel" : "";
  const chk = selBulk.has(i) ? "checked" : "";

  // 학습 완료 여부 — 오늘 브릭 적립 내역이 있으면 완료
  const todayBricks = ledger.filter(r => r.student === s.name && r.time.includes("오늘") && r.type === "적립");
  const learned = todayBricks.length > 0;

  // 오늘 획득 브릭 — 과목별 뱃지
  const TIER_ORDER = ["골드", "실버", "브론즈"];
  const TIER_CLS   = { "골드": "subj-gold", "실버": "subj-silver", "브론즈": "subj-bronze" };
  const TIER_IMG   = {
    "골드": "https://app.7bricks.co.kr/image/web/learning_record_gold.svg",
    "실버": "https://app.7bricks.co.kr/image/web/learning_record_silver.svg",
    "브론즈": "https://app.7bricks.co.kr/image/web/learning_record_bronze.svg",
  };
  const todayEarns = ledger.filter(r => r.student === s.name && r.time.includes("오늘") && r.type === "적립");
  let brickMap;
  if (todayEarns.length) {
    const bySubject = {};
    todayEarns.forEach(r => {
      const key = r.subject || "기타";
      if (!bySubject[key]) bySubject[key] = { tier: r.tier || "브론즈", amount: 0, reasons: [] };
      bySubject[key].amount += r.amount;
      bySubject[key].reasons.push(r.reason);
      if (TIER_ORDER.indexOf(r.tier) < TIER_ORDER.indexOf(bySubject[key].tier)) {
        bySubject[key].tier = r.tier;
      }
    });
    brickMap = Object.entries(bySubject).map(([subj, info]) => {
      const cls = TIER_CLS[info.tier] || "subj-bronze";
      const imgSrc = TIER_IMG[info.tier];
      const icon = imgSrc
        ? `<img class="subj-brick-img" src="${imgSrc}" alt="${info.tier}" />`
        : "";
      return `<span class="badge ${cls} cd-sc-badge" title="${info.reasons.join(' / ')}">${icon}${subj}</span>`;
    }).join("");
  } else {
    brickMap = '<span class="cd-sc-brick-empty">학습 미완료</span>';
  }

  // 칭찬/포인트 랭킹 뱃지
  const pr = _topRanks.praise[i];
  const br = _topRanks.brick[i];
  const ICO = (name) => `<span class="material-symbols-outlined cd-badge-ico">${name}</span>`;

  // 하단 뱃지 — 랭킹 + 스트릭 통합
  const rankPills = [
    pr ? `<span class="cd-sc-rank-pill rp${pr}" title="칭찬 ${pr}위">${ICO("emoji_events")}${pr}위</span>` : "",
    br ? `<span class="cd-sc-rank-pill rb${br}" title="포인트 ${br}위">${ICO("workspace_premium")}${br}위</span>` : "",
  ].join("");
  const streakTag = (s.tag || "").includes("연속")
    ? `<span class="cd-sc-rank-pill rs" title="${s.tag}">${ICO("local_fire_department")}${s.tag}</span>` : "";
  const allBadges = rankPills + streakTag;

  const allBadgesWithPraise = allBadges;

  return `<article class="cd-student${sel ? " sel" : ""}${learned ? " done" : ""}" data-i="${i}">
    <div class="cd-sc-top">
      <span class="cd-sc-num">${num}</span>
      <input type="checkbox" class="cd-stu-check" data-i="${i}" ${chk} title="선택" />
    </div>
    <div class="cd-sc-name">${s.name}</div>
    <div class="cd-sc-brickmap">${brickMap}</div>
    ${allBadgesWithPraise ? `<div class="cd-sc-tags">${allBadgesWithPraise}</div>` : ""}
    <div class="cd-sc-pts">${s.points.toLocaleString()}<small class="cd-sc-pts-unit">p</small></div>
  </article>`;
}

/* 포인트장터 승인 대기 — '오늘 할 일' 칩(briefApprove) 인라인 펼침에 렌더 */
function renderApprovalStrip() {
  const el = document.getElementById("briefApproveList");
  if (!el) return;
  const waits = couponRequests.filter(r => r.status === "승인 대기");
  el.innerHTML = waits.length
    ? waits.map(r => {
        const ri = couponRequests.findIndex(x => x === r);
        return `<div class="cd-approve-row">
          <div class="cd-approve-info"><b>${r.student}</b><span class="cd-desc">${r.coupon} · ${r.price}p · ${r.time}</span></div>
          <div class="cd-approve-btns">
            <button class="btn-sm approve" type="button" data-action="approveCoupon" data-i="${ri}">승인</button>
            <button class="btn-sm reject" type="button" data-action="promptReject" data-i="${ri}">반려</button>
          </div>
        </div>`;
      }).join("")
    : '<span class="cd-desc">승인 대기 중인 신청이 없습니다.</span>';
}

/* 기관 관리자 학생 카드: studentCard와 동일한 ledger 기반 과목 뱃지 */
function studentCardRO(s, mgIdx) {
  const sel = selBulkMgr.has(mgIdx);
  const TIER_ORDER = ["골드", "실버", "브론즈"];
  const TIER_CLS   = { "골드": "subj-gold", "실버": "subj-silver", "브론즈": "subj-bronze" };
  const TIER_IMG   = {
    "골드": "https://app.7bricks.co.kr/image/web/learning_record_gold.svg",
    "실버": "https://app.7bricks.co.kr/image/web/learning_record_silver.svg",
    "브론즈": "https://app.7bricks.co.kr/image/web/learning_record_bronze.svg",
  };
  const todayEarns = ledger.filter(function (r) {
    return r.student === s.name && r.time.includes("오늘") && r.type === "적립" && r.pointType !== "praise";
  });
  let brickMap;
  if (todayEarns.length) {
    const bySubject = {};
    todayEarns.forEach(function (r) {
      const key = r.subject || "기타";
      if (!bySubject[key]) bySubject[key] = { tier: r.tier || "브론즈", amount: 0, reasons: [] };
      bySubject[key].amount += r.amount;
      bySubject[key].reasons.push(r.reason);
      if (r.tier && TIER_ORDER.indexOf(r.tier) < TIER_ORDER.indexOf(bySubject[key].tier)) {
        bySubject[key].tier = r.tier;
      }
    });
    brickMap = Object.entries(bySubject).map(function ([subj, info]) {
      const cls = TIER_CLS[info.tier] || "subj-bronze";
      const imgSrc = TIER_IMG[info.tier];
      const icon = imgSrc ? '<img class="subj-brick-img" src="' + imgSrc + '" alt="' + info.tier + '" />' : "";
      return '<span class="badge ' + cls + ' cd-sc-badge" title="' + info.reasons.join(" / ") + '">' + icon + subj + '</span>';
    }).join("");
  } else {
    brickMap = '<span class="cd-sc-brick-empty">학습 미완료</span>';
  }

  const tag = (s.tag || "").includes("연속")
    ? '<span class="cd-sc-rank-pill rs"><span class="material-symbols-outlined cd-badge-ico">local_fire_department</span>' + s.tag + '</span>'
    : "";
  const allBadges = tag;


  return '<article class="cd-student cd-student-ro' + (todayEarns.length ? " done" : "") + (sel ? " sel" : "") + '" data-mgidx="' + mgIdx + '" data-i="' + mgIdx + '">' +
    '<div class="cd-sc-top">' +
      '<span class="cd-sc-num">' + s.classNum + '</span>' +
      (mgIdx != null ? '<input type="checkbox" class="cd-stu-check" data-mgidx="' + mgIdx + '"' + (sel ? ' checked' : '') + ' title="선택" />' : '') +
    '</div>' +
    '<div class="cd-sc-name">' + s.name + '</div>' +
    '<div class="cd-sc-brickmap">' + brickMap + '</div>' +
    (allBadges ? '<div class="cd-sc-tags">' + allBadges + '</div>' : '') +
    '<div class="cd-sc-pts">' + s.points.toLocaleString() + '<small class="cd-sc-pts-unit">p</small></div>' +
    '</article>';
}

/* 정렬 토글: 기관 관리자 → "반별" 단일, 반 선생님 → "번호순/자리순" */
function renderSortToggle() {
  const wrap = $(".cd-sort-toggle");
  if (!wrap) return;
  if (isInstitutionManager()) {
    studentSortMode = "class";
    const allStu = isPrincipal() ? academyStudents : students;
    const classes = [...new Set(allStu.map((s) => s.cls || "미배정"))];
    wrap.innerHTML =
      '<select id="classSelectorMgr">' +
      '<option value="">전체 반</option>' +
      classes.map((c) => '<option value="' + c + '"' + (selectedClass === c ? ' selected' : '') + '>' + c + '</option>').join("") +
      '</select>';
  } else {
    if (studentSortMode === "class") studentSortMode = "number";
    wrap.innerHTML =
      '<button class="' + (studentSortMode === "number" ? "active" : "") + '" type="button" data-sortmode="number">번호순</button>' +
      '<button class="' + (studentSortMode === "seating" ? "active" : "") + '" type="button" data-sortmode="seating">자리순</button>';
  }
}

function renderStudents() {
  const q = searchQuery.trim().toLowerCase();
  computeTopRanks();
  renderApprovalStrip();
  renderSortToggle();
  /* 자리배치도 순으로 볼 때만 배치 변경 링크 노출 */
  if ($("#seatEditLink")) $("#seatEditLink").hidden = studentSortMode !== "seating";
  if ($("#studentCount")) $("#studentCount").innerHTML = '전체 <b class="text-green">' + students.length + "</b>명";
  if ($("#cmStudentTotal")) $("#cmStudentTotal").innerHTML = students.length + '<span class="unit">명</span>';
  const container = $("#students");
  if (!container) return;

  const addCard = isInstitutionManager() ? '' : '<button class="cd-student-add" type="button" data-action="openStudent"><div class="add-ico"><span class="material-symbols-outlined">add</span></div>학생 추가</button>';
  if (studentSortMode === "seating" && !isInstitutionManager()) {
    if (!seatMap.length && !loadSavedSeatMap()) initSeatMap();
    container.style.gridTemplateColumns = `repeat(${seatCols}, 1fr)`;
    container.innerHTML = seatMap.map((si) => {
      if (si === null || si >= students.length) return '<div class="cd-student-empty">·</div>';
      const s = students[si];
      if (q && !s.name.includes(q)) return '<div class="cd-student-empty">·</div>';
      return studentCard(s, si);
    }).join("") + addCard;
  } else if (isInstitutionManager()) {
    /* 기관 관리자(학원장·학교 담당선생님): 전체 학생을 소속 반(cls) 기준으로 그룹핑 */
    container.style.gridTemplateColumns = "";
    const allStu = isPrincipal() ? academyStudents : students; // 학원=전용 48명 셋, 학교=기존 students
    const groups = new Map();
    // matched엔 필터된 학생만 있으므로 원본 배열 인덱스(mgIdx)를 별도 보존
    allStu.forEach((s, mgIdx) => {
      if ((q && !s.name.includes(q)) || (selectedClass !== null && (s.cls || "미배정") !== selectedClass)) return;
      const c = s.cls || "미배정";
      if (!groups.has(c)) groups.set(c, []);
      groups.get(c).push({ s, mgIdx });
    });
    let html = "";
    groups.forEach((arr, c) => {
      const groupDone = arr.filter(function(item) { return item.s.done; }).length;
      const groupPct = arr.length ? Math.round(groupDone / arr.length * 100) : 0;
      const groupBadgeCls = groupPct >= 80 ? 'success' : groupPct >= 50 ? 'warning' : 'neutral';
      html += '<div class="cd-stu-group-head"><span class="material-symbols-outlined">groups</span>' + c + ' <span class="cd-desc">' + arr.length + '명</span><span class="badge ' + groupBadgeCls + '" style="margin-left:8px;font-size:12px">완료율 ' + groupPct + '%</span></div>';
      html += arr.map(({ s, mgIdx }) => studentCardRO(s, mgIdx)).join("");
    });
    container.innerHTML = html || '<div class="cd-desc" style="grid-column:1/-1;padding:8px 4px">검색 결과가 없습니다.</div>';
    const shownCount = [...groups.values()].reduce((acc, arr) => acc + arr.length, 0);
    const total = isPrincipal() ? academyStudents.length : students.length;
    if ($("#studentCount")) $("#studentCount").innerHTML = (selectedClass ? '<b class="text-green">' + shownCount + '</b>명' : '전체 <b class="text-green">' + total + '</b>명');
    /* select 동기화: renderSortToggle 이후 렌더된 select에 이벤트 연결 */
    var sel = document.getElementById("classSelectorMgr");
    if (sel && !sel._bound) {
      sel._bound = true;
      sel.addEventListener("change", function() {
        selectedClass = this.value || null;
        selBulkMgr.clear();
        renderStudents();
      });
    }
  } else {
    container.style.gridTemplateColumns = "";
    const list = students.map((s, i) => ({ s, i })).filter(({ s }) => !q || s.name.includes(q));
    container.innerHTML = list.length
      ? list.map(({ s, i }) => studentCard(s, i)).join("") + addCard
      : addCard;
  }
  renderGoalBanner();
}

/* 학생 명단 테이블 — 행 클릭 → 상세 패널, 수정 → 계정정보 탭 */
function rosterSource() {
  return CURRENT_PAGE === "astudent" ? academyStudents : students;
}
function activeStudentSource() {
  return isPrincipal() ? academyStudents : students;
}
function renderRoster() {
  if (!$("#rosterRows")) return;
  const src = rosterSource();
  const isAcademy = CURRENT_PAGE === "astudent";
  const q = ($("#rosterSearch")?.value || "").trim();

  /* astudent 전용 필터 */
  const clsFlt = $("#astuClsFilter")?.value || "";
  const stsFlt = $("#astuStatusFilter")?.value || "";

  const list = src.map((s, i) => ({ s, i })).filter(({ s }) => {
    if (q && !s.name.includes(q) && !(s.loginId || s.email || "").includes(q)) return false;
    if (isAcademy && clsFlt && s.cls !== clsFlt) return false;
    if (isAcademy && stsFlt && s.status !== stsFlt) return false;
    return true;
  });

  const colSpan = isAcademy ? "10" : "9";
  $("#rosterRows").innerHTML = list.length
    ? list
        .map(({ s, i }) => {
          const lvRaw = s.level || "-";
          const lvMaj = parseInt(lvRaw);
          const lvCls = isNaN(lvMaj) ? "neutral" : lvMaj >= 5 ? "success" : lvMaj >= 3 ? "info" : "neutral";
          const statusVal = s.studentStatus || s.status || "정상이용";
          const stCls = statusVal === "일시정지" || statusVal === "이용중지" ? "warning"
            : statusVal === "탈퇴" ? "neutral"
            : statusVal === "진단 대기" ? "warning"
            : statusVal === "배정 대기" ? "info"
            : "success";
          const payCell = isAcademy
            ? `<td class="center"><button class="btn-sm" type="button" data-action="openStudentPay" data-i="${i}">내역</button></td>`
            : "";
          return `<tr class="cd-roster-link" data-rowi="${i}" title="${s.name} 상세 보기">
            <td class="center muted">${s.classNum ?? i + 1}</td>
            <td><b>${s.name}</b></td>
            <td class="muted" style="font-size:14px">${s.loginId || s.email || "-"}</td>
            <td class="center">${s.grade || "-"}</td>
            <td class="center"><span class="badge ${lvCls}">${lvRaw}</span></td>
            <td class="center" style="font-size:14px">${s.lastLogin || "-"}</td>
            <td class="center"><span class="badge ${stCls}">${statusVal}</span></td>
            <td class="right money">${(s.points || 0).toLocaleString()}p</td>
            ${payCell}
            <td class="right cd-roster-actions">
              <button class="btn-sm" type="button" data-action="editStudentAccount" data-i="${i}">수정</button>
              <button class="btn-sm reject" type="button" data-action="deleteStudent" data-i="${i}">삭제</button>
            </td>
          </tr>`;
        })
        .join("")
    : `<tr><td colspan="${colSpan}" class="center muted empty-cell">학생이 없습니다.</td></tr>`;
  if ($("#rosterCount")) $("#rosterCount").textContent = src.length;

  /* astudent 반 필터 옵션 동적 채우기 */
  if (isAcademy) {
    const sel = $("#astuClsFilter");
    if (sel && sel.options.length <= 1) {
      const cls = [...new Set(src.map(s => s.cls).filter(Boolean))].sort();
      cls.forEach(c => { const o = document.createElement("option"); o.textContent = c; sel.appendChild(o); });
    }
  }
}
function openStudentNew() {
  if (!$("#studentModalTitle")) return; /* 학생 모달이 없는 페이지(예: 학생 상세 standalone)에서는 무시 */
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
  if (!$("#studentModalTitle")) return; /* 학생 모달이 없는 페이지에서는 무시 */
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
  if ($("#goalDonut")) $("#goalDonut").style.setProperty("--pct", pct + "%"); /* #goalDonut 한정 — #donutToday 미접촉 */
  document.querySelectorAll(".cd-goal-left").forEach((e) => (e.textContent = `목표까지 ${left} 포인트 남음`));
  document.querySelectorAll(".classGoalPct").forEach((e) => (e.textContent = pct + "%"));
  document.querySelectorAll(".classGoalText").forEach((e) => (e.textContent = "목표까지 " + left + "포인트 남음"));
  document.querySelectorAll(".couponWait").forEach((e) => (e.textContent = couponRequests.filter((r) => r.status === "승인 대기").length + "건"));
  document.querySelectorAll(".goalNow").forEach((e) => (e.textContent = current.toLocaleString()));
  document.querySelectorAll(".kpiGoalTarget").forEach((e) => (e.textContent = target.toLocaleString()));
  if ($("#goalCurrent")) $("#goalCurrent").value = current;
  if ($("#goalPreview")) $("#goalPreview").textContent = `${$("#goalTitle").value} · ${pct}% 달성 · 목표까지 ${left} 포인트 남았어요!`;
  renderStudents();
  renderBank();
  renderBrickRank();
  renderGoalContribRank();
  renderGoalPage();
  renderManageStudentList();
  renderHomeOps();
  renderManageIncomplete();
  renderEconStats();
}

/* ----- 학급 경제 현황 ----- */
function renderEconStats() {
  const earnedSet = new Set(
    ledger.filter(r => r.time.includes("오늘") && r.type === "적립").map(r => r.student)
  );
  const total = students.length;
  const earnedCount = students.filter(s => earnedSet.has(s.name)).length;
  const notEarned = total - earnedCount;
  const pct = total ? Math.round(earnedCount / total * 100) : 0;

  // ① 도넛 차트
  const donutEl = $("#econParticipation");
  if (donutEl) {
    const r = 36, circ = +(2 * Math.PI * r).toFixed(1);
    const dash = +(pct / 100 * circ).toFixed(1);
    donutEl.innerHTML = `
      <div class="cd-econ-donut-wrap">
        <svg class="cd-econ-donut-svg" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="${r}" fill="none" stroke="#e6e8eb" stroke-width="10"/>
          <circle cx="50" cy="50" r="${r}" fill="none" stroke="#009d5b" stroke-width="10"
            stroke-dasharray="${dash} ${circ}" stroke-linecap="round"
            transform="rotate(-90 50 50)"/>
          <text x="50" y="47" text-anchor="middle" font-size="15" font-weight="800" fill="#191F28">${pct}%</text>
          <text x="50" y="58" text-anchor="middle" font-size="6.5" fill="#8B95A1">참여율</text>
        </svg>
        <div class="cd-econ-donut-legend">
          <div class="cd-econ-legend-item"><span class="cd-econ-legend-dot" style="background:#009d5b"></span>획득 완료<b>${earnedCount}명</b></div>
          <div class="cd-econ-legend-item"><span class="cd-econ-legend-dot" style="background:#e6e8eb"></span>미획득<b>${notEarned}명</b></div>
        </div>
      </div>`;
  }

  // ② 경제 활동 분류
  const actEl = $("#econActivity");
  if (actEl) {
    const groups = [
      { label: "활발", desc: "10p 이상", color: "#009d5b", count: 0 },
      { label: "보통", desc: "1~9p", color: "#F59E0B", count: 0 },
      { label: "비활성", desc: "0p", color: "#C4CAD2", count: 0 },
    ];
    students.forEach(s => {
      const earned = ledger.filter(r => r.student === s.name && r.type === "적립").reduce((a, r) => a + r.amount, 0);
      if (earned >= 10) groups[0].count++;
      else if (earned > 0) groups[1].count++;
      else groups[2].count++;
    });
    actEl.innerHTML = groups.map(g => `
      <div class="cd-econ-act-row">
        <div class="cd-econ-act-left">
          <span class="cd-econ-act-dot" style="background:${g.color}"></span>
          <span class="cd-econ-act-name">${g.label}</span>
          <span class="cd-desc">${g.desc}</span>
        </div>
        <div class="cd-econ-act-bar-track">
          <div class="cd-econ-act-bar-fill" style="width:${total ? Math.round(g.count/total*100) : 0}%;background:${g.color}"></div>
        </div>
        <span class="cd-econ-act-cnt"><b>${g.count}</b>명</span>
      </div>`).join("");
  }

}

/* ----- 반 관리 홈: 학생 현황 전체 목록 ----- */
let manageSortMode = "num";
function renderManageStudentList() {
  const el = $("#manageStudentList");
  if (!el) return;
  document.querySelectorAll("#manageSortTabs [data-mgsort]").forEach(b =>
    b.classList.toggle("active", b.dataset.mgsort === manageSortMode));

  const earnedSet = new Set(ledger.filter(r => r.time.includes("오늘") && r.type === "적립").map(r => r.student));
  const classTotal = students.reduce((a, s) => a + s.points, 0);

  let list = students.map((s, i) => ({
    i, s,
    learned: earnedSet.has(s.name),
    pct: classTotal ? Math.round(s.points / classTotal * 100) : 0,
  }));

  if (manageSortMode === "pts") {
    list.sort((a, b) => b.s.points - a.s.points);
  } else if (manageSortMode === "learning") {
    list.sort((a, b) => (b.learned ? 1 : 0) - (a.learned ? 1 : 0) || b.s.points - a.s.points);
  } else {
    list.sort((a, b) => (a.s.classNum ?? a.i + 1) - (b.s.classNum ?? b.i + 1));
  }

  el.innerHTML = list.map(({ s, i, learned, pct }, rank) =>
    `<div class="cd-msl-row cd-stu-chip" data-i="${i}">
      <span class="cd-msl-num">${s.classNum ?? i + 1}</span>
      <span class="cd-msl-name">${s.name}</span>
      <span class="badge ${learned ? "success" : "neutral"}" style="font-size:13px">${learned ? "학습완료" : "미완료"}</span>
      <span class="cd-msl-pts">${s.points.toLocaleString()}p</span>
      <span class="cd-msl-pct">${pct}%</span>
    </div>`
  ).join("");
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
  { title: "오늘의 수업 안내", date: "오늘 09:30", target: "전체 학생 12명", schedule: ["국어", "수학", "과학", "미술", "", ""], ready: "국어 공책, 수학 익힘책, 색연필 준비", morning: "세븐닷 학습 완료 후 독서 10분 하기", notice: "오늘은 미술 준비물을 꼭 챙겨 주세요." },
  { title: "주간 준비물 안내", date: "어제 16:20", target: "전체 학생 12명", schedule: ["국어", "수학", "체육", "음악", "", ""], ready: "색연필, 풀, 수학 익힘책 준비", morning: "아침 독서 10분 하기", notice: "준비물을 미리 챙겨 주세요." },
  { title: "아침활동 공지", date: "5/20", target: "전체 학생 12명", schedule: ["국어", "수학", "통합", "창체", "", ""], ready: "독서록 준비", morning: "세븐닷 학습 완료 후 독서 10분", notice: "아침활동 약속을 잘 지켜요." },
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

function renderBoardLiveCard() {
  const card = $("#boardLiveCard");
  const empty = $("#boardEmptyState");
  if (!card && !empty) return;
  const live = morningPosts[0];
  if (!live) {
    if (card) card.hidden = true;
    if (empty) empty.hidden = false;
    return;
  }
  if (card) card.hidden = false;
  if (empty) empty.hidden = true;
  const subj = live.schedule.filter(Boolean).map((s, i) => `<span class="chip">${i + 1}교시 ${s}</span>`).join("") || '<span class="muted">-</span>';
  if ($("#boardLiveTitle")) $("#boardLiveTitle").textContent = live.title;
  if ($("#boardLiveMeta")) $("#boardLiveMeta").textContent = live.date + " · " + live.target;
  if ($("#boardLiveSubj")) $("#boardLiveSubj").innerHTML = subj;
  if ($("#boardLiveReady")) $("#boardLiveReady").textContent = live.ready || "-";
  if ($("#boardLiveMorning")) $("#boardLiveMorning").textContent = live.morning || "-";
  if ($("#boardLiveNotice")) $("#boardLiveNotice").textContent = live.notice || "-";
}

function renderMorningPosts() {
  renderBoardLiveCard();
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
/* 아침 게시판 작성 모달 열기. post 주면 복제·수정용 prefill, 없으면 신규(기본 템플릿) */
function openBoardWrite(post) {
  makeSchedule(); // 모달 시간표 입력칸 (재)생성
  const setF = (f, v) => { const el = document.querySelector(`[data-field="${f}"]`); if (el) el.value = v || ""; };
  if (post) {
    if ($("#boardWriteTitle")) $("#boardWriteTitle").textContent = "아침 게시판 복제·수정";
    if ($("#morningTitle")) $("#morningTitle").value = post.title || "";
    if ($("#morningTarget")) $("#morningTarget").value = (post.target || "").includes("미완료") ? "미완료 학생" : "전체 학생";
    document.querySelectorAll("#schedule .periodInput").forEach((inp, idx) => { inp.value = (post.schedule && post.schedule[idx]) || ""; });
    setF("ready", post.ready); setF("morning", post.morning); setF("notice", post.notice);
  } else {
    if ($("#boardWriteTitle")) $("#boardWriteTitle").textContent = "아침 게시판 작성";
    if ($("#morningTitle")) $("#morningTitle").value = "오늘의 수업 안내";
    if ($("#morningTarget")) $("#morningTarget").value = "전체 학생";
  }
  show("#boardWriteModal");
}
function dupMorning(i) {
  const p = morningPosts[i];
  if (!p) return;
  hide("#morningViewModal");
  openBoardWrite(p);
  toast("이전 게시글을 불러왔어요. 수정 후 게시하세요.");
}

/* ----- 학생 상세 모달 (헤더 고정 + 내부 서브탭) ----- */
function setStudentTab(name) {
  document.querySelectorAll("#sdTabs button").forEach((b) => b.classList.toggle("active", b.dataset.sdtab === name));
  document.querySelectorAll(".cd-sd-pane, .cd-detail-pane").forEach((p) => p.classList.toggle("active", p.dataset.sdpane === name));
  const body = document.querySelector(".cd-sd-panes, .cd-detail-panes");
  if (body) body.scrollTop = 0;
}
function renderSdMonth(base) {
  const CG_SUBJS = [
    { label: "국어", color: "#009d5b" },
    { label: "수학", color: "#4B6EE8" },
    { label: "영어", color: "#F59E0B" },
  ];
  const cgMonthDate = new Date(2026, 5 - sdMonthOffset, 1);
  const cgYear = cgMonthDate.getFullYear();
  const cgMonth = cgMonthDate.getMonth();
  const CG_DAYS = new Date(cgYear, cgMonth + 1, 0).getDate();
  const CG_START_DOW = cgMonthDate.getDay();
  const cgTodayDay = sdMonthOffset === 0 ? 16 : -1;
  const cgWorkDays = Array.from({length: CG_DAYS}, (_, d) => (CG_START_DOW + d) % 7).filter(w => w !== 0 && w !== 6).length;
  const cgStudied = CG_SUBJS.map((_, si) => {
    const set = new Set();
    const count = Math.max(6, 10 + (base % 5) + si - sdMonthOffset * 2);
    for (let d = 0; d < count; d++) set.add(1 + ((d * 2 + base + si * 3) % CG_DAYS));
    return set;
  });
  const allDays = new Set([...cgStudied[0], ...cgStudied[1], ...cgStudied[2]]);
  const monthDays = allDays.size;
  const monthPts  = Math.max(0, monthDays * 5 + (base - sdMonthOffset) * 3);
  const monthRate = Math.min(100, Math.round(monthDays / Math.max(cgWorkDays, 1) * 100));
  if ($("#sdMonthLabel")) $("#sdMonthLabel").textContent = `${cgYear}년 ${cgMonth + 1}월`;
  if ($("#sdMonthSummary")) {
    $("#sdMonthSummary").innerHTML =
      `<div class="cd-ms-card"><div class="cd-ms-v">${monthDays}일</div><div class="cd-ms-k">학습일</div></div>
       <div class="cd-ms-card"><div class="cd-ms-v">+${monthPts}p</div><div class="cd-ms-k">획득 포인트</div></div>
       <div class="cd-ms-card"><div class="cd-ms-v">${monthRate}%</div><div class="cd-ms-k">완료율</div></div>`;
  }
  if ($("#sdMonthCal")) {
    const dayHeads = Array.from({length: CG_DAYS}, (_, d) => {
      const dow = (CG_START_DOW + d) % 7;
      const isWknd = dow === 0 || dow === 6;
      const isToday = d + 1 === cgTodayDay;
      return `<div class="cd-cg-dh${isWknd?" wk":""}${isToday?" today":""}">${d+1}</div>`;
    }).join("");
    const rows = CG_SUBJS.map((subj, si) => {
      const cells = Array.from({length: CG_DAYS}, (_, d) => {
        const day = d + 1;
        const dow = (CG_START_DOW + d) % 7;
        const isWknd = dow === 0 || dow === 6;
        const isToday = day === cgTodayDay;
        const done = !isWknd && cgStudied[si].has(day);
        const extra = (isWknd ? " wk" : "") + (isToday ? " today" : "");
        const style = done ? ` style="background:${subj.color}"` : "";
        return `<div class="cd-cg-cell${extra}"${style}></div>`;
      }).join("");
      return `<div class="cd-cg-row">
        <span class="cd-cg-label" style="color:${subj.color}">${subj.label}</span>
        <div class="cd-cg-cells">${cells}</div>
        <span class="cd-cg-cnt">${cgStudied[si].size}일</span>
      </div>`;
    }).join("");
    $("#sdMonthCal").innerHTML = `<div class="cd-contrib-graph">
      <div class="cd-cg-row cd-cg-row-head">
        <span class="cd-cg-label"></span>
        <div class="cd-cg-cells">${dayHeads}</div>
        <span class="cd-cg-cnt"></span>
      </div>
      ${rows}
    </div>`;
  }
  if ($("#sdMonthSubjChips")) {
    $("#sdMonthSubjChips").innerHTML = CG_SUBJS.map(s =>
      `<div class="cd-month-leg-item"><span class="cd-month-leg-dot" style="background:${s.color}"></span>${s.label}</div>`
    ).join("");
  }
}

/* ===== 학생 월별·과목별 성장 지표 (프로토타입 목 데이터) =====
   원천 6필드(획득브릭/학습시간/문항/정답/오답/복습)를 학생×월×과목 단위로 생성 → 지난달 대비 성장 */
const GROWTH_SUBJECTS = ["국어", "영어", "수학"]; // 국영수
function _gRand(seed) { const x = Math.sin(seed * 99.137) * 10000; return x - Math.floor(x); }
/* 브릭 tier 분해: 골드=정답으로 적립, 실버=오답 복습으로 적립, 브론즈=참여/시도 */
function _brickTiers(correct, reviews, questions) {
  const gold = Math.round(correct / 6);
  const silver = Math.round(reviews / 2);
  const bronze = Math.round(questions / 14);
  return { gold, silver, bronze, bricks: gold + silver + bronze };
}
/* 세븐닷 주간/월간 학습보고서 데이터 계약 (실제 앱 보고서 구조 그대로) */
const SUBJECT_TOTAL = { "국어": 70, "영어": 120, "수학": 70 };  // 레벨 총 회차
const SUBJECT_LEVEL = { "국어": "레벨 1-1", "영어": "A-1", "수학": "레벨 1-1" };
/* 과목별 진도: 누적 완료 회차 / 총 회차 */
function studentSubjectProgress(idx, subjIdx) {
  const subject = GROWTH_SUBJECTS[subjIdx];
  const total = SUBJECT_TOTAL[subject] || 70;
  const completed = 1 + Math.floor(_gRand(idx * 17 + subjIdx * 53 + 700) * (total * 0.55));
  return { subject, level: SUBJECT_LEVEL[subject] || "레벨 1-1", total, completed, remaining: total - completed, pct: Math.round((completed / total) * 100) };
}
/* 전주/전월 비교: 학습일수·학습회차 이번 vs 지난 */
function studentSubjectVs(idx, subjIdx, period) {
  const cap = period === "month" ? 22 : 7;
  const rcap = period === "month" ? 20 : 6;
  const s = idx * 17 + subjIdx * 53 + (period === "month" ? 900 : 800);
  return {
    daysThis: Math.floor(_gRand(s) * cap), daysLast: Math.floor(_gRand(s + 1) * cap),
    roundsThis: Math.floor(_gRand(s + 2) * rcap), roundsLast: Math.floor(_gRand(s + 3) * rcap),
  };
}
/* 이번 주 일별 학습 현황: 0=미학습(✕) 1=STAGE3+(△) 2=STAGE4완료(○) */
function studentDailyStatus(idx) {
  const dow = ["월", "화", "수", "목", "금", "토", "일"];
  return dow.map((d, i) => {
    const r = _gRand(idx * 31 + i * 7 + 600);
    return { date: `6/${8 + i}`, dow: d, status: r < 0.4 ? 0 : r < 0.72 ? 1 : 2 };
  });
}
function studentSubjectMonth(studentIdx, subjIdx, monthSeed) {
  const b = studentIdx * 17 + subjIdx * 53 + monthSeed * 131;
  const questions = 45 + Math.floor(_gRand(b) * 55);
  const accuracy = 0.55 + _gRand(b + 1) * 0.4;
  const correct = Math.round(questions * accuracy);
  const wrong = questions - correct;
  const reviews = Math.round(wrong * (0.35 + _gRand(b + 2) * 0.6));
  const studyTimeMin = 110 + Math.floor(_gRand(b + 3) * 250);
  const t = _brickTiers(correct, reviews, questions);
  return { questions, correct, wrong, reviews, studyTimeMin, gold: t.gold, silver: t.silver, bronze: t.bronze, bricks: t.bricks };
}
function subjectGrowth(studentIdx, subjIdx) {
  const last = studentSubjectMonth(studentIdx, subjIdx, 5);
  const accLast = last.questions ? Math.round((last.correct / last.questions) * 100) : 0;
  const revLast = last.wrong ? Math.round((last.reviews / last.wrong) * 100) : 100;
  /* 이번 달 = 지난 달의 현실적 소폭 변동 (대체로 성장, 일부 정체/하락) */
  const seed = studentIdx * 17 + subjIdx * 53;
  const drift = (k, range) => Math.round((_gRand(seed + k) - 0.32) * range); // 대체로 성장(+) bias
  const accCur = Math.max(45, Math.min(99, accLast + drift(7, 20)));
  const questions = Math.max(25, last.questions + drift(8, 24));
  const correct = Math.round((questions * accCur) / 100);
  const wrong = questions - correct;
  const revCur = Math.max(25, Math.min(100, revLast + drift(9, 26)));
  const reviews = Math.round((wrong * revCur) / 100);
  const studyTimeMin = Math.max(60, last.studyTimeMin + drift(10, 80));
  const t = _brickTiers(correct, reviews, questions);
  const cur = { questions, correct, wrong, reviews, studyTimeMin, gold: t.gold, silver: t.silver, bronze: t.bronze, bricks: t.bricks };
  return {
    subject: GROWTH_SUBJECTS[subjIdx], cur, last,
    accCur, accLast, accDelta: accCur - accLast,
    revCur, revLast, revDelta: revCur - revLast,
    timeDelta: cur.studyTimeMin - last.studyTimeMin,
    brickDelta: cur.bricks - last.bricks,
    goldDelta: cur.gold - last.gold,
  };
}
/* 세븐닷 주간/월간 학습보고서를 교사용으로 렌더 (진도 backbone + 숙련도 레이어) */
function renderSdGrowth(idx) {
  const wrap = $("#sdGrowthSubjects");
  if (!wrap) return;
  const period = reportPeriod; // "week" | "month"
  const isMonth = period === "month";
  const nowLab = isMonth ? "이번달" : "이번주";
  const prevLab = isMonth ? "지난달" : "지난주";
  const dCls = (d) => (d > 0 ? "up" : d < 0 ? "down" : "flat");
  const dTxt = (d, u) => `${d > 0 ? "+" : ""}${d}${u}`;
  const vsTxt = (d, u) => (d === 0 ? `${prevLab} 같음` : `${prevLab} ${d > 0 ? "+" : ""}${d}${u}`);

  const mastery = GROWTH_SUBJECTS.map((_, si) => subjectGrowth(idx, si));
  const daily = studentDailyStatus(idx);

  /* 기간 라벨 */
  if ($("#sdGrowthPeriod")) $("#sdGrowthPeriod").textContent = isMonth ? "6월 · 이번 달" : "6.8 ~ 6.14 · 이번 주";

  /* 하이라이트: 학습 참여 + 가장 성장한 과목 */
  const learnedDays = daily.filter((d) => d.status > 0).length;
  const best = mastery.reduce((a, b) => (b.accDelta > a.accDelta ? b : a));
  const worst = mastery.reduce((a, b) => (b.accDelta < a.accDelta ? b : a));
  const josa = (w) => (((w.charCodeAt(w.length - 1) - 0xac00) % 28) !== 0 ? "은" : "는");
  const periodLabel = isMonth ? "이번 달" : "이번 주";
  let hl = `${periodLabel} <b>${learnedDays}일</b> 학습했어요. <b>${best.subject}</b> 정답률이 ${dTxt(best.accDelta, "%p")}로 가장 성장했어요`;
  hl += worst.accDelta < 0 ? `. <b>${worst.subject}</b>${josa(worst.subject)} ${worst.accDelta}%p라 함께 살펴봐 주세요.` : `.`;
  if ($("#sdGrowthHighlight")) $("#sdGrowthHighlight").innerHTML = hl;

  /* 캘린더 섹션 — 주간: 7일 도트 / 월간: 과목별 정답률 요약 스트립 */
  const dayIco = (st) => micon(st === 2 ? "check_circle" : st === 1 ? "change_history" : "close");
  const calSection = !isMonth
    ? `<div class="cd-wr-week">
        <div class="cd-wr-week-title">이번 주 일별 학습 현황</div>
        <div class="cd-wr-week-grid">
          ${daily.map((d) => `<div class="cd-wr-day"><span class="cd-wr-day-label">${d.date}(${d.dow})</span><span class="cd-wr-day-icon s${d.status}">${dayIco(d.status)}</span></div>`).join("")}
        </div>
        <div class="cd-wr-week-legend">
          <span><span class="cd-wr-lg s2">${micon("check_circle")}</span>STAGE4 완료</span>
          <span><span class="cd-wr-lg s1">${micon("change_history")}</span>STAGE3 이상</span>
          <span><span class="cd-wr-lg s0">${micon("close")}</span>미학습</span>
        </div>
      </div>`
    : `<div class="cd-wr-week">
        <div class="cd-wr-week-title">이번 달 과목별 정답률</div>
        <div class="cd-wr-m-summary">
          ${mastery.map((g) => {
            const cls = dCls(g.accDelta);
            const arrow = g.accDelta > 0 ? "▲" : g.accDelta < 0 ? "▼" : "–";
            return `<div class="cd-wr-ms-item">
              <span class="cd-wr-ms-subj">${g.subject}</span>
              <span class="cd-wr-ms-acc">${g.accCur}%</span>
              <span class="cd-wr-m-delta ${cls}">${arrow} ${Math.abs(g.accDelta)}%p</span>
              <span style="font-size:13px;color:var(--c-muted);margin-left:auto">지난달 ${g.accLast}%</span>
            </div>`;
          }).join("")}
        </div>
      </div>`;

  /* 과목별 카드: 진도율 → 전주/전월 비교 → 숙련도(개선) */
  const cards = GROWTH_SUBJECTS.map((_, si) => {
    const p = studentSubjectProgress(idx, si);
    const v = studentSubjectVs(idx, si, period);
    const g = mastery[si];
    const dayD = v.daysThis - v.daysLast, rndD = v.roundsThis - v.roundsLast;
    const deltaCls = dCls(g.accDelta);
    const deltaArrow = g.accDelta > 0 ? "▲" : g.accDelta < 0 ? "▼" : "–";
    return `<div class="cd-wr-card">
      <div class="cd-wr-head">
        <span class="cd-wr-subj">${p.subject}</span>
        <span class="cd-wr-level">${p.level}</span>
        <span class="cd-wr-pct">진도율 <b>${p.pct}%</b></span>
      </div>
      <div class="cd-wr-bar"><span class="cd-wr-bar-fill" style="width:${Math.max(2, p.pct)}%"></span></div>
      <div class="cd-wr-rounds">완료 <b>${p.completed}</b>회차 · 남은 ${p.remaining}/${p.total}회차</div>
      <div class="cd-wr-vs">
        <div class="cd-wr-vs-item"><span class="cd-wr-vs-k">학습기간</span><span class="cd-wr-vs-v">${nowLab} <b>${v.daysThis}일</b></span><span class="cd-wr-vs-d ${dCls(dayD)}">${vsTxt(dayD, "일")}</span></div>
        <div class="cd-wr-vs-item"><span class="cd-wr-vs-k">학습회차</span><span class="cd-wr-vs-v">${nowLab} <b>${v.roundsThis}회차</b></span><span class="cd-wr-vs-d ${dCls(rndD)}">${vsTxt(rndD, "회차")}</span></div>
      </div>
      <div class="cd-wr-mastery">
        <div class="cd-wr-m-top">
          <span class="cd-wr-m-tag">숙련도</span>
          <span class="cd-wr-m-acc">${g.accCur}%</span>
          <span class="cd-wr-m-delta ${deltaCls}">${deltaArrow} ${Math.abs(g.accDelta)}%p</span>
          <span style="font-size:13px;color:var(--c-muted)">정답률</span>
        </div>
        <div class="cd-wr-m-qa">
          <span class="qa-correct">정답 <b>${g.cur.correct}</b></span>
          <span class="qa-wrong">오답 <b>${g.cur.wrong}</b></span>
        </div>
        <div class="cd-brick-tiers">
          <span class="cd-brick-tier gold">골드 ${g.cur.gold}</span>
          <span class="cd-brick-tier silver">실버 ${g.cur.silver}</span>
          <span class="cd-brick-tier bronze">브론즈 ${g.cur.bronze}</span>
        </div>
      </div>
    </div>`;
  }).join("");

  wrap.innerHTML = calSection + cards;
}

function renderReportPane(idx) {
  const s = students[idx];
  const period = reportPeriod;
  if (!studentReports[idx]) studentReports[idx] = { week: [], month: [] };
  const reports = studentReports[idx][period];

  // 핵심 지표 (mock)
  const earnedPts = ledger.filter(r => r.student === s.name && r.amount > 0).reduce((a, r) => a + r.amount, 0);
  const praiseCount = (idx % 4) + 1;
  if ($("#sdRptDone"))   $("#sdRptDone").textContent   = period === "week" ? ((75 + idx * 3) % 30 + 75) + "%" : ((80 + idx * 2) % 20 + 80) + "%";
  if ($("#sdRptDays"))   $("#sdRptDays").textContent   = period === "week" ? (idx % 3 + 3) + "일" : (idx % 5 + 15) + "일";
  if ($("#sdRptPts"))    $("#sdRptPts").textContent    = (earnedPts || (idx + 1) * 20) + "p";
  if ($("#sdRptPraise")) $("#sdRptPraise").textContent = praiseCount + "회";

  renderSdGrowth(idx);

  // 작성 카운터 + 버튼
  const count = reports.length;
  if ($("#sdRptCount")) $("#sdRptCount").textContent = count + " / 3";
  const addBtn = $("#addReportBtn");
  if (addBtn) addBtn.disabled = count >= 3;

  // 리포트 목록
  const list = $("#sdReportList");
  if (!list) return;
  if (!reports.length) {
    list.innerHTML = '<div class="cd-desc" style="padding:10px 0">아직 작성된 리포트가 없습니다.</div>';
    return;
  }
  list.innerHTML = reports.map((r, ri) => `
    <div class="cd-report-item">
      <div class="cd-rpt-item-head">
        <span class="cd-rpt-num">${ri + 1}회차</span>
        <span class="cd-rpt-date muted">${r.date}</span>
        <span class="badge ${r.mode === "ai" ? "info" : "neutral"}">${r.mode === "ai" ? "AI" : "직접"}</span>
      </div>
      <p class="cd-rpt-text">${r.text}</p>
    </div>`).join("");
}

/* 날짜별 학습 타임라인 렌더 — dayOffset: 0=오늘, -1=어제, ... */
function renderSdTodayCards(base, dayOffset) {
  const REF = new Date(2026, 5, 16); // 2026-06-16 기준
  const d = new Date(REF);
  d.setDate(d.getDate() + dayOffset);
  const mo = d.getMonth() + 1, dd = d.getDate();

  const labelEl = $("#sdDayLabel");
  if (labelEl) {
    labelEl.textContent = dayOffset === 0  ? `오늘 (${mo}/${dd})`
                        : dayOffset === -1 ? `어제 (${mo}/${dd})`
                        : `${mo}/${dd}`;
  }
  const nextBtn = $("#sdDayNextBtn");
  if (nextBtn) nextBtn.disabled = dayOffset >= 0;

  const BRICK_IMG = {
    gold:   "https://app.7bricks.co.kr/image/web/learning_record_gold.svg",
    silver: "https://app.7bricks.co.kr/image/web/learning_record_silver.svg",
    bronze: "https://app.7bricks.co.kr/image/web/learning_record_bronze.svg",
  };
  const SUBJ_COLOR = { "국어": "#009d5b", "수학": "#4B6EE8", "영어": "#F59E0B" };
  const TIERS = ["gold", "silver", "bronze"];
  const seed = base + Math.abs(dayOffset) * 3;
  const noLearning = dayOffset !== 0 && (base + Math.abs(dayOffset)) % 4 === 0;

  const el = $("#sdLearningCards");
  if (!el) return;

  if (noLearning) {
    el.innerHTML = '<div class="cd-tl-empty"><span class="material-symbols-outlined">event_busy</span> 이 날은 학습 기록이 없습니다.</div>';
    return;
  }
  const SESSIONS = [
    { time: ["08:42","08:10","09:05"][seed%3], subj:"수학", level:"2-1", round:9+(seed%4),  dur:[14,17,22][seed%3], tier:TIERS[seed%3],      review:seed%4===0 },
    { time: ["09:15","09:40","10:10"][seed%3], subj:"국어", level:"2-1", round:8+(seed%5),  dur:[11,14,18][seed%3], tier:TIERS[(seed+1)%3],   review:seed%3===1 },
    { time: ["10:03","10:30","11:00"][seed%3], subj:"수학", level:"2-1", round:10+(seed%3), dur:[12,15,19][seed%3], tier:TIERS[(seed+2)%3],   review:true },
    { time: ["11:30","12:05","13:20"][seed%3], subj:"영어", level:"A-1", round:7+(seed%4),  dur:[10,13,16][seed%3], tier:TIERS[(seed+1)%3],   review:seed%5===2 },
  ].filter((_, idx) => idx < 2 + (seed % 3));
  el.innerHTML = `<div class="cd-tl-list">${SESSIONS.map(m => `
    <div class="cd-tl-row">
      <span class="cd-tl-time">${m.time}</span>
      <span class="cd-tl-dot" style="background:${SUBJ_COLOR[m.subj]}"></span>
      <div class="cd-tl-body">
        <div class="cd-tl-line1">
          <span class="cd-tl-subj" style="color:${SUBJ_COLOR[m.subj]}">${m.subj}</span>
          <span class="badge ${m.review?"info":"neutral"}">${m.review?"복습":"신규"}</span>
        </div>
        <div class="cd-tl-line2">
          <span class="cd-tl-meta">레벨 ${m.level} · ${m.round}회차 · ${m.dur}분</span>
          <img src="${BRICK_IMG[m.tier]}" class="cd-tl-brick-img" />
        </div>
      </div>
    </div>`).join("")}</div>`;
}

/* 학원 전용: 학생 상세에 소속 반 + 수강료 결제 내역 (교사 모드면 숨김) */
function renderSdAcademy(i) {
  const box = $("#sdAcademyBox");
  if (!box) return;
  if (!isPrincipal()) { box.hidden = true; return; }
  box.hidden = false;
  const g = (typeof academyGroups !== "undefined" && academyGroups.length) ? academyGroups[i % academyGroups.length] : null;
  if ($("#sdGroup")) $("#sdGroup").textContent = g ? g.name + " · " + g.grade : "미배정";
  if ($("#sdPayments")) {
    $("#sdPayments").innerHTML = ["2026.06", "2026.05", "2026.04"]
      .map((m, k) => `<tr><td>${m}</td><td class="right">76,000원</td><td class="center muted">${m.slice(5)}-0${3 - k > 0 ? 3 - k : 2}</td><td class="center"><span class="badge success">완납</span></td></tr>`)
      .join("");
  }
}
function openStudentDetail(i) {
  selected = i;
  sdMonthOffset = 0;
  sdDayOffset = 0;
  const src = isInstitutionManager() ? activeStudentSource() : rosterSource();
  const s = src[i] || students[i], base = i + 1;

  const todayEarns = ledger.filter(r => r.student === s.name && r.time.includes("오늘") && r.type === "적립");
  const learned = todayEarns.length > 0;
  const weekEarned = ledger.filter(r => r.student === s.name && r.type === "적립").reduce((a, r) => a + r.amount, 0);

  // ── 헤더·히어로 ──
  if ($("#sdTitle")) $("#sdTitle").textContent = `${i + 1} / ${students.length}`;
  const av = $("#sdAvatar"); if (av) av.textContent = s.name[0];
  $("#sdName").textContent = s.name;
  $("#sdBalance").textContent = s.points.toLocaleString();
  if ($("#sdBalanceLg")) $("#sdBalanceLg").textContent = s.points.toLocaleString();
  $("#sdTags").innerHTML =
    `<span class="badge ${learned ? "success" : "neutral"}">${learned ? "오늘 학습 완료" : "오늘 학습 미완료"}</span>` +
    (s.tag ? ` <span class="badge info">${s.tag}</span>` : "");
  if ($("#sdWeekEarned")) $("#sdWeekEarned").textContent = `이번 주 +${weekEarned}p 획득`;

  // ── 학원 전용: 소속 반 + 수강료 결제 내역 ──
  renderSdAcademy(i);

  // ── 공동목표 기여도 ──
  const classTotal = students.reduce((a, st) => a + st.points, 0);
  const contribPct = classTotal ? Math.round(s.points / classTotal * 100) : 0;
  if ($("#sdGoalContrib")) {
    $("#sdGoalContrib").innerHTML =
      `<div class="cd-sd-contrib-label">공동목표 기여도 <b>${contribPct}%</b></div>
       <div class="cd-sd-contrib-track"><div class="cd-sd-contrib-fill" style="width:${contribPct}%"></div></div>
       <div class="cd-sd-contrib-sub">학급 전체 ${classTotal.toLocaleString()}p 중 ${s.points.toLocaleString()}p 기여</div>`;
  }

  // ── 탭1: 오늘 학습 타임라인 ──
  renderSdTodayCards(base, sdDayOffset);

  // ── 탭1: 이번 주 통계 + 요일 도트 ──
  const weekDays = 3 + (base % 3);
  if ($("#sdWeekDays")) $("#sdWeekDays").textContent = weekDays + "일";
  if ($("#sdWeekPts")) $("#sdWeekPts").textContent = (weekEarned || weekDays * 5) + "p";
  if ($("#sdWeekGold")) $("#sdWeekGold").textContent = (base % 4) + 1 + "개";
  if ($("#sdWeekDayBar")) {
    const days = ["월", "화", "수", "목", "금"];
    const ICO_O = 'https://app.7bricks.co.kr/image/web/learning_o.svg';
    const ICO_X = 'https://app.7bricks.co.kr/image/web/learning_x_grey.svg';
    $("#sdWeekDayBar").innerHTML = days.map((d, di) => {
      const cls = di === 1 ? "today" : di < weekDays ? "done" : "skip";
      const src = cls === "skip" ? ICO_X : ICO_O;
      return `<div class="cd-sd-week-day${cls === 'today' ? ' today' : ''}"><span class="wd-label">${d}</span><img class="wd-ico" src="${src}" alt="${cls}" /></div>`;
    }).join("");
  }

  // ── 탭1: 주간 스케줄 표 ──
  if ($("#sdWeekSchedule")) {
    const schSubjs = ["국어", "수학", "영어"];
    const schDays  = ["월", "화", "수", "목", "금"];
    const TIERS = ["골드", "실버", "브론즈"];
    const TIER_BRICK = {
      "골드": "https://app.7bricks.co.kr/image/web/learning_record_gold.svg",
      "실버": "https://app.7bricks.co.kr/image/web/learning_record_silver.svg",
      "브론즈": "https://app.7bricks.co.kr/image/web/learning_record_bronze.svg",
    };
    const headerRow = `<div class="cd-sch-row cd-sch-header">
      <div class="cd-sch-cell cd-sch-subj-col"></div>
      ${schDays.map((d, di) => `<div class="cd-sch-cell cd-sch-day-head${di===1?" today":""}">${d}</div>`).join("")}
    </div>`;
    const bodyRows = schSubjs.map((subj, si) =>
      `<div class="cd-sch-row">
        <div class="cd-sch-cell cd-sch-subj-col"><b>${subj}</b></div>
        ${schDays.map((d, di) => {
          const done = ((base + si + di) % 3) !== 2;
          const tier = TIERS[(base + si * 2 + di) % 3];
          const round = 7 + si + (base % 3) + di;
          return done
            ? `<div class="cd-sch-cell cd-sch-done">
                <img src="${TIER_BRICK[tier]}" class="cd-sch-brick-img" alt="${tier}" />
                <span class="cd-sch-round">${round}회</span>
               </div>`
            : `<div class="cd-sch-cell cd-sch-skip">-</div>`;
        }).join("")}
      </div>`
    ).join("");
    $("#sdWeekSchedule").innerHTML = `<div class="cd-sch-table">${headerRow}${bodyRows}</div>`;
  }

  // ── 이번 달 contribution graph ──
  renderSdMonth(base);

  // ── 탭2: 받은 칭찬 내역 ──
  if ($("#sdPraiseHistory")) {
    const praiseEntries = [
      { icon: "thumb_up",           reason: "성실 참여",       amount: 5, time: "오늘 08:50" },
      { icon: "track_changes",      reason: "오답 다시 풀기",  amount: 3, time: "어제 15:20" },
      { icon: "menu_book",          reason: "수업 집중 칭찬",  amount: 5, time: "어제 09:30" },
      { icon: "handshake",          reason: "친구 도와주기",   amount: 3, time: "3일 전" },
    ].slice(0, (base % 3) + 2);
    $("#sdPraiseHistory").innerHTML = praiseEntries.map(p => `
      <div class="cd-praise-history-row">
        <span class="cd-praise-ico"><span class="material-symbols-outlined">${p.icon}</span></span>
        <div class="cd-praise-hist-info">
          <b>${p.reason}</b>
          <span class="cd-desc">${p.time}</span>
        </div>
        <span class="cd-praise-hist-amt">+${p.amount}p</span>
      </div>`).join("");
  }

  // ── 탭3: 리포트 ──
  reportPeriod = "week";
  if ($("#praiseList")) {
    $("#praiseList").innerHTML = ["성실 참여 · 꾸준히 참여했어요.", "오답 다시 풀기 · 끝까지 다시 도전했어요.", "수업 집중 · 집중하는 모습이 좋았어요."]
      .slice(0, (base % 3) + 1).map(p => `<div class="cd-praise-item">${p}</div>`).join("");
  }
  renderReportPane(i);

  // ── 초기화 ──
  const modal = document.querySelector("#studentDetailModal") || document.querySelector(".cd-detail-panes");
  if (modal) {
    modal.querySelectorAll("[data-period]").forEach(b => b.classList.toggle("active", b.dataset.period === "today"));
    modal.querySelectorAll("[data-period-pane]").forEach(p => p.hidden = p.dataset.periodPane !== "today");
    modal.querySelectorAll("[data-report-period]").forEach(b => b.classList.toggle("active", b.dataset.reportPeriod === "week"));
    modal.querySelectorAll("[data-ledger-filter]").forEach(b => b.classList.toggle("active", b.dataset.ledgerFilter === "all"));
  }

  selectedPraiseReason = 0;
  renderPraiseReasons();
  renderStudentLedger(i);
  renderSdCoupons(i);
  if ($("#quickTargetName")) $("#quickTargetName").textContent = s.name;
  renderStudentAccountPane(i);
  setStudentTab(openStudentDetail._initTab || "learning");
  openStudentDetail._initTab = null;
  const detailModal = document.querySelector("#studentDetailModal");
  if (detailModal && CURRENT_PAGE !== "student-detail") show("#studentDetailModal");
}
function openStudentDetailAccount(i) {
  openStudentDetail._initTab = "account";
  openStudentDetail(i);
  /* show() 이후에도 탭이 유지되도록 한 번 더 적용 */
  setStudentTab("account");
}

/* 계정정보 탭 채우기 */
function renderStudentAccountPane(i) {
  const s = students[i];
  if (!s) return;
  const set = (id, v) => { const el = $("#" + id); if (el) el.value = v || ""; };
  set("acctName",        s.name);
  set("acctClassNum",    s.classNum || "");
  set("acctGrade",       s.grade    || "초4");
  set("acctBirth",       s.birthDate || "");
  set("acctLoginId",     s.loginId  || "");
  set("acctStatus",      s.studentStatus || "정상이용");
  set("acctStart",       s.usageStart || "");
  set("acctEnd",         s.usageEnd   || "2026-12-31");
  set("acctParentName",  s.parentName  || "");
  set("acctParentPhone", s.parentPhone || "");
  set("acctMemo",        s.memo || "");
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
  const PT_CLS = { brick: "success", praise: "info", parent: "neutral" };
  const PT_LABEL = POINT_TYPE_LABEL || { brick: "브릭포인트", praise: "선생님포인트", parent: "칭찬머니" };
  el.innerHTML = studentLedger
    .map((r) => {
      if (r.type === "반려") {
        return `<div class="cd-ledger-row">
          <div class="cd-ledger-info">
            <div class="cd-ledger-tags">
              <span class="badge neutral">반려</span>
            </div>
            <span class="cd-ledger-reason">${r.reason}</span>
            <span class="cd-ledger-time muted">${r.time}</span>
          </div>
          <div class="cd-ledger-right">
            <span class="badge warning">반려됨</span>
          </div>
        </div>`;
      }
      const isIn = r.amount > 0;
      const typeCls = r.type === "사용" ? "warning" : r.type === "공동목표" ? "info" : "success";
      const ptBadge = r.pointType ? `<span class="badge ${PT_CLS[r.pointType] || ''}">${PT_LABEL[r.pointType] || r.pointType}</span>` : "";
      const detail = (r.subject && r.tier) ? `<span class="cd-ledger-detail muted">${r.subject} · ${r.tier}</span>` : (r.subject ? `<span class="cd-ledger-detail muted">${r.subject}</span>` : "");
      return `<div class="cd-ledger-row">
        <div class="cd-ledger-info">
          <div class="cd-ledger-tags">
            <span class="badge ${typeCls}">${r.type || "적립"}</span>
            ${ptBadge}
          </div>
          <span class="cd-ledger-reason">${r.reason || "-"}</span>
          ${detail}
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
  setIconPick("couponIcon", "event_seat");
  if ($("#couponCategory")) $("#couponCategory").value = "자리";
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
    .map((c, i) => {
      const cat = c.category || "특전";
      const col = CATEGORY_COLOR[cat] || CATEGORY_COLOR["특전"];
      return `<article class="cd-coupon cd-ticket" style="--cat:${col.c};--cat-bg:${col.bg}">
        <div class="cd-ticket-body">
          <div class="cd-coupon-top">
            <div class="cd-coupon-icon"><span class="material-symbols-outlined">${c.icon}</span></div>
            <span class="badge ${c.visible === "공개" ? "success" : "neutral"}">${c.visible}</span>
          </div>
          <div class="cd-coupon-title">${c.name}</div>
          <div class="cd-coupon-desc">${c.desc}</div>
          <div class="cd-ticket-tags">
            <span class="cd-ticket-cat">${cat}</span>
            <span class="cd-desc">사용 가능 ${c.day}</span>
          </div>
        </div>
        <div class="cd-ticket-stub">
          <div class="cd-stub-price"><span class="cd-price">${c.price} 포인트</span></div>
          <span class="cd-stub-stock">남은 수량 ${c.stock}</span>
        </div>
        <div class="cd-coupon-actions">
          <button class="btn-sm" type="button" data-action="editCoupon" data-i="${i}">수정</button>
          <button class="btn-sm" type="button" data-action="hideCoupon" data-i="${i}">${c.visible === "공개" ? "숨김" : "공개"}</button>
          <button class="btn-sm reject" type="button" data-action="deleteCoupon" data-i="${i}">삭제</button>
        </div>
      </article>`;
    })
    .join("");
  $("#couponCount").textContent = coupons.length;
  /* 인기 쿠폰: 실제 신청수 기준 최다 (목록 첫 항목이 아니라 데이터로) */
  const reqCounts = {};
  couponRequests.forEach((r) => { reqCounts[r.coupon] = (reqCounts[r.coupon] || 0) + 1; });
  let popName = "-", popN = 0;
  Object.keys(reqCounts).forEach((name) => { if (reqCounts[name] > popN) { popN = reqCounts[name]; popName = name; } });
  $("#popularCoupon").textContent = popN ? popName : "-";
  if ($("#popularCouponSub")) $("#popularCouponSub").textContent = "이번 주 " + popN + "회";
  $("#couponRequests").innerHTML = couponRequests
    .map(
      (r, i) => `<tr>
        <td>${r.student}</td><td>${r.coupon}</td><td class="right">${r.price}포인트</td><td class="muted">${r.time}</td>
        <td class="center">
          <span class="badge ${r.status === "승인" ? "success" : r.status === "반려됨" ? "danger" : "warning"}">${r.status}</span>
          ${r.rejectReason ? `<div class="cd-desc" style="font-size:14px;margin-top:2px">${r.rejectReason}</div>` : ""}
        </td>
        <td class="right">${r.status === "승인 대기" ? `<button class="btn-sm approve" type="button" data-action="approveCoupon" data-i="${i}">승인</button> <button class="btn-sm reject" type="button" data-action="promptReject" data-i="${i}">반려</button>` : ""}</td>
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
    ptFilter = $("#brickPointTypeFilter")?.value || "",
    q = ($("#brickSearch")?.value || "").trim();
  const rows = ledger.filter((r) =>
    (type === "전체" || r.type === type) &&
    (!ptFilter || r.pointType === ptFilter) &&
    (!q || r.student.includes(q))
  );
  if (!$("#brickLedgerRows")) return;
  const PT_CLS = { brick: "success", praise: "info", parent: "neutral" };
  $("#brickLedgerRows").innerHTML =
    rows
      .map(
        (r) => {
          const ptLabel = r.pointType ? POINT_TYPE_LABEL[r.pointType] : null;
          const ptBadge = ptLabel
            ? `<span class="badge ${PT_CLS[r.pointType] || "neutral"}" style="margin-left:4px;font-size:12px">${ptLabel}</span>`
            : "";
          return `<tr>
            <td class="muted">${r.time}</td><td>${r.student}</td>
            <td><span class="badge ${r.type === "사용" ? "warning" : r.type === "공동목표" ? "info" : "success"}">${r.type}</span>${ptBadge}</td>
            <td>${r.reason}</td><td class="right money ${r.amount < 0 ? 'money-minus' : 'money-plus'}">${r.amount > 0 ? "+" : ""}${r.amount}p</td><td class="right">${r.balance}p</td>
          </tr>`;
        }
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
/* ── 학급/학생별 통장 탭 전환 ── */
function switchBrickTab(tab) {
  document.querySelectorAll("[data-bricktab]").forEach(b => b.classList.toggle("active", b.dataset.bricktab === tab));
  document.querySelectorAll("[data-brickpane]").forEach(p => p.classList.toggle("active", p.dataset.brickpane === tab));
  if (tab === "student") renderBankSelectList();
}

let bankSortMode = "잔액순";
let bankSelectedIdx = -1;
let bankLedgerFilter = "all";

function renderBankSelectList() {
  const el = $("#bankSelectList");
  if (!el) return;
  const sorted = students.map((s, i) => ({ ...s, _i: i })).sort((a, b) => {
    if (bankSortMode === "잔액순") return b.points - a.points;
    if (bankSortMode === "번호순") return (a.classNum || 0) - (b.classNum || 0);
    return a.name.localeCompare(b.name, "ko");
  });
  if ($("#bankStudentCount")) $("#bankStudentCount").textContent = students.length + "명";
  el.innerHTML = sorted.map(s =>
    `<div class="cd-bank-select-item${s._i === bankSelectedIdx ? " selected" : ""}" data-banksel="${s._i}">
      ${avatar(s._i)}
      <div class="cd-bank-sel-info">
        <span class="cd-bank-sel-name">${s.name}</span>
        <span class="cd-desc">${s.classNum || "-"}번 · ${s.tag || "연속 없음"}</span>
      </div>
      <div class="cd-bank-sel-bal">${s.points}p</div>
    </div>`
  ).join("");
}

function selectBankStudent(i) {
  bankSelectedIdx = i;
  renderBankSelectList();
  const s = students[i];
  if (!s) return;
  const hd = $("#bankStuHd");
  if (hd) hd.innerHTML = `${avatar(i)}<div><div class="cd-bank-stu-name">${s.name}</div><div class="cd-desc">${s.classNum || "-"}번 · ${s.grade || ""}</div></div>`;
  if ($("#bankStudentBal")) $("#bankStudentBal").textContent = s.points;
  bankLedgerFilter = "all";
  $("#bankLedgerFilter")?.querySelectorAll("button").forEach(b => b.classList.toggle("active", b.dataset.bankfilter === "all"));
  renderStudentBankLedger(i, "all");
  renderStudentBankCoupons(i);
  const empty = $("#bankEmptyState");
  const content = $("#bankStudentContent");
  if (empty) empty.hidden = true;
  if (content) content.hidden = false;
}

/* 학생 신청·보유 쿠폰 목록 (포인트장터 신청 — 승인 대기는 여기서 바로 처리). 통장·상세 공용 */
function renderCouponListFor(name, listEl, countEl) {
  if (!listEl) return;
  const rows = couponRequests.map((r, ri) => ({ r, ri })).filter(({ r }) => r.student === name);
  if (countEl) countEl.textContent = rows.length ? rows.length + "건" : "";
  if (!rows.length) {
    listEl.innerHTML = '<div class="cd-desc" style="padding:8px 0">신청·보유 중인 쿠폰이 없어요.</div>';
    return;
  }
  listEl.innerHTML = rows.map(({ r, ri }) => {
    const cls = r.status === "승인" ? "success" : r.status === "반려됨" ? "neutral" : "warning";
    const used = r.used ? '<span class="badge neutral sm">사용 완료</span>' : "";
    const actions = r.status === "승인 대기"
      ? `<button class="btn-sm approve" type="button" data-action="approveCoupon" data-i="${ri}">승인</button> <button class="btn-sm reject" type="button" data-action="promptReject" data-i="${ri}">반려</button>`
      : "";
    return `<div class="cd-bank-coupon-item">
      <div class="cd-bank-coupon-info"><b>${r.coupon}</b><span class="cd-desc">${r.price}p · ${r.time}</span></div>
      <div class="cd-bank-coupon-right">${used}<span class="badge ${cls} sm">${r.status}</span>${actions}</div>
    </div>`;
  }).join("");
}
function renderStudentBankCoupons(i) {
  renderCouponListFor(students[i]?.name, $("#studentBankCoupons"), $("#bankCouponCount"));
}
function renderSdCoupons(i) {
  renderCouponListFor(students[i]?.name, $("#sdCoupons"), $("#sdCouponCount"));
}

function renderStudentBankLedger(i, filter) {
  const el = $("#studentBankLedger");
  if (!el) return;
  const name = students[i]?.name;
  const rows = ledger.filter(r => r.student === name && (filter === "all" || r.type === filter));
  if (!rows.length) {
    el.innerHTML = `<div class="cd-desc" style="padding:20px 0;text-align:center">거래 내역이 없습니다.</div>`;
    return;
  }
  const typeCls = (t) => t === "사용" ? "warning" : t === "공동목표" ? "info" : t === "반려" ? "neutral" : "success";
  el.innerHTML = `<div class="cd-passbook">
    <div class="cd-pb-head"><span>날짜</span><span>내용</span><span class="right">증감</span><span class="right">잔액</span></div>
    ${rows.map(r => `<div class="cd-pb-row">
      <span class="cd-pb-date">${r.time}</span>
      <span class="cd-pb-desc"><span class="badge ${typeCls(r.type)} sm">${r.type}</span> ${r.reason}</span>
      <span class="cd-pb-amt ${r.amount < 0 ? "money-minus" : r.amount > 0 ? "money-plus" : "muted"}">${r.amount > 0 ? "+" : ""}${r.amount}p</span>
      <span class="cd-pb-bal">${(r.balance ?? 0).toLocaleString()}p</span>
    </div>`).join("")}
  </div>`;
}

let bankGiveAmt = 5;

function addBrick(i, type, reason, amount) {
  const signed = type === "사용" ? -Math.abs(amount) : Math.abs(amount);
  students[i].points = Math.max(0, students[i].points + signed);
  const pointType = type === "사용" ? null : getPointType(reason);
  ledger.unshift({ time: "방금 전", student: students[i].name, type, reason, amount: signed, balance: students[i].points, pointType });
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
      <td class="muted" style="font-size:14px">${s.loginId || "-"}</td>
      <td class="center">${s.grade}</td>
      <td class="center">${s.level}</td>
      <td class="right">${s.points}p</td>
      <td class="center">${s.duplicate ? '<span class="badge warning">중복</span>' : '<span class="badge success">신규</span>'}</td>
    </tr>`
  ).join("") || '<tr><td colspan="6" class="center muted empty-cell">등록할 학생이 없습니다.</td></tr>';
}

/* ============================================================================
   세븐닷 콘텐츠 미리보기 + 문항별 오답·교정 신고
   ----------------------------------------------------------------------------
   세븐닷 문항 은행(SB_TEST / SB_EXAM) 구조 기반 mock. 과목×유형×레벨×회차
   = 한 세트, 세트는 문항들로 구성. 문항 = 문제/보기5(정답표시)/배점/해설.
   교사가 미리보고 문항별로 오답·해설오류·오탈자·개선을 신고/교정 요청.
   실제 연동 시 sbSets는 콘텐츠 API, reports는 신고(SB_QUESTION) API로 교체.
   ============================================================================ */
const SB_TEST_TYPES = ["일일 테스트", "주간 테스트", "중간 평가", "기말 평가"];
/* 신고 유형: 신고성(주의색) vs 제안성(정보색) */
const SB_REPORT_ALERT = ["정답 오류", "해설 오류", "오탈자"];
/* 보기 헬퍼: 정답 인덱스(0-base)로 5지선다 생성 */
function _ex(arr, ansIdx) { return arr.map((t, i) => ({ t, correct: i === ansIdx })); }

let sbSets = [
  { subject: "국어", type: "일일 테스트", level: "레벨 1-1", chapter: "1회차", updated: "2026.05.20", questions: [
    { q: "다음 밑줄 친 낱말의 뜻으로 알맞은 것은?  “오늘은 날씨가 무척 <u>화창하다</u>.”", score: 5, examples: _ex(["흐리고 어둡다", "맑고 따뜻하다", "비가 세차게 내린다", "바람이 매우 분다", "춥고 눈이 온다"], 1), explanation: "‘화창하다’는 날씨나 빛이 맑고 따뜻하다는 뜻입니다. 정답은 ②번." },
    { q: "다음 중 문장 부호가 <u>바르게</u> 쓰인 것은?", score: 5, examples: _ex(["오늘 뭐 해.", "정말 신난다?", "이것은 사과이다.", "어디 가니!", "와, 멋지다,"], 2), explanation: "평서문은 마침표(.)로 끝납니다. ③번이 바릅니다." },
    { q: "다음 중 띄어쓰기가 <u>틀린</u> 것은?", score: 5, examples: _ex(["할 수 있다", "먹을 만큼", "큰 집", "사과한개", "갈 곳"], 3), explanation: "단위를 나타내는 ‘개’는 띄어 써야 하므로 ‘사과 한 개’가 맞습니다." },
  ], reports: [
    { qNo: 2, type: "정답 오류", desc: "정답이 ③번인데 학생 화면 해설에는 ②번이 정답이라고 나옵니다. 확인 부탁드려요.", date: "어제", status: "확인 중" },
  ] },
  { subject: "국어", type: "주간 테스트", level: "레벨 1-1", chapter: "1주차", updated: "2026.05.24", questions: [
    { q: "다음 글의 중심 생각으로 알맞은 것은?  “규칙적인 운동은 몸을 건강하게 하고 기분도 좋게 한다…”", score: 10, examples: _ex(["운동은 시간이 오래 걸린다", "운동은 건강에 좋다", "운동은 친구와 해야 한다", "운동은 아침에만 한다", "운동은 위험하다"], 1), explanation: "글 전체가 운동의 이로움을 설명하므로 ②번이 중심 생각입니다." },
    { q: "‘느긋하다’와 뜻이 <u>반대</u>인 낱말은?", score: 10, examples: _ex(["여유롭다", "차분하다", "조급하다", "넉넉하다", "한가하다"], 2), explanation: "‘느긋하다’의 반대말은 마음이 급한 ‘조급하다’입니다." },
    { q: "다음 중 높임 표현이 알맞은 것은?", score: 10, examples: _ex(["할머니가 밥을 먹는다", "선생님이 오셨다", "아버지가 잔다", "엄마가 말한다", "형이 읽으신다"], 1), explanation: "주체 높임은 ‘-시-’를 써서 ‘오셨다’가 알맞습니다." },
  ], reports: [] },
  { subject: "영어", type: "일일 테스트", level: "A-1", chapter: "1회차", updated: "2026.05.21", questions: [
    { q: "Choose the correct meaning of the word “morning”.", score: 5, examples: _ex(["저녁", "아침", "점심", "밤", "오후"], 1), explanation: "‘morning’은 ‘아침’을 뜻합니다. 정답 ②번." },
    { q: "다음 중 단어의 품사가 <u>형용사(adjective)</u>인 것은?", score: 5, examples: _ex(["run", "happy", "quickly", "book", "they"], 1), explanation: "‘happy(행복한)’가 형용사입니다. run(동사), quickly(부사), book(명사), they(대명사)." },
    { q: "Fill in the blank:  “She ___ a student.”", score: 5, examples: _ex(["am", "be", "is", "are", "do"], 2), explanation: "3인칭 단수 주어 She에는 be동사 ‘is’를 씁니다." },
  ], reports: [] },
  { subject: "영어", type: "중간 평가", level: "A-1", chapter: "중간", updated: "2026.05.26", questions: [
    { q: "Choose the correct past tense of “go”.", score: 8, examples: _ex(["goed", "went", "gone", "going", "goes"], 1), explanation: "‘go’의 과거형은 불규칙으로 ‘went’입니다." },
    { q: "다음 중 복수형이 <u>틀린</u> 것은?", score: 8, examples: _ex(["books", "boxes", "childs", "buses", "pencils"], 2), explanation: "‘child’의 복수형은 ‘children’이므로 ‘childs’는 틀립니다." },
    { q: "Choose the correct word:  “There ___ two cats.”", score: 8, examples: _ex(["is", "am", "are", "be", "was"], 2), explanation: "복수 주어(two cats)에는 ‘are’를 씁니다." },
  ], reports: [] },
  { subject: "수학", type: "일일 테스트", level: "레벨 1-1", chapter: "1회차", updated: "2026.05.20", questions: [
    { q: "27 + 48 = ?", score: 5, examples: _ex(["65", "73", "75", "85", "netc"], 2), explanation: "27 + 48 = 75. 정답 ③번." },
    { q: "다음 중 가장 큰 수는?", score: 5, examples: _ex(["408", "480", "84", "840", "48"], 3), explanation: "840이 가장 큽니다. 정답 ④번." },
    { q: "삼각형의 변은 모두 몇 개인가?", score: 5, examples: _ex(["2개", "3개", "4개", "5개", "6개"], 1), explanation: "삼각형의 변은 3개입니다." },
  ], reports: [] },
  { subject: "수학", type: "기말 평가", level: "레벨 1-1", chapter: "기말", updated: "2026.05.28", questions: [
    { q: "0.6 × 0.4 = ?", score: 10, examples: _ex(["0.024", "0.24", "2.4", "0.1", "0.024"], 1), explanation: "6×4=24, 소수점 두 자리 → 0.24. 정답 ②번." },
    { q: "직사각형의 가로가 8cm, 세로가 5cm일 때 넓이는?", score: 10, examples: _ex(["13㎠", "26㎠", "40㎠", "45㎠", "80㎠"], 2), explanation: "넓이 = 가로 × 세로 = 8 × 5 = 40㎠." },
    { q: "1시간 30분은 모두 몇 분인가?", score: 10, examples: _ex(["60분", "90분", "100분", "130분", "150분"], 1), explanation: "1시간(60분) + 30분 = 90분." },
  ], reports: [] },
];
let sbSelectedRound = -1;   // 선택된 세트 인덱스
let sbReportQNo = null;     // 신고 대상 문항 번호 (1-base)

/* 유형별 뱃지 색: 테스트=정보, 평가=주의(중요) */
function _typeBadge(type) { return type.includes("평가") ? "warning" : "info"; }

function renderContentRounds() {
  const el = $("#contentRoundList");
  if (!el) return;
  const subj = $("#contentSubjectFilter")?.value || "전체 과목";
  const type = $("#contentTypeFilter")?.value || "전체 유형";
  const sets = sbSets.map((r, i) => ({ r, i })).filter(({ r }) => (subj === "전체 과목" || r.subject === subj) && (type === "전체 유형" || r.type === type));
  if ($("#contentRoundCount")) $("#contentRoundCount").textContent = sets.length + "개";
  el.innerHTML = sets.length
    ? sets.map(({ r, i }) => {
        const rep = r.reports.length;
        return `<button type="button" class="cd-content-round-item${sbSelectedRound === i ? " selected" : ""}" data-action="selectContentRound" data-i="${i}">
          <span class="cd-cr-info">
            <span class="cd-cr-title">${r.subject} · ${r.chapter}</span>
            <span class="cd-desc">${r.level} · 문항 ${r.questions.length}개</span>
          </span>
          <span class="cd-cr-tags">
            <span class="badge ${_typeBadge(r.type)} sm">${r.type}</span>
            ${rep ? `<span class="badge danger sm">신고 ${rep}</span>` : ""}
          </span>
        </button>`;
      }).join("")
    : `<div class="cd-desc cd-content-list-empty">해당 조건의 콘텐츠가 없어요.</div>`;
}

function selectContentRound(i) {
  sbSelectedRound = i;
  renderContentRounds();
  const r = sbSets[i];
  if (!r) return;
  if ($("#contentEmptyState")) $("#contentEmptyState").hidden = true;
  if ($("#contentDetailBody")) $("#contentDetailBody").hidden = false;
  if ($("#contentHd")) {
    $("#contentHd").innerHTML = `<div class="cd-content-hd-title">${r.subject} ${r.chapter} <span class="badge ${_typeBadge(r.type)} sm">${r.type}</span></div>
      <div class="cd-desc">${r.level} · 문항 ${r.questions.length}개 · 업데이트 ${r.updated}</div>`;
  }
  if ($("#contentItems")) {
    $("#contentItems").innerHTML = r.questions.map((qu, qi) => {
      const opts = qu.examples.map((ex, ei) => `<div class="cd-q-opt${ex.correct ? " correct" : ""}">
        <span class="cd-q-opt-no">${"①②③④⑤"[ei] || ei + 1}</span>
        <span class="cd-q-opt-t">${ex.t}</span>
        ${ex.correct ? `<span class="material-symbols-outlined cd-q-opt-ck">check</span>` : ""}
      </div>`).join("");
      return `<div class="cd-q-card">
        <div class="cd-q-head">
          <span class="cd-q-no">${qi + 1}번</span>
          <span class="cd-q-score">배점 ${qu.score}점</span>
          <button class="btn-sm cd-q-report" type="button" data-action="openContentReport" data-q="${qi + 1}"><span class="material-symbols-outlined">flag</span> 신고·교정</button>
        </div>
        <div class="cd-q-text">${qu.q}</div>
        <div class="cd-q-options">${opts}</div>
        <div class="cd-q-explain"><span class="cd-q-explain-k">해설</span> ${qu.explanation}</div>
      </div>`;
    }).join("");
  }
  renderContentReports(i);
}

function renderContentReports(i) {
  const el = $("#contentReports");
  if (!el) return;
  const reps = (sbSets[i] && sbSets[i].reports) || [];
  if ($("#contentReportCount")) $("#contentReportCount").textContent = reps.length ? reps.length + "건" : "";
  el.innerHTML = reps.length
    ? reps.map((rp) => {
        const alert = SB_REPORT_ALERT.includes(rp.type);
        return `<div class="cd-content-report-item">
          <div class="cd-content-report-top">
            <span class="badge ${alert ? "danger" : "info"} sm">${rp.type}</span>
            ${rp.qNo ? `<span class="cd-desc">${rp.qNo}번 문항</span>` : ""}
            ${rp.status ? `<span class="badge neutral sm">${rp.status}</span>` : ""}
            <span class="cd-desc cd-content-report-date">${rp.date}</span>
          </div>
          <div class="cd-content-report-desc">${rp.desc}</div>
        </div>`;
      }).join("")
    : `<div class="cd-desc cd-content-noreport">아직 신고·교정 요청이 없어요. 문항 오류나 개선점을 발견하면 ‘신고·교정’으로 알려주세요.</div>`;
}

/* ============================================================================
   워크시트 (학습지) — 세븐닷 worksheet: 과목·레벨·회차별 학습지 목록 + 미리보기/인쇄
   ============================================================================ */
let sbWorksheets = [
  { subject: "국어", level: "레벨 1-1", chapter: "1회차", area: "문법", count: 10, updated: "2026.05.20", questions: [
    { q: "다음 중 움직임을 나타내는 낱말(동사)은?", examples: _ex(["하늘", "달리다", "예쁘다", "빨강", "조용히"], 1) },
    { q: "다음 문장에서 주어를 찾아 쓰시오.  “동생이 책을 읽는다.”", examples: _ex(["동생이", "책을", "읽는다", "동생", "책"], 0) },
    { q: "‘밥을 먹다’를 높임 표현으로 바르게 바꾼 것은?", examples: _ex(["밥을 먹으셨다", "진지를 잡수셨다", "밥을 드셨다", "진지를 먹었다", "밥을 잡쉈다"], 1) },
  ] },
  { subject: "국어", level: "레벨 1-1", chapter: "2회차", area: "어휘", count: 10, updated: "2026.05.22", questions: [
    { q: "‘기쁘다’와 뜻이 비슷한 낱말은?", examples: _ex(["슬프다", "즐겁다", "무섭다", "지치다", "조용하다"], 1) },
    { q: "빈칸에 알맞은 낱말은?  “해가 떠서 날이 ___.”", examples: _ex(["어둡다", "밝다", "춥다", "젖다", "닫다"], 1) },
    { q: "‘크다’의 반대말은?", examples: _ex(["넓다", "작다", "높다", "길다", "많다"], 1) },
  ] },
  { subject: "영어", level: "A-1", chapter: "1회차", area: "단어", count: 15, updated: "2026.05.21", questions: [
    { q: "Choose the correct meaning of “apple”.", examples: _ex(["바나나", "사과", "포도", "딸기", "수박"], 1) },
    { q: "다음 중 색깔(color)을 나타내는 단어는?", examples: _ex(["dog", "red", "run", "book", "happy"], 1) },
    { q: "Choose the word that means “학교”.", examples: _ex(["house", "school", "park", "store", "river"], 1) },
  ] },
  { subject: "영어", level: "A-1", chapter: "2회차", area: "문법", count: 15, updated: "2026.05.24", questions: [
    { q: "Fill in the blank:  “I ___ a boy.”", examples: _ex(["is", "am", "are", "be", "do"], 1) },
    { q: "다음 중 복수형이 맞는 것은?", examples: _ex(["a cats", "two cat", "two cats", "two cates", "a cats"], 2) },
    { q: "Choose the correct word:  “This is ___ apple.”", examples: _ex(["a", "an", "the", "two", "some"], 1) },
  ] },
  { subject: "수학", level: "레벨 1-1", chapter: "1회차", area: "수와 연산", count: 12, updated: "2026.05.20", questions: [
    { q: "34 + 28 = ?", examples: _ex(["52", "62", "60", "72", "58"], 1) },
    { q: "다음 중 가장 작은 수는?", examples: _ex(["57", "75", "39", "93", "48"], 2) },
    { q: "9 × 6 = ?", examples: _ex(["45", "54", "56", "63", "48"], 1) },
  ] },
  { subject: "수학", level: "레벨 1-1", chapter: "2회차", area: "도형", count: 12, updated: "2026.05.25", questions: [
    { q: "변이 4개이고 네 각이 모두 직각인 도형은?", examples: _ex(["삼각형", "직사각형", "원", "오각형", "사다리꼴"], 1) },
    { q: "원의 중심에서 원 위의 한 점까지의 거리를 무엇이라 하나?", examples: _ex(["지름", "반지름", "둘레", "넓이", "각도"], 1) },
    { q: "정사각형의 한 변이 5cm일 때 둘레는?", examples: _ex(["10cm", "15cm", "20cm", "25cm", "30cm"], 2) },
  ] },
];
let sbWsSel = -1;       // 미리보기 중인 워크시트
let sbWsAnswer = false; // 정답 표시 여부(교사용)

function renderWorksheets() {
  const tb = $("#worksheetRows");
  if (!tb) return;
  const subj = $("#wsSubjectFilter")?.value || "전체 과목";
  const lvl = ($("#wsLevelFilter")?.value || "전체 레벨");
  const rows = sbWorksheets.map((w, i) => ({ w, i })).filter(({ w }) => (subj === "전체 과목" || w.subject === subj) && (lvl === "전체 레벨" || w.level === lvl));
  if ($("#worksheetCount")) $("#worksheetCount").textContent = rows.length;
  tb.innerHTML = rows.length
    ? rows.map(({ w, i }) => `<tr>
        <td><b>${w.subject}</b></td>
        <td>${w.level}</td>
        <td>${w.chapter}</td>
        <td>${w.area}</td>
        <td class="center">${w.count}문항</td>
        <td class="center"><button class="btn-sm" type="button" data-action="openWorksheet" data-i="${i}"><span class="material-symbols-outlined" style="font-size:14px;vertical-align:-3px">visibility</span> 미리보기</button></td>
      </tr>`).join("")
    : `<tr><td colspan="6" class="cd-desc" style="padding:20px;text-align:center">해당 조건의 워크시트가 없어요.</td></tr>`;
}

function renderWsPreview() {
  const w = sbWorksheets[sbWsSel];
  if (!w) return;
  if ($("#wsPreviewTitle")) $("#wsPreviewTitle").textContent = `${w.subject} ${w.chapter} 학습지`;
  if ($("#wsPreviewMeta")) $("#wsPreviewMeta").textContent = `${w.level} · ${w.area} · 총 ${w.count}문항`;
  const ansBtn = $("#wsAnswerToggle");
  if (ansBtn) ansBtn.textContent = sbWsAnswer ? "정답 숨기기" : "정답 보기";
  if ($("#wsPreviewBody")) {
    const shown = w.questions.length;
    $("#wsPreviewBody").innerHTML = w.questions.map((qu, qi) => {
      const opts = qu.examples.map((ex, ei) => `<span class="cd-ws-opt${sbWsAnswer && ex.correct ? " correct" : ""}">${"①②③④⑤"[ei] || ei + 1} ${ex.t}</span>`).join("");
      return `<div class="cd-ws-q">
        <div class="cd-ws-q-text"><b>${qi + 1}.</b> ${qu.q}</div>
        <div class="cd-ws-q-opts">${opts}</div>
      </div>`;
    }).join("") + (w.count > shown ? `<div class="cd-desc cd-ws-more">…외 ${w.count - shown}문항 (인쇄 시 전체 출력)</div>` : "");
  }
}

/* ============================================================================
   학습 보고서 / 진단 보고서 (세븐닷 testreport / leveltestreport)
   ----------------------------------------------------------------------------
   학습 보고서 = 학생별 주간/월간 발행 문서 목록(상세=학생 리포트로 이동).
   진단 보고서 = 학생별 레벨테스트 결과(과목별 진단 레벨 + 요약·권장).
   ============================================================================ */
function learnReportRows() {
  const rows = [];
  students.forEach((s, i) => {
    rows.push({ i, type: "주간", title: s.name + " 주간 학습 보고서", date: "2026.06.14" });
    if (i % 2 === 0) rows.push({ i, type: "월간", title: s.name + " 5월 학습 보고서", date: "2026.05.31" });
  });
  return rows;
}
function renderLearnReports() {
  const tb = $("#learnReportRows");
  if (!tb) return;
  const ty = $("#lrTypeFilter")?.value || "전체 유형";
  const rows = learnReportRows().filter((r) => ty === "전체 유형" || r.type === ty);
  if ($("#learnReportCount")) $("#learnReportCount").textContent = rows.length;
  tb.innerHTML = rows.length
    ? rows.map((r) => {
        const s = students[r.i];
        return `<tr>
          <td><b>${s.name}</b></td>
          <td>${s.grade}</td>
          <td>${r.title}</td>
          <td class="center"><span class="badge ${r.type === "월간" ? "info" : "neutral"} sm">${r.type}</span></td>
          <td class="center muted">${r.date}</td>
          <td class="center"><button class="btn-sm" type="button" data-action="weeklyStudent" data-i="${r.i}">상세 보기</button> <button class="btn-sm" type="button" data-action="printDoc">인쇄</button></td>
        </tr>`;
      }).join("")
    : `<tr><td colspan="6" class="cd-desc" style="padding:20px;text-align:center">해당 보고서가 없어요.</td></tr>`;
}

const _diagLv = (seed) => "L" + (1 + Math.floor(_gRand(seed) * 5));
function diagnosisData(i) {
  return { kor: _diagLv(i * 3 + 1), math: _diagLv(i * 3 + 2), eng: "A-" + (1 + Math.floor(_gRand(i * 3 + 3) * 3)), date: "2026.03.05" };
}
function renderDiagnosis() {
  const tb = $("#diagnosisRows");
  if (!tb) return;
  const rows = students.map((s, i) => ({ s, i, d: diagnosisData(i) }));
  if ($("#diagnosisCount")) $("#diagnosisCount").textContent = rows.length;
  tb.innerHTML = rows.map(({ s, i, d }) => `<tr>
    <td><b>${s.name}</b></td>
    <td>${s.grade}</td>
    <td class="center"><span class="badge neutral sm">국어 ${d.kor}</span> <span class="badge neutral sm">수학 ${d.math}</span> <span class="badge neutral sm">영어 ${d.eng}</span></td>
    <td class="center muted">${d.date}</td>
    <td class="center"><button class="btn-sm" type="button" data-action="openDiagnosis" data-i="${i}">상세 보기</button></td>
  </tr>`).join("");
}
function openDiagnosisModal(i) {
  const s = students[i], d = diagnosisData(i);
  const set = (id, v) => { if ($(id)) $(id).textContent = v; };
  set("#dgName", s.name + " 진단 보고서");
  set("#dgMeta", s.grade + " · 진단일 " + d.date);
  if ($("#dgLevels")) $("#dgLevels").innerHTML = [["국어", d.kor], ["수학", d.math], ["영어", d.eng]].map(([k, v]) => `<div class="cd-dg-lv"><span class="cd-dg-lv-subj">${k}</span><span class="cd-dg-lv-val">${v}</span></div>`).join("");
  set("#dgSummary", `${s.name} 학생은 국어 ${d.kor}, 수학 ${d.math}, 영어 ${d.eng} 수준으로 진단되었습니다. 전반적으로 학년 평균에 부합하며, 수학 영역의 이해도가 상대적으로 높습니다.`);
  set("#dgRecommend", `현재 레벨에 맞춰 국어 ${d.kor} · 수학 ${d.math} 콘텐츠로 학습을 시작하고, 영어는 ${d.eng} 단계의 어휘·문법을 병행하길 권장합니다.`);
  show("#diagnosisModal");
}

/* ============================================================================
   학원장 모드 — 학원 대시보드
   ============================================================================ */
const academyGroups = [
  { name: "초등 국어 A반", teacher: "김지은",  students: 24, rate: 88, level: "레벨 1-2" },
  { name: "초등 영어 B반", teacher: "이수진",  students: 21, rate: 76, level: "A-1"      },
  { name: "초등 종합반",   teacher: "박민준",  students: 27, rate: 92, level: "레벨 1-1" },
  { name: "중등 수학반",   teacher: "최서현",  students: 18, rate: 64, level: "레벨 2-1" },
  { name: "중등 영어반",   teacher: "정하은",  students: 20, rate: 81, level: "B-1"      },
  { name: "중등 종합반",   teacher: "홍승우",  students: 16, rate: 73, level: "레벨 2-2" },
];
function renderAcademyDashboard() {
  const set = (id, v) => { if ($(id)) $(id).textContent = v; };
  const enrolled = academyGroups.reduce((a, g) => a + g.students, 0);
  /* 가입 구독 상품 · 등록 현황(정원 대비) · 적립금 */
  const cap = 120; // 구독 구매 정원(mock)
  set("#adSubProduct", "3과목 정기구독");
  set("#adSubMeta", "정원 " + cap + "명 · 다음 결제 2026-07-01");
  set("#adEnrolled", enrolled);
  set("#adCap", cap);
  const left = Math.max(0, cap - enrolled);
  const ratio = cap > 0 ? enrolled / cap : 0;
  const warnEl = $("#adEnrollWarn");
  if (warnEl) {
    const isNear = ratio >= 0.9;
    warnEl.hidden = !isNear;
    if (isNear) {
      const pct = Math.round(ratio * 100);
      set("#adEnrollWarnText", `정원의 ${pct}%에 도달했습니다`);
    }
  }
  set("#adEnrollLeft", left === 0 ? "정원이 가득 찼습니다" : left <= Math.ceil(cap * 0.1) ? `여유 ${left}명` : `${left}명 더 등록 가능`);
  set("#adDeposit", "320,000원");
  set("#adTotalGroups", academyGroups.length + "개");
  set("#adAvgRate", Math.round(academyGroups.reduce((a, g) => a + g.rate, 0) / academyGroups.length) + "%");
  set("#adUnpaid", "3건");
  if (!$("#adGroupRows")) return;
  $("#adGroupRows").innerHTML = academyGroups.map((g) => {
    const cls = g.rate >= 85 ? "success" : g.rate >= 70 ? "info" : "warning";
    return `<tr>
      <td><b>${g.name}</b></td>
      <td>${g.teacher}</td>
      <td class="center">${g.students}명</td>
      <td class="center">${g.level}</td>
      <td class="center"><span class="badge ${cls}">${g.rate}%</span></td>
    </tr>`;
  }).join("");
}

/* ============================================================================
   학원장 — 그룹(반) 관리 : 진단→반 배정 + 반 기본 레벨 + 학생별 override
   ============================================================================ */
const AG_SUBJ = [["kor", "국어"], ["eng", "영어"], ["math", "수학"]];
const AG_LEVELS = {
  kor: ["레벨 1-1", "레벨 1-2", "레벨 2-1", "레벨 2-2", "레벨 3-1"],
  eng: ["A-1", "A-2", "B-1", "B-2", "C-1"],
  math: ["레벨 1-1", "레벨 1-2", "레벨 2-1", "레벨 2-2", "레벨 3-1"],
};
const _agNames = ["김민준", "이서연", "박도윤", "최지우", "정하준", "강서아", "조은우", "윤시윤", "장예린", "임주원", "한이준", "오수아", "서지호", "신하은", "권태양", "황시우", "안소율", "송지안"];
/* academyGroups에 과목별 기본 레벨 + roster 부여 (1회) */
academyGroups.forEach((g, gi) => {
  g.id = gi + 1;
  g.grade = g.grade || ["초3~4", "초4~5", "중1~2", "중1~2", "초5~6"][gi] || "초3~4";
  g.levels = { kor: AG_LEVELS.kor[gi % 5], eng: AG_LEVELS.eng[gi % 5], math: AG_LEVELS.math[gi % 5] };
  const n = Math.min(g.students, 7);
  g.roster = [];
  for (let i = 0; i < n; i++) {
    const ov = {};
    if (_gRand(gi * 30 + i * 7) < 0.22) ov.math = AG_LEVELS.math[Math.min(4, (gi % 5) + 1)];
    g.roster.push({ name: _agNames[(gi * 4 + i) % _agNames.length], grade: g.grade, override: ov });
  }
});
let agSelected = 0, agLevelStu = -1, agAssignIdx = -1;
/* 진단 완료, 반 배정 대기 학생 */
let academyUnassigned = [
  { name: "한도윤", grade: "초3", diag: { kor: "레벨 1-2", eng: "A-1", math: "레벨 1-1" } },
  { name: "오시우", grade: "초4", diag: { kor: "레벨 2-1", eng: "A-2", math: "레벨 1-2" } },
];

function renderAcademyGroups() {
  if (!$("#agGroupList")) return;
  $("#agGroupList").innerHTML = academyGroups.map((g, gi) => `
    <button type="button" class="cd-content-round-item${agSelected === gi ? " selected" : ""}" data-action="selectAcademyGroup" data-i="${gi}">
      <span class="cd-cr-info">
        <span class="cd-cr-title">${g.name}</span>
        <span class="cd-desc">${g.teacher} · ${g.roster.length}명 · ${g.grade}</span>
      </span>
    </button>`).join("");
  if ($("#agUnassignedCount")) $("#agUnassignedCount").textContent = academyUnassigned.length + "명";
  if ($("#agUnassigned")) $("#agUnassigned").innerHTML = academyUnassigned.length
    ? academyUnassigned.map((s, i) => `<div class="cd-ag-unassigned-item"><span class="cd-ag-ua-info"><b>${s.name}</b><span class="cd-desc">${s.grade} · 진단 완료</span></span><button class="btn-sm" type="button" data-action="openAssign" data-i="${i}">반 배정</button></div>`).join("")
    : '<div class="cd-desc" style="padding:10px 0">배정 대기 학생이 없어요.</div>';
  renderAcademyGroupDetail();
}
function renderAcademyGroupDetail() {
  const g = academyGroups[agSelected];
  if (!g || !$("#agDetailName")) return;
  $("#agDetailName").textContent = g.name;
  $("#agDetailMeta").textContent = `${g.teacher} · ${g.grade} · ${g.roster.length}명`;
  $("#agBaseLevels").innerHTML = AG_SUBJ.map(([k, nm]) => `
    <div class="cd-ag-base">
      <span class="cd-ag-base-subj">${nm}</span>
      <select class="form-select cd-ag-base-sel" data-subj="${k}">
        ${AG_LEVELS[k].map((l) => `<option${l === g.levels[k] ? " selected" : ""}>${l}</option>`).join("")}
      </select>
    </div>`).join("");
  $("#agRoster").innerHTML = g.roster.map((s, si) => {
    const cell = (k) => { const ov = s.override && s.override[k]; return ov ? `<span class="badge info sm">${ov} · 개별</span>` : `<span class="cd-desc">${g.levels[k]}</span>`; };
    return `<tr>
      <td><b>${s.name}</b></td>
      <td class="center">${cell("kor")}</td>
      <td class="center">${cell("eng")}</td>
      <td class="center">${cell("math")}</td>
      <td class="center"><button class="btn-sm" type="button" data-action="openStudentLevel" data-i="${si}">레벨 조정</button></td>
    </tr>`;
  }).join("");
}

/* ----- 클릭 위임 ----- */
document.addEventListener("click", (e) => {
  if (e.target.matches(".cd-sp-overlay.show")) { hide("#studentDetailModal"); return; }
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

  const mgCheck = e.target.closest(".cd-stu-check[data-mgidx]");
  if (mgCheck) {
    const idx = parseInt(mgCheck.dataset.mgidx, 10);
    if (selBulkMgr.has(idx)) selBulkMgr.delete(idx); else selBulkMgr.add(idx);
    mgCheck.closest("article").classList.toggle("sel", selBulkMgr.has(idx));
    updateBulkBarMgr();
    return;
  }

  const sortModeBtn = e.target.closest("[data-sortmode]");
  if (sortModeBtn) {
    studentSortMode = sortModeBtn.dataset.sortmode;
    document.querySelectorAll("[data-sortmode]").forEach((b) => b.classList.toggle("active", b.dataset.sortmode === studentSortMode));
    renderStudents();
    return;
  }
  const mgSortBtn = e.target.closest("[data-mgsort]");
  if (mgSortBtn) {
    manageSortMode = mgSortBtn.dataset.mgsort;
    renderManageStudentList();
    return;
  }
  /* 반 홈: 통합 랭킹 카드 탭 (칭찬/포인트/기여도) */
  const rankTab = e.target.closest("[data-ranktab]");
  if (rankTab) {
    const t = rankTab.dataset.ranktab;
    rankTab.closest(".cd-sd-sub-tabs").querySelectorAll("button").forEach((b) => b.classList.toggle("active", b === rankTab));
    document.querySelectorAll("[data-rankpane]").forEach((p) => { p.hidden = p.dataset.rankpane !== t; });
    return;
  }
  /* 학생 명단 행 클릭 → 상세 페이지 이동 */
  const rosterRow = e.target.closest(".cd-roster-link");
  if (rosterRow && !a) { navigateToStudentDetail(+rosterRow.dataset.rowi); return; }

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

  // 학습 현황 기간 탭 (모달 + 학생 상세 페이지 공통)
  const periodBtn = e.target.closest("[data-period]");
  if (periodBtn && periodBtn.closest("[data-sdpane='learning']")) {
    const pane = periodBtn.dataset.period;
    periodBtn.closest(".cd-sd-sub-tabs").querySelectorAll("button").forEach(b => b.classList.toggle("active", b === periodBtn));
    periodBtn.closest("[data-sdpane='learning']").querySelectorAll("[data-period-pane]").forEach(p => p.hidden = p.dataset.periodPane !== pane);
    return;
  }

  // 리포트 기간 서브탭
  const reportPeriodBtn = e.target.closest("[data-report-period]");
  if (reportPeriodBtn) {
    reportPeriod = reportPeriodBtn.dataset.reportPeriod;
    reportPeriodBtn.closest(".cd-sd-sub-tabs").querySelectorAll("button").forEach(b => b.classList.toggle("active", b === reportPeriodBtn));
    renderReportPane(selected);
    return;
  }

  // 리포트 작성 모드 토글 (AI / 직접 작성)
  const rptModeBtn = e.target.closest("[data-rpt-mode]");
  if (rptModeBtn) {
    const mode = rptModeBtn.dataset.rptMode;
    rptModeBtn.closest(".cd-rpt-write-mode").querySelectorAll("button").forEach(b => b.classList.toggle("active", b === rptModeBtn));
    const write = rptModeBtn.closest(".cd-report-write");
    if (write) {
      write.querySelector(".cd-rpt-write-ai").hidden = mode !== "ai";
      write.querySelector(".cd-rpt-write-manual").hidden = mode !== "manual";
    }
    return;
  }

  // 코멘트 모드 토글 (AI / 직접 작성)
  const commentModeBtn = e.target.closest("[data-comment-mode]");
  if (commentModeBtn) {
    const mode = commentModeBtn.dataset.commentMode;
    commentModeBtn.closest(".cd-sd-comment-mode").querySelectorAll("button").forEach(b => b.classList.toggle("active", b === commentModeBtn));
    document.querySelectorAll("[data-comment-panel]").forEach(p => p.hidden = p.dataset.commentPanel !== mode);
    return;
  }

  // 학급/학생별 통장 탭
  const brickTabBtn = e.target.closest("[data-bricktab]");
  if (brickTabBtn) { switchBrickTab(brickTabBtn.dataset.bricktab); return; }

  // 학생별 통장: 학생 선택
  const bankSelItem = e.target.closest("[data-banksel]");
  if (bankSelItem) { selectBankStudent(+bankSelItem.dataset.banksel); return; }

  // 학생별 통장: 정렬
  const bankSortBtn = e.target.closest("[data-banksort]");
  if (bankSortBtn) {
    bankSortMode = bankSortBtn.dataset.banksort;
    bankSortBtn.closest("#bankSortTabs").querySelectorAll("button").forEach(b => b.classList.toggle("active", b === bankSortBtn));
    renderBankSelectList();
    return;
  }

  // 학생별 통장: 개인 내역 필터
  const bankFilterBtn = e.target.closest("[data-bankfilter]");
  if (bankFilterBtn) {
    bankLedgerFilter = bankFilterBtn.dataset.bankfilter;
    bankFilterBtn.closest("#bankLedgerFilter").querySelectorAll("button").forEach(b => b.classList.toggle("active", b === bankFilterBtn));
    if (bankSelectedIdx >= 0) renderStudentBankLedger(bankSelectedIdx, bankLedgerFilter);
    return;
  }

  // 학생별 통장: 포인트 스테퍼
  const bankStep = e.target.closest("[data-bankstep]");
  if (bankStep) {
    bankGiveAmt = Math.max(1, Math.min(100, bankGiveAmt + (bankStep.dataset.bankstep === "+" ? 1 : -1)));
    if ($("#bankGiveAmt")) $("#bankGiveAmt").textContent = bankGiveAmt;
    return;
  }

  // 내역 필터 (전체/적립/사용)
  const ledgerFilterBtn = e.target.closest("[data-ledger-filter]");
  if (ledgerFilterBtn) {
    const filter = ledgerFilterBtn.dataset.ledgerFilter;
    ledgerFilterBtn.closest(".cd-sd-ledger-filter").querySelectorAll("button").forEach(b => b.classList.toggle("active", b === ledgerFilterBtn));
    const el = document.querySelector("#sdLedger");
    if (el) {
      el.querySelectorAll(".cd-ledger-row").forEach(row => {
        if (filter === "all") { row.hidden = false; return; }
        const isEarn = row.querySelector(".cd-ledger-amt.text-green");
        row.hidden = filter === "적립" ? !isEarn : !!isEarn;
      });
    }
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
    if (ACADEMY_STUBS.has(navBtn.dataset.menu)) { toast("준비 중 — 다음 단계에서 구현됩니다."); return; }
    setView(navBtn.dataset.menu, { ltab: navBtn.dataset.ltab, mtab: navBtn.dataset.gomtab });
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
  if (st && st.dataset.i != null) {
    openStudentDetail(+st.dataset.i);
    return;
  }
  const stuChip = e.target.closest(".cd-stu-chip");
  if (stuChip) {
    openStudentDetail(+stuChip.dataset.i);
    return;
  }
  const contribRow = e.target.closest(".cd-contrib-row");
  if (contribRow && !e.target.closest("[data-action]")) {
    openStudentDetail(+contribRow.dataset.i);
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
  /* 학생 현황 더보기 메뉴: 바깥 클릭 시 닫기 */
  if (!e.target.closest(".cd-more-menu") && $("#stuMoreDropdown")) $("#stuMoreDropdown").hidden = true;
  /* 사유 드롭다운 항목 선택 */
  const ddItem = e.target.closest(".cd-reason-dd-item");
  if (ddItem) {
    if (ddItem.dataset.reasonidx === "manage") {
      window.location.href = PAGE_URLS.praiserule;
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
  /* 학생 명단 테이블: 행 클릭 → 학생 상세 페이지 (수정·삭제 버튼은 data-action이 우선) */
  if (!a) {
    const rosterRow = e.target.closest("[data-rowi]");
    if (rosterRow) navigateToStudentDetail(+rosterRow.dataset.rowi);
    return;
  }
  const act = a.dataset.action;

  switch (act) {
    /* ----- 세븐닷 콘텐츠 미리보기 ----- */
    case "selectContentRound":
      selectContentRound(+a.dataset.i);
      break;
    case "openContentReport": {
      if (sbSelectedRound < 0) { toast("콘텐츠를 먼저 선택해 주세요."); break; }
      const r = sbSets[sbSelectedRound];
      sbReportQNo = a.dataset.q ? +a.dataset.q : null;
      if ($("#contentReportTarget")) $("#contentReportTarget").textContent = `${r.subject} ${r.chapter} (${r.type})${sbReportQNo ? " · " + sbReportQNo + "번 문항" : ""}`;
      if ($("#contentReportType")) $("#contentReportType").value = $("#contentReportType").options[0].value;
      if ($("#contentReportDesc")) $("#contentReportDesc").value = "";
      show("#contentReportModal");
      break;
    }
    case "closeContentReport":
      hide("#contentReportModal");
      break;
    case "submitContentReport": {
      if (sbSelectedRound < 0) { hide("#contentReportModal"); break; }
      const desc = ($("#contentReportDesc")?.value || "").trim();
      if (!desc) { toast("내용을 입력해 주세요."); break; }
      const type = $("#contentReportType")?.value || "개선 제안";
      sbSets[sbSelectedRound].reports.unshift({ qNo: sbReportQNo, type, desc, date: "방금 전", status: "접수" });
      renderContentReports(sbSelectedRound);
      renderContentRounds();
      hide("#contentReportModal");
      toast("신고·교정 요청을 접수했어요. 세븐닷 콘텐츠팀에 전달됩니다.");
      break;
    }
    /* ----- 워크시트 미리보기 ----- */
    case "openWorksheet":
      sbWsSel = +a.dataset.i;
      sbWsAnswer = false;
      renderWsPreview();
      show("#worksheetPreviewModal");
      break;
    case "closeWorksheet":
      hide("#worksheetPreviewModal");
      break;
    case "toggleWsAnswer":
      sbWsAnswer = !sbWsAnswer;
      renderWsPreview();
      break;
    case "printWorksheet":
    case "printDoc":
      toast("인쇄 미리보기는 실제 연동 시 PDF로 제공됩니다.");
      break;
    case "demoAction":
      toast("프로토타입 화면입니다 — 실제 연동 시 동작합니다.");
      break;
    case "openDiagnosis":
      openDiagnosisModal(+a.dataset.i);
      break;
    case "closeDiagnosis":
      hide("#diagnosisModal");
      break;
    /* ----- 학원장 그룹(반) 관리 ----- */
    case "selectAcademyGroup":
      agSelected = +a.dataset.i;
      renderAcademyGroups();
      break;
    case "openStudentLevel": {
      agLevelStu = +a.dataset.i;
      const g = academyGroups[agSelected], s = g && g.roster[agLevelStu];
      if (!s) break;
      if ($("#slName")) $("#slName").textContent = s.name + " 레벨 조정";
      if ($("#slRows")) $("#slRows").innerHTML = AG_SUBJ.map(([k, nm]) => {
        const ov = s.override && s.override[k];
        return `<div class="cd-form-row"><label>${nm} <span class="cd-form-hint">반 기본 ${g.levels[k]}</span></label>
          <select class="form-select" data-sl="${k}">
            <option value="">반 기본 따르기 (${g.levels[k]})</option>
            ${AG_LEVELS[k].map((l) => `<option value="${l}"${ov === l ? " selected" : ""}>${l} (개별)</option>`).join("")}
          </select></div>`;
      }).join("");
      show("#studentLevelModal");
      break;
    }
    case "closeStudentLevel":
      hide("#studentLevelModal");
      break;
    case "saveStudentLevel": {
      const g = academyGroups[agSelected], s = g && g.roster[agLevelStu];
      if (s) {
        s.override = {};
        document.querySelectorAll("#slRows [data-sl]").forEach((sel) => { if (sel.value) s.override[sel.dataset.sl] = sel.value; });
      }
      hide("#studentLevelModal");
      renderAcademyGroupDetail();
      toast("학생 레벨을 저장했어요.");
      break;
    }
    case "openAssign": {
      agAssignIdx = +a.dataset.i;
      const s = academyUnassigned[agAssignIdx];
      if (!s) break;
      if ($("#asName")) $("#asName").textContent = s.name + " 반 배정";
      if ($("#asMeta")) $("#asMeta").textContent = `${s.grade} · 진단 결과 국어 ${s.diag.kor} · 영어 ${s.diag.eng} · 수학 ${s.diag.math}`;
      if ($("#asGroupSel")) $("#asGroupSel").innerHTML = academyGroups.map((g, gi) => `<option value="${gi}">${g.name} (${g.grade})</option>`).join("");
      show("#assignModal");
      break;
    }
    case "closeAssign":
      hide("#assignModal");
      break;
    case "saveAssign": {
      const s = academyUnassigned[agAssignIdx];
      const gi = +(($("#asGroupSel") && $("#asGroupSel").value) || 0);
      const g = academyGroups[gi];
      if (s && g) { g.roster.push({ name: s.name, grade: s.grade, override: {} }); academyUnassigned.splice(agAssignIdx, 1); }
      hide("#assignModal");
      agSelected = gi;
      renderAcademyGroups();
      toast((g ? g.name : "반") + "에 배정했어요.");
      break;
    }
    /* 일괄 지급 사유 드롭다운 토글 */
    case "toggleReasonDD": {
      const menu = $("#bulkReasonMenu");
      if (menu) menu.hidden = !menu.hidden;
      break;
    }
    /* 학생 현황 헤더 더보기 메뉴 토글 */
    case "toggleStuMore": {
      const dd = $("#stuMoreDropdown");
      if (dd) dd.hidden = !dd.hidden;
      break;
    }
    /* 보이는 포인트 초기화 (더보기 메뉴) */
    case "resetPoints": {
      const dd = $("#stuMoreDropdown");
      if (dd) dd.hidden = true;
      students.forEach((s) => { s.points = 0; });
      updateAll();
      toast("보이는 포인트를 모두 0으로 초기화했습니다. (새로고침하면 복구)");
      break;
    }
    /* 학생 상세 */
    case "closeStudentDetail":
      hide("#studentDetailModal");
      break;
    /* 지난 공동목표 상세 모달 */
    case "openGoalPast": {
      const h = goalHistory[+a.dataset.i];
      if (!h) break;
      const set = (id, v) => { if ($(id)) $(id).textContent = v; };
      set("#gpTitle", h.title);
      set("#gpPeriod", h.period);
      set("#gpTarget", h.target.toLocaleString() + "p");
      set("#gpAchieved", h.achievedDate);
      set("#gpContributors", h.contributors + "명");
      set("#gpTop", h.topContributor + " · " + h.topPoints + "p");
      set("#gpReward", h.reward);
      set("#gpNote", h.note);
      show("#goalPastModal");
      break;
    }
    case "closeGoalPast":
      hide("#goalPastModal");
      break;
    /* 반 주간 보고서 → 해당 학생 상세(리포트 탭) */
    case "weeklyStudent":
      navigateToStudentDetail(+a.dataset.i, "report");
      break;
    /* 우측 패널 → 전체 화면 학생 상세 페이지 (가운데 정렬로 크게 보기) */
    case "openFullDetail": {
      const at = document.querySelector("[data-sdtab].active");
      navigateToStudentDetail(selected, at ? at.dataset.sdtab : null);
      break;
    }
    case "sdPrev":
      stepStudentDetail(-1);
      break;
    case "sdNext":
      stepStudentDetail(1);
      break;
    case "sdDayPrev":
      sdDayOffset = Math.max(-14, sdDayOffset - 1);
      renderSdTodayCards(selected + 1, sdDayOffset);
      break;
    case "sdDayNext":
      if (sdDayOffset < 0) { sdDayOffset++; renderSdTodayCards(selected + 1, sdDayOffset); }
      break;
    case "sdMonthPrev":
      sdMonthOffset++;
      renderSdMonth(selected + 1);
      break;
    case "sdMonthNext":
      if (sdMonthOffset > 0) { sdMonthOffset--; renderSdMonth(selected + 1); }
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
      const sdTarget = $("#sdRptDraft") || $("#sdComment");
      if (sdTarget) sdTarget.textContent = text;
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
      window.location.href = PAGE_URLS.praiserule;
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

    /* 학생 명단: 수정 버튼 → 학생 상세 페이지 계정정보 탭 */
    case "editStudentAccount":
      navigateToStudentDetail(+a.dataset.i, "account");
      break;
    case "openStudentPay":
      openStudentDetail._initTab = "academy";
      openStudentDetail(+a.dataset.i);
      show("#studentDetailModal");
      break;

    /* 계정정보 탭: 저장 */
    case "saveStudentAccount": {
      const s = students[selected];
      if (!s) break;
      const g = id => ($("#" + id)?.value || "").trim();
      s.name         = g("acctName")       || s.name;
      s.classNum     = g("acctClassNum")   ? +g("acctClassNum") : s.classNum;
      s.grade        = g("acctGrade")      || s.grade;
      s.birthDate    = g("acctBirth")      || s.birthDate;
      s.loginId      = g("acctLoginId")    || s.loginId;
      s.studentStatus = $("#acctStatus")?.value || s.studentStatus;
      s.usageStart   = g("acctStart")      || s.usageStart;
      s.usageEnd     = g("acctEnd")        || s.usageEnd;
      s.parentName   = g("acctParentName") || s.parentName;
      s.parentPhone  = g("acctParentPhone")|| s.parentPhone;
      s.memo         = g("acctMemo");
      /* 헤더·태그 즉시 갱신 */
      if ($("#sdName")) $("#sdName").textContent = s.name;
      const av = $("#sdAvatar"); if (av) av.textContent = s.name[0];
      renderRoster();
      updateAll();
      toast(s.name + " 정보를 저장했습니다.");
      break;
    }
    /* 계정정보 탭: 학생 삭제 */
    case "deleteStudentFromDetail": {
      const s = students[selected];
      if (!s) break;
      fn_confirm(s.name + " 학생을 명단에서 삭제할까요?", () => {
        students.splice(selected, 1);
        if (selected >= students.length) selected = Math.max(0, students.length - 1);
        if (CURRENT_PAGE === "student-detail") {
          window.location.href = PAGE_URLS.students;
        } else {
          hide("#studentDetailModal");
        }
        renderRoster();
        updateAll();
        toast("학생을 삭제했습니다.");
      });
      break;
    }
    /* 계정정보 탭: 비밀번호 초기화 */
    case "resetStudentPw": {
      const s = students[selected];
      toast((s ? s.name : "학생") + "의 임시 비밀번호를 발송했습니다.");
      break;
    }
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
        icon: $("#couponIcon").value || "redeem",
        category: $("#couponCategory")?.value || "특전",
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
      setIconPick("couponIcon", c.icon);
      if ($("#couponCategory")) $("#couponCategory").value = c.category || "특전";
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
      if (typeof bankSelectedIdx === "number" && bankSelectedIdx >= 0 && $("#bankStudentContent")) selectBankStudent(bankSelectedIdx);
      if ($("#sdCoupons") && $("#sdCoupons").offsetParent) { renderSdCoupons(selected); renderStudentLedger(selected); if ($("#sdBalanceLg")) $("#sdBalanceLg").textContent = students[selected].points; }
      toast(r.student + " 통장에서 " + r.price + "포인트 출금 · 승인 완료");
      break;
    }
    case "promptReject": {
      const target = a.closest(".cd-approve-card, .cd-approve-row, .cd-bank-coupon-item");
      if (!target) break;
      const btnsEl = target.querySelector(".cd-apc-btns, .cd-approve-btns, .cd-bank-coupon-right");
      if (btnsEl) {
        btnsEl.innerHTML = `<div class="cd-reject-form">
          <input type="text" class="form-input" placeholder="반려 사유 (선택)" />
          <button class="btn-sm reject" type="button" data-action="confirmReject" data-i="${a.dataset.i}">반려 확인</button>
          <button class="btn-sm" type="button" data-action="cancelReject">취소</button>
        </div>`;
        btnsEl.querySelector("input")?.focus();
      }
      break;
    }
    case "cancelReject":
      renderApprovalStrip();
      renderHomeOps();
      break;
    case "confirmReject": {
      const idx = +a.dataset.i;
      const r = couponRequests[idx];
      if (!r) break;
      const target = a.closest(".cd-approve-card, .cd-approve-row, .cd-bank-coupon-item");
      const input = target?.querySelector(".cd-reject-form input");
      const reason = input ? input.value.trim() : "";
      const si = students.findIndex((s) => s.name === r.student);
      r.status = "반려됨";
      r.rejectReason = reason;
      if (si >= 0) {
        ledger.unshift({
          time: "방금 전",
          student: r.student,
          type: "반려",
          reason: r.coupon + " 신청 반려" + (reason ? " · " + reason : ""),
          amount: 0,
          balance: students[si].points,
        });
        if (typeof renderStudentLedger === "function" && selected === si) {
          renderStudentLedger(si);
        }
      }
      renderMarket();
      renderApprovalStrip();
      renderHomeOps();
      updateAll();
      if (typeof bankSelectedIdx === "number" && bankSelectedIdx >= 0 && $("#bankStudentContent")) selectBankStudent(bankSelectedIdx);
      if ($("#sdCoupons") && $("#sdCoupons").offsetParent) renderSdCoupons(selected);
      toast("쿠폰 신청을 반려했습니다." + (reason ? " 사유: " + reason : ""));
      break;
    }
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
      if ($("#sdBalance")) $("#sdBalance").textContent = students[selected].points;
      toast(students[selected].name + " 학생에게 " + r.name + " " + n + "p 지급했습니다.");
      break;
    }
    case "regen": {
      if (!aiTryConsume()) break;
      updateAIStudentSelect();
      if ($("#aiStudentSelect")) $("#aiStudentSelect").value = selected;
      if ($("#sdComment")) $("#sdComment").textContent = generateAICommentText();
      toast(`AI 코멘트를 빠르게 생성했습니다. (오늘 ${aiRemaining()}회 남음)`);
      break;
    }

    /* 리포트 */
    case "addReport": {
      if (!studentReports[selected]) studentReports[selected] = { week: [], month: [] };
      const rpts = studentReports[selected][reportPeriod];
      if (rpts.length >= 3) { toast("리포트는 최대 3회까지 작성할 수 있습니다."); break; }
      const list = $("#sdReportList");
      if (!list) break;
      const addBtnEl = $("#addReportBtn");
      if (addBtnEl) addBtnEl.disabled = true;
      const draftText = generateAICommentText ? generateAICommentText() : "";
      list.innerHTML = `<div class="cd-report-write">
        <div class="cd-rpt-write-mode">
          <button class="active btn-sm" type="button" data-rpt-mode="ai">AI 생성</button>
          <button class="btn-sm" type="button" data-rpt-mode="manual">직접 작성</button>
        </div>
        <div class="cd-rpt-write-ai">
          <div class="cd-comment" id="sdRptDraft">${draftText || "빠른 생성을 눌러 AI 코멘트를 불러오세요."}</div>
          <div class="cd-sd-comment-actions">
            <button class="btn-sm" type="button" data-action="regenRpt">빠른 생성</button>
          </div>
        </div>
        <div class="cd-rpt-write-manual" hidden>
          <textarea class="form-textarea" id="sdRptManual" rows="3" placeholder="리포트 내용을 직접 작성해 주세요..."></textarea>
        </div>
        <div class="cd-rpt-write-foot">
          <button class="btn-sm" type="button" data-action="cancelReport">취소</button>
          <button class="btn-sm approve" type="button" data-action="saveReport">저장</button>
        </div>
      </div>` + list.innerHTML.replace('<div class="cd-desc"', '<div hidden class="cd-desc"');
      break;
    }
    case "cancelReport":
      renderReportPane(selected);
      break;
    case "saveReport": {
      if (!studentReports[selected]) studentReports[selected] = { week: [], month: [] };
      const rpts = studentReports[selected][reportPeriod];
      const manual = $("#sdRptManual");
      const draft = $("#sdRptDraft");
      const isManual = manual && !manual.closest(".cd-rpt-write-manual[hidden]");
      const text = (isManual ? manual?.value : draft?.textContent || "").trim();
      if (!text) { toast("내용을 입력해 주세요."); break; }
      const today = new Date();
      rpts.push({
        mode: isManual ? "manual" : "ai",
        text,
        date: `${today.getMonth() + 1}.${today.getDate()}`,
      });
      renderReportPane(selected);
      toast("리포트를 저장했습니다.");
      break;
    }
    case "regenRpt": {
      const draft = $("#sdRptDraft");
      if (draft) draft.textContent = generateAICommentText ? generateAICommentText() : "AI 코멘트 내용입니다.";
      break;
    }

    /* 게시판 */
    case "morning":
      setView("board");
      break;
    case "briefStudents": {
      const expand = $("#briefExpand");
      if (!expand) {
        $("#students")?.closest(".section-box")?.scrollIntoView({ behavior: "smooth", block: "start" });
        break;
      }
      const opening = expand.hidden;
      expand.hidden = !opening;
      if (opening) renderBriefExpand(false);
      break;
    }
    case "briefExpandMore":
      renderBriefExpand(true);
      break;
    case "gotoSeating":
      /* 반 관리 > 자리배치 탭으로 (같은 페이지면 탭 전환) */
      if (document.querySelector('[data-mtabpane="seating"]')) switchManageTab("seating");
      else window.location.href = PAGE_URLS.classmgmt + "#mtab=seating";
      break;
    case "gotoMinigame":
      window.location.href = PAGE_URLS.classmgmt + "#mtab=game";
      break;
    case "briefApprove": {
      const expand = $("#briefApproveExpand");
      if (!expand) break;
      const opening = expand.hidden;
      expand.hidden = !opening;
      if (opening) renderApprovalStrip();
      break;
    }
    case "polish": {
      const n = $("[data-field=notice]");
      if (n) n.value = "오늘은 미술 준비물을 꼭 챙겨 주세요. 세븐닷 학습 후 차분히 수업을 시작하겠습니다.";
      preview();
      toast("문장을 다듬었습니다.");
      break;
    }
    case "draft": {
      const inputs = document.querySelectorAll(".periodInput");
      ["국어", "수학", "과학", "미술", "창체", "체육"].forEach((v, i) => { if (inputs[i]) inputs[i].value = v; });
      const setF = (f, v) => { const el = $(`[data-field=${f}]`); if (el) el.value = v; };
      setF("ready", "국어 공책, 수학 익힘책, 색연필, 풀 준비");
      setF("morning", "세븐닷 오늘 학습 완료 후 독서 10분 하기");
      setF("notice", "오늘은 미술 활동이 있으니 준비물을 꼭 확인해 주세요.");
      preview();
      toast("AI 초안을 생성했습니다.");
      break;
    }
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
      renderBoardLiveCard();
      hide("#boardWriteModal");
      toast("학생 화면에 게시했어요.");
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
    case "stopBoard":
      morningPosts.shift();
      renderMorningPosts();
      toast("게시판을 내렸습니다.");
      break;
    case "openBoardWrite":
      openBoardWrite(a.dataset.i != null && a.dataset.i !== "" ? morningPosts[+a.dataset.i] : null);
      break;
    case "closeBoardWrite":
      hide("#boardWriteModal");
      break;
    case "bankGive": {
      if (bankSelectedIdx < 0) { toast("왼쪽에서 학생을 먼저 선택하세요."); break; }
      const reason = $("#bankGiveReason")?.value || "칭찬";
      addBrick(bankSelectedIdx, "적립", reason, bankGiveAmt);
      if ($("#bankStudentBal")) $("#bankStudentBal").textContent = students[bankSelectedIdx].points;
      renderStudentBankLedger(bankSelectedIdx, bankLedgerFilter);
      renderBankSelectList();
      toast(`${students[bankSelectedIdx].name}에게 +${bankGiveAmt}p 지급했습니다.`);
      break;
    }

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
    case "saveSeating": saveSeating(); break;
    case "toggleSeatCouponUsed": {
      const cri = +a.dataset.cri;
      if (couponRequests[cri]) {
        couponRequests[cri].used = !couponRequests[cri].used;
        renderSeatCoupons();
        toast(couponRequests[cri].used ? couponRequests[cri].student + " 이용권을 사용 처리했어요." : "사용 처리를 취소했어요.");
      }
      break;
    }
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

    /* 홈 탭: 주 단위 네비 */
    case "weekNavPrev":
      weekNavOffset--;
      renderWeeklyCompletion();
      break;
    case "weekNavNext":
      if (weekNavOffset < 0) { weekNavOffset++; renderWeeklyCompletion(); }
      break;

    /* 리포트 탭: 주 단위 네비 */
    case "rptWeekPrev":
      rptWeekOffset--;
      renderRptStudentTable();
      break;
    case "rptWeekNext":
      if (rptWeekOffset < 0) { rptWeekOffset++; renderRptStudentTable(); }
      break;

    /* 리포트 탭: 학생 행 클릭 → 상세 패널 리포트 탭 */
    case "openRptStudent": {
      const ri = +a.dataset.i;
      if (!isNaN(ri)) {
        openStudentDetail._initTab = "report";
        openStudentDetail(ri);
        setStudentTab("report");
      }
      break;
    }

    /* 학생 상세 페이지: 뒤로 가기 */
    case "goBackStudents":
      window.location.href = PAGE_URLS.students;
      break;

    /* 반 전환기 (학원 확장) */
    case "openClassPicker": {
      const m = document.getElementById("classPickerModal");
      if (m) m.style.display = "flex";
      break;
    }
    case "closeClassPicker": {
      const m = document.getElementById("classPickerModal");
      if (m) m.style.display = "none";
      break;
    }
    case "switchClass":
      handleSwitchClass(a.dataset.org, a.dataset.class);
      break;
  }
});

/* 바깥 클릭으로 모달 닫기 */
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal-overlay")) {
    e.target.classList.remove("show");
    e.target.style.display = "none"; // class picker도 닫힘
  }
});


document.addEventListener("input", (e) => {
  if (e.target.matches(".periodInput") || e.target.matches("[data-field]")) preview();
  if (e.target.matches("#goalTitle,#goalTarget")) updateAll();
  if (e.target.matches("#studentSearch")) {
    searchQuery = e.target.value;
    renderStudents();
  }
  if (e.target.matches("#brickSearch")) renderLedger();
  if (e.target.matches("#brickPointTypeFilter")) renderLedger();
  if (e.target.matches("#rosterSearch,#astuClsFilter,#astuStatusFilter")) renderRoster();
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
  if (e.target.matches("#contentSubjectFilter") || e.target.matches("#contentTypeFilter")) renderContentRounds();
  if (e.target.matches("#wsSubjectFilter") || e.target.matches("#wsLevelFilter")) renderWorksheets();
  if (e.target.matches("#lrTypeFilter")) renderLearnReports();
  if (e.target.matches(".cd-ag-base-sel")) { const g = academyGroups[agSelected]; if (g) { g.levels[e.target.dataset.subj] = e.target.value; renderAcademyGroupDetail(); } }
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
  if (tab === "home") { updateAll(); renderWeeklyCompletion(); }
  if (tab === "seating") { if (!seatMap.length && !loadSavedSeatMap()) initSeatMap(); renderSeating(); renderSeatCoupons(); }
  if (tab === "game") { renderLotteryNames(); if (!ladderData) generateLadder(); }
  if (tab === "report") { updateAll(); renderRptStudentTable(); }
  if (tab === "praise") renderPraiseReasons();
  if (tab === "morning") { renderMorningPosts(); makeSchedule(); preview(); }
  /* 해시로 탭 유지 → 새로고침해도 보던 탭 그대로 */
  if (document.querySelector(`[data-mtabpane="${tab}"]`)) history.replaceState(null, "", "#mtab=" + tab);
}

function switchGameTab(tab) {
  document.querySelectorAll("[data-game]").forEach((b) => b.classList.toggle("active", b.dataset.game === tab));
  document.querySelectorAll("[data-gamepane]").forEach((p) => p.classList.toggle("active", p.dataset.gamepane === tab));
  /* 사다리: 숨겨진 상태에서 그려지면 폭이 틀어지므로, 탭이 보일 때 올바른 폭으로 다시 그림.
     동기 호출 — active 토글 직후 offsetWidth 읽기가 강제 reflow를 일으켜 보이는 폭을 정확히 반영 */
  if (tab === "ladder") {
    if (!ladderData) generateLadder();
    else drawLadder(ladderHighlight);
  }
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
        <div class="cd-sc-top"><span class="cd-sc-num">${s.classNum ?? si + 1}</span></div>
        <div class="cd-sc-name">${s.name}</div>
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

/* ----- 자리 이용권 사용 현황 (자리배치 탭) ----- */
function renderSeatCoupons() {
  const tbody = $("#seatCouponRows");
  if (!tbody) return;
  const rows = couponRequests
    .map((r, ri) => ({ r, ri }))
    .filter(({ r }) => SEAT_COUPON_RE.test(r.coupon));
  if (!rows.length) {
    tbody.innerHTML = '<tr><td colspan="4" class="cd-desc" style="padding:18px;text-align:center">자리 이용권을 구매한 학생이 아직 없어요.</td></tr>';
    if ($("#seatCouponCount")) $("#seatCouponCount").textContent = "0명";
    return;
  }
  tbody.innerHTML = rows
    .map(({ r, ri }) => {
      const stu = students.find((s) => s.name === r.student);
      const no = stu ? stu.classNum + "번" : "";
      const buyCls = r.status === "승인" ? "success" : "warning";
      const buyTxt = r.status === "승인" ? "사용 가능" : "승인 대기";
      const pending = r.status !== "승인";
      const usedBadge = r.used
        ? '<span class="badge neutral">사용 완료</span>'
        : pending
          ? '<span class="cd-desc">-</span>'
          : '<span class="badge info">미사용</span>';
      const actionBtn = pending
        ? '<button class="btn-sm" type="button" disabled>승인 필요</button>'
        : r.used
          ? `<button class="btn-sm" type="button" data-action="toggleSeatCouponUsed" data-cri="${ri}">사용 취소</button>`
          : `<button class="btn-sm primary" type="button" data-action="toggleSeatCouponUsed" data-cri="${ri}">사용 처리</button>`;
      return `<tr>
        <td><b>${r.student}</b> <span class="cd-desc">${no}</span></td>
        <td>${r.coupon}</td>
        <td><span class="badge ${buyCls}">${buyTxt}</span></td>
        <td class="right"><span class="cd-seat-coupon-use">${usedBadge}${actionBtn}</span></td>
      </tr>`;
    })
    .join("");
  if ($("#seatCouponCount")) $("#seatCouponCount").textContent = rows.length + "명";
}

/* ----- 자리 저장 → 홈 '자리순'과 연계 (sessionStorage) ----- */
function saveSeating() {
  try {
    sessionStorage.setItem("cd_seatmap", JSON.stringify({ cols: seatCols, rows: seatRows, map: seatMap }));
  } catch (e) {}
  toast("자리가 저장됐어요. 반 홈 '자리순'에 반영됩니다.");
}
function loadSavedSeatMap() {
  try {
    const raw = sessionStorage.getItem("cd_seatmap");
    if (!raw) return false;
    const d = JSON.parse(raw);
    if (!d || !Array.isArray(d.map)) return false;
    seatCols = d.cols || seatCols;
    seatRows = d.rows || seatRows;
    seatMap = d.map;
    if ($("#seatCols")) $("#seatCols").value = seatCols;
    if ($("#seatRows")) $("#seatRows").value = seatRows;
    return true;
  } catch (e) {
    return false;
  }
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
/* 모션 줄이기 OS 설정이면 연출 생략(즉시 렌더) → '연출 끄기'를 자동 제공 */
function reduceMotion() {
  return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
}
let teamsRunning = false;
function buildTeams() {
  const n = parseInt($("#teamCount")?.value || 3);
  const shuffled = [...students].sort(() => Math.random() - 0.5);
  const teams = Array.from({ length: n }, () => []);
  shuffled.forEach((s, i) => teams[i % n].push(s));
  return teams;
}
function teamCardsHTML(teams, ph) {
  return `<div class="cd-teams-grid">${teams
    .map(
      (team, i) => `<div class="cd-team-card" data-team="${i}">
        <div class="cd-team-head">${i + 1}팀 <span class="cd-desc">${team.length}명</span></div>
        <div class="cd-team-members">${team
          .map((s) => (ph ? `<div class="cd-team-member ph"></div>` : `<div class="cd-team-member">${s.name}</div>`))
          .join("")}</div>
      </div>`
    )
    .join("")}</div>`;
}
function renderTeamsInstant(teams) {
  const c = $("#teamsResult");
  if (c) c.innerHTML = teamCardsHTML(teams, false);
}
function runTeams() {
  if (teamsRunning) return;
  const c = $("#teamsResult");
  if (!c) return;
  const teams = buildTeams();
  if (reduceMotion()) { renderTeamsInstant(teams); return; }
  animateTeams(teams);
}
function animateTeams(teams) {
  teamsRunning = true;
  const c = $("#teamsResult");
  c.innerHTML = `<div class="cd-teams-rolling">팀을 섞는 중<span class="cd-dots">.</span></div>` + teamCardsHTML(teams, true);
  const slots = [...c.querySelectorAll(".cd-team-member")];
  const dots = c.querySelector(".cd-dots");
  const finalNames = [];
  teams.forEach((team) => team.forEach((s) => finalNames.push(s.name)));
  const pool = students.map((s) => s.name);
  const dotSeq = [".", "..", "..."];
  let frame = 0;
  const rollFrames = 18;
  const roll = setInterval(() => {
    slots.forEach((el) => { el.textContent = pool[Math.floor(Math.random() * pool.length)]; });
    if (dots) dots.textContent = dotSeq[frame % 3];
    frame++;
    if (frame >= rollFrames) { clearInterval(roll); settleTeams(c, slots, finalNames); }
  }, 70);
}
function settleTeams(c, slots, finalNames) {
  const total = slots.length;
  const step = Math.max(45, Math.round(1100 / total));
  let k = 0;
  const settle = setInterval(() => {
    if (k >= total) {
      clearInterval(settle);
      const rolling = c.querySelector(".cd-teams-rolling");
      if (rolling) rolling.remove();
      c.querySelectorAll(".cd-team-card").forEach((card) => card.classList.add("done"));
      teamsRunning = false;
      return;
    }
    const el = slots[k];
    el.textContent = finalNames[k];
    el.classList.remove("ph");
    el.classList.add("settle");
    k++;
  }, step);
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

/* 사다리 한 경로의 정점 배열 [x,y] (rungs를 따라 좌/우 이동) */
function ladderPathPoints(startCol, xs, rowH, H, rowCount, rungs) {
  const pts = [[xs[startCol], 0]];
  let col = startCol;
  for (let r = 0; r < rowCount; r++) {
    const y = rowH * (r + 1);
    pts.push([xs[col], y]);
    if (rungs[r].includes(col)) { col++; pts.push([xs[col], y]); }
    else if (rungs[r].includes(col - 1)) { col--; pts.push([xs[col], y]); }
  }
  pts.push([xs[col], H]);
  return pts;
}

/* drawLadder(highlight[, animProgress])
   - animProgress 미지정(undefined): 기존과 100% 동일(전체 경로) → switchGameTab/generateLadder 1인자 호출 무회귀
   - animProgress 0~1: highlight 경로를 누적길이 비율까지만 그리고 끝점에 진행 점 표시 */
function drawLadder(highlight, animProgress) {
  const canvas = $("#ladderCanvas");
  if (!canvas || !ladderData) return;
  const { n, rungs, rowCount } = ladderData;
  const W = canvas.parentElement?.offsetWidth || 640;
  const H = 240;
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, W, H);
  ctx.lineJoin = "round"; ctx.lineCap = "round";

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

  const strokePath = (startCol, color, width, progress) => {
    const pts = ladderPathPoints(startCol, xs, rowH, H, rowCount, rungs);
    const seg = [];
    let total = 0;
    for (let i = 1; i < pts.length; i++) { const l = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(l); total += l; }
    const target = progress == null ? total : total * progress;
    ctx.strokeStyle = color; ctx.lineWidth = width;
    ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]);
    let acc = 0, end = pts[0];
    for (let i = 1; i < pts.length; i++) {
      const l = seg[i - 1];
      if (acc + l <= target) { ctx.lineTo(pts[i][0], pts[i][1]); acc += l; end = pts[i]; }
      else { const t = l ? (target - acc) / l : 0; end = [pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * t, pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * t]; ctx.lineTo(end[0], end[1]); break; }
    }
    ctx.stroke();
    return end;
  };

  ladderRevealed.forEach((s) => { if (s !== highlight) strokePath(s, "rgba(0,157,91,0.22)", 2); });
  if (highlight >= 0) {
    const end = strokePath(highlight, "#009d5b", 3.5, animProgress);
    if (animProgress != null && animProgress < 1) {
      ctx.fillStyle = "#009d5b"; ctx.beginPath(); ctx.arc(end[0], end[1], 5, 0, Math.PI * 2); ctx.fill();
    }
  }
}

let ladderAnimating = false;
let ladderTimer = null;
function finishCurrentLadderAnim() {
  if (ladderTimer) { clearInterval(ladderTimer); ladderTimer = null; }
  ladderAnimating = false;
}
/* 경로를 위→아래로 점이 따라 내려가는 애니메이션.
   setInterval 기반(타이머는 페인트와 무관하게 발동 → 백그라운드/프리뷰에서도 멈추지 않음).
   탭이 보일 때(offsetWidth>0)만 애니, 아니면 즉시 완료 */
function animateLadderPath(startCol, speed, onDone) {
  const canvas = $("#ladderCanvas");
  if (!canvas || !ladderData || !canvas.offsetWidth) { drawLadder(startCol); if (onDone) onDone(); return; }
  const dur = 850 / (speed || 1);
  const stepMs = 16;
  const steps = Math.max(1, Math.round(dur / stepMs));
  let k = 0;
  ladderAnimating = true;
  if (ladderTimer) clearInterval(ladderTimer);
  ladderTimer = setInterval(() => {
    k++;
    const t = Math.min(1, k / steps);
    drawLadder(startCol, t);
    if (t >= 1) {
      clearInterval(ladderTimer); ladderTimer = null;
      ladderAnimating = false;
      drawLadder(startCol);
      if (onDone) onDone();
    }
  }, stepMs);
}

function showLadderResult(i) {
  const dest = ladderData.destinations[i];
  const res = $("#ladderResults");
  if (res) res.innerHTML = `<div class="cd-ladder-reveal"><b>${ladderData.names[i]}</b> <span class="muted">→</span> <span class="badge success">${ladderData.prizes[dest]}</span></div>`;
  document.querySelectorAll(".cd-ladder-name").forEach((btn, idx) => {
    btn.classList.toggle("traced", ladderRevealed.has(idx));
    btn.classList.toggle("active", idx === i);
  });
}

function clickLadderName(i) {
  if (!ladderData) return;
  if (reduceMotion()) {
    ladderHighlight = i; ladderRevealed.add(i); drawLadder(i); showLadderResult(i); return;
  }
  if (ladderAnimating) {
    finishCurrentLadderAnim();
    if (ladderHighlight >= 0) ladderRevealed.add(ladderHighlight);
  }
  ladderHighlight = i;
  document.querySelectorAll(".cd-ladder-name").forEach((btn, idx) => btn.classList.toggle("active", idx === i));
  const speed = parseFloat($("#ladderSpeed")?.value || 1);
  animateLadderPath(i, speed, () => { ladderRevealed.add(i); drawLadder(i); showLadderResult(i); });
}

function revealAllLadder() {
  if (!ladderData) return;
  const res = $("#ladderResults");
  if (reduceMotion()) {
    ladderData.names.forEach((_, i) => ladderRevealed.add(i));
    ladderHighlight = -1; drawLadder(-1);
    if (res) res.innerHTML = `<div class="cd-ladder-reveal-all">${ladderData.names.map((name, i) => {
      const dest = ladderData.destinations[i];
      return `<div class="cd-ladder-result-row"><b>${name}</b> <span class="muted">→</span> <span class="badge success">${ladderData.prizes[dest]}</span></div>`;
    }).join("")}</div>`;
    document.querySelectorAll(".cd-ladder-name").forEach((btn) => btn.classList.add("traced"));
    return;
  }
  if (ladderAnimating) finishCurrentLadderAnim();
  const pending = ladderData.names.map((_, i) => i).filter((i) => !ladderRevealed.has(i));
  if (res) res.innerHTML = `<div class="cd-ladder-reveal-all"></div>`;
  const wrap = res ? res.querySelector(".cd-ladder-reveal-all") : null;
  const speed = parseFloat($("#ladderSpeed")?.value || 1) * 1.4;
  const next = () => {
    if (!pending.length) { ladderHighlight = -1; drawLadder(-1); return; }
    const i = pending.shift();
    ladderHighlight = i;
    document.querySelectorAll(".cd-ladder-name").forEach((btn, idx) => btn.classList.toggle("active", idx === i));
    animateLadderPath(i, speed, () => {
      ladderRevealed.add(i);
      const dest = ladderData.destinations[i];
      if (wrap) wrap.insertAdjacentHTML("beforeend", `<div class="cd-ladder-result-row"><b>${ladderData.names[i]}</b> <span class="muted">→</span> <span class="badge success">${ladderData.prizes[dest]}</span></div>`);
      const b = document.querySelector(`.cd-ladder-name[data-ladi="${i}"]`);
      if (b) b.classList.add("traced");
      drawLadder(ladderHighlight);
      next();
    });
  };
  next();
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

/* 학생 상세 페이지로 이동 (sessionStorage로 인덱스·초기탭 전달) */
function navigateToStudentDetail(i, tab) {
  try {
    sessionStorage.setItem("cd_detail_i", i);
    if (tab) sessionStorage.setItem("cd_detail_tab", tab);
    else sessionStorage.removeItem("cd_detail_tab");
  } catch (e) {}
  window.location.href = "classroom_student_detail.html";
}

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
renderGoalContribRank();
updateAILimitUI();
setView(CURRENT_PAGE);
