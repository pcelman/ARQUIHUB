const { usersModel, projectModel, updateModel, downloadModel } = require("../models")

/* const getDownloads = async (req, res) => {
    try {
        const allDownloads = await reviewModel.find({})
        res.status(200).send(allDownloads)

    } catch (error) {
        res.status(400).json({error:error.message})
    }
}
 */
const createDownload = async (req, res) => {
    try {
        const {project_id, user_id, update_id} = req.body;
        console.log(project_id, user_id, update_id)
        if(!project_id,!user_id)return res.status(400).json({error:"Missing required parameters"})
        await usersModel.findById(user_id)
        await projectModel.findById(project_id)
        if(update_id) await updateModel.findById(update_id)
        await downloadModel.create({project_id, user_id, update_id})
        res.status(200).json({success:"created download succesfully"})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

/* const updateReview = async (req, res) => {
    try {
      
        const { id } = req.params;
        const { value, comment} = req.body;
        console.log(id,value,comment)
        await reviewModel.updateOne({_id:id}, {value:value,comment:comment})
        const {post_id} = await reviewModel.findById(id)
        const allReviews =await reviewModel.find({})
        const reviews = allReviews.filter(e=>e.post_id.equals(post_id)&& e._id!=id);
        let suma = 0;
         reviews.forEach(e=> {suma = suma + (e.value?e.value:0)})
          suma = suma + value
        await postModel.findOneAndUpdate({_id:post_id}, {rating:suma/reviews.length+1})
        res.status(200).json({success:"you updated successfull"});

    } catch (error) {
        res.status(400).json({error:error.message})
    }
}
 */
/* const deleteReview = async (req, res) => {
    try {
        const { id } = req.params;
        const {post_id} = await reviewModel.findById(id)
       await reviewModel.deleteOne({_id:id})
       const allReviews =await reviewModel.find({})
       console.log(post_id)
       console.log(allReviews.map(e=>e.post_id.equals(post_id) ? post_id:0));
       const reviews = allReviews.filter(e=>e.post_id.equals(post_id));
       console.log(reviews)
       let suma = 0;
        reviews.forEach(e=>{ suma = suma + (e.value?e.value:0)})
       await postModel.findOneAndUpdate({_id:post_id}, {rating:suma/reviews.length})

        res.status(200).json({success:"Review deleted"})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

 */
/* const getDownload = async (req, res) => {
    try {
        const { id} = req.params;

        if(id.length < 24){
            return res.status(400).send("No searchable id")
        }
        if(mood=="post"){
            const reviews= await reviewModel.aggregate([
                {
                    $lookup: {
                      from: "reviewreports",
                      localField: "_id",
                      foreignField: "review_id",
                      as: "reports",
                    },
                  }])
                  const reviewsPopulate = await reviewModel.populate(reviews,{path:"user_id"})
            const review = reviewsPopulate.filter(e=>e.post_id==id); 
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


module.exports = { /* getDownloads, */ createDownload,/*  updateDownload, deleteDownload, getDownload */ }