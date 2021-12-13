export interface Deck {
  id: number;
  title: string;
  color: string;
  backSide: boolean;
  empty: boolean;
}

// export interface Card {
//   id: number;
//   side: string;
//   position?: { x: number; y: number };
// }

export class Card {
  position?: { x: number; y: number };
  magnified!: boolean;

  constructor(public id: number, public side: string, public deckId?: number) {}
}
