import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './assets/common.css';

import PodcastList from './components/views/PodcastList';
import PodcastView from './components/views/PodcastView';

const MainRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<PodcastList />} />
      <Route path="/podcast/:podcastId/episode/:episodeId" element={<PodcastView />} />
      <Route path="/podcast/:podcastId" element={<PodcastView />} />
    </Routes>
  </BrowserRouter>
);

export default MainRouter;
