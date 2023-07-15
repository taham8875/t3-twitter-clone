import InfiniteScroll from "react-infinite-scroll-component";
import { api } from "~/utils/api";

const InfiniteTweetsList = () => {
  const dateFormatter = new Intl.DateTimeFormat("en-US");

  const { isLoading, isError, data, hasNextPage, fetchNextPage } =
    api.tweet.infiniteTweets.useInfiniteQuery(
      {},
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      }
    );

  const tweets = data?.pages.flatMap((page) => page.tweets);

  console.log("tweets", tweets);

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error</div>;

  if (tweets == null) return <h2 className="text-2xl font-bold">No tweets</h2>;

  return (
    <InfiniteScroll
      dataLength={tweets.length}
      next={() => void fetchNextPage()}
      hasMore={hasNextPage}
      loader={<h4>Loading...</h4>}
    >
      {tweets.map((tweet) => (
        <div key={tweet.id} className="flex flex-col">
          <div className="flex items-center gap-2">
            <img
              src={tweet.author.image}
              alt="Profile Picture"
              className="h-12 w-12 rounded-full"
            />
            <div className="flex flex-col">
              <span className="font-bold">{tweet.author.name}</span>
              <span className="text-gray-500">{tweet.author.name}</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span>{tweet.content}</span>
            <span className="text-gray-500">
              {dateFormatter.format(tweet.createdAt)}
            </span>
          </div>
        </div>
      ))}
    </InfiniteScroll>
  );
};

export default InfiniteTweetsList;
