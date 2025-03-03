export interface Restaurant {
  id: number;
  email: string;
  nom: string;
  telephone: string;
  tables: Tablee[];
  reservations: Reservation[];
}

export interface Tablee {
  id: number;
  numTab: number;
  nbChaise: number;
  restaurantId: number;
  restaurant: Restaurant;
}

export interface Client {
  id: number;
  email: string;
  nom: string;
  telephone: string;
  reservation: Reservation[];
}

export interface Reservation {
  id: number;
  date: Date;
  nbPersonne: number;
  numTab: number;
  restaurant: Restaurant;
  restaurantId: number;
  client: Client;
  clientId: number;
  nomClient: string;
}
