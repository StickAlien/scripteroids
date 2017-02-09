function Asteroid(ort, startX = 0, startY = 0, ordnung = 1){
	var breite = parseInt(getComputedStyle(ort, null).width);
	var hoehe = parseInt(getComputedStyle(ort, null).height);
	var richtung = 0;
	var tier = ordnung;
	var spin = Math.round(Math.random()*10-5);
	var tag = document.createElement("div");
	tag.innerHTML = "R";
	tag.className = "asteroiden";
	tag.style.fontSize = 96/tier+"px";
	tag.style.position = "absolute";
	var px = startX;
	var py = startY;
	tag.style.left = px+"px";
	tag.style.top = py+"px";
	var dx = Math.random()*4-2;
	var dy = Math.random()*4-2;
	ort.appendChild(tag);
	var mitteX = parseInt(getComputedStyle(tag, null).width)/2;
	var mitteY = parseInt(getComputedStyle(tag, null).height)/2;
	
	function rotieren(){
		richtung += spin;
		tag.style.transform = "rotate("+richtung+"deg)";
	}
	
	this.verschwinden = function(){
		ort.removeChild(this.getTag());
		for(i=asteroiden.length-1;i>=0;i--){
			if(asteroiden[i]==this){
				asteroiden.splice(i,1);
				break;
			}
		}
	}
	
	this.zerfallen = function(){
		dasGUI.killAsteroid(this.getTier());
		if(this.getTier()<3){
			asteroiden.push(new Asteroid(ort, this.getPx(), this.getPy(), (this.getTier()+1)));
			asteroiden.push(new Asteroid(ort, this.getPx(), this.getPy(), (this.getTier()+1)));
		}
		this.verschwinden();
	}
	
	this.bewegen = function(){
		px += dx;
		py += dy;
		if(px<0) px += breite;
		if(px>breite) px -= breite;
		if(py<0) py += hoehe;
		if(py>hoehe) py -= hoehe;
		tag.style.left = (px-mitteX)+"px";
		tag.style.top = (py-mitteY)+"px";
		rotieren();
	}
	
	this.getPx = function(){
		return px;
	}
	
	this.getPy = function(){
		return py;
	}
	
	this.getTag = function(){
		return tag;
	}
	
	this.getTier = function(){
		return tier;
	}
}