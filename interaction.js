
// La création d'un Dnd requière un canvas et un interacteur.
// L'interacteur viendra dans un second temps donc ne vous en souciez pas au départ.
function DnD(canvas, interactor) {
	// Définir ici les attributs de la 'classe'
	
	this.xinit = 0;
	this.yinit = 0;
	this.xfinal = 0;
	this.yfinal = 0;
	this.pression = false;
	
	this.canvas =canvas;
	this.interactor=interactor;
	
	
	// Developper les 3 fonctions gérant les événements
	this.maFctGerantLaPression = function (evt) {	
		this.pression = true;
 		var pos = getMousePosition(this.canvas, evt);

        this.xinit = pos.x;
        this.yinit = pos.y;

        this.interactor.onInteractionStart(this);
        console.log("Pression=(x:" + this.xinit + ",y:" + this.yinit+")");
    }.bind(this);

	this.maFctGerantLeDeplacement = function (evt) {
       if (this.pression) {
            var pos = getMousePosition(this.canvas, evt);
            this.xfinal = pos.x;
            this.yfinal = pos.y;
            this.interactor.onInteractionUpdate(this);
    	    console.log("En mouvement");
        }
    }.bind(this);

	this.maFctGerantLeRelachement = function (evt) {
	        if (this.pression) {
            var pos = getMousePosition(this.canvas, evt);
            this.xfinal = pos.x;
            this.yfinal = pos.y;
            this.pression = false;
            this.interactor.onInteractionEnd(this);
			
            console.log("Relachement=(x:" + this.xfinal + ",y:" + this.yfinal+")");
        }
    }.bind(this);

	// Associer les fonctions précédentes aux évènements du canvas.
	canvas.addEventListener('mousedown', this.maFctGerantLaPression, false);
    canvas.addEventListener('mousemove', this.maFctGerantLeDeplacement, false);
    canvas.addEventListener('mouseup', this.maFctGerantLeRelachement, false);
};

// Place le point de l'événement evt relativement à la position du canvas.
function getMousePosition(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
};