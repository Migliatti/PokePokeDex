function MoveList({ moves }: any) {
  return (
    <>
      <h3>Moves</h3>
      {moves.map((move: any, index: number) => {
        return (
          <div key={index}>
            <h4>{move.move.name}</h4>
          </div>
        );
      })}
    </>
  );
}

export default MoveList;
