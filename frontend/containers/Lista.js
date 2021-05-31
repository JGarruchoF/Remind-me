import React, { useState, useRef, useEffect } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Form,
} from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { getReminders, createReminder, modifyReminder, removeReminder } from "../services/ReminderService";
import DateTimePicker from '@react-native-community/datetimepicker';





const Reminder = ({ reminder, remove }) => {
  const [isDone, setDone] = useState(reminder["completed"]);
  const id = reminder["reminderId"]
  const txt = reminder["reminderTitle"]
  const date = new Date(reminder['reminderDate']);


  function reminderDone() {
    modifyReminder(id, { "completed": !isDone });

    setDone(!isDone);
    //reminder['completed'] = isDone;
    //console.log(reminder);
  }

  return (
    <TouchableOpacity
      onPress={reminderDone}
      onLongPress={() => {
        if (isDone) remove();
      }}
    >
      <View style={styles.reminder}>
        <View style={{ flex: 9, flexDirection: "row" }}>
          <View style={styles.circulo}></View>
          <Text
            style={{
              fontSize: 16,
              textDecorationLine: isDone ? "line-through" : "none",
            }}
          >
            {txt}
          </Text>

        </View>
        <View style={{ flex: 2, flexDirection: "row" }}>
          <Text style={{
            fontSize: 16,
          }}>
            {date.getDate() + '/' + (date.getMonth() + 1)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Lista = ({ route, navigation }) => {
  const categoria = route.params["categoria"];
  const categoryId = route.params["categoryId"];
  const userId = route.params["userId"];

  const [refresh, setRefresh] = useState(false);
  const [data, setData] = useState([]);

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);



  const renderItem = ({ item }) => (
    <Reminder
      reminder={item}
      remove={() => remove(item["reminderId"])}
    ></Reminder>
  );

  function remove(id) {
    console.log("Borrando reminder " + id);
    deleteReminder(id);
    setRefresh(!refresh);
  }

  const addReminder = (txt, date) => {
    console.log("Creando reminder " + txt);
    //var dateString = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay();
    var newRem = {
      completed: false,
      reminderTitle: txt,
      reminderAuthor: userId,
      reminderDate: date,
      category: categoryId
    };

    createReminder(newRem);
    setRefresh(!refresh);
  };

  useEffect(() => {
    getReminders(userId).then((res) => res != 'Reminder not found' ?
      setData(res['reminders'].filter(x => x['category'] == categoryId)) : {});
  }, [refresh]);

  const textInput = useRef(null);


  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <ScrollView> */}
      <View>
        {/* Header */}
        <View style={{ flexDirection: "row" }}>
          <View style={{ alignItems: "flex-start" }}>
            <Button
              style={{ flex: 1 }}
              type="clear"
              onPress={() => navigation.goBack()}
              icon={<Icon name="chevron-left" size={32} color="#505050" />}
            />
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              alignContent: "flex-start",
            }}
          >
            <Text style={styles.title}>{categoria}</Text>
          </View>
        </View>

        {/* Lista categorias */}
        <FlatList
          style={{
            flexDirection: "column",
            alignSelf: "center",
            marginTop: 20,
          }}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item["reminderId"].toString()}
          numColumns={1}
        />

        {/*Input*/}

        <View style={styles.reminder}>
          <View style={{ flex: 9, flexDirection: "row" }}>
            <View style={styles.circulo}></View>
            <View>
              <TextInput
                ref={textInput}
                style={{ fontSize: 16 }}
                onSubmitEditing={(event) => {
                  addReminder(event.nativeEvent.text, date);
                  textInput.current.clear();
                  textInput.current.focus();
                }}
                autoFocus={true}
                blurOnSubmit={false}
              />
            </View>

          </View>
          <Button
            onPress={() => setShow(true)}
            type="clear"
            icon={<Icon name="calendar" size={16} color="#505050" />}
          />
        </View>
        {/* </ScrollView> */}
      </View>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode='date'
          display="calendar"
          onChange={onChange}
          minimumDate={new Date()}
          locale="es-ES"
        />
      )}

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    //    paddingTop: 20,
    backgroundColor: "#F4ED70",
  },
  title: {
    right: 32,
    alignSelf: "center",
    fontSize: 32,
    color: "#505050",
  },
  reminder: {
    flexDirection: "row",
    width: 300,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#909090",
    alignSelf: "center",
  },
  circulo: {
    width: 17,
    height: 17,
    backgroundColor: "#505050",
    borderRadius: 10,
    marginRight: 10,
  },
});

export default Lista;
