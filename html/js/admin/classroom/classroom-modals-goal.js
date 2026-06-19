/* ============================================================================
   공동목표 (classroom_goal) 전용 모달
   포함: orgGoalModal (전체 공동목표 만들기 — 기관 관리자 전용)
         classDetailModal (반 상세 현황 — 학원장 공동목표 페이지)
   ============================================================================ */

(function () {
  var MODALS_HTML = `
    <!-- 전체 공동목표 만들기 모달 (기관 관리자 전용) -->
    <div class="modal-overlay" id="orgGoalModal">
      <div class="modal" style="max-width:480px">
        <div class="modal-head">
          <div class="title">전체 공동목표 만들기</div>
          <button type="button" class="close" data-close="orgGoalModal">×</button>
        </div>
        <div class="modal-body cd-bw-body">
          <div class="cd-bw-sect">
            <div class="cd-bw-sect-head">
              <span class="material-symbols-outlined">flag</span>
              <span>목표 내용</span>
            </div>
            <div class="cd-bw-sect-body">
              <div class="cd-bw-field">
                <label class="cd-bw-label">목표명 <span style="color:var(--c-danger)">*</span></label>
                <input type="text" id="ogTitle" class="form-input" placeholder="예: 이번 달 함께 성장하기" maxlength="30" />
              </div>
              <div class="cd-bw-field">
                <label class="cd-bw-label">달성 보상 내용</label>
                <input type="text" id="ogReward" class="form-input" placeholder="예: 치킨 파티" maxlength="30" />
              </div>
            </div>
          </div>
          <div class="cd-bw-sect">
            <div class="cd-bw-sect-head">
              <span class="material-symbols-outlined">people</span>
              <span>대상 · 기간</span>
            </div>
            <div class="cd-bw-sect-body">
              <div class="cd-bw-field">
                <label class="cd-bw-label">대상</label>
                <div class="og-scope-tabs" role="tablist">
                  <button type="button" class="og-scope-tab active" data-scope="all" role="tab">전체 기관</button>
                  <button type="button" class="og-scope-tab" data-scope="select" role="tab">특정 반 선택</button>
                </div>
                <div id="ogClassPicker" style="display:none;margin-top:10px;padding:12px;border:1px solid var(--c-border);border-radius:8px;max-height:160px;overflow-y:auto"></div>
              </div>
              <div class="cd-bw-field">
                <label class="cd-bw-label">기간 <span style="color:var(--c-danger)">*</span></label>
                <div style="display:flex;align-items:center;gap:8px">
                  <input type="date" id="ogStartDate" class="form-input" style="flex:1" />
                  <span style="color:var(--c-muted);font-size:14px;flex-shrink:0">~</span>
                  <input type="date" id="ogEndDate" class="form-input" style="flex:1" />
                </div>
              </div>
            </div>
          </div>
          <div class="cd-bw-sect">
            <div class="cd-bw-sect-head">
              <span class="material-symbols-outlined">track_changes</span>
              <span>수치</span>
            </div>
            <div class="cd-bw-sect-body">
              <div class="cd-bw-field">
                <label class="cd-bw-label">목표 포인트 <span style="color:var(--c-danger)">*</span></label>
                <input type="number" id="ogTarget" class="form-input" placeholder="예: 10000" min="100" step="100" />
              </div>
            </div>
          </div>
        </div>
        <div class="modal-foot">
          <button class="btn" type="button" data-close="orgGoalModal">취소</button>
          <button class="btn primary" type="button" data-action="saveOrgGoal">만들기</button>
        </div>
      </div>
    </div>

    <!-- 반 상세 현황 모달 (학원장 공동목표 페이지) -->
    <div class="modal-overlay" id="classDetailModal">
      <div class="modal" style="max-width:540px">
        <div class="modal-head">
          <div>
            <div class="title" id="cdmClassName">반 상세 현황</div>
            <div style="font-size:13px;color:var(--c-muted);margin-top:2px" id="cdmTeacher"></div>
          </div>
          <button type="button" class="close" data-close="classDetailModal">×</button>
        </div>
        <div class="modal-body">
          <div class="cdm-hero">
            <div class="cdm-goal-title" id="cdmGoalTitle">-</div>
            <div class="cdm-bar-wrap"><div class="cdm-bar" id="cdmBar" style="width:0%"></div></div>
            <div class="cdm-bar-meta">
              <span class="cdm-pct" id="cdmPct">0%</span>
              <span class="cdm-pts"><b id="cdmNow">0</b> / <span id="cdmTarget">0</span>p</span>
            </div>
          </div>
          <div class="cdm-reward">
            <span class="material-symbols-outlined">redeem</span>
            <div>
              <div class="cdm-reward-label">달성 보상</div>
              <div class="cdm-reward-val" id="cdmReward">-</div>
            </div>
          </div>
          <div class="cdm-grid">
            <div><div class="cdm-col-title">기여도 TOP</div><div id="cdmContribs"></div></div>
            <div><div class="cdm-col-title">최근 적립 흐름</div><div class="cdm-timeline" id="cdmHistory"></div></div>
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', MODALS_HTML);
})();
