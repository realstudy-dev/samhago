/* ============================================================================
   구독 관리 (classroom_subscription) 전용 모달
   포함: changePlanModal (상품·인원 변경)
         cancelModal (구독 해지 3단계)
   ============================================================================ */

(function () {
  var MODALS_HTML = `
    <!-- 모달: 상품·인원 변경 -->
    <div class="modal-overlay" id="changePlanModal">
      <div class="modal" style="max-width:660px">
        <div class="modal-head">
          <div class="title">상품 · 인원 변경</div>
          <button class="close" type="button" data-close="changePlanModal">×</button>
        </div>
        <div class="modal-body">
          <div class="cd-desc" style="margin-bottom:10px">변경할 플랜을 선택하세요. 변경 요금은 <b>다음 결제일</b>부터 자동 적용됩니다.</div>
          <div class="cd-plan-grid" id="planGrid"></div>

          <div class="cd-form-block" id="subjectBlock">
            <div class="cd-form-block-label">이용 과목</div>
            <div class="cd-subject-pick" id="subjectPick"></div>
            <div class="cd-desc" id="subjectHint">3과목 상품은 국·영·수가 자동 선택됩니다.</div>
          </div>

          <div class="cd-change-preview" id="changePreview" hidden>
            <div class="cd-change-preview-row"><span>현재</span><b id="prevCur">[3과목] 50명 · 77,000원</b></div>
            <div class="cd-change-preview-row arrow"><span class="material-symbols-outlined">south</span></div>
            <div class="cd-change-preview-row"><span>변경 후</span><b id="prevNew">-</b></div>
            <div class="cd-change-preview-foot"><span>월 결제 금액 변동</span><b id="prevDiff">-</b></div>
            <div class="cd-desc">적용 시점: <b id="prevApply">2026-07-01 (다음 결제일)</b></div>
          </div>
        </div>
        <div class="modal-foot">
          <button class="btn" type="button" data-close="changePlanModal">취소</button>
          <button class="btn primary" type="button" id="btnSubmitChange" disabled>상품 변경 신청</button>
        </div>
      </div>
    </div>

    <!-- 모달: 구독 해지 (3단계) -->
    <div class="modal-overlay" id="cancelModal">
      <div class="modal">
        <div class="modal-head">
          <div class="title" id="cancelTitle">구독 해지</div>
          <button class="close" type="button" data-close="cancelModal">×</button>
        </div>
        <div class="modal-body">
          <!-- step 1: 사유 -->
          <div data-cancel-step="1">
            <p class="cd-modal-lead">구독을 해지하시려는 이유를 알려주세요.<br />더 나은 서비스를 위해 소중히 참고하겠습니다.</p>
            <div class="cd-form-block">
              <label class="cd-form-block-label" for="cancelReason">해지 사유</label>
              <select class="form-select" id="cancelReason" style="width:100%">
                <option value="">사유를 선택해주세요</option>
                <option value="NOT_USING">더 이상 이용하지 않음</option>
                <option value="COST">비용 부담</option>
                <option value="DISSATISFIED">서비스 불만족</option>
                <option value="SWITCH">다른 서비스로 변경</option>
                <option value="CLOSE">학원 폐원</option>
                <option value="ETC">기타</option>
              </select>
            </div>
            <div class="cd-form-block">
              <label class="cd-form-block-label" for="cancelMemo">자세한 내용 (선택)</label>
              <textarea class="form-textarea" id="cancelMemo" rows="3" placeholder="불편하셨던 점이나 개선이 필요한 부분을 자유롭게 적어주세요."></textarea>
            </div>
          </div>
          <!-- step 2: 최종 확인 -->
          <div data-cancel-step="2" hidden>
            <div class="cd-modal-center">
              <div class="cd-modal-icon warn"><span class="material-symbols-outlined">warning</span></div>
              <h3 class="cd-modal-h">구독을 해지할까요?</h3>
              <p class="cd-modal-lead"><b>111명</b>의 학생이 현재 학습 중입니다.<br /><b>2026-07-31</b>까지는 모든 기능을 그대로 이용할 수 있습니다.<br />이후 자동결제가 중지되고 서비스 접근이 종료됩니다. <b>(일할 환불 없음)</b></p>
            </div>
          </div>
          <!-- step 3: 완료 -->
          <div data-cancel-step="3" hidden>
            <div class="cd-modal-center">
              <div class="cd-modal-icon ok"><span class="material-symbols-outlined">check</span></div>
              <h3 class="cd-modal-h">구독이 해지되었습니다</h3>
              <p class="cd-modal-lead">그동안 세븐닷을 이용해 주셔서 진심으로 감사합니다.<br />이용권은 <b>2026-07-31</b>까지 유효하며, 종료일까지 모든 기능을 정상 이용하실 수 있습니다.<br />더 좋은 모습으로 준비하고 있겠습니다. 언제든 다시 찾아주세요.</p>
            </div>
          </div>
        </div>
        <div class="modal-foot" id="cancelFoot"></div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', MODALS_HTML);
})();
