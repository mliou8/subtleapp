import Carousel, { Pagination, ParallaxImage } from 'react-native-snap-carousel';
import React, {Component} from 'react';
import { View, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
  
const slideHeight = viewportHeight * 0.36;
const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);
export const itemWidth = slideWidth + itemHorizontalMargin * 2;
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
const sliderWidth = Dimensions.get('window').width;
const itemHeight = Dimensions.get('window').height;

export default class MyCarousel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            entries: this.props.entries,
            activeSlide: this.props.activeSlide
        }
    }
    _renderItem ({item}) {
      return (
        <TouchableOpacity
        activeOpacity={1}
        style={styles.slideInnerContainer}
        >
        <View style={styles.shadow} />
        <View style={styles.imageContainer}>
            <ParallaxImage
                source={{ uri: item }}
                containerStyle={styles.imageContainer}
                style={styles.image}
                parallaxFactor={0.35}
                showSpinner={true}
            />
        <View style={styles.radiusMask} />
        </View>
        </TouchableOpacity>
      )
    }

    get pagination () {
        const { entries, activeSlide } = this.state;
        return (
            <Pagination
              dotsLength={entries.length}
              activeDotIndex={activeSlide}
              containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
              dotStyle={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  marginHorizontal: 8,
                  backgroundColor: 'rgba(255, 255, 255, 0.92)'
              }}
              inactiveDotStyle={{
                  // Define styles for inactive dots here
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
            />
        );
    }

    render () {
        return (
            <View>
                <Carousel
                  data={this.props.entries}
                  renderItem={this._renderItem}
                  onSnapToItem={(index) => this.setState({ activeSlide: index }) }
                  windowSize={1}
                  sliderWidth={sliderWidth}
                  itemWidth={sliderWidth}
                  itemHeight={itemHeight}
                />
                { this.pagination }
            </View>
        );
    }
}


function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}



const entryBorderRadius = 8;

const styles = StyleSheet.create({
    slideInnerContainer: {
        width: itemWidth,
        height: slideHeight,
        paddingHorizontal: itemHorizontalMargin,
        paddingBottom: 18 // needed for shadow
    },
    shadow: {
        position: 'absolute',
        top: 0,
        left: itemHorizontalMargin,
        right: itemHorizontalMargin,
        bottom: 18,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 10,
        borderRadius: entryBorderRadius
    },
    imageContainer: {
        flex: 1,
        marginBottom: 0, 
        backgroundColor: 'white',
        borderTopLeftRadius: entryBorderRadius,
        borderTopRightRadius: entryBorderRadius
    },
    imageContainerEven: {
        backgroundColor: 'black'
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
        borderRadius: entryBorderRadius,
        borderTopLeftRadius: entryBorderRadius,
        borderTopRightRadius: entryBorderRadius
    },
    radiusMask: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: entryBorderRadius,
        backgroundColor: 'white'
    },
    radiusMaskEven: {
        backgroundColor: 'black'
    },
    textContainer: {
        justifyContent: 'center',
        paddingTop: 20 - entryBorderRadius,
        paddingBottom: 20,
        paddingHorizontal: 16,
        backgroundColor: 'white',
        borderBottomLeftRadius: entryBorderRadius,
        borderBottomRightRadius: entryBorderRadius
    },
    textContainerEven: {
        backgroundColor: 'black'
    },
    title: {
        color: 'black',
        fontSize: 13,
        fontWeight: 'bold',
        letterSpacing: 0.5
    },
    titleEven: {
        color: 'white'
    },
    subtitle: {
        marginTop: 6,
        color: 'gray',
        fontSize: 12,
        fontStyle: 'italic'
    },
    subtitleEven: {
        color: 'rgba(255, 255, 255, 0.7)'
    }
});