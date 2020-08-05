/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { Timeline, Category, Event } from './src/timelines/models'
import { getTimeline, getTimelines } from './src/timelines/api'
import { styles } from './src/ui/styles'
import { TimelineScreen } from './src/timelines/screens/timeline'

import { createStackNavigator } from '@react-navigation/stack';

import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  ActivityIndicator,
  FlatList,
  TouchableHighlight
} from 'react-native';

declare const global: {HermesInternal: null | {}};

const Stack = createStackNavigator();

const TimelinesScreen = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [timelines, setTimelines] = useState<Array<Timeline>>([]);

  function onTimelineClicked(timeline: Timeline): void {
    navigation.navigate('Timeline', { timelineId: timeline.id });
  } 

  useEffect(() => {
    getTimelines().then(timelines => {
      setTimelines(timelines)
      setLoading(false)
    })
  }, [])
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>            
        {isLoading ? <ActivityIndicator/> : (
        <FlatList
          data={timelines}
          keyExtractor={({ id }, index) => id.toString()}
          renderItem={({ item }) => (
            <TouchableHighlight onPress={() => onTimelineClicked(item)}>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>{item.title}</Text>
                <Text style={styles.sectionDescription}>
                  {item.description}
                </Text>
              </View>
            </TouchableHighlight>
          )}
        />
      )}
      </SafeAreaView>
    </>
  );
};

export const TimelinesStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Timelines"
          component={TimelinesScreen}
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen name="Timeline" component={TimelineScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
