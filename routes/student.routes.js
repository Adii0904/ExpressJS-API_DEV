const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const Student = require("../models/student.model");

//setting our multers;

//esme ham set karte hain ki image uplaod kaha hoga
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads");
  },
  filename: (req, file, callback) => {
    const newFilename = Date.now() + path.extname(file.originalname);
    callback(null, newFilename);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("only images are allowed"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 3, //3mb
  },
});

//doing with all routes;

router.get("/", async (req, res) => {
  try {
    const student = await Student.find({});
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// for single user data
router.get("/:id", async (req, res) => {
  try {
    const singleStudentData = await Student.findById(req.params.id);
    if (!singleStudentData) {
      return res.status(404).json({ message: "student data not found" });
    }
    res.status(201).json(singleStudentData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//add  new student;
router.post("/", upload.single("pic_url"), async (req, res) => {
  try {
    const student = new Student(req.body);
    // const newStudent = await Student.create(req.body);
    if (req.file) {
      //ye user se jo file aati hain usko ham req.file se milta hain
      student.pic_url = req.file.filename;
    }
    const newStudent = await student.save();
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//to update the student;

router.put("/:id", async (req, res) => {
  try {
    const updateStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updateStudent) {
      return res.status(404).json({ message: "not found User" });
    }
    if (updateStudent.pic_url) {
      const filepath = path.join("../uploads", updateStudent.pic_url);
      //to delte the file path in database of pic url folder image;
      fs.unlink(filepath, (err) => {
        console.log("failed to delter", err);
      });
    }

    res.json({ message: "picture is deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//to delete the data from the database
router.delete("/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    if (student.pic_url) {
      const filename = path.join("../uploads", student.pic_url);

      //uplink ka use ham delete karne ke liye karte hain.
      fs.unlink(filename, (err) => {
        if (err) {
          console.log(err, "failed to deleted");
        }
      });
    }

    res.json({ message: "user deleted Successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
