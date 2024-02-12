import { SafeAreaView, StyleSheet, Text, View, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useColorScheme } from 'nativewind'
import { useQuery } from '@tanstack/react-query'
import { fetchBreakingNews, fetchRecommendedNews } from '../../utils/NewsApi'
import Header from '../components/Header'
import Loading from '../components/Loading'
import MiniHeader from '../components/MiniHeader'
import BreakingNews from '../components/BreakingNews'

const HomeScreen = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme()
  const [breakingNews, setBreakingNews] = useState([])
  const [recommendedNews, setRecommentedNews] = useState([])
  const [isLoading, setIsLoading] = useState(false)

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
      })
      setIsLoading(false)
    } catch (error) {
      console.log('Error fetching breaking news:', error)
      setIsLoading(false)
    }
  }, [])

  // console.log('breakingnews:', breakingNews)

  // Recommeded News
  const { isLoading: isRecommendedNewsLoading } = useQuery({
    queryKey: ['recommendedNews'],
    queryFn: fetchRecommendedNews,
    onSuccess: (data) => {
      setBreakingNews(data.articles)
    },
    onError: (error) => {
      console.log('Error fetching recommended news:', error)
    }
  })

  return (
    <SafeAreaView>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <Header />

      {isLoading ? (
        <Loading />
      ) : (
        <View>
          <MiniHeader label="Breaking News" />

          <BreakingNews label={'breakingNews'} data={breakingNews} />
        </View>
      )}
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})
