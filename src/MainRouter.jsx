import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './assets/common.css';

import PodcastList from './components/views/PodcastList';
import Podcast from './components/views/Podcast';

const MainRouter = () => (
  <>
    <div className="header">Podcaster</div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PodcastList />} />
        <Route path="/podcast/:podcastId" element={<Podcast />} />
      </Routes>
    </BrowserRouter>
  </>
);

export default MainRouter;
