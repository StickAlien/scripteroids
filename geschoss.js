function Geschoss(ort, startX, startY, winkel){
	var breite = parseInt(getComputedStyle(ort, null).width);
	var hoehe = parseInt(getComputedStyle(ort, null).height);
	var richtung = winkel;
	var dmax = 20;
	var px = startX;
	var py = startY;
	var bogen = (richtung-90) * Math.PI/180;
	var dx = dmax * Math.cos(bogen);
	var dy = dmax * Math.sin(bogen);
	var tag = document.createElement("div");
	tag.innerHTML = "I";
	tag.className = "geschosse";
	tag.style.fontFamily = "arial";
	tag.style.fontSize = "24px";
	tag.style.position = "absolute";
	tag.style.left = px+"px";
	tag.style.top = py+"px";
	tag.style.transform = "rotate("+richtung+"deg)";
	ort.appendChild(tag);
	var mitteX = parseInt(getComputedStyle(tag, null).width)/2;
	var mitteY = parseInt(getComputedStyle(tag, null).height)/2;
	
	this.verschwinden = function(){
		ort.removeChild(this.getTag());
		for(i=geschosse.length-1;i>=0;i--){
			if(geschosse[i]==this){
				geschosse.splice(i,1);
				break;
			}
		}
	}
	
	this.bewegen = function(){
		
		if(px>0&&px<breite&&py>0&&py<hoehe){
			px += dx;
			py += dy;
			tag.style.left = (px-mitteX)+"px";
			tag.style.top = (py-mitteY)+"px";
		} 
		else this.verschwinden();
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
}