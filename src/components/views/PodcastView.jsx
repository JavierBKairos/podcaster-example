import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPodcast } from '../../api/iTunesApi';
import PodcastEpisodeSection from '../sections/PodcastEpisodeSection';
import PodcastEpisodeListSection from '../sections/PodcastEpisodeListSection';
import Header from '../common/Header';

export const DescriptivePodcastCard = ({ podcast, navigate }) => {
  return (
    <div className="descriptive-podcast-card">
      <img
        className="pointer"
        onClick={() => navigate(`/podcast/${podcast.collectionId}`)}
        alt={podcast.collectionName}
        src={podcast.artworkUrl600}
      />

      <div className="title pointer" onClick={() => navigate(`/podcast/${podcast.collectionId}`)}>
        {podcast.collectionName}
      </div>
      <div className="italic pointer" onClick={() => navigate(`/podcast/${podcast.collectionId}`)}>
        {`by ${podcast.artistName}`}
      </div>

      <div className="title">Description:</div>
      <p className="italic">{podcast.trackName}</p>
    </div>
  );
};

const PodcastView = () => {
  const navigate = useNavigate();
  const { podcastId, episodeId } = useParams();

  const [loading, setLoading] = useState(true);
  const [podcast, setPodcast] = useState([]);

  useEffect(() => {
    (async () => {
      const responsePodcast = await getPodcast(podcastId);
      if (responsePodcast) {
        setPodcast(responsePodcast);
        setLoading(false);
      } else {
        navigate('/error');
      }
    })();
  }, [podcastId, episodeId, navigate]);

  const [, ...episodeList] = podcast || [];
  const PodcastSection = () =>
    episodeId ? (
      <PodcastEpisodeSection episodeList={episodeList} />
    ) : (
      <PodcastEpisodeListSection episodeList={episodeList} />
    );

  return (
    <>
      <Header navigate={navigate} loading={loading} />
      {!loading && (
        <div className="podcast-detail">
          <DescriptivePodcastCard podcast={podcast[0]} navigate={navigate} />
          <PodcastSection />
        </div>
      )}
    </>
  );
};

export default PodcastView;
