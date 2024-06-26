const Category = require('../models/categorySchema');
const Brand = require("../models/brandSchema")
const Product = require("../models/productSchema")
const Varient = require("../models/varientSchema")
const Colors = require("../models/colorShema")
const Sizes = require('../models/sizeSchema')
const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types;
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

    let products = await Product.aggregate([
        {$match:{isDeleted:false}},
        {
            $lookup: {
                from: 'variants', // Ensure this matches the actual collection name
                localField: 'variants',
                foreignField: '_id',
                as: 'variants'
            }
        }
    ]);
        
         products.forEach((x)=>{
            console.log(x.variants[0].images[0]) 
         })


   
    res.render('admin/listproducts',{products:products})
}

//get add products

const getAddProducts = async(req,res)=>{
    let category = await Category.find({isDeleted:false})
    let brands = await Brand.find({isDeleted:false})
    let colors = await Colors.find({isDeleted:false})
    let sizes = await Sizes.find({isDeleted:false})
    res.render('admin/addproducts',{categories:category,brands:brands,colors:colors,sizes:sizes})
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

//get colors

const getColors = async  (req,res)=>{

    const colors = await Colors.find({isDeleted:false})
    // console.log(colors);
    res.render("admin/colors",{colors:colors})
}

//get add colors

const getAddNewColors = async (req,res)=>{
    res.render('admin/addcolors');
}


//add new color

const addNewColor = async (req,res)=>{
    let color = req.body.color;
    let hexacode = req.body.hexacode

    let isExists = await Colors.findOne({color_name:color})
    if(isExists){
       return res.render('admin/addcolors',{err:"entered color already exists"})
    }else{
        let newColor = await Colors.create({
            color_name: color,
            color_code: hexacode,
            isDeleted:false
        })
        // console.log(newColor);
       return res.redirect("/admin/products/colors")
    }
}

//delte colors

const deleteColor =async (req,res)=>{
    let colorId = req.query.clrId

    let deletedColor = await Colors.findOneAndUpdate(
        {_id:colorId},
        {
            $set:{
                isDeleted:true
            }
        }
    )

    console.log("deletedclr is",deletedColor)

    if(deletedColor){
        res.status(200).send("color deleted suceessfully....")
    }
}

//get deleted colors

const deletedColors = async(req,res)=>{
    let deletedClrs= await Colors.find({isDeleted:true})
    res.render('admin/deletedcolors',{colors:deletedClrs})
}

//getSizes

const getSizes = async  (req,res)=>{
    const size = await Sizes.find({isDeleted:false})
    // console.log(colors);
    res.render("admin/sizes",{sizes:size})
}


//get add sizes

const getAddSizes = (req,res)=>{
    res.render('admin/addsizes')
}

//add sizes

const addSizes = async(req,res)=>{
    let size = req.body.size

    let addedSize = await Sizes.create(
        {
            sizeName:size,
            isDeleted:false
        }
    )

    console.log(addedSize)
    res.redirect('/admin/products/sizes')
}



//edit brand

async function editBrand(req, res) {
    let brandId = req.params.brandId;
    let newBrand = req.body.brand;
    if (brandId) {
        let editedbrand = await Brand.findOneAndUpdate(
            { _id: brandId },
            {
                $set: {
                    brandname: newBrand
                }
            }
        );
        if (editedbrand) {
            res.redirect('/admin/products/brands');
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

const addProductVariant = async(req,res)=>{

 try {
    const { pId, color, price, stock } = req.body


    //  const parsedStock = JSON.parse(stock);
    // console.log(req.body.pId)
    // console.log(JSON.stringify(stock))
console.log(stock)
// Parse the stock JSON string back to an array of objects
const parsedStock = JSON.parse(stock);

// console.log(req.body.pId)
console.log(JSON.stringify(parsedStock));

    const file1 = req.files[0].filename
    const file2 = req.files[1].filename
    const file3 = req.files[2].filename
    console.log(file3);

    let newVariant = await Varient.create(
        {
            productId: pId,
            colors: color,
            price: price,
            stock: parsedStock,
            images: [file1, file2, file3]
        }
    )
    console.log(newVariant);

    const updatedProduct = await Product.findOneAndUpdate(
        { _id: pId },
        { $push: { variants: newVariant._id }, $set: { isVariantAvailable: true } },
        { new: true }
    );
     console.log(updatedProduct)


} catch (err) {
    console.error("error", err);
    res.status(500).json({ msg: " sever error", type: "error" })
}

}


//getproductview

const getProductview = async(req,res)=>{
    const id = req.params.id
    let product = await Product.aggregate([
       
       {$match:{_id:new ObjectId(id)}},
       {
        $lookup: {
            from: 'variants', // Ensure this matches the actual collection name
            localField: 'variants',
            foreignField: '_id',
            as: 'variants'
        }
    }
  

    ]);

    console.log(product)


   res.render('admin/productdetailedview',{product:product})
}

//unlist product

const unlistProduct = async(req,res)=>{
    let id = req.query.pId

    try{
        let unlistedProduct = await Product.findOneAndUpdate(
            {_id:id},
            {
                $set:{
                    isDeleted:true
                }
            }
        )

        if(unlistedProduct){
            res.status(200).send("product unlisted sucessfully");
        }
    }catch(err){
        throw new Error('error on product unlist ')
    }
}

//get unlisted products

const getUnlistedProducts =async (req,res)=>{
    let products = await Product.aggregate([
        {$match:{isDeleted:true}},
        {
            $lookup: {
                from: 'variants', // Ensure this matches the actual collection name
                localField: 'variants',
                foreignField: '_id',
                as: 'variants'
            }
        }
    ]);
        
         products.forEach((x)=>{
            console.log(x.variants[0].images[0]) 
         })


   
    res.render('admin/unlistedproducts',{products:products})
}

//restore product

const restoreProduct = async(req,res)=>{
    let id = req.query.pId

    try{
        let unlistedProduct = await Product.findOneAndUpdate(
            {_id:id},
            {
                $set:{
                    isDeleted:false
                }
            }
        )

        if(unlistedProduct){
            res.status(200).send("product restored sucessfully");
        }
    }catch(err){
        throw new Error('error on product restore ')
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
    editBrand,
    addProducts,
    addProductVariant,
    getColors,
    getAddNewColors,
    addNewColor,
    deleteColor,
    deletedColors,
    getSizes,
    getAddSizes,
    addSizes,
    getProductview,
    unlistProduct,
    getUnlistedProducts,
    restoreProduct
}