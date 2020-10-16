
import {Button, FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {Component} from "react";
import AsyncStorage from "@react-native-community/async-storage";
import { SearchBar } from 'react-native-elements';
import CapitalizedText from "../components/CapitalizedText";
import Placeholder from "../components/PlaceholderImage";

// const AdminScreen = ({navigation, route}: any) => {
//   const { signOut }: any = React.useContext(AuthContext);


export default class AdminScreen extends Component<{}, { usersList: any, searchList : any, numColumns: any, searchText : any, item : any }> {
  constructor() {
    // @ts-ignore
    super();
    this.state = {
      usersList: [],
      searchList: [],
      searchText : null,
      numColumns: 0,
      item: null,
    }
  }


  getTokenFunction = () => {
    AsyncStorage.getItem('token').then(value => {
      this.getAllItems(value);
    });
  }

  getAllItems = (token: string | null) => {
    fetch('http://146.59.156.251:3000/users/all', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    }).then(res => res.json())
      .then(json => {
        this.setState({
          usersList: json,
          searchList: json });
      });
  }

  searchFilterFunction = (text:string) => {
    if (text === ""){
      this.setState({
        item: this.state.usersList
      })
    }
    this.setState({
      item: text,
    });

    const newData = this.state.usersList.filter((item : any) => {
      const itemData = item.brand_name.toUpperCase() + item.year + item.color.toUpperCase();
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      searchList: newData,
    });
  };

// When component is loaded
  async componentDidMount() {
    this.getTokenFunction();
  }

//renderItem
  _renderItem = ({ item }: any) => (
    <View style={styles.itemWrapper}>
      <TouchableOpacity style={styles.textWrapper} onPress={() => {
        // @ts-ignore
        this.props.navigation.navigate('ProductsDetails', item);
      }}>
        <CapitalizedText style={styles.textTitle}>{item.username}</CapitalizedText>
          <Text style={styles.text}>{item.first_name}</Text>
          <Text style={styles.text}>{item.last_name}</Text>
          <Text style={styles.importantInfoText}>roles : {item.roles}</Text>
      </TouchableOpacity>
    </View>
  )
  renderSearchbarHeader = () => {
    return (
      <SearchBar
        placeholder="Recherche..."
        lightTheme
        round
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
        value={this.state.searchText}
        containerStyle = {styles.searchbar}
      />
    );
  };


  renderHeaderButtonsWrapper = () => {
    return (
      
      <View style= {styles.headerButtonsWrapper}>
          <Button
            title={'Ajouter utilisateur'}
            onPress={() => {
              // @ts-ignore
              this.props.navigation.navigate('UserCreationScreen');
          }} />
        </View>
    )
  }

  render() {
    return (
      
      <View
      onLayout={(event) => {
        const {width} = event.nativeEvent.layout;
        // const {width} = Dimensions.get('window')
        const itemWidth = 170;
        const numColumns = Math.floor(width/itemWidth);
        this.setState({  numColumns: numColumns })
      }}
      style={styles.flatlist}
      >
        { this.renderSearchbarHeader() }
        { this.renderHeaderButtonsWrapper()}
        {this.state.usersList !== null ? (
            <FlatList
              key={this.state.numColumns}
              numColumns={this.state.numColumns}
              data={this.state.searchList}
              renderItem={this._renderItem}
              keyExtractor={ item => item._id }
            />
          ): (
            <Text>No users or error</Text>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  headerButtonsWrapper: {
    flexDirection: 'row',
    justifyContent: "space-around",
    width: "45%",
    alignItems: "center",
  },
  ajouter : {
    backgroundColor: 'green',

  },
  flatlist: {
    alignItems: 'center',
    height: '100%',
    marginBottom: 100
  },
  searchbar: {
    width: '100%'
  },
  text: {
    fontSize: 16,
  },
  textTitle: {
    fontSize: 20,
    textAlign: "center"
  },
  importantInfoText: {
    fontSize: 20
  },
  itemWrapper: {
    maxWidth: 150,
    minWidth: 150,
    margin: 20,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
    flexDirection: 'row',
  },
  // image: {
  //   height: 200,
  //   width: 90,
  //   margin: 30,
  //   resizeMode: "contain"
  // },
  textWrapper: {
    flex: 2,
    marginTop: 10,
    justifyContent: "space-around",
    alignItems: "center",
  },
  imageWrapper: {
    flex: 1
  },
  bottomInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 100,
    marginTop: 10
  },
})