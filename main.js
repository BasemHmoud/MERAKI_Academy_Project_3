const express = require("express");

const app = express();

const port = 5000;

app.use(express.json());

const uuid = require("uuid");

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
    res.json(found);
  } else {
    res.status(404);
    res.json("articles not found");
  }
});
/*
app.delete("/articles/:id", (req, res) => {
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
    res.json(found);
  } else {
    res.status(404);
    res.json("articles not found");
  }
});*/
app.listen(port, () => {
  console.log(`server run on port ${port}`);
});
