const initialState = {
    is_loading: false,
    is_loading_modal: false
};
export const defaultReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'IS_LOADING':
            return {
                ...state,
                is_loading: action.value
            };
        case 'IS_LOADING_MODAL':
            return {
                ...state,
                is_loading_modal: action.value
            };
        default:
            return state;
    }
};