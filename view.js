// Implémenter ici les fonctions paint à ajouter dans chacune des classes du modèle.
Rectangle.prototype.paint = function(ctx) {
  Forme.prototype.paint.call(this, ctx);
  ctx.beginPath();
  ctx.fillStyle = this.couleur;
  ctx.rect(this.xinit, this.yinit, this.largeur, this.hauteur);
  ctx.stroke();
};

Ligne.prototype.paint = function(ctx) {
  Forme.prototype.paint.call(this, ctx);
  ctx.beginPath();
  ctx.fillStyle = this.couleur;
  ctx.moveTo(this.xinit, this.yinit);
  ctx.lineTo(this.xfinal, this.yfinal);
  ctx.stroke();
};

Forme.prototype.paint = function (ctx) {
    ctx.beginPath();
    ctx.strokeStyle = this.couleur;
    ctx.lineWidth = this.epaisseur;
};

Drawing.prototype.paint = function(ctx) {
  console.log(this.getFormes());
  ctx.fillStyle = '#F0F0F0';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  this.getFormes().forEach(function (TabElt) {
	if(TabElt != null){
		  TabElt.paint(ctx);	
	}
  });
};

Forme.prototype.clear = function (ctx) {    
  canvas.getContext('2d').fillStyle = '#F0F0F0';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};

Drawing.prototype.updateShapeList = function(forme){
	
    var ShapeList = document.getElementById('shapeList');
	var li = document.createElement("li");
	var Fo = "";

	if(forme instanceof Rectangle){
		Fo += "Rectangle(" + forme.xinit;
		Fo += "," + forme.yinit;
		Fo += "," + forme.xfinal;
		Fo += "," + forme.yfinal +")";
	}
	else if (forme instanceof Ligne){
		Fo += "Ligne(" + forme.xinit;
		Fo += "," + forme.yinit;
		Fo += "," + forme.xfinal;
		Fo += "," + forme.yfinal +")";
	}
	var Button = document.createElement("button",{ type : "button",class : "btn btn-default" });
	Button.innerHTML += "<span class=\"glyphicon glyphicon-remove-sign\"></span>";
	//Button.addEventListener("click",myFunction(forme));
	ShapeList.appendChild(li);
	
	li.appendChild(Button);
	li.innerHTML += Fo;
};

function myFunction(forme){
		console.log("Remove");
		Drawing.prototype.removeForme(forme);
}