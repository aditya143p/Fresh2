// import React from 'react'
// import { useSelector } from 'react-redux'
// import { useState ,useEffect} from 'react'
// import { mycartdataredux } from './store/CartSlice'
// import cart from './cart.png'
// import './my_cart.css'
// const Cart = () => {
//       let [searchdata,setsearchdata]=useState([])
//       let data=useSelector((state)=>state.cart.items)
   

//         useEffect(()=>
//         {
//             setsearchdata(data)
         
//         },[data])
//   return <>
//   { console.log(searchdata)}
//   {
   
//    searchdata.length>=1 ? searchdata.map((element)=>
//     {
//          return <div className='col-5 col-md-3 data-col p-2 '>
//          <img src={element.image} className='mobile-img'></img>
//          <div className='mo-name'>{element.name}</div>
//          <div className='mobile-text'>
//                    <div>
//                      {element.name}
//                    </div>
//                    <div>
//                     price: {element.price}
//                    </div>
//                    <div>
//                      weight: {element.weight}
//                    </div>
//                  </div>
//          </div>
//     }): <> <div >
//            <div className='cart my-3'>
//             <img src={cart} className='cart-img '></img>
//             <div className='text-center fs-5'> Your cart is empty !!!</div>
//            </div>
//       </div></>
//   }
//   </>
// }

// export default Cart;
// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { incrementQuantity, decrementQuantity, removeFromCart } from './store/CartSlice';
// import cart from './cart.png'; // Cart icon image
// import './my_cart.css'; // Custom CSS for styling
// import Swal from 'sweetalert2'


// // or via CommonJS

// const Cart = () => {
//   const dispatch = useDispatch();
//   const [searchData, setSearchData] = useState([]);
//   const data = useSelector((state) => state.cart.items);
//   const total = useSelector((state) => state.cart.total);

//   let getmodel=()=>
//   {
   
// Swal.fire({
//   title: "save and proceed to pay",
//   showDenyButton: true,
//   showCancelButton: true,
//   confirmButtonText: "Save",
//   denyButtonText: `Don't save`
// }).then((result) => {
//   /* Read more about isConfirmed, isDenied below */
//   if (result.isConfirmed) {
         

//     Swal.fire("Saved!", "", "success");
//   } else if (result.isDenied) {
//     Swal.fire("Changes are not saved", "", "info");
//   }
// });
//   }

//   useEffect(() => {
//     setSearchData(data);
//   }, [data]);

//   // Handle quantity increment
//   const handleIncrement = (element) => {
//     dispatch(incrementQuantity({ name: element.name, price: element.price }));
//   };

//   // Handle quantity decrement
//   const handleDecrement = (element) => {
//     dispatch(decrementQuantity({ name: element.name, price: element.price }));
//   };

//   // Handle item removal
//   const handleRemove = (element) => {
//     dispatch(removeFromCart({ name: element.name, price: element.price }));
//   };

//   return (
//     <div className="cart-container">
//       <div className="product-list">
//         {searchData.length >= 1 ? (
//           searchData.map((element) => (
//             <div key={`${element.name}-${element.price}`} className="product-card">
//               <img src={element.image} className="product-img" alt={element.name} />
//               <div className="product-details">
//                 <div className="product-name">{element.name}</div>
//                 <div className="product-info">
//                   <div>₹{element.price}</div>
//                   <div>{element.weight}</div>
//                 </div>
//                 <div className="quantity-controls">
//                   <button onClick={() => handleDecrement(element)}>-</button>
//                   <span>{element.quantity}</span>
//                   <button onClick={() => handleIncrement(element)}>+</button>
//                 </div>
//                 <button className="remove-btn" onClick={() => handleRemove(element)}>
//                   Remove
//                 </button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="empty-cart">
//             <img src={cart} alt="Empty Cart" />
//             <div>Your cart is empty!</div>
//           </div>
//         )}
//       </div>

//       {/* Cart Summary Section */}
//       <div className="cart-sidebar">
//         <div className="sidebar-header">Cart Summary</div>
//         <div className="cart-items">
//           {searchData.length >= 1 && (
//             <>
//               <div className="total-price">Total: ₹{total}</div>
//               <button className="checkout-btn" onClick={getmodel}>Checkout</button>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;

// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { incrementQuantity, decrementQuantity, removeFromCart } from './store/CartSlice';
// import { allOders } from './store/oderSlice';
// import cart from './cart.png';
// import './my_cart.css';
// import Swal from 'sweetalert2';
// import { useNavigate } from 'react-router-dom';
// const Cart = () => {
//   const dispatch = useDispatch();
//   const navigate=useNavigate();
//   const [searchData, setSearchData] = useState([]);
//   const data = useSelector((state) => state.cart.items);
//   const total = useSelector((state) => state.cart.total);
//   let userdata= JSON.parse(localStorage.getItem('login'))
//   useEffect(() => {
//     setSearchData(data);
//   }, [data]);

//   const handleIncrement = (item) => {
//     dispatch(incrementQuantity({ name: item.name, price: item.price }));
//   };

//   const handleDecrement = (item) => {
//     dispatch(decrementQuantity({ name: item.name, price: item.price }));
//   };

//   const handleRemove = (item) => {
//     dispatch(removeFromCart({ name: item.name, price: item.price }));
//   };

//   const loadRazorpayScript = () => {
//     return new Promise((resolve) => {
//       const script = document.createElement('script');
//       script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);
//       document.body.appendChild(script);
//     });
//   };

//   const handleRazorpayCheckout = async () => {
//     const res = await loadRazorpayScript();
//     if (!res) {
//       alert('Razorpay SDK failed to load.');
//       return;
//     }

//     const orderResponse = await fetch('http://localhost:8088/orders', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ amount: total }),
//     });

//     const orderData = await orderResponse.json();
//     if (!orderData.success) {
//       alert('Failed to create order.');
//       return;
//     }

//     const options = {
//       key: 'rzp_test_NGk8LEATIRcMej', // Your Razorpay test key
//       amount: orderData.order.amount,
//       currency: orderData.order.currency,
//       name: 'Freshpick',
//       description: 'Thank you for shopping!',
//       order_id: orderData.order.id,
//       handler: async function (response) {
//         const verifyRes = await fetch('http://localhost:8088/verify', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(response),
//         });

//         const verifyData = await verifyRes.json();
//         if (verifyData.success) {
//           Swal.fire('Payment successful!', '', 'success');
//           console.log('Payment successful:', verifyData);
//           console.log('user by', searchData);
//           dispatch(allOders(searchData));
//          navigate('/myorder')
//         }  
//       },
//       prefill: {
//         name: userdata.name,
//         email: userdata.email,
//         contact: '9857547972',
//       },
//       theme: {
//         color: '#3399cc',
//       },
//     };

//     const rzp = new window.Razorpay(options);
//     rzp.open();
//   };

//   const getmodel = () => {
//     Swal.fire({
//       title: 'Save and proceed to pay?',
//       showDenyButton: true,
//       confirmButtonText: 'Pay Now',
//       denyButtonText: `Cancel`,
//     }).then((result) => {
//       if (result.isConfirmed) {
//         handleRazorpayCheckout();
//       }
//     });
//   };

//   return (
//     <div className="cart-container">
//       <div className="product-list">
//         {searchData.length >= 1 ? (
//           searchData.map((item) => (
//             <div key={`${item.name}-${item.price}`} className="product-card">
//               <img src={item.image} className="product-img" alt={item.name} />
//               <div className="product-details">
//                 <div className="product-name">{item.name}</div>
//                 <div className="product-info">
//                   <div>₹{item.price}</div>
//                   <div>{item.weight}</div>
//                 </div>
//                 <div className="quantity-controls">
//                   <button onClick={() => handleDecrement(item)}>-</button>
//                   <span>{item.quantity}</span>
//                   <button onClick={() => handleIncrement(item)}>+</button>
//                 </div>
//                 <button className="remove-btn" onClick={() => handleRemove(item)}>
//                   Remove
//                 </button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="empty-cart">
//             <img src={cart} alt="Empty Cart" />
//             <div>Your cart is empty!</div>
//           </div>
//         )}
//       </div>

//      {searchData.length >= 1 ? <div className="cart-sidebar">
//        <div className="sidebar-header">Cart Summary</div>
//        <div className="cart-items">
//          {searchData.length >= 1 && (
//            <>
//              <div className="total-price">Total: ₹{total}</div>
//              <button className="checkout-btn" onClick={getmodel}>
//                Checkout
//              </button>
//            </>
//          )}
//        </div>
//      </div> :null
//      }
//     </div>
//   );
// };

// export default Cart;

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { incrementQuantity, decrementQuantity, removeFromCart, clearCart } from './store/CartSlice';
import { allOders } from './store/oderSlice';
import cart from './cart.png';
import './my_cart.css';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state.cart.items);
  const total = useSelector((state) => state.cart.total);
  const [searchData, setSearchData] = useState([]);
  const userdata = JSON.parse(localStorage.getItem('login'));

  // Load from Redux and localStorage on mount
  useEffect(() => {
    if (data.length === 0) {
      const stored = JSON.parse(localStorage.getItem('cartItems'));
      if (stored) {
        setSearchData(stored);
      }
    } else {
      setSearchData(data);
    }
  }, [data]);

  // Persist to localStorage when cart changes
  useEffect(() => {
    if (data.length > 0) {
      localStorage.setItem('cartItems', JSON.stringify(data));
    } else {
      localStorage.removeItem('cartItems');
    }
  }, [data]);

  const handleIncrement = (item) => {
    dispatch(incrementQuantity({ name: item.name, price: item.price }));
  };

  const handleDecrement = (item) => {
    dispatch(decrementQuantity({ name: item.name, price: item.price }));
  };

  const handleRemove = (item) => {
    dispatch(removeFromCart({ name: item.name, price: item.price }));
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleRazorpayCheckout = async () => {
    const res = await loadRazorpayScript();
    if (!res) {
      alert('Razorpay SDK failed to load.');
      return;
    }

    const orderResponse = await fetch('https://freshpick.onrender.com/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: total }),
    });

    const orderData = await orderResponse.json();
    if (!orderData.success) {
      alert('Failed to create order.');
      return;
    }

    const options = {
      key: 'rzp_test_NGk8LEATIRcMej',
      amount: orderData.order.amount,
      currency: orderData.order.currency,
      name: 'Freshpick',
      description: 'Thank you for shopping!',
      order_id: orderData.order.id,
      handler: async function (response) {
        const verifyRes = await fetch('https://freshpick.onrender.com/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(response),
        });

        const verifyData = await verifyRes.json();
        if (verifyData.success) {
          Swal.fire('Payment successful!', '', 'success');
          dispatch(allOders(searchData));
          dispatch(clearCart()); // clear Redux cart
          localStorage.removeItem('cartItems'); // clear localStorage cart
          navigate('/myorder');
        }
      },
      prefill: {
        name: userdata?.name,
        email: userdata?.email,
        contact: '9857547972',
      },
      theme: {
        color: '#3399cc',
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const getmodel = () => {
    Swal.fire({
      title: 'Save and proceed to pay?',
      showDenyButton: true,
      confirmButtonText: 'Pay Now',
      denyButtonText: `Cancel`,
    }).then((result) => {
      if (result.isConfirmed) {
        handleRazorpayCheckout();
      }
    });
  };

  return (
    <div className="cart-container">
      <div className="product-list">
        {searchData.length >= 1 ? (
          searchData.map((item) => (
            <div key={`${item.name}-${item.price}`} className="product-card">
              <img src={item.image} className="product-img" alt={item.name} />
              <div className="product-details">
                <div className="product-name">{item.name}</div>
                <div className="product-info">
                  <div>₹{item.price}</div>
                  <div>{item.weight}</div>
                </div>
                <div className="quantity-controls">
                  <button onClick={() => handleDecrement(item)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleIncrement(item)}>+</button>
                </div>
                <button className="remove-btn" onClick={() => handleRemove(item)}>
                  Remove
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-cart">
            <img src={cart} alt="Empty Cart" />
            <div>Your cart is empty!</div>
          </div>
        )}
      </div>

      {searchData.length >= 1 ? (
        <div className="cart-sidebar">
          <div className="sidebar-header">Cart Summary</div>
          <div className="cart-items">
            <div className="total-price">Total: ₹{total}</div>
            <button className="checkout-btn" onClick={getmodel}>
              Checkout
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Cart;

