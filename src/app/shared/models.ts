export interface Deck {
  id: number;
  title: string;
  color: string;
  backSide: boolean;
  empty: boolean;
  accentIcons: any[];
  accentColor: string;
  iconColor: string;
}

export class Card {
  position?: { x: number; y: number };
  magnified!: boolean;

  constructor(public id: number, public side: string, public deckId: number) {}
}
