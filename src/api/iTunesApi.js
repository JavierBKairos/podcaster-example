const getTopPodcasts = async () => {
  try {
    const response = await fetch(
      `https://api.allorigins.win/get?url=${encodeURIComponent(
        'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json'
      )}`
    );

    const data = await response.json();
    return JSON.parse(data.contents)?.feed?.entry;
  } catch (e) {
    console.error(e);
  }
};

const getPodcast = async podcastId => {
  try {
    const response = await fetch(
      `https://api.allorigins.win/get?url=${encodeURIComponent(
        `https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=100`
      )}`
    );

    const data = await response.json();
    const podcastInfo = JSON.parse(data.contents)?.results;
    return podcastInfo;
  } catch (e) {
    console.error(e);
  }
};

export { getTopPodcasts, getPodcast };
