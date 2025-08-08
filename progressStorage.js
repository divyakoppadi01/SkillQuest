import AsyncStorage from '@react-native-async-storage/async-storage';

const COMPLETED_KEY = 'completedTopics';
const VISITED_KEY = 'visitedTopics';

export async function saveCompletedTopics(topicsSet) {
  await AsyncStorage.setItem(COMPLETED_KEY, JSON.stringify(Array.from(topicsSet)));
}
export async function loadCompletedTopics() {
  const value = await AsyncStorage.getItem(COMPLETED_KEY);
  return value ? new Set(JSON.parse(value)) : new Set();
}

export async function saveVisitedTopics(topicsSet) {
  await AsyncStorage.setItem(VISITED_KEY, JSON.stringify(Array.from(topicsSet)));
}
export async function loadVisitedTopics() {
  const value = await AsyncStorage.getItem(VISITED_KEY);
  return value ? new Set(JSON.parse(value)) : new Set();
} 