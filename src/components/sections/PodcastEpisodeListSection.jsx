import { useNavigate, useParams } from 'react-router-dom';

const PodcastEpisodeListSection = ({ episodeList }) => {
  const navigate = useNavigate();
  const { podcastId } = useParams();

  if (!episodeList) {
    return null;
  }

  return (
    <div className="episode-list-section">
      <div className="episodes-counter">Episodios: {episodeList.length}</div>
      <div className="episode-list">
        <div className="header-row row">
          <div>Título</div>
          <div>Fecha</div>
          <div>Duración</div>
        </div>
        {episodeList.map((episode, index) => {
          const durationInHours = episode.trackTimeMillis / 3600000;
          const duration = `${Math.floor(durationInHours)}:${Math.floor((durationInHours % 1) * 60)
            .toString()
            .padStart(2, '0')}`;
          return (
            <div
              key={index}
              className="row episode"
              onClick={() => navigate(`/podcast/${podcastId}/episode/${episode.trackId}`)}>
              <div>{episode.trackName}</div>
              <div>{episode.releaseDate.split('T')[0]}</div>
              <div>{duration}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PodcastEpisodeListSection;
