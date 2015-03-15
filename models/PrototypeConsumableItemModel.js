var PrototypeConsumableItemSchema = new Schema({
	name:String,
	type:String,
	icon:{
		source:String,
		cropX:Number,
		cropY:Number,
		width:Number,
		height:Number,
		regX:Number,
		regY:Number,
		scale:Number,
	},
	health:Number,
	resource:Number,
});

PrototypeConsumableItemSchema.methods.setMerchantItem = function(level){
	var item = this.toObject();
	item.price = level * 5;
	return item;
}

PrototypeConsumableItemModel = mongoose.model('PrototypeConsumableItem', PrototypeConsumableItemSchema);