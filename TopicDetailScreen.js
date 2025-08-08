import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { saveCompletedTopics, loadCompletedTopics, saveVisitedTopics, loadVisitedTopics } from './progressStorage';

export default function TopicDetailScreen({ route, navigation }) {
  const { topic, courseTitle } = route.params;
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    (async () => {
      const visited = await loadVisitedTopics();
      visited.add(topic.title);
      await saveVisitedTopics(visited);
    })();
  }, [topic.title]);

  const handleMarkComplete = async () => {
    setIsCompleted(true);
    const completed = await loadCompletedTopics();
    completed.add(topic.title);
    await saveCompletedTopics(completed);
    Alert.alert(
      'Topic Completed!',
      `"${topic.title}" has been marked as complete.`,
      [{ text: 'Continue Learning', onPress: () => navigation.goBack() }]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerBarTitle}>{topic.title}</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Course Info */}
        <View style={styles.courseInfo}>
          <Text style={styles.courseTitle}>{courseTitle}</Text>
          <View style={[styles.levelBadge, 
            topic.level === 'Basic' && { backgroundColor: '#4CAF50' },
            topic.level === 'Intermediate' && { backgroundColor: '#FF9800' },
            topic.level === 'Advanced' && { backgroundColor: '#F44336' }
          ]}>
            <Text style={styles.levelText}>{topic.level}</Text>
          </View>
        </View>

        {/* Topic Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{topic.desc}</Text>
        </View>

        {/* How to Learn */}
        {topic.howToLearn && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>How to Learn</Text>
            <Text style={styles.howToLearn}>{topic.howToLearn}</Text>
          </View>
        )}

        {/* Content Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Content</Text>
          <View style={styles.contentCard}>
            <Text style={styles.contentText}>
              This is where the detailed content for "{topic.title}" would be displayed.
              {'\n\n'}
              You can add:
              {'\n'}• Code examples
              {'\n'}• Step-by-step tutorials
              {'\n'}• Practice exercises
              {'\n'}• Video links
              {'\n'}• Quiz questions
              {'\n\n'}
              The content would be specific to each topic and could include interactive elements, 
              multimedia content, and progress tracking.
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={[
              styles.markCompleteBtn,
              isCompleted && styles.markCompleteBtnCompleted
            ]}
            onPress={handleMarkComplete}
            disabled={isCompleted}
          >
            <MaterialIcons 
              name={isCompleted ? "check-circle" : "check-circle-outline"} 
              size={20} 
              color="#fff" 
            />
            <Text style={styles.markCompleteText}>
              {isCompleted ? 'Completed' : 'Mark as Complete'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6FAFF',
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1976D2',
    paddingTop: 36,
    paddingBottom: 16,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    elevation: 6,
    shadowColor: '#1976D2',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },
  backButton: {
    padding: 8,
  },
  headerBarTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  courseInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  courseTitle: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  levelBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  levelText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
  },
  howToLearn: {
    fontSize: 15,
    color: '#1976D2',
    lineHeight: 22,
    fontStyle: 'italic',
  },
  contentCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  contentText: {
    fontSize: 15,
    color: '#444',
    lineHeight: 22,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 40,
  },
  markCompleteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
    justifyContent: 'center',
  },
  markCompleteBtnCompleted: {
    backgroundColor: '#9E9E9E',
  },
  markCompleteText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 6,
  },
}); 