const express = require("express");
const db = require("./db");
const usersModule = require("./schema");
const { Users, Articles, Comments,Roles} = require("./schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
app.use(express.json());

//convert const port =3000 to
//you must add after require("dotenv").config();
const port = process.env.PORT;
const secret = process.env.SECRET;
//done
app.post("/users", (req, res) => {
  //read information from body
  const { firstName, lastName, age, country, email, password } = req.body;
  const newAuthor = new Users({
    firstName,
    lastName,
    age,
    country,
    email,
    password,
  });
  //save information
  newAuthor
    .save()
    .then((result) => {
      res.status(201);
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});
//done
app.post("/articles", (req, res) => {
  //read information from body
  const { title, description, author } = req.body;
  const newArticles = new Articles({
    title,
    description,
    author,
  });
  //save information
  newArticles
    .save()
    .then((result) => {
      res.status(201);
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});
//get all articles done
app.get("/articles", (req, res) => {
  Articles.find()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

//git article by author done
//return id in article not user
app.get("/articles/:id", (req, res) => {
  const ID = req.params.id;
  Articles
    //.findOne({_id:ID})
    .findById(ID)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

//git article by id done

app.get("/articles/author/:author", async (req, res) => {
  const author = req.params.author;
  let id;
  await Users
    //.findOne({_id:ID})
    .findOne({ firstName: author })
    .then((result) => {
      // id

      id = result._id;
    })
    .catch((err) => {
      res.json(err);
    });

  Articles.find({ author: id })
    /*
    display just author first name and last name without id
    ("author", 'firstName lastName -_id')*/
    .populate("author", "firstName lastName -_id")
    .exec()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

// updateAnArticleById
app.put("/articles/update/:id", (req, res) => {
  ID = req.params.id;
  //Articles.findOneAndUpdate option2 to solve
  Articles.findOneAndReplace(
    { author: ID },
    { title: req.body.title, description: req.body.description }
  )
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

//delete An Article By Id
app.delete("/articles/:id", (req, res) => {
  ID = req.params.id;
  //Articles.findOneAndDelete option2 to solve
  Articles.findOneAndDelete({ _id: ID })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});
//deleteArticlesByAuthor

app.delete("/articles1/:author", async (req, res) => {
  const author = req.params.author;
  let id;
  await Users
    //.findOne({_id:ID})
    .findOne({ firstName: author })
    .then((result) => {
      // id

      id = result._id;
    })
    .catch((err) => {
      res.json(err);
    });

  Articles.findOneAndDelete({ author: id })

    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});
//login
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  Users.findOne({ email: email, password: password })
    .then((result) => {
      if (result) {
        res.status(200);
        res.json("Valid login credentials");
      } else {
        res.status(401);
        res.json("Invalid  login credentials");
      }

      if (!result) {
        res.status(404);
        res.json("Invalid  login credentials");
      }
    })
    .catch((err) => {
      res.json(err);
    });
});
const auth = (req, res, next) => {
  //if the token is invalid then send a response back with
  //the status code 403 and a message of forbidden
  if (!req.headers.authorization) {
    return res.send({
      massage: "invalid token",
      status: "403",
    });
  }
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, secret, (err, result) => {
    if (err) {
      return res.json(err);
    } if(result) {
      req.token = result;
      console.log("req.token " + req.token);
      next();
    }
  });
};
app.post("/articles/:id/comments", auth, (req, res) => {
  //read information from body

  const comment = req.body.comment; //
  const commenter = req.params.id; //
  const newComments = new Comments({
    comment,
    commenter,
  });
  //save information
  newComments
    .save()
    .then((result) => {
      console.log("articles result" + result);
      res.status(201);
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});
app.post("/user", (req, res) => {
  const { firstName, lastName, age, country, email, password } = req.body;
  const newAuthor = new Users({
    firstName,
    lastName,
    age,
    country,
    email,
    password,
  });
  //save information
  newAuthor
    .save()
    .then((result) => {
      res.status(201);
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});
// refactor login [Level 1] to add authentication
app.post("/login1", (req, res) => {
  //find the user
  //compare password
  //check for email first and password second using if
  //email and password correct res
  //email is wrong and status 404 res
  //password is wrong and status 403 res
  const { email, password } = req.body;
  //console.log(password);
  // console.log(email);
  Users.findOne({ email }).then((result) => {
    if (!result) {
      res.status(404);
      res.json("The email doesn't exist");
    }

    const options = {
      //expiresIn: "2000" ms
      //expiresIn: "60s"
      //expiresIn: "60m"
      //expiresIn: "60h"
      //expiresIn: "1d"

      expiresIn: "60m",
    };
    //const secret = process.env.SECRET;
    const payload = {
      userId: result._id,
      country: result.country,
    };
    const token = jwt.sign(payload, secret, options);
    bcrypt.compare(password, result.password, (err, result1) => {
      console.log("compare pass " + password);
      console.log("compare result.password " + result.password);
      console.log("compare token " + token);

      if (result1) {
        console.log("check pass " + result1);
        res.json(token);
        console.log("done");
      } else {
        res.status(403);
        res.json("The password you’ve entered is incorrect");
      }
    }); //end compare
  });
});

/////////////////////////////////////////////////////////

app.listen(port, () => {
  console.log(`server run on port ${port}`);
});

/*
const articles = [
  {
    id: 1,
    title: "How I learn coding?",
    description: "Lorem, Quam, mollitia.",
    author: "Jouza",
  },
  {
    id: 2,
    title: "Coding Best Practices",
    description: "Lorem, ipsum dolor sit, Quam, mollitia.",
    author: "Besslan",
  },
  {
    id: 3,
    title: "Debugging",
    description: "Lorem, Quam, mollitia.",
    author: "Jouza",
  },
];

//Return all the articles

app.get("/articles", (req, res) => {
  res.status(200);
  res.json(articles);
});

//Return an article by a specific id

app.get("/articles/:id", (req, res) => {
  const articlesID = req.params.id;
  const found = articles.find((element) => {
    return element.id === parseInt(articlesID);
  });

  if (found) {
    // set the response status code to 200 (OK)
    // sends back a response of the found user
    res.status(200);
    res.json(found);
  } else {
    // set the response status code to 404 (Not Found)
    res.status(404);
    res.json("articles not found");
  }
});

//Return all the articles by a specific author

app.get("/articles/search_1/:author", (req, res) => {
  const articlesAuthor = req.params.author;
  // find return 1 value if need return 2 value or more use filter
  // const found = articles.find((element) => {
  const found = articles.filter((element) => {
    return element.author === articlesAuthor;
  });

  if (found) {
    // set the response status code to 200 (OK)
    // sends back a response of the found user
    res.status(200);
    res.json(found);
  } else {
    // set the response status code to 404 (Not Found)
    res.status(404);
    res.json("articles author not found");
  }
});

//Return the new article you created

app.post("/articles", (req, res) => {
  const newArticles = {
    //random id using uuid.v4()
    id: uuid(),
    title: req.body.title,
    description: req.body.description,
    author: req.body.author,
  };
  // if title or decription or author empty return error 400
  if (!newArticles.title || !newArticles.description || !newArticles.author) {
    return res.sendStatus(400);
  }
  //add new articles in array articles
  articles.push(newArticles);
  res.json(articles);
});

//Return the updating article (after updating it)

app.put("/articles/:id", (req, res) => {
  let i;
  const updateArticles = {
    title: req.body.title,
    description: req.body.description,
    author: req.body.author,
  };
  const found = articles.find((element, index) => {
    i = index;
    return element.id === parseInt(req.params.id);
  });

  if (found) {
    res.status(200);
    articles[i] = updateArticles;
    res.json(articles);
  } else {
    res.status(404);
    res.json("articles not found");
  }
});

//Return an object with keys called success with value true and a massage

const msg = {
  success: true,
  value: "Success Delete article with id",
};
app.delete("/articles/:id", (req, res) => {
  let i;
  const delArticles = req.params.id;
  const found = articles.filter((element, index) => {
    i = index;
    return element.id === parseInt(delArticles);
  });
  if (found) {
    res.status(200);
    articles.splice(i, 1);
    // res.json(articles)
    res.json(msg);
  } else {
    res.status(404);
    res.json("articles not found");
  }
});

app.delete("/articles/:author", (req, res) => {
  let i;
  const delArticlesAuthor = req.params.author;
  const found = articles.filter((element, index) => {
    i = index;
    if (element.author === delArticlesAuthor) {
      articles.splice(i, 1);
    }
    msgDelete = {
      success: true,
      massage: `Success delete all the articles for the    ${author}`,
    };
    res.json(msgDelete);
  });
});*/
