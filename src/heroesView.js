import HeroList from "./heroList";
import useFetch from "./useFetch";

const HeroesView = () => {
  const { data: heroes, isPending, error } = useFetch("http://localhost:8000/heroes");

  return (
    <div className="dash-board">
      {error && <div>{error}</div>}
      <h2>All Heroes</h2>
      {isPending && <div>Loading...</div>}
      {heroes && <HeroList heroes={heroes} />}
    </div>
  );
}

export default HeroesView;
