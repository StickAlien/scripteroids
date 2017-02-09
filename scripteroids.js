var spielfeld, takt, meinSchiff, asteroiden, geschosse, einUFO, dasGUI;
spielfeld = document.getElementById("anzeige");

initialisieren(spielfeld);

function initialisieren(ort){
	asteroiden = [];
	geschosse = [];
	for(i=0;i<5;i++){
		asteroiden.push(new Asteroid(ort));
	}
	meinSchiff = new Raumschiff(ort);
	takt = window.setInterval(aktualisieren, 1000/60);
	dasGUI = new GUI(ort);
}

function aktualisieren(){
	for(var i=asteroiden.length-1;i>=0;i--){
		asteroiden[i].bewegen();
		if(meinSchiff&&abstand(asteroiden[i],meinSchiff)<50){
			meinSchiff.explodieren();
			asteroiden[i].zerfallen();
		}
	}
	
	for(var i=geschosse.length-1;i>=0;i--){
		geschosse[i].bewegen();
		if(geschosse[i]){
			for(var j=asteroiden.length-1;j>=0;j--){
				if(abstand(geschosse[i],asteroiden[j])<40){
					geschosse[i].verschwinden();
					asteroiden[j].zerfallen();
					break;
				}
			}
		}
	}
	
	if(meinSchiff) meinSchiff.bewegen();
	dasGUI.aktualisieren();
}

function abstand(one,two){
	var xAbstand = one.getPx()-two.getPx();
	var yAbstand = one.getPy()-two.getPy();
	var entfernung = Math.sqrt(xAbstand*xAbstand+yAbstand*yAbstand);
	return entfernung;
}