interface ShipType {
  length: number;
  name: string;
  isSunk: () => boolean;
  hit: () => void;
  getHits: () => number;
  changeCoordinates: (x: number, y: number) => void;
  coordinates: number[][];
}

function Ship(length: number, name: string): ShipType {
  let hits = 0;
  const coordinates: number[][] = [];

  // Check if ship is sunk
  function isSunk() {
    return hits === length;
  }

  // Hit the ship
  function hit() {
    if (isSunk()) throw new Error("Ship is sunk");
    hits += 1;
  }

  // Get the number of hits
  function getHits() {
    return hits;
  }

  function changeCoordinates(x: number, y: number) {
    coordinates.push([x, y]);
  }

  return {
    length,
    name,
    isSunk,
    hit,
    getHits,
    changeCoordinates,
    coordinates,
  };
}

export type { ShipType };
export default Ship;
