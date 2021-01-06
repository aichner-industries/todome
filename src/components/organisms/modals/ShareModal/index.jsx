//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
//> Unique ID
import short from "short-uuid";
//> Copy to clipboard
import copy from "copy-to-clipboard";
//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBIcon,
  MDBFormInline,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdbreact";
//#endregion

//#region > Config
const BASE_URL = "https://todo.inspiremedia.at/share/";
//#endregion

//#region > Components
class ModalPage extends React.Component {
  state = {};

  componentDidMount = () => {
    this.setState({
      share_token: localStorage.getItem("share_token")
        ? localStorage.getItem("share_token")
        : null,
    });
  };

  createLink = () => {
    const translator = short();
    const uuid = translator.new();

    this.setState(
      {
        share_token: uuid,
      },
      () => {
        if (!localStorage.getItem("share_token")) {
          localStorage.setItem("share_token", uuid);
        }
      }
    );
  };

  copyLink = () => {
    this.setState(
      {
        copied: true,
      },
      () => {
        copy(BASE_URL + this.state.share_token);
      }
    );
  };

  render() {
    const { share_token } = this.state;

    return (
      <MDBModal
        isOpen={true}
        toggle={this.props.toggle}
        className="share-modal"
      >
        <MDBModalBody className="text-center py-4">
          <h2>Share & Collaborate</h2>
          <p className="text-muted">
            By sharing this link, you give permission to everybody in procession
            of the link to view and alter your tasks.
          </p>
          {!share_token ? (
            <MDBBtn color="blue" onClick={this.createLink}>
              Create link
            </MDBBtn>
          ) : (
            <>
              <MDBInput
                type="text"
                value={BASE_URL + this.state.share_token}
                size="sm"
                className="text-center"
                containerClass="mb-2"
                disabled
              />
              <MDBBtn
                color={this.state.copied ? "success" : "blue"}
                size="md"
                disabled={this.state.copied}
                onClick={this.copyLink}
              >
                {this.state.copied ? (
                  <>
                    <MDBIcon far icon="check-circle" />
                    Copied
                  </>
                ) : (
                  <>
                    <MDBIcon far icon="copy" />
                    Copy link
                  </>
                )}
              </MDBBtn>
            </>
          )}
        </MDBModalBody>
      </MDBModal>
    );
  }
}
//#endregion

//#region > Exports
export default ModalPage;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2021 Christian Aichner
 */
