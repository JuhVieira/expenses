const initialState = {
    values: [],
    columns: [
        'Descrição',
        'Data',
        'Value',
        'Recebido',
        ''
      ]
  };
  export const revenueReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'UPDATE_REVENUE':
        return {
          ...state,
          values: action.value.map((doc) => ({ ...doc.data(), ...{ id: doc.id } }))
        };
      default:
        return state;
    }
  };