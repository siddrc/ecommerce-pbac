ecommerceApp.config(['$stateProvider', '$urlRouterProvider',
    function(stateProvider, urlRouterProvider) {
        urlRouterProvider.otherwise("/landingPage");
        stateProvider.state('landingPage', {
            url: "/landingPage",
            controller: 'landingPageController',
            templateUrl: "views/landingPage/landingPage.html"
        }).state('addPolicies', {
            url: "/addPolicies",
            controller: 'addPoliciesController',
            templateUrl: "views/policies/add.html"
        }).state('notPermitted', {
            url: "/notPermitted",
            controller: 'notPermittedController',
            templateUrl: "views/common/notPermitted.html"
        }).state('viewPolicies', {
            url: "/viewPolicies",
            controller: 'viewPoliciesController',
            templateUrl: "views/policies/view.html"
        }).state('updatePolicies', {
            url: "/updatePolicies",
            controller: 'updatePoliciesController',
            templateUrl: "views/policies/update.html"
        }).state('deletePolicies', {
            url: "/deletePolicies",
            controller: 'deletePoliciesController',
            templateUrl: "views/policies/delete.html"
        }).state('addAdminUsers', {
            url: "/addAdminUsers",
            controller: 'addAdminUsersController',
            templateUrl: "views/adminUsers/add.html"
        }).state('addCategories', {
            url: "/addCategories",
            controller: 'addCategoriesController',
            templateUrl: "views/categories/add.html"
        }).state('viewCategories', {
            url: "/viewCategories",
            controller: 'viewCategoriesController',
            templateUrl: "views/categories/view.html"
        }).state('updateCategories', {
            url: "/updateCategories",
            controller: 'updateCategoriesController',
            templateUrl: "views/categories/update.html"
        }).state('deleteCategories', {
            url: "/deleteCategories",
            controller: 'deleteCategoriesController',
            templateUrl: "views/categories/delete.html"
        }).state('addProducts', {
            url: "/addProducts",
            controller: 'addProductsController',
            templateUrl: "views/products/add.html"
        }).state('addProductImage', {
            url: "/addProductImage",
            controller: 'addProductImageController',
            templateUrl: "views/products/addProductImage.html",
            params: {
                targetProductId: "NA"
            }
        }).state('viewProducts', {
            url: "/viewProducts",
            controller: 'viewProductsController',
            templateUrl: "views/products/view.html"
        }).state('updateProducts', {
            url: "/updateProducts",
            controller: 'updateProductsController',
            templateUrl: "views/products/update.html"
        }).state('deleteProducts', {
            url: "/deleteProducts",
            controller: 'deleteProductsController',
            templateUrl: "views/products/delete.html"
        }).state('productCreated', {
            url: "/productCreated",
            controller: 'productCreatedController',
            templateUrl: "views/products/productCreated.html"
        }).state('customerSignup', {
            url: "/customerSignup",
            controller: 'customerSignupController',
            templateUrl: "views/customers/customerSignup.html"
        }).state('merchantSignup', {
            url: "/merchantSignup",
            controller: 'merchantSignupController',
            templateUrl: "views/merchants/merchantSignup.html"
        }).state('productDetails', {
            url: "/productDetails",
            controller: 'productDetailsController',
            templateUrl: "views/products/productDetails.html",
            params: {
                productId: 'NA'
            }
        }).state('orderPage', {
            url: '/orderPage',
            controller: 'orderPageController',
            templateUrl: "views/orders/view.html",
            params: {
                orderId: 'NA'
            }
        }).state('viewCustomers', {
            url: '/viewCustomers',
            controller: 'viewCustomersController',
            templateUrl: "views/customers/view.html"
        }).state('viewMerchants', {
            url: '/viewMerchants',
            controller: 'viewMerchantsController',
            templateUrl: "views/merchants/view.html"
        }).state("merchantLandingPage", {
            url: '/merchantLandingPage',
            controller: 'merchantLandingPageController',
            templateUrl: "views/merchants/landingPage.html"
        }).state("adminLandingPage", {
            url: '/adminLandingPage',
            controller: 'adminLandingPageController',
            templateUrl: "views/adminUsers/landingPage.html"
        }).state("productsAsPerCategory", {
            url: '/productsAsPerCategory',
            controller: 'productsAsPerCategoryController',
            templateUrl: "views/products/productsAsPerCategory.html",
            params: {
                category: "NA"
            }
        }).state("addMerchantProducts", {
            url: "/addMerchantProducts",
            controller: 'addMerchantProductsController',
            templateUrl: "views/merchants/products/add.html"
        }).state("viewMerchantProducts", {
            url: "/viewMerchantProducts",
            controller: 'viewMerchantProductsController',
            templateUrl: "views/merchants/products/view.html"
        }).state("merchantProductDetails", {
            url: "/merchantProductDetails",
            controller: 'merchantProductDetailsController',
            templateUrl: "views/merchants/products/merchantProductDetails.html",
            params: {
                productId: 'NA'
            }
        }).state("viewAdminUsers", {
            url: "/viewAdminUsers",
            controller: 'viewAdminUsersController',
            templateUrl: "views/adminUsers/view.html"
        }).state("deleteAdminUsers", {
            url: "/deleteAdminUsers",
            controller: 'deleteAdminUsersController',
            templateUrl: "views/adminUsers/delete.html"
        }).state("viewAllOrders", {
            url: "/viewAllOrders",
            controller: 'viewAllOrdersController',
            templateUrl: "views/orders/viewAll.html"
        }).state("deleteOrders", {
            url: "/deleteOrders",
            controller: 'deleteOrdersController',
            templateUrl: "views/orders/delete.html"
        }).state("viewOrder",{
            url: "/viewOrder",
            controller: 'viewOrderController',
            templateUrl: "views/orders/viewOrder.html",
            params:{
                orderId:""
            }
        }).state("logicalEnd",{
            url: "/logicalEnd",
            controller: 'logicalEndController',
            templateUrl: "views/logicalEnd.html"
        }).state("deleteMerchantProducts",{
            url: "/deleteMerchantProducts",
            controller: 'deleteMerchantProductsController',
            templateUrl: "views/merchants/products/deleteMerchantProducts.html"
        }).state("deleteMerchant",{
            url: "/deleteMerchant",
            controller: 'deleteMerchantController',
            templateUrl: "views/merchants/delete.html"
        }).state("deleteCustomers",{
            url: "/deleteCustomers",
            controller: 'deleteCustomerController',
            templateUrl: "views/customers/delete.html"
        });
    }
]);
