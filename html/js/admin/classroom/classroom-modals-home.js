/* ============================================================================
   반홈 (classroom_home) 전용 모달
   포함: goalDetailModal (공동목표 상세·수정)
   ============================================================================ */

(function () {
  var MODALS_HTML = `
    <div class="modal-overlay" id="goalDetailModal">
      <div class="modal" style="max-width:480px">
        <div class="modal-head">
          <div style="display:flex;align-items:center;gap:8px;min-width:0">
            <span class="badge" id="gdmBadge">-</span>
            <span id="gdmGoalTitle" style="font-size:15px;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">-</span>
          </div>
          <button type="button" class="close" data-close="goalDetailModal">×</button>
        </div>
        <div class="modal-body cd-bw-body">

          <!-- 진행도 -->
          <div class="cd-bw-sect">
            <div class="cd-bw-sect-head">
              <span class="material-symbols-outlined">emoji_events</span>
              <span>진행도</span>
            </div>
            <div class="cd-bw-sect-body">
              <div class="cd-goalp-bar-row">
                <div class="cd-progress lg cd-goalp-bar">
                  <div class="cd-bar" id="gdmBar" style="width:0%"></div>
                </div>
                <span class="cd-goalp-pct" id="gdmPct">0%</span>
              </div>
              <div class="cd-goalp-num">
                <b id="gdmNow">0</b>p
                <span>/ <span id="gdmTarget">0</span>p 목표</span>
              </div>
              <div class="cd-goalp-left cd-desc" id="gdmLeft"></div>
            </div>
          </div>

          <!-- 달성 보상 -->
          <div class="cd-bw-sect">
            <div class="cd-bw-sect-head">
              <span class="material-symbols-outlined">redeem</span>
              <span>달성 보상</span>
            </div>
            <div class="cd-bw-sect-body">
              <div id="gdmRewardBox" style="border-radius:10px;padding:12px 16px;display:flex;align-items:center;gap:12px">
                <span class="material-symbols-outlined" id="gdmRewardIco" style="font-size:22px;flex-shrink:0;font-variation-settings:'FILL' 1">redeem</span>
                <span id="gdmReward" style="font-size:15px;font-weight:700;color:var(--c-ink)">-</span>
              </div>
            </div>
          </div>

          <!-- 기여도 TOP -->
          <div class="cd-bw-sect">
            <div class="cd-bw-sect-head">
              <span class="material-symbols-outlined">military_tech</span>
              <span>기여도 TOP</span>
            </div>
            <div class="cd-bw-sect-body" style="padding-top:8px;padding-bottom:8px">
              <div id="gdmContribs"></div>
            </div>
          </div>

          <!-- 목표 수정 (토글) -->
          <div id="gdmEditArea" hidden>
            <div class="cd-bw-sect">
              <div class="cd-bw-sect-head">
                <span class="material-symbols-outlined">edit</span>
                <span>목표 수정</span>
              </div>
              <div class="cd-bw-sect-body">
                <div class="cd-bw-field">
                  <label class="cd-bw-label" for="gdmEditTitle">목표명 <span style="color:var(--c-danger)">*</span></label>
                  <input type="text" id="gdmEditTitle" class="form-input" style="width:100%" maxlength="30" />
                </div>
                <div class="cd-bw-field">
                  <label class="cd-bw-label" for="gdmEditTarget">목표 포인트 <span style="color:var(--c-danger)">*</span></label>
                  <input type="number" id="gdmEditTarget" class="form-input" style="width:160px" min="100" step="100" />
                </div>
                <div class="cd-bw-field">
                  <label class="cd-bw-label" for="gdmEditReward">달성 보상</label>
                  <input type="text" id="gdmEditReward" class="form-input" style="width:100%" maxlength="40" />
                </div>
              </div>
            </div>
          </div>

        </div>
        <div class="modal-foot">
          <button class="btn" type="button" id="gdmEditBtn" data-action="gdmToggleEdit">목표 수정</button>
          <button class="btn primary" type="button" id="gdmSaveBtn" data-action="gdmSaveEdit" hidden>저장</button>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', MODALS_HTML);
})();
