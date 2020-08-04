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
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  StatusBar,
  ActivityIndicator,
  FlatList,
  TouchableHighlight,
  Alert
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

declare const global: {HermesInternal: null | {}};


const Stack = createStackNavigator();










const HomeScreen = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [timelines, setTimelines] = useState<Array<Timeline>>([]);

  function onTimelineClicked(timeline: Timeline): void {
    navigation.navigate('Timeline', { timelineId: timeline.id });
    //Alert.alert(`Tapped ${timeline.title}`)
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



const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen name="Timeline" component={TimelineScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack
