import express from "express";
import FinancialRecordModel from "../schema/financial-record-schema.js";

const router = express.Router();

router.get("/getallbyuserid/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const records = await FinancialRecordModel.find({ userId: userId });
    console.log("Records for User ID:", userId, records);
    if (records.length == 0) {
      return res.status(200).send([]);
    }

    res.status(200).send(records);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// POST
router.post("/", async (req, res) => {
  try {
    const newrecordbody = req.body;
    console.log("New Record Body:", newrecordbody);
    const newRecord = new FinancialRecordModel(newrecordbody);
    console.log("New Record:", newRecord);
    const savedRecord = await newRecord.save();
    console.log("Saved Record:", savedRecord);
    res.status(200).send(savedRecord);
  } catch (error) {
    res.status(500).send(error);
  }
});

// PUT
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log("Updating Record ID:", id);
    console.log("New Record Body:", req.body);
    const newrecordbody = req.body;
    const record = await FinancialRecordModel.findByIdAndUpdate(
      id,
      newrecordbody,
      {
        new: true,
      }
    );

    if (!record) {
      return res.status(404).send();
    }

    res.status(200).send(record);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const record = await FinancialRecordModel.findByIdAndDelete(id);

    if (!record) {
      return res.status(404).send();
    }

    res.status(200).send(record);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
