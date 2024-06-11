const Category = require('../models/categorySchema');
const Brand = require("../models/brandSchema")

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

//get Products

const getProducts = async(req,res)=>{
    res.render('admin/listproducts')
}

//get add products

const getAddProducts = (req,res)=>{
    res.render('admin/addproducts')
}

//get brands

const getBrands =async(req,res)=> {
    let brands = await Brand.find({isDeleted:false});
    res.render('admin/brands',{brands:brands})
}

//get add new grands

const getAddBrands = (req,res)=>{
    res.render('admin/addnewbrands')
}

//get deleted brands

const getdeletedBrands =async (req,res)=>{

    let deletedBrands = await Brand.find({isDeleted:true})
    res.render('admin/deletedbrands',{brands:deletedBrands})
}

const getEditBrand = async (req,res)=>{
    let brandId = req.params.brandId
    console.log("brand id is ",brandId)
    if(brandId){
        let brand = await Brand.findOne({_id:brandId});
        res.render('admin/editbrand',{brand:brand})
    }
}

//edit brand

const editBrand = async(req,res)=>{
    let brandId = req.params.brandId;
    let newBrand = req.body.brand
    if(brandId){
        let editedbrand = await Brand.findOneAndUpdate(
            {_id:brandId},
            {
                $set:{
                    brandname:newBrand
                }
            }
        )
        if(editedbrand){
            res.redirect('/admin/products/brands')
        }
    }
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

//add new brand

const addNewBrand = (req,res)=>{
    let brand = req.body.brand

    if(brand){
        let newBrand = Brand.create(
            {
                brandname:brand,
                isDeleted:false
            }
        )
        console.log(newBrand)
        res.redirect('/admin/products/brands')
    }
} 

//delete Brand

const deleteBrand = async(req,res)=>{
    let brandId =req.query.brandId 

    if(brandId){
        let deleteBrand = await Brand.findOneAndUpdate(
            {_id:brandId},
            {
                $set:{
                    isDeleted:true
                }
            }
        )
        console.log(deleteBrand)
        res.send(200).status("brand deleted successfully")
    }
}

//restore brand 

const restoreBrand = async(req,res)=>{
    let brandId = req.query.brandId;
    if(brandId){
        let restoredBrand = await Brand.findOneAndUpdate(
            {_id:brandId},
            {
                $set:{
                    isDeleted:false
                }
            }
        )
        if(restoredBrand){
            res.send(200).status("successfully restored brand")
        }
    }
}

module.exports = {
    getShop,
    addnewcategory,
    deletecategory,
    restoreCat,
    getEditcat,
    editCat,
    getProducts,
    getAddProducts,
    getBrands,
    getAddBrands,
    addNewBrand,
    deleteBrand,
    getdeletedBrands,
    restoreBrand,
    getEditBrand,
    editBrand
}