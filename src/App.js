
import React from 'react';
import firebase from './config/firebase';
import './App.css';
import Logo from './components/logo'

class App extends React.Component{
    // state of this class //
    constructor(){
        super()
        this.state = {
            todos:[{text:"rafay" , edit: false }],
            // todos:[],
            value:'',
            
            // key : firebase.database().ref("todos").push().key
        }
    }
    // Add items in todo list //
    set_item =()=>{
        // let key = firebase.database().ref("todos").push().key;
        let obj = {text : this.state.value};
        this.setState({
            todos:[...this.state.todos,obj],
            value:''
        })
        firebase.database().ref('/').child('todos')
        .push(obj);
    }
    ///////////// this liftcycle method getting data from database //////////////////////
    componentDidMount(){
        // const previousTodos = this.state.todos;
        firebase.database().ref('todos').on("child_added",data =>{
            this.state.todos.push({
                id : data.key,
                text:data.val().text,
                completed : false

            })
            this.setState({
                todos:this.state.todos
            })
            // console.log();
            // console.log(data.val());
            // firebase.database().ref('todos').on('child_removed',data=>{
            //     for(var i=0 ; i<this.state.todos.length ; i++){
            //         if(this.state.todos[i].id === data.key){
            //             this.state.todos.splice(i,1);
            //         }
            //     }
            // })
            // this.setState({
            //     todos:this.state.todos
            // })
        })
    }
    // delete items from todo list //
    delete_item =(index,value)=>{
        // let key = firebase.database().ref('todos').push().key;
        this.state.todos.splice(index,1);
        this.setState({
            todos:this.state.todos
        })
        firebase.database().ref("todos").child(value.id).remove();
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
        // firebase.database().ref("todos").child(this.state.key).set(this.state.todos[index].text);
    }
    
    //////////// this function is running for change the text of the field ///////////
    
    afterEdit =(e,index)=>{
        this.state.todos[index].text=e.target.value;
        this.setState({
            todos:this.state.todos
        })
        
    }
    
    ///////////////// when you click on update button this function will run ////////////////////
    update =(e,index,value)=>{
        this.state.todos[index].edit = false;
        this.setState({
            todos:this.state.todos
        })
        // console.log(value.text);
        firebase.database().ref('todos').child(value.id)
        .set({
            text:value.text
        })
    }


    // deleteAll_item=()=>{
    //     <li>{this.props.emp}</li>
    //     this.setState({
    //         todos:this.state.todos
    //     })
    //     firebase.database().ref("todos").remove();
        
    // }



    
    render(){
        // var key = firebase.database().ref('todos').push().key;
        // firebase.database().ref('todos/').on("child_added",data=>{
            //     console.log(data.val());
        // })
        let {todos , value} = this.state;
        return(
            <div className="todo">
                <h1 className="header">TODO APP<Logo />
                    </h1><br />
                <input className="textfield" value={value} onChange={(e)=>this.setState({value:e.target.value})} type="text" placeholder="Enter your item"/>
                <button className="add btn btn-dark" onClick={()=>this.set_item()}>Add item</button>
                {/* <button onClick={()=>this.deleteAll_item()}>Delete All</button> */}
                <ul className="list-group list-group-flush"><br />
                    {todos.map((v,i)=>{
                    // firebase.database().ref('todos').on("child_added",data=>{
                            return <li className="list-group-item" key={i}>
                           {v.edit ? <input className="up-inp" onChange={(e)=>this.afterEdit(e,i)} type="text" /> : v.text}
                           {v.edit ?
                           <button className="up-btn btn btn-outline-dark" onClick={(e)=>this.update(e,i,v)}>update</button>
                           :<button className="ed-btn btn btn-outline-dark" onClick={()=>this.edit_item(i,v.text)}>edit</button>}
                           <button className="del-btn btn btn-outline-dark" onClick={()=>this.delete_item(i,v)}>delete</button>
                           </li>

                // })
                    })}
                </ul>
            </div>
    )
}
}



export default App;
