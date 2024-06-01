import { apiSlice } from "../../apiSlice";
import { app } from '../../../services/api/endPoints'
const mq_keyword = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        Categorys: build.query({
            query: () => ({
                url: app.keywords.get_GridCategorys,
                method: 'POST',
                data: ''
            }),
            providesTags: ['categorys']
        }),
        categorySave: build.mutation({
            query: ({ data }) => ({
                url: app.keywords.app_CategorySave,
                method: 'POST',
                data: data
            }),
            invalidatesTags: ['categorys'],
            // async onQueryStarted(args,{queryFulfilled,dispatch}){
            //     const res=  dispatch(apiSlice.util.updateQueryData("Categorys",undefined,(draft)=>{
            //         draft["data"].data.push(args.data);
            //     }))
            //     console.log('draft:',res)

            //     try {
            //         await queryFulfilled;
            //         // const {data:categoryData}=await queryFulfilled;
            //         // console.log('draft:',categoryData);
            //         // console.log('args:',args)
                 
            //     } catch (error) {
            //         res.undo()
            //     }
            // }
        }),
        openCategory: build.mutation({
            query: ({ data }) => ({
                url: app.keywords.app_OpenCategory,
                method: 'POST',
                data: data
            })
        }),
        // Brand
        getGridBrands: build.query({
            query: () => ({
                url: app.keywords.get_GridBrands,
                method: 'POST',
                data: ''
            }),
            providesTags: ['brands']
        }),
        brandSave: build.mutation({
            query: ({ data }) => ({
                url: app.keywords.app_BrandSave,
                method: 'POST',
                data: data
            }),
            invalidatesTags: ['brands']
        }),
        openBrand: build.mutation({
            query: ({ data }) => ({
                url: app.keywords.app_OpenBrand,
                method: 'POST',
                data: data
            })
        }),

        // Size
        Sizes: build.query({
            query: () => ({
                url: app.keywords.get_GridSizes,
                method: 'POST',
                data: ''
            }),
            providesTags: ['sizes']
        }),
        sizeSave: build.mutation({
            query: ({ data }) => ({
                url: app.keywords.app_SizeSave,
                method: 'POST',
                data: data
            }),
            invalidatesTags: ['sizes'],
            // async onQueryStarted(args,{queryFulfilled,dispatch}){
            //     const res=  dispatch(apiSlice.util.updateQueryData("Categorys",undefined,(draft)=>{
            //         draft["data"].data.push(args.data);
            //     }))
            //     console.log('draft:',res)

            //     try {
            //         await queryFulfilled;
            //         // const {data:categoryData}=await queryFulfilled;
            //         // console.log('draft:',categoryData);
            //         // console.log('args:',args)
                 
            //     } catch (error) {
            //         res.undo()
            //     }
            // }
        }),
        openSize: build.mutation({
            query: ({ data }) => ({
                url: app.keywords.app_OpenSize,
                method: 'POST',
                data: data
            })
        }),
    })

})

export const {
    useCategorysQuery,
    useOpenCategoryMutation,
    useCategorySaveMutation,
    useGetGridBrandsQuery,
    useOpenBrandMutation,
    useBrandSaveMutation,
    useSizesQuery,
    useOpenSizeMutation,
    useSizeSaveMutation
} = mq_keyword;
