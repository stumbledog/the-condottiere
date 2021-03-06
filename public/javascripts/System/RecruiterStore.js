function RecruiterStore(units){
	this.recruiterstore_initialize(units);
}

RecruiterStore.prototype = Object.create(Store.prototype);
RecruiterStore.prototype.constructor = RecruiterStore;

RecruiterStore.prototype.recruiterstore_initialize = function(units){
	this.store_initialize(units);

	this.color = {
		Fighter:"#F77A52",
		Thief:"#7E8AA2",
		Mage:"#91AA9D",
	}

	this.initUnits();
	this.render();
}

RecruiterStore.prototype.initUnits = function(){
	this.unit_container = new createjs.Container();
	this.unit_container.x = 5;
	this.unit_container.y = 50;

	this.items.forEach(function(unit, index){
		unit.level = this.user.hero.level;
		unit.price = unit.level * 100;
		this.unitSummary(unit, index % 3 * 100, parseInt(index / 3) * 60);
		this.unitDetail(unit);
		this.unit_container.addChild(unit.store_summary);
	}, this);
}

RecruiterStore.prototype.unitSummary = function(unit, x, y){
	var frame = new createjs.Shape();
	frame.graphics.s("#000").ss(1).f("#fff").dr(0,0,100,60).dr(0,0,30,60).dr(30,45,70,15).f(this.color[unit.name]).dr(0,0,30,60);

	var frames = [];
	for(var i=0 ;i < 3; i++){
		frames.push([unit.index % 4 * 72 + (i % 3) * 24, parseInt(unit.index / 4) * 128 + parseInt(i / 3) * 32 + 1, 24, 32, 0, 12, 16]);
	}

	var spriteSheet = new createjs.SpriteSheet({
		images:[this.loader.getResult(unit.sprite.split('/').pop())],
		frames:frames,
		animations:{
			front:{
				frames:[0,1,2,1],
				speed:0.2,
			}
		}
	});

	var sprite = new createjs.Sprite(spriteSheet, "front");
	sprite.x = 15;
	sprite.y = 30;

	var level = new createjs.Text("Level " + unit.level, "12px Arial","#000");
	level.x = 32;
	level.y = 2;

	var name = new createjs.Text(unit.name, "12px Arial","#000");
	name.x = 32;
	name.y = 16;

	var price_text = unit.price;
	var price = new createjs.Text(price_text, "12px Arial","#000");
	price.x = 32;
	price.y = 46;

	var coin = new createjs.Bitmap(this.loader.getResult("icon"));
	coin.sourceRect = new createjs.Rectangle(246, 55, 12, 12);
	coin.x = 33 + price.getMeasuredWidth();
	coin.y = 48;
	coin.scaleX = coin.scaleY = 0.8;

	unit.store_summary = new createjs.Container();
	unit.store_summary.x = x;
	unit.store_summary.y = y;

	unit.store_summary.addChild(frame, sprite, level, name, price, coin);
	unit.store_summary.cursor = "pointer";

	unit.store_summary.addEventListener("mousedown", this.mousedownStoreItem.bind(this, unit));
	unit.store_summary.addEventListener("rollover", this.rolloverStore.bind(this, unit));
	unit.store_summary.addEventListener("rollout", this.rolloutStore.bind(this, unit));
}

RecruiterStore.prototype.unitDetail = function(unit){
	var frame = new createjs.Shape();
	frame.graphics.s("#000").ss(1).f("#fff").dr(0,0,140,120);

	var level = new OutlineText("Level " + unit.level + " " + unit.name, "10px Arial", this.color[unit.name], "#333", 3);
	level.x = 3;
	level.y = 2;

	var primary_attribute = new createjs.Text("Primary Attribute: " + unit.primary_attribute, "10px Arial","#000");
	primary_attribute.x = 2;
	primary_attribute.y = 16;

	var strength = new createjs.Text("Strength: " + unit.strength, "10px Arial","#000");
	var agility = new createjs.Text("Agility: " + unit.agility, "10px Arial","#000");
	var Intelligence = new createjs.Text("Intelligence: " + unit.intelligence, "10px Arial","#000");
	strength.x = agility.x = Intelligence.x = 2;
	strength.y = 28;
	agility.y = 40;
	Intelligence.y = 52;

	var skill_text = "";

	var skill_array = unit.passive_skills.concat(unit.active_skills);
	skill_array.forEach(function(skills, index){
		skill_text += skills.name;
		if(skill_array[index+1]){
			skill_text += ", ";
		}
	});

	var skill = new createjs.Text("Skills: " + skill_text, "10px Arial","#000");
	skill.lineWidth = 130;
	skill.x = 2;
	skill.y = 64;

	unit.detail = new createjs.Container();
	unit.detail.addChild(frame, level, primary_attribute, strength, agility, Intelligence, skill);
}

RecruiterStore.prototype.renderUnits = function(){
	this.stage.addChild(this.unit_container);
	this.stage.update();
}

RecruiterStore.prototype.rolloverStore = function(unit){
	if(unit.store_summary.x !== 200){
		var x = unit.store_summary.x + 5;
	}else{
		var x = 165;
	}

	if(unit.store_summary.y > 120){
		var y = unit.store_summary.y - (unit.summary_height) + 50;
	}else{
		var y = unit.store_summary.y + 110;
	}
	unit.detail.x = x;
	unit.detail.y = y;
	this.stage.addChild(unit.detail);
	this.stage.update();
}

RecruiterStore.prototype.rolloutStore = function(unit){
	if(this.stage){
		this.stage.removeChild(unit.detail);
		this.stage.update();		
	}
}

RecruiterStore.prototype.mousedownStoreItem = function(unit, event){
	if(event.nativeEvent.button === 2){
		if(this.user.gold < unit.price){
			this.user.hero.speak("Not enough money","warning")
		}else{
			$.post("purchasefollower", {unit_id:unit._id, level:unit.level, price:unit.price}, function(res){
				if(res.err){
					console.log(res.err);
				}else{
					var follower = new Follower(res.follower);
					this.user.purchaseFollower(follower, unit.price);
				}
			}.bind(this));
		}
	}
}

RecruiterStore.prototype.unitToObject = function(unit){
	var passive_skills = [];
	var active_skills = [];
	unit.passive_skills.forEach(function(skill){
		passive_skills.push({name:skill.name, description:skill.description, key:skill.key});
	});

	var obj = {
		character_class:unit.character_class,
		primary_attribute:unit.primary_attribute,
		level:unit.level,
		strength:unit.strength,
		agility:unit.agility,
		intelligence:unit.intelligence,
		stamina:unit.stamina,
		price:unit.price,
		sprite:unit.sprite,
		portrait:unit.portrait,
		index:unit.index,
		items:unit.items,
		level_up_bonus:unit.level_up_bonus,
		passive_skills:passive_skills,
		active_skills:unit.active_skills,
	};
	return obj;
}

RecruiterStore.prototype.open = function(){	
	Store.prototype.open.call(this);
	this.renderUnits();
	this.user.openInventory();
	this.user.isShopping = true;
	this.user.store = this;
}