import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Alert,
  Text,
  Image,
  ScrollView,
} from 'react-native';
import Colors from '../../res/colors';
import axios from 'axios';
import colors from '../../res/colors';
import * as ImagePicker from 'react-native-image-picker';
import storage from '../../libs/storage';

class EditProfileScreen extends Component {
  state = {
    email: '',
    name: '',
    phone: '',
    city: '',
    avatar:
      'https://res.cloudinary.com/tripmatesapp/image/upload/v1632315856/sample.jpg',
    imageFile: {
      uri: 'https://res.cloudinary.com/tripmatesapp/image/upload/v1632315856/sample.jpg',
    },
  };

  componentDidMount() {
    this.getProfile();
  }

  getProfile = async () => {
    const url = 'https://still-shore-58656.herokuapp.com/api/user/mine';
    const token = await storage.instance.get('access-token');

    const config = {
      method: 'get',
      url: url,
      headers: {
        'access-token': token,
      },
    };
    const res = await axios(config);
    console.log(res.data.data);

    this.setState({
      email: res.data.data.email,
      name: res.data.data.name,
      phone: res.data.data.phone,
      city: res.data.data.city,
      avatar: res.data.data.avatar,
    });
  };

  edit = async () => {
    console.log('Register');

    await this.cloudinaryUpload();
    console.log('img url: ', this.state.avatar);
    console.log(this.state);
    const url = 'https://still-shore-58656.herokuapp.com/api/user/';

    const token = await storage.instance.get('access-token');
    const config = {
      method: 'put',
      url,
      headers: {
        'access-token': token,
      },
      data: this.state,
    };
    const response = await axios(config);
    console.log(response.status);

    Alert.alert('Editar', response.data.data, [
      {
        text: 'Ok',
        onPress: () => this.MyProfile(),
      },
    ]);
  };

  cloudinaryUpload = async () => {
    console.log('image: ', this.state.imageFile);

    if (
      this.state.imageFile.uri !==
      'https://res.cloudinary.com/tripmatesapp/image/upload/v1632315856/sample.jpg'
    ) {
      const CLOUDINARY_URL =
        'https://api.cloudinary.com/v1_1/tripmatesapp/image/upload';
      const UPLOAD_PRESET = 'd8jmhqxz';

      const formImages = new FormData();

      formImages.append('file', this.state.imageFile);
      formImages.append('upload_preset', UPLOAD_PRESET);

      const resI = await axios.post(CLOUDINARY_URL, formImages);

      this.setState({
        avatar: resI.data.secure_url,
      });
    }
  };

  MyProfile = () => {
    this.props.navigation.navigate('Mi Perfil');
  };

  selectPhotoTapped = () => {
    const options = {
      title: 'Select Photo',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.launchImageLibrary(options, async response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const uri = response.assets[0].uri;
        const type = response.assets[0].type;
        const name = response.assets[0].fileName;
        const source = {
          uri,
          type,
          name,
        };

        this.setState({
          imageFile: source,
        });

        console.log('Source= ', source);
      }
    });
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.tittle}>Edita Tu Cuenta</Text>

        <TextInput
          onChangeText={text => this.setState({email: text})}
          value={this.state.email}
          placeholder="Correo Electronico"
          style={styles.inputText}
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
        <View style={styles.backgroundImage}>
          <Image
            style={styles.imageContainer}
            source={{uri: this.state.imageFile.uri}}
          />
        </View>
        <Text style={styles.linkText} onPress={this.selectPhotoTapped}>
          Seleccionar Imagen
        </Text>

        <Text onPress={this.edit} style={styles.linkTextR}>
          Editar
        </Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.orange,
    paddingHorizontal: 50,
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
  linkText: {
    color: Colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
    backgroundColor: Colors.zircon,
    borderRadius: 15,
    margin: 25,
    marginBottom: -5,
    padding: 15,
  },
  linkTextR: {
    color: Colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
    backgroundColor: Colors.zircon,
    borderRadius: 15,
    margin: 25,
    marginBottom: 20,
    padding: 15,
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
    height: 310,
    width: 310,
    borderRadius: 10,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
});

export default EditProfileScreen;
