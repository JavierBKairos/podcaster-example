const DAY_IN_MILLISECONDS = 86400000;
const getTopPodcasts = async () => {
  const cache = localStorage.getTopPodcasts ? JSON.parse(localStorage.getTopPodcasts) : null;
  const isCacheValid = cache && Date.now() - cache.time < DAY_IN_MILLISECONDS;
  if (isCacheValid) {
    return cache.response;
  } else {
    try {
      const response = await fetch(
        `https://api.allorigins.win/get?url=${encodeURIComponent(
          'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json'
        )}`
      );

      const data = await response.json();
      const formattedData = JSON.parse(data.contents)?.feed?.entry;
      localStorage.getTopPodcasts = JSON.stringify({ response: formattedData, time: Date.now() });
      return formattedData;
    } catch (e) {
      console.error(e);
    }
  }
};

const getPodcast = async podcastId => {
  const cache = localStorage[`getPodcast-${podcastId}`]
    ? JSON.parse(localStorage[`getPodcast-${podcastId}`])
    : null;
  const isCacheValid = cache && Date.now() - cache.time < DAY_IN_MILLISECONDS;
  if (isCacheValid) {
    return cache.response;
  } else {
    try {
      const response = await fetch(
        `https://api.allorigins.win/get?url=${encodeURIComponent(
          `https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=100`
        )}`
      );

      const data = await response.json();
      const podcastInfo = JSON.parse(data.contents)?.results;
      localStorage[`getPodcast-${podcastId}`] = JSON.stringify({
        response: podcastInfo,
        time: Date.now(),
      });
      return podcastInfo;
    } catch (e) {
      console.error(e);
    }
  }
};

export { getTopPodcasts, getPodcast };
