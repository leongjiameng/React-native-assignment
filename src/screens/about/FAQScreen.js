import React, { Component } from 'react';
import {
    Alert,
    FlatList,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
} from 'react-native';
import { Container, Header, Body, Title } from 'native-base';



let config = require('./Config');

type Props = {};
export default class IndexScreen extends Component<Props> {
    static navigationOptions = {
        title: 'FAQ',
    };

    constructor(props) {
        super(props)

        this.state = {
            questions: [],
            isFetching: false,
        };

        this._load = this._load.bind(this);
    }

    componentDidMount() {
        this._load();
    }

    _load() {
        let url = config.settings.serverPath + '/api/questions';

        this.setState({ isFetching: true });

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    Alert.alert('Error', response.status.toString());
                    throw Error('Error ' + response.status);
                }

                return response.json()
            })
            .then((questions) => {
                this.setState({ questions });
                this.setState({ isFetching: false });
            })
            .catch((error) => {
                console.log(error)
            });
    }

    render() {
        return (
            <Container>
                <Header>
                    <Body>
                        <Title> FAQ</Title>
                    </Body>
                </Header>
                <View style={styles.container}>
                    <FlatList
                        data={this.state.questions}
                        showsVerticalScrollIndicator={true}
                        refreshing={this.state.isFetching}
                        onRefresh={this._load}
                        renderItem={({ item }) =>
                            <View style={styles.item}>
                                <Text>{item.question}</Text>
                                <Text >{item.answer}</Text>
                            </View>

                        }
                        keyExtractor={(item) => { item.id.toString() }}
                    />
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