// The first parameter always represents the current state
export default function cartReducer(cart, action) {
  switch (action.type) {
    case 'empty':
      return []
    case 'add': {
      const { id, sku } = action.payload
      const itemInCart = cart.find((item) => {
        return item.sku === sku
      })

      if (itemInCart) {
        return cart.map((item) =>
          item.sku === sku
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        )
      } else {
        // Return a new array with new item appended
        return [
          ...cart,
          {
            id,
            sku,
            quantity: 1,
          },
        ]
      }
    }
    case 'updateQuantity': {
      const { quantity, sku } = action.payload
      return quantity === 0
        ? cart.filter((item) => item.sku !== sku)
        : cart.map((item) =>
            item.sku === sku
              ? {
                  ...item,
                  quantity,
                }
              : item
          )
    }
    default:
      throw Error('Unhadled action ' + action.type)
  }
}
