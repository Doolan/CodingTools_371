


window.KO_MODEL;
$(document).ready(function(){
	var KO_MODEL = ViewToolsMain({"filters": [
														{
															"name":"Sites",
															"options":JSONSITEINFO
														}
													],"siteData":JSONSITEINFO

	});


	ko.applyBindings(KO_MODEL);

});



// --------------------- Models ---------------------------------//


var siteInfo = function(data){
	var self = this;
	self.name = data.name;
	self.url = data.url;
	self.img = data.img;
	self.reviews = data.reviews;
	self.desc = data.desc;
	self.tags = data.tags;
}

var ViewToolsMain = function(data){
	var self = this;
	self.siteInfo = ko.observable(new siteInfo(data.siteData));
	
};

function displayTags(){
	var tagsArea = document.getElementById("tags");
	//var output = "";
	var tagsToAdd = siteInfo().tags;
	for(var i = 0; i < tagsToAdd.length; i++){
		//output = output + tagsToAdd[i];
		var newSpan = document.createElement("span");
		newSpan.style.width = "100px";
		newSpan.style.height = "50px";
		newSpan.style.border = "1px solid black"; 
		newSpan.style.fontSize = "25px";
		newSpan.style.padding = "5px";
	    newSpan.innerHTML = tagsToAdd[i];
	    tagsArea.appendChild(newSpan);
		
	}
	//document.getElementById("tags").innerHTML = output;
	//console.log(document.getElementById("tags").innerHTML)
	
		
		
//	document.getElementById("test").innerHTML = siteInfo().tags[0];
//	var text = document.getElementById("tags").text;
//	console.log(text);
}

function settupLink(){
	var url = siteInfo().url;
	document.getElementById("link").href = url;
//	console.log(url);
}

function setBackground(){
	var img = siteInfo().img;
	document.getElementById("jumbotron").style.backgroundImage = "url(" + img + ")"
}

window.onload = function() {
	displayTags();
	settupLink();
};




/**--------------SAMPLE DATA-------------------**/
var JSONSITEINFO = 
{
	"name": "Code Academy",
	"url": "http://www.codeacademy.com",
	"img": "../img/Codeacademy.jpg",
	"desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut nisi tortor, eleifend a nulla sit amet, euismod cursus felis. Duis tincidunt sodales fermentum. Sed finibus tempus augue fringilla lobortis. Aenean mollis massa dui, id lacinia risus feugiat vitae. Duis tincidunt enim a neque accumsan hendrerit. Donec mollis, odio vitae finibus efficitur, quam diam efficitur diam, ac rhoncus justo est id urna. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
	"reviews": ["review1 ", "review 2"],
	"tags": ["9th Grade ","8th Grade ","Laptop ","Chromebook "]
}
;
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    

