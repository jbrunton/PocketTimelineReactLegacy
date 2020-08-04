import React, { useState, useEffect } from "react";
import { Timeline } from "../models";
import { getTimeline } from "../api";
import { styles } from "../../ui/styles";
import { SafeAreaView, ActivityIndicator, FlatList, View, Text } from "react-native";

export const TimelineScreen = ({ route, navigation }) => {
  const { timelineId } = route.params

  const [isLoading, setLoading] = useState(true);
  const [timeline, setTimeline] = useState<Timeline>();

  useEffect(() => {
    getTimeline(timelineId).then(timeline => {
      setTimeline(timeline)
      setLoading(false)
      navigation.setOptions({ title: timeline.title })
    })
  }, [])

  return <SafeAreaView>            
    {isLoading ? <ActivityIndicator/> : (
    <FlatList
      data={timeline?.events}
      keyExtractor={({ id }, index) => id.toString()}
      renderItem={({ item }) => (
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>{item.title}</Text>
          <Text style={styles.sectionDescription}>
            {item.date}
          </Text>
        </View>
      )}
    />
  )}
  </SafeAreaView>;
};
