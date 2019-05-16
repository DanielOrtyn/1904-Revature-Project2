import { SaleItem } from "../model/saleItem";

export const salesTypes = {
    UPDATE_DISPLAY_ITEM: 'UPDATE_DISPLAY_ITEM'
}

export const newSaleItem = (newSaleItem: SaleItem, history: any) => async (dispatch) => {
    try {
        dispatch({
            payload: {
                newSaleItem
            },
            type: salesTypes.UPDATE_DISPLAY_ITEM
        })
        history.push('/home');
    } catch (err) {
        console.log(err);
    }
}