const Category = require('../models/categorySchema');

//get shop page

const getShop=(req,res)=>{
    res.render('user/shop')
}

//add new category

const addnewcategory =async (req,res)=>{
    let category = req.body.category
    let isExist = await Category.findOne({categoryname:category})
    if(isExist){
        res.render('admin/addcategory',{err:"entered category is already exist"})
    }else{
        let newcategory = await Category.create({
            categoryname:category,
            isDeleted:false
        })
        console.log(newcategory)
        res.redirect('/admin/category')
    }
   
}

//delete category

const deletecategory = async(req,res)=>{
    let catId = req.query.catId

    if(catId){
        let deletecat = await Category.findOneAndUpdate(
            {_id:catId},
            {
                $set:{
                    isDeleted:true
                }
            }
        )

        if(deletecat){
            res.status(200).send("category deleted successfully")
        }
    }
}

//restore category

const restoreCat = async(req,res)=>{
    let catId = req.query.catId

    if(catId){
        let restorecat = await Category.findOneAndUpdate(
            {_id:catId},
            {
                $set:{
                    isDeleted:false
                }
            }
        )

        if(restorecat){
            res.status(200).send("category deleted successfully")
        }
    }
}

//get edit category

const getEditcat =async (req,res)=>{
    let catId = req.params.categoryId
    let category = await Category.findOne({_id:catId})
    res.render('admin/editcategory',{category:category})
}

//edit category

const editCat =async (req,res)=>{
    let catId = req.params.catId
    let catName = req.body.category
    console.log(catName)

    let alreadyExist = await Category.findOne({categoryname:catName})
    
    if(alreadyExist){
        res.render('admin/editcategory',{err:"entered category already exist"})
    }else{
        let category = await Category.findOneAndUpdate(
            {_id:catId},
            {
                $set:{
                    categoryname:catName
                }
            }
        )
        console.log(category)
        res.redirect('/admin/category')
    }

}

module.exports = {
    getShop,
    addnewcategory,
    deletecategory,
    restoreCat,
    getEditcat,
    editCat
}