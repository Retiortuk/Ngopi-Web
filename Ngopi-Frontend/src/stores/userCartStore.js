import { create } from "zustand";

const getInitialCart = () => {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
};

export const userCartStore = create((set) => ({
    cart: getInitialCart(),

    addToCart: (product) => {
        set((state) => {
            const existingProduct =  state.cart.find((item) => item._id === product._id);
            let updatedCart

            if(existingProduct) {
                updatedCart = state.cart.map((item)=> item._id === product._id ? {...item, quantity: (item.quantity || 1) + 1} : item);
            } else {
                updatedCart = [...state.cart, {...product, quantity : 1}];
            }
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            return { cart : updatedCart}
        });
    },

    removeFromCart: (product) => {
        set((state) => {
            const existingProduct = state.cart.find((item) => item._id === product._id);
            let updatedCart;

            if(!existingProduct) { //jika memang cart sudah kosong
                return state;
            }

            if(existingProduct.quantity === 1) {
                updatedCart =  state.cart.filter((item) => item._id !== product._id);
            } else {
                updatedCart = state.cart.map((item) => item._id === product._id ? {...item, quantity: item.quantity - 1 }: item)
            }
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            return { cart: updatedCart};
        });
    },
    
    clearItemFromCart: (product) => {
        set((state)=> {
            const updatedCart =  state.cart.filter((item) => item._id !== product._id);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            return {cart: updatedCart}
        })
    }
}));

