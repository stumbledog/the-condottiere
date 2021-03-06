function Weapon(builder){
	this.weapon_initialize(builder);
}

Weapon.prototype = new Item();
Weapon.prototype.constructor = Weapon;

Weapon.prototype.weapon_initialize = function(builder){
	this._id = builder._id;
	this.attack_type = builder.attack_type;
	this.projectile = builder.projectile;
	this.hand = builder.hand;
	this.level = builder.level;
	this.part = builder.part;
	this.qty = 1;
	this.min_damage = builder.min_damage;
	this.max_damage = builder.max_damage;
	this.attack_speed = builder.attack_speed;
	this.range = builder.range;
	this.attributes = builder.attributes;
	this.attributes_index = builder.attributes_index;
	this.builder = builder;

	this.initialize(builder);
	this.initBitmap();
}

Weapon.prototype.initBitmap = function(){
	var bitmap = new createjs.Bitmap(this.loader.getResult("icon"));
	bitmap.sourceRect = new createjs.Rectangle(parseInt(this.sprite.cropX), parseInt(this.sprite.cropY), parseInt(this.sprite.width), parseInt(this.sprite.height));
	bitmap.regX = this.sprite.regX;
	bitmap.regY = this.sprite.regY;
	bitmap.scaleX = bitmap.scaleY = this.sprite.scale;
	this.bitmap = bitmap;
}

Weapon.prototype.initDetail = function(){
	this.detail = new createjs.Container();
	var ratings = ["Common", "Uncommon", "Rare", "Epic", "Legendary"];
	var rating_text = new OutlineText(ratings[this.rating - 1] + " Weapon", "10px Arial", this.colors[this.rating - 1], "#333", 3);
	var name_text = new createjs.Text(this.name.replace("\n", " "), "10px Arial", "#000");
	var hand_text = new createjs.Text(this.hand+"-hand", "10px Arial", "#000");
	var damage_amount_text = new createjs.Text("", "bold 16px Arial", "#C00");
	var damage_text = new createjs.Text("Damage", "10px Arial", "#C00");
	var attack_speed_text = new createjs.Text("", "10px Arial", "#000");
	var dps_text = new createjs.Text("", "10px Arial", "#000");
	var level_text = new createjs.Text("Item Level: " + this.level, "10px Arial", "#000");
	this.sell_price_text = new createjs.Text(this.sell_price, "10px Arial", "#000");
	this.sell_price_coin = this.coin.clone();

	rating_text.x = 3;
	level_text.x = dps_text.x = attack_speed_text.x = damage_amount_text.x = name_text.x = rating_text.y = 2;
	this.sell_price_text.x = 126 - this.sell_price_text.getMeasuredWidth();
	this.sell_price_coin.x = 128;
	hand_text.x = 140 - hand_text.getMeasuredWidth() - 2;
	name_text.y = hand_text.y = 14;
	damage_amount_text.y = 28;
	damage_text.y = 32;
	attack_speed_text.y = 48;
	dps_text.y = 62;
	this.sell_price_coin.y = this.sell_price_text.y = level_text.y = 76 + 14 * this.rating;

	var min_damage = this.min_damage;
	var max_damage = this.max_damage;

	if(this.attributes.min_damage_bonus && this.attributes.max_damage_bonus){
		min_damage += parseFloat(this.attributes.min_damage_bonus);
		max_damage += parseFloat(this.attributes.max_damage_bonus);
	}

	damage_amount_text.text = min_damage + " ~ " + max_damage;
	damage_text.x = damage_amount_text.getMeasuredWidth() + 4;

	if(this.attributes.attack_speed_bonus){
		var attack_speed = 60 / (this.attack_speed * (100 - parseFloat(this.attributes.attack_speed_bonus)) / 100);
	}else{
		var attack_speed = 60 / this.attack_speed;
	}

	attack_speed_text.text = attack_speed.toFixed(1) + " Attacks Per Sec";
	var dps = ((min_damage + max_damage) * attack_speed / 2).toFixed(1);
	dps_text.text = dps + " DPS";

	this.summary_height = 90 + 14 * this.rating;
	var bg = new createjs.Shape();
	bg.graphics.s("#000").ss(1).f("#fff").dr(0, 0, 140, this.summary_height);
	this.detail.addChild(bg, rating_text, name_text, hand_text, damage_amount_text, damage_text, attack_speed_text, dps_text, level_text, this.sell_price_text, this.sell_price_coin);
	this.attributes_index.forEach(function(attribute, index){
		var attr_text = new createjs.Text("","10px Arial","#B64926");
		switch(parseInt(attribute)){
			case 0:
				attr_text.text = "+" + this.attributes.min_damage_bonus + " ~ " + this.attributes.max_damage_bonus + " Damage";
			break;
			case 1:
				if(this.attributes.strength){
					attr_text.text = "+" + this.attributes.strength + " Strength";
				}else if(this.attributes.agility){
					attr_text.text = "+" + this.attributes.agility + " Agility";
				}else{
					attr_text.text = "+" + this.attributes.intelligence + " Intelligence";
				}
			break;
			case 2:
				attr_text.text = "+" + this.attributes.attack_speed_bonus + "% Attack speed";
			break;
			case 3:
				attr_text.text = "+" + this.attributes.critical_rate + "% Critical rate";
			break;
			case 4:
				attr_text.text = "+" + this.attributes.critical_damage + "% Critical damage";
			break;
			case 5:
				attr_text.text = "+" + this.attributes.life_steal + "% Life Steal";
			break;
		}
		attr_text.x = 2;
		attr_text.y = 76 + 14 * index;
		this.detail.addChild(attr_text);
	}, this);
}