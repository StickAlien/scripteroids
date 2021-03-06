var spielfeld, takt, meinSchiff, asteroiden, geschosse, einUFO, dasGUI, leben;
spielfeld = document.getElementById("anzeige");

initialisieren(spielfeld);

function initialisieren(ort){
	asteroiden = [];
	geschosse = [];
	leben = 3;
	spawnAsteroids(ort,5);
	meinSchiff = new Raumschiff(ort);
	takt = window.setInterval(aktualisieren, 1000/60);
	dasGUI = new GUI(ort);
}

function aktualisieren(){
	for(var i=asteroiden.length-1;i>=0;i--){
		asteroiden[i].bewegen();
		if(meinSchiff&&abstand(asteroiden[i],meinSchiff)<50&&!meinSchiff.invin){
			meinSchiff.explodieren();
			asteroiden[i].zerfallen();
			if(leben>0){
				meinSchiff = new Raumschiff(spielfeld);
				meinSchiff.invincible();
			}
			else{
				alert("GAME OVER!");
			}
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
	
	if(asteroiden.length==0) spawnAsteroids(spielfeld,5);
	if(meinSchiff) meinSchiff.bewegen();
	dasGUI.aktualisieren();
}

function abstand(one,two){
	var xAbstand = one.getPx()-two.getPx();
	var yAbstand = one.getPy()-two.getPy();
	var entfernung = Math.sqrt(xAbstand*xAbstand+yAbstand*yAbstand);
	return entfernung;
}

function spawnAsteroids(ort,anzahl){
	for(i=0;i<anzahl;i++){
		asteroiden.push(new Asteroid(ort));
	}
}