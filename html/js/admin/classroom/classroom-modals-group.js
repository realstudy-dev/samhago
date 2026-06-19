/* ============================================================================
   반 관리 (classroom_group) 전용 모달
   포함: cgCreateModal (반 만들기) · cgEditModal (반 설정)
   ============================================================================ */

(function () {
  var MODALS_HTML = `
    <!-- 반 만들기 모달 -->
    <div class="modal-overlay" id="cgCreateModal">
      <div class="modal" style="max-width:440px">
        <div class="modal-head">
          <div class="title">반 만들기</div>
          <button type="button" class="close" data-close="cgCreateModal">×</button>
        </div>
        <div class="modal-body cd-bw-body">
          <div class="cd-bw-sect">
            <div class="cd-bw-sect-head">
              <span class="material-symbols-outlined">class</span>
              <span>반 정보</span>
            </div>
            <div class="cd-bw-sect-body">
              <div class="cd-bw-field">
                <label class="cd-bw-label">반 이름 <span style="color:var(--c-danger)">*</span></label>
                <input type="text" id="cgCreateName" class="form-input" placeholder="예: 초등 국어 A반" maxlength="20" />
              </div>
              <div class="cd-bw-2col-eq">
                <div class="cd-bw-field">
                  <label class="cd-bw-label">과목</label>
                  <select id="cgCreateSubject" class="form-input">
                    <option value="">선택</option>
                    <option>국어</option><option>수학</option><option>영어</option>
                    <option>과학</option><option>사회</option><option>코딩</option><option>종합</option>
                  </select>
                </div>
                <div class="cd-bw-field">
                  <label class="cd-bw-label" id="cgCreateLvLabel">레벨</label>
                  <select id="cgCreateLevel" class="form-input"></select>
                </div>
              </div>
            </div>
          </div>
          <div class="cd-bw-sect">
            <div class="cd-bw-sect-head">
              <span class="material-symbols-outlined">person</span>
              <span>담당 선생님</span>
            </div>
            <div class="cd-bw-sect-body">
              <div class="cd-sort-toggle" style="margin-bottom:10px">
                <button class="active" type="button" data-tchmoda="existing" data-tchmod-target="cgCreate">등록된 선생님</button>
                <button type="button" data-tchmoda="new" data-tchmod-target="cgCreate">새로 등록</button>
              </div>
              <div id="cgCreateTchExisting">
                <input type="email" id="cgCreateTeacher" class="form-input" placeholder="teacher@example.com" list="cgTeacherList" autocomplete="off" />
              </div>
              <div id="cgCreateTchNew" hidden>
                <div class="cd-bw-field">
                  <label class="cd-bw-label">선생님 이름</label>
                  <input type="text" id="cgCreateTeacherName" class="form-input" placeholder="선생님 이름" maxlength="10" />
                </div>
                <div class="cd-bw-field">
                  <label class="cd-bw-label">이메일</label>
                  <input type="email" id="cgCreateTeacherEmail2" class="form-input" placeholder="teacher@example.com" />
                </div>
                <p class="cd-desc" style="margin-top:4px">저장하면 선생님 계정이 함께 생성됩니다.</p>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-foot">
          <button class="btn" type="button" data-close="cgCreateModal">취소</button>
          <button class="btn primary" type="button" data-action="saveCreateClass">만들기</button>
        </div>
      </div>
    </div>

    <!-- 반 설정 모달 -->
    <div class="modal-overlay" id="cgEditModal">
      <div class="modal" style="max-width:440px">
        <div class="modal-head">
          <div class="title">반 설정</div>
          <button type="button" class="close" data-close="cgEditModal">×</button>
        </div>
        <div class="modal-body cd-bw-body">
          <input type="hidden" id="cgEditOrigCls" />
          <div class="cd-bw-sect">
            <div class="cd-bw-sect-head">
              <span class="material-symbols-outlined">class</span>
              <span>반 정보</span>
            </div>
            <div class="cd-bw-sect-body">
              <div class="cd-bw-field">
                <label class="cd-bw-label">반 이름 <span style="color:var(--c-danger)">*</span></label>
                <input type="text" id="cgEditName" class="form-input" maxlength="20" />
              </div>
              <div class="cd-bw-2col-eq">
                <div class="cd-bw-field">
                  <label class="cd-bw-label">과목</label>
                  <select id="cgEditSubject" class="form-input">
                    <option value="">선택</option>
                    <option>국어</option><option>수학</option><option>영어</option>
                    <option>과학</option><option>사회</option><option>코딩</option><option>종합</option>
                  </select>
                </div>
                <div class="cd-bw-field">
                  <label class="cd-bw-label" id="cgEditLvLabel">레벨</label>
                  <select id="cgEditLevel" class="form-input"></select>
                </div>
              </div>
            </div>
          </div>
          <div class="cd-bw-sect">
            <div class="cd-bw-sect-head">
              <span class="material-symbols-outlined">person</span>
              <span>담당 선생님</span>
            </div>
            <div class="cd-bw-sect-body">
              <div class="cd-sort-toggle" style="margin-bottom:10px">
                <button class="active" type="button" data-tchmoda="existing" data-tchmod-target="cgEdit">등록된 선생님</button>
                <button type="button" data-tchmoda="new" data-tchmod-target="cgEdit">새로 등록</button>
              </div>
              <div id="cgEditTchExisting">
                <input type="email" id="cgEditTeacher" class="form-input" placeholder="teacher@example.com" list="cgTeacherList" autocomplete="off" />
              </div>
              <div id="cgEditTchNew" hidden>
                <div class="cd-bw-field">
                  <label class="cd-bw-label">선생님 이름</label>
                  <input type="text" id="cgEditTeacherName" class="form-input" placeholder="선생님 이름" maxlength="10" />
                </div>
                <div class="cd-bw-field">
                  <label class="cd-bw-label">이메일</label>
                  <input type="email" id="cgEditTeacherEmail2" class="form-input" placeholder="teacher@example.com" />
                </div>
                <p class="cd-desc" style="margin-top:4px">저장하면 선생님 계정이 함께 생성됩니다.</p>
              </div>
            </div>
          </div>
          <div class="cd-bw-sect">
            <div class="cd-bw-sect-head" style="background:var(--c-danger-50,#fff5f5);color:var(--c-danger)">
              <span class="material-symbols-outlined" style="color:var(--c-danger)">warning</span>
              <span>위험 구역</span>
            </div>
            <div class="cd-bw-sect-body">
              <div style="display:flex;align-items:center;justify-content:space-between;gap:16px">
                <div>
                  <div style="font-size:14px;font-weight:600;color:var(--c-ink)">반 삭제</div>
                  <div class="cd-desc">삭제하면 반 내 모든 설정이 초기화됩니다.</div>
                </div>
                <button class="btn danger" type="button" data-action="deleteClass" style="flex-shrink:0">반 삭제</button>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-foot">
          <button class="btn" type="button" data-close="cgEditModal">취소</button>
          <button class="btn primary" type="button" data-action="saveEditClass">저장</button>
        </div>
      </div>
    </div>

    <datalist id="cgTeacherList"></datalist>
  `;
  document.body.insertAdjacentHTML('beforeend', MODALS_HTML);
})();
