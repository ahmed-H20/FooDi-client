import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import useCart from "../../hooks/useCart";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { user } = useContext(AuthContext);
  const [cart, refetch] = useCart();
  const [cartItems, setCartItems] = useState([]);

  // Calculate price
  const calculatePrice = (item) => {
    return item.price * item.quantity;
  };

  // Decrease quantity
  const handleDecrease = (item) => {
    if (item.quantity > 1){
    fetch(`http://localhost:6002/carts/${item._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ quantity: item.quantity - 1 }),
    })
      .then((res) => res.json())
      .then((data) => {
        const updatedCart = cartItems.map((cartItem) => {
          if (cartItem === item._id) {
            return {
              ...cartItem,
              quantity: cartItem.quantity - 1,
            };
          }
          return cartItems;
        });
        refetch();
        setCartItems(updatedCart);
      });
    }
  };

  // Increase quantity
  const handleIncrease = (item) => {
    fetch(`http://localhost:6002/carts/${item._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ quantity: item.quantity + 1 }),
    })
      .then((res) => res.json())
      .then((data) => {
        const updatedCart = cartItems.map((cartItem) => {
          if (cartItem === item._id) {
            return {
              ...cartItem,
              quantity: cartItem.quantity + 1,
            };
          }
          return cartItems;
        });
        refetch();
        setCartItems(updatedCart);
      });
  };
  // Calculate total prise
  const cartSubTotal = cart.reduce((total, item) => {
    return total + calculatePrice(item);
  }, 0);

  // Delete Item
  const handledeleteItem = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:6002/carts/${item._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          });
      }
    });
  };

  return (
    <div className="section-container">
      {cart.length > 0 ? (
        <div>
          {/* Banner */}
          <div className="bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
            <div className="py-48 flex flex-col justify-center items-center gap-8">
              {/* Text side */}
              <div className="text-center space-y-7">
                <h2 className="md:text-5xl text-4xl font-bold leading-sung">
                  Items Added to The <span className="text-green">Cart</span>
                </h2>
              </div>
            </div>
          </div>
          {/* Table of items */}
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead className="bg-green text-white ">
                <tr>
                  <th>#</th>
                  <th>Food</th>
                  <th>Item Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* rows */}
                {cart.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle h-12 w-12">
                              <img src={item.image} alt="" />
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>{item.name}</td>
                      <td>
                        <button
                          className="btn btn-xs"
                          onClick={() => {
                            handleDecrease(item);
                          }}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={() => console.log(item.quantity)}
                          className="w-10 mx-2 text-center overflow-hidden appearance-none"
                        />
                        <button
                          className="btn btn-xs"
                          onClick={() => {
                            handleIncrease(item);
                          }}
                        >
                          +
                        </button>
                      </td>
                      <td>{calculatePrice(item)}</td>
                      <th>
                        <button
                          className="btn btn-ghost btn-xs text-red"
                          onClick={() => {
                            handledeleteItem(item);
                          }}
                        >
                          <FaTrash />
                        </button>
                      </th>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {/* customer details */}
          <div className="my-12 flex flex-col md:flex-row justify-between items-start">
            <div className="md:w-1/2 space-y-3">
              <h3 className="font-medium">Customer Details</h3>
              <p>Name: {user.displayName}</p>
              <p>Email: {user.email}</p>
            </div>
            <div className="md:w-1/2 space-y-3">
              <h3 className="font-medium">Shopping Details</h3>
              <p>Total Items: {cart.length}</p>
              <p>Total Price: ${cartSubTotal.toFixed(2)}</p>
              <Link to="/checkout-process">
                <button className="btn bg-green text-white">
                  Process Checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen">
          {/* Banner */}
          <div>
            <div className="py-48 flex flex-col justify-center items-center gap-8">
              {/* Text side */}
              <div className="text-center space-y-7">
                <h2 className="md:text-5xl text-4xl font-bold leading-sung">
                  No items in the <span className="text-green">Cart</span>
                </h2>
              </div>
              <div className="m-10">
                <Link to="/menu">
                  <button className="btn bg-green text-white">
                    Go TO Menu
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
