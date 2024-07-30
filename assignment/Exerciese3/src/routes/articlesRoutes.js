const express = require("express");
const articlesRoutes = express.Router();
const articlesController = require("../controllers/articlesController");

articlesRoutes.get("/articles/:", articlesController.getAllArticles);
articlesRoutes.get("/articles/:id", articlesController.getArticlesByID); 
articlesRoutes.post("/articles", articlesController.createArticle);
articlesRoutes.put("/articles/:id", articlesController.updateArticleById);
articlesRoutes.delete("/articles/:id", articlesController.deleteArticleById);


module.exports = articlesRoutes 