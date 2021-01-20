import React from 'react';
import firebase from './config/firebase';
import './App.css';

class App extends React.Component{
    // state of this class //
    constructor(){
        super()
        this.state = {
            todos:[{text:"rafay" , edit: false },{text:"asad" , edit: false}],
            value:''
        }
    }
    // Add items in todo list //
    set_item =()=>{
        let obj = {text : this.state.value};
        // let key = firebase.database().ref('todos').push().key;
        this.setState({
            todos:[...this.state.todos,obj],
            value:''
        })
        // firebase.database().ref('todos/').child(key).set();
    }
    // delete items from todo list //
    delete_item =(index)=>{
        this.state.todos.splice(index,1);
        this.setState({
            todos:this.state.todos
        })
    }
    // edit items from todo list //

    ////////////// simple way to make edit ////////////////////
    
    // edit_item =(index)=>{
    //     let afterEdit = prompt("Enter item");
    //     this.state.todos[index] = afterEdit;
    //     this.setState({
    //         todos:this.state.todos
    //     })
    // }

    ///////////// input field when you click on edit button ////////////////

    edit_item =(index,value)=>{
        this.state.todos[index].edit = true;
        this.setState({
            todos:this.state.todos,
            value:''
        })
    }

    //////////// this function is running for change the text of the field ///////////

    afterEdit =(e,index)=>{
        this.state.todos[index].text=e.target.value;
        this.setState({
            todos:this.state.todos
        })
    }

    ///////////////// when you click on update button this function will run ////////////////////
    update =(index)=>{
        this.state.todos[index].edit = false;
        this.setState({
            todos:this.state.todos
        })
    }


    render(){
        let {todos , value} = this.state;
        return(
            <div>
                <input value={value} onChange={(e)=>this.setState({value:e.target.value})} type="text" placeholder="Enter your item"/>
                <button onClick={this.set_item}>Add item</button>
                <ul>
                    {todos.map((v,i)=>{
                        // firebase.database().ref('todos').on("child_added",data=>{
                            return <li key={i}>
                           {v.edit ? <input onChange={(e)=>this.afterEdit(e,i)} type="text" /> : v.text}
                           {v.edit ?
                           <button onClick={()=>this.update(i)}>update</button>
                           :<button onClick={()=>this.edit_item(i,v.text)}>edit</button>}
                           <button onClick={()=>this.delete_item(i)}>delete</button>
                           </li>

                // })
                    })}
                </ul>
            </div>
    )
}
}



export default App;
