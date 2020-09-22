var editingMode = { rect: 0, line: 1 };

function Pencil(ctx, drawing, canvas) {
	this.currEditingMode = editingMode.line;
	this.currLineWidth = 5;
	this.currColour = '#000000';
	this.currentShape = 0;
	this.ctx = ctx;

	// Liez ici les widgets à la classe pour modifier les attributs présents ci-dessus.

document.getElementById('butRect').addEventListener("click", function () {
  this.currEditingMode = editingMode.rect;
	console.log("butRect checked");
}.bind(this));

document.getElementById('butLine').addEventListener("click", function () {
  this.currEditingMode = editingMode.line;
	console.log("butLine checked");
}.bind(this));

document.getElementById('spinnerWidth').addEventListener("change", function () {
 this.currLineWidth = document.getElementById('spinnerWidth').value;
	console.log("spinnerWidth changed "+document.getElementById('spinnerWidth').value);
}.bind(this));

document.getElementById('colour').addEventListener("change", function () {
     this.currColour = document.getElementById('colour').value;
	 console.log("color changed "+document.getElementById('colour').value);
}.bind(this));
     
	new DnD(canvas, this);

	// Implémentez ici les 3 fonctions onInteractionStart, onInteractionUpdate et onInteractionEnd
	
	this.onInteractionStart = function (myDnD) {
        this.currLineWidth = document.getElementById('spinnerWidth').value;
        this.currColour = document.getElementById('colour').value;
        
		if (document.getElementById('butRect').checked) {
            this.currEditingMode = editingMode.rect;
            console.log("Creation d'un rectangle");
        	this.currentShape = new Rectangle(myDnD.xinit,myDnD.yinit, 0, 0,this.currLineWidth,this.currColour);
        
        	drawing.paint(ctx, canvas);
     	    this.currentShape.paint(ctx, canvas);
        } else if (document.getElementById('butLine').checked) {
            this.currEditingMode = editingMode.line;
            console.log("Creation d'une ligne");
			this.currentShape = new Ligne(myDnD.xinit,myDnD.yinit,myDnD.xfinal,myDnD.yfinal,this.currLineWidth,this.currColour);
              
           // drawing.paint(ctx, canvas);
           // this.currentShape.paint(ctx, canvas);  
        }
    }.bind(this);

    this.onInteractionUpdate = function (myDnD) {
	if(this.currentShape != 0){
		switch (this.currEditingMode) {
            case editingMode.rect: {
			
		        this.currentShape = new Rectangle(myDnD.xinit,myDnD.yinit, myDnD.xfinal - myDnD.xinit, myDnD.yfinal - myDnD.yinit,this.currLineWidth,this.currColour);
                break;
            }
            case editingMode.line: {
				this.currentShape.xinit = myDnD.xinit;
				this.currentShape.yinit = myDnD.yinit;
				this.currentShape.xfinal = myDnD.xfinal;
				this.currentShape.yfinal = myDnD.yfinal;
				
                //this.currentShape = new Ligne(myDnD.xinit,myDnD.yinit,myDnD.xfinal,myDnD.yfinal,this.currLineWidth,this.currColour);
                break;
            }
        }
        drawing.paint(ctx, canvas);
        this.currentShape.paint(ctx, canvas);
	}
}.bind(this);

    this.onInteractionEnd = function (myDnD) {
        console.log("Ajout");
		if(this.currentShape != 0){
			this.currentShape.xfinal = myDnD.xfinal;
			this.currentShape.yfinal = myDnD.yfinal;
			this.currentShape.paint(this.ctx);
			drawing.addForme(this.currentShape);
			drawing.paint(this.ctx,this.canvas);
			drawing.updateShapeList(this.currentShape);
		}
		
        this.currentShape = 0;

    }.bind(this);
}