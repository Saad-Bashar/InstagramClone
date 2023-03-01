import {
  FlatList,
  SafeAreaView,
  ViewabilityConfig,
  ViewToken,
} from 'react-native';
import FeedPost from '../../components/FeedPost';
import posts from '../../assets/data/posts.json';
import {useRef, useState} from 'react';

const HomeScreen = props => {
  const [activePostId, setActivePostId] = useState<null | string>(null);

  const viewabilityConfig: ViewabilityConfig = {
    itemVisiblePercentThreshold: 51,
  };

  const onViewableItemsChanged = useRef(
    ({viewableItems}: {viewableItems: Array<ViewToken>}) => {
      if (viewableItems.length > 0) {
        setActivePostId(viewableItems[0].item.id);
      }
    },
  );
  return (
    <SafeAreaView>
      <FlatList
        data={posts}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          // @ts-ignore
          <FeedPost isVisible={item.id === activePostId} post={item} />
        )}
        showsVerticalScrollIndicator={false}
        viewabilityConfig={viewabilityConfig}
        onViewableItemsChanged={onViewableItemsChanged.current}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
