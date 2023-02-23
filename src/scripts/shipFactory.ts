interface ShipType {
  length: number;
  name: string;
  isSunk: () => boolean;
  hit: () => void;
  getHits: () => number;
}

function Ship(length: number, name: string): ShipType {
  let hits = 0;

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

  return {
    length,
    name,
    isSunk,
    hit,
    getHits,
  };
}

export type { ShipType };
export default Ship;
