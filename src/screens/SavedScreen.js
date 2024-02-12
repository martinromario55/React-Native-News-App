import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  View,
  FlatList,
  Image
} from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useColorScheme } from 'nativewind'
import { StatusBar } from 'expo-status-bar'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Loading from '../components/Loading'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { BookmarkSquareIcon } from 'react-native-heroicons/outline'

const SavedScreen = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme()
  const navigation = useNavigation()
  const [savedArticles, setSavedArticles] = useState([])
  const [bookmarkStatus, setBookmarkStatus] = useState([])
  const [urlList, setUrlList] = useState([])
  const [isBookmarked, setIsBookmarked] = useState(false)

  // console.log(savedArticles)
  // console.log(bookmarkStatus)
  const handleClick = (item) => {
    navigation.navigate('NewsDetailsScreen', item)
  }

  useEffect(() => {
    const urls = savedArticles.map((item) => item.url)
    setUrlList(urls)
  }, [savedArticles])

  const toggleBookmarkandSave = async (item, index) => {
    try {
      const savedArticles = await AsyncStorage.getItem('savedArticles')
      let savedArticlesArray = savedArticles ? JSON.parse(savedArticles) : []

      const isArticleBookmarked = savedArticlesArray.some(
        (savedArticles) => savedArticles.url === item.url
      )
      // setBookmarkStatus(isArticleBookmarked)
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
          setSavedArticles(savedArticlesArray)

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

  const clearSavedArticles = async () => {
    try {
      await AsyncStorage.removeItem('savedArticles')
      setSavedArticles([])
      // console.log('clear:', savedArticles)
    } catch (error) {
      console.log('Error Clearing Saved Articles', error)
    }
  }

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        className="mb-4 space-y-1"
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
    <SafeAreaView className="p-4 bg-white flex-1 dark:bg-neutral-900">
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />

      {/* Header */}
      <View className="flex-row  justify-between">
        <Text
          className="font-bold text-xl text-green-800 dark:text-white"
          style={{ fontFamily: 'SpaceGroteskBold' }}
        >
          Saved Articles
        </Text>

        <TouchableOpacity
          className="bg-green-800 py-2 px-4 rounded-lg"
          onPress={clearSavedArticles}
        >
          <Text
            className="text-white dark:text-white"
            style={{ fontFamily: 'SpaceGroteskMedium' }}
          >
            Clear
          </Text>
        </TouchableOpacity>
      </View>

      {/* News Section */}
      <View className="space-y-2" style={{ marginVertical: hp(2) }}>
        <FlatList
          data={savedArticles}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: hp(2) }}
        />
      </View>
    </SafeAreaView>
  )
}

export default SavedScreen
