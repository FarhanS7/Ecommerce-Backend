import express from "express";
const router = express.Router();
import * as UsersController from "../app/controllers/UsersController.js";
import * as BrandController from "../app/controllers/BrandController.js";
import * as CartListController from "../app/controllers/CartListController.js";
import * as CategoryController from "../app/controllers/CategoryController.js";
import * as InvoiceController from "../app/controllers/InvoiceController.js";
import * as ProductController from "../app/controllers/ProductController.js";
import * as WishListController from "../app/controllers/WishListController.js";



// Users
router.post("/Login", UsersController.Login)
router.post("/VerifyLogin", UsersController.VerifyLogin)
router.post("/CreateUserProfile", UsersController.CreateUserProfile)
router.post("/UpdateUserProfile", UsersController.UpdateUserProfile)
router.post("/ReadUserProfile", UsersController.ReadUserProfile)


// Brands
router.post("/Login", BrandController.BrandList)


// Categories
router.post("/CategoryList", CategoryController.CategoryList)


// Cart
router.post("/CreateCart", CartListController.CreateCart)
router.post("/ReadCartList", CartListController.ReadCartList)
router.post("/UpdateCart", CartListController.UpdateCart)
router.post("/RemoveCart", CartListController.RemoveCart)


// Wish
router.post("/CreateWish", WishListController.CreateWish)
router.post("/ReadWishList", WishListController.ReadWishList)
router.post("/RemoveWish", WishListController.RemoveWish)


// Product
router.post("/ProductListBySlider",ProductController.ProductListBySlider)
router.post("/ProductListByCategory",ProductController.ProductListByCategory)
router.post("/ProductListByRemark",ProductController.ProductListByRemark)
router.post("/ProductListByBrand",ProductController.ProductListByBrand)
router.post("/ProductDetailsID",ProductController.ProductDetailsID)
router.post("/ProductListByKeyword",ProductController.ProductListByKeyword)
router.post("/ProductReviewListByID",ProductController.ProductReviewListByID)
router.post("/CreateProductReview",ProductController.CreateProductReview)


//Invoice
router.post("/CreateProductReview",InvoiceController.CreateInvoice)
router.post("/ReadInvoiceList",InvoiceController.ReadInvoiceList)
router.post("/ReadInvoiceDetails",InvoiceController.ReadInvoiceDetails)




export default router;


