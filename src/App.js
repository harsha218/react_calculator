import React from 'react';
import './App.css';
import { AiOutlineClear } from 'react-icons/ai';
import 'bootstrap/dist/css/bootstrap.min.css'


class App extends React.Component {
  constructor(){
    super()
    this.state = {
      x:''
    };
  }

  changeHandler = (value) => {
    let prev = this.state.x
    if(typeof(value) == typeof('d')){
      if(prev){
        let lastChar = prev.substr(prev.length-1)
        if(!isNaN(Number(lastChar))){
          this.setState({x:prev+value})
        }else{
          prev = prev.substr(0,prev.length-1)
          this.setState({x:prev+value})
        }
      }
    }else{
      this.setState({x:this.state.x+String(value)})
    }
  }

  fromInput = (event) => {
    let prev = event.target.value
    let first = Number(prev.substr(prev.length-1))
    let second = Number(prev.charAt(prev.length-2))
    if(isNaN(first) && isNaN(second)){
      let dummy = prev.substr(0,prev.length-2)+prev.substr(prev.length-1,prev.length)
      this.setState({x:dummy})
    }else{
      this.setState({x:event.target.value})
    }
  }

  equate = () => {
    let dummy = this.state.x
    let nums = []
    let signs = []
    let n=0
    for(var i=0; i<dummy.length; i++){
      if(isNaN(dummy.charAt(i))){
        nums.push(n)
        n=0
        if(i !== dummy.length-1){
          signs.push(dummy.charAt(i))
        }
      }else{
        if(i === dummy.length-1){
          n = n*10+Number(dummy.charAt(i))
          nums.push(n)  
        }
        n = n*10+Number(dummy.charAt(i))
      }
    }
    while(signs.includes('/')){
      let i = signs.indexOf('/')
      if(i === -1){
        break
      }
      let num = nums[i]/nums[i+1]
      nums[i] = num
      nums.splice(i+1,1)
      signs.splice(i,1)
    }
    while(signs.includes('*')){
      let i = signs.indexOf('*')
      if(i === -1){
        break
      }
      let num = nums[i]*nums[i+1]
      nums[i] = num
      nums.splice(i+1,1)
      signs.splice(i,1)
    }
    while(signs.includes('+')){
      let i = signs.indexOf('+')
      if(i === -1){
        break
      }
      let num = nums[i]+nums[i+1]
      nums[i] = num
      nums.splice(i+1,1)
      signs.splice(i,1)
    }
    while(signs.includes('-')){
      let i = signs.indexOf('-')
      if(i === -1){
        break
      }
      let num = nums[i]-nums[i+1]
      nums[i] = num
      nums.splice(i+1,1)
      signs.splice(i,1)
    }
    if(isNaN(Number(this.state.x.charAt(this.state.x.length-1)))){
      var exit = this.state.x.substr(0,this.state.x.length-1)
    }else{
      exit = this.state.x
    }

    this.setState({x:''})
    if(nums[0] === undefined){
      window.alert('give input')
    }else{
      let addHere = document.getElementById('addHere')
      let newElement = document.createElement('tr')
      newElement.appendChild(document.createTextNode(exit + ' = ' +String(nums[0])))
      newElement.classList.add('history-content')
      addHere.insertBefore(newElement,addHere.firstChild)
    }
  }

  enter = (event) => {
    if(event.which === 13){
      this.equate()
    }
  }

  showThis() {
    console.log('working')
  }

  render(){
    return (
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-lg-3 col-md-4 col-sm-6 col-xs-8 offset-lg-1 offset-md-1 offset-sm-1 offset-xs-1'>
            <table className='table'>
              <thead>
                <tr>
                  <td colSpan='4' id='reduceHeight'><input type='text' className='form-control' style={{backgroundColor:'cornsilk'}} value={this.state.x} onChange={this.fromInput} onKeyPress={this.enter} autoFocus/></td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td onClick={()=>{this.changeHandler(7)}}>7</td>
                  <td onClick={()=>{this.changeHandler(8)}}>8</td>
                  <td onClick={()=>{this.changeHandler(9)}}>9</td>
                  <td onClick={()=>{this.changeHandler('-')}}>-</td>
                </tr>
                <tr>
                  <td onClick={()=>{this.changeHandler(4)}}>4</td>
                  <td onClick={()=>{this.changeHandler(5)}}>5</td>
                  <td onClick={()=>{this.changeHandler(6)}}>6</td>
                  <td onClick={()=>{this.changeHandler('+')}}>+</td>
                </tr>
                <tr>
                  <td onClick={()=>{this.changeHandler(1)}}>1</td>
                  <td onClick={()=>{this.changeHandler(2)}}>2</td>
                  <td onClick={()=>{this.changeHandler(3)}}>3</td>
                  <td onClick={()=>{this.changeHandler('*')}}>*</td>
                </tr>
                <tr>
                  <td onClick={()=>this.setState({x:''})}><AiOutlineClear/></td>
                  <td onClick={()=>{this.changeHandler(0)}}>0</td>
                  <td onClick={()=>{this.changeHandler('/')}}>/</td>
                  <td onClick={this.equate}>=</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='col-lg-3 col-md-4 col-sm-6 col-xs-8 offset-lg-1 offset-md-1 offset-sm-1 offset-xs-1 table-responsive' id='content'>
            <header className='text-center' id='header'>History</header>
            <table>
              <tbody id='addHere'>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
