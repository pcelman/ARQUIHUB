const { reviewReportModel, usersModel,reviewModel } = require("../models")

const getReviewReports = async (req, res) => {
    try {
        const allReports = await reviewReportModel.find({}).populate("user_id").populate({path:"review_id",populate:{path:"user_id"}}).populate("admin_id")
      res.status(200).send(allReports)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const createReviewReport = async (req, res) => {
    try {
        const { user_id, review_id, value} = req.body;
        if(!value,!review_id,!user_id){ return res.status(404).json({error:"Missing required parameters"})}
        const reportCompare =await reviewReportModel.find({user_id:user_id}&&{review_id:review_id})
        if(reportCompare.length!==0){ return res.status(200).json({error:"you have already made a previous report"})}
        
        await reviewReportModel.create({ user_id, review_id, value})
        res.status(200).json({success:"Report created successfully"})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const updateReviewReport = async (req, res) => {
    try {
        const { id } = req.params;
        const { value, admin_id} = req.body;
        await usersModel.findById(admin_id)
        await reviewReportModel.findOneAndUpdate({_id:id}, {value,admin_id} )
        res.status(200).json({success:"Report updated successfully"});
    } catch (error) {
        res.status(400).send({error:error.message})
    }
}

 const deleteReviewReport = async (req, res) => {
    try {
        const { id } = req.params;
        const reviewDelete = reviewReportModel.find({_id:id})
        if(reviewDelete.length===0){ return res.status(200).json({error:"The post to delete doesn´t exist"})}
       await reviewReportModel.deleteOne({_id:id})
        res.status(200).json({success:"Review report deleted"})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
} 

/* 
const getReviewReport = async (req, res) => {
    try {
        const { id, mood } = req.params;

        if(id.length < 24){
            return res.status(400).send("No searchable id")
        }
        if(mood=="post"){
            const reviews= await reviewModel.find({}).populate("user_id")
            const review = reviews.filter(e=>e.post_id==id); 
            return res.status(200).json(review)
        }
        if(mood==="user"){
        const reviews= await reviewModel.find({user_id:id}).populate("post_id");
        const review = reviews.filter(e=>e.post_id==id); 
        return res.status(200).send(review)}

        const reviews= await reviewModel.find({}).populate("post_id").populate("user_id");
        const review = reviews.filter(e=>e._id==id); 
        return res.status(200).send(review)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
} */


module.exports = { getReviewReports, createReviewReport, updateReviewReport , deleteReviewReport, /*getReviewReport  */}