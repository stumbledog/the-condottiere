var Game = (function(){

	var instance;

	function init(){
		var unit_stage, map_stage, ui_stage, loader, hero, blocks;
		var cols = rows = 20;
		var scale = 1;

		window.onresize = function(){
			map_stage.canvas.width = unit_stage.canvas.width = window.innerWidth;
			map_stage.canvas.height = unit_stage.canvas.height = window.innerHeight;
			map_stage.update();
			unit_stage.update();
		};

		var hero_builder = {
			src:"assets/Graphics/Characters/01 - Hero.png",
			src_id:"01 - Hero",
			portrait_src:"assets/Graphics/Faces/ds_face01-02.png",
			portrait_id:"ds_face01-02",
			index:0,
			level:1,
			exp:0,
			resource_type:"fury",
			resource:100,
			health:200,
			damage:5,
			attack_speed:60,
			armor:2,
			move_speed:5,
			critical_rate:0.1,
			critical_damage:2,
			radius:12,
			aggro_radius:160,
			range:32,
			type:"hero",
			team:"player",
			health_color:"#0C0",
			damage_color:"#C00",
			weapon:{
				type:"melee",
				src:"assets/Graphics/System/Icons/IconSet.png",
				src_id:"IconSet",
				cropX:292,
				cropY:100,
				width:16,
				height:16,
				regX:12,
				regY:12,
				scale:0.8,
			}
		};

		var follow_builder = {
			src:"assets/Graphics/Characters/23 - Soldier.png",
			src_id:"23 - Soldier",
			index:0,
			level:1,
			exp:0,
			resource_type:"fury",
			resource:100,
			health:20,
			damage:2,
			attack_speed:60,
			armor:2,
			move_speed:5,
			critical_rate:0.1,
			critical_damage:2,
			radius:12,
			aggro_radius:160,
			range:32,
			type:"follow",
			team:"player",
			health_color:"#0C0",
			damage_color:"#C00",
			weapon:{
				type:"melee",
				src:"assets/Graphics/System/Icons/IconSet.png",
				src_id:"IconSet",
				cropX:292,
				cropY:100,
				width:16,
				height:16,
				regX:12,
				regY:12,
				scale:0.8,
			}
		};

		var monster_builder = {
			src:"assets/Graphics/Characters/29 - Monster.png",
			src_id:"29 - Monster",
			index:0,
			level:1,
			exp:20,
			resource_type:"mana",
			resource:20,
			health:10,
			damage:1,
			attack_speed:60,
			armor:0,
			move_speed:2,
			critical_rate:0.0,
			critical_damage:1,
			radius:4,
			aggro_radius:160,
			range:32,
			type:"monster",
			team:"enemy",
			health_color:"#C00",
			damage_color:"#CC0",
		};

		var map_data = {
			maps:[{
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
					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				], 
				tile_map:[
					[32,0,32,32],
					[160,0,32,32],
				], 
				src:"assets/Graphics/Tilesets/A5/Exterior_Forest_TileA5.png", 
				id:"A5/Exterior_Forest_TileA5",
				block:false
				},{
				tiles:[
					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				], 
				tile_map:[
					[0,160,32,32],
					[0,128,32,32],
					[32,128,32,32],
					[64,128,32,32],
					[0,192,32,32],
					[64,192,32,32],
					[64,160,32,32],
				], 
				src:"assets/Graphics/Tilesets/E/Exterior_Walls_TileE.png", 
				id:"E/Exterior_Walls_TileE",
				block:true
			}],
			width:cols*32,
			height:rows*32,
			cols:cols,
			rows:rows,
			start_point:[32,32],
		};

		var manifest = [];

		manifest.push({src:hero_builder.src,id:hero_builder.src_id});
		manifest.push({src:hero_builder.portrait_src,id:hero_builder.portrait_id});
		manifest.push({src:hero_builder.weapon.src,id:hero_builder.weapon.src_id});
		manifest.push({src:follow_builder.src,id:follow_builder.src_id});
		manifest.push({src:monster_builder.src,id:monster_builder.src_id});

		map_data.maps.forEach(function(map){
			manifest.push({src:map.src,id:map.id});
		});

		loader = new createjs.LoadQueue(false);
		loader.addEventListener("complete", handleLoadComplete);
		loader.loadManifest(manifest);

		function handleLoadComplete(){
			initMapStage();
			initUnitStage();

			createHero(hero_builder);
			for(var i=0;i<10;i++){
				createFollower(follow_builder);
				createEnemy(monster_builder);
			}
			initUIStage();
		}

		function initMapStage(){
			map_stage = new Map_Stage(map_data);
			blocks = map_stage.getBlock();
		}

		function initUnitStage(){
			unit_stage = new Unit_Stage(cols * 32 * scale, rows * 32 * scale, 20);
		}

		function initUIStage(){
			ui_stage = new UI_Stage(hero);
		}

		function createHero(builder){
			builder.x = map_data.start_point[0];
			builder.y = map_data.start_point[1];
			builder.blocks = blocks;
			hero = new Hero(builder);
			unit_stage.addHero(hero);
		}

		function createFollower(builder){
			builder.x = map_data.start_point[0] + Math.random();
			builder.y = map_data.start_point[1] + Math.random();
			builder.blocks = blocks;
			unit_stage.addFollower(new Follower(builder));
		}

		function createEnemy(builder){
			builder.x = Math.floor(Math.random()*cols)*32+8;
			builder.y = Math.floor(Math.random()*rows)*32+8;
			builder.blocks = blocks;
			unit_stage.addUnit(new Monster(builder));
		}

		return {
			getLoader:function(){
				return loader;
			},
			getMapStage:function(){
				return map_stage;
			},
			getUnitStage:function(){
				return unit_stage;
			},
			getUIStage:function(){
				return ui_stage;
			},
			setScale:function(delta){
				scale += delta;
				scale = scale < 1 ? 1 :scale > 4 ? 4 : scale;
				map_stage.scaleX = map_stage.scaleY = scale;
				unit_stage.scaleX = unit_stage.scaleY = scale;
				map_stage.update();
			}
		}
	}

	return {
		getInstance:function(){
			if(!instance){
				instance = init();
			}
			return instance;
		}
	}
})();

Game.getInstance();