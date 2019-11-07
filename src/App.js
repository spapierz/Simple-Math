import React from 'react';
import Card from './components/card'; 

//-- 1. If equation was already given, generate new numbers
//-- 2. If correct, put green checkmark by equation, if wrong, red x

//-- Refactor
//-- 1. Create gameOver check and apply as guard clause
//-- 2. Move z to other methods where we can choose multiplication, subtraction, addition and division


const flexContainer = {
  'display': 'flex', 
  'alignItems': 'center'
};

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      correct: 0,
      problemNum: 0,
      incorrect: [],
      guessedAnswer: '',
      numbers: {}, 
      problems: { 1: {}, 2: {}, 3: {}, 4: {}, 5: {}, 6: {}, 7: {}, 8: {}, 9: {}, 10: {}},
      level: 1,
      gameOver: false, 
    }

    this.baseState = this.state
  }

  handleClick = (e) => {  
    const { value } = e.target;  
    this.setState({ guessedAnswer: value ? parseInt(value) : '' });
  } 

  saveEquations = () => {
    const index = this.state.problemNum;

    this.setState({ problemNum: this.state.problemNum + 1 });

    let obj = Object.keys(this.state.problems); 

    for (let i in obj) {
      let problem = obj[i];

      problem = parseInt(problem)
      
      if (problem === index) {
        this.setState(prevState => ({
          problems: { 
            ...prevState.problems, 
            [problem]: {                   
              ...prevState.problems.problem, 
              x: this.state.numbers.x, 
              y: this.state.numbers.y, 
              z: this.state.numbers.z
          }}
        }))
      }
    }
  }

  generateNumbers = (x, y, z) => {
    const index = this.state.problemNum;
    
    this.saveEquations();

    if (index === 10) return;

    x = Math.floor(Math.random() * 10);
    y = Math.floor(Math.random() * 10);
    z = x + y;

    this.setState({ numbers: { x, y, z } });

    return {
      x, y, z
    }
  }

  isAnswerCorrect = () => {
    const index = this.state.problemNum; 
 
    this.resetValue();

    if (index === 11) return;

    if (this.state.numbers.z === this.state.guessedAnswer) {
      this.addOneFromScore();
      this.generateNumbers();
      
      alert('You did it! ' + 'The answer is: ' + this.state.numbers.z);

      if (this.checkUserFinished()) return;

    } else {

      this.subtractOneFromScore();
      this.generateNumbers();
      
      alert('You guessed: ' + this.state.guessedAnswer + ', but the answer is: ' + this.state.numbers.z);

      if (this.checkUserFinished()) return;

    }
  }

  addOneFromScore = () => {
    this.setState((prevState) => {
      return {
        correct: prevState.correct + 1
      }
    }); 
  }

  subtractOneFromScore = () => {
    if (this.state.correct > 0) {

      this.setState((prevState) => {
        return {
          correct: prevState.correct - 1
        }
      });

    } 
  }

  resetValue = value => {
    this.setState({ guessedAnswer: value ? parseInt(value) : '' });
  }

  checkUserFinished = () => {
    const totalProblems = Object.keys(this.state.problems).length
    console.log(this.state.problemNum, totalProblems)

    if (this.state.problemNum !== totalProblems) return;

    this.setState({ gameOver: true });
    
    alert(`Game over! Your final score is ${this.state.correct}`);
  }

  componentWillMount() {
    this.generateNumbers();
  }

  render() {
    return (
      <React.Fragment>
        <h2 style={{paddingLeft:'20px'}}>Score: {this.state.correct}</h2>  
        <div className="App" style={flexContainer}>
          <Card x={this.state.numbers.x} /> <div>+</div>
          <Card y={this.state.numbers.y} /> <div>=</div>

          <Card input guess={this.state.guessedAnswer} onInput={this.handleClick} /> 
          <button onClick={this.isAnswerCorrect}>Check My Answer</button>
        </div>
        <div style={{paddingLeft:'20px'}}>
          <h3>Problem 1:</h3>
          <p>{this.state.problems[1].x} {this.state.problems[1].x >= 0 ? '+' : '' } {this.state.problems[1].y} {this.state.problems[1].y >= 0 ? '=' : ''} {this.state.problems[1].z}</p>
          <h3>Problem 2:</h3>
          <p>{this.state.problems[2].x} {this.state.problems[2].x >= 0 ? '+' : '' } {this.state.problems[2].y} {this.state.problems[2].y >= 0 ? '=' : ''} {this.state.problems[2].z}</p>
          <h3>Problem 3:</h3>
          <p>{this.state.problems[3].x} {this.state.problems[3].x >= 0 ? '+' : '' } {this.state.problems[3].y} {this.state.problems[3].y >= 0 ? '=' : ''} {this.state.problems[3].z}</p>
          <h3>Problem 4:</h3>
          <p>{this.state.problems[4].x} {this.state.problems[4].x >= 0 ? '+' : '' } {this.state.problems[4].y} {this.state.problems[4].y >= 0 ? '=' : ''} {this.state.problems[4].z}</p>
          <h3>Problem 5:</h3>
          <p>{this.state.problems[5].x} {this.state.problems[5].x >= 0 ? '+' : '' } {this.state.problems[5].y} {this.state.problems[5].y >= 0 ? '=' : ''} {this.state.problems[5].z}</p>
          <h3>Problem 6:</h3>
          <p>{this.state.problems[6].x} {this.state.problems[6].x >= 0 ? '+' : '' } {this.state.problems[6].y} {this.state.problems[6].y >= 0 ? '=' : ''} {this.state.problems[6].z}</p>
          <h3>Problem 7:</h3>
          <p>{this.state.problems[7].x} {this.state.problems[7].x >= 0 ? '+' : '' } {this.state.problems[7].y} {this.state.problems[7].y >= 0 ? '=' : ''} {this.state.problems[7].z}</p>
          <h3>Problem 8:</h3>
          <p>{this.state.problems[8].x} {this.state.problems[8].x >= 0 ? '+' : '' } {this.state.problems[8].y} {this.state.problems[8].y >= 0 ? '=' : ''} {this.state.problems[8].z}</p>
          <h3>Problem 9:</h3>
          <p>{this.state.problems[9].x} {this.state.problems[9].x >= 0 ? '+' : '' } {this.state.problems[9].y} {this.state.problems[9].y >= 0 ? '=' : ''} {this.state.problems[9].z}</p>
          <h3>Problem 10:</h3>
          <p>{this.state.problems[10].x} {this.state.problems[10].x >= 0 ? '+' : '' } {this.state.problems[10].y} {this.state.problems[10].y >= 0 ? '=' : ''} {this.state.problems[10].z}</p>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
