module.exports={
    user:{
        user_login:'user/login',
        user_singup:'user/singup',
        user_logout:'user/logout',
        user_GetRoles:'user/getRoles',
        user_GridUsers:'user/getGridUsers',
        user_OpenUser:'user/openUser',
        user_SaveUser:'user/saveUser',
      
    },
    common:{
        com_delete:'common/com_delete',
        com_list:'common/com_list'
    },
    app:{
        customer:{
            app_gridCustomers:'app/getGridCustomers',
            app_customerSave:'app/customerSave',
            // app_openCustomer:'app/openCustomer'
        },
        // dailysale:{
        //     app_gridDailyEntries:'app/getGridDailyEntries',
        //     app_dailyEntriesSave:'app/dailyEntriesSave',
        //     app_dailyEntriesDelete:'app/dailyEntriesDelete'
        // },
        keywords:{
            get_GridCategorys:'app/getGridCategorys',
            app_CategorySave:'app/categorySave',
            app_OpenCategory:'app/openCategory',
            // Brand
            get_GridBrands:'app/getGridBrands',
            app_BrandSave:'app/brandSave',
            app_OpenBrand:'app/openBrand',
            // Size
            get_GridSizes:'app/getGridSizes',
            app_SizeSave:'app/sizeSave',
            app_OpenSize:'app/openSize',
        },
        getDashboard:'app/Dashboard'
    }
}