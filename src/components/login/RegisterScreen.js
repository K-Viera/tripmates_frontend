import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import Colors from '../../res/colors';
import axios from 'axios';
import colors from '../../res/colors';
import ImagePicker from 'react-native-image-picker';

class RegisterScreen extends Component {
  state = {
    email: '',
    password: '',
    name: '',
    phone: '',
    city: '',
    imageURL:
      'https://res.cloudinary.com/ogcodes/image/upload/v1581387688/m0e7y6s5zkktpceh2moq.jpg',
    image: {},
  };

  registrar = async () => {
    console.log('Register');

    await this.cloudinaryUpload(this.state.image);

    console.log(this.state);
    const url = 'https://still-shore-58656.herokuapp.com/api/user/';
    const response = await axios.post(url, this.state);

    console.log(response.status);

    Alert.alert('Registro', response.data.mensaje, [
      {
        text: 'Ok',
        onPress: () => this.login(),
      },
    ]);
  };

  cloudinaryUpload = async photo => {
    const CLOUDINARY_URL =
      'https://api.cloudinary.com/v1_1/zipzap/image/upload';
    const UPLOAD_PRESET = 'yxoq41kh';

    const formImages = new FormData();

    formImages.append('file', photo);
    formImages.append('upload_preset', UPLOAD_PRESET);

    const resI = await axios.post(CLOUDINARY_URL, formImages);

    this.setState({
      imageURL: resI.data.secure_url,
    });
  };

  login = () => {
    console.log('go to login');
    this.props.navigation.navigate('Login');
  };

  selectPhotoTapped = () => {
    const options = {
      title: 'Select Photo',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, async response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const uri = response.uri;
        const type = response.type;
        const name = response.fileName;
        const source = {
          uri,
          type,
          name,
        };

        this.setState({
          image: source,
        });
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.tittle}>Crea una cuenta</Text>

        <TextInput
          onChangeText={text => this.setState({email: text})}
          value={this.state.email}
          placeholder="Correo Electronico"
          style={styles.inputText}
        />
        <TextInput
          onChangeText={text => this.setState({password: text})}
          value={this.state.password}
          placeholder="Contraseña"
          style={styles.inputText}
          secureTextEntry
        />
        <TextInput
          onChangeText={text => this.setState({name: text})}
          value={this.state.name}
          placeholder="Nombre"
          style={styles.inputText}
        />
        <TextInput
          onChangeText={text => this.setState({phone: text})}
          value={this.state.phone}
          placeholder="Telefono"
          style={styles.inputText}
        />
        <TextInput
          onChangeText={text => this.setState({city: text})}
          value={this.state.city}
          placeholder="Ciudad"
          style={styles.inputText}
        />

        <View>
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: this.state.imageURL,
              }}
              style={styles.backgroundImage}
            />
          </View>
          <View style={styles.uploadContainer}>
            <Text style={styles.uploadContainerTitle}>
              ImagePicker to Cloudinary
            </Text>
            <TouchableOpacity
              onPress={this.selectPhotoTapped}
              styles={styles.uploadButton}>
              <Text style={styles.uploadButtonText}>Upload</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Button
          title={'Registrar'}
          onPress={this.registrar}
          style={styles.btn}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.orange,
    padding: 50,
  },
  inputText: {
    color: Colors.blackPearl,
    textAlign: 'center',
    backgroundColor: Colors.white,
    borderRadius: 10,
    marginBottom: 15,
  },
  btn: {
    padding: 8,
    backgroundColor: Colors.picton,
    borderRadius: 10,
  },
  btnText: {
    color: Colors.blackPearl,
    textAlign: 'center',
  },
  loader: {
    marginTop: 60,
  },
  tittle: {
    textAlign: 'center',
    marginBottom: 25,
    fontSize: 30,
    color: colors.white,
    fontWeight: 'bold',
  },
  imageContainer: {
    backgroundColor: '#fe5b29',
    //height: Dimensions.get('window').height,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  uploadContainer: {
    backgroundColor: '#f6f5f8',
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    position: 'absolute',
    bottom: 0,
    width: Dimensions.get('window').width,
    height: 200,
  },
  uploadContainerTitle: {
    alignSelf: 'center',
    fontSize: 25,
    margin: 20,
    fontFamily: 'Roboto',
  },
  uploadButton: {
    borderRadius: 16,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 7,
      height: 5,
    },
    shadowOpacity: 1.58,
    shadowRadius: 9,
    elevation: 4,
    margin: 10,
    padding: 10,
    backgroundColor: '#fe5b29',
    width: Dimensions.get('window').width - 60,
    alignItems: 'center',
  },
  uploadButtonText: {
    color: '#f6f5f8',
    fontSize: 20,
    fontFamily: 'Roboto',
  },
});

export default RegisterScreen;
