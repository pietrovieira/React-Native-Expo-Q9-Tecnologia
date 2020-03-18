import React from "react";
import config from "../config";
import Logo from "../components/Logo";
import axios from "axios";
import { StyleSheet, Keyboard, AsyncStorage, Image, View } from "react-native";
import { TextInput, Card, Button, Snackbar } from "react-native-paper";
import { StackActions } from '@react-navigation/native';

export default function CreateView({ navigation }) {
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [snackIsShow, setSnackIsShow] = React.useState(false);

  const handleCreate = async () => {
    setLoading(true);
    try {
      const { status, data } = await axios.post(
        `${config.apiUrl}/register`,{
            email
        }
      );
      if (status === 200) {
        setLoading(false);
        const {
            user
        } = data;
        const {
            token,
        } = user;
        setSnackIsShow(true);
        AsyncStorage.setItem('token', token);
        console.log("token", token);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const handleBack = () => {
    Keyboard.dismiss;
    setSnackIsShow(false);
    const pushAction = StackActions.replace('Login', { reload: true });
    navigation.dispatch(pushAction);
  };

  return (
    <View style={styles.container}>
    <Snackbar
    style={styles.snackBarSuccess}
      visible={snackIsShow}
      duration={2000}
      onDismiss={() => handleBack()}
      action={{
        label: 'Fechar',
        onPress: () => {
          // Do something
        },
      }}
    >
    Account successfully created!
    </Snackbar>
      <View style={styles.content}>
        <Logo />
        <Card style={styles.card}>
          <Card.Title title="Desafio Dog Breed / Create Account" />
          <Card.Content style={styles.cardContent}>
            <TextInput
              autoCapitalize="none"
              autoCompleteType="email"
              autoFocus={true}
              keyboardType="email-address"
              mode="outlined"
              label="Email"
              value={email}
              onChangeText={value => setEmail(value)}
            />
          </Card.Content>
          <Card.Actions style={styles.cardActions}>
            <Button onPress={() => handleBack()} mode="outlined">
              Voltar
            </Button>
            <Button onPress={() => handleCreate()} 
              loading={loading}
              mode="contained">
              Criar
            </Button>
          </Card.Actions>
        </Card>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    paddingTop: 50,
    backgroundColor: "rgba(0,0,0,.05)",
    justifyContent: "center",
    alignItems: "center"
  },
  content: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center"
  },
  card: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    marginTop: 25
  },
  cardContent: {
    marginTop: 15,
    marginBottom: 15
  },
  cardActions: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  snackBarSuccess: {
      backgroundColor: 'rgba(42, 187, 155, 1)',
      color: 'white',
  }
});
