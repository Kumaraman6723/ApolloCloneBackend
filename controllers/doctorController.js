const Doctor = require("../models/Doctor");

const addDoctor = async (req, res) => {
  try {
    const newDoctor = new Doctor(req.body);
    await newDoctor.save();
    res.status(201).json(newDoctor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getDoctors = async (req, res) => {
  try {
    const {
      specialty,
      experience,
      languages,
      consultationMode,
      availability,
      sortBy,
      page = 1,
      limit = 10,
    } = req.query;

    const query = {};

    if (specialty) query.specialty = specialty;
    if (experience) query.experience = { $gte: parseInt(experience) };
    if (languages) {
      const langArray = Array.isArray(languages) ? languages : [languages];
      query.languages = { $in: langArray };
    }
    if (consultationMode) query.consultationModes = consultationMode;
    if (availability === "Today") query["availability.today"] = true;
    else if (availability === "Tomorrow") query["availability.tomorrow"] = true;

    let sortOptions = {};
    switch (sortBy) {
      case "experience":
        sortOptions = { experience: -1 };
        break;
      case "fee-low-to-high":
        sortOptions = { fee: 1 };
        break;
      case "fee-high-to-low":
        sortOptions = { fee: -1 };
        break;
      default:
        sortOptions = { rating: -1 };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const doctors = await Doctor.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit));
    const totalDoctors = await Doctor.countDocuments(query);

    res.status(200).json({
      doctors,
      totalDoctors,
      totalPages: Math.ceil(totalDoctors / limit),
      currentPage: parseInt(page),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addDoctor, getDoctors };
