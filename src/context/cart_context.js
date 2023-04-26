import { createContext, useEffect, useReducer } from "react";
import { useContext } from "react";
import reducer from "../reducer/cartReducer";

const CartContext =createContext();

const getLocalCartData=()=>{
    let localCartData=localStorage.getItem("ecomCart");
    if(localCartData===[]){
        return []
    }
    else{
        return JSON.parse(localCartData);
    }
}

const initialState={
    // cart:[],
    cart:getLocalCartData(),
    total_item:"",
    total_amount:"",
    shipping_fee:5000,
};
const CartProvider=({children})=>{

    const[state,dispatch]=useReducer(reducer,initialState)
    
    const addToCart=(id,amount,product)=>{
        dispatch({type:"ADD_TO_CART",payload:{id,amount,product}})
    }

    const removeItem=(id)=>{
        dispatch({type:"REMOVE_ITEM",payload:id})
    }

    const clearCart=()=>{
        dispatch({type:"CLEAR_CART"});
    }

    const setDecrease=(id)=>{
        dispatch({type:"SET_DECREMENT",payload:id})
    }

    const setIncrease=(id)=>{
        dispatch({type:"SET_INCREMENT",payload:id})
    }

    useEffect(()=>{
        dispatch({type:"CART_ITEM_TOTAL"})
        dispatch({type:"CART_TOTAL_PRICE"})
        localStorage.setItem("ecomCart",JSON.stringify(state.cart));
    },[state.cart])
    
    
    return <CartContext.Provider value={{
        ...state,
    addToCart,
    removeItem,
    clearCart,
    setDecrease,
    setIncrease}}>
        {children}
    </CartContext.Provider>
}

const useCartContext=()=>{
    return useContext(CartContext);
}

export {CartProvider,useCartContext}

