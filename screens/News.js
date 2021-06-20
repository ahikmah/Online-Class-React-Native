/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  Image,
  Pressable,
  ScrollView,
} from 'react-native';
import {Button, Icon} from 'native-base';
import {NEWS_API, NEWS_API_KEY} from '@env';
import axios from 'axios';

// https://newsapi.org/v2/top-headlines?country=us&category=&apiKey=28b38422780f4c9d8ba0e1c2e0f7ab6d
function News() {
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [articles, setArticles] = useState();
  const scrollRef = useRef();
  // let icon_name;
  // if (selectedCategory === 'general') {
  //   icon_name = 'hot';
  // } else if (selectedCategory === 'technology') {
  //   icon_name = 'software';
  // } else if (selectedCategory === 'science') {
  //   icon_name = 'science';
  // } else if (selectedCategory === 'business') {
  //   icon_name = 'business';
  // }
  useEffect(() => {
    axios
      .get(
        `${NEWS_API}/top-headlines?country=us&category=${selectedCategory}&apiKey=${NEWS_API_KEY}`,
      )
      .then(res => setArticles(res.data.articles))
      .catch(err => console.log(err));
  }, []);
  useEffect(() => {
    axios
      .get(
        `${NEWS_API}/top-headlines?country=us&category=${selectedCategory}&apiKey=${NEWS_API_KEY}`,
      )
      .then(res => setArticles(res.data.articles))
      .catch(err => console.log(err));
  }, [selectedCategory]);
  // console.log(articles.title);
  let arcticleItem;
  if (articles) {
    arcticleItem =
      articles &&
      articles.map(item => {
        return (
          <View key={item.title} style={styles.itemWrapper}>
            <Image style={styles.thumbnail} source={{uri: item.urlToImage}} />

            <View style={styles.rightSide}>
              <Text style={styles.newsTitle}>{item.title}</Text>
              <Image
                source={
                  selectedCategory === 'general'
                    ? require('../assets/images/news-hot.png')
                    : selectedCategory === 'technology'
                    ? require('../assets/images/news-software.png')
                    : selectedCategory === 'science'
                    ? require('../assets/images/news-science.png')
                    : selectedCategory === 'business'
                    ? require('../assets/images/news-finance.png')
                    : null
                }
                style={styles.subCategoryIcon}
              />
            </View>
          </View>
        );
      });
  }
  return (
    <>
      <StatusBar
        translucent
        backgroundColor="#F9F9F9"
        barStyle="dark-content"
      />
      <View style={styles.container}>
        <View style={styles.topSection}>
          <Text style={styles.pageTitle}>Categories</Text>
          <View style={styles.categoryWrapper}>
            <View style={styles.categoryGroup}>
              <Pressable onPress={() => setSelectedCategory('general')}>
                <Image
                  style={
                    selectedCategory === 'general'
                      ? styles.active
                      : styles.categoryIcon
                  }
                  source={require('../assets/images/news-hot.png')}
                />
              </Pressable>
              <Text style={styles.categoryLabel}>Hot</Text>
            </View>
            <View style={styles.categoryGroup}>
              <Pressable onPress={() => setSelectedCategory('technology')}>
                <Image
                  style={
                    selectedCategory === 'technology'
                      ? styles.active
                      : styles.categoryIcon
                  }
                  source={require('../assets/images/news-software.png')}
                />
              </Pressable>
              <Text style={styles.categoryLabel}>Software</Text>
            </View>
            <View style={styles.categoryGroup}>
              <Pressable onPress={() => setSelectedCategory('science')}>
                <Image
                  style={
                    selectedCategory === 'science'
                      ? styles.active
                      : styles.categoryIcon
                  }
                  source={require('../assets/images/news-science.png')}
                />
              </Pressable>
              <Text style={styles.categoryLabel}>Science</Text>
            </View>
            <View style={styles.categoryGroup}>
              <Pressable onPress={() => setSelectedCategory('business')}>
                <Image
                  style={
                    selectedCategory === 'business'
                      ? styles.active
                      : styles.categoryIcon
                  }
                  source={require('../assets/images/news-finance.png')}
                />
              </Pressable>
              <Text style={styles.categoryLabel}>Finance</Text>
            </View>
          </View>
        </View>

        <ScrollView ref={scrollRef} style={styles.mainSection}>
          {arcticleItem}
        </ScrollView>
        <View>
          <Button
            style={styles.btnBackToTop}
            onPress={() => {
              scrollRef.current?.scrollTo({
                y: 0,
                animated: true,
              });
            }}>
            <Icon name="arrow-up" style={{textAlign: 'center'}} />
          </Button>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E5E5E5',
    flex: 1,
  },

  topSection: {
    paddingHorizontal: 24,
    paddingTop: StatusBar.currentHeight + 12,
    backgroundColor: '#F9F9F9',
  },

  pageTitle: {
    fontFamily: 'Kanit-Medium',
    color: '#000',
    fontSize: 24,
  },

  categoryWrapper: {
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  categoryGroup: {
    alignItems: 'center',
  },
  categoryIcon: {
    height: 64,
    width: 64,
    borderRadius: 32,
  },
  categoryLabel: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
  },

  active: {
    borderRadius: 32,
    borderWidth: 3,
    borderColor: '#099FFF',
  },

  mainSection: {
    backgroundColor: '#F9F9F9',
    marginTop: 5,
    paddingHorizontal: 24,
    paddingBottom: 300,
    // flex: 1,
  },

  itemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginVertical: 10,
    width: '100%',
  },

  thumbnail: {
    width: 100,
    height: 80,
    borderRadius: 10,
  },

  rightSide: {
    flexDirection: 'column',
    marginLeft: 12,
    width: '70%',
  },

  newsTitle: {
    fontFamily: 'Roboto-Medium',
    fontSize: 15,
  },

  subCategoryWrapper: {flexDirection: 'row'},
  subCategoryIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  btnBackToTop: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: '#5784BA',
    position: 'absolute',
    bottom: 10,
    right: 10,
    zIndex: 100,
  },
});

export default News;
