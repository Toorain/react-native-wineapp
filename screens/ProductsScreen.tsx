import {
  Alert,
  Button,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View
} from "react-native";
import React, {Component} from "react";
import AsyncStorage from "@react-native-community/async-storage";
import {Icon, SearchBar} from 'react-native-elements';
import CapitalizedText from "../components/CapitalizedText";
import Placeholder from "../components/PlaceholderImage";

export default class ProductsScreen extends Component<{}, { productList: any, searchList : any, numColumns: any, searchText : any, item : any, refreshing: boolean, token: string }> {
  constructor() {
    // @ts-ignore
    super();
    this.state = {
      productList: [],
      searchList: [],
      searchText : null,
      numColumns: 0,
      item: null,
      refreshing: false,
      token: ''
    }
  }

  _onRefresh = () => {
    return this.getTokenFunction('getAll');
  }

  getTokenFunction = (action: string, item? : any) => {
    AsyncStorage.getItem('token').then(value => {
      switch (action) {
        case 'getAll':
          this.getAllItems(value);
          break;
        case 'remove':
          this.removeItem(value, item);
          break;
        case 'update':
          this.editItem(item);
          break;
      }
    });
  }

  editItem = (item: any) => {
    // @ts-ignore
    this.props.navigation.navigate('Ajouter un produit', [item, true]);
  }

  removeItem = (token: string | null, item? : any) => {
    fetch('http://146.59.156.251:3000/products/remove/' + item._id, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    }).then(res => res.json())
      .then(json => {

      });
  }

  getAllItems = (token: string | null) => {
    fetch('http://146.59.156.251:3000/products/getAll', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    }).then(res => res.json())
      .then(json => {
        this.setState({
          productList: json,
          searchList: json });
      });
  }

  searchFilterFunction = (text:string) => {
    if (text === ""){
      this.setState({
        item: this.state.productList
      })
    }
    this.setState({
      item: text,
    });

    const newData = this.state.productList.filter((item : any) => {
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
    this.getTokenFunction('getAll');
  }

//renderItem
  _renderItem = ({ item }: any) => (
    <View>
      <View style={styles.itemWrapper}>
        <View style={styles.imageWrapper}>
          <TouchableOpacity onPress={() => {
            // @ts-ignore
            this.props.navigation.navigate('ProductImage', item);
          }}>
            { item.product_img !== "" ? (
              <Image
                style={styles.image}
                source={{ uri: 'http://146.59.156.251:3000/images/bottleImg' + item.product_img }} />
            ) : (
              <Placeholder style={styles.image} />
            ) }
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.textWrapper} onPress={() => {
          // @ts-ignore
          this.props.navigation.navigate('ProductsDetails', item );
        }}>
          <CapitalizedText style={styles.textTitle}>{item.brand_name}</CapitalizedText>
            <Text style={styles.text}>{item.year}</Text>
            <CapitalizedText style={styles.text}>{item.color}</CapitalizedText>
            <Text style={styles.importantInfoText}>{item.sell_price_ht} €</Text>
            <Text style={styles.importantInfoText}>Qté : {item.quantity}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.ecoOptWrap}>
        <Icon
          name={'edit'}
          type={'font-awesome'}
          color={'gray'}
          size={40}
          onPress={() => {

          }}
        />
        <Icon
          name={'trash'}
          type={'font-awesome'}
          color={'red'}
          size={40}
          onPress={() => {
            Alert.alert('Attention !',
              'Voulez-vous vraiment supprimer cet élément ?',
              [
                { text: 'Non', onPress: () => console.log('Non')},
                { text: 'Oui', onPress: () => {
                    this.getTokenFunction('remove', item);
                    this.setState({refreshing: true});
                    this._onRefresh();
                    this.setState({ refreshing: false});
                  }}
                ])
          }}
        />
      </View>
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
        <TouchableHighlight
          style={styles.ajouter}
          onPress={() => {
            // @ts-ignore
            this.props.navigation.navigate('Ajouter un produit');
          }} >
          <View>
            <Text style={styles.addText}>Ajouter un produit</Text>
          </View>
        </TouchableHighlight>
        {this.state.productList !== null ? (
            <FlatList
              key={this.state.numColumns}
              numColumns={this.state.numColumns}
              data={this.state.searchList}
              keyExtractor={ item => item._id }
              renderItem={this._renderItem}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this._onRefresh.bind(this)}
                />
              }
            />
          ): (
            <Text>No products or error</Text>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  ajouter : {
    backgroundColor: 'green',
    width: '100%',
    height: 40,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  addText: {
    color: 'white',
    fontSize: 20,
  },
  ecoOptWrap: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-around",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 20,
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
    maxWidth: 300,
    minWidth: 300,
    margin: 20,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
    flexDirection: 'row',
  },
  image: {
    height: 200,
    width: 90,
    margin: 30,
    resizeMode: "contain"
  },
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
