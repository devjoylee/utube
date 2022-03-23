import React from 'react';
import { useNavigate } from 'react-router-dom';
import { VideoItem } from './VideoItem';
import { ChannelItem } from './ChannelItem';
import './_item.scss';

export const ItemTemplate = ({ item, type }) => {
  const itemId = item.id?.videoId || item.id?.channelId;
  const itemType = item.id.kind === 'youtube#video' ? 'video' : 'channel';

  const navigate = useNavigate();

  const handleItemClick = () => {
    navigate(`/watch/${itemId}`);
  };

  return (
    <li className={`item ${itemType}_item`} onClick={handleItemClick}>
      {itemType === 'video' ? <VideoItem type={type} item={item} /> : <ChannelItem item={item} />}
    </li>
  );
};
