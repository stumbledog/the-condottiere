function Item(){

}

Item.prototype.initialize = function(builder){
	this.game = Game.getInstance();
	this.user = this.game.getUser();
	this.loader = this.game.getLoader();

	this.container = new createjs.Container();

	this._id = builder._id;
	this.type = builder.type;
	this.index = -1;
	this.name = builder.name;

	this.sprite = builder.sprite;

	this.rating = builder.rating;
	this.price = builder.price;
	this.sell_price = Math.ceil(builder.price / 2);
	this.colors = ["#CCCCCC","#79BD8F","#FFD34E","#FFAFAF","#3E59CC"];
	this.repurchase = false;

	this.initIcon();
	this.initDetail();
}

Item.prototype.initIcon = function(){
	this.icon_img = new createjs.Bitmap(this.loader.getResult("icon"));
	this.icon_img.sourceRect = new createjs.Rectangle(parseInt(this.sprite.cropX), parseInt(this.sprite.cropY), parseInt(this.sprite.width), parseInt(this.sprite.height));
	this.icon_img.regX = this.sprite.width / 2;
	this.icon_img.regY = this.sprite.height / 2;

	this.coin = new createjs.Bitmap(this.loader.getResult("icon"));
	this.coin.sourceRect = new createjs.Rectangle(246, 55, 12, 12);
	this.coin.scaleX = this.coin.scaleY = 0.8;
}

Item.prototype.showDetail = function(x, y, container){
	if(this.bin.constructor.name === "Inventory"){
		this.sell_price_text.visible = true;
		this.sell_price_coin.visible = true;
	}else{
		this.sell_price_text.visible = false;
		this.sell_price_coin.visible = false;
	}
	this.detail.x = x;
	this.detail.y = y;
	container.addChild(this.detail);
}

Item.prototype.toObject = function(){
	var obj = {};
	for(key in this){
		if((typeof this[key] === "boolean" || typeof this[key] === "string" || typeof this[key] === "number"  && !isNaN(this[key]) || key === "attributes" || key === "icon" && this[key] || key === "projectile" && this[key] || key === "sprite" && this[key]) && key !== "summary_height"){
			obj[key] = this[key];
		}
	}
	return this.builder;
}