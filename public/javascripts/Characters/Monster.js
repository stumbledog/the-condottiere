function Monster(builder){
	this.initialize(builder);
}

Monster.prototype = new Unit();
Monster.prototype.constructor = Monster;
Monster.prototype.unit_initialize = Monster.prototype.initialize;

Monster.prototype.initialize = function(builder){
	this.unit_initialize(builder);

	this.difficulty_level = builder.difficulty_level;
	this.hero_level = builder.hero_level;
	this.max_health = this.health = builder.health * Math.pow(2,this.difficulty_level) * this.hero_level;
	this.right_min_damage = builder.damage * Math.pow(1.6,this.difficulty_level) * this.hero_level;
	this.right_max_damage = builder.damage * 2 * Math.pow(1.6,this.difficulty_level) * this.hero_level;
	this.right_attack_speed = builder.attack_speed;
	this.movement_speed = builder.movement_speed;
	this.range = builder.range;
	this.radius = builder.radius;
	this.damage_reduction = 0;
	this.gold = builder.gold * (1 + this.difficulty_level) * (1 + (this.hero_level - 1) / 5);
	this.xp = builder.xp * (1 + this.difficulty_level) * (1 + (this.hero_level - 1) / 5);
	this.drop_rate = builder.drop_rate * (1 + this.difficulty_level);
	console.log(this.drop_rate);
	this.scaleX = this.scaleY = builder.scale ? builder.scale : 1;

	this.right_weapon_tick = 0;

	this.team = "Monster";
	this.health_color = "#C00";
	this.damage_color = "#D40D12";
	this.initHealthBar();
	this.initEventListener();
	this.rotate(0,1);
	this.order = {action:"guard", map:this.findPath({x:this.x,y:this.y})};
}

Monster.prototype.initEventListener = function(){
	this.addEventListener("mousedown", function(event){
		if(event.nativeEvent.button == 2){
			this.stage.hero.attack(this);
		}else{

		}
	}.bind(this));

	this.addEventListener("rollover", function(event){
		if(this.status !== "death"){
			this.mouseover = true;
			this.outline.visible = true;
			this.stage.hero.skill_target = this;
		}
	}.bind(this));

	this.addEventListener("rollout", function(event){
		if(this.status !== "death"){
			this.mouseover = false;
			this.outline.visible = false;
			this.outline.filters = null;
			this.outline.uncache();
		}
	}.bind(this));
}

Monster.prototype.hit = function(attacker, damage){
	Unit.prototype.hit.call(this, attacker, damage);
	if(!this.target){
		this.target = attacker;
	}
}

Monster.prototype.die = function(attacker){
	Unit.prototype.die.call(this, attacker);
	var allied_units = this.unit_stage.getAlliedUnits(attacker);
	allied_units.forEach(function(unit){
		unit.gainXP(this.xp/allied_units.length * (1 + (allied_units.length - 1) / 10));
	},this);

	this.dropGold(attacker);
	this.dropItem();

	var monsters = this.unit_stage.getAliveMonsters();
	if(monsters.length === 0){
		this.game.getMessageStage().displayMessage("left_to_right", "Victory", 60, "#B64926", 20, "#000", 2000, 0, -60);
		var user = this.game.getUser();
		user.saveStats();
	}
}

Monster.prototype.dropGold = function(attacker){
	var gold = Math.ceil(this.gold * ( Math.random() * 0.5 + 0.5));
	var user = this.game.getUser();
	user.addGold(gold);

	var text = new OutlineText("+"+gold+" gold", "bold 8px Arial", "#FFD34E", "#000", 2);
	text.textAlign("center");
	attacker.addChild(text);

	createjs.Tween.get(text).to({regY:40},1000,createjs.Ease.circOut).wait(500).call(function(){
		attacker.removeChild(this);
	});
}

Monster.prototype.dropItem = function(){
	var foo = Math.random() * 100;
	if(foo <= 0.01 * this.drop_rate){
		console.log("legendary");
	}else if(foo <= 0.1 * this.drop_rate){
		console.log("epic");
	}else if(foo <= 1 * this.drop_rate){
		console.log("rare");
	}else if(foo <= 5 * this.drop_rate){
		console.log("uncommon");
	}else if(foo <= 10 * this.drop_rate){
		console.log("common");
	}
}

Monster.prototype.tick = function(){
	Unit.prototype.tick.call(this);
	if(this.mouseover){
		this.outline.uncache();
		this.outline.filters = [new createjs.ColorFilter(0,0,0,1,185,18,27,0)];
		this.outline.cache(-12,-16,24,32);
	}
}