import React, { Component } from 'react';
import {
    Alert,
    FlatList,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
} from 'react-native';
import { Container, Header, Body, Title, List,ListItem,Left,Right } from 'native-base';



let config = require('./Config');

type Props = {};
export default class IndexScreen extends Component<Props> {
    static navigationOptions = {
        title: 'About Us',
    };

    constructor(props) {
        super(props)

        this.state = {
            authors: [],
            isFetching: false,
        };

        this._load = this._load.bind(this);
    }

    componentDidMount() {
        this._load();
    }

    _load() {
        let url = config.settings.serverPath + '/api/authors';

        this.setState({ isFetching: true });

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    Alert.alert('Error', response.status.toString());
                    throw Error('Error ' + response.status);
                }

                return response.json()
            })
            .then((authors) => {
                this.setState({ authors });
                this.setState({ isFetching: false });
            })
            .catch((error) => {
                console.log(error)
            });
    }

    render() {
        console.log(this.state.authors)
        return (
            <Container>
                <Header>
                    <Body>
                        <Title> About Us - Authors of the app</Title>
                    </Body>
                </Header>
                <View style={styles.container}>
               
                <List dataArray={this.state.authors}
                  renderRow={(author) =>
                    <ListItem
                      onPress={() => {
                          console.log(author.id);
                        this.props.navigation.navigate('Author', {
                          id: author.id,
                          headerTitle: author.name
                        })
                      }}
                    >
                      <Left><Text>{author.name}</Text></Left>
                      <Right>
                        <Text note>{author.city}</Text>
                      </Right>
                    </ListItem>
                  }>
                </List>

                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#fff',
    },

    item: {
        justifyContent: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 25,
        paddingRight: 25,
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },

    itemTitle: {
        fontSize: 22,
        fontWeight: '500',
        color: '#000',
    },

    itemSubtitle: {
        fontSize: 18,
    },
});