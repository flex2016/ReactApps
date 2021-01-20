import React, { Component } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../../../Hoc/AdminLayout";
import { formatMoney } from "../../ui/misc";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import TablePagination from "@material-ui/core/TablePagination";

import { firebaseProperties, firebaseDB, firebase } from "../../../firebase";
import { firebaseLooper, reverseArray } from "../../ui/misc";

class AdminProperties extends Component {
  state = {
    isloading: true,
    properties: []
  };

  componentDidMount() {
    firebaseProperties.once("value").then(snapshot => {
      const properties = firebaseLooper(snapshot);

      this.setState({
        isloading: false,
        properties: reverseArray(properties)
      });
    });
  }
  deleteProperty(property) {
    firebaseDB
      .ref(`properties/${property.id}`)
      .remove()
      .then(() => {
        this.componentDidMount();
      })
      .catch(e => {
        console.log(e);
      });

    firebase
      .storage()
      .ref(`properties/${property.image}`)
      .delete()
      .then(() => {
        this.successForm("Deleted");
      })
      .catch(e => {
        console.log(e);
        // this.setState({ formError: true });
      });
    console.log(property.url);
  }

  render() {
    console.log(this.state.properties);
    return (
      <AdminLayout>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Location</TableCell>
                {/* <TableCell>Rooms</TableCell>
                <TableCell>Bathrooms</TableCell> */}
                <TableCell>Area</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.properties
                ? this.state.properties.map((property, i) => (
                    <TableRow key={property}>
                      <TableCell align="center">
                        <IconButton
                          className="delete__icon"
                          aria-label="delete"
                          color="secondary"
                        >
                          <DeleteIcon
                            fontSize="medium"
                            onClick={() => this.deleteProperty(property)}
                          />
                        </IconButton>
                      </TableCell>
                      <TableCell>{property.date}</TableCell>
                      <TableCell>
                        <Link
                          to={`/admin_properties/edit_property/${property.id}`}
                        >
                          {property.name}
                        </Link>
                      </TableCell>
                      <TableCell>
                        {property.address} {property.city}
                      </TableCell>
                      {/* <TableCell>{property.rooms}</TableCell>
                      <TableCell>{property.bathrooms}</TableCell> */}
                      <TableCell>
                        {property.area} m<sup>2</sup>
                      </TableCell>
                      <TableCell>${formatMoney(property.price)}</TableCell>
                      <TableCell>
                        {property.sold === "Yes" ? (
                          <span className="properties_tag_red">Sold</span>
                        ) : (
                          <span className="properties_tag_green">For Sale</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>
          {/* <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={this.state.properties.length}
            // rowsPerPage={rowsPerPage}
            // page={page}
            // onChangePage={handleChangePage}
            // onChangeRowsPerPage={handleChangeRowsPerPage}
          /> */}
        </TableContainer>
        <div className="admin_progress">
          {this.state.isloading ? (
            <CircularProgress
              size={60}
              thickness={7}
              style={{ color: "#c69963" }}
            />
          ) : (
            ""
          )}
        </div>
      </AdminLayout>
    );
  }
}

export default AdminProperties;
