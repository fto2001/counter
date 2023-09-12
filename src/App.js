import React, { useState } from "react";

function CounterTitle ({ count }) {
  const getColor = () => {
    const hue = (count / 255) * 120;
    const saturation = '100%';
    const lightness = '50%';

    return `hsl(${hue},${saturation},${lightness})`;
  }

  return <h1>Your number is <span style={{ color: getColor() }}>{count}</span></h1>;
}

const getTranslateX = (count) => {
  const translateValue = count; 

  return `translateX(${translateValue}px)`;
};

function Modal({ goalValue, closeModal }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Congratulations!</h2>
        <p>You have reached the number {goalValue}.</p>
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
}

export default function Counter() {
  const [count, setCount] = useState(0);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(5);
  const [stepValue, setStepValue] = useState(1);
  const [goalValue, setGoalValue] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  }

  const closeModal = () => {
    setShowModal(false);
  }

  const increment = () => {
    if (count + stepValue <= maxValue) {
      setCount(count + stepValue);
      if (count + stepValue === goalValue) {
        openModal();
      }
    } else {
      setCount(maxValue);
    }
  };

  const decrement = () => {
    if (count - stepValue >= minValue) {
      setCount(count - stepValue);
      if (count - stepValue === goalValue) {
        openModal();
      }
    }
  };

  const handleMinChange = (e) => {
    const newMinValue = +e.target.value;

    setMinValue(newMinValue);

    if (count < newMinValue) {
      setCount(newMinValue);
    }
  };

  const handleMaxChange = (e) => {
    const newMaxValue = +e.target.value;

    setMaxValue(newMaxValue);

    if (count > newMaxValue) {
      setCount(newMaxValue);
    }
  };

  const handleStepChange = (e) => {
    const newStepValue = +e.target.value;
    setStepValue(newStepValue);
  }

  const handleGoalValue = (e) => {
    const newGoalValue = +e.target.value;
    setGoalValue(newGoalValue);
  }

  return (
    <div className="body">
      <div className="main-section">
      <CounterTitle count={count} />
      Goal Value:
      <input
      className="input"
      type="number"
      value={goalValue} 
      onChange={handleGoalValue}
      />
      Step Value:
      <input
        className="input"
        type="number"
        value={stepValue}
        onChange={handleStepChange}
        placeholder="Set Step Value"
      />
      Min Value:
      <input
        className="input"
        type="number"
        value={minValue}
        onChange={handleMinChange}
      />
      Max Value:
      <input
        className="input"
        type="number"
        value={maxValue}
        onChange={handleMaxChange}
      />
      <div>
      <button className="button" onClick={decrement} disabled={count === minValue}>
        Minus
      </button>
      <button className="button" onClick={increment} disabled={count === maxValue}>
        Plus
      </button>
      </div>
      </div>
      {showModal && <Modal goalValue={goalValue} closeModal={closeModal} />}
      <div className="box" style={{ transform: getTranslateX(count) }}/>
    </div>
  );
}