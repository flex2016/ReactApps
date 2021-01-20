import React from "react";
import moment from "moment";

const UserHistoryBlock = (props) => {
  const renderBlocks = () =>
    props.menuItems
      ? props.menuItems.map((menuItem, i) => (
          <tr key={i}>
            <td>{moment(menuItem.dateOfPurchase).format("MM-DD-YYYY")}</td>
            <td>
              {menuItem.category} {menuItem.name}
            </td>
            <td>$ {menuItem.price}</td>
            <td>{menuItem.quantity}</td>
          </tr>
        ))
      : null;

  return (
    <div className="history_blocks">
      <table>
        <thead>
          <tr>
            <th>Date of purchase</th>
            <th>Menu Item</th>
            <th>Price paid</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>{renderBlocks()}</tbody>
      </table>
    </div>
  );
};

export default UserHistoryBlock;
