import React, { Component } from 'react'
import './App.css'
import ModalApp from './components/ModalApp'
import data from './components/signs'

import bgImg from './components/images/back-to-future.jpg'

export default class App extends Component {
  state={
    data: data,
    ModalVisible: false,
    second: 0,
    minute: 0,
    count: 0
  }

  handleChange = (event, selectType) => {
    const selectedValue = event.target.value;
    if (selectType === 'time') {
      if (selectedValue === 'short') {
        this.setState({ minute: this.state.minute += 3 });
      } else if (selectedValue === 'normal') {
        this.setState({ minute: this.state.minute += 5 });
      } else if (selectedValue === 'long') {
        this.setState({ minute: this.state.minute += 10 });
      }
    }  
  }


  handleDifficulty = (event, selectType) => {
    const selectedValue = event.target.value;
    if (selectType === 'difficulty') {
      if (selectedValue === "easy") {
        this.setState({ data: this.state.data.slice(0, 20)});
      } else if (selectedValue === "medium") {
        this.setState({ data: this.state.data.slice(0, 50)});
      } else if (selectedValue === "difficult") {
        this.setState({ data: this.state.data.slice(0, 80)});
      } else if (selectedValue === "all") {
        this.setState({ data: this.state.data.slice(0, 100)});
      }
    }
  }

  startCount=()=>{
    let a = setInterval(() => {
       const {second,hour,minute} = this.state
       if(second === 0){
        if(minute === 0){
         if(hour === 0){
           clearInterval(this.state.interval);
           this.setState({ disabled: false });
         }else{
           this.setState({
             minute:59,
             hour: hour-1,
             second: 59
           })
         }
        }else{
         this.setState({
           minute: minute-1,
           second: 59
         })
        }
       }else{
         this.setState({
           second: second-1
         })
       }
      
     }, 1000);
     this.setState({
       interval: a,
       disabled: true
     })
   } 

   toggleModal=()=>{
    this.setState({
      ModalVisible: !this.state.ModalVisible,
    })
  }

   handleAll=()=>{
    this.startCount();
    this.toggleModal()
  }
  render() {
    const {ModalVisible} = this.state
    const {level, minute, second, data, count} = this.state
    return (
      <div id='notBody' className=''>
        <img src={bgImg} alt='Background-image' width={'1536px'} height={'720px'} style={{backgroundSize: 'cover', position: 'absolute', zIndex: '1'}}/>
        <div id='box' style={{position: 'relative', zIndex: '2'}}>
          <form id='form'>
          <label className='mb-5 mr-4' for="difficulty" id='label1'></label>

            <select id="difficulty" name="difficulty" onChange={(e) => this.handleDifficulty(e, 'difficulty')}>
              <option value="">Kategoriyani tanlang:</option>
              <option value="all">All</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="difficult">Difficult</option>
            </select>
          <br/>
            <label for="time" id='label2'></label>

            <select id="time" name="time" onChange={(e) => this.handleChange(e, 'time')}>
              <option value="">Vaqtni tanlang!</option>
              <option value="short">3 min</option>
              <option value="normal">5 min</option>
              <option value="long">10 min</option>
            </select>

          </form>
          <br/>
          <button id='form-btn' onClick={this.handleAll}>Start</button>
        </div>
        <ModalApp ModalVisible={ModalVisible} toggleModal={this.toggleModal} level={level} minute={minute} second={second} count={count} data={data}/>
      </div>
    )
  }
}
