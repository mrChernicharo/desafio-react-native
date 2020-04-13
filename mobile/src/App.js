import React, { useState, useEffect } from "react";
import { SafeAreaView, View, FlatList, Text, StatusBar, StyleSheet, TouchableOpacity } from "react-native";

import api from './services/api';

export default function App() {
  const [repo_arr, setRepos] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      console.log(response.data);
      setRepos(response.data);
    });
  }, []);

  async function handleLikeRepository(id) {
    //POST ==> Like
    const response = await api.post(`repositories/${id}/like`); 
    
    const likedRepository = response.data

    const repoUpdated = repo_arr.map(repo => {
      if (repo.id === id) {
        return likedRepository;
      } else {
        return repo;
      }
    })
  
    setRepos(repoUpdated);
  }
     
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      
      <SafeAreaView style={styles.container}>
        <FlatList 
          data={repo_arr}
          keyExtractor={repo => repo.id}
          renderItem={({item: repo }) => (
            <View style={styles.repositoryContainer}>
              <View >
                <Text style={styles.repository}>{repo.title}</Text>
              </View>
            
             
              <View style={styles.techsContainer}>
              {repo.techs.map(tech => <Text style={styles.tech} key={tech}>{tech}</Text>)}
              </View>

              <View style={styles.likesContainer}>
                <Text
                  style={styles.likeText}
                  // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
                  testID={`repository-likes-${repo.id}`}
                >
                  {`${repo.likes} curtidas `}
                </Text>
              </View>


              <TouchableOpacity
                style={styles.button}
                onPress={() => handleLikeRepository(repo.id)}
                // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
                testID={`like-button-${repo.id}`}
              >
                <Text style={styles.buttonText}>Curtir</Text>
              </TouchableOpacity>
            </View>
          )}
        />  
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#c93c3c",
    padding: 15,
  },
});
