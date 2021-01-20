import React from "react";

const UserMenuBlock = ({ menuItems, removeItem }) => {
  const renderCartImage = (images) => {
    if (images.length > 0) {
      return images[0].url;
    } else {
      return "/images/image_not_availble.png";
    }
  };

  const renderItems = () =>
    menuItems.cartDetail
      ? menuItems.cartDetail.map((menuItem) => (
          <div className="user_product_block" key={menuItem._id}>
            <div className="item">
              <div
                className="image"
                style={{
                  background: `url(${renderCartImage(
                    menuItem.images
                  )}) no-repeat`,
                }}
              ></div>
            </div>
            <div className="item">
              <h4>Name</h4>
              <div>{menuItem.name}</div>
            </div>
            <div className="item">
              <h4>Quantity</h4>
              <div>{menuItem.quantity}</div>
            </div>
            <div className="item">
              <h4>Price</h4>
              <div>$ {menuItem.price}</div>
            </div>
            <div className="item btn">
              <div
                className="cart_remove_btn"
                onClick={() => removeItem(menuItem._id)}
              >
                Remove
              </div>
            </div>
          </div>
        ))
      : null;

  return <div>{renderItems()}</div>;
};

export default UserMenuBlock;
