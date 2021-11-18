import React from 'react';
import renderer from 'react-test-renderer';

import Header from '../components/common/Header';
import { PodcastTopList, PodcastCard } from '../components/views/PodcastListView';
import { DescriptivePodcastCard } from '../components/views/PodcastView';

import { PodcastTopListMock, PodcastCardMock, DescriptivePodcastCardMock } from './mocks';

it('Headers renders', () => {
  const tree = renderer.create(<Header loading={true} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('PodcastCard renders', () => {
  const tree = renderer
    .create(
      <PodcastCard
        podcast={PodcastCardMock}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('PodcastTopList renders', () => {
  const tree = renderer.create(<PodcastTopList filteredPodcasts={PodcastTopListMock} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('DescriptivePodcastCard renders', () => {
  const tree = renderer.create(<DescriptivePodcastCard podcast={DescriptivePodcastCardMock} />).toJSON();
  expect(tree).toMatchSnapshot();
});
