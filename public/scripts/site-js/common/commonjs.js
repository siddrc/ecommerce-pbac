function genericAjaxErrorHandler(){
	$.notify({
		title: '<strong>Heads up!</strong>',
		message: 'Something went wrong,please contact tech support.'
	},{
		type: 'danger'
	});
}
function dataSavedToDatabase(msg){
	$.notify({
		title: '<strong>Done!</strong>',
		message:msg
	},{
		type: 'success'
	});
}
function showSuccessMessage(msg){
	$.notify({
		message:msg
	},{
		type: 'success'
	});
}
function showErrorMessage(msg){
	$.notify({
		title: '<strong>Heads up!</strong>',
		message: msg
	},{
		type: 'danger'
	});
}
function genericAjaxErrorHandlerSpecific(msg){
	// Error code is client side js file name/method name
	$.notify({
		title: '<strong>Heads up!</strong>',
		message: 'Something went wrong,please contact tech support. Error code:'+msg
	},{
		type: 'danger'
	});
}
function isChecked(id) {
	var checked = $("input[id=" + id + "]:checked").length;
	if (checked === 0) {
		return "";
	} else {
		return $("#" + id).val();
	}
}
function checkDate(date,idOfButton,idOfDivErrorZone){
	var minDateForScheduledBuild = new Date();
	if(typeof date == 'undefined'){
		disableEnableButton(idOfButton,true);
		showErrorForDateTimePicker(idOfDivErrorZone,"<div class=\'alert alert-danger\' role=\'alert\'>Please select a date/time.</div>");
		return false;
	}
	else if(date !== undefined && date < minDateForScheduledBuild){
		disableEnableButton(idOfButton,true);
		showErrorForDateTimePicker(idOfDivErrorZone,"<div class=\'alert alert-danger\' role=\'alert\'>Please select a futuristic build date/time.</div>");
		return false;
	}else{
		showErrorForDateTimePicker(idOfDivErrorZone,'');
		disableEnableButton(idOfButton,false);
		return true;
	}
}
function onlyCheckDate(date,idOfDivErrorZone){
	var minDateForScheduledBuild = new Date();
	if(typeof date == 'undefined'){
		showErrorForDateTimePicker(idOfDivErrorZone,"<div class=\'alert alert-danger\' role=\'alert\'>Please select a date/time.</div>");
		return false;
	}
	else if(date !== undefined && date < minDateForScheduledBuild){
		showErrorForDateTimePicker(idOfDivErrorZone,"<div class=\'alert alert-danger\' role=\'alert\'>Please select a futuristic build date/time.</div>");
		return false;
	}else{
		showErrorForDateTimePicker(idOfDivErrorZone,'');
		return true;
	}
}
function showErrorForDateTimePicker(idOfDiv,msg){
	$('#'+idOfDiv).html('');
	$('#'+idOfDiv).html(msg);
}
function disableEnableButton(idOfButton,booleanValue){
	$('#'+idOfButton).prop('disabled', booleanValue);
}


