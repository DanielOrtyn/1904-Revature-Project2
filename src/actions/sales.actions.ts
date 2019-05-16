import { SaleItem } from "../model/saleItem";

export const salesTypes = {
    UPDATE_DISPLAY_ITEM: 'UPDATE_DISPLAY_ITEM'
}

export const newSaleItem = (newSaleItem: SaleItem, history: any) => async (dispatch) => {
    try {
        await dispatch({
            payload: {
                newSaleItem
            },
            type: salesTypes.UPDATE_DISPLAY_ITEM
        })
        history.push('/sale-page');
    } catch (err) {
        console.log(err);
    }
}