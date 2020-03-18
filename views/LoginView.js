import React from "react";
import config from "../config";
import Logo from "../components/Logo";
import axios from "axios";
import {
  Picker,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
  AsyncStorage,
  View
} from "react-native";
import {
  Text,
  Provider,
  Portal,
  Modal,
  List,
  Card,
  ActivityIndicator,
  Colors,
  Button
} from "react-native-paper";

export default function LoginView({ navigation, route }) {
  const [token, setToken] = React.useState(null);
  const [title, setTitle] = React.useState("");
  const [dialogImageUri, setDialogImageUri] = React.useState("");
  const [list, setList] = React.useState([]);
  const [loaded, setLoaded] = React.useState(false);
  const [modalIsVisible, setModalIsVisible] = React.useState(false);
  const options = ["chihuahua", "husky", "labrador", "pug"];
  const [option, setOption] = React.useState(options[0]);

  const handleLogout = () => {
    AsyncStorage.clear();
    setToken(null);
  };

  const handleCreate = () => {
    navigation.navigate("Create");
  };

  const findList = async () => {
    try {
      setModalIsVisible(false);
      setLoaded(false);
      const { status, data } = await axios.get(
        `${config.apiUrl}/list?breed=${option}`,
        {
          headers: {
            Authorization: token
          }
        }
      );
      if (status === 200) {
        const { breed, list } = data;
        setTitle(` / ${breed}`);
        setList(list);
        setLoaded(true);
      }
    } catch (error) {
      setLoaded(true);
    }
  };

  const handleChangeOption = _option => {
    setOption(_option);
  };

  //findList by Token
  React.useEffect(() => {
    setLoaded(false);
    findList();
  }, [token]);

  //findList by Token
  React.useEffect(() => {
    findList();
  }, [option]);

  //Go back
  React.useEffect(() => {
    if (route.params !== undefined) {
      AsyncStorage.getItem("token")
        .then(token => {
          setToken(token);
        })
        .catch(errors => {});
    }
  }, [route]);

  //Reload Application
  React.useEffect(() => {
    AsyncStorage.getItem("token")
      .then(token => {
        setToken(token);
      })
      .catch(errors => {});
  }, []);

  return (
    <>
    <View style={styles.container}>
      <View style={styles.content}>
        <Logo />
        <Card style={styles.card}>
          <Card.Title
            style={styles.cardTitle}
            title={"Desafio Dog Breed / List"}
          />
          {token && loaded && (
            <View style={styles.containerOptions}>
              <Text>Select Option:</Text>
              <Picker
                style={styles.picker}
                selectedValue={option}
                mode="dropdown"
                onValueChange={(itemValue, itemIndex) =>
                  handleChangeOption(itemValue)
                }
              >
                {options.map((op, i) => (
                  <Picker.Item key={i} label={op} value={op} />
                ))}
              </Picker>
            </View>
          )}
          <Card.Content style={styles.cardContent}>
            {!loaded && (
              <ActivityIndicator animating={true} color={Colors.purple900} />
            )}
            {token && loaded && (
              <>
                <ScrollView style={styles.scrollView}>
                  {list.map((e, i) => (
                    <>
                      <View
                        onPress={() => setModalIsVisible(true)}
                        key={i}
                        style={styles.ContainerImages}
                      >
                        <Text>{e}</Text>
                        <Button onPress={() => {
                          setDialogImageUri(e);
                          setModalIsVisible(true);
                        }}>
                          View Picture
                        </Button>
                      </View>
                    </>
                  ))}
                </ScrollView>
              </>
            )}
            {!token && (
              <>
                <Text>No records</Text>
              </>
            )}
          </Card.Content>
          <Card.Actions style={styles.cardActions}>
            {token && (
              <Button onPress={() => handleLogout()} mode="outlined">
                Logout
              </Button>
            )}
            {!token && (
              <Button onPress={() => handleCreate()} mode="contained">
                Create account
              </Button>
            )}
          </Card.Actions>
        </Card>
      </View>
    </View>
{modalIsVisible && (
    <Modal
    style={styles.modalContainer}
      visible={modalIsVisible}
      onDismiss={() => setModalIsVisible(false)}
    >
      <Image style={styles.imageAnimal} source={{ uri: dialogImageUri }} />
    </Modal>
)}
</>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    paddingTop: 50,
    backgroundColor: "rgba(0,0,0,.05)",
    justifyContent: "center"
  },
  content: {
    alignItems: "center"
  },
  card: {
    width: Dimensions.get("window").width - 25,
    marginTop: 25,
    textAlign: "center",
    justifyContent: "center"
  },
  cardContent: {
    marginTop: 15,
    marginBottom: 15
  },
  cardTitle: {
    width: "100%",
    textAlign: "center"
  },
  cardActions: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  scrollView: {
    marginTop: 0,
    marginBottom: 0,
    maxHeight: 350
  },
  ContainerImages: {
    marginTop: 10,
    marginBottom: 10
  },
  imageAnimal: {
    width: Dimensions.get("window").width,
    minHeight: 200,
    resizeMode: "contain",
    marginBottom: 25
  },
  containerOptions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  modalContainer: {
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center"
  },
  picker: {
    width: 150
  }
});
