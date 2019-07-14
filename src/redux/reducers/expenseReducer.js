const initialState = {
    values: [],
    columns: [
      'Descrição',
      'Data',
      'Value',
      'Pago',
      ''
    ],
  };
  export const expenseReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'UPDATE_EXPENSES':
        return {
          ...state,
          values: action.value.map((doc) => ({ ...doc.data(), ...{ id: doc.id } }))
        };
      default:
        return state;
    }
  };