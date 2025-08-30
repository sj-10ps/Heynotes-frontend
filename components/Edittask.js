import { useNavigation, useRoute } from '@react-navigation/native';
import { Formik } from 'formik';
import React from 'react';
import { Button, StyleSheet, TextInput, View, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { updatenote } from '../redux/updatenotesslice';

const Edittask = () => {
  const route = useRoute();
  const { data } = route.params;
  const navigator=useNavigation()
  const dispatch=useDispatch()
  const {loading,success}=useSelector(state=>state.updatenote)
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    content: Yup.string().required('Content is required'),
  });

  const handlesubmit =async (values) => {

    const formdata=new FormData()
    for(let i in values){
         formdata.append(i,values[i])
    }
    formdata.append('id',data.id)
   await dispatch(updatenote(formdata))
   navigator.goBack()
   
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Edit Task</Text>
      <Formik
        initialValues={{ title: data.title, content: data.content }}
        validationSchema={validationSchema}
        onSubmit={handlesubmit}
      >
        {({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
          <View style={styles.form}>
      
            <TextInput
              style={styles.input}
              placeholder="Title"
              onChangeText={handleChange('title')}
              onBlur={handleBlur('title')}
              value={values.title}
            />
            {touched.title && errors.title && (
              <Text style={styles.error}>{errors.title}</Text>
            )}

      
            <TextInput
              style={[styles.input, styles.textarea]}
              placeholder="Content"
              onChangeText={handleChange('content')}
              onBlur={handleBlur('content')}
              value={values.content}
              multiline
              numberOfLines={5}
            />
            {touched.content && errors.content && (
              <Text style={styles.error}>{errors.content}</Text>
            )}

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    
    padding: 20,
    backgroundColor: '#fff',
    maxHeight:500,
    padding:10,
    margin:10,
    elevation:12
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  form: {
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
  },
  textarea: {
    height: 120,
    textAlignVertical: 'top',
  },
  error: {
    color: 'red',
    marginBottom: 8,
    fontSize: 14,
  },
  button: {
    backgroundColor: '#1e90ff',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Edittask;
