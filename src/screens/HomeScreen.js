import { SafeAreaView, StyleSheet, Text, View, StatusBar } from 'react-native'
import React, { useState } from 'react'
import { useColorScheme } from 'nativewind'
import { useQuery } from '@tanstack/react-query'
import { fetchBreakingNews, fetchRecommendedNews } from '../../utils/NewsApi'
import Header from '../components/Header'


const HomeScreen = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme()
  const [breakingNews, setBreakingNews] = useState([])
  const [recommendedNews, setRecommentedNews] = useState([])

  // Breaking News
  const { isLoading: isBreakingNewsLoading } = useQuery({
    queryKey: ['breakingNews'],
    queryFn: fetchBreakingNews,
    onSuccess: (data) => {
      setBreakingNews(data.articles)
    },
    onError: (error) => {
      console.log('Error fetching breaking news:', error)
    }
  })

  // Breaking News
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
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})
