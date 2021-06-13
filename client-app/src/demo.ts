
// the ? makes the method or value optional
export interface Duck {
    name: string;
    numLegs: number;
    makeSound?: (sound: string | number) => void;
}

const duck1: Duck = {
  name: "ducky",
  numLegs: 2,
  makeSound: (sound: string | number) => {
    console.log(sound);
  },
};

const duck2 : Duck = {
  name: "dewey",
  numLegs: 2,
  makeSound: (sound: string | number) => {
    console.log(sound);
  },
};

//use exclamation mark to overrride the conditional check
duck1.makeSound!("hell");

export const ducks = [duck1, duck2];
