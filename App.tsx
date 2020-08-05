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
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions
} from 'react-native/Libraries/NewAppScreen';

import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  ActivityIndicator,
  FlatList,
  TouchableHighlight,
  ScrollView,
  TextInput,
  StyleSheet
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

function fib(n: number): number {
  let a = 1, b = 0;
  while (n > 0){
    const temp = a;
    a = a + b;
    b = temp;
    n--;
  }
  return b
}

export const FibApp: () => React$Node = () => {
  const [input, setInput] = useState('');
  const [value, setValue] = useState('');

  function updateFibValue(input: string): void {
    setInput(input)
    let n = Number(input)
    setValue(fib(n).toString())
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={fibStyles.scrollView}>
          <Header />
          <View style={fibStyles.body}>
            <View style={fibStyles.sectionContainer}>
              <Text style={fibStyles.sectionTitle}>Fib Calculator</Text>
              <Text style={fibStyles.sectionDescription}>
                Enter a number:
              </Text>
              <TextInput
                autoCompleteType="off"
                keyboardType="numeric"
                onChangeText={text => updateFibValue(text)} />
              {input != "" && <Text style={fibStyles.sectionDescription}>
                Fib({input}) = {value}
              </Text>}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const fibStyles = StyleSheet.create({
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
