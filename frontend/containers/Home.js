import React, { useState, useRef, useEffect } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
  AsyncStorage
} from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";


import { getCategories, createCategory, modifyCategory, removeCategory } from "../services/CategoryService";



const Category = ({ category, functionRemove, navigation, route }) => {
  const colors = ['#3EFACD', '#30D958', '#7EF041', '#D8D930', '#FCD838', '#FAEA2F', '#F09832', '#FC282E'];

  const title = category["categoryName"];
  const id = category["categoryId"];
  const userId = route.params["userId"];

  const [txt, setTxt] = useState(title);
  const [isEditable, setEditable] = useState(false);
  const [color, setColor] = useState(category["categoryColor"])

  const textInput = useRef(null);

  return (
    <TouchableOpacity
      style={[styles.item, { backgroundColor: colors[color] }]}
      onPress={() => {
        if (isEditable) {
          setEditable(false);
          modifyCategory(id, { "categoryName": txt, "categoryColor": color });
        } else {
          console.log("has pulsado la categoria " + txt);
          navigation.navigate("Categoria", {
            categoryId: id,
            categoria: txt,
            userId: userId
          });
        }
      }}
      onLongPress={() => {
        setEditable(true);
        textInput.current.focus();
      }}
    >
      {/* Boton borrar */}
      {isEditable ? (
        <View style={{ marginVertical: 10, flex: 1, flexDirection: "row", justifyContent: "space-around", alignItems: 'center' }}>
          <Button

            type="clear"
            onPress={() => {
              Alert.alert(
                "Borrar",
                "Esta seguro de que quiere borrar la categoria " + txt,
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Borrar cancelado"),
                    style: "cancel",
                  },
                  { text: "OK", onPress: () => functionRemove() },
                ]
              );
            }}
            icon={<Icon name="trash" size={25} color="black" />}
          />
          {/* Boton color */}
          <TouchableOpacity
            onPress={() => setColor((color + 1) % 7)}
          >
            <Image style={styles.circulo} source={require('../assets/colorwheel.png')} />
          </TouchableOpacity>

        </View>




      ) : (
          <View></View>
        )}

      {/* Nombre categoria */}
      <TextInput
        style={{ flex: 4, alignSelf: "center", fontSize: 16, color: "black" }}
        ref={textInput}
        onSubmitEditing={() => {
          textInput.current.focus();
        }}
        value={txt}
        onChangeText={(v) => setTxt(v)}
        autoFocus={true}
        editable={isEditable}
        blurOnSubmit={true}
      />
    </TouchableOpacity>
  );
};

const Home = ({ route, navigation }) => {
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const userId = route.params["userId"];

  useEffect(() => {
    getCategories(userId).then((res) => setData(res['categories']));

  }, [refresh]);


  const renderItem = ({ item }) => (
    <Category
      category={item}
      functionRemove={() => remove(item["categoryId"])}
      navigation={navigation}
      route = {route}
    />
  );

  function remove(id) {
    console.log("Borrando item " + id);
    removeCategory(id);
    setRefresh(!refresh);
  }

  function addItem() {
    console.log("anadir item");
    const newCat = {
      categoryName: "Nueva categoria",
      categoryAuthor: userId,
      categoryColor: 0
    };
    createCategory(newCat);
    setRefresh(!refresh);
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={{flexDirection: 'row', alignSelf:'flex-end', marginHorizontal:20}}>
        <Button
          onPress={() => {AsyncStorage.clear(); navigation.navigate("Login")}}
          type="clear"
          icon={<Icon name="sign-out" size={32} color="white" />}
        />
      </View>
      {/* Header */}
      <View style={{ flexDirection: "row" }}>
        <Text style={{ fontSize: 32, color: "white", marginRight: 10 }}>
          Tus Categorías 
          {/* {userId}  */}
        </Text>
        
      </View>

      {/* Lista categorias */}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item["categoryId"].toString()}
        numColumns={2}
      />
      <View style={{margin:30}}>
      <Button
          onPress={() => addItem()}
          type="clear"
          icon={<Icon name="plus-circle" size={50} color="white"/>}
        />
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    paddingTop: 20,
    alignItems: "center",
    backgroundColor: "#303030",
  },
  item: {
    backgroundColor: "#f9c2ff",
    width: 150,
    height: 100,

    marginVertical: 15,
    marginHorizontal: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  title: {
    fontSize: 16,
  },
  circulo: {
    width: 25,
    height: 25,
    borderRadius: 10,
    marginRight: 10,
    borderColor: 'white',
    borderWidth: 1
  },
});

export default Home;
