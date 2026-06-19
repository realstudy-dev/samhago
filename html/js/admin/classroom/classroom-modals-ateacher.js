/* ============================================================================
   선생님 관리 (academy_teacher) 전용 모달
   포함: teacherAddModal (등록) · teacherEditModal (수정) · teacherDeleteModal (삭제 확인)
   ============================================================================ */

(function () {
  var MODALS_HTML = `

    <!-- ── 강사 등록 ────────────────────────────────── -->
    <div class="modal-overlay" id="teacherAddModal">
      <div class="modal" style="max-width:520px">
        <div class="modal-head">
          <span style="font-size:15px;font-weight:700">강사 등록</span>
          <button type="button" class="close" data-close="teacherAddModal">×</button>
        </div>
        <div class="modal-body cd-bw-body">

          <div class="cd-bw-sect">
            <div class="cd-bw-sect-head">
              <span class="material-symbols-outlined">person</span>
              <span>기본 정보</span>
            </div>
            <div class="cd-bw-sect-body">
              <div class="cd-bw-field">
                <label class="cd-bw-label" for="taName">이름 <span style="color:var(--c-danger)">*</span></label>
                <input type="text" id="taName" class="form-input" style="width:200px" maxlength="10" placeholder="예) 김지은" />
              </div>
              <div class="cd-bw-field">
                <label class="cd-bw-label" for="taId">아이디 <span style="color:var(--c-danger)">*</span></label>
                <div style="display:flex;gap:8px;align-items:center">
                  <input type="text" id="taId" class="form-input" style="width:180px" maxlength="20" placeholder="영문·숫자 4~20자" autocomplete="off" />
                  <button type="button" class="btn-sm" id="taIdCheckBtn" data-action="taCheckId">중복 확인</button>
                </div>
                <div id="taIdMsg" style="font-size:13px;margin-top:4px"></div>
              </div>
              <div class="cd-bw-field">
                <label class="cd-bw-label" for="taTel">연락처</label>
                <input type="tel" id="taTel" class="form-input" style="width:200px" maxlength="13" placeholder="010-0000-0000" />
              </div>
              <div class="cd-bw-field">
                <label class="cd-bw-label" for="taPw">임시 비밀번호 <span style="color:var(--c-danger)">*</span></label>
                <input type="password" id="taPw" class="form-input" style="width:200px" maxlength="20" autocomplete="new-password" placeholder="8자 이상" />
                <div class="cd-desc" style="margin-top:4px">강사가 첫 로그인 시 변경하도록 안내하세요.</div>
              </div>
            </div>
          </div>

          <div class="cd-bw-sect">
            <div class="cd-bw-sect-head">
              <span class="material-symbols-outlined">meeting_room</span>
              <span>담당 반 <span style="font-size:12px;font-weight:400;color:var(--c-muted);margin-left:4px">선택사항</span></span>
            </div>
            <div class="cd-bw-sect-body">
              <div class="cd-check-grid" id="taClassGrid"></div>
              <div class="cd-desc" style="margin-top:8px">선택하지 않으면 미배정 상태로 등록됩니다. 나중에 수정할 수 있습니다.</div>
            </div>
          </div>

          <div class="cd-bw-sect">
            <div class="cd-bw-sect-head">
              <span class="material-symbols-outlined">admin_panel_settings</span>
              <span>권한</span>
            </div>
            <div class="cd-bw-sect-body">
              <div class="cd-check-grid" id="taPermGrid"></div>
            </div>
          </div>

        </div>
        <div class="modal-foot">
          <button type="button" class="btn" data-close="teacherAddModal">취소</button>
          <button type="button" class="btn primary" data-action="taSubmit">등록</button>
        </div>
      </div>
    </div>

    <!-- ── 강사 수정 ────────────────────────────────── -->
    <div class="modal-overlay" id="teacherEditModal">
      <div class="modal" style="max-width:520px">
        <div class="modal-head">
          <span style="font-size:15px;font-weight:700" id="teTitle">강사 수정</span>
          <button type="button" class="close" data-close="teacherEditModal">×</button>
        </div>
        <div class="modal-body cd-bw-body">

          <div class="cd-bw-sect">
            <div class="cd-bw-sect-head">
              <span class="material-symbols-outlined">person</span>
              <span>기본 정보</span>
            </div>
            <div class="cd-bw-sect-body">
              <div class="cd-bw-field">
                <label class="cd-bw-label" for="teName">이름 <span style="color:var(--c-danger)">*</span></label>
                <input type="text" id="teName" class="form-input" style="width:200px" maxlength="10" />
              </div>
              <div class="cd-bw-field">
                <label class="cd-bw-label" for="teId">아이디 (이메일)</label>
                <input type="email" id="teId" class="form-input" style="width:240px" maxlength="60" placeholder="예) teacher@academy.com" autocomplete="off" />
              </div>
              <div class="cd-bw-field">
                <label class="cd-bw-label" for="teTel">연락처</label>
                <input type="tel" id="teTel" class="form-input" style="width:200px" maxlength="13" />
              </div>
            </div>
          </div>

          <div class="cd-bw-sect">
            <div class="cd-bw-sect-head">
              <span class="material-symbols-outlined">meeting_room</span>
              <span>담당 반</span>
            </div>
            <div class="cd-bw-sect-body">
              <div class="cd-check-grid" id="teClassGrid"></div>
            </div>
          </div>

          <div class="cd-bw-sect">
            <div class="cd-bw-sect-head">
              <span class="material-symbols-outlined">admin_panel_settings</span>
              <span>권한</span>
            </div>
            <div class="cd-bw-sect-body">
              <div class="cd-check-grid" id="tePermGrid"></div>
            </div>
          </div>

          <div class="cd-bw-sect">
            <div class="cd-bw-sect-head">
              <span class="material-symbols-outlined">toggle_on</span>
              <span>계정 상태</span>
            </div>
            <div class="cd-bw-sect-body">
              <div class="cd-check-grid" id="teStatusGrid"></div>
            </div>
          </div>

        </div>
        <div class="modal-foot" style="justify-content:space-between">
          <button type="button" class="btn danger" data-action="teDelete">삭제</button>
          <div style="display:flex;gap:8px">
            <button type="button" class="btn" data-close="teacherEditModal">취소</button>
            <button type="button" class="btn primary" data-action="teSubmit">저장</button>
          </div>
        </div>
      </div>
    </div>

    <!-- ── 강사 삭제 확인 ────────────────────────────── -->
    <div class="modal-overlay" id="teacherDeleteModal">
      <div class="modal" style="max-width:400px">
        <div class="modal-head">
          <span style="font-size:15px;font-weight:700">강사 삭제</span>
          <button type="button" class="close" data-close="teacherDeleteModal">×</button>
        </div>
        <div class="modal-body" style="padding:24px 24px 8px">
          <div style="display:flex;flex-direction:column;align-items:center;gap:12px;text-align:center">
            <span class="material-symbols-outlined" style="font-size:40px;color:var(--c-danger);font-variation-settings:'FILL' 1">person_remove</span>
            <div>
              <div style="font-size:16px;font-weight:700;color:var(--c-ink)" id="tdName">-</div>
              <div style="font-size:14px;color:var(--c-muted);margin-top:4px" id="tdId">-</div>
            </div>
            <div style="background:var(--c-danger-50);border-radius:10px;padding:12px 16px;width:100%">
              <div style="font-size:14px;color:var(--c-danger);font-weight:600;line-height:1.5" id="tdWarn">이 강사를 삭제하면 복구할 수 없습니다.</div>
              <div style="font-size:13px;color:var(--c-danger);margin-top:4px" id="tdClassWarn"></div>
            </div>
          </div>
        </div>
        <div class="modal-foot">
          <button type="button" class="btn" data-close="teacherDeleteModal">취소</button>
          <button type="button" class="btn danger solid" data-action="tdConfirm">삭제</button>
        </div>
      </div>
    </div>

  `;
  document.body.insertAdjacentHTML('beforeend', MODALS_HTML);
})();
