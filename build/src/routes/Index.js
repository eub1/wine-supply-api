"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AllWines_1 = __importDefault(require("./winesRoutes/AllWines"));
const WineId_1 = __importDefault(require("./winesRoutes/WineId"));
const WinesFilters_1 = __importDefault(require("./winesRoutes/WinesFilters"));
const RecommendedWines_1 = __importDefault(require("./winesRoutes/RecommendedWines"));
const PostWine_js_1 = __importDefault(require("./adminRoutes/PostWine.js"));
const SearchBar_1 = __importDefault(require("./winesRoutes/SearchBar"));
const Categories_1 = __importDefault(require("./winesRoutes/Categories"));
const SignupRoute_1 = __importDefault(require("./authRoutes/SignupRoute"));
const LoginRoute_1 = __importDefault(require("./authRoutes/LoginRoute"));
const GetUser_1 = __importDefault(require("./authRoutes/GetUser"));
const UpdateWine_1 = __importDefault(require("./adminRoutes/UpdateWine"));
const UpdateUserRoute_1 = __importDefault(require("./authRoutes/UpdateUserRoute"));
const GetAddresses_1 = __importDefault(require("./authRoutes/AddressRoutes/GetAddresses"));
const PostAddress_1 = __importDefault(require("./authRoutes/AddressRoutes/PostAddress"));
const UpdateAddress_1 = __importDefault(require("./authRoutes/AddressRoutes/UpdateAddress"));
const DeleteAddress_1 = __importDefault(require("./authRoutes/AddressRoutes/DeleteAddress"));
const GetUserReviews_1 = __importDefault(require("./reviewsRoutes/GetUserReviews"));
const GetWineReviews_1 = __importDefault(require("./reviewsRoutes/GetWineReviews"));
const UserReviewPost_1 = __importDefault(require("./reviewsRoutes/UserReviewPost"));
const DeleteReviews_1 = __importDefault(require("./reviewsRoutes/DeleteReviews"));
const UpdateReviews_1 = __importDefault(require("./reviewsRoutes/UpdateReviews"));
const GetCart_1 = __importDefault(require("./paymentRoutes/GetCart"));
const AddCartItem_1 = __importDefault(require("./paymentRoutes/AddCartItem"));
const DeleteItemCart_1 = __importDefault(require("./paymentRoutes/DeleteItemCart"));
/* ↓ middlewares ↓  */
const VerifyUserToken_1 = __importDefault(require("./middlewares/VerifyUserToken"));
const VerifyUserTokenPayment_1 = __importDefault(require("./middlewares/VerifyUserTokenPayment"));
/* ↓ payments ↓  */
const Payment_1 = __importDefault(require("./paymentRoutes/mercadopago/Payment"));
const PaymentSubscription_1 = __importDefault(require("./paymentRoutes/mercadopago/PaymentSubscription"));
const ShoppingOrderRoute_1 = __importDefault(require("./paymentRoutes/ShoppingOrderRoute"));
const GetOrders_1 = __importDefault(require("./paymentRoutes/GetOrders"));
const router = (0, express_1.Router)();
router.use('/wines', AllWines_1.default);
router.use('/wines/filters', WinesFilters_1.default);
router.use('/wines/search', SearchBar_1.default);
router.use('/wines/categories', Categories_1.default);
router.use('/wines/recomendados', RecommendedWines_1.default);
router.use('/wine/', WineId_1.default);
//admin
router.use('/admin/post', PostWine_js_1.default);
router.use('/admin/updatewine', UpdateWine_1.default);
//auth
router.use('/login', LoginRoute_1.default);
router.use('/signup', SignupRoute_1.default);
router.use('/getuser', VerifyUserToken_1.default, GetUser_1.default); /*<------ ejemplo de ruta verificada por middleware*/
router.use('/user/update', VerifyUserToken_1.default, UpdateUserRoute_1.default);
router.use('/address', VerifyUserToken_1.default, PostAddress_1.default);
router.use('/address', VerifyUserToken_1.default, GetAddresses_1.default);
router.use('/address', VerifyUserToken_1.default, UpdateAddress_1.default);
router.use('/address', VerifyUserToken_1.default, DeleteAddress_1.default);
//reviews
router.use('/getUserReviews', GetUserReviews_1.default);
router.use('/getWineReviews', GetWineReviews_1.default);
router.use('/postReviews', UserReviewPost_1.default);
router.use('/deleteReview', DeleteReviews_1.default);
router.use('/updateReviews', UpdateReviews_1.default);
//payments y cart
router.use('/payment', VerifyUserTokenPayment_1.default, Payment_1.default);
router.use('/paymentsubs', VerifyUserTokenPayment_1.default, PaymentSubscription_1.default);
router.use('/createorder', ShoppingOrderRoute_1.default);
router.use('/getcart', VerifyUserToken_1.default, GetCart_1.default);
router.use('/addcartitem', VerifyUserToken_1.default, AddCartItem_1.default);
router.use('/deletecartitem', VerifyUserToken_1.default, DeleteItemCart_1.default);
router.use('/getorders', VerifyUserToken_1.default, GetOrders_1.default);
exports.default = router;
