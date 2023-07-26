function Games({ game_indices }: any) {
  return (
    <div>
      <h3>Games</h3>
      <ul>
        {game_indices.map((game: any, index: number) => {
          return <li key={index}>{game.version.name}</li>;
        })}
      </ul>
    </div>
  );
}

export default Games;
