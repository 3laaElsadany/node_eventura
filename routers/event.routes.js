const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const {
  validationResult
} = require('express-validator');
const moment = require('moment');
const {
  isAuthenticated,
  valid
} = require('../middleware/auth');

router.get("/create", isAuthenticated, (req, res) => {
  res.render("event/create", {
    errors: req.flash("errors")
  })
})

router.post("/create", valid, (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    req.flash("errors", errors.array())
    res.redirect("/events/create")
  } else {
    let newEvent = new Event({
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
      location: req.body.location,
      created_at: Date.now(),
      user_id: req.user._id
    })
    newEvent.save()
    req.flash("info", "The event created successfuly")
    res.redirect("/events/1")
  }
})

router.get("/:pageNum", (req, res) => {
  let pageNum = 1;
  if (req.params.pageNum) {
    pageNum = req.params.pageNum
  }
  if (req.params.pageNum === 0) {
    pageNum = 1;
  }

  let x = {
    limit: 6,
    skip: 6 * (pageNum - 1)
  }
  let totalDocs = 0;
  Event.countDocuments({})
    .then(result => {
      totalDocs = parseInt(result)
      Event.find({}, {}, x).then((events) => {
        let chunk = [];
        let chunkSize = 3;
        for (let i = 0; i < events.length; i += chunkSize) {
          chunk.push(events.slice(i, chunkSize + i))
        }
        res.render("event/index", {
          chunk,
          message: req.flash("info"),
          pageNum,
          total: parseInt(totalDocs)
        });
      })
    })
})

router.get("/show/:id", (req, res) => {
  Event.findOne({
      _id: req.params.id
    }).then(event => {
      res.render("event/show", {
        event
      });
    })
    .catch(err => {
      console.log(err);
    })
})

router.get("/edit/:id", isAuthenticated, (req, res, next) => {
  Event.findOne({
      _id: req.params.id
    }).then(event => {
      res.render("event/edit", {
        event,
        eventDate: moment(event.date).format('YYYY-MM-DD'),
        errors: req.flash("errors"),
        message: req.flash("info")
      });
    })
    .catch(err => {
      console.log(err);
    })
})

router.post("/update/:id", valid, (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    req.flash("errors", errors.array())
    res.redirect("/events/edit/" + req.body.id)
  } else {
    Event.findByIdAndUpdate(req.body.id, {
      $set: {
        title: req.body.title,
        description: req.body.description,
        location: req.body.location,
        date: req.body.date
      }
    }).then(() => {
      req.flash("info", "The event updatd successfuly")
      res.redirect("/events/edit/" + req.body.id)
    }).catch(err => {
      console.log(err)
    })
  }
})

router.delete("/delete/:id", isAuthenticated, (req, res) => {
  Event.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(200).json({
        message: "Deleted"
      })
    })
    .catch(err => {
      console.log(err)
    })
})

module.exports = router