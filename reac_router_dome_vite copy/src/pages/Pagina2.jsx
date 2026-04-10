
import { ButtonProps, ButtonChildren } from "../components/Button";
import { CardProps, CardChildren } from "../components/Card";

function Pagina2() {
  const container = { display: "flex", flexDirection: "column", gap: "1rem" };
  return (
    <div style={container}>
      <div>Soy otra página</div>

      <CardProps
        title="React es maravilloso"
        description="Este texto se pasa como props  ."
      />
      <ButtonProps color="blue" label="texto button como props" />

      <CardChildren title="React es poderoso">
        <p>Este texto se pasa como children.</p>
        <button>Y este button tbe se pasa como children</button>
      </CardChildren>
      <ButtonChildren color="red">texto button como children</ButtonChildren>
    </div>
  );
}
export default Pagina2;