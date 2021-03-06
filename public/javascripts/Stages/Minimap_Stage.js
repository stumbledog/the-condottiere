function Minimap_Stage(){
	this.initialize();
}

createjs.extend(Minimap_Stage, createjs.Stage);
Minimap_Stage = createjs.promote(Minimap_Stage, "Stage");

Minimap_Stage.prototype.initialize = function(){
	this.canvas = document.getElementById("minimap");
	//this.canvas.width = 160;
	//this.canvas.height = 160;

	this.Stage_constructor(this.canvas);
	this.enableMouseOver();

	this.game = Game.getInstance();
	this.map = this.game.getMapStage();
	this.loader = this.game.getLoader();


	this.renderBlock();
	this.update();
}

Minimap_Stage.prototype.renderBlock = function(){
	var block = this.map.getBlock();
	var size = this.map.getSize();
	this.max_side = size.width > size.height ? size.width : size.height;



	var background = new createjs.Shape();

	this.canvas.width = size.width / this.max_side * 160;
	this.canvas.height = size.height / this.max_side * 160;

	background.graphics.f("#fff").dr(0, 0, size.width / this.max_side * 160, size.height / this.max_side * 160);
	this.addChild(background);


	block.forEach(function(rows, index_row){
		rows.forEach(function(cell, index_col){
			if(cell === 65535){
				var block_shape = new createjs.Shape();
				block_shape.graphics.f("#A7A37E").dr(index_col / this.max_side * 160 * 16, index_row / this.max_side * 160 * 16, 160 / this.max_side * 16, 160 / this.max_side * 16);
				this.addChild(block_shape);
			}
		}, this);
	}, this);
}

Minimap_Stage.prototype.initUnits = function(units){
	units.forEach(function(unit){
		unit.minimap_block = new createjs.Shape();
		unit.minimap_block.graphics.f(unit.health_color).dr(0, 0, 160 / this.max_side * 16, 160 / this.max_side * 16);
		unit.minimap_block.x = unit.x / this.max_side * 160;
		unit.minimap_block.y = unit.y / this.max_side * 160;
		this.addChild(unit.minimap_block);
	}, this);
}

Minimap_Stage.prototype.renderUnits = function(units){
	units.forEach(function(unit){
		unit.minimap_block.x = unit.x / this.max_side * 160;
		unit.minimap_block.y = unit.y / this.max_side * 160;
	}, this);
	this.update();
}

Minimap_Stage.prototype.removeMinimapBlock = function(unit){
	this.removeChild(unit.minimap_block);
}