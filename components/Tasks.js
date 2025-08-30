import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { ActivityIndicator, StyleSheet, View, Text, FlatList, TouchableOpacity, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { viewnote } from '../redux/noteviewslice';
import {Ionicons} from '@expo/vector-icons'

const Tasks = () => {
  const dispatch = useDispatch();
  const { loading, data } = useSelector(state => state.viewnote);
  const navigator=useNavigation().navigate
  useFocusEffect(
    useCallback(() => {
      dispatch(viewnote());
    }, [dispatch])
  );


  const renderItem = ({ item }) => (
    <View style={styles.card}>
        <View>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.content}>{item.content.split(" ").slice(0,4).join(" ")}...</Text>
       
       <Pressable onPress={()=>navigator('Taskdetails',{id:item.id})}><Text style={{color:'red',marginTop:4}}>View details</Text></Pressable>
       </View>
       <View>
        <TouchableOpacity><Ionicons size={24}  color='white' name='pencil' style={{backgroundColor:'black',padding:5,borderRadius:50}}/></TouchableOpacity>
       </View>
    </View>
  );

  if (loading)
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Your Tasks</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No notes yet. Add one!</Text>
        }
        contentContainerStyle={{paddingBottom: 20}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8, 
    flexDirection:'row',
    justifyContent:'space-between'
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 6,
  },
  content: {
    fontSize: 14,
    color: "#555",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "grey",
  },
});

export default Tasks;
