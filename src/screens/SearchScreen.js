import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  Keyboard
} from 'react-native'
import React, { useState } from 'react'
// import { debounce } from 'lodash'
import { useNavigation } from '@react-navigation/native'
import { fetchSearchNews } from '../../utils/NewsApi'
import { XMarkIcon } from 'react-native-heroicons/outline'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Loading from '../components/Loading'
import NewsSection from '../components/NewsSection'

const SearchScreen = () => {
  // const navigation = useNavigation()
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  const handleTextDebounce = async (search) => {
    if (search && search.length > 2) {
      setIsLoading(true)
      setResults([])
      setSearchTerm(search)

      try {
        const data = await fetchSearchNews(search)

        setIsLoading(false)

        if (data && data.articles) {
          setResults(data.articles)
        }
      } catch (error) {
        console.log('Error fetching search results:', error)
        setIsLoading(false)
      }
    }
  }

  const handleClose = () => {
    setSearchTerm('')
    setResults([])
    Keyboard.dismiss()
  }
  return (
    <View className="flex-1 bg-white dark:bg-neutral-900">
      <View className="mx-4 mb-3 mt-12 flex-row p-2 justify-between items-center bg-neutral-100 rounded-lg">
        <TextInput
          onChangeText={handleTextDebounce}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for your news"
          placeholderTextColor={'gray'}
          className="font-medium text-black tracking-wider p-3 py-1 w-[90%]"
          value={searchTerm}
        />

        <TouchableOpacity onPress={handleClose}>
          <XMarkIcon size={'25'} color={'green'} strokeWidth={3} />
        </TouchableOpacity>
      </View>

      <View className="mx-4 mb-4">
        <Text
          className="text-xl dark:text-white"
          style={{ fontFamily: 'SpaceGroteskBold' }}
        >
          {results.length > 0
            ? `${results.length} News results for ${searchTerm}`
            : null}
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: hp(5) }}>
        {isLoading ? (
          <Loading />
        ) : (
          <NewsSection label="Search Results" newsProps={results} />
        )}
      </ScrollView>
    </View>
  )
}

export default SearchScreen
