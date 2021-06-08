import React, { Component } from 'react';
import di from '../image/trash.png';
import ai from '../image/add1.png';
import Header from '../header.js';
import './dashboard.css';
import lo from '../image/logout.png';
import al from '../image/add.png';
class Dashboard extends Component {

    constructor() {
        super();
        this.state = {
            al: false, //al = Add List
            at: false, //at = Add Task
            Detail: JSON.parse(localStorage.getItem("Detail")),
            list_name: "", // Add List Name
            list: "", //Delete List Name
            taskname: "",
            taskdes: "",
            taskdate: "",
        };
    }

    change(val) {
        this.setState({
            [val.target.name]: val.target.value,
        });
    }


    componentDidMount() {
        if (localStorage.getItem("login") === "") {
            this.props.history.push('');
        }
        this.setState({
            Detail: JSON.parse(localStorage.getItem("Detail"))
        })
    }


    logout() {
        localStorage.setItem("login", "");
        this.props.history.push('');
    }


    addlist() {
        if (this.state.list_name === "" || this.state.list_name === "Select List") {
            alert("Enter List Name")
        } else {
            var arr = this.state.Detail;
            arr[localStorage.getItem("login")] = {
                ...arr[localStorage.getItem("login")],
                [this.state.list_name]: []
            }
            this.setState({
                Detail: arr
            })
            localStorage.setItem("Detail", JSON.stringify(arr))
            this.setState({ al: false, list_name: "" })
        }

    }


    removelist() {
        var arr = this.state.Detail;
        delete arr[localStorage.getItem('login')][this.state.list]
        this.setState({
            Detail: arr,
            list: "",
        })
        localStorage.setItem('Detail', JSON.stringify(arr))
    }

    addtask() {
        if (this.state.taskname === "" || this.state.taskdes === "") {
            alert("Enter Detail")
        } else {
            var arr = this.state.Detail;
            arr[localStorage.getItem("login")][this.state.list] = [
                ...arr[localStorage.getItem("login")][this.state.list], {
                    taskname: this.state.taskname,
                    taskdes: this.state.taskdes,
                    taskdate: this.state.taskdate
                }
            ]
            this.setState({
                Detail: arr
            })
            localStorage.setItem("Detail", JSON.stringify(arr));
            this.setState({
                at: false,
                taskname: "",
                taskdes: "",
                taskdate: "",
            })
        }

    }


    removetask(k) {
        console.log(k.target.name)
        var arr = this.state.Detail;
        arr[localStorage.getItem("login")][this.state.list].shift(k.target.name);
        this.setState({
            Detail: arr
        })
        localStorage.setItem("Detail", JSON.stringify(arr));
        console.log(arr)
    }



    render() {
        return (
            <React.Fragment>
                {/* _________ADD LIST_________ */}
                <div className="addlist">
                    <div className="addlist_v"><img src={al} onClick={() => this.setState({ al: true })} alt="add" /></div>
                    {
                        this.state.al ?
                            <div className="addlist_i">
                                <div className="form_i">
                                    <div className="close" onClick={() => this.setState({ al: false })}>X</div>
                                    <div className="field_i">
                                        <input type="text" placeholder="Enter List Name" name="list_name" value={this.state.list_name} onChange={(val) => this.change(val)} required="" />
                                    </div>
                                    <button onClick={() => this.addlist()}>Add List</button>
                                </div>
                            </div>
                            : null
                    }
                </div>
                {
                    this.state.at ?
                        <div className="addtask">
                            <div className="form_t">
                                <div className="close" onClick={() => this.setState({ at: false })}>X</div>
                                <div className="field_t">
                                    <input type="text" placeholder="Enter Task Name" name="taskname" value={this.state.taskname} onChange={(val) => this.change(val)} required="" />
                                    <input type="text" placeholder="Enter Task Description" name="taskdes" value={this.state.taskdes} onChange={(val) => this.change(val)} required="" />
                                    <input type="date" placeholder="Enter Task Date" name="taskdate" value={this.state.taskdate} onChange={(val) => this.change(val)} required="" />
                                </div>
                                <button onClick={() => this.addtask()}>Add Task</button>
                            </div>
                        </div>
                        : null
                }

                {/* _________DashBoard_________ */}
                <div className="main">
                    <Header />
                    <div className="logout">
                        <div className="dash">Task Board list</div>
                        <div className="log_out"><img src={lo} onClick={() => this.logout()} alt="logout" /></div>
                    </div>


                    {/* ___________All List And Task_______ */}
                    <div className="list_body">
                        <div className="list">
                            <select className="select" name="list" onChange={(p) => { this.setState({ list: p.target.value }); console.log(p.target.value); }}>
                                <option>Select List</option>
                                {
                                    Object.keys(this.state.Detail[localStorage.getItem('login')]).map((item) => {
                                        return <option>{item}</option>
                                    })
                                }
                            </select>
                            <div style={{ "display": "flex", "align-items": "center", "position": "relative" }}>
                                {
                                    this.state.list === "" ?
                                        null
                                        : this.state.list === "Select List" ?
                                            null
                                            : <React.Fragment><div className="add_t"><img src={ai} alt="" onClick={() => this.setState({ at: true })} /></div>
                                                <div className="delete_l"><img src={di} alt="" onClick={() => this.removelist()} /></div></React.Fragment>
                                }

                            </div>
                        </div>
                        <div className="task">
                            {
                                this.state.list === "" ?
                                    <p>Select the List</p>
                                    : this.state.list === "Select List" ?
                                        <p>Select the List</p>
                                        : this.state.Detail[localStorage.getItem("login")][this.state.list].map((item, index) => {
                                            return <div className="task_detail">
                                                <div className="delete_t"><img src={di} alt="" name={index} onClick={(k) => this.removetask(k)} /></div>
                                                <div className="task_n">{item.taskname}</div>
                                                <div className="task_dc">{item.taskdes}</div>
                                                <div className="task_da">{item.taskdate}</div>
                                            </div>
                                        })

                            }
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Dashboard;