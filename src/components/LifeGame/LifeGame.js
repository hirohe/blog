import React from 'react';
import styles from './LifeGame.css';

class LifeGame extends React.Component {
  constructor(props) {
    super();

    this.state = {
      setting: { delay: 1, x: 40, y: 40, present: 0.2 },
      pool: [],
      child: [],
      intervalId: null,
      running: false,
    }

  }

  async componentDidMount() {
    await this.random();
    this.start();
  }

  componentWillUnmount() {
    const { intervalId } = this.state;
    clearInterval(intervalId);
  }

  settingsOnChange = (key, value) => {
    const oldSetting = this.state.setting;
    this.setState({
      setting: {
        ...oldSetting,
        [key]: parseFloat(value),
      }
    });
  };

  random = () => {
    return new Promise((resolve) => {
      const x = this.state.setting.x,
        y = this.state.setting.y,
        present = this.state.setting.present;
      if (this.state.present >= 1) return null;
      const pool = new Array(y);
      for (let i = 0; i < y; i++) {
        const row = new Array(x);
        for (let j = 0; j < x; j++) {
          row[j] = parseInt(Math.random() + parseFloat(present))
        }
        pool[i] = row;
      }
      this.setState({ pool }, resolve);
    });
  };

  countNeighbors(x, y) {
    let count = 0;
    const w = this.state.setting.x, h = this.state.setting.y;
    for (let i = 0; i < 9; i++) {
      const ix = x + i % 3 - 1, iy = y + Math.floor(i / 3) - 1;
      if (!(ix < 0 || ix >= h || iy < 0 || iy >= w)) {
        if (!(ix === x && iy === y)) {
          if (this.state.pool[iy][ix] === 1) {
            count++;
          }
        }
      }
    }
    return count;
  };

  toSurvive = (x, y) => {
    const num = this.countNeighbors(x, y);
    if (this.state.pool[y][x] === 1) {
      return (num === 2 || num ===3)
    } else if (this.state.pool[y][x] === 0) {
      return (num === 3)
    }
  };

  tick = () => {
    let child = [];
    for (let y = 0; y < this.state.setting.y; y++) {
      const row = new Array(this.state.setting.x);
      for (let x = 0; x < this.state.setting.x; x++) {
        if (this.toSurvive(x, y)) {
          row[x] = 1;
        } else {
          row[x] = 0;
        }
      }
      child.push(row)
    }
    this.setState({ pool: child })
  };

  start = () => {
    if (this.state.pool.length === 0 || this.state.running) return;
    const intervalId = setInterval(() => {
      this.tick();
    }, this.state.setting.delay);
    this.setState({ running: true, intervalId })
  };

  pause = () => {
    if (this.state.intervalId) {
      clearInterval(this.state.intervalId);
      this.setState({ running: false });
    }
  };

  clear = () => {
    this.pause();
    this.setState({ pool: [], running: false });
  };

  render() {
    return (
      <div className={styles.world}>
        <svg width="200px" height="200px">
          <g>
            {
              this.state.pool.map((row, y) => {
                return row.map((cell, x) =>
                  <rect
                    key={`${x},${y}`}
                    x={x*5}
                    y={y*5}
                    width={5}
                    height={5}
                    fill={cell === 1 ? '#0f0' : 'none'}
                  />
                )
              })
            }
          </g>
        </svg>
      </div>
    )
  }

}

export default LifeGame;
