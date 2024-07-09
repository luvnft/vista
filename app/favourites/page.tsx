import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import prisma from '../lib/db';
import { redirect } from 'next/navigation';
import NoItem from '../components/home/NoItem';
import ListingCard from '../components/home/ListingCard';
import { unstable_noStore as noStore } from 'next/cache';

async function getLoveData(userId: string) {
  noStore();
  const data = await prisma.favourite.findMany({
    where: {
      userId,
    },
    select: {
      Home: {
        select: {
          id: true,
          photo: true,
          Favourite: true,
          price: true,
          description: true,
          country: true,
        },
      },
    },
  });

  return data;
}

const LovePage = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) return redirect('/');

  const loveData = await getLoveData(user.id);

  return (
    <section className="container mx-auto px-5 lg:px-10 mt-10 mb-[50px]">
      <h2 className="text-3xl font-semibold tracking-tight">Your Loves</h2>

      {loveData.length === 0 ? (
        <NoItem
          title="Sorry, no rental homes were found in your love list..."
          description="Please love a property and come back!"
        />
      ) : (
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-8 mt-10">
          {loveData.map((item) => (
            <ListingCard
              key={item.Home?.id}
              description={item.Home?.description as string}
              location={item.Home?.country as string}
              pathName="/loves"
              homeId={item.Home?.id as string}
              imagePath={item.Home?.photo as string}
              price={item.Home?.price as number}
              userId={user?.id}
              favouriteId={item.Home?.Favourite[0].id as string}
              isInFavouriteList={
                (item.Home?.Favourite.length as number) > 0 ? true : false
              }
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default LovePage;
