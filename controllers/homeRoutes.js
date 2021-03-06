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

    // Pass serialized data into template along with logged_in status
    res.render("homepage", {
      blogpost,
      logged_in: req.session.logged_in,
    });
    
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/blogpost/:id", async (req, res) => {
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

    const current_user = req.session.user_id;
    const blogpost = blogpostData.get({plain: true});
    const commentData2 = commentData.map((com) => com.get({plain: true}));
    const comment = commentData2.map((com) =>  {
      com.current_user = current_user;
      return com;
    });
    blogpost.current_user = current_user;

     // pass blogpost data and comment data through
    console.log(comment);
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

router.get("/blogpost/personal/:id", withAuth, async (req, res) => {
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
          attributes: ["name", 'id'],
        },
      ],
    });

    const blogpost = blogpostData.get({plain: true});
    const comment = commentData.map((com) => com.get({plain: true}));
    // render blogpostpersonal which is a page that you can only get to if you are indeed the user who's blogpost is displayed
    // pass blogpost data and comment data through
    res.render("blogpostpersonal", {
      blogpost,
      comment,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/editblogpost/:id", withAuth, async (req, res) => {
  try {
    const blogpostData = await Blogpost.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    const blogpost = blogpostData.get({plain: true});

    res.render("editBlogpost", {
      blogpost,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/editcomment/:id", withAuth, async (req, res) => {
  try {
    const commentData = await Comment.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Blogpost,
        },
      ],
    });

    const comment = commentData.get({plain: true});

    res.render("editComment", {
      comment,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
