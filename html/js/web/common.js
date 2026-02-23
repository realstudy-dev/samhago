/****************************************************************************
* URL
****************************************************************************/
function fn_url(){
	return "http://localhost:8080";
}

/****************************************************************************
* 로그아웃
****************************************************************************/
function fn_logout(){
	window.location ='/weblogin/tokenLogout.do';
}

/****************************************************************************
* 숫자 3자리 콤마 이벤트
****************************************************************************/
function fn_numberFormat(str) {
	str = String(str);
	return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}

/****************************************************************************
* 페이지 이동
****************************************************************************/
function fn_leftFormAction(action){
	var newForm = $("<form><form/>");
	newForm.attr("name","submitForm");
	newForm.attr("method","POST");
	
	if(action.indexOf("?") != -1) {
		var actionArr = action.split('?');
		newForm.attr("action",actionArr[0]);
		
		var paramUrlArr = actionArr[1].split('&');
		for(var i = 0; i < paramUrlArr.length; i++){
			var paramArr = paramUrlArr[i].split('=');
			newForm.append($('<input/>',{type:'hidden',name:paramArr[0],value:paramArr[1]}));
		}
	}else {
		newForm.attr("action",action);
	}
	
	// newForm.append($('<input/>',{type:'hidden',name:"menuCode",value:menuCode}));
	newForm.appendTo('body');
	newForm.submit();
}

/****************************************************************************
* 페이지 이동2
****************************************************************************/
function fn_leftFormAction2(menuClass, action){
	var newForm = $("<form><form/>");
	newForm.attr("name","submitForm");
	newForm.attr("method","POST");

	if(action.indexOf("?") != -1) {
		var actionArr = action.split('?');
		newForm.attr("action",actionArr[0]);

		var paramUrlArr = actionArr[1].split('&');
		for(var i = 0; i < paramUrlArr.length; i++){
			var paramArr = paramUrlArr[i].split('=');
			newForm.append($('<input/>',{type:'hidden',name:paramArr[0],value:paramArr[1]}));
		}
	}else {
		newForm.attr("action",action);
	}

	newForm.append($('<input/>',{type:'hidden',name:"menuClass",value:menuClass}));
	newForm.appendTo('body');
	newForm.submit();
}

/****************************************************************************
* 새창 이동 (미리보기)
****************************************************************************/
function fn_openPopup(action){
	var newForm = $("<form><form/>");
	newForm.attr("name","submitForm");
	newForm.attr("method","POST");
	newForm.attr("target","_blank");
	
	if(action.indexOf("?") != -1) {
		var actionArr = action.split('?');
		newForm.attr("action",actionArr[0]);
		
		var paramUrlArr = actionArr[1].split('&');
		for(var i = 0; i < paramUrlArr.length; i++){
			var paramArr = paramUrlArr[i].split('=');
			newForm.append($('<input/>',{type:'hidden',name:paramArr[0],value:paramArr[1]}));
		}
	}else {
		newForm.attr("action",action);
	}
	
	newForm.appendTo('body');
	newForm.submit();
}

/****************************************************************************
* 뒤로가기
****************************************************************************/
function fn_back(){
	history.back();
}

/****************************************************************************
* 새로고침
****************************************************************************/
function fn_reload(){
	location.reload();
}

/****************************************************************************
* 전화번호 형식 변경
* type:0이면 중간번호 가리기
****************************************************************************/
function fn_setFormatPhone(num,type){
	var formatNum = '';

	if(num.length==11){
		if(type==0){
			formatNum = num.replace(/(\d{3})(\d{4})(\d{4})/, '$1-****-$3');
		}else{
			formatNum = num.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
		}
	}else if(num.length==8){
		formatNum = num.replace(/(\d{4})(\d{4})/, '$1-$2');
	}else{
		if(num.indexOf('02')==0){
			if(type==0){
				formatNum = num.replace(/(\d{2})(\d{4})(\d{4})/, '$1-****-$3');
			}else{
				formatNum = num.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3');
			}
		}else{
			if(type==0){
				formatNum = num.replace(/(\d{3})(\d{3})(\d{4})/, '$1-***-$3');
			}else{
				formatNum = num.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
			}
		}
	}

	return formatNum;
}

/****************************************************************************
* datePicker 생성
****************************************************************************/
function fn_datePicker(id){
	$(id).datetimepicker({
		allowInputToggle: true,
		format: 'YYYY-MM-DD'
	});
	
}

/****************************************************************************
* datePicker 
****************************************************************************/
function fn_searchDatePicker(startId, endId){
	$(startId).datetimepicker({
		allowInputToggle: true,
		format: 'YYYY-MM-DD'
    });
	
    $(endId).datetimepicker({
		allowInputToggle: true,
		useCurrent: false, //Important! See issue #1075
		format: 'YYYY-MM-DD'
	});
    
    /*$(endId).data("DateTimePicker").minDate(fn_getToDate());*/
    
    $(endId).data("DateTimePicker").maxDate(fn_getToDate());
    $(endId).data("DateTimePicker").date(fn_getToDate());
    $(startId).data("DateTimePicker").maxDate(fn_getToDate());
    
    $(startId).on("dp.change", function (e) {
        $(endId).data("DateTimePicker").minDate(e.date);
        
        if($(endId).data("DateTimePicker").date() < e.date){
     	   $(endId).data("DateTimePicker").date(e.date);   
        }
    });
}

/****************************************************************************
* dateTimePicker 생성
****************************************************************************/
function fn_dateTimePicker1(id, value){
	
	if(value){
		$(id).datetimepicker({
			allowInputToggle: true,
			format: 'HH:mm',
			defaultDate: moment().format('YYYY-MM-DD')+'T'+ value
		});
	}else{
		$(id).datetimepicker({
			allowInputToggle: true,
			format: 'HH:mm'
		});
	}
	
}

/****************************************************************************
* dateTimePicker 생성 (AM, PM 선택)
****************************************************************************/
function fn_dateTimePicker2(id){
	$(id).datetimepicker({
		allowInputToggle: true,
        format: 'LT'
    }); 
}

/****************************************************************************
* dateTimePicker 생성
****************************************************************************/
function fn_dateTimePicker3(id){
	$(id).datetimepicker({
		allowInputToggle: true,
        format: 'YYYY-MM-DD HH:mm'
    });
}

/****************************************************************************
 * dateTimePicker 생성 (AM, PM 선택)
 ****************************************************************************/
function fn_dateMonthPicker(id){
	$(id).datetimepicker({
		allowInputToggle: true,
		format: 'YYYY-MM',
		defaultDate: moment().format('YYYY-MM')
	}); 
}

/****************************************************************************
* null 확인
****************************************************************************/
function fn_emptyYn(value){
	if( value == "" || value == null || value == undefined || ( value != null && typeof value == "object" && !Object.keys(value).length ) ){ 
		return true 
	}else{ 
		return false 
	} 
}


/****************************************************************************
* 오늘 날짜 조회
****************************************************************************/
function fn_getToDate() {
	var toDate = new Date();
	var newToDate = fn_formatToDate(toDate.getFullYear(), 4) + '-' + fn_formatToDate(toDate.getMonth() + 1, 2) + '-' + fn_formatToDate(toDate.getDate(), 2);
	
	return newToDate;
}

/****************************************************************************
* 어제 날짜 조회
****************************************************************************/
function fn_getToYesterday() {
	var toDate = new Date();
	var newToDate = fn_formatToDate(toDate.getFullYear(), 4) + '-' + fn_formatToDate(toDate.getMonth() + 1, 2) + '-' + fn_formatToDate(toDate.getDate()-1, 2);
	
	return newToDate;
}

/****************************************************************************
* 날짜 형식 맞추기
****************************************************************************/
function fn_formatToDate(day, number) {
	var temp = '';
	day = day.toString();
	
	if (day.length < number) {
		for (i = 0; i < number - day.length; i++){
			temp += '0';
		}
	}
	
	return temp + day;
}

/****************************************************************************
* 날짜 월 조회 YYYY-mm-dd
****************************************************************************/
function fn_getMonthFromDate(param){

	let date = new Date(param);

	let month = date.getMonth()+1;

	return month;
}

/****************************************************************************
* 날짜 요일 조회
****************************************************************************/
function fn_getDayName(param){
	var paramArray = param.split('-');
	var week = new Array('일', '월', '화', '수', '목', '금', '토');	
	var dt = new Date(parseInt(paramArray[0]), parseInt(paramArray[1])-1, parseInt(paramArray[2]));
	var dayName = week[dt.getDay()];
	
	return dayName;
}

/*************************************************************************
* 날짜 형식 변환
* A: 년월일
* B: 월일
* C: 년월일 시간
* D: 년.월.일
**************************************************************************/
function setFormatDate(type, param) {
	var retureValue = param;
	
	if(type=="A"){
		var dateArray = param.split("-");
		retureValue = dateArray[0]+"년 "+dateArray[1]+"월 "+dateArray[2]+"일";
	}else if(type=="B"){
		var dateArray = param.split("-");
		retureValue = dateArray[1]+"월 "+dateArray[2]+"일";
	}else if(type=="C"){
		var tempArray = param.split(" ");
		var dateArray1 = tempArray[0].split("-");
		var dateArray2 = tempArray[1];
		
		retureValue = dateArray1[0]+"년 "+dateArray1[1]+"월 "+dateArray1[2]+"일 "+dateArray2;
	}if(type=="D"){
		var dateArray = param.split("-");
		retureValue = dateArray[0].substring(2, 4)+"."+dateArray[1]+"."+dateArray[2];
	}
	
	return retureValue;
}

/****************************************************************************
* 빈값 체크
****************************************************************************/
function fn_emptyCheck(param){
	if(param === null || param === "" || param === "null" || param === "NULL" || param === undefined || param === "undefined"){
		return false;
	}else{
		return true;
	}
}

/****************************************************************************
* 길이 체크
****************************************************************************/
function fn_lengthCheck(str, maxLength){
	var strLength = str.length;

	if(strLength > maxLength){
		return false;
	}else{
		return true;
	}
}

/****************************************************************************
* 날짜 체크
****************************************************************************/
function fn_dateCheck(value){
	var strLength = value.length;
	var cnt = 0;
	var searchChar = "-"; // 찾으려는 문자
	var pos = value.indexOf(searchChar); // pos는 0의 값을 가짐

	if(strLength == 10){

		while(pos !== -1){
			cnt++;
			pos = value.indexOf(searchChar, pos + 1) // 첫 번째 - 이후의 인덱스부터 -를 찾음
		}

		if(cnt == 2){

			return true;
		}else{
			return false;
		}

	}else{
		return false;
	}
	// var date = value.split("-");
	// var y = parseInt(date[0], 10),
	// 	m = parseInt(date[1], 10),
	// 	d = parseInt(date[2], 10);
	//
	// var dateRegex = /^(?=\d)(?:(?:31(?!.(?:0?[2469]|11))|(?:30|29)(?!.0?2)|29(?=.0?2.(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))(?:\x20|$))|(?:2[0-8]|1\d|0?[1-9]))([-.\/])(?:1[012]|0?[1-9])\1(?:1[6-9]|[2-9]\d)?\d\d(?:(?=\x20\d)\x20|$))?(((0?[1-9]|1[012])(:[0-5]\d){0,2}(\x20[AP]M))|([01]\d|2[0-3])(:[0-5]\d){1,2})?$/;
	// if(dateRegex.test(d+'-'+m+'-'+y)){
	// 	return true;
	// }else{
	// 	return false;
	// }
}

/****************************************************************************
* 날짜 시간 체크
****************************************************************************/
function fn_dateTimeCheck(value){
	var strLength = value.length;
	var cnt = 0;
	var searchChar = "-"; // 찾으려는 문자
	var pos = value.indexOf(searchChar); // pos는 0의 값을 가짐

	if(strLength == 10){

		while(pos !== -1){
			cnt++;
			pos = value.indexOf(searchChar, pos + 1) // 첫 번째 - 이후의 인덱스부터 -를 찾음
		}

		if(cnt == 2){

			return true;
		}else{
			return false;
		}

	}else{
		return false;
	}

	// var date = value.split("-");
	// var y = parseInt(date[0], 10),
	// 	m = parseInt(date[1], 10),
	// 	d = parseInt(date[2], 10);
	//
	// var dateRegex = /^(?=\d)(?:(?:31(?!.(?:0?[2469]|11))|(?:30|29)(?!.0?2)|29(?=.0?2.(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))(?:\x20|$))|(?:2[0-8]|1\d|0?[1-9]))([-.\/])(?:1[012]|0?[1-9])\1(?:1[6-9]|[2-9]\d)?\d\d(?:(?=\x20\d)\x20|$))?(((0?[1-9]|1[012])(:[0-5]\d){0,2}(\x20[AP]M))|([01]\d|2[0-3])(:[0-5]\d){1,2})?$/;
	// if(dateRegex.test(d+'-'+m+'-'+y)){
	// 	return true;
	// }else{
	// 	return false;
	// }
}

/****************************************************************************
* 첨부파일 최대 용량
****************************************************************************/
function fn_maxFileSize(){
	return 52428800;
}

/****************************************************************************
* 첨부파일 최대 갯수 : 10
****************************************************************************/
function fn_maxFileCount(){
	return 10;
}

/****************************************************************************
* 첨부파일 최대 갯수 : 5
****************************************************************************/
function fn_maxFileCount2(){
	return 5;
}

/****************************************************************************
* 개행문자  br태그로 변경
****************************************************************************/
function fn_replaceBrTag(param){
	let result = param.replaceAll(/\n/ig, '<br>');

	return result;
}

/****************************************************************************
* 뒤로가기시 모달 닫기
****************************************************************************/
function modalCloseEvent(){
	let modalCheck = false;
	let modalArrLength = modalArr.length;

	for(let i=0;i<modalArrLength;i++){
		let modalName = modalArr[i];
		if(location.hash=='#'+modalName){
			modalCheck = true;

			break;
		}
	}

	if(location.hash=='#'+modalArr[modalArr.length-1]){
		modalBackYn = 'N';
	}else{
    	let modalName = modalArr[modalArr.length-1];

    	modalBackYn = 'Y';


		if("commonModal"==modalName && true==modalCheck){
			modalEvent.close();
		}else if("examResultDetailModal"==modalName && true==modalCheck){
			$("#examResultDetailModal .modal-header img").click();
		}else if("testKoreanResultDetailModal"==modalName && true==modalCheck){
			$("#testKoreanResultDetailModal .modal-header img").click();
		}else if("testEnglishResultDetailModal"==modalName && true==modalCheck){
			$("#testEnglishResultDetailModal .modal-header img").click();
		}else if("examResultDetailModal2"==modalName && true==modalCheck){
			$("#examResultDetailModal2 .modal-header img").click();
		}else if("examResultDetailModal3"==modalName && true==modalCheck){
			$("#examResultDetailModal3 .modal-header img").click();
		}else if("examResultDetailModal4"==modalName && true==modalCheck){
			$("#examResultDetailModal4 .modal-header img").click();
		}else if("popup_insertPlannerCategory"==modalName && true==modalCheck){
			$("#popup_insertPlannerCategory .modal-header img").click();
		}else if("popup_insertPlanner"==modalName && true==modalCheck){
			$("#popup_insertPlanner .modal-header img").click();
		}else if("modalItemShop"==modalName && true==modalCheck){
			$("#modalItemShop .modal-header img").click();
		}else if("purchas"==modalName && true==modalCheck){
			$("#purchas .modal-header img").click();
		}else if("lack"==modalName && true==modalCheck){
			$("#lack .modal-header img").click();
		}else if("examEndModal"==modalName && true==modalCheck){
			$("#examEndModal #endLevelTestBtn").click();
		}else if("tutorialModal"==modalName && true==modalCheck){
			$("#tutorialModal .modal-header img").click();
		}else{
			//hash명이 정의되지않은 이름일시 팝업 전부 닫기

			let modalArrLength = modalArr.length;

			for(let i=0;i<modalArrLength;i++){
				fn_modalBackCloseEvent(modalArr[modalArr.length-1]);
			}
			modalArr = new Array();
		}
	}
}

//모달 Array에 있는 이름으로 닫기
function fn_modalBackCloseEvent(modalNameParam){
	if("commonModal"==modalNameParam){
		modalEvent.close();
	}else if("examResultDetailModal"==modalNameParam){
		$("#examResultDetailModal .modal-header img").click();
	}else if("testKoreanResultDetailModal"==modalNameParam){
		$("#testKoreanResultDetailModal .modal-header img").click();
	}else if("testEnglishResultDetailModal"==modalNameParam){
		$("#testEnglishResultDetailModal .modal-header img").click();
	}else if("examResultDetailModal2"==modalNameParam){
		$("#examResultDetailModal2 .modal-header img").click();
	}else if("examResultDetailModal3"==modalNameParam){
		$("#examResultDetailModal3 .modal-header img").click();
	}else if("examResultDetailModal4"==modalNameParam){
		$("#examResultDetailModal4 .modal-header img").click();
	}else if("popup_insertPlannerCategory"==modalNameParam){
		$("#popup_insertPlannerCategory .modal-header img").click();
	}else if("popup_insertPlanner"==modalNameParam){
		$("#popup_insertPlanner .modal-header img").click();
	}else if("modalItemShop"==modalNameParam){
		$("#modalItemShop .modal-header img").click();
	}else if("purchas"==modalNameParam){
		$("#purchas .modal-header img").click();
	}else if("lack"==modalNameParam){
		$("#lack .modal-header img").click();
	}else if("examEndModal"==modalNameParam){
		$("#examEndModal #endLevelTestBtn").click();
	}else if("tutorialModal"==modalNameParam) {
		$("#tutorialModal .modal-header img").click();
	}
}