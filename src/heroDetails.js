import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import useFetch from './useFetch';

const HeroDetails = () => {
  const { id } = useParams();
  const { data: hero, error, setData: setHero } = useFetch("http://localhost:8000/heroes/" + id);
  const [newName, setNewName] = useState('');
  const [newUniverse, setNewUniverse] = useState('');
  const history = useHistory();
  const [isPending, setIsPending] = useState(false);

  const handleUpdateHero = (e) => {
    e.preventDefault();
    setIsPending(true);

    const updatedHero = {
      ...hero,
      title: newName ? newName : hero.title,
      universe: newUniverse ? newUniverse : hero.universe,
    };

    fetch('http://localhost:8000/heroes/' + id, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedHero)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to update hero');
      }
      return response.json();
    })
    .then(updatedHero => {
      console.log('Hero updated successfully');
      setHero(updatedHero);
      setIsPending(false);
      history.push('/');
    })
    .catch(error => {
      console.error('Error updating hero:', error);
      setIsPending(false);
    });
  };

  return (
    <div className="hero-details">
      <h2>Hero Details - {id}</h2>
      {error && <div>{error}</div>}
      {hero && (
        <form onSubmit={handleUpdateHero}>
          <label>Change Name:</label>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Enter new name"
          />
          <label>Change Universe:</label>
          <input
            type="text"
            value={newUniverse}
            onChange={(e) => setNewUniverse(e.target.value)}
            placeholder="Enter new universe"
          />
          {!isPending && <button>Update Hero</button>}
          {isPending && <button disabled>Updating...</button>}
        </form>
      )}
      {isPending && <div>Loading...</div>}
    </div>
  );
}

export default HeroDetails;
