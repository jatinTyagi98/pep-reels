import React, { Component } from 'react'

export default class Todo extends Component {
    constructor(){
        super();
        this.state = {
            tasks:[{task:"go to office",id:1},{task:"check mails", id: 2},{task:"check ins", id:3}], 
            currTask: ' '
        }
    }
    handleChange =(e) => {
        console.log(e.target.value)
        this.setState({
            currTask: e.target.value
        })
    }
    handleSubmit = () => {
        this.setState({
            tasks:[...this.state.tasks,{task:this.state.currTask,id:this.state.tasks.length+1}],
            currTask :' '
        })

    }

    handledelete = (id) => {
        let narr = this.state.tasks.filter((taskObj) => {
            return taskObj.id !== id;
        })
        console.log(narr)
        this.setState({
            tasks:[...narr]
        })
    }

    render() {
        return (
            <div>
                <input type="text" placeholder=" enter your task" value= {this.state.currTask} onChange={this.handleChange}/>
                <button onClick={this.handleSubmit}>submit</button>
                <ul>
                {
                    this.state.tasks.map((taskObj) => (
                        <li key={taskObj.id}>
                            <p>{taskObj.task}</p>
                            <button onClick={() => this.handledelete(taskObj.id)}>Delete</button>
                        </li>
                    ))
                }
                </ul>

            </div>
        )
    }
}

export let arr = [1,2,4,5,6];

