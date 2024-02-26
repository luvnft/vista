'use client';
import { categoryItems } from '../lib/categoryItems';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

const MapFilterItems = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get('filter');
  const pathName = usePathname();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  return (
    <div className="flex gap-x-10 mt-5 w-full overflow-x-scroll no-scrollbar">
      {categoryItems.map((item) => (
        <Link
          key={item.id}
          href={`${pathName}?${createQueryString('filter', item.name)}`}
        >
          <div className="relative w-6 h-6">
            <Image
              src={item.imageUrl}
              alt="category image"
              className="w-6 h-6"
              width={24}
              height={24}
            />
          </div>
          <p className="text-xs font-medium">{item.title}</p>
        </Link>
      ))}
    </div>
  );
};

export default MapFilterItems;
