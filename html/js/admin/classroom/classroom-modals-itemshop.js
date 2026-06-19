/* ============================================================================
   아이템 샵 (classroom_itemshop) 전용 모달
   포함: itemModal (상품 상세·수량) · orderModal (주문 정보) · confirmModal (주문 확정)
   ============================================================================ */

(function () {
  var MODALS_HTML = `
    <!-- 모달1: 상품 상세 · 수량 -->
    <div class="modal-overlay" id="itemModal">
      <div class="modal">
        <div class="modal-head">
          <div class="title">상품 상세</div>
          <button class="close" type="button" data-close="itemModal">×</button>
        </div>
        <div class="modal-body cd-bw-body">
          <div class="cd-bw-sect">
            <div class="cd-bw-sect-head">
              <span class="material-symbols-outlined">inventory_2</span>
              <span>상품 정보</span>
            </div>
            <div class="cd-bw-sect-body">
              <div class="cd-item-detail">
                <div class="cd-item-thumb" id="dThumb"><span class="material-symbols-outlined">inventory_2</span></div>
                <div class="cd-item-detail-info">
                  <span class="badge chip-color" id="dCat" style="--cat-color:var(--c-info-50);color:var(--c-info)">종이류</span>
                  <h3 id="dName" class="cd-item-detail-name">복사용지 A4</h3>
                  <p class="cd-desc" id="dDesc"></p>
                  <div class="cd-item-detail-price"><b id="dPrice">28,000</b>원 <span class="cd-desc">/ 개</span></div>
                  <div class="cd-desc" id="dStock">재고 42개 · 택배 (영업일 1~3일)</div>
                </div>
              </div>
            </div>
          </div>
          <div class="cd-bw-sect">
            <div class="cd-bw-sect-head">
              <span class="material-symbols-outlined">shopping_cart</span>
              <span>수량 · 결제</span>
            </div>
            <div class="cd-bw-sect-body">
              <div class="cd-qty-row" style="margin-bottom:12px">
                <span style="font-size:14px;font-weight:600;color:var(--c-ink-2)">수량</span>
                <div class="cd-stepper">
                  <button type="button" data-q="-1">−</button>
                  <input type="number" id="dQty" value="1" min="1" />
                  <button type="button" data-q="1">+</button>
                </div>
              </div>
              <div class="cd-pay-box" id="dPayBox"></div>
            </div>
          </div>
        </div>
        <div class="modal-foot">
          <button class="btn" type="button" data-close="itemModal">취소</button>
          <button class="btn primary" type="button" id="btnToOrder">적립금으로 결제</button>
        </div>
      </div>
    </div>

    <!-- 모달2: 주문 정보 입력 -->
    <div class="modal-overlay" id="orderModal">
      <div class="modal" style="max-width:560px">
        <div class="modal-head">
          <div class="title">주문 정보 입력</div>
          <button class="close" type="button" data-close="orderModal">×</button>
        </div>
        <div class="modal-body cd-bw-body">
          <div class="cd-bw-sect">
            <div class="cd-bw-sect-head">
              <span class="material-symbols-outlined">person</span>
              <span>받는 분</span>
            </div>
            <div class="cd-bw-sect-body">
              <div class="cd-bw-2col-eq">
                <div class="cd-bw-field">
                  <label class="cd-bw-label" for="oName">이름</label>
                  <input class="form-input" id="oName" placeholder="이름" />
                </div>
                <div class="cd-bw-field">
                  <label class="cd-bw-label" for="oPhone">연락처</label>
                  <input class="form-input" id="oPhone" placeholder="010-1234-5678" />
                </div>
              </div>
            </div>
          </div>
          <div class="cd-bw-sect">
            <div class="cd-bw-sect-head">
              <span class="material-symbols-outlined">local_shipping</span>
              <span>배송지</span>
            </div>
            <div class="cd-bw-sect-body">
              <div class="cd-bw-field">
                <label class="cd-bw-label">주소</label>
                <div class="cd-addr-row" style="margin-bottom:8px">
                  <input class="form-input" id="oZip" placeholder="우편번호" style="width:120px" readonly />
                  <button class="btn" type="button" id="btnFindAddr">우편번호 찾기</button>
                </div>
                <input class="form-input" id="oAddr1" placeholder="기본 주소" style="width:100%;margin-bottom:8px" readonly />
                <input class="form-input" id="oAddr2" placeholder="상세 주소" style="width:100%" />
              </div>
              <div class="cd-bw-field">
                <label class="cd-bw-label" for="oMemo">배송 메모</label>
                <select class="form-select" id="oMemo" style="width:100%">
                  <option value="">선택 안 함</option>
                  <option>부재 시 경비실에 보관해주세요</option>
                  <option>문 앞에 놓아주세요</option>
                  <option>택배함에 넣어주세요</option>
                  <option>배송 전 연락 부탁드려요</option>
                </select>
              </div>
            </div>
          </div>
          <div class="cd-bw-sect">
            <div class="cd-bw-sect-head">
              <span class="material-symbols-outlined">account_balance_wallet</span>
              <span>결제 정보</span>
            </div>
            <div class="cd-bw-sect-body">
              <div class="cd-pay-box" id="oPayBox" style="margin-bottom:12px"></div>
              <label class="cd-consent">
                <input type="checkbox" id="oConsent" />
                <span><b>[필수]</b> 개인정보 제3자 제공 동의</span>
                <button class="cd-link" type="button" id="btnConsentMore">자세히 ▼</button>
              </label>
              <div class="cd-consent-detail" id="consentDetail" hidden>
                <table class="tbl">
                  <tbody>
                    <tr><th>제공받는 자</th><td>판매업체</td></tr>
                    <tr><th>제공 항목</th><td>주문자명, 전화번호, 배송주소, 주문내역</td></tr>
                    <tr><th>이용 목적</th><td>상품 배송 및 배송 안내</td></tr>
                    <tr><th>보유 기간</th><td>배송 완료 후 5년</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-foot">
          <button class="btn" type="button" data-close="orderModal">취소</button>
          <button class="btn primary" type="button" id="btnToConfirm" disabled>적립금으로 결제</button>
        </div>
      </div>
    </div>

    <!-- 모달3: 주문 확정 -->
    <div class="modal-overlay" id="confirmModal">
      <div class="modal">
        <div class="modal-head">
          <div class="title">주문 확정</div>
          <button class="close" type="button" data-close="confirmModal">×</button>
        </div>
        <div class="modal-body cd-bw-body">
          <div class="cd-bw-sect">
            <div class="cd-bw-sect-head">
              <span class="material-symbols-outlined">account_balance_wallet</span>
              <span>결제 확인</span>
            </div>
            <div class="cd-bw-sect-body" style="text-align:center;padding:20px">
              <div class="cd-desc" style="margin-bottom:6px">적립금 결제 금액</div>
              <div class="cd-dep-amount"><span id="cAmount">28,000</span><span class="unit">원</span></div>
              <div class="cd-pay-box" id="cPayBox" style="margin-top:16px;text-align:left"></div>
            </div>
          </div>
          <div class="cd-bw-sect">
            <div class="cd-bw-sect-head">
              <span class="material-symbols-outlined">receipt</span>
              <span>주문 정보</span>
            </div>
            <div class="cd-bw-sect-body" style="padding:0">
              <div class="cd-confirm-block" style="margin:0">
                <div class="cd-confirm-row"><span>주문 상품</span><b id="cItem">복사용지 A4 ×1</b></div>
                <div class="cd-confirm-row"><span>받는 분</span><b id="cName">-</b></div>
                <div class="cd-confirm-row"><span>연락처</span><b id="cPhone">-</b></div>
                <div class="cd-confirm-row"><span>주소</span><b id="cAddr">-</b></div>
                <div class="cd-confirm-row" id="cMemoRow"><span>배송 메모</span><b id="cMemo">-</b></div>
              </div>
              <p class="cd-desc" style="padding:10px 20px">받는 분 정보는 판매업체에 이메일·카카오 알림톡으로 자동 전달됩니다.</p>
            </div>
          </div>
        </div>
        <div class="modal-foot">
          <button class="btn" type="button" data-close="confirmModal">취소</button>
          <button class="btn primary" type="button" id="btnFinalize">결제하기</button>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', MODALS_HTML);
})();
