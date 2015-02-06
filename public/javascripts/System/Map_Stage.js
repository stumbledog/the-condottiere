function Map_Stage(){
	this.initialize(arguments);
}

Map_Stage.prototype = new createjs.Stage();

Map_Stage.prototype.stage_initialize = Map_Stage.prototype.initialize;

Map_Stage.prototype.initialize = function(){
	var args = Array.prototype.slice.call(arguments[0])[0];
	this.maps = args.maps;
	this.width = args.width;
	this.height = args.height;
	this.rows = args.rows;
	this.cols = args.cols;

	this.canvas = document.getElementById("bg");
	this.canvas.width = window.innerWidth;
	this.canvas.height = window.innerHeight;
	
	this.stage_initialize(this.canvas);
	
	this.game = Game.getInstance();

	this.block = [];
	for(var i = 0 ;i < this.rows; i++){
		this.block.push([]);
		this.block.push([]);
	}

	this.loader = this.game.getLoader();
	this.maps.forEach(function(map){
		for(i=0;i<map.tiles.length;i++){
			for(j=0;j<map.tiles[i].length;j++){
				if(map.tiles[i][j]>0){
					var index = map.tiles[i][j] - 1;
					var bitmap = new createjs.Bitmap(this.loader.getResult(map.id));
					bitmap.sourceRect = new createjs.Rectangle(map.tile_map[index][0],map.tile_map[index][1],map.tile_map[index][2],map.tile_map[index][3]);
					bitmap.cache(0,0,32,32);
					bitmap.x = j * 32;
					bitmap.y = i * 32;
					this.addChild(bitmap);
				}
				if(map.block){
					this.block[2*i][2*j] =  this.block[2*i+1][2*j] = this.block[2*i][2*j+1]= this.block[2*i+1][2*j+1] = map.tiles[i][j] > 0 ? 65535 : 'E';
				}
			}
		}
	}, this);

	this.update();
}

Map_Stage.prototype.getBlock = function(){
	return this.block;
}

Map_Stage.prototype.getSize = function(){
	return {width:this.width, height:this.height};
}