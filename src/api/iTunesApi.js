const getTopPodcasts = async () => {
  try {
    const response = await fetch(
      `https://api.allorigins.win/get?url=${encodeURIComponent(
        'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json'
      )}`
    );

    const data = await response.json();
    return JSON.parse(data.contents);
  } catch (e) {
    console.error(e);
  }
};

export default getTopPodcasts;
