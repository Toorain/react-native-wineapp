
import {Button, FlatList, Image, StyleSheet, Text, TouchableOpacity, View, RefreshControl} from "react-native";
import React, {Component} from "react";
import AsyncStorage from "@react-native-community/async-storage";
import { SearchBar } from 'react-native-elements';
import CapitalizedText from "../components/CapitalizedText";
import Placeholder from "../components/PlaceholderImage";

// const UserScreen = ({navigation, route}: any) => {
//   const { signOut }: any = React.useContext(AuthContext);


export default class UserScreen extends Component<{}, { usersList: any, searchList : any, numColumns: any, searchText : any, item : any, refreshing: boolean }> {
  constructor() {
    // @ts-ignore
    super();
    this.state = {
      usersList: [],
      searchList: [],
      searchText : null,
      numColumns: 0,
      item: null,
      refreshing: false,
    }
  }

  _onRefresh = () => {
    this.getTokenFunction()
  }



  getTokenFunction = () => {
    AsyncStorage.getItem('token').then(value => {
      this.getAllUsers(value);
    });
  }

  getAllUsers = (token: string | null) => {
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
      const itemData = 
        item.username.toUpperCase() + 
        item.first_name.toUpperCase() + 
        item.last_name.toUpperCase() + 
        item.roles.map((elm: string) => elm);
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
        this.props.navigation.navigate('UserDetails', item);
      }}>
        <CapitalizedText style={styles.textMain}>{item.username}</CapitalizedText>
        <View style={styles.textWrapper}>  
          <View style={styles.horizontalSplit}>
            <View style={styles.horizontalColumn}> 
              <Text style={styles.text}>Nom :</Text>
              <Text style={styles.text}>Prénom :</Text>
            </View>
            <View style={styles.horizontalColumn}> 
              <Text style={styles.text}>{item.first_name}</Text>
              <Text style={styles.text}>{item.last_name}</Text>
            </View>
          </View>
          <View style={styles.horizontalSplit}>
            <View style={styles.horizontalColumnRoles}> 
              <Text style={styles.text}>Rôle(s) :</Text>
            </View>
            <View style={styles.horizontalColumn}>
              {item.roles.map((elm: string) => <Text key={elm}>{"▷ " + elm}</Text> )}
            </View>
          </View>
        </View>
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
        const itemWidth = 335;
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
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this._onRefresh.bind(this)}
                />
              }
            />
          ): (
            <Text>No users or error</Text>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  textMain: {
    textAlign: "center",
    marginVertical: 8,
    fontSize: 25,
    marginLeft: -40,
  },
  horizontalColumnRoles: {
    width: "40%",
    flex:1,
  },
  horizontalColumn: {
    width: "50%",
    flex:1,
    justifyContent: "space-evenly",
  },
  horizontalSplit: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: '90%',
    marginTop: '3%',
  },
  headerButtonsWrapper: {
    flexDirection: 'row',
    justifyContent: "space-around",
    width: "45%",
    alignItems: "center",
  },
  flatlist: {
    alignItems: 'center',
    height: '100%',
    marginBottom: 300
  },
  searchbar: {
    width: '100%'
  },
  text: {
    fontSize: 16,
  },
  importantInfoText: {
    fontSize: 20
  },
  itemWrapper: {
    maxWidth: 300,
    minWidth: 300,
    margin: 20,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 7,
    flexDirection: 'row',
  },
  textWrapper: {
    marginLeft: "3%",
    marginBottom: "2%",
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