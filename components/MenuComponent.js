import React, { Component } from "react";
import { FlatList, View } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import Dishdetail from "./DishdetailComponent";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDish: null,
    };
  }
  render() {
    return (
      <View>
        <FlatList
          data={this.props.dishes}
          renderItem={({ item, index }) => this.renderMenuItem(item, index)}
          keyExtractor={(item) => item.id.toString()}
        />
        <Dishdetail dish={this.state.selectedDish} />
      </View>
    );
  }
  renderMenuItem(item, index) {
    return (
      <ListItem key={index} onPress={()=> this.onDishSelect(item)}>
        <Avatar source={require("./images/uthappizza.png")} />
        <ListItem.Content>
          <ListItem.Title>{item.name}</ListItem.Title>
          <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    );
    };
    onDishSelect(item){
        this.setState({selectedDish: item});
    }
}
export default Menu;
