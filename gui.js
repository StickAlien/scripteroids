function GUI(ort){
	this.punktzahl = 0;
	var punkte = document.createElement("div");
	punkte.innerHTML = this.punktzahl;
	punkte.id = "punkte";
	ort.appendChild(punkte);
	
	this.killAsteroid = function(tier){
		this.punktzahl += 20+30*(tier>1)+50*(tier>2);
	}
	
	var energie = document.createElement("div");
	energie.id = "energie";
	ort.appendChild(energie);
	var needEnergie = document.createElement("div");
	needEnergie.id ="needEnergie";
	energie.appendChild(needEnergie);
	var energieBalken = document.createElement("div");
	energieBalken.id = "energieBalken"
	energieBalken.style.width = meinSchiff.getAkku()+"%";
	energie.appendChild(energieBalken);
	
	this.aktualisieren = function(){
		punkte.innerHTML = this.punktzahl;
		if(meinSchiff){
			energieBalken.style.width = meinSchiff.getAkku()+"%";
		}
		else{
			energieBalken.style.width = "0%";
		}
	}
}