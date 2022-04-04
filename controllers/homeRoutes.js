const router = require("express").Router();
const {User, Blogpost, Comment} = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    const blogpostData = await Blogpost.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    // Serialize data so the template can read it
    const blogpost = blogpostData.map((blog) => blog.get({plain: true}));

    // Pass serialized data and session flag into template
    res.render("homepage", {
      blogpost,
      logged_in: req.session.logged_in,
    });
    // res.json(blogpost);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/blogpost/:id", withAuth, async (req, res) => {
  try {
    const blogpostData = await Blogpost.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    const commentData = await Comment.findAll({
      where: {
        blogpost_id: req.params.id,
      },
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    const blogpost = blogpostData.get({plain: true});
    const comment = commentData.map((com) => com.get({plain: true}));

    res.render("blogpost", {
      blogpost,
      comment,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

// Using withAuth middleware to prevent access to route
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: {exclude: ["password"]},
      include: [{model: Blogpost}],
    });

    const user = userData.get({plain: true});
    console.log(user);

    res.render("dashboard", {
      user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/newblogpost", withAuth, (req, res) => {
  // If the user is already logged in, redirect the request to another route

  res.render("newblogpost", {
    logged_in: true,
  });
});

module.exports = router;
