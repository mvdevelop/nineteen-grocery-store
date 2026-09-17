import cartReducer, { addToCart, removeFromCart, clearCart } from './cartSlice';

describe('cartSlice', () => {
  const initialState = {
    items: [],
  };

  it('should return the initial state', () => {
    expect(cartReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should add a new item to the cart', () => {
    const produto = { id: 1, nome: 'Arroz', preco: 22.9, img: '/arroz.jpg' };
    const result = cartReducer(initialState, addToCart(produto));

    expect(result.items).toHaveLength(1);
    expect(result.items[0]).toEqual({ ...produto, quantidade: 1 });
  });

  it('should increment quantity when item already exists in cart', () => {
    const state = {
      items: [{ id: 1, nome: 'Arroz', preco: 22.9, img: '/arroz.jpg', quantidade: 1 }],
    };

    const produto = { id: 1, nome: 'Arroz', preco: 22.9, img: '/arroz.jpg' };
    const result = cartReducer(state, addToCart(produto));

    expect(result.items).toHaveLength(1);
    expect(result.items[0].quantidade).toBe(2);
  });

  it('should remove item from cart when quantity is 1', () => {
    const state = {
      items: [{ id: 1, nome: 'Arroz', preco: 22.9, img: '/arroz.jpg', quantidade: 1 }],
    };

    const result = cartReducer(state, removeFromCart(1));

    expect(result.items).toHaveLength(0);
  });

  it('should decrement quantity when item quantity is greater than 1', () => {
    const state = {
      items: [{ id: 1, nome: 'Arroz', preco: 22.9, img: '/arroz.jpg', quantidade: 3 }],
    };

    const result = cartReducer(state, removeFromCart(1));

    expect(result.items[0].quantidade).toBe(2);
  });

  it('should not decrement if item does not exist', () => {
    const state = { items: [] };
    const result = cartReducer(state, removeFromCart(999));

    expect(result.items).toHaveLength(0);
  });

  it('should clear the cart', () => {
    const state = {
      items: [{ id: 1, nome: 'Arroz', preco: 22.9, img: '/arroz.jpg', quantidade: 2 }],
    };

    const result = cartReducer(state, clearCart());

    expect(result.items).toHaveLength(0);
  });
});
