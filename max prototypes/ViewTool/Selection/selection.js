var text = '{"sites":[' +
'{"name":"Codeacademy", "url":"http://www.codeacademy.com", "tags":["9th Grade ","8th Grade ","Laptop ","Chromebook "],"description":"About Codecademy Codecademy is an education company. But not one in the way you might think. Were committed to building the best learning experience inside and out, making Codecademy the best place for our team to learn, teach, and create the online learning experience of the future. Education is old. The current public school system in the US dates back to the 19th century and wasnt designed to scale the way it has. Lots of companies are working to disrupt education by changing the way things work in the classroom and by bringing the classroom online.", "reviews":["I was not happy. -Feral, 13th Grade", "Great software, kids loved it -Linsey, 4th Grade", "It was pretty good -Tim, 7th Grade","I loved it.-Beth, 10th Grade"]}]}';
obj = JSON.parse(text);
 
function goToSite(){
	//console.log("test2");
	//var link = document.getElementById("link");
	window.location= obj.sites[0].url;
}



function addText(){
	//obj1 = JSON.parse(test);
	var tags ="";
	for( var i = 0; i < obj.sites[0].tags.length; i++){
		tags = tags + obj.sites[0].tags[i] + "<br />" + "<br />";
	}
	var reviews ="";
	for( var i = 0; i < obj.sites[0].tags.length; i++){
		reviews = reviews + obj.sites[0].reviews[i] + "<br />";
	}
	document.getElementById("review").innerHTML =
	reviews;
	document.getElementById("desc").innerHTML =
	obj.sites[0].description;
	document.getElementById("tags").innerHTML =
	tags;
}
window.onload = function(){
	addText();
}
