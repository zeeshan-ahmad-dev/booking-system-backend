import mongoose from "mongoose";

const AMENITIES = [
  "wifi",
  "ac",
  "heating",
  "kitchen",
  "parking",
  "pool",
  "tv",
  "washer",
  "dryer",
  "workspace",
  "gym",
  "breakfast",
  "pets_allowed",
  "washing machine"
];

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  availability: {
    type: Boolean,
    required: true,
    default: true,
  },
  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  beds: {
    type: Number,
    required: true,
    min: 1
  },
  bedrooms: {
    type: Number,
    required: true,
    min: 0
  },
  bathrooms: {
    type: Number,
    required: true,
    min: 1
  },
  propertyType: {
    type: String,
    enum: ["apartment", "house", "room", "villa"],
    default: 'house'
  },
  amenities: {
    type: [{
      type: String,
      enum: AMENITIES,
      lowercase: true,
      trim: true
    }],
    default: [],
    set: arr => [...new Set(arr)] 
  },
  images: {
    type: [String],
    default: [],
    validate: {
      validator: v => v.length <= 10,
      message: "Maximum 10 images allowed"
    }
  },
  price: {
    amount: {
      type: Number,
      required: true,
      min: 1
    },
    currency: {
      type: String,
      default: "PKR"
    }
  },
  priceType: {
    type: String,
    enum: ["night", "week", "month"],
    default: "night"
  },
  maxGuests: {
    type: Number,
    required: true,
    min: 1
  },
}, { timestamps: true});

listingSchema.index({ location: 1 });
listingSchema.index({ "price.amount": 1 });
listingSchema.index({ host: 1 });

const listingsModel = mongoose.model("listing", listingSchema);

export default listingsModel;