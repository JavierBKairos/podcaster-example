import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './assets/common.css';

import PodcastListView from './components/views/PodcastListView';
import PodcastView from './components/views/PodcastView';

const MainRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<PodcastListView />} />
      <Route path="/podcast/:podcastId/episode/:episodeId" element={<PodcastView />} />
      <Route path="/podcast/:podcastId" element={<PodcastView />} />
    </Routes>
  </BrowserRouter>
);

export default MainRouter;
