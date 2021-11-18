import { useParams } from 'react-router-dom';

const PodcastEpisodeSection = ({ episodeList }) => {
  const { episodeId } = useParams();

  const episode = episodeList.find(episode => episode.trackId === Number(episodeId));

  return (
    <div className="podcast-episode">
      <div className="title">{episode.trackName}</div>
      <div className="description italic">{episode.description}</div>
      <audio controls>
        <source src={episode.previewUrl} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default PodcastEpisodeSection;
