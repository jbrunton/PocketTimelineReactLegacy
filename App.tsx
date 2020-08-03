/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect, useState } from 'react';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ActivityIndicator,
  FlatList
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

declare const global: {HermesInternal: null | {}};

interface Timeline {
  id: number
  title: string
  description?: string
}

async function getTimelines(): Promise<Array<Timeline>> {
  const response = await fetch(
    'http://10.0.2.2:3000/timelines.json'
  );
  const json = await response.json();
  return json;
}

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [timelines, setTimelines] = useState<Array<Timeline>>([]);

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
            <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>{item.title}</Text>
            <Text style={styles.sectionDescription}>
              {item.description}
            </Text>
          </View>
          )}
        />
      )}
      </SafeAreaView>
    </>
  );
};

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

export default App;
