/* ============================================================================
   세븐닷 반 대시보드 - 공통 모달 셸
   ----------------------------------------------------------------------------
   [배경]
   모달 11종이 페이지 10개에 복사·붙여넣기로 흩어져 있어 버전이 서로 어긋났다
   (학생 상세 모달이 페이지마다 3가지 버전이던 문제). 여기 한 벌만 정의하고
   모든 페이지에 주입해 단일 소스로 관리한다.

   [사용법]
   classroom_dashboard.js 보다 먼저 로드:
     <script src="../common/classroom-modals.js"></script>
     <script src="../js/classroom_dashboard.js"></script>

   [포함 모달]
   studentDetailModal  학생 상세 (학습 결과 / 포인트 통장 / 리포트)
   goalModal           공동목표 설정
   morningViewModal    게시판 게시글 보기
   brickGiveModal      포인트머니 지급
   bonusModal          전체 보너스 지급
   aiCommentModal      AI 코멘트 생성
   praiseReasonModal   칭찬 사유 관리
   orgModal            기관 정보
   studentModal        학생 등록·수정
   bulkModal           학생 일괄 등록
   couponModal         쿠폰 등록 (쿠폰 아이콘만 이모지 예외)
   ============================================================================ */

(function () {
  var MODALS_HTML = `
    <!-- 학생 상세 사이드 패널 -->
    <div class="cd-sp-overlay" id="studentDetailModal">
      <div class="cd-side-panel">

        <!-- 패널 헤더: 아바타 + 이름/뱃지 + 잔액 + 이전/다음 + 닫기 -->
        <div class="cd-sp-head">
          <div class="cd-sd-avatar" id="sdAvatar"></div>
          <div class="cd-sd-hero-info">
            <div class="cd-student-name" id="sdName"></div>
            <div id="sdTags"></div>
          </div>
          <div class="cd-sd-balance-chip">
            <span class="cd-sd-bc-lbl">포인트 잔액</span>
            <b><span id="sdBalance">0</span><small>p</small></b>
          </div>
          <div class="cd-sp-nav">
            <button type="button" data-action="sdPrev" title="이전 학생 (←)"><span class="material-symbols-outlined">chevron_left</span></button>
            <span class="cd-sp-pos" id="sdTitle"></span>
            <button type="button" data-action="sdNext" title="다음 학생 (→)"><span class="material-symbols-outlined">chevron_right</span></button>
          </div>
          <button class="cd-sp-fullbtn" type="button" data-action="openFullDetail" title="전체 화면으로 보기"><span class="material-symbols-outlined">open_in_full</span> 상세 보기</button>
          <button class="cd-sp-close" type="button" data-action="closeStudentDetail">×</button>
        </div>

        <!-- 메인 탭 -->
        <div class="tab-pills cd-modal-tabs" id="sdTabs">
          <button class="active" type="button" data-sdtab="learning"><span class="material-symbols-outlined">menu_book</span> 학습 현황</button>
          <button type="button" data-sdtab="brick"><span class="material-symbols-outlined">workspace_premium</span> 포인트</button>
          <button type="button" data-sdtab="report"><span class="material-symbols-outlined">summarize</span> 리포트</button>
          <button type="button" data-sdtab="account"><span class="material-symbols-outlined">manage_accounts</span> 계정정보</button>
        </div>

        <div class="cd-sp-body cd-sd-panes">

          <!-- ── 탭1: 학습 현황 ── -->
          <div class="cd-sd-pane active" data-sdpane="learning">
            <div class="cd-sd-sub-tabs" id="sdLearningPeriod">
              <button class="active" type="button" data-period="today">오늘 학습</button>
              <button type="button" data-period="week">이번 주</button>
              <button type="button" data-period="month">이번 달</button>
            </div>
            <div data-period-pane="today">
              <div class="cd-day-nav">
                <button type="button" data-action="sdDayPrev" class="cd-day-nav-btn" title="이전 날짜"><span class="material-symbols-outlined">chevron_left</span></button>
                <span id="sdDayLabel" class="cd-day-nav-label"></span>
                <button type="button" data-action="sdDayNext" class="cd-day-nav-btn" id="sdDayNextBtn" title="다음 날짜"><span class="material-symbols-outlined">chevron_right</span></button>
              </div>
              <div class="cd-learning-cards" id="sdLearningCards"></div>
            </div>
            <div data-period-pane="week" hidden>
              <div class="cd-sd-stat-row">
                <div class="cd-sd-stat" data-stat="days">
                  <span class="cd-sd-stat-ico material-symbols-outlined">calendar_today</span>
                  <span class="cd-sd-stat-v" id="sdWeekDays">-</span>
                  <span class="cd-sd-stat-k">학습일</span>
                </div>
                <div class="cd-sd-stat" data-stat="pts">
                  <span class="cd-sd-stat-ico material-symbols-outlined">workspace_premium</span>
                  <span class="cd-sd-stat-v" id="sdWeekPts">-</span>
                  <span class="cd-sd-stat-k">획득 포인트</span>
                </div>
                <div class="cd-sd-stat" data-stat="gold">
                  <span class="cd-sd-stat-ico material-symbols-outlined">military_tech</span>
                  <span class="cd-sd-stat-v" id="sdWeekGold">-</span>
                  <span class="cd-sd-stat-k">골드 브릭</span>
                </div>
              </div>
              <div class="cd-sd-week-days" id="sdWeekDayBar"></div>
              <div class="cd-sd-schedule" id="sdWeekSchedule"></div>
            </div>
            <div data-period-pane="month" hidden>
              <div class="cd-month-nav">
                <button type="button" data-action="sdMonthPrev"><span class="material-symbols-outlined">chevron_left</span></button>
                <span id="sdMonthLabel" class="cd-month-nav-label"></span>
                <button type="button" data-action="sdMonthNext"><span class="material-symbols-outlined">chevron_right</span></button>
              </div>
              <div class="cd-month-stat-cards" id="sdMonthSummary"></div>
              <div class="cd-sd-month-cal" id="sdMonthCal"></div>
              <div class="cd-sd-month-legend" id="sdMonthSubjChips"></div>
            </div>
          </div>

          <!-- ── 탭2: 포인트 ── -->
          <div class="cd-sd-pane" data-sdpane="brick">
            <div class="cd-sd-balance-card">
              <div class="cd-sd-bc-label">포인트 잔액</div>
              <div class="cd-sd-bc-value"><span id="sdBalanceLg">0</span><small>p</small></div>
              <div class="cd-sd-bc-week" id="sdWeekEarned">이번 주 획득 포인트 계산 중</div>
              <div class="cd-sd-bc-contrib" id="sdGoalContrib"></div>
            </div>
            <div class="cd-sd-section">
              <div class="cd-paneltitle">포인트 지급 <button class="cd-link" type="button" data-action="openPraiseReasonManage">칭찬 사유 관리 →</button></div>
              <div class="cd-reasons" id="praiseReasons"></div>
              <div class="cd-give-bar">
                <div class="cd-give-row">
                  <div class="cd-stepper"><button type="button" data-step="-">-</button><span id="giveAmount">5</span><button type="button" data-step="+">+</button></div>
                  <button class="btn primary" type="button" data-action="give" id="giveBtn">+5 포인트 지급</button>
                </div>
              </div>
            </div>
            <div class="cd-sd-section">
              <div class="cd-paneltitle">신청·보유 쿠폰 <span class="muted" id="sdCouponCount"></span></div>
              <div class="cd-bank-coupon-list" id="sdCoupons"></div>
            </div>
            <div class="cd-sd-section">
              <div class="cd-paneltitle">받은 칭찬</div>
              <div id="sdPraiseHistory"></div>
            </div>
            <div class="cd-sd-section">
              <div class="cd-paneltitle">내역
                <div class="cd-sd-ledger-filter">
                  <button class="active" type="button" data-ledger-filter="all">전체</button>
                  <button type="button" data-ledger-filter="적립">적립</button>
                  <button type="button" data-ledger-filter="사용">사용</button>
                </div>
              </div>
              <div class="cd-ledger-list" id="sdLedger"></div>
            </div>
          </div>

          <!-- ── 탭3: 리포트 ── -->
          <div class="cd-sd-pane" data-sdpane="report">
            <!-- 주간 / 월간 토글 -->
            <div class="cd-sd-sub-tabs">
              <button class="active" type="button" data-report-period="week">주간</button>
              <button type="button" data-report-period="month">월간</button>
            </div>

            <!-- 핵심 지표 (4개) -->
            <div class="cd-report-stats">
              <div class="cd-rs-card" data-metric="done">
                <span class="cd-rs-ico material-symbols-outlined">task_alt</span>
                <span class="cd-rs-v" id="sdRptDone">-</span>
                <span class="cd-rs-k">학습완료율</span>
              </div>
              <div class="cd-rs-card" data-metric="days">
                <span class="cd-rs-ico material-symbols-outlined">calendar_today</span>
                <span class="cd-rs-v" id="sdRptDays">-</span>
                <span class="cd-rs-k">학습일수</span>
              </div>
              <div class="cd-rs-card" data-metric="pts">
                <span class="cd-rs-ico material-symbols-outlined">workspace_premium</span>
                <span class="cd-rs-v" id="sdRptPts">-</span>
                <span class="cd-rs-k">획득 포인트</span>
              </div>
              <div class="cd-rs-card" data-metric="praise">
                <span class="cd-rs-ico material-symbols-outlined">thumb_up</span>
                <span class="cd-rs-v" id="sdRptPraise">-</span>
                <span class="cd-rs-k">받은 칭찬</span>
              </div>
            </div>

            <!-- 학습 보고서 -->
            <div class="cd-sd-section" style="margin-top:16px">
              <div class="cd-rpt-header">
                <span class="cd-paneltitle">학습 보고서</span>
                <span class="cd-desc" id="sdGrowthPeriod">5월 → 6월 · 과목별</span>
              </div>
              <div class="cd-growth-highlight" id="sdGrowthHighlight"></div>
              <div class="cd-growth-subjects" id="sdGrowthSubjects"></div>
              <p class="cd-desc" style="margin-top:8px;font-size:14px">* 세븐닷 주간/월간 학습 보고서(진도·회차·일별 학습) + 숙련도(정답·오답·브릭) 데이터 연동 — 현재는 예시 데이터</p>
            </div>

            <!-- 리포트 작성 슬롯 (최대 3회) -->
            <div class="cd-rpt-header">
              <span class="cd-paneltitle">리포트</span>
              <span class="cd-rpt-count muted" id="sdRptCount">0 / 3</span>
              <button class="btn-sm" type="button" data-action="addReport" id="addReportBtn">+ 작성</button>
            </div>
            <div class="cd-report-list" id="sdReportList">
              <div class="cd-desc" style="padding:10px 0">아직 작성된 리포트가 없습니다.</div>
            </div>

            <!-- 받은 칭찬 -->
            <div class="cd-sd-section" style="margin-top:16px">
              <div class="cd-paneltitle">받은 칭찬</div>
              <div class="cd-praise-list" id="praiseList"></div>
            </div>
          </div>

          <!-- ── 탭4: 계정정보 ── -->
          <div class="cd-sd-pane" data-sdpane="account">
          <div class="cd-detail-col-main">

            <!-- 학원 전용: 소속 반 + 수강료 결제 내역 -->
            <div class="section-box" id="sdAcademyBox" hidden>
              <div class="section-head"><div class="title">학원 정보</div></div>
              <div class="section-body">
                <div class="cd-sd-grouprow">소속 반 <b id="sdGroup">-</b></div>
                <div class="cd-bank-sub-title" style="margin-top:14px">수강료 결제 내역</div>
                <div class="tbl"><table class="tbl">
                  <thead><tr><th>월</th><th class="right">수강료</th><th class="center">납부일</th><th class="center">상태</th></tr></thead>
                  <tbody id="sdPayments"></tbody>
                </table></div>
              </div>
            </div>

            <!-- 기본 정보 -->
            <div class="section-box">
              <div class="section-head"><div class="title">기본 정보</div></div>
              <div class="section-body">
                <div class="cd-acct-grid">
                  <div class="cd-acct-field">
                    <label class="cd-acct-label">이름</label>
                    <input class="form-input" id="acctName" type="text" />
                  </div>
                  <div class="cd-acct-field">
                    <label class="cd-acct-label">번호</label>
                    <input class="form-input" id="acctClassNum" type="number" min="1" max="50" />
                  </div>
                  <div class="cd-acct-field">
                    <label class="cd-acct-label">학년</label>
                    <select class="form-input" id="acctGrade">
                      <option>초1</option><option>초2</option><option>초3</option>
                      <option>초4</option><option>초5</option><option>초6</option>
                      <option>중1</option><option>중2</option><option>중3</option>
                    </select>
                  </div>
                  <div class="cd-acct-field">
                    <label class="cd-acct-label">생년월일</label>
                    <input class="form-input" id="acctBirth" type="date" />
                  </div>
                </div>
              </div>
            </div>

            <!-- 계정 정보 -->
            <div class="section-box">
              <div class="section-head"><div class="title">계정</div></div>
              <div class="section-body">
                <div class="cd-acct-grid">
                  <div class="cd-acct-field">
                    <label class="cd-acct-label">로그인 ID</label>
                    <input class="form-input" id="acctLoginId" type="text" placeholder="이메일 또는 아이디" />
                  </div>
                  <div class="cd-acct-field">
                    <label class="cd-acct-label">상태</label>
                    <select class="form-input" id="acctStatus">
                      <option value="정상이용">정상이용</option>
                      <option value="일시정지">일시정지</option>
                      <option value="탈퇴">탈퇴</option>
                    </select>
                  </div>
                  <div class="cd-acct-field">
                    <label class="cd-acct-label">이용기간 시작</label>
                    <input class="form-input" id="acctStart" type="date" />
                  </div>
                  <div class="cd-acct-field">
                    <label class="cd-acct-label">이용기간 종료</label>
                    <input class="form-input" id="acctEnd" type="date" />
                  </div>
                </div>
                <button class="btn-sm" type="button" data-action="resetStudentPw" style="margin-top:12px">
                  <span class="material-symbols-outlined" style="font-size:15px;vertical-align:-3px">lock_reset</span>
                  비밀번호 초기화
                </button>
              </div>
            </div>

            <!-- 학부모 정보 -->
            <div class="section-box">
              <div class="section-head"><div class="title">학부모</div></div>
              <div class="section-body">
                <div class="cd-acct-grid cd-acct-grid-1col">
                  <div class="cd-acct-field">
                    <label class="cd-acct-label">이름</label>
                    <input class="form-input" id="acctParentName" type="text" />
                  </div>
                  <div class="cd-acct-field">
                    <label class="cd-acct-label">연락처</label>
                    <input class="form-input" id="acctParentPhone" type="tel" placeholder="010-0000-0000" />
                  </div>
                  <div class="cd-acct-field">
                    <label class="cd-acct-label">메모</label>
                    <textarea class="form-input cd-acct-memo" id="acctMemo" rows="2" placeholder="교사 메모 (학생에게 비공개)"></textarea>
                  </div>
                </div>
              </div>
            </div>

          </div><!-- /cd-detail-col-main -->

            <!-- 저장 + 삭제 -->
            <div class="cd-acct-foot">
              <button class="btn-sm reject" type="button" data-action="deleteStudentFromDetail">학생 삭제</button>
              <span style="flex:1"></span>
              <button class="btn primary" type="button" data-action="saveStudentAccount">저장</button>
            </div>

          </div>

        </div>
      </div>
    </div>

    <!-- 공동목표 -->
    <div class="modal-overlay" id="goalModal">
      <div class="modal">
        <div class="modal-head">
          <div class="title">우리 반 공동목표 설정</div>
          <button class="close" type="button" data-action="goalClose">×</button>
        </div>
        <div class="modal-body cd-bw-body">
          <div class="cd-bw-sect">
            <div class="cd-bw-sect-head">
              <span class="material-symbols-outlined">flag</span>
              <span>목표 내용</span>
            </div>
            <div class="cd-bw-sect-body">
              <div class="cd-bw-field">
                <label class="cd-bw-label">목표명</label>
                <input class="form-input" id="goalTitle" value="서로 칭찬하고 함께 성장하기" />
              </div>
              <div class="cd-bw-field">
                <label class="cd-bw-label">달성 보상</label>
                <input class="form-input" value="금요일 5분 놀이 시간" />
              </div>
            </div>
          </div>
          <div class="cd-bw-sect">
            <div class="cd-bw-sect-head">
              <span class="material-symbols-outlined">track_changes</span>
              <span>수치 · 기간</span>
            </div>
            <div class="cd-bw-sect-body">
              <div class="cd-bw-2col-eq">
                <div class="cd-bw-field">
                  <label class="cd-bw-label">목표 포인트머니</label>
                  <input class="form-input" id="goalTarget" type="number" value="2240" />
                </div>
                <div class="cd-bw-field">
                  <label class="cd-bw-label">현재 달성 <span class="cd-desc" style="font-weight:400">(자동)</span></label>
                  <input class="form-input" id="goalCurrent" readonly />
                </div>
              </div>
              <div class="cd-bw-field">
                <label class="cd-bw-label">목표 기간</label>
                <div style="display:flex;align-items:center;gap:8px">
                  <input type="date" id="goalStartDate" class="form-input" style="flex:1" />
                  <span style="color:var(--c-muted);font-size:14px;flex-shrink:0">~</span>
                  <input type="date" id="goalEndDate" class="form-input" style="flex:1" />
                </div>
              </div>
              <div class="cd-comment" id="goalPreview" style="margin-top:4px"></div>
            </div>
          </div>
        </div>
        <div class="modal-foot">
          <button class="btn" type="button" data-action="goalReset">진행률 초기화</button>
          <button class="btn primary" type="button" data-action="goalSave">저장</button>
        </div>
      </div>
    </div>

    <!-- 게시판 게시글 보기 -->
    <div class="modal-overlay" id="morningViewModal">
      <div class="modal">
        <div class="modal-head">
          <div>
            <div class="title" id="mvTitle">게시판</div>
            <div class="cd-desc cd-mv-meta" id="mvMeta"></div>
          </div>
          <button class="close" type="button" data-action="closeMorningView">×</button>
        </div>
        <div class="modal-body cd-bw-body">
          <div class="cd-bw-sect">
            <div class="cd-bw-sect-head">
              <span class="material-symbols-outlined">calendar_today</span>
              <span>오늘의 시간표</span>
            </div>
            <div class="cd-bw-sect-body">
              <div class="cd-period-list" id="mvSchedule"></div>
            </div>
          </div>
          <div class="cd-bw-sect">
            <div class="cd-bw-sect-head">
              <span class="material-symbols-outlined">article</span>
              <span>전달 내용</span>
            </div>
            <div class="cd-bw-sect-body">
              <div class="cd-bw-field">
                <div class="cd-bw-label">수업 준비물</div>
                <div id="mvReady" style="font-size:14px;color:var(--c-ink)"></div>
              </div>
              <div class="cd-bw-field">
                <div class="cd-bw-label">아침 활동</div>
                <div id="mvMorning" style="font-size:14px;color:var(--c-ink)"></div>
              </div>
              <div class="cd-bw-field">
                <div class="cd-bw-label">전달 사항</div>
                <div id="mvNotice" style="font-size:14px;color:var(--c-ink)"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-foot">
          <button class="btn" type="button" data-action="closeMorningView">닫기</button>
          <button class="btn primary" type="button" data-action="dupMorningFromView">이 게시글 복제</button>
        </div>
      </div>
    </div>

    <!-- 아침 게시판 작성 -->
    <div class="modal-overlay" id="boardWriteModal">
      <div class="modal cd-board-write-modal">
        <div class="modal-head">
          <div class="title" id="boardWriteTitle">아침 게시판 작성</div>
          <div class="cd-bw-ai">
            <button class="btn-sm" type="button" data-action="draft">AI 초안</button>
            <button class="btn-sm" type="button" data-action="polish">AI 다듬기</button>
          </div>
          <button class="close" type="button" data-action="closeBoardWrite">×</button>
        </div>
        <div class="modal-body cd-bw-body">

          <!-- 섹션 1: 기본 정보 -->
          <div class="cd-bw-sect">
            <div class="cd-bw-sect-head">
              <span class="material-symbols-outlined">edit_document</span>
              <span>기본 정보</span>
              <span class="cd-desc" style="font-weight:400;margin-left:4px">학생이 세븐닷을 열면 가장 먼저 보는 화면이에요</span>
            </div>
            <div class="cd-bw-sect-body">
              <div class="cd-bw-2col">
                <div class="cd-bw-field">
                  <label class="cd-bw-label" for="morningTitle">게시판 제목</label>
                  <input class="form-input" id="morningTitle" type="text" value="오늘의 수업 안내" placeholder="게시판 제목" />
                </div>
                <div class="cd-bw-field">
                  <label class="cd-bw-label" for="morningTarget">발송 대상</label>
                  <select class="form-input" id="morningTarget">
                    <option>전체 학생</option>
                    <option>미완료 학생</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <!-- 섹션 2: 오늘의 시간표 -->
          <div class="cd-bw-sect">
            <div class="cd-bw-sect-head">
              <span class="material-symbols-outlined">calendar_today</span>
              <span>오늘의 시간표</span>
            </div>
            <div class="cd-bw-sect-body">
              <div class="cd-schedule" id="schedule"></div>
            </div>
          </div>

          <!-- 섹션 3: 전달 내용 -->
          <div class="cd-bw-sect">
            <div class="cd-bw-sect-head">
              <span class="material-symbols-outlined">article</span>
              <span>전달 내용</span>
            </div>
            <div class="cd-bw-sect-body">
              <div class="cd-bw-field">
                <label class="cd-bw-label">수업 준비물</label>
                <textarea class="form-textarea cd-board-field" data-field="ready" rows="2" placeholder="예: 국어 공책, 수학 익힘책, 색연필 준비">국어 공책, 수학 익힘책, 색연필 준비</textarea>
              </div>
              <div class="cd-bw-field">
                <label class="cd-bw-label">아침 활동</label>
                <textarea class="form-textarea cd-board-field" data-field="morning" rows="2" placeholder="예: 세븐닷 학습 완료 후 독서 10분 하기">세븐닷 학습 완료 후 독서 10분 하기</textarea>
              </div>
              <div class="cd-bw-field">
                <label class="cd-bw-label">전달 사항</label>
                <textarea class="form-textarea cd-board-field" data-field="notice" rows="2" placeholder="예: 오늘은 미술 준비물을 꼭 챙겨 주세요.">오늘은 미술 준비물을 꼭 챙겨 주세요.</textarea>
              </div>
            </div>
          </div>

        </div>
        <div class="modal-foot">
          <button class="btn" type="button" data-action="closeBoardWrite">닫기</button>
          <button class="btn primary" type="button" data-action="post">학생 화면에 게시하기</button>
        </div>
      </div>
    </div>

    <!-- 세븐닷 콘텐츠 신고·제안 -->
    <div class="modal-overlay" id="contentReportModal">
      <div class="modal">
        <div class="modal-head">
          <div class="title">문항 신고·교정 요청</div>
          <button class="close" type="button" data-action="closeContentReport">×</button>
        </div>
        <div class="modal-body cd-bw-body">
          <div class="cd-bw-sect">
            <div class="cd-bw-sect-head">
              <span class="material-symbols-outlined">report</span>
              <span>신고 대상 문항</span>
            </div>
            <div class="cd-bw-sect-body">
              <div class="cd-content-report-target" id="contentReportTarget"></div>
            </div>
          </div>
          <div class="cd-bw-sect">
            <div class="cd-bw-sect-head">
              <span class="material-symbols-outlined">edit_note</span>
              <span>신고 내용</span>
            </div>
            <div class="cd-bw-sect-body">
              <div class="cd-bw-field">
                <label class="cd-bw-label">유형</label>
                <select class="form-input" id="contentReportType">
                  <option>정답 오류</option>
                  <option>해설 오류</option>
                  <option>오탈자</option>
                  <option>난이도 조정</option>
                  <option>개선 제안</option>
                </select>
              </div>
              <div class="cd-bw-field">
                <label class="cd-bw-label">내용</label>
                <textarea class="form-textarea" id="contentReportDesc" rows="4" placeholder="어떤 점이 문제인지, 또는 어떻게 교정하면 좋을지 적어주세요."></textarea>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-foot">
          <button class="btn" type="button" data-action="closeContentReport">취소</button>
          <button class="btn primary" type="button" data-action="submitContentReport">제출</button>
        </div>
      </div>
    </div>

    <!-- 워크시트 미리보기 (콘텐츠 특성상 섹션 없이 유지) -->
    <div class="modal-overlay" id="worksheetPreviewModal">
      <div class="modal cd-ws-modal">
        <div class="modal-head">
          <div>
            <div class="title" id="wsPreviewTitle">학습지 미리보기</div>
            <div class="cd-desc" id="wsPreviewMeta"></div>
          </div>
          <button class="close" type="button" data-action="closeWorksheet">×</button>
        </div>
        <div class="modal-body">
          <div class="cd-ws-sheet">
            <div class="cd-ws-sheet-head">
              <span>이름 ______________</span>
              <span>날짜 ______________</span>
              <span>점수 ________</span>
            </div>
            <div id="wsPreviewBody"></div>
          </div>
        </div>
        <div class="modal-foot">
          <button class="btn" type="button" data-action="toggleWsAnswer" id="wsAnswerToggle">정답 보기</button>
          <button class="btn primary" type="button" data-action="printWorksheet"><span class="material-symbols-outlined" style="font-size:17px;vertical-align:-3px">print</span> 인쇄</button>
        </div>
      </div>
    </div>

    <!-- 진단 보고서 상세 -->
    <div class="modal-overlay" id="diagnosisModal">
      <div class="modal">
        <div class="modal-head">
          <div>
            <div class="title" id="dgName">진단 보고서</div>
            <div class="cd-desc" id="dgMeta"></div>
          </div>
          <button class="close" type="button" data-action="closeDiagnosis">×</button>
        </div>
        <div class="modal-body cd-bw-body">
          <div class="cd-bw-sect">
            <div class="cd-bw-sect-head">
              <span class="material-symbols-outlined">bar_chart</span>
              <span>과목별 진단 레벨</span>
            </div>
            <div class="cd-bw-sect-body">
              <div class="cd-dg-levels" id="dgLevels"></div>
            </div>
          </div>
          <div class="cd-bw-sect">
            <div class="cd-bw-sect-head">
              <span class="material-symbols-outlined">analytics</span>
              <span>분석 · 권장 학습</span>
            </div>
            <div class="cd-bw-sect-body">
              <div class="cd-bw-field">
                <div class="cd-bw-label">진단 요약</div>
                <p class="cd-dg-p" id="dgSummary"></p>
              </div>
              <div class="cd-bw-field">
                <div class="cd-bw-label">권장 학습</div>
                <p class="cd-dg-p" id="dgRecommend"></p>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-foot">
          <button class="btn" type="button" data-action="closeDiagnosis">닫기</button>
          <button class="btn primary" type="button" data-action="printDoc"><span class="material-symbols-outlined" style="font-size:17px;vertical-align:-3px">print</span> 인쇄</button>
        </div>
      </div>
    </div>

    <!-- 학생 레벨 조정 -->
    <div class="modal-overlay" id="studentLevelModal">
      <div class="modal">
        <div class="modal-head">
          <div class="title" id="slName">학생 레벨 조정</div>
          <button class="close" type="button" data-action="closeStudentLevel">×</button>
        </div>
        <div class="modal-body cd-bw-body">
          <div class="cd-bw-sect">
            <div class="cd-bw-sect-head">
              <span class="material-symbols-outlined">tune</span>
              <span>과목별 레벨</span>
              <span class="cd-desc" style="font-weight:400;margin-left:4px">반 기본 또는 학생 개별로 조정</span>
            </div>
            <div class="cd-bw-sect-body">
              <div id="slRows"></div>
            </div>
          </div>
        </div>
        <div class="modal-foot">
          <button class="btn" type="button" data-action="closeStudentLevel">취소</button>
          <button class="btn primary" type="button" data-action="saveStudentLevel">저장</button>
        </div>
      </div>
    </div>

    <!-- 진단 완료 학생 반 배정 -->
    <div class="modal-overlay" id="assignModal">
      <div class="modal">
        <div class="modal-head">
          <div>
            <div class="title" id="asName">반 배정</div>
            <div class="cd-desc" id="asMeta"></div>
          </div>
          <button class="close" type="button" data-action="closeAssign">×</button>
        </div>
        <div class="modal-body cd-bw-body">
          <div class="cd-bw-sect">
            <div class="cd-bw-sect-head">
              <span class="material-symbols-outlined">group_add</span>
              <span>배정할 반 선택</span>
              <span class="cd-desc" style="font-weight:400;margin-left:4px">진단 레벨이 다르면 배정 후 개별 레벨 조정 가능</span>
            </div>
            <div class="cd-bw-sect-body">
              <div class="cd-bw-field">
                <label class="cd-bw-label">반(그룹)</label>
                <select class="form-input" id="asGroupSel"></select>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-foot">
          <button class="btn" type="button" data-action="closeAssign">취소</button>
          <button class="btn primary" type="button" data-action="saveAssign">배정</button>
        </div>
      </div>
    </div>

    <!-- 지난 공동목표 상세 -->
    <div class="modal-overlay" id="goalPastModal">
      <div class="modal">
        <div class="modal-head">
          <div class="title" id="gpTitle">지난 공동목표</div>
          <button class="close" type="button" data-action="closeGoalPast">×</button>
        </div>
        <div class="modal-body cd-bw-body">
          <div class="cd-bw-sect">
            <div class="cd-bw-sect-head">
              <span class="material-symbols-outlined">emoji_events</span>
              <span>달성 요약</span>
            </div>
            <div class="cd-bw-sect-body" style="padding:0">
              <div class="cd-gp-detail" style="margin:0">
                <div class="cd-gp-row"><span class="cd-gp-k">기간</span><span class="cd-gp-v" id="gpPeriod"></span></div>
                <div class="cd-gp-row"><span class="cd-gp-k">목표 포인트</span><span class="cd-gp-v" id="gpTarget"></span></div>
                <div class="cd-gp-row"><span class="cd-gp-k">달성일</span><span class="cd-gp-v" id="gpAchieved"></span></div>
                <div class="cd-gp-row"><span class="cd-gp-k">참여 인원</span><span class="cd-gp-v" id="gpContributors"></span></div>
                <div class="cd-gp-row"><span class="cd-gp-k">최고 기여</span><span class="cd-gp-v" id="gpTop"></span></div>
                <div class="cd-gp-row"><span class="cd-gp-k">보상</span><span class="cd-gp-v"><span class="badge success" id="gpReward"></span></span></div>
              </div>
              <p class="cd-gp-note" id="gpNote" style="padding:12px 20px"></p>
            </div>
          </div>
        </div>
        <div class="modal-foot">
          <button class="btn primary" type="button" data-action="closeGoalPast">닫기</button>
        </div>
      </div>
    </div>

    <!-- 포인트 지급 -->
    <div class="modal-overlay" id="brickGiveModal">
      <div class="modal">
        <div class="modal-head">
          <div class="title">포인트머니 지급</div>
          <button class="close" type="button" data-action="closeBrickGive">×</button>
        </div>
        <div class="modal-body cd-bw-body">
          <div class="cd-bw-sect">
            <div class="cd-bw-sect-head">
              <span class="material-symbols-outlined">person</span>
              <span>대상 학생</span>
            </div>
            <div class="cd-bw-sect-body">
              <div class="cd-bw-field">
                <label class="cd-bw-label" for="brickGiveStudent">학생 선택</label>
                <select class="form-input" id="brickGiveStudent"></select>
              </div>
            </div>
          </div>
          <div class="cd-bw-sect">
            <div class="cd-bw-sect-head">
              <span class="material-symbols-outlined">payments</span>
              <span>지급 내용</span>
            </div>
            <div class="cd-bw-sect-body">
              <div class="cd-bw-2col-eq">
                <div class="cd-bw-field">
                  <label class="cd-bw-label" for="brickGiveAmount">금액</label>
                  <input class="form-input" id="brickGiveAmount" type="number" value="5" />
                </div>
                <div class="cd-bw-field">
                  <label class="cd-bw-label" for="brickGiveType">구분</label>
                  <select class="form-input" id="brickGiveType">
                    <option>적립</option>
                    <option>공동목표</option>
                  </select>
                </div>
              </div>
              <div class="cd-bw-field">
                <label class="cd-bw-label" for="brickGiveReason">지급 사유</label>
                <select class="form-input" id="brickGiveReason">
                  <option>오늘 학습 완료</option>
                  <option>오답 다시 풀기</option>
                  <option>수업 집중 칭찬</option>
                  <option>친구 도와주기</option>
                  <option>공동목표 기여</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-foot">
          <button class="btn" type="button" data-action="closeBrickGive">취소</button>
          <button class="btn primary" type="button" data-action="saveBrickGive">지급</button>
        </div>
      </div>
    </div>

    <!-- 전체 보너스 -->
    <div class="modal-overlay" id="bonusModal">
      <div class="modal">
        <div class="modal-head">
          <div class="title">전체 보너스 지급</div>
          <button class="close" type="button" data-action="closeBonus">×</button>
        </div>
        <div class="modal-body cd-bw-body">
          <div class="cd-bw-sect">
            <div class="cd-bw-sect-head">
              <span class="material-symbols-outlined">group</span>
              <span>지급 내용</span>
              <span class="cd-desc" style="font-weight:400;margin-left:4px">조건별 학생에게 일괄 지급</span>
            </div>
            <div class="cd-bw-sect-body">
              <div class="cd-bw-field">
                <label class="cd-bw-label" for="bonusTarget">지급 대상</label>
                <select class="form-input" id="bonusTarget">
                  <option>전체 학생</option>
                  <option>오늘 학습 완료 학생</option>
                </select>
              </div>
              <div class="cd-bw-2col-eq">
                <div class="cd-bw-field">
                  <label class="cd-bw-label" for="bonusAmount">보너스 금액</label>
                  <input class="form-input" id="bonusAmount" type="number" value="1" />
                </div>
                <div class="cd-bw-field">
                  <label class="cd-bw-label" for="bonusReason">지급 사유</label>
                  <input class="form-input" id="bonusReason" value="반 전체 보너스" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-foot">
          <button class="btn" type="button" data-action="closeBonus">취소</button>
          <button class="btn primary" type="button" data-action="saveBonus">전체 지급</button>
        </div>
      </div>
    </div>

    <!-- AI 코멘트 생성 -->
    <div class="modal-overlay" id="aiCommentModal">
      <div class="modal cd-modal-lg">
        <div class="modal-head">
          <div class="title">AI 코멘트 생성 <span class="badge info" id="aiLimitBadge">오늘 3 / 3회 남음</span></div>
          <button class="close" type="button" data-action="closeAIComment">×</button>
        </div>
        <div class="modal-body cd-bw-body">
          <div class="cd-bw-sect">
            <div class="cd-bw-sect-head">
              <span class="material-symbols-outlined">settings</span>
              <span>생성 설정</span>
            </div>
            <div class="cd-bw-sect-body">
              <div class="cd-bw-2col-eq">
                <div class="cd-bw-field">
                  <label class="cd-bw-label" for="aiStudentSelect">학생 선택</label>
                  <select class="form-input" id="aiStudentSelect"></select>
                </div>
                <div class="cd-bw-field">
                  <label class="cd-bw-label" for="aiCommentPurpose">코멘트 용도</label>
                  <select class="form-input" id="aiCommentPurpose">
                    <option value="weekly">주간리포트용</option>
                    <option value="praise">칭찬 포인트 지급용</option>
                    <option value="parent">학부모 안내용</option>
                    <option value="student">학생 격려용</option>
                  </select>
                </div>
              </div>
              <div class="cd-bw-field">
                <label class="cd-bw-label">강조할 내용</label>
                <div class="cd-ai-options">
                  <button class="cd-ai-option active" type="button" data-ai-focus="꾸준한 학습 참여">꾸준한 학습 참여</button>
                  <button class="cd-ai-option" type="button" data-ai-focus="오답 다시 풀기">오답 다시 풀기</button>
                  <button class="cd-ai-option" type="button" data-ai-focus="수업 집중">수업 집중</button>
                  <button class="cd-ai-option" type="button" data-ai-focus="친구 도와주기">친구 도와주기</button>
                  <button class="cd-ai-option" type="button" data-ai-focus="포인트머니 성장">포인트머니 성장</button>
                  <button class="cd-ai-option" type="button" data-ai-focus="자기주도 학습">자기주도 학습</button>
                </div>
              </div>
              <div class="cd-bw-field">
                <label class="cd-bw-label">문장 톤</label>
                <div class="cd-head-actions row-start">
                  <button class="btn-sm" type="button" data-action="setAITone" data-tone="따뜻하게">따뜻하게</button>
                  <button class="btn-sm" type="button" data-action="setAITone" data-tone="간단하게">간단하게</button>
                  <button class="btn-sm" type="button" data-action="setAITone" data-tone="학부모용">학부모용</button>
                  <button class="btn-sm" type="button" data-action="setAITone" data-tone="학생 격려용">학생 격려용</button>
                </div>
              </div>
              <div class="cd-bw-field">
                <label class="cd-bw-label">추가 메모</label>
                <textarea class="form-textarea" id="aiCommentMemo" rows="2" placeholder="예: 이번 주 국어 학습을 꾸준히 했고, 오답을 다시 풀었습니다."></textarea>
              </div>
            </div>
          </div>
          <div class="cd-bw-sect">
            <div class="cd-bw-sect-head">
              <span class="material-symbols-outlined">smart_toy</span>
              <span>생성된 코멘트</span>
            </div>
            <div class="cd-bw-sect-body">
              <div class="cd-comment" id="aiGeneratedComment">학생을 선택하고 AI 코멘트 생성을 누르면 문장이 만들어집니다.</div>
              <div class="cd-head-actions gap-t">
                <span class="cd-desc cd-modal-note" id="aiCommentStatus">대기 중</span>
                <button class="btn-sm" type="button" data-action="generateAIComment">코멘트 생성</button>
                <button class="btn-sm" type="button" data-action="applyAIComment">학생 상세 반영</button>
                <button class="btn-sm approve" type="button" data-action="saveAIComment">주간리포트 저장</button>
              </div>
            </div>
          </div>
          <div class="cd-bw-sect">
            <div class="cd-bw-sect-head">
              <span class="material-symbols-outlined">history</span>
              <span>최근 생성 코멘트</span>
            </div>
            <div class="cd-bw-sect-body">
              <div class="cd-ai-history" id="aiCommentHistory"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 칭찬 사유 관리 -->
    <div class="modal-overlay" id="praiseReasonModal">
      <div class="modal cd-modal-lg">
        <div class="modal-head">
          <div class="title">칭찬 사유 관리</div>
          <button class="close" type="button" data-action="closePraiseReasonManage">×</button>
        </div>
        <div class="modal-body">
          <div class="cd-praise-manage">
            <div>
              <div class="cd-paneltitle" style="display:flex;align-items:center;gap:6px;margin-bottom:14px">
                <span class="material-symbols-outlined" style="font-size:17px;color:var(--c-brand)">add_circle</span>
                새 칭찬 사유 등록
              </div>
              <div class="cd-bw-field">
                <label class="cd-bw-label">아이콘</label>
                <input type="hidden" id="newPraiseIcon" value="thumb_up" />
                <div class="cd-icon-pick" data-iconpick="newPraiseIcon">
                  <button type="button" class="active" data-icon="thumb_up"><span class="material-symbols-outlined">thumb_up</span></button>
                  <button type="button" data-icon="chat_bubble"><span class="material-symbols-outlined">chat_bubble</span></button>
                  <button type="button" data-icon="favorite"><span class="material-symbols-outlined">favorite</span></button>
                  <button type="button" data-icon="track_changes"><span class="material-symbols-outlined">track_changes</span></button>
                  <button type="button" data-icon="menu_book"><span class="material-symbols-outlined">menu_book</span></button>
                  <button type="button" data-icon="auto_awesome"><span class="material-symbols-outlined">auto_awesome</span></button>
                  <button type="button" data-icon="handshake"><span class="material-symbols-outlined">handshake</span></button>
                  <button type="button" data-icon="local_fire_department"><span class="material-symbols-outlined">local_fire_department</span></button>
                  <button type="button" data-icon="eco"><span class="material-symbols-outlined">eco</span></button>
                  <button type="button" data-icon="emoji_events"><span class="material-symbols-outlined">emoji_events</span></button>
                </div>
              </div>
              <div class="cd-bw-field">
                <label class="cd-bw-label">지급 포인트</label>
                <input class="form-input" id="newPraiseBrick" type="number" value="5" style="max-width:160px" />
              </div>
              <div class="cd-bw-field">
                <label class="cd-bw-label">칭찬 사유명</label>
                <input class="form-input" id="newPraiseName" placeholder="예: 발표를 잘했어요" />
              </div>
              <div class="cd-bw-field">
                <label class="cd-bw-label">설명 <span class="cd-desc" style="font-weight:400">(선택)</span></label>
                <textarea class="form-textarea" id="newPraiseDesc" rows="3" placeholder="예: 수업 시간에 자신 있게 발표하고 친구들의 생각도 잘 들어주었습니다."></textarea>
              </div>
              <div class="cd-head-actions row-end">
                <button class="btn" type="button" data-action="resetPraiseForm">초기화</button>
                <button class="btn primary" type="button" data-action="savePraiseReason">칭찬 사유 저장</button>
              </div>
            </div>
            <div>
              <div class="cd-paneltitle" style="display:flex;align-items:center;gap:6px;margin-bottom:14px">
                <span class="material-symbols-outlined" style="font-size:17px;color:var(--c-brand)">list</span>
                등록된 칭찬 사유
                <button class="cd-link" type="button" data-action="loadPraiseExamples" style="margin-left:auto">예시 불러오기</button>
              </div>
              <div class="cd-praise-reason-list" id="praiseReasonList"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 기관 정보 -->
    <div class="modal-overlay" id="orgModal">
      <div class="modal">
        <div class="modal-head">
          <div class="title">기관 정보</div>
          <button class="close" type="button" data-action="closeOrgInfo">×</button>
        </div>
        <div class="modal-body cd-bw-body">
          <div class="cd-bw-sect">
            <div class="cd-bw-sect-head">
              <span class="material-symbols-outlined">corporate_fare</span>
              <span>기관</span>
            </div>
            <div class="cd-bw-sect-body">
              <div class="cd-org-hero">
                <span class="cd-org-ico"><span class="material-symbols-outlined">school</span></span>
                <div>
                  <div class="cd-student-name">세븐초등학교</div>
                  <div class="cd-desc">4학년 1반 (4-1)</div>
                </div>
              </div>
            </div>
          </div>
          <div class="cd-bw-sect">
            <div class="cd-bw-sect-head">
              <span class="material-symbols-outlined">info</span>
              <span>상세 정보</span>
            </div>
            <div class="cd-bw-sect-body" style="padding:0">
              <div class="cd-org-list" style="margin:0">
                <div class="cd-org-row"><span>기관 유형</span><b>학교 (B2G)</b></div>
                <div class="cd-org-row"><span>기관 코드</span><b>SCH-7BRICKS-0401</b></div>
                <div class="cd-org-row"><span>담당 교사</span><b>김선생님</b></div>
                <div class="cd-org-row"><span>학생 수</span><b>21명</b></div>
                <div class="cd-org-row"><span>구독 플랜</span><b>학교 단체 · 이용 중</b></div>
                <div class="cd-org-row"><span>개설일</span><b>2026-03-02</b></div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-foot">
          <button class="btn" type="button" data-action="closeOrgInfo">닫기</button>
          <button class="btn primary" type="button" data-action="orgToSettings">기관 설정</button>
        </div>
      </div>
    </div>

    <!-- 학생 등록·수정 -->
    <div class="modal-overlay" id="studentModal">
      <div class="modal">
        <div class="modal-head">
          <div class="title" id="studentModalTitle">학생 등록</div>
          <button class="close" type="button" data-action="closeStudent">×</button>
        </div>
        <div class="modal-body cd-bw-body">
          <div class="cd-bw-sect">
            <div class="cd-bw-sect-head">
              <span class="material-symbols-outlined">lock</span>
              <span>계정 정보</span>
            </div>
            <div class="cd-bw-sect-body">
              <div class="cd-bw-field">
                <label class="cd-bw-label">로그인 아이디(이메일) <span style="color:var(--c-danger)">*</span></label>
                <div style="display:flex;gap:8px">
                  <input class="form-input" id="newStudentLoginId" type="email" placeholder="로그인아이디를 입력하세요." style="flex:1" />
                  <button class="btn" type="button">중복확인</button>
                </div>
              </div>
              <div class="cd-bw-2col-eq">
                <div class="cd-bw-field">
                  <label class="cd-bw-label">비밀번호 <span style="color:var(--c-danger)">*</span></label>
                  <input class="form-input" id="newStudentPw" type="password" placeholder="비밀번호를 입력하세요." />
                </div>
                <div class="cd-bw-field">
                  <label class="cd-bw-label">비밀번호 확인 <span style="color:var(--c-danger)">*</span></label>
                  <input class="form-input" id="newStudentPwConfirm" type="password" placeholder="비밀번호를 입력하세요." />
                </div>
              </div>
            </div>
          </div>
          <div class="cd-bw-sect">
            <div class="cd-bw-sect-head">
              <span class="material-symbols-outlined">person</span>
              <span>학생 정보</span>
            </div>
            <div class="cd-bw-sect-body">
              <div class="cd-bw-2col-eq">
                <div class="cd-bw-field">
                  <label class="cd-bw-label">학생명 <span style="color:var(--c-danger)">*</span></label>
                  <input class="form-input" id="newStudentName" placeholder="학생명을 입력하세요." />
                </div>
                <div class="cd-bw-field">
                  <label class="cd-bw-label">반 번호</label>
                  <input class="form-input" id="newStudentClassNum" type="number" placeholder="숫자만" />
                </div>
              </div>
              <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px">
                <div class="cd-bw-field">
                  <label class="cd-bw-label">생년월일</label>
                  <input class="form-input" id="newStudentBirthDate" type="date" />
                </div>
                <div class="cd-bw-field">
                  <label class="cd-bw-label">학년 <span style="color:var(--c-danger)">*</span></label>
                  <select class="form-input" id="newStudentGrade">
                    <option value="초1">초1</option><option value="초2">초2</option><option value="초3">초3</option>
                    <option value="초4">초4</option><option value="초5">초5</option><option value="초6">초6</option>
                    <option value="중1">중1</option><option value="중2" selected>중2</option><option value="중3">중3</option>
                  </select>
                </div>
                <div class="cd-bw-field">
                  <label class="cd-bw-label">레벨</label>
                  <select class="form-input" id="newStudentLevel">
                    <option value="1-1">1-1</option><option value="1-2">1-2</option>
                    <option value="2-1">2-1</option><option value="2-2">2-2</option>
                    <option value="3-1">3-1</option><option value="3-2">3-2</option>
                    <option value="4-1">4-1</option><option value="4-2">4-2</option>
                    <option value="5-1">5-1</option><option value="5-2">5-2</option>
                    <option value="6-1" selected>6-1</option><option value="6-2">6-2</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div class="cd-bw-sect">
            <div class="cd-bw-sect-head">
              <span class="material-symbols-outlined">family_restroom</span>
              <span>학부모 정보</span>
            </div>
            <div class="cd-bw-sect-body">
              <div class="cd-bw-2col-eq">
                <div class="cd-bw-field">
                  <label class="cd-bw-label">학부모명</label>
                  <input class="form-input" id="newStudentParentName" placeholder="학부모명을 입력하세요." />
                </div>
                <div class="cd-bw-field">
                  <label class="cd-bw-label">전화번호</label>
                  <input class="form-input" id="newStudentParentPhone" type="tel" placeholder="'-' 제외" />
                </div>
              </div>
            </div>
          </div>
          <div class="cd-bw-sect">
            <div class="cd-bw-sect-head">
              <span class="material-symbols-outlined">event</span>
              <span>이용 설정</span>
            </div>
            <div class="cd-bw-sect-body">
              <div class="cd-bw-field">
                <label class="cd-bw-label">이용 기간 <span style="color:var(--c-danger)">*</span></label>
                <div style="display:flex;gap:8px;align-items:center;max-width:400px">
                  <input class="form-input" id="newStudentUsageStart" type="date" value="2026-06-12" style="flex:1" />
                  <span style="color:var(--c-muted);font-weight:500">~</span>
                  <input class="form-input" id="newStudentUsageEnd" type="date" value="2026-12-31" style="flex:1" />
                </div>
              </div>
              <div class="cd-bw-field">
                <label class="cd-bw-label">알림톡 <span style="color:var(--c-danger)">*</span></label>
                <div style="display:flex;gap:24px;padding:9px 0">
                  <label style="display:flex;align-items:center;gap:6px;cursor:pointer;font-weight:500"><input type="radio" name="notificationsR" value="true" checked /> 사용</label>
                  <label style="display:flex;align-items:center;gap:6px;cursor:pointer;font-weight:500"><input type="radio" name="notificationsR" value="false" /> 미사용</label>
                </div>
              </div>
              <div class="cd-bw-field">
                <label class="cd-bw-label">메모</label>
                <textarea class="form-textarea" id="newStudentMemo" rows="3" placeholder="메모를 입력하세요."></textarea>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-foot">
          <button class="btn" type="button" data-action="closeStudent">취소</button>
          <button class="btn primary" type="button" data-action="saveStudent">학생 등록</button>
        </div>
      </div>
    </div>

    <!-- 학생 일괄 등록 -->
    <div class="modal-overlay" id="bulkModal">
      <div class="modal cd-modal-lg">
        <div class="modal-head">
          <div class="title">학생 일괄 등록</div>
          <button class="close" type="button" data-action="closeBulk">×</button>
        </div>
        <div class="modal-body cd-bw-body">
          <div class="cd-bw-sect">
            <div class="cd-bw-sect-head">
              <span class="material-symbols-outlined">upload_file</span>
              <span>파일 업로드</span>
              <span class="cd-desc" style="font-weight:400;margin-left:4px">필수: 이름 · 선택: 아이디, 학년, 레벨, 초기 포인트</span>
            </div>
            <div class="cd-bw-sect-body">
              <div class="cd-bulk-upload-area" id="bulkDropArea">
                <input type="file" id="bulkFileInput" accept=".xlsx,.xls,.csv" style="display:none" />
                <span class="material-symbols-outlined" style="font-size:40px;color:#D1D6DB;">upload_file</span>
                <div style="margin-top:10px;font-weight:600;color:#333D4B;">파일을 끌어다 놓거나 선택하세요</div>
                <div style="margin-top:4px;font-size:14px;color:#8B95A1;">.xlsx &nbsp;·&nbsp; .xls &nbsp;·&nbsp; .csv 지원</div>
                <button class="btn" type="button" style="margin-top:14px;" data-action="pickBulkFile">파일 선택</button>
              </div>
              <div id="bulkPreviewWrap" style="display:none;margin-top:16px;">
                <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">
                  <span class="material-symbols-outlined" style="font-size:18px;color:#009d5b;">check_circle</span>
                  <span id="bulkFileName" style="font-size:14px;color:#333D4B;font-weight:600;"></span>
                  <button class="btn-sm" type="button" data-action="clearBulkFile" style="margin-left:auto;">다시 선택</button>
                </div>
                <div class="section-body tbl">
                  <table class="tbl">
                    <thead><tr><th>이름</th><th>아이디</th><th class="center">학년</th><th class="center">레벨</th><th class="right">초기 포인트</th><th class="center">비고</th></tr></thead>
                    <tbody id="bulkRows"></tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-foot">
          <button class="btn" type="button" data-action="downloadTemplate">서식 파일 내려받기</button>
          <span style="flex:1"></span>
          <span class="cd-desc cd-modal-note">중복 이름은 제외하고 등록됩니다.</span>
          <button class="btn primary" type="button" data-action="saveBulk" id="saveBulkBtn" disabled>일괄 등록</button>
        </div>
      </div>
    </div>

    <!-- 쿠폰 등록 -->
    <div class="modal-overlay" id="couponModal">
      <div class="modal">
        <div class="modal-head">
          <div class="title">선생님 쿠폰 등록</div>
          <button class="close" type="button" data-action="closeCoupon">×</button>
        </div>
        <div class="modal-body cd-bw-body">
          <div class="cd-bw-sect">
            <div class="cd-bw-sect-head">
              <span class="material-symbols-outlined">redeem</span>
              <span>기본 정보</span>
            </div>
            <div class="cd-bw-sect-body">
              <div class="cd-bw-2col">
                <div class="cd-bw-field">
                  <label class="cd-bw-label" for="couponName">쿠폰명</label>
                  <input class="form-input" id="couponName" placeholder="예: 자리 우선권" />
                </div>
                <div class="cd-bw-field">
                  <label class="cd-bw-label" for="couponCategory">분류 <span class="cd-desc" style="font-weight:400">색상 구분</span></label>
                  <select class="form-input" id="couponCategory">
                    <option>자리</option><option>보상</option><option>활동</option><option>특전</option>
                  </select>
                </div>
              </div>
              <div class="cd-bw-field">
                <label class="cd-bw-label">아이콘 <span class="cd-desc" style="font-weight:400">학생 화면 표시</span></label>
                <input type="hidden" id="couponIcon" value="event_seat" />
                <div class="cd-icon-pick" data-iconpick="couponIcon">
                  <button type="button" class="active" data-icon="event_seat"><span class="material-symbols-outlined">event_seat</span></button>
                  <button type="button" data-icon="menu_book"><span class="material-symbols-outlined">menu_book</span></button>
                  <button type="button" data-icon="star"><span class="material-symbols-outlined">star</span></button>
                  <button type="button" data-icon="wb_sunny"><span class="material-symbols-outlined">wb_sunny</span></button>
                  <button type="button" data-icon="palette"><span class="material-symbols-outlined">palette</span></button>
                  <button type="button" data-icon="music_note"><span class="material-symbols-outlined">music_note</span></button>
                  <button type="button" data-icon="cleaning_services"><span class="material-symbols-outlined">cleaning_services</span></button>
                  <button type="button" data-icon="sports_esports"><span class="material-symbols-outlined">sports_esports</span></button>
                  <button type="button" data-icon="redeem"><span class="material-symbols-outlined">redeem</span></button>
                  <button type="button" data-icon="emoji_events"><span class="material-symbols-outlined">emoji_events</span></button>
                </div>
              </div>
            </div>
          </div>
          <div class="cd-bw-sect">
            <div class="cd-bw-sect-head">
              <span class="material-symbols-outlined">sell</span>
              <span>판매 설정</span>
            </div>
            <div class="cd-bw-sect-body">
              <div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:12px">
                <div class="cd-bw-field">
                  <label class="cd-bw-label" for="couponPrice">가격</label>
                  <input class="form-input" id="couponPrice" type="number" value="30" />
                </div>
                <div class="cd-bw-field">
                  <label class="cd-bw-label" for="couponStock">수량</label>
                  <input class="form-input" id="couponStock" type="number" value="5" />
                </div>
                <div class="cd-bw-field">
                  <label class="cd-bw-label" for="couponDay">사용 가능일</label>
                  <select class="form-input" id="couponDay">
                    <option>언제나</option><option>금요일</option><option>월 1회</option><option>교사 승인 후</option>
                  </select>
                </div>
                <div class="cd-bw-field">
                  <label class="cd-bw-label" for="couponVisible">공개 여부</label>
                  <select class="form-input" id="couponVisible">
                    <option value="공개">공개</option><option value="비공개">비공개</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div class="cd-bw-sect">
            <div class="cd-bw-sect-head">
              <span class="material-symbols-outlined">description</span>
              <span>설명</span>
              <span class="cd-desc" style="font-weight:400;margin-left:4px">학생 화면에 보일 내용</span>
            </div>
            <div class="cd-bw-sect-body">
              <textarea class="form-textarea" id="couponDesc" rows="3" placeholder="학생 화면에 보일 설명을 입력하세요."></textarea>
            </div>
          </div>
        </div>
        <div class="modal-foot">
          <button class="btn" type="button" data-action="closeCoupon">취소</button>
          <button class="btn primary" type="button" data-action="saveCoupon">쿠폰 등록</button>
        </div>
      </div>
    </div>
  `;

  /* 페이지에 이미 같은 id의 모달이 있으면(점진 마이그레이션 중) 주입 생략 */
  if (!document.getElementById("studentDetailModal")) {
    document.body.insertAdjacentHTML("beforeend", MODALS_HTML);
  }
})();
