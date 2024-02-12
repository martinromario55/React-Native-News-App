/* eslint-disable prettier/prettier */
import { newsApiKey } from './ApiKey'
import axios from 'axios'

// Endpoints
const apiBaseUrl = 'https://newsapi.org/v2'

const breakingNewsUrl = `${apiBaseUrl}/top-headlines?country=us&apiKey=${newsApiKey}`
const recommendedNewsUrl = `${apiBaseUrl}/top-headlines?country=us&category=business&apiKey=${newsApiKey}`

const discoverNewsUrl = (discover) =>
  `${apiBaseUrl}/top-headlines?country=us&category=${discover}&apiKey=${newsApiKey}`

const searchNewsUrl = (query) =>
  `${apiBaseUrl}/everything?q=${query}&apiKey=${newsApiKey}`

const newsApiCall = async (endpoints, params) => {
  const options = {
    method: 'GET',
    url: endpoints,
    params: params ? params : {}
  }

  try {
    const response = await axios.request(options)
    return response.data
  } catch (error) {
    console.log(error)
    return {}
  }
}

// Breaking news
export const fetchBreakingNews = async () => {
  // const news = await newsApiCall(breakingNewsUrl)
  // console.log('news', news)
  return await newsApiCall(breakingNewsUrl)
}

// Recommended news
export const fetchRecommendedNews = async () => {
  return await newsApiCall(recommendedNewsUrl)
}

// Discover News
export const fetchDiscoverNews = async (discover) => {
  return await newsApiCall(discoverNewsUrl(discover))
}

// Search for news
export const fetchSearchNews = async (query) => {
  const endpoint = searchNewsUrl(query)
  return await newsApiCall(endpoint)
}
