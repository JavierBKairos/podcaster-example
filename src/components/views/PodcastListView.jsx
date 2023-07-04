import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTopPodcasts } from '../../api/iTunesApi';
import Header from '../common/Header';

const Filter = ({ filteredPodcasts, setFilter }) => (
  <div className="filter">
    <span className="counter">{filteredPodcasts.length}</span>
    <input
      placeholder="Filter podcasts..."
      onChange={e => {
        setFilter(e.target?.value);
      }}
    />
  </div>
);

export const PodcastCard = ({ podcast, navigate }) => {
  return (
    <div
      className="podcast-card"
      onClick={() => navigate(`/podcast/${podcast?.id?.attributes?.['im:id']}`)}>
      <img alt={podcast['im:name']?.label} src={podcast['im:image']?.[2]?.label} />
      <div className="padding-m">
        <div className="title">{podcast['im:name']?.label}</div>
        <div className="author">{`Author: ${podcast['im:artist']?.label}`}</div>
      </div>
    </div>
  );
};

export const PodcastTopList = ({ filteredPodcasts, navigate }) => {
  return (
    <div className="four-columns">
      {filteredPodcasts.map((podcast, index) => (
        <div className="podcast-cell" key={index}>
          <PodcastCard podcast={podcast} navigate={navigate} />
        </div>
      ))}
    </div>
  );
};

const PodcastListView = () => {
  const navigate = useNavigate();
  const [topPodcasts, setTopPodcasts] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const responseTopPodcasts = await getTopPodcasts();
      setTopPodcasts(responseTopPodcasts);
      setLoading(false);
    })();
  }, []);

  const filteredPodcasts = topPodcasts?.filter(podcast => {
    return (
      !filter ||
      podcast['im:name'].label.toLowerCase().includes(filter) ||
      podcast['im:artist'].label.toLowerCase().includes(filter)
    );
  });

  return (
    <>
      <Header navigate={navigate} loading={loading} />
      {!loading && (
        <>
          <Filter setFilter={setFilter} filteredPodcasts={filteredPodcasts} />
          <PodcastTopList filteredPodcasts={filteredPodcasts} navigate={navigate} />
        </>
      )}
    </>
  );
};

export default PodcastListView;
