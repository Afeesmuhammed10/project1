const Category = require('../models/categorySchema');
const Brand = require("../models/brandSchema")
const Product = require("../models/productSchema")
const Varient = require("../models/varientSchema")
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

const getAddProducts = async(req,res)=>{
    let category = await Category.find({isDeleted:false})
    let brands = await Brand.find({isDeleted:false})
    res.render('admin/addproducts',{categories:category,brands:brands})
}

//get brands

const getBrands =async(req,res)=> {
    let brands = await Brand.find({isDeleted:false});
    res.render('admin/brands',{brands:brands})
}

//get add new grands

const getAddBrands =async (req,res)=>{
   
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


//add products

const addProducts =async (req,res)=>{
    console.log(req.query.data);
    let obj = JSON.parse(req.query.data); 
    let product = await Product.create({
        productName:obj.pname,
        gender:obj.gender,
        category:obj.category,
        brand:obj.brand,
        size:obj.size,
        description:obj.disc,
        isDeleted:false

    })
    console.log(product)
    if(product){
        res.status(200).send(product._id);
    }
}

const addProductVariable = async(req,res)=>{
 console.log(req.files)
 console.log(req.body)
 const {color,productId,price,stock,size} = req.body

let images = req.files
console.log(images)


 let varient = await Varient.create(
    {
        color:color,
        productId:productId,
        price:price,
        size:size,
        stock:stock,
        images:[images.image1[0].filename,images.image2[0].filename,images.image3[0].filename]
    }
 )
console.log(varient)



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
    editBrand,
    addProducts,
    addProductVariable 
}