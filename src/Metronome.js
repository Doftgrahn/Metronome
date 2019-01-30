import React, {Component} from 'react';
import './Metronome.css';

class Metronome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      count: 0,
      bpm: 100,
      beatsPerMeasure: 4
    };
  }

  handleBpmChange = event => {
    const bpm = event.target.value;
    this.setState({bpm});
  }

  render() {
    const {playing, bpm} = this.state;

    return (<div className="metronome">
      <div class="mystuff">
        <h1>
          My metronome.
        </h1>
        <h3 className="name">by Simon Grahn</h3>
      </div>
      <div className="bpm-slider">
        <div>
          {bpm}
          BPM
        </div>
        <input type="range" min="60" max="240" value={bpm} onChange={this.handleBpmChange}/>
      </div>
      <button>
        {
          playing
            ? 'stop'
            : 'start'
        }
      </button>
    </div>);
  }
}

export default Metronome;
