function GUI(ort){
	this.punktzahl = 0;
	var punkte = document.createElement("div");
	punkte.innerHTML = this.punktzahl;
	punkte.id = "punkte";
	ort.appendChild(punkte);
	
	this.killAsteroid = function(tier){
		this.punktzahl += 20+30*(tier>1)+50*(tier>2);
		punkte.innerHTML = this.punktzahl;
	}
	
	var energie = document.createElement("div");
	energie.innerHTML = meinSchiff.getAkku();
	energie.id = "energie";
	ort.appendChild(energie);
}