import Image from 'next/image';
import Link from 'next/link';

interface AdProps {
  name: string;
  image: {
    url: string;
  };
  link: string;
}

export default function Ad({ name, image, link }: AdProps) {
  return (
    <Link href={link} className="block">
      <Image
        src={image.url}
        alt={name}
        width={300}
        height={250}
        className="w-full h-auto rounded-lg"
      />
    </Link>
  );
}

