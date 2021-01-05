//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
//> Unique ID
import { v4 } from "uuid";
//> Sound
import UIfx from "uifx";

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
  MDBCollapse,
  MDBCollapseHeader,
} from "mdbreact";

//> SFX
import soundOne from "../../../assets/sfx/1.mp3";

//> CSS
import "./HomePage.scss";
//#endregion

//#region > Functions
const saveToLS = (tasks) => {
  if (tasks) {
    const taskJSON = JSON.stringify(tasks);

    localStorage.setItem("tasks", taskJSON);
  }
};

const rememberOpen = (type, value) => {
  if (type) {
    localStorage.setItem(type, value);
  }
};
//#endregion

//#region > Components
class HomePage extends React.Component {
  state = {
    tasks: [],
    tempDone: [],
    enterTask: "",
    showOpen: true,
  };

  componentDidMount = () => {
    const savedTasks = localStorage.getItem("tasks");
    const showDone = localStorage.getItem("show_done");

    console.log(showDone);

    if (savedTasks) {
      const tasks = JSON.parse(savedTasks);

      this.setState({
        tasks,
        showDone: showDone === "true" ? true : false,
      });
    }
  };

  componentDidUpdate = (prevState) => {
    if (prevState.tasks !== this.state.tasks) {
      saveToLS(this.state.tasks);
    }

    if (prevState.showDone !== this.state.showDone) {
      rememberOpen("show_done", this.state.showDone);
    }
  };

  toggleCollapse = (collapseID) => {
    if (collapseID === "open") {
      this.setState({ showOpen: !this.state.showOpen });
    } else if (collapseID === "done") {
      this.setState({ showDone: !this.state.showDone });
    }
  };

  handleKeyDown = (e, uuid) => {
    if (e.key === "Enter" && this.state.enterTask && !uuid) {
      const ts = new Date().getTime();

      this.setState({
        tasks: [
          ...this.state.tasks,
          {
            value: this.state.enterTask,
            created: ts,
            altered: ts,
            done: false,
            uuid: v4(),
          },
        ],
        enterChecked: false,
        enterTask: "",
      });
    } else if (e.key === "Delete" && uuid) {
      const { tasks } = this.state;

      const otherTasks = tasks.filter((task) => task.uuid !== uuid);

      this.setState({
        tasks: [...otherTasks],
      });
    } else if (e.key === "Enter" && uuid) {
      this.saveTask(uuid);
    }
  };

  finishTask = (uuid) => {
    if (uuid) {
      const { tasks } = this.state;

      this.playSound();

      const otherTasks = tasks.filter((task) => task.uuid !== uuid);
      const selectedTask = tasks.filter((task) => task.uuid === uuid)[0];

      if (selectedTask) {
        const alteredTask = {
          ...selectedTask,
          done: true,
          altered: new Date().getTime(),
        };

        this.setState(
          {
            tempDone: [...this.state.tempDone, uuid],
            showDone: true,
          },
          () => {
            setTimeout(() => {
              const otherTempDone = this.state.tempDone.filter(
                (task) => task !== uuid
              );

              this.setState({
                tasks: [...otherTasks, alteredTask],
                tempDone: [...otherTempDone],
              });
            }, 250);
          }
        );
      }
    }
  };

  openTask = (uuid) => {
    if (uuid) {
      const { tasks } = this.state;

      const otherTasks = tasks.filter((task) => task.uuid !== uuid);
      const selectedTask = tasks.filter((task) => task.uuid === uuid)[0];

      if (selectedTask) {
        const alteredTask = {
          ...selectedTask,
          done: false,
          altered: new Date().getTime(),
        };

        this.setState({
          tasks: [...otherTasks, alteredTask],
        });
      }
    }
  };

  editTask = (uuid) => {
    if (uuid) {
      const { tasks } = this.state;

      const otherTasks = tasks.filter((task) => task.uuid !== uuid);
      const selectedTask = tasks.filter((task) => task.uuid === uuid)[0];

      if (selectedTask) {
        const alteredTask = {
          ...selectedTask,
          edit: true,
        };

        this.setState({
          tasks: [...otherTasks, alteredTask],
        });
      }
    }
  };

  saveTask = (uuid) => {
    if (uuid) {
      const { tasks } = this.state;

      const otherTasks = tasks.filter((task) => task.uuid !== uuid);
      const selectedTask = tasks.filter((task) => task.uuid === uuid)[0];

      if (selectedTask) {
        const alteredTask = {
          ...selectedTask,
          edit: false,
        };

        this.setState({
          tasks: [...otherTasks, alteredTask],
        });
      }
    }
  };

  changeOpen = (uuid, val) => {
    if (uuid) {
      const { tasks } = this.state;

      const otherTasks = tasks.filter((task) => task.uuid !== uuid);
      const selectedTask = tasks.filter((task) => task.uuid === uuid)[0];

      if (selectedTask) {
        const alteredTask = {
          ...selectedTask,
          value: val,
        };

        this.setState({
          tasks: [...otherTasks, alteredTask],
        });
      }
    }
  };

  playSound = () => {
    const bell = new UIfx(soundOne, {
      volume: 0.5, // number between 0.0 ~ 1.0
      throttleMs: 100,
    });

    bell.play();
  };

  render() {
    const { tasks } = this.state;

    console.log(tasks);

    const sortedTasks = tasks.sort(function (a, b) {
      return a.altered > b.altered ? -1 : 1;
    });
    const openTasks = sortedTasks.filter((tempTask) => !tempTask.done);
    const finishedTasks = sortedTasks.filter((tempTask) => tempTask.done);

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
                    <MDBListGroupItem className="first">
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
                            containerClass="add-task"
                            onKeyDown={this.handleKeyDown}
                            label="Add task"
                          />
                        </div>
                      </div>
                      {this.state.enterTask && (
                        <div className="text-right position-relative">
                          <p className="mb-0 small text-muted position-absolute">
                            Press ENTER to add task
                          </p>
                        </div>
                      )}
                    </MDBListGroupItem>
                    <p
                      className="font-weight-bold text-left mb-0"
                      onClick={() => this.toggleCollapse("open")}
                    >
                      {openTasks.length > 0 && (
                        <>
                          {this.state.showOpen ? (
                            <MDBIcon icon="angle-down" />
                          ) : (
                            <MDBIcon icon="angle-down" className="open" />
                          )}
                        </>
                      )}
                      Open tasks
                    </p>
                    {openTasks.length > 0 ? (
                      <MDBCollapse
                        id="open"
                        isOpen={this.state.showOpen}
                        className="open-tasks"
                      >
                        {openTasks.map((task, t) => {
                          return (
                            <MDBListGroupItem
                              key={task.uuid}
                              className={task.edit ? "task edit" : "task"}
                              onClick={() => this.editTask(task.uuid)}
                            >
                              <div className="main-container">
                                <div>
                                  <MDBInput
                                    type="checkbox"
                                    size="lg"
                                    checked={
                                      this.state.tempDone.filter(
                                        (tempTask) => tempTask === task.uuid
                                      )[0]
                                        ? true
                                        : false
                                    }
                                    disabled={
                                      this.state.tempDone.filter(
                                        (tempTask) => tempTask === task.uuid
                                      )[0]
                                        ? true
                                        : false
                                    }
                                    onClick={() => this.finishTask(task.uuid)}
                                    id={"checkbox-" + task.uuid}
                                  />
                                </div>
                                {task.edit ? (
                                  <div className="d-flex justify-content-between">
                                    <MDBInput
                                      type="text"
                                      containerClass="w-100"
                                      autoFocus
                                      ref={(elem) => (this[task.uuid] = elem)}
                                      value={task.value}
                                      disabled={
                                        this.state.tempDone.filter(
                                          (tempTask) => tempTask === task.uuid
                                        )[0]
                                          ? true
                                          : false
                                      }
                                      onKeyDown={(e) =>
                                        this.handleKeyDown(e, task.uuid)
                                      }
                                      getValue={(val) =>
                                        this.changeOpen(task.uuid, val)
                                      }
                                      onBlur={() => this.saveTask(task.uuid)}
                                    />
                                  </div>
                                ) : (
                                  <div className="px-3 py-2 text-left task-value">
                                    {task.value}
                                  </div>
                                )}
                              </div>
                            </MDBListGroupItem>
                          );
                        })}
                      </MDBCollapse>
                    ) : (
                      <>
                        {finishedTasks.length > 0 ? (
                          <p className="mb-0 text-muted text-left small mt-2 mb-4">
                            You're all clear. Good work!
                          </p>
                        ) : (
                          <p className="mb-0 text-muted text-left small mt-2">
                            No tasks yet. Start by adding tasks
                          </p>
                        )}
                      </>
                    )}
                    {finishedTasks.length > 0 && (
                      <>
                        {openTasks.length > 0 ? (
                          <>
                            <p
                              className="font-weight-bold text-left mb-0 mt-3"
                              onClick={() => this.toggleCollapse("done")}
                            >
                              {finishedTasks.length > 0 && (
                                <>
                                  {this.state.showDone ? (
                                    <MDBIcon icon="angle-down" />
                                  ) : (
                                    <MDBIcon
                                      icon="angle-down"
                                      className="open"
                                    />
                                  )}
                                </>
                              )}
                              Completed tasks
                            </p>
                          </>
                        ) : (
                          <p
                            className="font-weight-bold text-left mb-0"
                            onClick={() => this.toggleCollapse("done")}
                          >
                            {finishedTasks.length > 0 && (
                              <>
                                {this.state.showDone ? (
                                  <MDBIcon icon="angle-down" />
                                ) : (
                                  <MDBIcon icon="angle-down" className="open" />
                                )}
                              </>
                            )}
                            Completed tasks
                          </p>
                        )}
                      </>
                    )}
                    <MDBCollapse
                      id="done"
                      isOpen={this.state.showDone}
                      className="done-tasks"
                    >
                      {finishedTasks.map((task, t) => {
                        return (
                          <MDBListGroupItem key={task.uuid}>
                            <div className="main-container">
                              <div>
                                <MDBInput
                                  type="checkbox"
                                  size="lg"
                                  checked={true}
                                  onClick={() => this.openTask(task.uuid)}
                                  id={"checkbox-" + task.uuid}
                                />
                              </div>
                              <div className="px-3 py-2 text-left task-value">
                                {task.value}
                              </div>
                            </div>
                          </MDBListGroupItem>
                        );
                      })}
                    </MDBCollapse>
                  </MDBListGroup>
                </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </MDBFreeBird>
          <MDBContainer>
            <MDBRow>
              <MDBCol md="12" className="mt-4">
                <h2 className="text-center mt-5 mb-3 font-weight-bold">
                  Share. Collaborate. Build.
                </h2>
                <p className="text-center text-muted mb-1">
                  TodoMe has been built around the thought of instant sharing,
                  collaboration and building.
                </p>
                <p className="text-center text-muted mb-1">
                  Without the need for registration and costly fees. Easy to use
                  and intuitive.
                </p>
                <p className="text-center text-muted">
                  We are constantly updating the features to make this tool even
                  more useful for you and your team.
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
