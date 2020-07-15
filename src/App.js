import React from 'react';


class  App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      loading : false,
      data:null
    }
  }

   componentDidMount(){
     this.requestData();
   }

   async requestData(){
    this.setState({loading:true})
    const res = await fetch("https://opentdb.com/api.php?amount=10")
    const quiz = await res.json()
    const quizItems = quiz.results
    console.log(quizItems)
    const quizItem = quizItems.map((item,index)=>{
    return (
      <li key={index}>{item.question}</li>
    )
    })
    console.log(quizItem)
    this.setState({data:quizItem})
    this.setState({loading:false})

  }

  renderData(){
      if(this.state.loading===true){
        return(
          <p>データ取得中</p>
        )
      }else if(this.state.data===null){
          return  <p>データなし</p>
        }else if(!this.state.loading){
          return(
            <p>{ JSON.stringify( this.state.data ) }</p>
          )
        }
      
    
  }

  renderRequestButton(){
    if(this.state.loading){
      return <button disabled>データ取得中</button>
    } else if(!this.state.loading){
      return(
        <button onClick = {()=>{this.requestData()}}>データを取得する</button>
      )
    }
  }


  render(){
    return(
      <div>
    {this.renderData()}
    {this.renderRequestButton()}
      </div>
    )
   
  }
}

export default App;
