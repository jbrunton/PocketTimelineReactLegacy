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

interface Event {
  id: number
  title: string
  date: string
}

interface Category {
  id: number
  name: string
}

interface Timeline {
  id: number
  title: string
  description?: string,
  events?: Array<Event>,
  categories?: Array<Category>
}

async function getTimelines(): Promise<Array<Timeline>> {
  const response = await fetch(
    'http://10.0.2.2:3000/timelines.json'
  );
  const json = await response.json();
  return json;
}

async function getTimeline(id: string): Promise<Timeline> {
  const response = await fetch(
    `http://10.0.2.2:3000/timelines/${id}.json`
  );
  const json = await response.json();
  return json;
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});


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

const TimelineScreen = ({ route, navigation }) => {
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
