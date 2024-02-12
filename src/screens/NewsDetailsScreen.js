import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import {
  BookmarkSquareIcon,
  ChevronLeftIcon,
  ShareIcon
} from 'react-native-heroicons/outline'
import { WebView } from 'react-native-webview'
import AsyncStorage from '@react-native-async-storage/async-storage'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const NewsDetailsScreen = () => {
  const navigation = useNavigation()
  const {
    params: { item }
  } = useRoute()

  const [isBookmarked, toggleBookmark] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const toggleBookmarkandSave = async () => {
    try {
      // Check if News Article is already in Storage
      const savedArticles = await AsyncStorage.getItem('savedArticles')
      let savedArticlesArray = savedArticles ? JSON.parse(savedArticles) : []
      // console.log("Check if the article is already bookmarked");

      // Check if the article is already in the bookmarked list
      const isArticleBookmarked = savedArticlesArray.some(
        (savedArticle) => savedArticle.url === item.url
      )

      // console.log("Check if the article is already in the bookmarked list");

      if (!isArticleBookmarked) {
        // If the article is not bookmarked, add it to the bookmarked list
        savedArticlesArray.push(item)
        await AsyncStorage.setItem(
          'savedArticles',
          JSON.stringify(savedArticlesArray)
        )
        toggleBookmark(true)
        // console.log("Article is bookmarked");
      } else {
        // If the article is already bookmarked, remove it from the list
        const updatedSavedArticlesArray = savedArticlesArray.filter(
          (savedArticle) => savedArticle.url !== item.url
        )
        await AsyncStorage.setItem(
          'savedArticles',
          JSON.stringify(updatedSavedArticlesArray)
        )
        toggleBookmark(false)
        // console.log("Article is removed from bookmarks");
      }
    } catch (error) {
      console.log('Error Saving Article', error)
    }
  }

  useEffect(() => {
    // Load saved articles from AsyncStorage when the component mounts
    const loadSavedArticles = async () => {
      try {
        const savedArticles = await AsyncStorage.getItem('savedArticles')
        const savedArticlesArray = savedArticles
          ? JSON.parse(savedArticles)
          : []

        // Check if the article is already in the bookmarked list
        const isArticleBookmarked = savedArticlesArray.some(
          (savedArticle) => savedArticle.url === item.url
        )

        toggleBookmark(isArticleBookmarked)
        // console.log('Check if the current article is in bookmarks')
      } catch (error) {
        console.log('Error Loading Saved Articles', error)
      }
    }

    loadSavedArticles()
  }, [item.url])

  // console.log('url', item.url)
  return (
    <>
      <View className="w-full flex-row justify-between items-center px-4 pt-10 pb-4 bg-white">
        <View className="bg-gray-100 p-2 rounded-full items-center justify-center">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ChevronLeftIcon size={'25'} color={'gray'} strokeWidth={3} />
          </TouchableOpacity>
        </View>

        <View className="space-x-3 rounded-full items-center justify-center flex-row">
          <TouchableOpacity className="bg-gray-100 p-2 rounded-full">
            <ShareIcon size={'25'} color={'gray'} strokeWidth={3} />
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-gray-100 p-2 rounded-full"
            onPress={toggleBookmarkandSave}
          >
            <BookmarkSquareIcon
              size={'25'}
              color={isBookmarked ? 'green' : 'gray'}
              strokeWidth={3}
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* WebView */}
      <WebView
        source={{ uri: item.url }}
        onLoadStart={() => setIsVisible(true)}
        onLoadEnd={() => setIsVisible(false)}
        style={{ marginTop: 2 }}
      />

      {isVisible && (
        <ActivityIndicator
          size={'large'}
          color={'green'}
          style={{ position: 'absolute', top: height / 2, left: width / 2 }}
        />
      )}
    </>
  )
}

export default NewsDetailsScreen

const styles = StyleSheet.create({})
