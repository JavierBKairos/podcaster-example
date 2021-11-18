import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTopPodcasts } from '../../api/iTunesApi';

const PodcastList = () => {
  const [topPodcasts, setTopPodcasts] = useState([]);
  const [filter, setFilter] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const responseTopPodcasts = await getTopPodcasts();
      setTopPodcasts(responseTopPodcasts);
    })();
  }, []);

  const handleFilter = e => {
    setFilter(e.target?.value);
  };

  const filteredPodcasts = topPodcasts?.filter(podcast => {
    return (
      !filter ||
      podcast['im:name'].label.toLowerCase().includes(filter) ||
      podcast['im:artist'].label.toLowerCase().includes(filter)
    );
  });

  return (
    <>
      <div className="header">
        <span className="pointer" onClick={() => navigate('/')}>Podcaster</span>
      </div>

      {!!topPodcasts?.length && (
        <>
          <div className="filter">
            <span className="counter">{filteredPodcasts.length}</span>
            <input placeholder="Filter podcasts..." onChange={handleFilter} />
          </div>
          <div className="four-columns">
            {filteredPodcasts.map((podcast, index) => (
              <div className="podcast-cell" key={index}>
                <div
                  className="podcast-card"
                  key={index}
                  onClick={() => navigate(`/podcast/${podcast?.id?.attributes?.['im:id']}`)}>
                  <img alt={podcast['im:name']?.label} src={podcast['im:image']?.[2]?.label} />
                  <div className="padding-m">
                    <div className="title">{podcast['im:name']?.label}</div>
                    <div className="author">{`Author: ${podcast['im:artist']?.label}`}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default PodcastList;
