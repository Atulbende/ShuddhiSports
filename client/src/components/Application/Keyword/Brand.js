import React, { useEffect, useState } from 'react'
import { useBrandSaveMutation, useGetGridBrandsQuery, useOpenBrandMutation } from '../../../rtk/app/keyword/mq_keyword'
import Grid from '../../common/dataTable/Grid';
import FormDialog from '../../common/form-dialog/FormDialog';
import TextFields from '../../common/text-field/TextFields';
import { root } from '../../../services/root/root';

export default function Brand() {
    const { data: brands, isLoading, isFetching } = useGetGridBrandsQuery();
    const [openBrand, { isLoading: isOpenBrandLoading, isSuccess }] = useOpenBrandMutation()
    const [BrandSave] = useBrandSaveMutation();
    const [isOpen, setIsOpen] = useState(false)
    const [Brand, setBrand] = useState({});
    const [isRequired, setIsRequired] = useState([]);
    const openDialog = (recordId) => {
        setIsOpen(true);
        root.form.load(openBrand, recordId, setBrand, setIsRequired);
    }
    const saveHandle = async () => {
        return await root.form.DialogSave(BrandSave, isRequired, Brand, setIsOpen);
    }
    const columns = [
        {
            title: 'Pid', data: 'Pid', render: (data, _) => {
                return '<p class="link-primary" >' + data.toString() + '0000000' + '</p>'
            }, 'visible': true
        },
        { title: 'Brand', data: 'BrandName', 'visible': true },
    ];
    const actions = [{ "title": 'New', "icon": 'fa fa-plus', "className": 'btn-1', "action": () => { openDialog({ Pid: -1 }); } }];
    const activity = 'com_delete';
    const tableName = 'brand'
    return (
        <>
            {!isLoading && !isFetching && <Grid id="brands" data={{ data: brands?.data?.data, columns: columns }} redirectTo={{ isDialog: true, fn: openDialog }} activity={activity} tableName={tableName} actions={actions}></Grid>}
            {!!isOpen &&
                <FormDialog title={'Brand'} size={'col-50 '} btnTitle='Save' confirmYes={saveHandle} confirmNo={() => { setIsOpen(false) }}>
                    <TextFields onChangeEvent={setBrand} val={Brand?.BrandName} label='Brand Name' id='BrandName' col='col-100' />
                </FormDialog>}
        </>
    )
}
