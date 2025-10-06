import React from 'react';
import { getStrapiMedia } from '../../../utils/strapiUtils';

const ImageBlock = ({ data }) => {
  if (!data?.image) return null;
  const imageUrl = getStrapiMedia(data.image);
  return (
    <figure className="my-8">
      <img src={imageUrl} alt={data.caption || ''} className="rounded-lg shadow-lg" />
      {data.caption && <figcaption className="text-center text-sm text-gray-500 mt-2">{data.caption}</figcaption>}
    </figure>
  );
};

export default ImageBlock;