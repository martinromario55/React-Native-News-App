import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { useColorScheme } from 'nativewind'
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'
import CategoriesCard from '../components/CategoriesCard'
import { categories } from '../constants'
import { fetchDiscoverNews } from '../../utils/NewsApi'
// import { useQuery } from '@tanstack/react-query'
import NewsSection from '../components/NewsSection'
import Loading from '../components/Loading'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Font } from 'expo-font'

const DiscoverScreen = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme()
  const navigation = useNavigation()
  const [activeCategory, setActiveCategory] = useState('business')
  const [discoverNews, setDiscoverNews] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  async function loadFonts() {
    await Font.loadAsync({
      SpaceGroteskSemiBold: require('../fonts/SpaceGrotesk-SemiBold.ttf'),
      SpaceGroteskBold: require('../fonts/SpaceGrotesk-Bold.ttf'),
      SpaceGroteskMedium: require('../fonts/SpaceGrotesk-Medium.ttf')
    })
    loadFonts()
  }

  // useEffect(() => {
  //   console.log('activeCategory', activeCategory)
  // }, [activeCategory])

  const handleCategoryChange = (category) => {
    setActiveCategory(category)
    setDiscoverNews([])
  }

  // Discover News
  // const { isLoading: isDiscoverLoading } = useQuery({
  //   queryKey: ['discoverNews', activeCategory],
  //   queryFn: () => fetchDiscoverNews(activeCategory),
  //   onSuccess: (data) => {
  //     const fileteredNews = data.articles.filter(
  //       (article) => article.title !== ' [Removed]'
  //     )
  //     setDiscoverNews(fileteredNews)
  //     console.log('Discover news', fileteredNews)
  //   },
  //   onError: (error) => {
  //     console.log('Error fetching breaking news:', error)
  //   }
  // })

  useEffect(() => {
    try {
      setIsLoading(true)
      fetchDiscoverNews(activeCategory).then((data) => {
        const fileteredNews = data.articles.filter(
          (article) => article.title !== ' [Removed]'
        )
        setDiscoverNews(fileteredNews)
        setIsLoading(false)
      })
    } catch (error) {
      console.log('Error fetching breaking news:', error)
      setIsLoading(true)
    }
  }, [activeCategory])

  // console.log('Discovery', discoverNews)

  return (
    <SafeAreaView className="pt-8 flex-1 bg-white dark:bg-neutral-900">
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />

      <View>
        {/* Header */}
        <View className="px-4 mb-6 justify-between">
          <Text
            className="text-3xl text-green-800 dark:text-white"
            style={{ fontFamily: 'SpaceGroteskBold' }}
          >
            Discover
          </Text>

          <Text
            className="text-base text-gray-600 dark:text-neutral-300"
            style={{ fontFamily: 'SpaceGroteskMedium' }}
          >
            News from all over the world
          </Text>
        </View>

        {/* Search */}
        <View className="mx-4 mb-8 flex-row p-2 py-3 justify-between items-center bg-neutral-100 rounded-full">
          <TouchableOpacity className="pl-2">
            <MagnifyingGlassIcon size="25" color="gray" />
          </TouchableOpacity>

          <TextInput
            onPressIn={() => navigation.navigate('Search')}
            placeholder="Search for news"
            placeholderTextColor={'gray'}
            className="pl-4 flex-1 font-medium text-black tracking-wider"
          />
        </View>

        {/* Categories */}
        <View className="flex-row mx-4">
          <CategoriesCard
            categories={categories}
            activeCategory={activeCategory}
            handleCategoryChange={handleCategoryChange}
          />
        </View>

        {/* Discover News */}
        <View className="h-full">
          {/* Header Title */}
          <View className="m-4 flex-row justify-between items-center">
            <Text
              className="text-xl dark:text-white"
              style={{ fontFamily: 'SpaceGroteskBold' }}
            >
              Discover
            </Text>

            <Text
              className="text-base text-green-800 dark:text-neutral-300"
              style={{ fontFamily: 'SpaceGroteskBold' }}
            >
              View All
            </Text>
          </View>

          {/* News Section */}
          {isLoading ? (
            <View className="justify-center items-center">
              <Loading />
            </View>
          ) : (
            <ScrollView contentContainerStyle={{ paddingBottom: hp(70) }}>
              <NewsSection newsProps={discoverNews} label="Discovery" />
            </ScrollView>
          )}
        </View>
      </View>
    </SafeAreaView>
  )
}

export default DiscoverScreen
