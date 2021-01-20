const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const formidable = require("express-formidable");
const cloudinary = require("cloudinary");
const SHA1 = require("crypto-js/sha1");
const multer = require("multer");
const moment = require("moment");
const fs = require("fs");
const path = require("path");

const app = express();
const mongoose = require("mongoose");
const async = require("async");
require("dotenv").config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// app.use(express.static("client/build"));

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// STORAGE MULTER CONFIG
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  // fileFilter:(req,file,cb)=>{

  //     const ext = path.extname(file.originalname)
  //     if(ext !== '.jpg' && ext !== '.png'){
  //         return cb(res.status(400).end('only jpg, png is allowed'),false);
  //     }

  //     cb(null,true)
  // }
});

// Models
const { User } = require("./models/user");
const { Category } = require("./models/category");
const { MenuItem } = require("./models/menuItem");
const { Payment } = require("./models/payment");
const { Site } = require("./models/site");

// Middlewares
const { auth } = require("./middleware/auth");
const { admin } = require("./middleware/admin");

// UTILS
const { sendEmail } = require("./utils/mail/index");

//=================================
//             ADMIN UPLOADS
//=================================

const upload = multer({ storage: storage }).single("file");

app.post("/api/users/uploadfile", auth, admin, (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({ success: true });
  });
});

app.get("/api/users/admin_files", auth, admin, (req, res) => {
  const dir = path.resolve(".") + "/uploads/";
  fs.readdir(dir, (err, items) => {
    return res.status(200).send(items);
  });
});

app.get("/api/users/download/:id", auth, admin, (req, res) => {
  const file = path.resolve(".") + `/uploads/${req.params.id}`;
  res.download(file);
});

//=================================
//             MENU_ITEM
//=================================

// BY ARRIVAL
// /items?sortBy=createdAt&order=desc&limit=4

// BY SELL
// /items?sortBy=sold&order=desc&limit=100
app.get("/api/menu/items", (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? parseInt(req.query.limit) : 100;

  MenuItem.find()
    .populate("category")
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, items) => {
      if (err) return res.status(400).send(err);
      res.send(items);
    });
});

/// /api/menu/item?id=HSHSHSKSK,JSJSJSJS,SDSDHHSHDS,JSJJSDJ&type=single
app.get("/api/menu/items_by_id", (req, res) => {
  let type = req.query.type;
  let items = req.query.id;

  if (type === "array") {
    let ids = req.query.id.split(",");
    items = [];
    items = ids.map((item) => {
      return mongoose.Types.ObjectId(item);
    });
  }

  MenuItem.find({ _id: { $in: items } })
    .populate("category")
    .exec((err, docs) => {
      return res.status(200).send(docs);
    });
});

app.post("/api/menu/item", auth, admin, (req, res) => {
  const menuItem = new MenuItem(req.body);

  menuItem.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      item: doc,
    });
  });
});

//=================================
//              CATEGORY
//=================================

app.post("/api/menu/category", auth, admin, (req, res) => {
  const category = new Category(req.body);

  category.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      category: doc,
    });
  });
});

app.get("/api/menu/categories", (req, res) => {
  Category.find({}, (err, categories) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(categories);
  });
});

// //=================================
// //              USERS
// //=================================

app.post("/api/users/reset_user", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    user.generateResetToken((err, user) => {
      if (err) return res.json({ success: false, err });
      sendEmail(user.email, user.name, null, "reset_password", user);
      return res.json({ success: true });
    });
  });
});

app.post("/api/users/reset_password", (req, res) => {
  var today = moment().startOf("day").valueOf();

  User.findOne(
    {
      resetToken: req.body.resetToken,
      resetTokenExp: {
        $gte: today,
      },
    },
    (err, user) => {
      if (!user)
        return res.json({
          success: false,
          message: "Sorry, token bad, generate a new one.",
        });

      user.password = req.body.password;
      user.resetToken = "";
      user.resetTokenExp = "";

      user.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
          success: true,
        });
      });
    }
  );
});

app.get("/api/users/auth", auth, (req, res) => {
  res.status(200).json({
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    cart: req.user.cart,
    history: req.user.history,
  });
});

app.post("/api/users/register", (req, res) => {
  const user = new User(req.body);

  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    sendEmail(doc.email, doc.name, null, "welcome");
    res.status(200).json({
      success: true,
    });
  });
});

app.post("/api/users/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.json({
        loginSuccess: false,
        message: "Auth failed, email not found",
      });

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({ loginSuccess: false, message: "Wrong password" });

      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.cookie("w_auth", user.token).status(200).json({
          loginSuccess: true,
        });
      });
    });
  });
});

app.get("/api/users/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true,
    });
  });
});

app.post("/api/users/uploadimage", auth, admin, formidable(), (req, res) => {
  cloudinary.uploader.upload(
    req.files.file.path,
    (result) => {
      console.log(result);
      res.status(200).send({
        public_id: result.public_id,
        url: result.url,
      });
    },
    {
      public_id: `${Date.now()}`,
      resource_type: "auto",
    }
  );
});

app.get("/api/users/removeimage", auth, admin, (req, res) => {
  let image_id = req.query.public_id;

  cloudinary.uploader.destroy(image_id, (error, result) => {
    if (error) return res.json({ succes: false, error });
    res.status(200).send("ok");
  });
});

app.post("/api/users/addToCart", auth, (req, res) => {
  User.findOne({ _id: req.user._id }, (err, doc) => {
    let duplicate = false;

    doc.cart.forEach((item) => {
      if (item.id == req.query.menuItemId) {
        duplicate = true;
      }
    });

    if (duplicate) {
      User.findOneAndUpdate(
        {
          _id: req.user._id,
          "cart.id": mongoose.Types.ObjectId(req.query.menuItemId),
        },
        { $inc: { "cart.$.quantity": 1 } },
        { new: true },
        () => {
          if (err) return res.json({ success: false, err });
          res.status(200).json(doc.cart);
        }
      );
    } else {
      User.findOneAndUpdate(
        { _id: req.user._id },
        {
          $push: {
            cart: {
              id: mongoose.Types.ObjectId(req.query.menuItemId),
              quantity: 1,
              date: Date.now(),
            },
          },
        },
        { new: true },
        (err, doc) => {
          if (err) return res.json({ success: false, err });
          res.status(200).json(doc.cart);
        }
      );
    }
  });
});

app.get("/api/users/removeFromCart", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    {
      $pull: { cart: { id: mongoose.Types.ObjectId(req.query._id) } },
    },
    { new: true },
    (err, doc) => {
      let cart = doc.cart;
      let array = cart.map((item) => {
        return mongoose.Types.ObjectId(item.id);
      });

      MenuItem.find({ _id: { $in: array } })
        .populate("categories")
        .exec((err, cartDetail) => {
          return res.status(200).json({
            cartDetail,
            cart,
          });
        });
    }
  );
});

app.post("/api/users/successBuy", auth, (req, res) => {
  let history = [];
  let transactionData = {};
  const date = new Date();
  const po = `PO-${date.getSeconds()}${date.getMilliseconds()}-${SHA1(
    req.user._id
  )
    .toString()
    .substring(0, 8)}`;

  // user history
  req.body.cartDetail.forEach((item) => {
    history.push({
      porder: po,
      dateOfPurchase: Date.now(),
      name: item.name,
      category: item.category.name,
      id: item._id,
      price: item.price,
      quantity: item.quantity,
      paymentId: req.body.paymentData.paymentID,
    });
  });

  // PAYMENTS DASH
  transactionData.user = {
    id: req.user._id,
    name: req.user.name,
    lastname: req.user.lastname,
    email: req.user.email,
  };
  transactionData.data = { ...req.body.paymentData, porder: po };
  transactionData.menuItem = history;

  User.findOneAndUpdate(
    { _id: req.user._id },
    { $push: { history: history }, $set: { cart: [] } },
    { new: true },
    (err, user) => {
      if (err) return res.json({ success: false, err });

      const payment = new Payment(transactionData);
      payment.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        let menuItems = [];
        doc.menuItem.forEach((item) => {
          menuItems.push({ id: item.id, quantity: item.quantity });
        });

        async.eachSeries(
          menuItems,
          (item, callback) => {
            MenuItem.update(
              { _id: item.id },
              {
                $inc: {
                  sold: item.quantity,
                },
              },
              { new: false },
              callback
            );
          },
          (err) => {
            if (err) return res.json({ success: false, err });
            sendEmail(user.email, user.name, null, "purchase", transactionData);
            res.status(200).json({
              success: true,
              cart: user.cart,
              cartDetail: [],
            });
          }
        );
      });
    }
  );
});

app.post("/api/users/update_profile", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    {
      $set: req.body,
    },
    { new: true },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true,
      });
    }
  );
});

// =================================
//              SITE
// =================================

app.get("/api/site/site_data", (req, res) => {
  Site.find({}, (err, site) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(site[0].siteInfo);
  });
});

app.post("/api/site/site_data", auth, admin, (req, res) => {
  Site.findOneAndUpdate(
    { name: "Site" },
    { $set: { siteInfo: req.body } },
    { new: true },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true,
        siteInfo: doc.siteInfo,
      });
    }
  );
});

// // DEFAULT
// if (process.env.NODE_ENV === "production") {
//   const path = require("path");
//   app.get("/*", (req, res) => {
//     res.sendfile(path.resolve(__dirname, "../client", "build", "index.html"));
//   });
// }

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Server Running at ${port}`);
});
