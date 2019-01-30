import React, {Component} from 'react';
import './Metronome.css';
import click1 from './click1.wav';
import click2 from './click2.wav';

class Metronome extends Component {
  constructor(props) {
    super(props);

    this.click1 = new Audio(click1);
    this.click2 = new Audio(click2);
    console.log('Audio:', this.click1);
    // this.click1.volume=0.1;

    this.state = {
      playing: false,
      count: 0,
      bpm: 100,
      beatsPerMeasure: 4,
      beatId: null
    };
  }

  startStop = () => {
    if (this.state.playing) {
      //stop the timer
      clearInterval(this.timer);
      this.setState({setState: false});
    } else {
      //start av timer with current BPM.
      this.timer = setInterval(this.playClick, (60 / this.state.bpm) * 1000);
      this.setState({
        count: 0,
        playing: true
      }, this.playClick)
    }
  };

  playClick = () => {
    const {count, beatsPerMeasure} = this.state;

    if (count % beatsPerMeasure === 0) {
      this.click2.play();
    } else {
      this.click1.play();
    }

    //trackar vart clippet befinner collapsing
    this.setState(state => ({
      count: (state.count + 1) % state.beatsPerMeasure
    }));
  }

  handleBpmChange = event => {
    const bpm = event.target.value;
    if (this.state.playing) {
      clearInterval(this.timer);
      //tar bort gamla intervallet när man ändrar
      this.timer = setInterval(this.playClick, (60 / bpm) * 1000);

      //sätt in ett nytt bpm
      this.setState({count: 0, bpm})
    } else {
      //annars uppdatera bpmen.
      this.setState({bpm});
    }
    this.setState({bpm});
  }

  render() {
    const {playing, bpm} = this.state;

    return (<div className="metronome">
      <div className="mystuff">
        <h1>
          My Metronome.
        </h1>
        <h3 className="name">by Simon Grahn</h3>
      </div>
      <div className="bpm-slider">
        <div>
          {bpm}
          bpm
        </div>
        <input type="range" min="60" max="240" value={bpm} onChange={this.handleBpmChange}/>
      </div>
      <button onClick={this.startStop}>
        {
          playing
            ? 'Stop'
            : 'Start'
        }
      </button>
    </div>);
  }
}

export default Metronome;
