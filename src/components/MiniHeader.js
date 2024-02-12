import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const MiniHeader = ({ label }) => {
  return (
    <View className="px-4 my-4 justify-between flex-row items-center">
      <Text
        className="text-xl text-green-800 dark:text-white"
        style={{ fontFamily: 'SpaceGroteskBold' }}
      >
        {label}
      </Text>
      <Text
        className="text-base text-gray-600 dark:text-neutral-300"
        style={{ fontFamily: 'SpaceGrotesMedium' }}
      >
        View All
      </Text>
    </View>
  )
}

export default MiniHeader

const styles = StyleSheet.create({})
