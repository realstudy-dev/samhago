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
    <!-- 학생 상세 (좌우 화살표·방향키로 옆 학생 이동) -->
    <div class="modal-overlay" id="studentDetailModal">
      <div class="modal cd-modal-lg cd-sd-modal">
        <button class="cd-sd-nav prev" type="button" data-action="sdPrev" title="이전 학생 (←)"><span class="material-symbols-outlined">chevron_left</span></button>
        <button class="cd-sd-nav next" type="button" data-action="sdNext" title="다음 학생 (→)"><span class="material-symbols-outlined">chevron_right</span></button>
        <div class="modal-head"><div class="title" id="sdTitle">학생 상세 <span class="cd-desc" id="sdPos"></span></div><button class="close" type="button" data-action="closeStudentDetail">×</button></div>
        <div class="cd-sd-hero">
          <div class="cd-sd-hero-info">
            <div class="cd-student-name" id="sdName">한예린</div>
            <div id="sdTags"></div>
          </div>
          <div class="cd-balance"><span class="cd-desc">포인트머니 잔액</span><b><span id="sdBalance">122</span> <small>포인트</small></b></div>
        </div>
        <div class="tab-pills cd-modal-tabs" id="sdTabs">
          <button class="active" type="button" data-sdtab="learning">학습 결과</button>
          <button type="button" data-sdtab="brick">포인트 통장</button>
          <button type="button" data-sdtab="report">리포트</button>
        </div>
        <div class="modal-body cd-sd-panes">
          <div class="cd-sd-pane active" data-sdpane="learning">
            <div class="cd-paneltitle">오늘의 학습 결과</div>
            <div class="cd-learning-cards" id="sdLearningCards"></div>
          </div>
          <div class="cd-sd-pane" data-sdpane="brick">
            <div class="cd-paneltitle">포인트 지급 <button class="cd-link" type="button" data-action="openPraiseReasonManage">칭찬 사유 관리 →</button></div>
            <div class="cd-reasons" id="praiseReasons"></div>
            <div class="cd-give-bar">
              <div class="cd-give-row">
                <div class="cd-stepper"><button type="button" data-step="-">-</button><span id="giveAmount">5</span><button type="button" data-step="+">+</button></div>
                <button class="btn primary" type="button" data-action="give" id="giveBtn">+5 포인트머니 지급</button>
              </div>
            </div>
            <div class="cd-paneltitle" style="margin-top:24px">입출금 내역</div>
            <div class="cd-ledger-list" id="sdLedger"></div>
          </div>
          <div class="cd-sd-pane" data-sdpane="report">
            <div class="cd-status-grid two">
              <div class="cd-status-box"><b>연속 학습</b><span id="sdStreak">9일</span></div>
              <div class="cd-status-box"><b>오늘의 학습</b><span id="sdDone">완료</span></div>
            </div>
            <div class="cd-paneltitle" style="margin-top:16px">AI 코멘트 <span class="cd-head-actions"><button class="btn-sm" type="button" data-action="regen">빠른 생성</button><button class="btn-sm approve" type="button" data-action="openAIComment">상세 작성</button></span></div>
            <div class="cd-comment" id="sdComment">예린이는 매일 꾸준히 학습에 참여하며 어려운 문제도 포기하지 않고 끝까지 다시 풀어보는 모습이 정말 멋져요!</div>
            <div class="guideBox tip mt-s"><p>코멘트 활용</p><ul><li>빠른 생성은 강조 내용·톤 기본값으로 바로 만들고, 상세 작성은 용도·강조·톤·메모를 직접 골라 생성합니다.</li></ul></div>
            <div class="cd-paneltitle" style="margin-top:20px">지금까지 받은 칭찬</div>
            <div class="cd-praise-list" id="praiseList"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- 공동목표 -->
    <div class="modal-overlay" id="goalModal">
      <div class="modal">
        <div class="modal-head"><div class="title">우리 반 공동목표 설정</div><button class="close" type="button" data-action="goalClose">×</button></div>
        <div class="modal-body">
          <div class="cd-form-row"><label>목표명</label><input class="form-input" id="goalTitle" value="서로 칭찬하고 함께 성장하기" /></div>
          <div class="cd-form-row"><label>목표 포인트머니</label><input class="form-input" id="goalTarget" type="number" value="2240" /></div>
          <div class="cd-form-row"><label>현재 달성 포인트머니</label><input class="form-input" id="goalCurrent" readonly /><small class="cd-desc">학생들이 받은 포인트머니 총합으로 자동 계산됩니다.</small></div>
          <div class="cd-form-row"><label>달성 보상</label><input class="form-input" value="금요일 5분 놀이 시간" /></div>
          <div class="cd-form-row"><label>목표 기간</label><input class="form-input" value="이번 주 월요일 ~ 금요일" /></div>
          <div class="cd-comment" id="goalPreview"></div>
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
        <div class="modal-head"><div class="title" id="mvTitle">게시판</div><button class="close" type="button" data-action="closeMorningView">×</button></div>
        <div class="modal-body">
          <div class="cd-desc cd-mv-meta" id="mvMeta"></div>
          <div class="cd-preview-row"><b>오늘의 수업</b><div class="cd-period-list" id="mvSchedule"></div></div>
          <div class="cd-preview-row"><b>수업 준비</b><div id="mvReady"></div></div>
          <div class="cd-preview-row"><b>아침활동</b><div id="mvMorning"></div></div>
          <div class="cd-preview-row"><b>전달사항</b><div id="mvNotice"></div></div>
        </div>
        <div class="modal-foot">
          <button class="btn" type="button" data-action="closeMorningView">닫기</button>
          <button class="btn primary" type="button" data-action="dupMorningFromView">이 게시글 복제</button>
        </div>
      </div>
    </div>

    <!-- 포인트 지급 -->
    <div class="modal-overlay" id="brickGiveModal">
      <div class="modal">
        <div class="modal-head"><div class="title">포인트머니 지급</div><button class="close" type="button" data-action="closeBrickGive">×</button></div>
        <div class="modal-body">
          <div class="cd-form-grid">
            <div class="cd-form-row"><label>학생 선택</label><select class="form-select" id="brickGiveStudent"></select></div>
            <div class="cd-form-row"><label>지급 금액</label><input class="form-input" id="brickGiveAmount" type="number" value="5" /></div>
            <div class="cd-form-row"><label>구분</label><select class="form-select" id="brickGiveType"><option>적립</option><option>공동목표</option></select></div>
            <div class="cd-form-row"><label>지급 사유</label><select class="form-select" id="brickGiveReason"><option>오늘 학습 완료</option><option>오답 다시 풀기</option><option>수업 집중 칭찬</option><option>친구 도와주기</option><option>공동목표 기여</option></select></div>
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
        <div class="modal-head"><div class="title">전체 보너스 지급</div><button class="close" type="button" data-action="closeBonus">×</button></div>
        <div class="modal-body">
          <div class="cd-form-grid">
            <div class="cd-form-row"><label>지급 대상</label><select class="form-select" id="bonusTarget"><option>전체 학생</option><option>오늘 학습 완료 학생</option></select></div>
            <div class="cd-form-row"><label>보너스 금액</label><input class="form-input" id="bonusAmount" type="number" value="1" /></div>
          </div>
          <div class="cd-form-row"><label>지급 사유</label><input class="form-input" id="bonusReason" value="반 전체 보너스" /></div>
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
        <div class="modal-head"><div class="title">AI 코멘트 생성 <span class="badge info" id="aiLimitBadge">오늘 3 / 3회 남음</span></div><button class="close" type="button" data-action="closeAIComment">×</button></div>
        <div class="modal-body">
          <div class="cd-form-grid">
            <div class="cd-form-row"><label>학생 선택</label><select class="form-select" id="aiStudentSelect"></select></div>
            <div class="cd-form-row"><label>코멘트 용도</label><select class="form-select" id="aiCommentPurpose">
              <option value="weekly">주간리포트용</option><option value="praise">칭찬 포인트 지급용</option><option value="parent">학부모 안내용</option><option value="student">학생 격려용</option>
            </select></div>
          </div>
          <div class="cd-form-row">
            <label>강조할 내용</label>
            <div class="cd-ai-options">
              <button class="cd-ai-option active" type="button" data-ai-focus="꾸준한 학습 참여">꾸준한 학습 참여</button>
              <button class="cd-ai-option" type="button" data-ai-focus="오답 다시 풀기">오답 다시 풀기</button>
              <button class="cd-ai-option" type="button" data-ai-focus="수업 집중">수업 집중</button>
              <button class="cd-ai-option" type="button" data-ai-focus="친구 도와주기">친구 도와주기</button>
              <button class="cd-ai-option" type="button" data-ai-focus="포인트머니 성장">포인트머니 성장</button>
              <button class="cd-ai-option" type="button" data-ai-focus="자기주도 학습">자기주도 학습</button>
            </div>
          </div>
          <div class="cd-form-row">
            <label>문장 톤</label>
            <div class="cd-head-actions row-start">
              <button class="btn-sm" type="button" data-action="setAITone" data-tone="따뜻하게">따뜻하게</button>
              <button class="btn-sm" type="button" data-action="setAITone" data-tone="간단하게">간단하게</button>
              <button class="btn-sm" type="button" data-action="setAITone" data-tone="학부모용">학부모용</button>
              <button class="btn-sm" type="button" data-action="setAITone" data-tone="학생 격려용">학생 격려용</button>
            </div>
          </div>
          <div class="cd-form-row"><label>추가 메모</label><textarea class="form-textarea" id="aiCommentMemo" rows="2" placeholder="예: 이번 주 국어 학습을 꾸준히 했고, 오답을 다시 풀었습니다."></textarea></div>
          <div class="cd-form-row">
            <label>생성된 코멘트</label>
            <div class="cd-comment" id="aiGeneratedComment">학생을 선택하고 AI 코멘트 생성을 누르면 문장이 만들어집니다.</div>
            <div class="cd-head-actions gap-t"><span class="cd-desc cd-modal-note" id="aiCommentStatus">대기 중</span>
              <button class="btn-sm" type="button" data-action="generateAIComment">코멘트 생성</button>
              <button class="btn-sm" type="button" data-action="applyAIComment">학생 상세 반영</button>
              <button class="btn-sm approve" type="button" data-action="saveAIComment">주간리포트 저장</button>
            </div>
          </div>
          <div class="cd-form-row"><label>최근 생성 코멘트</label><div class="cd-ai-history" id="aiCommentHistory"></div></div>
        </div>
      </div>
    </div>

    <!-- 칭찬 사유 관리 -->
    <div class="modal-overlay" id="praiseReasonModal">
      <div class="modal cd-modal-lg">
        <div class="modal-head"><div class="title">칭찬 사유 관리</div><button class="close" type="button" data-action="closePraiseReasonManage">×</button></div>
        <div class="modal-body">
          <div class="cd-praise-manage">
            <div>
              <div class="cd-form-row"><label>아이콘</label><input type="hidden" id="newPraiseIcon" value="thumb_up" /><div class="cd-icon-pick" data-iconpick="newPraiseIcon"><button type="button" class="active" data-icon="thumb_up"><span class="material-symbols-outlined">thumb_up</span></button><button type="button" data-icon="chat_bubble"><span class="material-symbols-outlined">chat_bubble</span></button><button type="button" data-icon="favorite"><span class="material-symbols-outlined">favorite</span></button><button type="button" data-icon="track_changes"><span class="material-symbols-outlined">track_changes</span></button><button type="button" data-icon="menu_book"><span class="material-symbols-outlined">menu_book</span></button><button type="button" data-icon="auto_awesome"><span class="material-symbols-outlined">auto_awesome</span></button><button type="button" data-icon="handshake"><span class="material-symbols-outlined">handshake</span></button><button type="button" data-icon="local_fire_department"><span class="material-symbols-outlined">local_fire_department</span></button><button type="button" data-icon="eco"><span class="material-symbols-outlined">eco</span></button><button type="button" data-icon="emoji_events"><span class="material-symbols-outlined">emoji_events</span></button></div></div>
              <div class="cd-form-row"><label>지급 포인트</label><input class="form-input" id="newPraiseBrick" type="number" value="5" style="max-width:160px" /></div>
              <div class="cd-form-row"><label>칭찬 사유명</label><input class="form-input" id="newPraiseName" placeholder="예: 발표를 잘했어요" /></div>
              <div class="cd-form-row"><label>칭찬 사유 설명 <span class="cd-desc">(선택)</span></label><textarea class="form-textarea" id="newPraiseDesc" rows="3" placeholder="예: 수업 시간에 자신 있게 발표하고 친구들의 생각도 잘 들어주었습니다."></textarea></div>
              <div class="cd-head-actions row-end">
                <button class="btn" type="button" data-action="resetPraiseForm">초기화</button>
                <button class="btn primary" type="button" data-action="savePraiseReason">칭찬 사유 저장</button>
              </div>
            </div>
            <div>
              <div class="cd-paneltitle">등록된 칭찬 사유 <button class="cd-link" type="button" data-action="loadPraiseExamples">예시 불러오기</button></div>
              <div class="cd-praise-reason-list" id="praiseReasonList"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 기관 정보 -->
    <div class="modal-overlay" id="orgModal">
      <div class="modal">
        <div class="modal-head"><div class="title">기관 정보</div><button class="close" type="button" data-action="closeOrgInfo">×</button></div>
        <div class="modal-body">
          <div class="cd-org-hero">
            <span class="cd-org-ico"><span class="material-symbols-outlined">school</span></span>
            <div>
              <div class="cd-student-name">세븐초등학교</div>
              <div class="cd-desc">4학년 1반 (4-1)</div>
            </div>
          </div>
          <div class="cd-org-list">
            <div class="cd-org-row"><span>기관 유형</span><b>학교 (B2G)</b></div>
            <div class="cd-org-row"><span>기관 코드</span><b>SCH-7BRICKS-0401</b></div>
            <div class="cd-org-row"><span>담당 교사</span><b>김선생님</b></div>
            <div class="cd-org-row"><span>학생 수</span><b>21명</b></div>
            <div class="cd-org-row"><span>구독 플랜</span><b>학교 단체 · 이용 중</b></div>
            <div class="cd-org-row"><span>개설일</span><b>2026-03-02</b></div>
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
        <div class="modal-head"><div class="title" id="studentModalTitle">학생 등록</div><button class="close" type="button" data-action="closeStudent">×</button></div>
        <div class="modal-body">
          <div class="cd-form-grid">
            <div class="cd-form-row" style="grid-column:1/-1">
              <label>로그인 아이디(이메일) <span style="color:#e53935">*</span></label>
              <div style="display:flex;gap:8px">
                <input class="form-input" id="newStudentLoginId" type="email" placeholder="로그인아이디를 입력하세요." style="flex:1" />
                <button class="btn" type="button">중복확인</button>
              </div>
            </div>
            <div class="cd-form-row"><label>비밀번호 <span style="color:#e53935">*</span></label><input class="form-input" id="newStudentPw" type="password" placeholder="비밀번호를 입력하세요." /></div>
            <div class="cd-form-row"><label>비밀번호확인 <span style="color:#e53935">*</span></label><input class="form-input" id="newStudentPwConfirm" type="password" placeholder="비밀번호를 입력하세요." /></div>
            <div class="cd-form-row"><label>학생명 <span style="color:#e53935">*</span></label><input class="form-input" id="newStudentName" placeholder="학생명을 입력하세요." /></div>
            <div class="cd-form-row"><label>반 번호</label><input class="form-input" id="newStudentClassNum" type="number" placeholder="숫자만 입력하세요." /></div>
            <div class="cd-form-row"><label>생년월일</label><input class="form-input" id="newStudentBirthDate" type="date" /></div>
            <div class="cd-form-row"><label>학년 <span style="color:#e53935">*</span></label><select class="form-select" id="newStudentGrade"><option value="중1">중1</option><option value="중2" selected>중2</option><option value="중3">중3</option><option value="고1">고1</option><option value="고2">고2</option><option value="고3">고3</option></select></div>
            <div class="cd-form-row"><label>학부모명</label><input class="form-input" id="newStudentParentName" placeholder="학부모명을 입력하세요." /></div>
            <div class="cd-form-row"><label>학부모 전화번호</label><input class="form-input" id="newStudentParentPhone" type="tel" placeholder="'-' 제외하고 입력하세요." /></div>
            <div class="cd-form-row" style="grid-column:1/-1">
              <label>학생 상태 <span style="color:#e53935">*</span></label>
              <div style="display:flex;gap:24px;padding:9px 0">
                <label style="display:flex;align-items:center;gap:6px;cursor:pointer;font-weight:500"><input type="radio" name="studentStatusR" value="정상이용" checked /> 정상이용</label>
                <label style="display:flex;align-items:center;gap:6px;cursor:pointer;font-weight:500"><input type="radio" name="studentStatusR" value="이용중지" /> 이용중지</label>
                <label style="display:flex;align-items:center;gap:6px;cursor:pointer;font-weight:500"><input type="radio" name="studentStatusR" value="탈퇴" /> 탈퇴</label>
              </div>
            </div>
            <div class="cd-form-row" style="grid-column:1/-1">
              <label>이용기간 <span style="color:#e53935">*</span></label>
              <div style="display:flex;gap:8px;align-items:center;max-width:400px">
                <input class="form-input" id="newStudentUsageStart" type="date" value="2026-06-12" style="flex:1" />
                <span style="color:#8B95A1;font-weight:500">~</span>
                <input class="form-input" id="newStudentUsageEnd" type="date" value="2026-12-31" style="flex:1" />
              </div>
            </div>
            <div class="cd-form-row" style="grid-column:1/-1">
              <label>알림톡 여부 <span style="color:#e53935">*</span></label>
              <div style="display:flex;gap:24px;padding:9px 0">
                <label style="display:flex;align-items:center;gap:6px;cursor:pointer;font-weight:500"><input type="radio" name="notificationsR" value="true" checked /> 사용</label>
                <label style="display:flex;align-items:center;gap:6px;cursor:pointer;font-weight:500"><input type="radio" name="notificationsR" value="false" /> 미사용</label>
              </div>
            </div>
            <div class="cd-form-row"><label>레벨</label><select class="form-select" id="newStudentLevel"><option value="1-1">1-1</option><option value="1-2">1-2</option><option value="2-1">2-1</option><option value="2-2">2-2</option><option value="3-1">3-1</option><option value="3-2">3-2</option><option value="4-1">4-1</option><option value="4-2">4-2</option><option value="5-1">5-1</option><option value="5-2">5-2</option><option value="6-1" selected>6-1</option><option value="6-2">6-2</option></select></div>
            <div class="cd-form-row" style="grid-column:1/-1"><label>메모</label><textarea class="form-textarea" id="newStudentMemo" rows="3" placeholder="메모를 입력하세요."></textarea></div>
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
        <div class="modal-head"><div class="title">학생 일괄 등록</div><button class="close" type="button" data-action="closeBulk">×</button></div>
        <div class="modal-body">
          <div class="guideBox tip"><p>엑셀(xlsx) 또는 CSV 파일을 업로드하세요.</p><p style="margin-top:4px;color:#8B95A1;font-size:12px;">필수 열: <b>이름</b> &nbsp;·&nbsp; 선택 열: 아이디, 학년, 레벨, 초기 포인트머니(포인트)</p></div>
          <div class="cd-bulk-upload-area" id="bulkDropArea">
            <input type="file" id="bulkFileInput" accept=".xlsx,.xls,.csv" style="display:none" />
            <span class="material-symbols-outlined" style="font-size:40px;color:#D1D6DB;">upload_file</span>
            <div style="margin-top:10px;font-weight:600;color:#333D4B;">파일을 끌어다 놓거나 선택하세요</div>
            <div style="margin-top:4px;font-size:13px;color:#8B95A1;">.xlsx &nbsp;·&nbsp; .xls &nbsp;·&nbsp; .csv 지원</div>
            <button class="btn" type="button" style="margin-top:14px;" data-action="pickBulkFile">파일 선택</button>
          </div>
          <div id="bulkPreviewWrap" style="display:none;margin-top:16px;">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">
              <span class="material-symbols-outlined" style="font-size:18px;color:#009d5b;">check_circle</span>
              <span id="bulkFileName" style="font-size:13px;color:#333D4B;font-weight:600;"></span>
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
        <div class="modal-foot">
          <button class="btn" type="button" data-action="downloadTemplate">서식 파일 내려받기</button>
          <span style="flex:1"></span>
          <span class="cd-desc cd-modal-note">중복 이름은 제외하고 등록됩니다.</span>
          <button class="btn primary" type="button" data-action="saveBulk" id="saveBulkBtn" disabled>일괄 등록</button>
        </div>
      </div>
    </div>

    <!-- 쿠폰 등록 (쿠폰 아이콘은 학생 화면용 이모지 — 예외 유지) -->
    <div class="modal-overlay" id="couponModal">
      <div class="modal">
        <div class="modal-head"><div class="title">선생님 쿠폰 등록</div><button class="close" type="button" data-action="closeCoupon">×</button></div>
        <div class="modal-body">
          <div class="cd-form-grid">
            <div class="cd-form-row"><label>쿠폰명</label><input class="form-input" id="couponName" placeholder="예: 자리 우선권" /></div>
            <div class="cd-form-row"><label>아이콘 <small class="cd-desc">(학생 화면 표시)</small></label><select class="form-select" id="couponIcon"><option>🪑</option><option>🎮</option><option>📚</option><option>🧹</option><option>🎨</option><option>🎵</option><option>🍀</option><option>⭐</option></select></div>
            <div class="cd-form-row"><label>가격</label><input class="form-input" id="couponPrice" type="number" value="30" /></div>
            <div class="cd-form-row"><label>수량</label><input class="form-input" id="couponStock" type="number" value="5" /></div>
            <div class="cd-form-row"><label>사용 가능일</label><select class="form-select" id="couponDay"><option>언제나</option><option>금요일</option><option>월 1회</option><option>교사 승인 후</option></select></div>
            <div class="cd-form-row"><label>공개 여부</label><select class="form-select" id="couponVisible"><option value="공개">공개</option><option value="비공개">비공개</option></select></div>
          </div>
          <div class="cd-form-row"><label>쿠폰 설명</label><textarea class="form-textarea" id="couponDesc" rows="3" placeholder="학생 화면에 보일 설명을 입력하세요."></textarea></div>
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
