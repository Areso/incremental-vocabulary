ivoc = { }
function clearLocalAccount(){
	localStorage.removeItem('ivoc')
}
function checkLocalAccount(){
	if (localStorage.getItem('ivoc')!==null) {
		ivoc = JSON.parse(localStorage.getItem('ivoc'))
		token = ivoc.token 
		console.log(token)
	} else {
		showDialog()
	}
}
function showDialog(){
	result = prompt("new user? type yes or no", "yes");
	if (result ==="yes") {
		createNewAcc();
	}
}
function createNewAcc(){
	url = webserver +'/api/create_account';
	makeAjaxCall(url, 'POST', '', setupAcc);
}
function setupAcc(answerJson){
	console.log("setup account");
	console.log(answerJson["token"])
	console.log(ivoc)
	ivoc.token = answerJson["token"];
	console.log(ivoc.token);
	console.log(ivoc);
	localStorage.setItem('ivoc', JSON.stringify(ivoc));
}
function loadFromCloud(){
	
}
function makeAjaxCall(url, methodType, dataToSend, callback){
   var xhr = new XMLHttpRequest();
   xhr.open(methodType, url, true);
   xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
   if (methodType==="GET"){
     xhr.send();
   } else {
     xhr.send(dataToSend);
   }
   xhr.onreadystatechange = function(){
     if (xhr.readyState === 4){
        if (xhr.status === 200){
           console.log("xhr done successfully");
           var resp = xhr.responseText;
           console.log(resp)
           var respJson = JSON.parse(resp);
           console.log(respJson)
           callback(respJson);
        } else {
           console.log("xhr failed");
        }
     } else {
        console.log("xhr processing going on");
     }
   }
   console.log("request sent succesfully");
}
checkLocalAccount();
