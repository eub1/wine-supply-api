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
const SearchBar_1 = __importDefault(require("./winesRoutes/SearchBar"));
const Categories_1 = __importDefault(require("./winesRoutes/Categories"));
const SignupRoute_1 = __importDefault(require("./authRoutes/SignupRoute"));
const LoginRoute_1 = __importDefault(require("./authRoutes/LoginRoute"));
const GetUser_1 = __importDefault(require("./authRoutes/GetUser"));
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
const AdminStatusCheck_1 = __importDefault(require("./middlewares/AdminStatusCheck"));
const VerifyUserToken_1 = __importDefault(require("./middlewares/VerifyUserToken"));
const VerifyUserTokenPayment_1 = __importDefault(require("./middlewares/VerifyUserTokenPayment"));
const AdminStatus_1 = __importDefault(require("./middlewares/AdminStatus"));
/* ↓ payments ↓  */
const Payment_1 = __importDefault(require("./paymentRoutes/mercadopago/Payment"));
const PaymentSubscription_1 = __importDefault(require("./paymentRoutes/mercadopago/PaymentSubscription"));
const ShoppingOrderRoute_1 = __importDefault(require("./paymentRoutes/ShoppingOrderRoute"));
const GetOrders_1 = __importDefault(require("./paymentRoutes/GetOrders"));
/* ↓ admin ↓  */
const PostWine_js_1 = __importDefault(require("./adminRoutes/PostWine.js"));
const UpdateWine_1 = __importDefault(require("./adminRoutes/UpdateWine"));
const ReactAdminGetAllUsersJS_1 = __importDefault(require("./adminRoutes/UsersAdminRoutes/ReactAdminGetAllUsersJS"));
const UpdateAdmin_1 = __importDefault(require("./adminRoutes/UsersAdminRoutes/UpdateAdmin"));
const UpadteIsActive_1 = __importDefault(require("./adminRoutes/UsersAdminRoutes/UpadteIsActive"));
const StatsPerMonth_1 = __importDefault(require("./adminRoutes/Stats Routes/StatsPerMonth"));
const StatsPerWeek_1 = __importDefault(require("./adminRoutes/Stats Routes/StatsPerWeek"));
const GetWinesAdminJS_1 = __importDefault(require("./adminRoutes/WinesReactAdmin/GetWinesAdminJS"));
const DeleteWineAdmin_1 = __importDefault(require("./adminRoutes/WinesReactAdmin/DeleteWineAdmin"));
const GetReviewsReact_1 = __importDefault(require("./adminRoutes/React Admin Reviews/GetReviewsReact"));
const GetOrdersReact_1 = __importDefault(require("./adminRoutes/React Admin Orders/GetOrdersReact"));
const AdminUpdateOrderStatus_1 = __importDefault(require("./adminRoutes/React Admin Orders/AdminUpdateOrderStatus"));
const EditWineAdmin_1 = __importDefault(require("./adminRoutes/WinesReactAdmin/EditWineAdmin"));
const GetOneAdmin_1 = __importDefault(require("./adminRoutes/WinesReactAdmin/GetOneAdmin"));
const PostWineAdmin_1 = __importDefault(require("./adminRoutes/WinesReactAdmin/PostWineAdmin"));
const GetUserAdmin_1 = __importDefault(require("./adminRoutes/UsersAdminRoutes/GetUserAdmin"));
const EditUserAdmin_1 = __importDefault(require("./adminRoutes/UsersAdminRoutes/EditUserAdmin"));
const GetAllUsers_1 = __importDefault(require("./adminRoutes/UsersAdminRoutes/GetAllUsers"));
const WinePrices_1 = __importDefault(require("./adminRoutes/Stats Routes/WinePrices"));
const WineFields_1 = __importDefault(require("./adminRoutes/Stats Routes/WineFields"));
/* ↓ mails ↓  */
const NewsLetter_1 = __importDefault(require("./mailRoutes/NewsLetter"));
const ContactUsMail_1 = __importDefault(require("./mailRoutes/ContactUsMail"));
/* ↓ membership ↓  */
const MembershipOrderRoute_1 = __importDefault(require("./MembershipRoutes/MembershipOrderRoute"));
const UserMembership_1 = __importDefault(require("./MembershipRoutes/UserMembership"));
const UpdateMembership_1 = __importDefault(require("./MembershipRoutes/UpdateMembership"));
const GetMembership_1 = __importDefault(require("./MembershipRoutes/GetMembership"));
const router = (0, express_1.Router)();
router.use('/wines', AllWines_1.default);
router.use('/wines/filters', WinesFilters_1.default);
router.use('/wines/search', SearchBar_1.default);
router.use('/wines/categories', Categories_1.default);
router.use('/wines/recomendados', RecommendedWines_1.default);
router.use('/wine/', WineId_1.default);
//admin
router.use('/adminstatuscheck', AdminStatusCheck_1.default);
router.use('/admin/post', PostWine_js_1.default);
router.use('/admin/updatewine', UpdateWine_1.default);
router.use('/admin/users', AdminStatus_1.default, ReactAdminGetAllUsersJS_1.default); // GET
router.use('/admin/users', AdminStatus_1.default, GetUserAdmin_1.default); // GET ONE
router.use('/admin/users', AdminStatus_1.default, EditUserAdmin_1.default); // PUT
router.use('/admin/users/isAdmin', AdminStatus_1.default, UpdateAdmin_1.default);
router.use('/admin/users/isActive', AdminStatus_1.default, UpadteIsActive_1.default);
router.use('/admin/newusers', AdminStatus_1.default, GetAllUsers_1.default);
router.use('/admin/reviews', AdminStatus_1.default, GetReviewsReact_1.default);
router.use('/admin/orders', AdminStatus_1.default, GetOrdersReact_1.default);
router.use('/admin/orders', AdminStatus_1.default, AdminUpdateOrderStatus_1.default);
router.use('/admin/stats/permonth', AdminStatus_1.default, StatsPerMonth_1.default);
router.use('/admin/stats/perweek', AdminStatus_1.default, StatsPerWeek_1.default);
router.use('/admin/stats/wines/prices', AdminStatus_1.default, WinePrices_1.default);
router.use('/admin/stats/wines/fields', AdminStatus_1.default, WineFields_1.default);
router.use('/admin/wines', AdminStatus_1.default, GetWinesAdminJS_1.default); //GET
router.use('/admin/wines/', AdminStatus_1.default, GetOneAdmin_1.default); //GET ONE
router.use('/admin/wines', AdminStatus_1.default, DeleteWineAdmin_1.default); //DELETE
router.use('/admin/wines', AdminStatus_1.default, EditWineAdmin_1.default); //PUT
router.use('/admin/wines', AdminStatus_1.default, PostWineAdmin_1.default); //POST
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
//mail services
router.use('/newsletter', NewsLetter_1.default);
router.use('/contacusmail', ContactUsMail_1.default);
// membership
router.use('/membershipcreateorder', MembershipOrderRoute_1.default);
router.use('/membership', VerifyUserToken_1.default, UpdateMembership_1.default);
router.use('/membership', VerifyUserToken_1.default, GetMembership_1.default);
router.use('/user/membership', VerifyUserToken_1.default, UserMembership_1.default);
exports.default = router;
