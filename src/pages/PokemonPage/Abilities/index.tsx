function Abilities({ abilities }: any) {
  return (
    <div>
      {abilities.length > 1 ? <h3>Abilities</h3> : <h3>Ability</h3>}
      <ul>
        {abilities.map((ability: any, index: number) => {
          const name =
            ability.ability.name[0].toUpperCase() +
            ability.ability.name.substr(1);
          return <li key={index}>{name}</li>;
        })}
      </ul>
    </div>
  );
}

export default Abilities;
