import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { BookmarkSquareIcon } from 'react-native-heroicons/outline'
import AsyncStorage from '@react-native-async-storage/async-storage'

const NewsSection = ({ newsProps }) => {
  const navigation = useNavigation()
  const [bookmarkStatus, setBookmarkStatus] = useState([])
  const [urlList, setUrlList] = useState([])

  const handleClick = (item) => {
    navigation.navigate('NewsDetailsScreen', { item })
  }

  useEffect(() => {
    const urls = newsProps.map((item) => item.url)
    setUrlList(urls)
  }, [newsProps])

  const toggleBookmarkandSave = async (item, index) => {
    try {
      const savedArticles = await AsyncStorage.getItem('savedArticles')
      let savedArticlesArray = savedArticles ? JSON.parse(savedArticles) : []

      const isArticleBookmarked = savedArticlesArray.some(
        (savedArticles) => savedArticles.url === item.url
      )

      if (!isArticleBookmarked) {
        savedArticlesArray.push(item)
        await AsyncStorage.setItem(
          'savedArticles',
          JSON.stringify(savedArticlesArray)
        )
        const updatedStatus = [...bookmarkStatus]
        updatedStatus[index] = true
        setBookmarkStatus(updatedStatus)
      } else {
        const updatedSavedArticlesArray = savedArticlesArray.filter(
          (savedArticle) => savedArticle.url !== item.url
        )

        await AsyncStorage.setItem(
          'savedArticles',
          JSON.stringify(updatedSavedArticlesArray)
        )
        const updatedStatus = [...bookmarkStatus]
        updatedStatus[index] = false
        setBookmarkStatus(updatedStatus)
      }
      // console.log('NewsSection', savedArticles)
      // console.log('Bookmarked', isArticleBookmarked)
    } catch (error) {
      console.log('Error saving news', error)
    }
  }

  useFocusEffect(
    useCallback(() => {
      const loadSavedArticles = async () => {
        try {
          const savedArticles = await AsyncStorage.getItem('savedArticles')
          const savedArticlesArray = savedArticles
            ? JSON.parse(savedArticles)
            : []

          const isArticleBookmarkedList = urlList.map((url) =>
            savedArticlesArray.some((savedArticle) => savedArticle.url === url)
          )
          setBookmarkStatus(isArticleBookmarkedList)
        } catch (error) {
          console.log('Error loading saved articles', error)
        }
      }
      loadSavedArticles()
    }, [urlList, navigation])
  )
  // console.log(bookmarkStatus)
  const renderItem = ({ item, index }) => {
    // console.log(bookmarkStatus[index])
    return (
      <TouchableOpacity
        className="mb-4 mx-4 space-y-1"
        key={index}
        onPress={() => handleClick(item)}
      >
        {/* Image */}
        <View className="flex-row justify-start w-[100%] shadow-sm">
          <Image
            source={{
              uri: item.urlToImage || 'https://via.placeholder.com/200x200'
            }}
            style={{
              width: hp(9),
              height: hp(10)
            }}
            className="rounded-lg"
          />

          {/* Author */}
          <View className="w-[70%] pl-4 justify-center space-y-1">
            <Text className="text-xs font-bold text-gray-900 dark:text-neutral-300">
              {item?.author?.length > 20
                ? item?.author?.slice(0, 20) + '...'
                : item?.author}
            </Text>

            {/* Title */}
            <Text className="text-neutral-800 capitalize max-w-[90%] dark:text-white">
              {item?.title?.length > 50
                ? item?.title?.slice(0, 50) + '...'
                : item?.title}
            </Text>

            {/* Date */}
            <Text className="text-xs text-gray-700 dark:text-neutral-300">
              {new Date(item?.publishedAt).toDateString()}
            </Text>
          </View>
          {/* Bookmark icon */}
          <View className="w-[10%] justify-center">
            <TouchableOpacity
              onPress={() => toggleBookmarkandSave(item, index)}
            >
              <BookmarkSquareIcon
                color={bookmarkStatus[index] ? 'green' : 'gray'}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
  return (
    <View className="space-y-2 bg-white dark:bg-neutral-900">
      <FlatList
        nestedScrollEnabled={true}
        scrollEnabled={false}
        data={newsProps}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  )
}

export default NewsSection

const styles = StyleSheet.create({})
