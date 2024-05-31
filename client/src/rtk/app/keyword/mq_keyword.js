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
            invalidatesTags: ['categorys']
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
            providesTags: ['categorys']
        }),
        brandSave: build.mutation({
            query: ({ data }) => ({
                url: app.keywords.app_BrandSave,
                method: 'POST',
                data: data
            }),
            invalidatesTags: ['categorys']
        }),
        openBrand: build.mutation({
            query: ({ data }) => ({
                url: app.keywords.app_OpenBrand,
                method: 'POST',
                data: data
            })
        })
    })

})

export const {
    useCategorysQuery,
    useOpenCategoryMutation,
    useCategorySaveMutation,
    useGetGridBrandsQuery,
    useOpenBrandMutation,
    useBrandSaveMutation
} = mq_keyword;
