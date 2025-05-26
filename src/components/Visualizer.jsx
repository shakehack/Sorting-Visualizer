import React, { useState, useEffect, useRef } from "react";
import { bubbleSort } from "../algorithms/bubbleSort";
import "./Visualizer.css";

const Visualizer = () => {
  const [array, setArray] = useState([]);
  const timeoutsRef = useRef([]); // To store timeout IDs

  const generateArray = () => {
    // Clear any ongoing animations
    console.log("Generating a new random array...");
    // Clear all timeouts to stop any ongoing animations
    console.log("Clearing all timeouts before generating a new array.");
    // This ensures that any previous animations are stopped before generating a new array
    clearAllTimeouts();

    // Generate a new random array
    const newArray = Array.from(
      { length: 10 },
      // Generate 10 random heights between 10 and 500

      () => Math.floor(Math.random() * 500) + 10
    );
    setArray(newArray);
  };
  // check if array is sorted
  const isSorted = (array) => {
    for (let i = 0; i < array.length - 1; i++) {
      if (array[i] > array[i + 1]) {
        console.log("Array is not sorted.");
        return false; // Not sorted
      }
    }
    console.log("Array is sorted.");
    return true; // Sorted
  };

  const clearAllTimeouts = () => {
    // Clear all timeouts in the timeoutsRef
    timeoutsRef.current.forEach((timeout) => clearTimeout(timeout));
    timeoutsRef.current = [];
  };

  const playAnimations = (animations) => {
    const arrayBars = document.getElementsByClassName("bar");

    animations.forEach(([i, j, isSwap], index) => {
      const timeout = setTimeout(() => {
        // Highlight bars being compared
        arrayBars[i].style.backgroundColor = "red";
        arrayBars[j].style.backgroundColor = "red";

        if (isSwap) {
          // Swap bar heights
          const tempHeight = arrayBars[i].style.height;
          arrayBars[i].style.height = arrayBars[j].style.height;
          arrayBars[j].style.height = tempHeight;
        }

        // Revert the colors after comparison
        setTimeout(() => {
          arrayBars[i].style.backgroundColor = "blue";
          arrayBars[j].style.backgroundColor = "blue";
        }, 500);
      }, index * 500);

      // Track the timeout ID
      timeoutsRef.current.push(timeout);
    });
  };

  const handleBubbleSort = () => {
    clearAllTimeouts(); // Stop any ongoing animations before sorting
    if (isSorted(array)) {
      alert("The array is already sorted!");
      console.log("No sorting performed.");
      return; // Exit early if the array is sorted
    }

    console.log("Sorting the array using Bubble sort algorithm...");
    const animations = bubbleSort([...array]);
    playAnimations(animations);

    // Update the state after sorting to reflect the sorted array
    const sortedArray = [...array].sort((a, b) => a - b); // Simulate sorted state
    setTimeout(() => setArray(sortedArray), animations.length * 500); // Update after animations
  };

  

  return (
    <div className="visualizer">
      <div className="bars">
        {array.map((value, idx) => (
          <div key={idx} className="bar" style={{ height: `${value}px` }}></div>
        ))}
      </div>
      <button onClick={generateArray}>Generate New Array</button>
      <button onClick={handleBubbleSort}>Bubble Sort</button>
    </div>
  );
};

export default Visualizer;

// 1. const generateArray = () => {}, 2. const isSorted = (array) => {}, 3. const clearAllTimeouts = () => {}
  //4. const playAnimations = (animations) => {}
//5. const handleBubbleSort = () => {}, 6. const handleQuickSort = () => {}