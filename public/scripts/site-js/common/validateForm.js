var validationMsgs = [];
var htmlErrorZone;
function clearValidationMsgs(){
	validationMsgs = [];
}
function setHTMLErrorZone(htmlErrorDivjQElem){
	htmlErrorZone = htmlErrorDivjQElem;
}
function checkForUndefined(argNgModel,msg){
	if(angular.isUndefined(argNgModel) || argNgModel === ''){
		validationMsgs.push(msg);
	} 
}
function isFormInvalid(){
	return validationMsgs.length > 0; 
}
function showValidationMessages(processIfNoError){
	if(isFormInvalid()){
		var htmlStr = "<strong>Errors!</strong>";
		for(var validationMsgsIndex in validationMsgs){
			var message = validationMsgs[validationMsgsIndex];
			htmlStr+= "<li>"+message+"</li>";
		}
		htmlErrorZone.html("<ul>"+htmlStr+"</ul>");
	}else{
		processIfNoError();
	}	

}