export function bubbleSort(array) {
  // Bubble Sort Algorithm
  // Returns an array of animations for visualizing the sorting process
  // Each animation is represented as [index1, index2, isSwap]
// Initialize an empty array to hold the animations
  const animations = [];//1

  const auxArray = [...array];//2
  // auxArray is a copy of the input array to avoid mutating the original array
  // This is important for visualizing the sorting process without altering the original data
  // The animations array will hold pairs of indices being compared and whether they are swapped
  // Bubble Sort Logic
  const n = auxArray.length;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Push indices being compared
      animations.push([j, j + 1, false]);

      if (auxArray[j] > auxArray[j + 1]) {
        // Swap and record the animation
        animations.push([j, j + 1, true]); // Swap animation
        [auxArray[j], auxArray[j + 1]] = [auxArray[j + 1], auxArray[j]];
      }
    }
  }

  return animations;
}
