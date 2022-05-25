import { SETS_ACTION } from "./Constants_ACTION";



export const reducer_Sets = (state: any, action: { type: any; payload: any; }) => {

    switch (action.type) {
        case SETS_ACTION.DROPZONE:
            return { ...state, dropzone: action.payload };

        case SETS_ACTION.DRAGGED_ITEM_INDEX:
            return { ...state, draggedItemIndex: action.payload };
        
        case SETS_ACTION.IN_YEARS_LIST:
            return { ...state, inYearsList: action.payload };

        default: return state;
    }
}

