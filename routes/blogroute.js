const express = require('express')
const BlogRouter = express.Router()
const BlogCtrl = require("../controllers/blogController");



BlogRouter.post('/create', BlogCtrl.createBlog)
BlogRouter.get('/one/:id', BlogCtrl.getOneBlog )
BlogRouter.get('/all',BlogCtrl.getAllBlogs)
BlogRouter.patch('/update/:id',BlogCtrl.updateBlog)
BlogRouter.delete('/delete/:id',BlogCtrl.deleteBlog)
BlogRouter.get('/yourblogs',BlogCtrl.getYourBlogs)

module.exports = BlogRouter