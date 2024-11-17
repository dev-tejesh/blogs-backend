const Blog = require("../models/blogmodel")
const mongoose = require('mongoose')

const createBlog = async(title, image, description, tag, user_id) => {
    
    if(!title || !image || !description || !tag){
        throw Error("All Fields must be filled")
    }
    const blog = await Blog.create({title,image,description,tag, user_id})
    console.log(blog)
    return blog
}

const getOneBlog = async(id) =>{
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw Error("No such blog")
    }
    const blog = await Blog.findById(id);
    if(!blog){
        throw Error("No such blog")
    }
    return blog
}

const getYourBlogs = async(user_id)=>{
    const yourblogs = await Blog.find({user_id: user_id}).sort({createdAt:-1});
    return yourblogs
}

const getAllBlogs = async() => {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    return blogs
}

const updateBlog = async(id, req) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw Error("No such blog")
    }
      const blog = await Blog.findOneAndUpdate(
        { _id: id },
        {
          ...req.body,
        }
      );
    
      if (!blog) {
        throw Error("No such blog")
      }    

      const updatedBlog = await getOneBlog(id)
      return updatedBlog
}

const deleteBlog = async(id) =>{
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw Error("No such blog")
    }
    const blog = Blog.findOneAndDelete({_id: id})
    if(!blog) throw Error("No such blog")
    return blog
}


module.exports = {createBlog, getOneBlog,getAllBlogs, updateBlog, deleteBlog, getYourBlogs}