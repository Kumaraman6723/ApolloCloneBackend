const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    specialty: { type: String, required: true, trim: true },
    qualification: { type: String, required: true, trim: true },
    experience: { type: Number, required: true, min: 0 },
    languages: { type: [String], default: ["English"] },
    location: { type: String, required: true, trim: true },
    clinicName: { type: String, required: true, trim: true },
    fee: { type: Number, required: true, min: 0 },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0, min: 0 },
    availability: {
      today: { type: Boolean, default: false },
      tomorrow: { type: Boolean, default: false },
      nextAvailable: { type: String, default: "" },
    },
    consultationModes: {
      type: [String],
      enum: ["Clinic", "Video", "Hospital"],
      default: ["Clinic"],
    },
    image: { type: String, default: "" },
    about: { type: String, trim: true },
  },
  {
    timestamps: true,
  }
);

const Doctor = mongoose.model("Doctor", doctorSchema);
module.exports = Doctor;
