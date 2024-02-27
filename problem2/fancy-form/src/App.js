// App.js
import { useEffect, useState } from 'react';
import Axios from 'axios';
import Dropdown from 'react-dropdown';
import { HiSwitchHorizontal } from 'react-icons/hi';
import 'react-dropdown/style.css';
import './App.css';

function App() {

	// Initializing all the state variables 
	const [info, setInfo] = useState([]);
	const [input, setInput] = useState(0);
	const [from, setFrom] = useState("sgd");
	const [to, setTo] = useState("usd");
	const [options, setOptions] = useState([]);
	const [output, setOutput] = useState(0);
  const [showInput, setShowInput] = useState(0);

	// Calling the api whenever the dependency changes
	useEffect(() => {
		Axios.get(
`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`)
			.then((res) => {
				setInfo(res.data[from]);
			})
	}, [from]);

	// Calling the convert function whenever
	// a user switches the currency
	useEffect(() => {
		setOptions(Object.keys(info));
		convert();
	}, [info])

  function getInput() {
    return showInput;
  }

	// Function to convert the currency
	function convert() {
		var rate = info[to];
		setOutput(input * rate);
    setShowInput(input);
	}

	// Function to switch between two currency
	function flip() {
		var temp = from;
		setFrom(to);
		setTo(temp);
	}

  function getOutput() {
    if (output == 0) {
      return "";
    }
    if (isNaN(output)) {
      return "Invalid input";
    }
    return output.toFixed(2);
  }

	return (
		<div className="App">
			<div className="heading">
				<h1>Currency Swap</h1>
			</div>
			<div className="container">
				<div className="left">
					<h3>Amount</h3>
					<input 
						placeholder="Input amount"
						onChange={(e) => setInput(e.target.value)} />
				</div>
				<div className="right">
					<h3>From</h3>
					<Dropdown options={options}
						onChange={(e) => { setFrom(e.value) }}
						value={from} placeholder="From" />
				</div>
			</div>
      <div className="buttons">
        <div className="left-button">
          <button onClick={() => { convert() }}>Convert</button>
        </div>
        <div className="right-button">
          <div className="switch">
            <HiSwitchHorizontal size="30px"
              onClick={() => { flip() }} />
          </div>
        </div>
        </div>
        
        
      <div className="container">
        <div className="left">
					<h3>Converted Amount</h3>
					<p className="output">{getOutput()}</p>
				</div>
				<div className="right">
					<h3>To</h3>
					<Dropdown options={options}
						onChange={(e) => { setTo(e.value) }}
						value={to} placeholder="To" />
				</div>
      </div>
			
		</div>
	);
}

export default App;
