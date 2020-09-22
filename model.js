// Implémenter ici les 4 classes du modèle.
// N'oubliez pas l'héritage !
// Drawing,Rectangle,ligne,forme

function Drawing() {

    this.formes = new Array();

	//add
    Drawing.prototype.addForme = function(forme) { 
   	 this.formes.push(forme);
    }.bind(this);

	//remove
    Drawing.prototype.removeForme = function(forme) { 
		const index = this.formes.indexOf(forme);
		console.log(index);
		//console.log(this.formes);
		if (index > -1) {
  			this.formes.splice(index, 1);
		}
		//console.log(this.formes);
   		//this.formes.remove(forme);
   	 }.bind(this);
	
	//get
    Drawing.prototype.getFormes = function () {
        return this.formes;
    }.bind(this);
}

function Forme(c,e) {
    this.couleur = c;
    this.epaisseur = e;
}

function Rectangle(PtHGx, PtHGy, largeur, hauteur, epaisseur, couleur) {
    Forme.call(this,couleur,epaisseur);
    this.xinit = PtHGx;
    this.yinit = PtHGy;
    this.largeur = largeur;
    this.hauteur = hauteur;
}
Rectangle.prototype = new Forme();

function Ligne(ax, ay, bx, by,epaisseur,couleur) {
    Forme.call(this, couleur,epaisseur);
    this.xinit = ax;
    this.yinit = ay;
    this.xfinal = bx;
    this.yfinal = by;
}
Ligne.prototype = new Forme();
