import HeroList from "./heroList";
import useFetch from "./useFetch";

const Dashboard = () => {
  const { data: heroes, isPending, error } = useFetch("http://localhost:8000/heroes");

  return (
    <div className="home">
      {error && <div>{error}</div>}
      <h2>Dashboard</h2>
      {isPending && <div>Loading...</div>} 
      {heroes && <HeroList heroes={heroes.filter((hero) => hero.class === "top")} title="Top Heroes"/>}
    </div>
  );
}

export default Dashboard;
