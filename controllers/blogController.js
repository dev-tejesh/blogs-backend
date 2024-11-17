const { model } = require("mongoose")
const blogService = require("../services/blogService")

const createBlog = async (req,res) => {
    const {title, image, description, tag} = req.body 
    const user_id = req.user
    try {

        const blog = await blogService.createBlog(title, image, description,tag,user_id)
        res.status(200).json(blog)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


const getOneBlog = async (req, res) => {
    const { id } = req.params;
    try {
        const blog = await blogService.getOneBlog(id); // if not exist return null
        res.status(200).json(blog);
    } catch (error) {
        res.status(404).json({error: error.message})
    }
   
};

const getYourBlogs = async(req,res) => {
    const user_id = req.user
    try {
        const yourblogs = await blogService.getYourBlogs(user_id);
        res.status(200).json(yourblogs)
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

const getAllBlogs = async (req,res) =>{
    try {
        const blogs = await blogService.getAllBlogs();
        res.status(200).json(blogs)
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

const updateBlog = async (req,res) => {
    const {id} = req.params
    
    try {
        const blog = await blogService.updateBlog(id,req);
        res.status(200).json(blog);
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

const deleteBlog = async (req,res) => {
    const {id} = req.params
    try {
        const blog = await blogService.deleteBlog(id);
        res.status(200).json({message: "Successfully Deleted"});
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

module.exports = {createBlog, getOneBlog, getAllBlogs, updateBlog, deleteBlog, getYourBlogs}