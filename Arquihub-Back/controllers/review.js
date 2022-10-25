const { reviewModel,postModel, usersModel } = require("../models")

const getReviews = async (req, res) => {
    try {
        const allReviews = await reviewModel.findAllData({})
        res.status(200).send(allReviews)

    } catch (error) {
        res.status(400).send("Cant find reviews")
    }
}

const createReview = async (req, res) => {
    try {
        const { value, comment, post_id, user_id} = req.body;
        if(!value, !comment, !post_id,!user_id){
            return res.status(400).send({error:"Missing required parameters"})
        }
        const allReviews =await reviewModel.find({})
        const reviews = allReviews.filter(e=>e.post_id==post_id);
        let suma = 0;
        console.log(value, comment, post_id, user_id)
         reviews.forEach(e=>{ suma = suma + (e.value?e.value:0)})
         suma = suma + value;
         const prom = suma/(reviews.length+1);
         console.log(suma, reviews.length+1);
        await postModel.findOneAndUpdate({_id:post_id},{rating:prom})
        const newReview = {value, comment, post_id, user_id} 
        console.log(newReview)
        await reviewModel.create(newReview)
        res.status(200).send(newReview)

    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const updateReview = async (req, res) => {
    try {
      
        const { id } = req.params;
        const { value, comment} = req.body;
        console.log(id,value,comment)
        await reviewModel.updateOne({_id:id}, {value:value,comment:comment, modify:true})
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

const deleteReview = async (req, res) => {
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


const getReview = async (req, res) => {
    try {
        const { id, mood } = req.params;

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
}


module.exports = { getReviews, createReview, updateReview, deleteReview, getReview }