//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";

//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import {
  MDBEdgeHeader,
  MDBFreeBird,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBCardBody,
  MDBIcon,
  MDBCard,
  MDBCardTitle,
  MDBCardImage,
  MDBCardText,
  MDBListGroup,
  MDBListGroupItem,
  MDBInput,
  MDBBtn,
} from "mdbreact";

//> Images
// Logo of MDB React
import MDBLogo from "../../../assets/mdb-react-small.png";
// Logo of Advertisement Agency Christian Aichner
import AgencyLogo from "../../../assets/agency-small.png";
// Image of someone coding
import Projects from "../../../assets/content/projects.jpg";

//> CSS
import "./HomePage.scss";
//#endregion

//#region > Components
class HomePage extends React.Component {
  state = {
    tasks: [],
    enterTask: "",
  };

  handleKeyDown = (e) => {
    if (e.key === "Enter" && this.state.enterTask) {
      this.setState({
        tasks: [
          ...this.state.tasks,
          {
            value: this.state.enterTask,
            timestamp: new Date().getTime(),
            checked: false,
          },
        ],
        enterChecked: false,
        enterTask: "",
      });
    }
  };

  render() {
    return (
      <>
        <MDBEdgeHeader color="bg-blue" className="sectionPage" />
        <div className="mt-3 mb-5">
          <MDBFreeBird>
            <MDBRow>
              <MDBCol
                md="10"
                className="mx-auto float-none white py-2 px-2 border"
              >
                <MDBCardBody className="text-center">
                  <h2 className="h2-responsive mb-4 font-weight-bold">
                    Enhance your workflows
                  </h2>
                  <MDBListGroup>
                    <MDBListGroupItem>
                      <div className="main-container">
                        <div>
                          <MDBInput
                            type="checkbox"
                            size="lg"
                            checked={this.state.enterChecked}
                            onClick={(e) =>
                              this.setState({ test: e.target.enterChecked })
                            }
                            id="enterChecked"
                          />
                        </div>
                        <div className="d-flex">
                          <MDBInput
                            type="text"
                            value={this.state.enterTask}
                            getValue={(val) =>
                              this.setState({ enterTask: val })
                            }
                            onKeyDown={this.handleKeyDown}
                          />
                        </div>
                      </div>
                      {this.state.enterTask && (
                        <div className="text-right">
                          <p className="mb-0 small text-muted">
                            Press ENTER to add task
                          </p>
                        </div>
                      )}
                    </MDBListGroupItem>
                    {this.state.tasks.length > 0 && (
                      <p className="font-weight-bold text-left mb-0">
                        Open tasks
                      </p>
                    )}
                    {this.state.tasks.reverse().map((task, t) => {
                      return (
                        <MDBListGroupItem>
                          <div className="main-container">
                            <div>
                              <MDBInput
                                type="checkbox"
                                size="lg"
                                checked={this.state.enterChecked}
                                onClick={(e) =>
                                  this.setState({ test: e.target.enterChecked })
                                }
                                id="enterChecked"
                              />
                            </div>
                            <div className="d-flex">
                              <MDBInput
                                type="text"
                                value={task.value}
                                onKeyDown={this.handleKeyDown}
                              />
                            </div>
                          </div>
                        </MDBListGroupItem>
                      );
                    })}
                  </MDBListGroup>
                </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </MDBFreeBird>
          <MDBContainer>
            <MDBRow>
              <MDBCol md="12" className="mt-4">
                <h2 className="text-center my-5 font-weight-bold">
                  Share. Collaborate. Build.
                </h2>
                <p className="text-center text-muted mb-1">
                  Google has designed a Material Design to make the web more
                  beautiful and more user-friendly.
                </p>
                <p className="text-center text-muted mb-1">
                  Twitter has created a Bootstrap to support you in faster and
                  easier development of responsive and effective websites.
                </p>
                <p className="text-center text-muted">
                  We present you a framework containing the best features of
                  both of them - Material Design for Bootstrap.
                </p>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
      </>
    );
  }
}
//#endregion

//#region > Exports
export default HomePage;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Werbeagentur Christian Aichner
 */
