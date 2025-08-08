import React, { useState } from 'react';
import { View, Text, SectionList, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { saveCompletedTopics, loadCompletedTopics, saveVisitedTopics, loadVisitedTopics } from './progressStorage';

// Global state for completed topics (shared with CourseDetailScreen)
let globalCompletedTopics = new Set();

// WARNING: Never expose your real API key in production!
async function fetchTopicsFromOpenAI(courseTitle) {
  const apiKey = "sk-REPLACE_WITH_YOUR_OPENAI_KEY"; // Use your OpenAI API key here
  const prompt = `
Generate a JSON array of 8 topics for a course on ${courseTitle}.
Each topic should have:
- title: the topic name
- desc: a short description
- level: one of "Basic", "Intermediate", "Advanced"
- howToLearn: a short step-by-step guide or tips to learn this topic

Return ONLY valid JSON, no explanation or markdown.
`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo", // or "gpt-4" if your key supports it
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt }
      ],
      temperature: 1.0,
      top_p: 1.0,
    }),
  });

  const data = await response.json();
  let topics;
  try {
    if (
      !data.choices ||
      !data.choices[0] ||
      !data.choices[0].message ||
      !data.choices[0].message.content
    ) {
      throw new Error("AI did not return a valid response.");
    }
    topics = JSON.parse(data.choices[0].message.content);
    if (!Array.isArray(topics)) throw new Error("AI did not return a JSON array.");
  } catch (e) {
    throw new Error("AI did not return valid JSON: " + (data.choices?.[0]?.message?.content || JSON.stringify(data)));
  }
  return topics;
}

export default function AllTopicsScreen({ route }) {
  const { topics: initialTopics = [], courseTitle = '' } = route.params || {};
  const [topics, setTopics] = useState(initialTopics);
  const [loading, setLoading] = useState(false);
  const [completedTopics, setCompletedTopics] = useState(new Set());
  const [visitedTopics, setVisitedTopics] = useState(new Set());
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        setCompletedTopics(await loadCompletedTopics());
        setVisitedTopics(await loadVisitedTopics());
      })();
    }, [])
  );

  const levels = ['Basic', 'Intermediate', 'Advanced'];
  const sections = levels.map(level => ({
    title: level,
    data: topics.filter(t => t.level === level)
  })).filter(section => section.data.length > 0);

  const getTopicStyle = (topicTitle) => {
    if (completedTopics.has(topicTitle)) return [styles.topicItem, styles.topicItemCompleted];
    if (visitedTopics.has(topicTitle)) return [styles.topicItem, styles.topicItemVisited];
    return styles.topicItem;
  };

  async function fetchTopicsFromAI() {
    setLoading(true);
    try {
      const newTopics = await fetchTopicsFromOpenAI(courseTitle);
      setTopics(newTopics);
    } catch (err) {
      Alert.alert('Error', err.message || 'Failed to fetch topics from AI.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{courseTitle} - All Topics</Text>
      <TouchableOpacity style={styles.aiBtn} onPress={() => navigation.navigate('Chatbot', { screen: 'ChatbotMain' })} disabled={loading}>
        <Text style={styles.aiBtnText}>{loading ? 'Generating...' : 'Generate Topics with AI'}</Text>
      </TouchableOpacity>
      {loading && <ActivityIndicator size="large" color="#1976D2" style={{ marginVertical: 16 }} />}
      <SectionList
        sections={sections}
        keyExtractor={(item, idx) => item.title + idx}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={getTopicStyle(item.title)}
            onPress={() => navigation.navigate('TopicDetail', { topic: item, courseTitle })}
            activeOpacity={0.7}
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.topicTitle}>{item.title}</Text>
              <Text style={styles.topicDesc}>{item.desc}</Text>
              {item.howToLearn && (
                <Text style={styles.topicHowToLearn}>How to learn: {item.howToLearn}</Text>
              )}
            </View>
            {completedTopics.has(item.title) ? (
              <Ionicons name="checkmark-circle" size={22} color="#00C853" />
            ) : (
              <Ionicons name="eye" size={22} color={visitedTopics.has(item.title) ? '#4CAF50' : '#888'} />
            )}
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F6FAFF', padding: 16 },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, color: '#1976D2', textAlign: 'center' },
  aiBtn: { backgroundColor: '#1976D2', borderRadius: 10, padding: 12, marginBottom: 16, alignItems: 'center' },
  aiBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  sectionHeader: { fontSize: 18, fontWeight: 'bold', marginTop: 18, marginBottom: 8, color: '#222' },
  topicItem: { 
    backgroundColor: '#fff', 
    borderRadius: 10, 
    padding: 12, 
    marginBottom: 10, 
    elevation: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  topicItemCompleted: {
    backgroundColor: '#E8F5E9',
    borderColor: '#00C853',
    borderWidth: 1.2,
  },
  topicItemVisited: { backgroundColor: '#F1F8E9' },
  topicTitle: { fontSize: 16, fontWeight: 'bold', color: '#1976D2' },
  topicDesc: { fontSize: 14, color: '#444', marginTop: 2 },
  topicHowToLearn: { fontSize: 13, color: '#1976D2', marginTop: 4, fontStyle: 'italic' },
}); 