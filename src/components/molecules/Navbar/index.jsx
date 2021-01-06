//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";

//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavItem,
  MDBNavLink,
  MDBContainer,
  MDBIcon,
} from "mdbreact";

//> Components
import { ShareModal } from "../../organisms";

// React Logo
import { ReactComponent as Logo } from "../../../assets/logo.svg";
//#endregion

//#region > Components
class Navbar extends React.Component {
  state = {
    collapseID: "",
  };

  toggleCollapse = (collapseID) => () =>
    this.setState((prevState) => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : "",
    }));

  closeCollapse = (collapseID) => () => {
    window.scrollTo(0, 0);

    this.state.collapseID === collapseID && this.setState({ collapseID: "" });
  };

  render() {
    const overlay = (
      <div
        id="sidenav-overlay"
        style={{ backgroundColor: "transparent" }}
        onClick={this.toggleCollapse("mainNavbarCollapse")}
      />
    );
    const { collapseID } = this.state;

    return (
      <div>
        <MDBNavbar color="transparent" dark expand="md" fixed="top" scrolling>
          <MDBContainer className="py-3 py-sm-2">
            <MDBNavbarBrand href="/" className="py-0 font-weight-bold">
              <Logo />
              <strong className="align-middle">TodoMe</strong>
            </MDBNavbarBrand>
            <strong className="button d-sm-none d-block">
              <MDBIcon icon="share" />
              Share
            </strong>
            <MDBCollapse
              id="mainNavbarCollapse"
              isOpen={this.state.collapseID}
              navbar
            >
              <MDBNavbarNav right>
                <MDBNavItem>
                  <strong
                    className="button"
                    onClick={() => this.setState({ share: true })}
                  >
                    <MDBIcon icon="share" />
                    Share
                  </strong>
                </MDBNavItem>
                {/*<MDBNavItem>
                  <strong>Login</strong>
                </MDBNavItem>*/}
              </MDBNavbarNav>
            </MDBCollapse>
          </MDBContainer>
        </MDBNavbar>
        {collapseID && overlay}
        {this.state.share && (
          <ShareModal toggle={() => this.setState({ share: false })} />
        )}
      </div>
    );
  }
}
//#endregion

//#region > Exports
export default Navbar;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2021 Christian Aichner
 */
