/* ============================================================================
   적립금 (classroom_deposit) 전용 모달
   포함: withdrawModal (출금 신청)
   ============================================================================ */

(function () {
  var MODALS_HTML = `
    <!-- 출금 신청 모달 -->
    <div class="modal-overlay" id="withdrawModal">
      <div class="modal" style="max-width:440px">
        <div class="modal-head">
          <div class="title">출금 신청</div>
          <button type="button" class="close" data-close="withdrawModal">×</button>
        </div>
        <div class="modal-body cd-bw-body">
          <div class="cd-bw-sect">
            <div class="cd-bw-sect-head">
              <span class="material-symbols-outlined">payments</span>
              <span>출금 금액</span>
            </div>
            <div class="cd-bw-sect-body">
              <div class="cd-bw-field">
                <label class="cd-bw-label">출금 신청 금액 <span class="cd-desc">(최소 100,000원)</span></label>
                <input class="form-input" type="number" id="wdAmount" placeholder="0" min="100000" step="10000" />
                <span id="wdAmountOver" style="display:none;font-size:12px;color:var(--c-danger);margin-top:4px">출금 가능 잔액을 초과했습니다.</span>
                <div style="display:flex;justify-content:space-between;margin-top:6px">
                  <span class="cd-desc">출금 가능 잔액</span>
                  <span class="cd-desc" id="wdAvailLabel">-</span>
                </div>
              </div>
            </div>
          </div>
          <div class="cd-bw-sect">
            <div class="cd-bw-sect-head">
              <span class="material-symbols-outlined">receipt_long</span>
              <span>수수료 안내</span>
            </div>
            <div class="cd-bw-sect-body" style="padding:0">
              <div style="padding:14px 20px;display:flex;flex-direction:column;gap:8px">
                <div style="display:flex;justify-content:space-between;font-size:14px">
                  <span class="muted">신청 금액</span><span id="wdCalcReq">-</span>
                </div>
                <div style="display:flex;justify-content:space-between;font-size:14px">
                  <span class="muted">정산 수수료 (5%)</span><span id="wdCalcFee" style="color:var(--c-danger)">-</span>
                </div>
                <div style="display:flex;justify-content:space-between;font-size:15px;font-weight:700;border-top:1px solid var(--c-divider);padding-top:10px;margin-top:2px">
                  <span>실수령액</span><span id="wdCalcNet" style="color:var(--c-brand)">-</span>
                </div>
                <p class="cd-desc" style="margin-top:2px">익월 말일에 등록 계좌로 지급됩니다.</p>
              </div>
            </div>
          </div>
          <div class="cd-bw-sect">
            <div class="cd-bw-sect-head">
              <span class="material-symbols-outlined">account_balance</span>
              <span>입금 계좌</span>
            </div>
            <div class="cd-bw-sect-body">
              <div class="cd-bw-2col">
                <div class="cd-bw-field">
                  <label class="cd-bw-label">은행</label>
                  <select class="form-input" id="wdBank">
                    <option value="">선택</option>
                    <option>국민은행</option><option>신한은행</option><option>우리은행</option>
                    <option>하나은행</option><option>기업은행</option><option>농협은행</option>
                    <option>카카오뱅크</option><option>토스뱅크</option><option>케이뱅크</option>
                    <option>새마을금고</option><option>수협은행</option><option>우체국</option>
                  </select>
                </div>
                <div class="cd-bw-field">
                  <label class="cd-bw-label">계좌번호</label>
                  <input class="form-input" type="text" id="wdAcctNum" placeholder="- 없이 입력" />
                </div>
              </div>
              <div class="cd-bw-field">
                <label class="cd-bw-label">예금주</label>
                <input class="form-input" type="text" id="wdAcctName" placeholder="예금주명" />
              </div>
              <label style="display:flex;align-items:flex-start;gap:10px;cursor:pointer;padding:12px 14px;background:var(--c-warning-50,#fffbeb);border:1px solid var(--c-warning-100,#fde68a);border-radius:8px;margin-top:4px">
                <input type="checkbox" id="wdDisclaimer" style="margin-top:3px;flex-shrink:0;accent-color:var(--c-brand)" />
                <span style="font-size:14px;line-height:1.5;color:var(--c-ink)">계좌번호 오입력으로 인한 미지급·오지급의 책임은 신청자에게 있으며, 이를 확인하고 동의합니다.</span>
              </label>
            </div>
          </div>
        </div>
        <div class="modal-foot">
          <button class="btn primary" type="button" id="wdSubmitBtn" disabled>신청하기</button>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', MODALS_HTML);
})();
