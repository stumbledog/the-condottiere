function Hero(builder){
	this.hero_initialize(builder);
}

Hero.prototype = new Unit();

Hero.prototype.constructor = Hero;
Hero.prototype.unit_initialize = Hero.prototype.initialize;

Hero.prototype.hero_initialize = function(builder){
	this.unit_initialize(builder);

	this.primary_attribute = parseInt(builder.primary_attribute);
	this.strength = parseInt(builder.strength);
	this.agility = parseInt(builder.agility);
	this.intelligence = parseInt(builder.intelligence);
	this.stamina = parseInt(builder.stamina);
	this.movement_speed = 1.5;
	this.level = builder.level;
	this.exp = builder.exp;
	this.resource_type = builder.resource_type;

	if(this.resource_type === "fury"){
		this.resource = 0;
	}else{
		this.resource = 100;
	}
	
	this.max_resource = 100;
	this.radius = 12;
	this.aggro_radius = 80;
	this.range = 16;
	this.attack_speed = 60;

	this.updateStats();

	this.team = "Player";
	this.health_color = "#0C0";
	this.damage_color = "#C00";

	this.renderPortrait(builder.portrait.split('/').pop(), builder.index);
	this.renderRange();
	this.order = {action:"stop", map:this.findPath({x:this.x,y:this.y})};
	this.rotate(0,1);

	for(key in this.skills){
		this.skills[key].remain_cooldown = 0;
	}

	this.initHealthBar();
}

Hero.prototype.renderRange = function(){
	this.range_shape = new createjs.Shape();
	this.range_shape.graphics.s("#F00").ss(2).dc(0, 0, this.radius + this.range);
	this.range_shape.alpha = 0.5;
}

Hero.prototype.move = function(x, y){
	Unit.prototype.move.call(this, x, y);
	var user = this.game.getUser();
	if(user.store){
		user.store.close();
		user.inventory.close();
	}
}

Hero.prototype.attackTarget = function(target, damage){
	Unit.prototype.attackTarget.call(this, target, damage);
	this.game.getUIStage().refreshHealthBar();
	this.game.getUIStage().refreshResourceBar();
}

Hero.prototype.hit = function(attacker, damage){
	Unit.prototype.hit.call(this, attacker, damage);
	this.game.getUIStage().refreshHealthBar();
	this.game.getUIStage().refreshResourceBar();
}

Hero.prototype.gainExp = function(exp){
	Unit.prototype.gainExp.call(this, exp);
	this.game.getUIStage().refreshExpBar();
}

Hero.prototype.showRange = function(){
	this.unit_stage.effect_container.addChild(this.range_shape);
}

Hero.prototype.hideRange = function(){
	this.unit_stage.effect_container.removeChild(this.range_shape);	
}

Hero.prototype.tick = function(){
	Unit.prototype.tick.call(this);
	this.range_shape.x = this.x;
	this.range_shape.y = this.y;
	this.game.viewport();
	for(key in this.skills){
		if(this.skills[key].remain_cooldown > 0){
			this.skills[key].remain_cooldown -= 1/30;
			this.skills[key].remain_cooldown = this.skills[key].remain_cooldown < 0 ? 0 : this.skills[key].remain_cooldown;
			this.ui_stage.renderCooldown(key, this.skills[key].remain_cooldown, this.skills[key].cooldown);
		}
	}
	this.ui_stage.refreshSkillButton();
}