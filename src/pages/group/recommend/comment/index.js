import React from 'react';
import { View, Text } from 'react-native';
import NavHerder from '../../../../components/NavHeader';
import Button from '../../../../components/LGButton';
import DynamicCard from '../../components/dynamicCard';
import { pxToDp } from '../../../../utils/stylesKits';
import styles from './style';

const Comment = (props) => {
  const { route: { params } } = props;
  console.log(params, 'params---=-=---=-===')

  return (
    <>
      <NavHerder title='最新评论' />
      <View style={styles.container}>
        <DynamicCard user={params} />
        <View style={styles.newCommentWrap}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text>最新评论</Text>
            <Text style={styles.badge}>1</Text>
          </View>
          <Button
            style={styles.btn}
            textStyle={styles.btnText}
          >
            发表评论
          </Button>
        </View>
      </View>
    </>
  );
}

export default Comment;
