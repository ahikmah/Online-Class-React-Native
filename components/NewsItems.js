import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Dimensions, Image} from 'react-native';
import Carousel, {PaginationLight} from 'react-native-x2-carousel';
import {NEWS_API, NEWS_API_KEY} from '@env';
import axios from 'axios';
function NewsItems() {
  const [articles, setArticles] = useState();
  useEffect(() => {
    axios
      .get(
        `${NEWS_API}/top-headlines?country=us&category=technology&apiKey=${NEWS_API_KEY}`,
      )
      .then(res => setArticles(res.data.articles))
      .catch(err => console.log(err));
  }, []);
  let renderItem;
  const size = 5;
  if (articles) {
    renderItem = data => (
      <View key={data.title} style={styles.item}>
        <Image source={{uri: data.urlToImage}} style={styles.image} />
        <View style={styles.overlay} />
        <Text style={styles.title}>{data.title}</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Carousel
        pagination={PaginationLight}
        renderItem={renderItem ? renderItem : () => {}}
        data={articles && articles.slice(0, size)}
        autoplay={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: 20,
    marginTop: 16,
  },
  item: {
    width: Dimensions.get('window').width - 13,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  title: {
    fontFamily: 'Montserrat-Bold',
    position: 'absolute',
    zIndex: 1,
    fontSize: 15,
    bottom: 0,
    color: 'white',
    padding: 23,
    // paddingBottom: 20,
  },
  overlay: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.41)',
    zIndex: 1,
    top: 0,
    borderRadius: 20,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 20,
  },
});

export default NewsItems;
