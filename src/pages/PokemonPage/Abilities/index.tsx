interface Props {
  abilities: Array<any>;
}

function Abilities({ abilities }: Props) {
  return (
    <div>
      {abilities.length > 1 ? <div>Abilities</div> : <div>Ability</div>}
      {abilities.map((ability: any, index: number) => {
        const name =
          ability.ability.name[0].toUpperCase() +
          ability.ability.name.substr(1);
        return <div key={index}>{name}</div>;
      })}
    </div>
  );
}

export default Abilities;
