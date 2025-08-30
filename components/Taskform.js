import React from 'react';
import { StyleSheet, View ,Text,TextInput,Button} from 'react-native';
import * as Yup from 'yup'
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { createnote } from '../redux/notecreateslice';
const Taskform = () => {
    
const NoteSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  content: Yup.string().required("Content is required"),
});

     const dispatch=useDispatch()
      const handlesubmit=async(values,{resetForm})=>{
        const formdata=new FormData()
        for(i in values){
          formdata.append(i,values[i])
        }
        await dispatch(createnote(formdata))
         resetForm()
      }
    return (
            <View style={styles.container}>
      <Text style={styles.heading}>Create a Note</Text>
      
      <Formik
        initialValues={{ title: "", content: "" }}
        validationSchema={NoteSchema}
        onSubmit={handlesubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={{ width: "100%" ,borderRadius:12,padding:20,backgroundColor:'#e3e0e0ff',elevation:8}}>
            <TextInput
              style={styles.input}
              placeholder="Title"
              onChangeText={handleChange("title")}
              onBlur={handleBlur("title")}
              value={values.title}
            />
            {errors.title && touched.title && (
              <Text style={styles.error}>{errors.title}</Text>
            )}

            <TextInput
              style={[styles.input, styles.textarea]}
              placeholder="Content"
              multiline
              onChangeText={handleChange("content")}
              onBlur={handleBlur("content")}
              value={values.content}
            />
            {errors.content && touched.content && (
              <Text style={styles.error}>{errors.content}</Text>
            )}

            <Button title="Save Note" onPress={handleSubmit} />
          </View>
        )}
      </Formik>

     
    </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    width: "100%",
  },
  textarea: {
    height: 100,
    textAlignVertical: "top",
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});


export default Taskform;
