import React from 'react'; 

const card = {
	'backgroundColor': 'white', 
	'width': 150, 
	'height': 100, 
	'borderRadius': 4, 
	'margin': 20, 
	'display': 'flex', 
	'justifyContent': 'center', 
	'alignItems': 'center', 
};

const inputStyle = {
	'border': 'none', 
	'borderBottom': '1px solid black', 
	'background': 'none', 
	'textAlign': 'center', 
	'fontSize': '17px', 
	'fontWeight': '800', 
	'width': '100px', 
	'outline': 'none'
}

export default class Card extends React.Component {
	render() {
		return (
			<div style={card}>
				<h3>{this.props.x}</h3>
				<h3>{this.props.y}</h3>
				{this.props.answer}
				{this.props.input ? <h3><input style={inputStyle} type="text" name="GuessedAnswer" value={this.props.guess} onChange={this.props.onInput} /></h3> : '' }
      		</div>
		)
	}
}