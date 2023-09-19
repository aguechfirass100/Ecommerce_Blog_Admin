const mongoose = require("mongoose");

const archiveSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  products: [
    {
      productId: {
        type: String
      },
      quantity: {
        type: Number,
        default: 1
      },
      img: {
        type: String
      },
      price: {
        type: Number
      }
    }
  ],
  amount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    default: "Pending"
  },
  quantity: {
    type: Number
  },
  archivedAt: {
    type: Date,
    default: Date.now
  }
});

const Archive = mongoose.model("Archive", archiveSchema);

module.exports = Archive;






// const mongoose = require("mongoose");

// const archiveSchema = new mongoose.Schema(
//   {
//     orders: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Order",
//         required: true,
//       },
//     ],
//     archivedAt: {
//       type: Date,
//       default: Date.now,
//     },
//   },
//   { timestamps: true }
// );

// const Archive = mongoose.model("Archive", archiveSchema);

// module.exports = Archive;

