import React, { Component } from "react";
import { View, ScrollView, Text } from "react-native";
import { Card, Image } from "react-native-elements";

/* Shared Folder */
import { DISHES } from "../shared/dishes";
import { PROMOTIONS } from "../shared/promotions";
import { LEADERS } from "../shared/leaders";

class RenderItem extends Component {
  render() {
    const item = this.props.item;
    if (item != null) {
      return (
        <Card>
          <Image
            source={require("./images/uthappizza.png")}
            style={{
              width: "100%",
              height: 100,
              flexGrow: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Card.FeaturedTitle>{item.name}</Card.FeaturedTitle>
            <Card.FeaturedSubtitle>{item.designation}</Card.FeaturedSubtitle>
          </Image>
          <Text style={{ margin: 10 }}>{item.description}</Text>
        </Card>
      );
    }
    return <View />;
  }
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      promotions: PROMOTIONS,
      leaders: LEADERS,
    };
  }
  render() {
    const dish = this.state.dishes.filter((dish) => dish.featured === true)[0];
    const promotions = this.state.dishes.filter(
      (promotions) => promotions.featured === true
    )[0];
    const leaders = this.state.dishes.filter(
      (leaders) => leaders.featured === true
    )[0];
    return (
      <ScrollView>
        <RenderItem item={dish} />
        <RenderItem item={promotions} />
        <RenderItem item={leaders} />
      </ScrollView>
    );
  }
}
export default Home;
