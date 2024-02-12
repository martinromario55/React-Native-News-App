import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import Carousel from 'react-native-snap-carousel'
import BreakingNewsCard from './BreakingNewsCard'

const width = Dimensions.get('window').width

const BreakingNews = ({ data, label }) => {
  const navigation = useNavigation()

  const handleClick = (item) => {
    navigation.navigate('NewsDetailsScreen', item)
  }
  return (
    <View>
      <Carousel
        data={data}
        renderItem={({ item }) => (
          <BreakingNewsCard item={item} handleClick={handleClick} />
        )}
        firstItem={1}
        inactiveSlideScale={0.86}
        sliderWidth={width}
        itemWidth={Math.round(width * 0.8)}
        slideStyle={{ display: 'flex', alignItems: 'center' }}
      />
    </View>
  )
}

export default BreakingNews

const styles = StyleSheet.create({})
