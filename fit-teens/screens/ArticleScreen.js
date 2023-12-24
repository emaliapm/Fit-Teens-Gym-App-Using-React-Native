// ArticleScreen.js
import React from 'react';
import { View, ScrollView, Image, Text, StyleSheet } from 'react-native';

const articles = [
  {
    
    //id: 1,
    //title: 'Manfaat Olahraga Rutin',
    //image: require('./assets/olahraga.jpg'),
  },
  {
    //id: 2,
    //title: 'Tips Makan Sehat',
    //image: require('./assets/makan-sehat.jpg'),
  },
  {
    //id: 3,
    //title: 'Cara Tidur yang Baik',
    //image: require('./assets/tidur.jpg'),
  },
  // Tambahkan artikel lainnya sesuai kebutuhan
];

const ArticleScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {articles.map((article) => (
        <View key={article.id} style={styles.articleContainer}>
          <Image source={article.image} style={styles.articleImage} />
          <View style={styles.articleContent}>
            <Text style={styles.articleTitle}>{article.title}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  articleContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  articleImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  articleContent: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ArticleScreen;
