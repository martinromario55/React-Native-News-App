import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useColorScheme } from 'nativewind'
import { useQuery } from '@tanstack/react-query'
import { fetchBreakingNews, fetchRecommendedNews } from '../../utils/NewsApi'
import Header from '../components/Header'
import Loading from '../components/Loading'
import MiniHeader from '../components/MiniHeader'
import BreakingNews from '../components/BreakingNews'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import NewsSection from '../components/NewsSection'

const HomeScreen = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme()
  const [breakingNews, setBreakingNews] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [recommendedNews, setRecommentedNews] = useState([])
  const [isLoadingRecommendedNews, setIsLoadingRecommendedNews] =
    useState(false)

  // Breaking News
  // const { isLoading: isBreakingNewsLoading } = useQuery({
  //   queryKey: ['breakingNews'],
  //   queryFn: fetchBreakingNews,
  //   onSuccess: (data) => {
  //     setBreakingNews(data.articles)
  //   },
  //   onError: (error) => {
  //     console.log('Error fetching breaking news:', error)
  //   }
  // })

  // use Effect Breaking news
  useEffect(() => {
    try {
      setIsLoading(true)
      fetchBreakingNews().then((data) => {
        setBreakingNews(data.articles)
        setIsLoading(false)
      })
    } catch (error) {
      console.log('Error fetching breaking news:', error)
      setIsLoading(true)
    }
  }, [])

  // console.log('breakingnews:', breakingNews)

  // Recommeded News
  // const { isLoading: isRecommendedNewsLoading } = useQuery({
  //   queryKey: ['recommendedNews'],
  //   queryFn: fetchRecommendedNews,
  //   onSuccess: (data) => {
  //     setBreakingNews(data.articles)
  //   },
  //   onError: (error) => {
  //     console.log('Error fetching recommended news:', error)
  //   }
  // })
  // use Effect Recommeded News
  useEffect(() => {
    try {
      setIsLoadingRecommendedNews(true)
      fetchRecommendedNews().then((data) => {
        setRecommentedNews(data.articles)
        setIsLoadingRecommendedNews(false)
      })
    } catch (error) {
      console.log('Error fetching recommended news:', error)
      setIsLoadingRecommendedNews(false)
    }
  }, [])

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-neutral-900">
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <View>
        <Header />

        {isLoading ? (
          <Loading />
        ) : (
          <View>
            <MiniHeader label="Breaking News" />

            <BreakingNews label={'breakingNews'} data={breakingNews} />
          </View>
        )}

        <View>
          <MiniHeader label="Recommended News" />

          <ScrollView contentContainerStyle={{ paddingBottom: hp(80) }}>
            {isLoadingRecommendedNews ? (
              <Loading />
            ) : (
              <NewsSection
                label="RecommedadedNews"
                newsProps={recommendedNews}
              />
            )}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})
