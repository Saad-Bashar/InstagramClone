import {useState} from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';
import Comment from '../Comment';
import DoublePressable from '../DoublePressable';
import Carousel from '../Carousel';
import VideoPlayer from '../VideoPlayer';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {useNavigation} from '@react-navigation/native';
import {FeedNavigationProp} from '../../navigation/types';

import styles from './styles';
import {IPost} from '../../types/models';

interface IFeedPost {
  post: IPost;
  isVisible?: boolean;
}

const FeedPost = (props: IFeedPost) => {
  const {post, isVisible = false} = props;

  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(true);

  const navigation = useNavigation<FeedNavigationProp>();

  const navigateToUser = () => {
    navigation.navigate('UserProfile', {userId: post.user.id});
  };

  const navigateToComments = () => {
    navigation.navigate('Comments', {postId: post.id});
  };

  const toggleDescriptionExpanded = () => {
    setIsDescriptionExpanded(existingValue => !existingValue);
  };

  const toggleLike = () => {
    setIsLiked(v => !v);
  };

  let content;
  if (post.image) {
    content = (
      <Image
        source={{
          uri: post.image,
        }}
        style={styles.image}
      />
    );
  } else if (post.images) {
    content = <Carousel images={post.images} />;
  } else if (post.video) {
    content = <VideoPlayer uri={post.video} paused={!isVisible} />;
  }

  return (
    <View style={styles.post}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{
            uri: post.user.image,
          }}
          style={styles.userAvatar}
        />
        <Text onPress={navigateToUser} style={styles.userName}>
          {post.user.username}
        </Text>

        <Entypo
          name="dots-three-horizontal"
          size={16}
          style={styles.threeDots}
        />
      </View>

      {/* Content */}
      <DoublePressable onDoublePress={toggleLike}>{content}</DoublePressable>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.iconContainer}>
          <Pressable onPress={toggleLike}>
            <AntDesign
              name={isLiked ? 'heart' : 'hearto'}
              size={24}
              style={styles.icon}
              color={isLiked ? colors.accent : colors.black}
            />
          </Pressable>
          <Ionicons
            name="chatbubble-outline"
            size={24}
            style={styles.icon}
            color={colors.black}
          />
          <Feather
            name="send"
            size={24}
            style={styles.icon}
            color={colors.black}
          />

          <Feather
            name="bookmark"
            size={24}
            style={{marginLeft: 'auto'}}
            color={colors.black}
          />
        </View>

        {/* Likes */}
        <Text style={styles.text}>
          Liked by <Text style={styles.bold}>lgrinevicius</Text> and{' '}
          <Text style={styles.bold}>{post.nofLikes} others</Text>
        </Text>

        {/* Post description */}
        <Text style={styles.text} numberOfLines={isDescriptionExpanded ? 0 : 3}>
          <Text style={styles.bold}>{post.user.username}</Text>{' '}
          {post.description}
        </Text>
        <Text onPress={toggleDescriptionExpanded}>
          {isDescriptionExpanded ? 'less' : 'more'}
        </Text>

        {/* Comments */}
        <Text onPress={navigateToComments}>
          View all {post.nofComments} comments
        </Text>
        {post.comments.map(comment => (
          <Comment key={comment.id} comment={comment} />
        ))}

        {/* Posted date */}
        <Text>{post.createdAt}</Text>
      </View>
    </View>
  );
};

export default FeedPost;
