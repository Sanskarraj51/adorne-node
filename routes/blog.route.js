const express = require("express");
const router = express.Router();
const upload = require("../helper/productsUpload");
const { BlogEntity } = require("../models");
const { CommentEntity } = require("../models");

router.post("/add-posts", upload.single("postImage"), async (req, res) => {
  try {
    const entity = await BlogEntity.findOne({
      where: { title: req.body.title },
    });
    if (entity) {
      return res.status(200).json({ code: true, message: "Already exists" });
    }

    await BlogEntity.create({
      title: req.body.title,
      post: req.body.post,
      postImage: req.file.filename,
    });

    return res.status(200).json({ code: true, message: "Post added" });
  } catch (error) {
    return res
      .status(error.http_code)
      .json({ code: false, message: error.message });
  }
});

router.post("/update-blog", upload.single("postImage"), async (req, res) => {
  try {
    if (req.file) {
      await BlogEntity.update(
        {
          title: req.body.title,
          post: req.body.post,
          postImage: req.file.filename,
        },
        { where: { id: req.body.blog_id } }
      );
      return res.status(200).json({ code: true, message: "Blog updated" });
    } else {
      await BlogEntity.update(
        {
          title: req.body.title,
          post: req.body.post,
        },
        { where: { id: req.body.blog_id } }
      );
      return res.status(200).json({ code: true, message: "Blog updated" });
    }
  } catch (err) {
    return res
      .status(err.http_code)
      .json({ code: false, message: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const sizes = await BlogEntity.findAll({});
    let respData = {
      mediaUrl: process.env.HOST + "/products/",
      posts: sizes,
    };
    return res
      .status(200)
      .json({ code: true, message: "post list", data: respData });
  } catch (err) {
    return res
      .status(err.http_code)
      .json({ code: false, message: err.message });
  }
});

router.get("/removepost/:id", async (req, res) => {
  try {
    await BlogEntity.destroy({ where: { id: req.params.id } });
    return res.status(200).json({ code: true, message: "post removed" });
  } catch (err) {
    return res
      .status(err.http_code)
      .json({ code: false, message: err.message });
  }
});

router.post("/add-comment", upload.single("postImage"), async (req, res) => {
  try {
    await CommentEntity.create({
      comment: req.body.comment,
      name: req.body.name,
      email: req.body.email,
      postId: req.body.postId,
    });

    return res.status(200).json({ code: true, message: "Comment added" });
  } catch (error) {
    return res
      .status(error.http_code)
      .json({ code: false, message: error.message });
  }
});

router.get("/get-post-comment", async (req, res) => {
  try {
    console.log(req.body);
    const sizes = await CommentEntity.findAll({
      where: { postId: req.body.postId },
    });

    return res
      .status(200)
      .json({ code: true, message: "post list", data: sizes });
  } catch (err) {
    return res
      .status(err.http_code)
      .json({ code: false, message: err.message });
  }
});
module.exports = router;
