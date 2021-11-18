import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPodcast } from '../../api/iTunesApi';
import PodcastEpisodeSection from '../sections/PodcastEpisodeSection';
import PodcastEpisodeListSection from '../sections/PodcastEpisodeListSection';

const PodcastView = () => {
  const navigate = useNavigate();
  const { podcastId, episodeId } = useParams();

  const [podcast, setPodcast] = useState([]);

  useEffect(() => {
    (async () => {
      const responsePodcast = await getPodcast(podcastId);
      setPodcast(responsePodcast);
    })();
  }, [podcastId, episodeId]);

  const [, ...episodeList] = podcast;
  const PodcastSection = () =>
    episodeId ? (
      <PodcastEpisodeSection episodeList={episodeList} />
    ) : (
      <PodcastEpisodeListSection episodeList={episodeList} />
    );

  return (
    <>
      <div className="header">
        <span className="pointer" onClick={() => navigate('/')}>Podcaster</span>
      </div>

      {!!podcast.length && (
        <div className="podcast-detail">
          <div className="descriptive-podcast-card">
            <img
              className="pointer"
              onClick={() => navigate(`/podcast/${podcastId}`)}
              alt={podcast[0].collectionName}
              src={podcast[0].artworkUrl600}
            />

            <div className="title">{podcast[0].collectionName}</div>
            <div className="italic">{`by ${podcast[0].artistName}`}</div>

            <div className="title">Description:</div>
            <p className="italic">{podcast[0].trackName}</p>
          </div>
          <PodcastSection />
        </div>
      )}
    </>
  );
};

export default PodcastView;
