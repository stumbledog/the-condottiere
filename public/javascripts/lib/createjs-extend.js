function OutlineText(text, style, color, outline_color, outline_width){
	this.initialize(text, style, color, outline_color, outline_width);
}

createjs.extend(OutlineText, createjs.Container);
OutlineText = createjs.promote(OutlineText, "Container");

OutlineText.prototype.initialize = function(text, style, color, outline_color, outline_width){
	this.Container_constructor();
	this.text = new createjs.Text(text, style, color);
	this.outline = this.text.clone();
	this.outline.color = outline_color;
	this.outline.outline = outline_width;
	this.addChild(this.outline, this.text);
}

OutlineText.prototype.getMeasuredWidth = function(){
	return this.outline.getMeasuredWidth();
}

OutlineText.prototype.textAlign = function(textAlign){
	this.text.textAlign = textAlign;
	this.outline.textAlign = textAlign;
}