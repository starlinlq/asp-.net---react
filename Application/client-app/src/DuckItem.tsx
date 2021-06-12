import { Duck, ducks } from "./demo";

interface Props {
  duck: Duck;
}
export const DuckItem = ({ duck }: Props) => {
  return (
    <div >
      <p>{duck.name}</p>
      <p>{duck.numLegs}</p>
      <button onClick={() => duck.makeSound!(duck.name + "quack")}>
        make sound
      </button>
    </div>
  );
};
