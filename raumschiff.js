function Raumschiff(ort){
	var breite = parseInt(getComputedStyle(ort, null).width);
	var hoehe = parseInt(getComputedStyle(ort, null).height);
	var richtung = 0;
	var blockiert = false;
	var spin = 6;
	var impuls = 0.2;
	var dMax = 10;
	var akku = 100;
	var reaktor = 0.4;
	var triebwerk = true;
	var linksdrehen, rechtsdrehen, schubgeben, feuern;
	linksdrehen = rechtsdrehen = schubgeben = feuern = false;
	var tag = document.createElement("div");
	tag.innerHTML = "A";
	tag.className = "raumschiffe";
	tag.style.fontSize = "48px";
	tag.style.position = "absolute";
	var px = breite/2;
	var py = hoehe/2;
	tag.style.left = px+"px";
	tag.style.top = py+"px";
	var dx = 0;
	var dy = 0;
	ort.appendChild(tag);
	var mitteX = parseInt(getComputedStyle(tag, null).width)/2;
	var mitteY = parseInt(getComputedStyle(tag, null).height)/2;
	document.getElementsByTagName("body")[0].addEventListener("keydown", lenken);
	document.getElementsByTagName("body")[0].addEventListener("keyup", lenken);
	
	function lenken(ereignis){
		switch(ereignis.keyCode){
			case 87: schubgeben = (ereignis.type == "keydown");break;
			case 65: linksdrehen = (ereignis.type == "keydown");break;
			case 68: rechtsdrehen = (ereignis.type == "keydown");break;
			case 32: feuern = (ereignis.type == "keydown");break;
			default: ;
		}
	}
	
	function beschleunigen(){
		var bogen = (richtung-90) * Math.PI/180;
		var impulsX = impuls * Math.cos(bogen);
		var impulsY = impuls * Math.sin(bogen);
		var neudx = dx + impulsX;
		var neudy = dy + impulsY;
		var neudrift = Math.sqrt(neudx*neudx+neudy*neudy);
		if(neudrift<dMax){
			dx = neudx;
			dy = neudy;
		}
	}
	
	function schiessen(){
		if(!blockiert&&akku>=10){
			akku -= 10;
			geschosse.push(new Geschoss(ort, px, py, richtung));
			blockiert = true;
			window.setTimeout(function(){blockiert = false}, 400);
		}
	}
	
	this.verschwinden = function(){
		ort.removeChild(this.getTag());
		meinSchiff = null;
	}
	
	this.explodieren = function(){
		this.verschwinden();
	}
	
	this.bewegen = function(){
		if(linksdrehen) richtung -= spin;
		if(rechtsdrehen) richtung += spin;
		if(schubgeben&&triebwerk&&akku>=2){
			beschleunigen();
			akku -= 2;
		}
		if(feuern) schiessen();
		px += dx;
		py += dy;
		if(px<0) px += breite;
		if(px>breite) px -= breite;
		if(py<0) py += hoehe;
		if(py>hoehe) py -= hoehe;
		tag.style.left = (px-mitteX)+"px";
		tag.style.top = (py-mitteY)+"px";
		tag.style.transform = "rotate("+richtung+"deg)";
		console.log(akku);
		if(akku<1) triebwerk = false;
		if(akku>=20) triebwerk = true;
		if(akku<100-reaktor){
			akku += reaktor;
		}
		else{
			akku = 100;
		}
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
	
	this.getAkku = function(){
		return akku;
	}
}