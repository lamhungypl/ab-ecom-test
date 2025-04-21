'use client';
import Image, { ImageProps } from 'next/image';
import { useEffect, useState } from 'react';

const fallbackImage = '/placeholder.svg';

type Props = {
  fallback?: string;
} & ImageProps;
const ImageWithFallback = (props: Props) => {
  const { fallback = fallbackImage, alt, src, ...rest } = props;

  const [error, setError] = useState<boolean | null>(null);

  useEffect(() => {
    setError(null);
  }, [src]);

  return (
    <Image
      alt={alt}
      onError={() => {
        setError(true);
      }}
      src={error ? fallbackImage : src}
      {...rest}
    />
  );
};

export default ImageWithFallback;
