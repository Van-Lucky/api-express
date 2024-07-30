const articles = require("../models/articles.json") || [];
const Response = require("../responesbody/Respones.js");

const getAllArticles = (req, res) => {
  try {
    const { title, content, created_by, is_published } = req.params;
    const foundArticles = articles.filter((article) => {
      return article === parseInt(article);
    });
  } catch (error) {

  }
  // return res.send(articles);
};

const getArticlesByID = (req, res) => {
  try {
    const { id } = req.params;
    const foundArticles = articles.filter((article) => {
      return article.id === parseInt(id);
    });
    if (foundArticles.length > 0) {
      new Response(res).setResponse(foundArticles[0]).send();
    } else {
      new Response(res)
        .setStatusCode(404)
        .setCustomCode(10001)
        .setMessage("Article not found")
        .send();
    }
  } catch (error) {
    console.log(error);
    new Response(res)
      .setStatusCode(500)
      .setCustomCode(10000)
      .setMessage("Internal server error")
      .send();
  }
};

const createArticle = async (req, res) => {
  try {
    const { title, content, created_by, is_published } = req.body;

    const newArticle = {
      id: articles.length + 1, // Assuming articles are stored in an array
      title,
      content,
      created_by,
      is_published,
      created_at: new Date().toISOString(), // Set the created_at timestamp
      updated_at: new Date().toISOString(),
    };
    articles.push(newArticle);
    res.status(201).json({
      status: 201,
      message: "Article created successfully",
      data: newArticle,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      code: 10002,
      message: error.message,
    });
  }
};

const updateArticleById = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, created_by, is_published } = req.body;

    const articleIndex = articles.findIndex(article => article.id === parseInt(id));
    if (articleIndex === -1) {
      return res.status(404).json({
        code: 10003,
        message: "Article not found"
      });
    }

    articles[articleIndex] = {
      ...articles[articleIndex],
      title,
      content,
      created_by,
      is_published,
      updated_at: new Date().toISOString()
    };

    res.status(200).json({
      status: 200,
      message: "Article updated successfully",
      data: articles[articleIndex]
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      code: 10004,
      message: error.message
    });
  }
};

const deleteArticleById = async (req, res) => {
  try {
    const { id } = req.params;

    const articleIndex = articles.findIndex(article => article.id === parseInt(id));
    if (articleIndex === -1) {
      return res.status(404).json({
        code: 10005,
        message: "Article not found"
      });
    }

    const deletedArticle = articles.splice(articleIndex, 1)[0];

    res.status(200).json({
      status: 200,
      message: "Article deleted successfully",
      data: deletedArticle
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      code: 10006,
      message: error.message
    });
  }
};

module.exports = {
  getAllArticles,
  getArticlesByID,
  createArticle,
  updateArticleById,
  deleteArticleById,
};