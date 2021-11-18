import { useNavigate, useParams } from 'react-router-dom';

const PodcastEpisodeListSection = ({ episodeList }) => {
  const navigate = useNavigate();
  const { podcastId } = useParams();

  if (!episodeList) {
    return null;
  }

  return (
    <div className="episode-list-section">
      <div className="episodes-counter">Episodes: {episodeList.length}</div>
      <div className="episode-list">
        <div className="header-row row">
          <div>Title</div>
          <div>Date</div>
          <div>Duration</div>
        </div>
        {episodeList.map((episode, index) => {
          const durationInHours = episode.trackTimeMillis / 3600000;
          const duration = `${Math.floor(durationInHours)}:${Math.floor((durationInHours % 1) * 60)
            .toString()
            .padStart(2, '0')}`;
          return (
            <div
              key={index}
              className="row episode pointer"
              onClick={() => navigate(`/podcast/${podcastId}/episode/${episode.trackId}`)}>
              <div className="bold-blue">{episode.trackName}</div>
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
