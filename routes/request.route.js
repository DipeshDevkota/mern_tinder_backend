const express = require("express");
const requestroute = express.Router();

const { userAuth } = require("../middlewares/auth");
const connectionRequest = require("../models/connectionRequest.model");
const User = require("../models/user");

requestroute.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const receiver = await User.findById(toUserId);

      const receiverName = [receiver.firstName, receiver.lastName].join(" ");

      const isAllowedstatus = ["ignored", "interested"];
      if (!isAllowedstatus.includes(status)) {
        return res.status(400).json({ message: "Invalid status provided" });
      }

      const availableuser = await User.findById(toUserId);
      if (!availableuser) {
        return res.status(404).json({ message: "User doesn't exist!" });
      }

      const existingConnectionreq = await connectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (existingConnectionreq) {
        return res
          .status(400)
          .send({ message: "Connection Request Already Exists!!!" });
      }

      const connection = new connectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      await connection.save();

      return res
        .status(200)
        .json({
          message: `Request sent as ${status} successfully to ${receiverName}`,
        });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Server error", error: error.message });
    }
  }
);

module.exports = requestroute;
