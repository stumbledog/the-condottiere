mongoose = require('mongoose');
Schema = mongoose.Schema;
fs = require('fs');

require('./models/MerchantWeaponModel');
require('./models/MerchantArmorModel');
require('./models/WeaponModel');
require('./models/ArmorModel');
require('./models/UnitModel');
require('./models/SkillModel');
require('./models/MapModel');
require('./models/UserModel');
	
mongoose.connect('mongodb://localhost/condottiere');

var connection = mongoose.connection;
connection.on("error", console.error.bind(console, 'connection error:'));
connection.once("open", function(){
	MapModel.remove().exec().then(function(count){
		return UserModel.remove().exec();
	}).then(function(count){
		return WeaponModel.remove().exec();
	}).then(function(count){
		return ArmorModel.remove().exec();
	}).then(function(count){
		return MerchantWeaponModel.remove().exec();
	}).then(function(count){
		return SkillModel.remove().exec();
	}).then(function(count){
		return MerchantArmorModel.remove().exec();
	}).then(function(count){
		return UnitModel.remove().exec();
	}).then(function(count){
		return UserUnitModel.remove().exec();
	}).then(function(count){
		saveUnit();
	});
});

function saveUnit(){
	
	var defend = new SkillModel({
		name:"Defend",
		description:"Allows to equip shields in off-hand",
		key:"defend",
	});

	var endurance = new SkillModel({
		name:"Endurance",
		description:"Reduces incoming damage by 10%",
		key:"endurance",		
	});

	var taunt = new SkillModel({
		name:"Taunt",
		description:"Normal attack taunts its target",
		key:"taunt",
	});

	var dual_wield = new SkillModel({
		name:"Dual Wield",
		description:"Allows to equip one-hand weapons in off-hand",
		key:"dual_wield",
	});

	var swift_runner = new SkillModel({
		name:"Swift Runner",
		description:"Increses movement speed by 15%",
		key:"swift_runner",
	})

	var charge = new SkillModel({
		name:"Charge",
		description:"Charges and deal 300% damage to enemies in its path.",
		key:"q",
		target:false,
		range:120,
		radius:30,
		damage:3,
		cost:15,
		cooldown:10,
		icon_source:"assets/Graphics/icons/50x50/518.png",
	});

	var shockwave = new SkillModel({
		name:"Shockwave",
		description:"Sends a wave that deals 200% damage to enemies up to 100 range in a cone.",
		key:"w",
		target:false,
		radius:100,
		angle:90,
		damage:2,
		cost:20,
		cooldown:6,
		icon_source:"assets/Graphics/icons/50x50/514.png",
		animation:{
			scale:0.5,
			width:163,
			height:167,
			regX:81,
			regY:167,
			images:[
				"assets/Graphics/effects/shooter_fx/lava_shot_impact1.png",
				"assets/Graphics/effects/shooter_fx/lava_shot_impact2.png",
				"assets/Graphics/effects/shooter_fx/lava_shot_impact3.png",
				"assets/Graphics/effects/shooter_fx/lava_shot_impact4.png",
			]
		}
	});

	var last_defender = new SkillModel({
		name:"Last Defender",
		description:"Reduces damage taken by 20% for 12 sec and increases Health regeneration by 50%",
		key:"e",
		target:false,
		cost:30,
		cooldown:30,
		duration:12000,
		icon_source:"assets/Graphics/icons/50x50/525.png",
		animation:{
			scale:0.5,
			rotate:-45,
			width:84,
			height:79,
			regX:42,
			regY:40,
			images:[
				"assets/Graphics/effects/shooter_fx/lava_ball_fx1.png",
				"assets/Graphics/effects/shooter_fx/lava_ball_fx2.png",
				"assets/Graphics/effects/shooter_fx/lava_ball_fx3.png",
				"assets/Graphics/effects/shooter_fx/lava_ball_fx4.png",
			]
		}
	});

	var judgement = new SkillModel({
		name:"Judgement",
		description:"Sours up to the sky, deals 1000% damage to all enemies within 60 range, and knocks back them.",
		key:"r",
		range:120,
		radius:60,
		angle:60,
		damage:10,
		cost:40,
		cooldown:50,
		icon_source:"assets/Graphics/icons/50x50/529.png",
		animation:{
			scale:0.5,
			width:232,
			height:218,
			regX:116,
			regY:99,
			images:[
				"assets/Graphics/effects/explosion_0/Oexplosiona_0.png",
				"assets/Graphics/effects/explosion_0/Oexplosiona_1.png",
				"assets/Graphics/effects/explosion_0/Oexplosiona_2.png",
				"assets/Graphics/effects/explosion_0/Oexplosiona_3.png",
				"assets/Graphics/effects/explosion_0/Oexplosiona_4.png",
				"assets/Graphics/effects/explosion_0/Oexplosiona_5.png",
				"assets/Graphics/effects/explosion_0/Oexplosiona_6.png",
				"assets/Graphics/effects/explosion_0/Oexplosiona_7.png",
				"assets/Graphics/effects/explosion_0/Oexplosiona_8.png",
				"assets/Graphics/effects/explosion_0/Oexplosiona_9.png",
			]
		}
	});

	var leap_attack = new SkillModel({
		name:"Leap Attack",
		description:"Jump in to the air and then deal 300% damage to enemies with in 40 range",
		key:"leap_attack",
		target:false,
		range:120,
		radius:40,
		damage:3,
		cost:15,
		cooldown:10,
		icon_source:"assets/Graphics/icons/50x50/517.png",
		animation:{
			images:[
				"assets/Graphics/effects/impacts/Dustring0.png",
				"assets/Graphics/effects/impacts/Dustring1.png",
				"assets/Graphics/effects/impacts/Dustring2.png",
				"assets/Graphics/effects/impacts/Dustring3.png",
				"assets/Graphics/effects/impacts/Dustring4.png",
				"assets/Graphics/effects/explosion_0/Oexplosiona_0.png",
				"assets/Graphics/effects/explosion_0/Oexplosiona_1.png",
				"assets/Graphics/effects/explosion_0/Oexplosiona_2.png",
				"assets/Graphics/effects/explosion_0/Oexplosiona_3.png",
				"assets/Graphics/effects/explosion_0/Oexplosiona_4.png",
				"assets/Graphics/effects/explosion_0/Oexplosiona_5.png",
				"assets/Graphics/effects/explosion_0/Oexplosiona_6.png",
				"assets/Graphics/effects/explosion_0/Oexplosiona_7.png",
				"assets/Graphics/effects/explosion_0/Oexplosiona_8.png",
				"assets/Graphics/effects/explosion_0/Oexplosiona_9.png",
			],
			jump:{
				scale:0.25,
				width:212,
				height:79,
				regX:106,
				regY:40,
				images:[
					"assets/Graphics/effects/impacts/Dustring0.png",
					"assets/Graphics/effects/impacts/Dustring1.png",
					"assets/Graphics/effects/impacts/Dustring2.png",
					"assets/Graphics/effects/impacts/Dustring3.png",
					"assets/Graphics/effects/impacts/Dustring4.png",
				]						
			},
			land:{
				scale:0.25,
				width:232,
				height:218,
				regX:116,
				regY:99,
				images:[
					"assets/Graphics/effects/explosion_0/Oexplosiona_0.png",
					"assets/Graphics/effects/explosion_0/Oexplosiona_1.png",
					"assets/Graphics/effects/explosion_0/Oexplosiona_2.png",
					"assets/Graphics/effects/explosion_0/Oexplosiona_3.png",
					"assets/Graphics/effects/explosion_0/Oexplosiona_4.png",
					"assets/Graphics/effects/explosion_0/Oexplosiona_5.png",
					"assets/Graphics/effects/explosion_0/Oexplosiona_6.png",
					"assets/Graphics/effects/explosion_0/Oexplosiona_7.png",
					"assets/Graphics/effects/explosion_0/Oexplosiona_8.png",
					"assets/Graphics/effects/explosion_0/Oexplosiona_9.png",
				]
			}
		}
	});

	var backstab = new SkillModel({
		name:"Backstab",
		description:"Moves behind target and deals 600% damage to target and then hides for 5 sec",
		key:"backstab",
		target:true,
		range:100,
		damage:6,
		cost:15,
		cooldown:20,
		duration:5000,
		icon_source:"assets/Graphics/icons/50x50/400.png",
		animation:{
			scale:0.5,
			width:90,
			height:73,
			regX:0,
			regY:73,
			images:[
				"assets/Graphics/effects/splatters/blood_squirt_0.png",
				"assets/Graphics/effects/splatters/blood_squirt_1.png",
				"assets/Graphics/effects/splatters/blood_squirt_2.png",
				"assets/Graphics/effects/splatters/blood_squirt_3.png",
				"assets/Graphics/effects/splatters/blood_squirt_4.png",
			]
		}
	});

	var wand_specialization = new SkillModel({
		name:"Wand Specialization",
		description:"Allows to equip wand weapons",
		key:"wand",
	});

	var critical_magic = new SkillModel({
		name:"Critical Magic",
		description:"Increases critical rate by 5%",
		key:"critical_magic",
	});

	var chain_lightning = new SkillModel({
		name:"Chain Lightning",
		description:"Deals 200% damage to target and then jumps to nearby enemies. Affects 5 total targets.",
		key:"chain_lightning",
		target:true,
		range:120,
		damage:2,
		cost:20,
		cooldown:15,
		icon_source:"assets/Graphics/icons/50x50/624.png",
		animation:{
			scale:0.25,
			width:96,
			height:640,
			regX:48,
			regY:0,
			images:[
				"assets/Graphics/effects/electricity/Lightning_0.png",
				"assets/Graphics/effects/electricity/Lightning_1.png",
			]
		}
	});

	defend.save();
	endurance.save();
	taunt.save();
	dual_wield.save();
	swift_runner.save();
	wand_specialization.save();
	critical_magic.save();

	charge.save();
	shockwave.save();
	last_defender.save();
	judgement.save();
	leap_attack.save();
	backstab.save();
	chain_lightning.save();

	var passive_skills = [];
	passive_skills.push(defend._id);
	passive_skills.push(endurance._id);
	passive_skills.push(taunt._id);

	var active_skills = [];
	active_skills.push(charge._id);
	active_skills.push(shockwave._id);
	active_skills.push(last_defender._id);
	active_skills.push(judgement._id);

	var hero = new UnitModel({
		name:"Albert",
		type:"hero",
		primary_attribute:"strength",
		strength:3,
		agility:2,
		intelligence:2,
		stamina:3,
		resource_type:"fury",
		sprite:"hero", 
		portrait:"portrait1", 
		index:0,
		passive_skills:passive_skills,
		active_skills:active_skills,
	});

	var fighter_passive_skills = [];
	fighter_passive_skills.push(defend._id);
	fighter_passive_skills.push(endurance._id);
	fighter_passive_skills.push(taunt._id);

	var fighter_active_skills = [];
	fighter_active_skills.push(leap_attack._id);

	var fighter = new UnitModel({
		name:"Fighter",
		type:"follower",
		primary_attribute:"strength",
		strength:2,
		agility:1,
		intelligence:1,
		stamina:2,
		resource_type:"fury",
		sprite:"fighter", 
		portrait:"portrait5", 
		index:0,
		passive_skills:fighter_passive_skills,
		active_skills:fighter_active_skills,
	});

	var thief_passive_skills = [];
	thief_passive_skills.push(dual_wield._id);
	thief_passive_skills.push(swift_runner._id);

	var thief_active_skills = [];
	thief_active_skills.push(backstab._id);

	var thief = new UnitModel({
		name:"Thief",
		type:"follower",
		primary_attribute:"agility",
		strength:1,
		agility:2,
		intelligence:1,
		stamina:2,
		resource_type:"mana",
		sprite:"thief", 
		portrait:"portrait6", 
		index:0,
		passive_skills:thief_passive_skills,
		active_skills:thief_active_skills,
	});

	var mage_passive_skills = [];
	mage_passive_skills.push(wand_specialization._id);
	mage_passive_skills.push(critical_magic._id);

	var mage_active_skills = [];
	mage_active_skills.push(chain_lightning._id);

	var mage = new UnitModel({
		name:"Mage",
		type:"follower",
		primary_attribute:"intelligence",
		strength:1,
		agility:1,
		intelligence:2,
		stamina:2,
		resource_type:"mana",
		sprite:"mage", 
		portrait:"portrait4", 
		index:0,
		passive_skills:mage_passive_skills,
		active_skills:mage_active_skills,
	});

	hero.save().then(function(){
		return fighter.save();
	}).then(function(){
		return thief.save();
	}).then(function(){
		return mage.save();
	}).then(function(){
		saveMap();
	});
}

function saveMap(){
	var maps = [];
	maps.push(initMap(
		[
			{
				tiles:[
					[1,1,1,1,1,1,1,1,1,1,1],
					[1,1,1,1,1,1,1,1,1,1,1],
					[1,1,1,1,1,1,1,1,1,1,1],
					[1,1,1,1,1,1,1,1,1,1,1],
					[1,1,1,1,1,1,1,1,1,1,1],
					[1,1,1,1,1,1,1,1,1,1,1],
					[1,1,1,1,1,1,1,1,1,1,1],
					[1,1,1,1,1,1,1,1,1,1,1],
					[1,1,1,1,1,1,1,1,1,1,1],
					[1,1,1,1,1,1,1,1,1,1,1],
					[1,1,1,1,1,1,1,1,1,1,1],
				],
				tile_map:[
					[32,0],
				], 
				src:"assets/Graphics/Tilesets/A5/Overworld_TileA5.png",
				block:false
			},
			{
				tiles:[
					[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 1, 2, 3, 3, 4, 5, 0, 0],
					[0, 0, 0, 6, 7, 8, 8, 9,10, 0, 0],
					[0, 0, 0,11,12,21,13,14,15, 0, 0],
					[0, 0, 0,16,17,22,18,19,20, 0, 0],
					[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[0,23,24,25, 0, 0, 0, 0, 0, 0, 0],
					[0,26,27,28, 0, 0, 0, 0, 0, 0, 0],
					[0,29,30,31, 0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				],
				tile_map:[
					[32*8,	32*3],	[32*9,	32*3],	[32*10,	32*3],
					[32*11,	32*3],	[32*12,	32*3],	[32*8,	32*4],
					[32*9,	32*4],	[32*10,	32*4],	[32*11,	32*4],
					[32*12,	32*4],	[32*8,	32*5],	[32*9,	32*5],
					[32*10,	32*5],	[32*11,	32*5],	[32*12,	32*5],
					[32*8,	32*6],	[32*9,	32*6], 
					[32*10,	32*6],	[32*11,	32*6],	[32*12,	32*6],
					[32*14,	32*3],	[32*14,	32*4],
					[32*5,	32*13],	[32*6,	32*13],	[32*7,	32*13],
					[32*5,	32*14],	[32*6,	32*14],	[32*7,	32*14],
					[32*5,	32*15],	[32*6,	32*15],	[32*7,	32*15],
				], 
				src:"assets/Graphics/Tilesets/B/Exterior_Forest_TileB.png",
				block:true
			}
		],
		true,
		[
			{name:"Merchant",	model:{sprite:"merchant", index:0}, type:"merchant", x:32*5, y:32*5},
			{name:"Recruiter",	model:{sprite:"merchant", index:1}, type:"recruiter", x:32*7, y:32*5},
		//	{name:"Blacksmith",	model:{sprite:"merchant", index:2}, type:"blacksmith", x:32*7, y:32*7},
			{name:"Battlemaster", model:{sprite:"soldier", index:0}, type:"battlemaster", x:32*4, y:32*8},
		],
		[],0,0,"Basecamp",true,true,352,352,11,11,[192,192]
	));

	maps.push(initMap(
		[
			{
				tiles:[
					[0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
					[0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
					[0,0,0,0,1,1,1,0,0,0,1,1,1,1,1,1,0,0,1,1],
					[1,0,0,0,1,1,1,0,0,0,1,1,1,1,1,1,0,0,1,1],
					[1,0,0,0,1,1,1,0,0,0,1,1,1,1,1,0,0,0,0,1],
					[0,0,0,0,1,1,1,0,0,0,1,1,1,1,0,0,0,0,0,0],
					[0,0,0,1,1,1,1,0,0,0,1,1,1,1,0,0,0,0,0,0],
					[0,0,0,1,1,1,1,0,0,0,1,1,1,1,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,1],
				],
				tile_map:[
					[32,0],//[64,0],[64,32],
				], 
				src:"assets/Graphics/Tilesets/A5/Exterior_Forest_TileA5.png",
				block:false
			},
			{
				tiles:[
					[1,3,0,0,0,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
					[1,1,3,0,0,0,4,1,1,1,9,9,9,9,9,9,1,1,9,5],
					[4,1,1,3,0,0,0,7,1,8,0,0,0,0,0,0,7,8,0,0],
					[0,7,1,8,0,0,0,7,1,8,0,0,0,0,0,0,7,8,0,0],
					[0,7,1,8,0,0,0,7,1,8,0,0,0,0,0,2,1,1,3,0],
					[2,1,1,5,0,0,0,7,1,8,0,0,0,0,2,1,1,1,1,3],
					[1,1,8,0,0,0,0,7,1,8,0,0,0,0,7,1,1,1,1,1],
					[1,1,8,0,0,0,0,7,1,8,0,0,0,0,7,1,1,1,1,1],
					[1,1,1,6,6,6,6,1,1,5,0,0,0,0,4,1,1,1,1,5],
					[1,1,1,1,1,1,1,1,5,0,0,0,0,0,0,4,1,1,5,0],
				],
				tile_map:[
					[80,48],
					[64,32],[96,32],[64,64],[96,64],
					[80,32],[64,48],[96,48],[80,64],
					[80,48]
				], 
				src:"assets/Graphics/Tilesets/A2/Exterior_Forest_TileA2.png",
				block:false
			},
			{
				tiles:[
					[0,0,3,5,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
					[0,0,0,3,5,2,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
					[0,0,0,0,3,5,2,0,0,0,1,2,1,2,1,2,0,0,1,6],
					[2,0,0,0,1,6,4,0,0,0,3,5,6,5,6,4,0,0,3,5],
					[4,0,0,0,3,5,2,0,0,0,1,6,5,6,4,0,0,0,0,3],
					[0,0,0,0,1,6,4,0,0,0,3,5,6,4,0,0,0,0,0,0],
					[0,0,0,1,6,5,2,0,0,0,1,6,5,2,0,0,0,0,0,0],
					[0,0,0,3,4,3,4,0,0,0,3,5,6,4,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0,1,6,5,2,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,1,6,5,6,5,2,0,0,0,0,1],
				],
				tile_map:[
					[32*3,	32*0],	[32*4,	32*0],
					[32*3,	32*1],	[32*4,	32*1],
					[32*3,	32*2],	[32*4,	32*2],
				], 
				src:"assets/Graphics/Tilesets/B/Exterior_Forest_TileB.png",
				block:true
			}
		],false,[],
		[
			{name:"Slime",model:{sprite:"monster",index:0},x:32*3,y:32*4,regY:9,radius:10,type:"melee",health:7,damage:0.8,range:16,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},
			{name:"Slime",model:{sprite:"monster",index:0},x:32*3,y:32*4,regY:9,radius:10,type:"melee",health:7,damage:0.8,range:16,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},
			{name:"Slime",model:{sprite:"monster",index:0},x:32*3,y:32*4,regY:9,radius:10,type:"melee",health:7,damage:0.8,range:16,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},
			{name:"Slime",model:{sprite:"monster",index:0},x:32*3,y:32*4,regY:9,radius:10,type:"melee",health:7,damage:0.8,range:16,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},

			{name:"Slime",model:{sprite:"monster",index:0},x:32*2,y:32*8,regY:9,radius:10,type:"melee",health:7,damage:0.8,range:16,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},
			{name:"Slime",model:{sprite:"monster",index:0},x:32*2,y:32*8,regY:9,radius:10,type:"melee",health:7,damage:0.8,range:16,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},
			{name:"Slime",model:{sprite:"monster",index:0},x:32*2,y:32*8,regY:9,radius:10,type:"melee",health:7,damage:0.8,range:16,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},
			{name:"Slime",model:{sprite:"monster",index:0},x:32*2,y:32*8,regY:9,radius:10,type:"melee",health:7,damage:0.8,range:16,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},

			{name:"Slime",model:{sprite:"monster",index:1},x:32*8,y:32*8,regY:9,radius:10,type:"melee",health:7,damage:0.8,range:16,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},
			{name:"Slime",model:{sprite:"monster",index:1},x:32*8,y:32*8,regY:9,radius:10,type:"melee",health:7,damage:0.8,range:16,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},
			{name:"Slime",model:{sprite:"monster",index:1},x:32*8,y:32*8,regY:9,radius:10,type:"melee",health:7,damage:0.8,range:16,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},
			{name:"Slime",model:{sprite:"monster",index:1},x:32*8,y:32*8,regY:9,radius:10,type:"melee",health:7,damage:0.8,range:16,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},

			{name:"Slime",model:{sprite:"monster",index:1},x:32*8,y:32*1,regY:9,radius:10,type:"melee",health:7,damage:0.8,range:16,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},
			{name:"Slime",model:{sprite:"monster",index:1},x:32*8,y:32*1,regY:9,radius:10,type:"melee",health:7,damage:0.8,range:16,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},
			{name:"Slime",model:{sprite:"monster",index:1},x:32*8,y:32*1,regY:9,radius:10,type:"melee",health:7,damage:0.8,range:16,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},
			{name:"Slime",model:{sprite:"monster",index:1},x:32*8,y:32*1,regY:9,radius:10,type:"melee",health:7,damage:0.8,range:16,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},

			{name:"Slime",model:{sprite:"monster",index:1},x:32*13,y:32*1,regY:9,radius:10,type:"melee",health:7,damage:0.8,range:16,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},
			{name:"Slime",model:{sprite:"monster",index:1},x:32*13,y:32*1,regY:9,radius:10,type:"melee",health:7,damage:0.8,range:16,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},
			{name:"Slime",model:{sprite:"monster",index:1},x:32*13,y:32*1,regY:9,radius:10,type:"melee",health:7,damage:0.8,range:16,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},
			{name:"Slime",model:{sprite:"monster",index:1},x:32*13,y:32*1,regY:9,radius:10,type:"melee",health:7,damage:0.8,range:16,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},

			{name:"Slime",model:{sprite:"monster",index:2},x:32*18,y:32*1,regY:9,radius:10,type:"melee",health:7,damage:0.8,range:16,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},
			{name:"Slime",model:{sprite:"monster",index:2},x:32*18,y:32*1,regY:9,radius:10,type:"melee",health:7,damage:0.8,range:16,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},
			{name:"Slime",model:{sprite:"monster",index:2},x:32*18,y:32*1,regY:9,radius:10,type:"melee",health:7,damage:0.8,range:16,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},
			{name:"Slime",model:{sprite:"monster",index:2},x:32*18,y:32*1,regY:9,radius:10,type:"melee",health:7,damage:0.8,range:16,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},

			{name:"King Slime",model:{sprite:"monster",index:3},x:32*17,y:32*7,regY:9,radius:30,scale:3,type:"melee",health:50,damage:3,range:16,attack_speed:120,movement_speed:1,skills:null,gold:30,xp:50,drop_rate:50},
		],1, 1,"Ridgefield Park",false,false,640,320,20,10,[32,32]));

	maps.push(initMap(
		[
			{
				tiles:[
					[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
					[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
					[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
					[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
					[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
					[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
					[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
					[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
					[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
					[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
					[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
					[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
					[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
					[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
					[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
					[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
					[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
					[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
					[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
					[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
				],
				tile_map:[
					[32,0],
				], 
				src:"assets/Graphics/Tilesets/A5/Overworld_TileA5.png",
				block:false
			},
			{
				tiles:[
					[5,6,5,6,4,0,0,0,0,0,3,5,2,0,0,0,0,0,0,0],
					[6,4,3,4,0,0,0,0,0,0,1,6,4,0,0,0,0,0,0,0],
					[4,0,0,0,0,0,0,0,0,0,3,5,2,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0,1,6,5,2,0,0,0,0,0,1],
					[0,0,0,0,0,0,0,0,0,0,3,4,3,4,0,0,0,0,1,6],
					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,5],
					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,1,2,1,6],
					[0,0,0,0,1,2,0,0,0,0,0,0,0,1,6,5,6,5,6,5],
					[0,0,0,1,6,4,0,0,0,0,0,0,0,3,5,6,5,6,5,6],
					[0,0,0,3,5,2,0,0,0,0,0,0,0,0,3,4,3,4,3,4],
					[0,0,0,1,6,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
					[0,0,0,3,4,0,0,0,0,0,1,2,0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,1,6,5,2,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,3,5,6,4,0,0,0,0,0,0,0],
					[0,1,2,1,2,0,0,0,0,0,3,4,0,0,0,0,0,0,0,0],
					[0,3,5,6,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
					[0,0,3,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0,0,0,1,6,5,2,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0,0,1,6,5,6,5,2,0,0,0],
				],
				tile_map:[
					[32*3,	32*0],	[32*4,	32*0],
					[32*3,	32*1],	[32*4,	32*1],
					[32*3,	32*2],	[32*4,	32*2],
				], 
				src:"assets/Graphics/Tilesets/B/Exterior_Forest_TileB.png",
				block:true
			}
		],false,[],[
			{name:"Skeleton Warrior",model:{sprite:"monster2",index:0},x:32*2,y:32*6,radius:16,type:"melee",health:8,damage:0.7,range:16,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},
			{name:"Skeleton Warrior",model:{sprite:"monster2",index:0},x:32*2,y:32*6,radius:16,type:"melee",health:8,damage:0.7,range:16,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},
			{name:"Skeleton Warrior",model:{sprite:"monster2",index:0},x:32*2,y:32*6,radius:16,type:"melee",health:8,damage:0.7,range:16,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},
			{name:"Skeleton Ranger",model:{sprite:"monster2",index:1},x:32*2,y:32*6,radius:16,type:"melee",health:6,damage:1.0,range:40,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},

			{name:"Skeleton Warrior",model:{sprite:"monster2",index:0},x:32*6,y:32*1,radius:16,type:"melee",health:8,damage:0.7,range:16,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},
			{name:"Skeleton Warrior",model:{sprite:"monster2",index:0},x:32*6,y:32*1,radius:16,type:"melee",health:8,damage:0.7,range:16,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},
			{name:"Skeleton Warrior",model:{sprite:"monster2",index:0},x:32*6,y:32*1,radius:16,type:"melee",health:8,damage:0.7,range:16,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},
			{name:"Skeleton Ranger",model:{sprite:"monster2",index:1},x:32*6,y:32*1,radius:16,type:"melee",health:6,damage:1.0,range:40,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},

			{name:"Skeleton Warrior",model:{sprite:"monster2",index:0},x:32*2,y:32*13,radius:16,type:"melee",health:8,damage:0.7,range:16,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},
			{name:"Skeleton Warrior",model:{sprite:"monster2",index:0},x:32*2,y:32*13,radius:16,type:"melee",health:8,damage:0.7,range:16,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},
			{name:"Skeleton Warrior",model:{sprite:"monster2",index:0},x:32*2,y:32*13,radius:16,type:"melee",health:8,damage:0.7,range:16,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},
			{name:"Skeleton Ranger",model:{sprite:"monster2",index:1},x:32*2,y:32*13,radius:16,type:"melee",health:6,damage:1.0,range:40,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},

			{name:"Skeleton Warrior",model:{sprite:"monster2",index:0},x:32*7,y:32*14,radius:16,type:"melee",health:8,damage:0.7,range:16,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},
			{name:"Skeleton Warrior",model:{sprite:"monster2",index:0},x:32*7,y:32*14,radius:16,type:"melee",health:8,damage:0.7,range:16,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},
			{name:"Skeleton Warrior",model:{sprite:"monster2",index:0},x:32*7,y:32*14,radius:16,type:"melee",health:8,damage:0.7,range:16,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},
			{name:"Skeleton Ranger",model:{sprite:"monster2",index:1},x:32*7,y:32*14,radius:16,type:"melee",health:6,damage:1.0,range:40,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},

			{name:"Skeleton Warrior",model:{sprite:"monster2",index:0},x:32*19,y:32*17,radius:16,type:"melee",health:8,damage:0.7,range:16,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},
			{name:"Skeleton Warrior",model:{sprite:"monster2",index:0},x:32*19,y:32*17,radius:16,type:"melee",health:8,damage:0.7,range:16,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},
			{name:"Skeleton Warrior",model:{sprite:"monster2",index:0},x:32*19,y:32*17,radius:16,type:"melee",health:8,damage:0.7,range:16,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},
			{name:"Skeleton Ranger",model:{sprite:"monster2",index:1},x:32*19,y:32*17,radius:16,type:"melee",health:6,damage:1.0,range:40,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},

			{name:"Skeleton Warrior",model:{sprite:"monster2",index:0},x:32*13,y:32*11,radius:16,type:"melee",health:8,damage:0.7,range:16,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},
			{name:"Skeleton Warrior",model:{sprite:"monster2",index:0},x:32*13,y:32*11,radius:16,type:"melee",health:8,damage:0.7,range:16,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},
			{name:"Skeleton Warrior",model:{sprite:"monster2",index:0},x:32*13,y:32*11,radius:16,type:"melee",health:8,damage:0.7,range:16,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},
			{name:"Skeleton Ranger",model:{sprite:"monster2",index:1},x:32*13,y:32*11,radius:16,type:"melee",health:6,damage:1.0,range:40,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},

			{name:"Skeleton Warrior",model:{sprite:"monster2",index:0},x:32*8,y:32*6,radius:16,type:"melee",health:8,damage:0.7,range:16,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},
			{name:"Skeleton Warrior",model:{sprite:"monster2",index:0},x:32*8,y:32*6,radius:16,type:"melee",health:8,damage:0.7,range:16,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},
			{name:"Skeleton Warrior",model:{sprite:"monster2",index:0},x:32*8,y:32*6,radius:16,type:"melee",health:8,damage:0.7,range:16,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},
			{name:"Skeleton Ranger",model:{sprite:"monster2",index:1},x:32*8,y:32*6,radius:16,type:"melee",health:6,damage:1.0,range:40,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},

			{name:"Skeleton Warrior",model:{sprite:"monster2",index:0},x:32*8,y:32*18,radius:16,type:"melee",health:8,damage:0.7,range:16,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},
			{name:"Skeleton Warrior",model:{sprite:"monster2",index:0},x:32*8,y:32*18,radius:16,type:"melee",health:8,damage:0.7,range:16,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},
			{name:"Skeleton Warrior",model:{sprite:"monster2",index:0},x:32*8,y:32*18,radius:16,type:"melee",health:8,damage:0.7,range:16,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},
			{name:"Skeleton Ranger",model:{sprite:"monster2",index:1},x:32*8,y:32*18,radius:16,type:"melee",health:6,damage:1.0,range:40,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},

			{name:"Skeleton Warrior",model:{sprite:"monster2",index:0},x:32*19,y:32*12,radius:16,type:"melee",health:8,damage:0.7,range:16,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},
			{name:"Skeleton Warrior",model:{sprite:"monster2",index:0},x:32*19,y:32*12,radius:16,type:"melee",health:8,damage:0.7,range:16,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},
			{name:"Skeleton Warrior",model:{sprite:"monster2",index:0},x:32*19,y:32*12,radius:16,type:"melee",health:8,damage:0.7,range:16,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},
			{name:"Skeleton Ranger",model:{sprite:"monster2",index:1},x:32*19,y:32*12,radius:16,type:"melee",health:6,damage:1.0,range:40,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},

			{name:"Skeleton Ranger",model:{sprite:"monster2",index:1},x:32*16,y:32*2,radius:16,type:"melee",health:6,damage:1,range:40,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},
			{name:"Skeleton Ranger",model:{sprite:"monster2",index:1},x:32*16,y:32*2,radius:16,type:"melee",health:6,damage:1,range:40,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},
			{name:"Skeleton Ranger",model:{sprite:"monster2",index:1},x:32*16,y:32*2,radius:16,type:"melee",health:6,damage:1,range:40,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},
			{name:"Skeleton Ranger",model:{sprite:"monster2",index:1},x:32*16,y:32*2,radius:16,type:"melee",health:6,damage:1,range:40,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},
			{name:"Giant Skeleton",model:{sprite:"monster2",index:3},x:32*17,y:32*1,radius:32,scale:2,type:"melee",health:50,damage:3,range:16,attack_speed:120,movement_speed:1,skills:null,gold:30,xp:50,drop_rate:50},
		],1, 2,"Palisade Park",false,false,640,640,20,20,[32,608]));

	maps.push(initMap([
			{
				tiles:[
					[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
					[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
					[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
					[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
					[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
					[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
					[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
					[1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1],
					[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
					[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
				],
				tile_map:[
					[32*2,32*1],[32*6, 32*14]
				], 
				src:"assets/Graphics/Tilesets/A5/Exterior_Forest_TileA5.png",
				block:false
			},
			{
				tiles:[
					[ 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[ 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[ 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[ 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[ 0, 0, 0, 0, 0, 6, 0, 0,13, 8, 8, 8, 8, 8, 8,12, 0, 0, 0, 0],
					[ 0, 0, 0, 0, 0, 6, 0, 0, 6, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0],
					[ 0, 0, 0, 0, 0, 6, 0, 0, 6, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0],
					[ 8, 8, 0, 8, 8, 9, 0, 0, 6, 0, 0, 1, 3, 0, 0, 7, 8, 0, 8, 8],
					[ 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 4, 6, 0, 0, 0, 0, 0, 0, 0],
					[ 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 4, 6, 0, 0, 0, 0, 0, 0, 0],
				],
				tile_map:[
					[32*0,32*13],[32*1,32*13],[32*2,32*13],
					[32*0,32*14],[32*1,32*14],[32*2,32*14],
					[32*0,32*15],[32*1,32*15],[32*2,32*15],
					[32*3,32*14],[32*4,32*14],
					[32*3,32*15],[32*4,32*15],
				], 
				src:"assets/Graphics/Tilesets/A5/Exterior_Forest_TileA5.png",
				block:true
			},
			{
				tiles:[
					[ 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 5],
					[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 7],
					[ 0, 0, 0, 0, 1, 0, 0, 0, 4, 5, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0],
					[ 0, 0, 0, 0, 0, 0, 0, 0, 6, 7, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
					[ 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[ 0, 8, 0, 0, 2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
					[ 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
					[ 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0],
				],
				tile_map:[
					[32*4,32*0],[32*1,32*3],[32*1,32*2],
					[32*2,32*0],[32*3,32*0],
					[32*2,32*1],[32*3,32*1],
					[32*1,32*0],[32*1,32*1],
				], 
				src:"assets/Graphics/Tilesets/B/Dungeon_Cave_TileB.png",
				block:true
			},
		],false,[],[
			{name:"Skeleton Warrior",model:{sprite:"monster2",index:0},x:32*12,y:32*5,radius:16,type:"melee",health:8,damage:0.7,range:16,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},
			{name:"Skeleton Warrior",model:{sprite:"monster2",index:0},x:32*12,y:32*5,radius:16,type:"melee",health:8,damage:0.7,range:16,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},
			{name:"Skeleton Warrior",model:{sprite:"monster2",index:0},x:32*12,y:32*5,radius:16,type:"melee",health:8,damage:0.7,range:16,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},
			{name:"Skeleton Warrior",model:{sprite:"monster2",index:0},x:32*12,y:32*5,radius:16,type:"melee",health:8,damage:0.7,range:16,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},

			{name:"Skeleton Warrior",model:{sprite:"monster2",index:0},x:32*18,y:32*8,radius:16,type:"melee",health:8,damage:0.7,range:16,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},
			{name:"Skeleton Warrior",model:{sprite:"monster2",index:0},x:32*18,y:32*8,radius:16,type:"melee",health:8,damage:0.7,range:16,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},
			{name:"Skeleton Warrior",model:{sprite:"monster2",index:0},x:32*18,y:32*8,radius:16,type:"melee",health:8,damage:0.7,range:16,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},
			{name:"Skeleton Warrior",model:{sprite:"monster2",index:4},x:32*18,y:32*8,radius:16,type:"melee",health:6,damage:1,range:40,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},

			{name:"Skeleton Warrior",model:{sprite:"monster2",index:0},x:32*18,y:32*4,radius:16,type:"melee",health:8,damage:0.7,range:16,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},
			{name:"Skeleton Warrior",model:{sprite:"monster2",index:0},x:32*18,y:32*4,radius:16,type:"melee",health:8,damage:0.7,range:16,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},
			{name:"Skeleton Warrior",model:{sprite:"monster2",index:0},x:32*18,y:32*4,radius:16,type:"melee",health:8,damage:0.7,range:16,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},
			{name:"Skeleton Warrior",model:{sprite:"monster2",index:0},x:32*18,y:32*4,radius:16,type:"melee",health:8,damage:0.7,range:16,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},
			{name:"Skeleton Warrior",model:{sprite:"monster2",index:4},x:32*18,y:32*4,radius:16,type:"melee",health:6,damage:1,range:40,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},
			{name:"Skeleton Warrior",model:{sprite:"monster2",index:4},x:32*18,y:32*4,radius:16,type:"melee",health:6,damage:1,range:40,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},

			{name:"Skeleton Warrior",model:{sprite:"monster2",index:0},x:32*15,y:32*1,radius:16,type:"melee",health:8,damage:0.7,range:16,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},
			{name:"Skeleton Warrior",model:{sprite:"monster2",index:0},x:32*15,y:32*1,radius:16,type:"melee",health:8,damage:0.7,range:16,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},
			{name:"Skeleton Warrior",model:{sprite:"monster2",index:0},x:32*15,y:32*1,radius:16,type:"melee",health:8,damage:0.7,range:16,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},
			{name:"Skeleton Warrior",model:{sprite:"monster2",index:0},x:32*15,y:32*1,radius:16,type:"melee",health:8,damage:0.7,range:16,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},
			{name:"Skeleton Warrior",model:{sprite:"monster2",index:4},x:32*15,y:32*1,radius:16,type:"melee",health:6,damage:1,range:40,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},
			{name:"Skeleton Warrior",model:{sprite:"monster2",index:4},x:32*15,y:32*1,radius:16,type:"melee",health:6,damage:1,range:40,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},

			{name:"Skeleton Warrior",model:{sprite:"monster2",index:0},x:32*8,y:32*2,radius:16,type:"melee",health:8,damage:0.7,range:16,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},
			{name:"Skeleton Warrior",model:{sprite:"monster2",index:0},x:32*8,y:32*2,radius:16,type:"melee",health:8,damage:0.7,range:16,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},
			{name:"Skeleton Warrior",model:{sprite:"monster2",index:0},x:32*8,y:32*2,radius:16,type:"melee",health:8,damage:0.7,range:16,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},
			{name:"Skeleton Warrior",model:{sprite:"monster2",index:0},x:32*8,y:32*2,radius:16,type:"melee",health:8,damage:0.7,range:16,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},
			{name:"Skeleton Warrior",model:{sprite:"monster2",index:4},x:32*8,y:32*2,radius:16,type:"melee",health:6,damage:1,range:40,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},
			{name:"Skeleton Warrior",model:{sprite:"monster2",index:4},x:32*8,y:32*2,radius:16,type:"melee",health:6,damage:1,range:40,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},

			{name:"Skeleton Warrior",model:{sprite:"monster2",index:0},x:32*4,y:32*8,radius:16,type:"melee",health:8,damage:0.7,range:16,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},
			{name:"Skeleton Warrior",model:{sprite:"monster2",index:0},x:32*4,y:32*8,radius:16,type:"melee",health:8,damage:0.7,range:16,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},
			{name:"Skeleton Warrior",model:{sprite:"monster2",index:0},x:32*4,y:32*8,radius:16,type:"melee",health:8,damage:0.7,range:16,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},
			{name:"Skeleton Warrior",model:{sprite:"monster2",index:0},x:32*4,y:32*8,radius:16,type:"melee",health:8,damage:0.7,range:16,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},
			{name:"Skeleton Warrior",model:{sprite:"monster2",index:4},x:32*4,y:32*8,radius:16,type:"melee",health:6,damage:1,range:40,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},
			{name:"Skeleton Warrior",model:{sprite:"monster2",index:4},x:32*4,y:32*8,radius:16,type:"melee",health:6,damage:1,range:40,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},

			{name:"Skeleton Warrior",model:{sprite:"monster2",index:0},x:32*2,y:32*5,radius:16,type:"melee",health:8,damage:0.7,range:16,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},
			{name:"Skeleton Warrior",model:{sprite:"monster2",index:0},x:32*2,y:32*5,radius:16,type:"melee",health:8,damage:0.7,range:16,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},
			{name:"Skeleton Warrior",model:{sprite:"monster2",index:0},x:32*2,y:32*5,radius:16,type:"melee",health:8,damage:0.7,range:16,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},
			{name:"Skeleton Warrior",model:{sprite:"monster2",index:0},x:32*2,y:32*5,radius:16,type:"melee",health:8,damage:0.7,range:16,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},
			{name:"Skeleton Warrior",model:{sprite:"monster2",index:4},x:32*2,y:32*5,radius:16,type:"melee",health:6,damage:1,range:40,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},
			{name:"Skeleton Warrior",model:{sprite:"monster2",index:4},x:32*2,y:32*5,radius:16,type:"melee",health:6,damage:1,range:40,attack_speed:90,movement_speed:1,skills:null,gold:3,xp:5,drop_rate:2},

			{name:"Skeleton Warrior",model:{sprite:"monster2",index:5},x:32*1,y:32*1,radius:16,scale:1.5,type:"melee",health:20,damage:3,range:40,attack_speed:120,movement_speed:1,skills:null,gold:20,xp:30,drop_rate:30},
			{name:"Skeleton Warrior",model:{sprite:"monster2",index:6},x:32*2,y:32*1,radius:16,scale:1.5,type:"melee",health:20,damage:3,range:40,attack_speed:120,movement_speed:1,skills:null,gold:20,xp:30,drop_rate:30},
			{name:"Skeleton Warrior",model:{sprite:"monster2",index:7},x:32*3,y:32*1,radius:16,scale:1.5,type:"melee",health:20,damage:3,range:40,attack_speed:120,movement_speed:1,skills:null,gold:20,xp:30,drop_rate:30},

		],1, 3,"Leonia",false,false,640,320,20,10,[32*10,32*9]));


	/*
	maps.push(initMap([],false,[],[],1, 3,"Leonia",false,false,320,320,10,10,[160,160]));
	maps.push(initMap([],false,[],[],1, 4,"Fort Lee",false,false,320,320,10,10,[160,160]));
	maps.push(initMap([],false,[],[],1, 5,"Edgewater",false,false,320,320,10,10,[160,160]));
	maps.push(initMap([],false,[],[],1, 6,"Cliffside Park",false,false,320,320,10,10,[160,160]));
	maps.push(initMap([],false,[],[],1, 7,"Englewood",false,false,320,320,10,10,[160,160]));
	maps.push(initMap([],false,[],[],1, 8,"Tenafly",false,false,320,320,10,10,[160,160]));
	maps.push(initMap([],false,[],[],1, 9,"Bergenfield",false,false,320,320,10,10,[160,160]));
	maps.push(initMap([],false,[],[],1,10,"Teaneck",false,false,320,320,10,10,[160,160]));

	maps.push(initMap([],false,[],[],2, 1,"Forest",false,false,320,320,10,10,[160,160]));
	maps.push(initMap([],false,[],[],2, 2,"Forest",false,false,320,320,10,10,[160,160]));
	maps.push(initMap([],false,[],[],2, 3,"Forest",false,false,320,320,10,10,[160,160]));
	maps.push(initMap([],false,[],[],2, 4,"Forest",false,false,320,320,10,10,[160,160]));
	maps.push(initMap([],false,[],[],2, 5,"Forest",false,false,320,320,10,10,[160,160]));
	maps.push(initMap([],false,[],[],2, 6,"Forest",false,false,320,320,10,10,[160,160]));
	maps.push(initMap([],false,[],[],2, 7,"Forest",false,false,320,320,10,10,[160,160]));
	maps.push(initMap([],false,[],[],2, 8,"Forest",false,false,320,320,10,10,[160,160]));
	maps.push(initMap([],false,[],[],2, 9,"Forest",false,false,320,320,10,10,[160,160]));
	maps.push(initMap([],false,[],[],2,10,"Forest",false,false,320,320,10,10,[160,160]));

	maps.push(initMap([],false,[],[],3, 1,"Park",false,false,320,320,10,10,[160,160]));
	maps.push(initMap([],false,[],[],3, 2,"Park",false,false,320,320,10,10,[160,160]));
	maps.push(initMap([],false,[],[],3, 3,"Park",false,false,320,320,10,10,[160,160]));
	maps.push(initMap([],false,[],[],3, 4,"Park",false,false,320,320,10,10,[160,160]));
	maps.push(initMap([],false,[],[],3, 5,"Park",false,false,320,320,10,10,[160,160]));
	maps.push(initMap([],false,[],[],3, 6,"Park",false,false,320,320,10,10,[160,160]));
	maps.push(initMap([],false,[],[],3, 7,"Park",false,false,320,320,10,10,[160,160]));
	maps.push(initMap([],false,[],[],3, 8,"Park",false,false,320,320,10,10,[160,160]));
	maps.push(initMap([],false,[],[],3, 9,"Park",false,false,320,320,10,10,[160,160]));
	maps.push(initMap([],false,[],[],3,10,"Park",false,false,320,320,10,10,[160,160]));
*/
	var count = 0;
	maps.forEach(function(map){
		map.save(function(){
			count++;
			if(count === maps.length){
				console.log(count + " maps are created");
				saveItems();
			}
		});
	});
}

function saveItems(){
	var items = [];

	items.push(new MerchantWeaponModel({primary_attribute:1, hand:1, type:"weapon", attack_type:"melee", name:"Dagger",
		min_damage:1.5,max_damage:3,range:16,attack_speed:60,
		sprite:{cropX:245,cropY:102,width:13,height:14,regX:9,regY:9,scale:0.8},
	}));

	items.push(new MerchantWeaponModel({primary_attribute:0, hand:1, type:"weapon", attack_type:"melee", name:"Long\nSword",
		min_damage:2,max_damage:4,range:16,attack_speed:75,
		sprite:{cropX:267,cropY:100,width:16,height:16,regX:12,regY:12,scale:0.8},
	}));

	items.push(new MerchantWeaponModel({primary_attribute:0, hand:2, type:"weapon", attack_type:"melee", name:"Great\nSword",
		min_damage:4,max_damage:8,range:32,attack_speed:90,
		sprite:{cropX:292,cropY:100,width:16,height:16,regX:12,regY:12,scale:0.8},
	}));

	items.push(new MerchantWeaponModel({primary_attribute:0, hand:1, type:"weapon", attack_type:"melee", name:"Masamune",
		min_damage:2,max_damage:4,range:16,attack_speed:75,
		sprite:{cropX:364,cropY:100,width:16,height:16,regX:12,regY:12,scale:0.8},
	}));

	items.push(new MerchantWeaponModel({primary_attribute:0, hand:2, type:"weapon", attack_type:"melee", name:"Spear",
		min_damage:4,max_damage:8,range:32,attack_speed:90,
		sprite:{cropX:6,cropY:124,width:16,height:16,regX:12,regY:12,scale:0.8},
	}));

	items.push(new MerchantWeaponModel({primary_attribute:0, hand:1, type:"weapon", attack_type:"melee", name:"Battle Axe",
		min_damage:3,max_damage:6,range:16,attack_speed:90,
		sprite:{cropX:29,cropY:125,width:16,height:14,regX:12,regY:9,scale:0.8},
	}));

	items.push(new MerchantWeaponModel({primary_attribute:0, hand:1, type:"weapon", attack_type:"melee", name:"Hammer",
		min_damage:3,max_damage:6,range:16,attack_speed:90,
		sprite:{cropX:51,cropY:124,width:16,height:16,regX:10,regY:10,scale:0.8},
	}));

	items.push(new MerchantWeaponModel({primary_attribute:1, hand:1, type:"weapon", attack_type:"melee", name:"Claw",
		min_damage:1.5,max_damage:3,range:16,attack_speed:60,
		sprite:{cropX:77,cropY:124,width:15,height:15,regX:10,regY:10,scale:0.8},
	}));

	items.push(new MerchantWeaponModel({primary_attribute:1, hand:2, type:"weapon", attack_type:"range", name:"Boomerang",
		min_damage:3,max_damage:6,range:60,attack_speed:75,
		sprite:{cropX:175,cropY:125,width:13,height:16,regX:6,regY:8,scale:0.8},
		projectile:{cropX:175,cropY:126,width:13,height:14,regX:6,regY:8,scale:0.8, spin:10},
	}));

	items.push(new MerchantWeaponModel({primary_attribute:2, hand:2, type:"weapon", attack_type:"range", name:"Wand",
		min_damage:3,max_damage:6,range:80,attack_speed:75,
		sprite:{cropX:196,cropY:125,width:16,height:16,regX:4,regY:12,scale:0.8},
		projectile:{cropX:245,cropY:79,width:14,height:14,regX:7,regY:7,scale:0.8, spin:0},
	}));

	items.push(new MerchantWeaponModel({primary_attribute:2, hand:2, type:"weapon", attack_type:"range", name:"Staff",
		min_damage:4,max_damage:8,range:80,attack_speed:90,
		sprite:{cropX:244,cropY:125,width:16,height:16,regX:4,regY:12,scale:0.8},
		projectile:{cropX:269,cropY:79,width:14,height:14,regX:7,regY:7,scale:0.8, spin:0},
	}));

	items.push(new MerchantArmorModel({primary_attribute:1, part:"head", type:"armor", name:"Leather\nHelm",
		sprite:{cropX:220,cropY:150,width:16,height:13,regX:10,regY:10,scale:0.8},
	}));

	items.push(new MerchantArmorModel({primary_attribute:0, part:"head", type:"armor", name:"Iron Helm",
		sprite:{cropX:244,cropY:149,width:16,height:15,regX:10,regY:10,scale:0.8},
	}));

	items.push(new MerchantArmorModel({primary_attribute:0, part:"head", type:"armor", name:"Plate Helm",
		sprite:{cropX:269,cropY:148,width:16,height:16,regX:10,regY:10,scale:0.8},
	}));

	items.push(new MerchantArmorModel({primary_attribute:2, part:"head", type:"armor", name:"Hood",
		sprite:{cropX:292,cropY:149,width:16,height:15,regX:10,regY:10,scale:0.8},
	}));

	items.push(new MerchantArmorModel({primary_attribute:1, part:"chest", type:"armor", name:"Tunic",
		sprite:{cropX:292,cropY:125,width:16,height:16,regX:10,regY:10,scale:0.8},
	}));

	items.push(new MerchantArmorModel({primary_attribute:1, part:"chest", type:"armor", name:"Chestguard",
		sprite:{cropX:316,cropY:124,width:16,height:15,regX:10,regY:10,scale:0.8},
	}));

	items.push(new MerchantArmorModel({primary_attribute:0, part:"chest", type:"armor", name:"Breastplate",
		sprite:{cropX:341,cropY:125,width:16,height:16,regX:10,regY:10,scale:0.8},
	}));

	items.push(new MerchantArmorModel({primary_attribute:0, part:"chest", type:"armor", name:"Chestplate",
		sprite:{cropX:365,cropY:126,width:16,height:16,regX:10,regY:10,scale:0.8},
	}));

	items.push(new MerchantArmorModel({primary_attribute:2, part:"chest", type:"armor", name:"Robe",
		sprite:{cropX:77,cropY:150,width:16,height:16,regX:10,regY:10,scale:0.8},
	}));

	items.push(new MerchantArmorModel({primary_attribute:2, part:"chest", type:"armor", name:"Raiment",
		sprite:{cropX:123,cropY:149,width:16,height:16,regX:10,regY:10,scale:0.8},
	}));

	items.push(new MerchantArmorModel({primary_attribute:3, part:"gloves", type:"armor", name:"Groves",
		sprite:{cropX:125,cropY:126,width:14,height:16,regX:10,regY:10,scale:0.8},
	}));

	items.push(new MerchantArmorModel({primary_attribute:3, part:"gloves", type:"armor", name:"Gauntlets",
		sprite:{cropX:148,cropY:126,width:15,height:16,regX:10,regY:10,scale:0.8},
	}));

	items.push(new MerchantArmorModel({primary_attribute:3, part:"boots", type:"armor", name:"Boots",
		sprite:{cropX:173,cropY:172,width:15,height:16,regX:10,regY:10,scale:0.8},
	}));

	items.push(new MerchantArmorModel({primary_attribute:3, part:"boots", type:"armor", name:"Boots",
		sprite:{cropX:197,cropY:173,width:16,height:16,regX:10,regY:10,scale:0.8},
	}));

	items.push(new MerchantArmorModel({primary_attribute:3, part:"belt", type:"armor", name:"Belt",
		sprite:{cropX:340,cropY:149,width:16,height:15,regX:10,regY:10,scale:0.8},
	}));

	items.push(new MerchantArmorModel({primary_attribute:3, part:"cape", type:"armor", name:"Cape",
		sprite:{cropX:4,cropY:173,width:16,height:16,regX:10,regY:10,scale:0.8},
	}));

	items.push(new MerchantArmorModel({primary_attribute:3, part:"cape", type:"armor", name:"Cape",
		sprite:{cropX:28,cropY:173,width:16,height:16,regX:10,regY:10,scale:0.8},
	}));

	items.push(new MerchantArmorModel({primary_attribute:3, part:"cape", type:"armor", name:"Cape",
		sprite:{cropX:52,cropY:173,width:16,height:16,regX:10,regY:10,scale:0.8},
	}));

	items.push(new MerchantArmorModel({primary_attribute:0, part:"shield", type:"armor", name:"Shield",
		sprite:{cropX:149,cropY:148,width:14,height:16,regX:10,regY:10,scale:0.8},
	}));

	items.push(new MerchantArmorModel({primary_attribute:2, part:"shield", type:"armor", name:"Shield",
		sprite:{cropX:173,cropY:148,width:14,height:16,regX:10,regY:10,scale:0.8},
	}));

	items.push(new MerchantArmorModel({primary_attribute:0, part:"shield", type:"armor", name:"Shield",
		sprite:{cropX:198,cropY:148,width:13,height:16,regX:10,regY:10,scale:0.8},
	}));

	items.push(new MerchantArmorModel({primary_attribute:3, part:"necklace", type:"armor", name:"Necklace",
		sprite:{cropX:148,cropY:172,width:16,height:15,regX:10,regY:10,scale:0.8},
	}));

	items.push(new MerchantArmorModel({primary_attribute:3, part:"ring", type:"armor", name:"Ring",
		sprite:{cropX:78,cropY:175,width:12,height:12,regX:10,regY:10,scale:0.8},
	}));

	items.push(new MerchantArmorModel({primary_attribute:3, part:"ring", type:"armor", name:"Ring",
		sprite:{cropX:103,cropY:174,width:11,height:10,regX:10,regY:10,scale:0.8},
	}));
	/*
	items.push(new PrototypeConsumableItemModel({type:"consumable", name:"Health\nPotion", rating:1, health:50, cooldown:10,
		icon:{cropX:220,cropY:173,width:13,height:16,regX:10,regY:10,scale:0.8},
	}));
	*/
	var count = 0;
	items.forEach(function(item){
		item.save(function(){
			count++;
			if(count === items.length){
				console.log(count + " items are created");
				process.exit(0);
			}
		});
	});
}

function initMap(maps, neutral_territory, npcs, monsters, act, chapter, name, merchant, recruiter, width, height, rows, cols, start_point){
	return new MapModel({
		maps:maps,
		neutral_territory:neutral_territory,
		npcs:npcs,
		monsters:monsters,
		act:act,
		chapter:chapter,
		name:name,
		merchant:merchant,
		recruiter:recruiter,
		width:width,
		height:height,
		cols:cols,
		rows:rows,
		start_point:start_point,
	});
}