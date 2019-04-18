import Carousel, { Pagination, ParallaxImage } from 'react-native-snap-carousel';
import React, {Component} from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';

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
    _renderItem ({item, index}, parallaxProps) {
       return (
           <View style={{width: 340, height: 250}}>
               <ParallaxImage
                   source={{ uri: item }}
                   containerStyle={styles.imageContainer}
                   style={{width: 300, height: 300}}
                   parallaxFactor={0.4}
                   {...parallaxProps}
               />
           </View>
       );
   }


    get pagination () {
        const { entries, activeSlide } = this.state;
        return (
            <Pagination
              dotsLength={entries.length}
              activeDotIndex={activeSlide}
              containerStyle={{ backgroundColor: 'white' }}
              dotStyle={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  marginHorizontal: 8,
                  backgroundColor: 'grey'
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
        <View style={{display: 'flex', width: 340, height: 300, marginLeft: 5}}>
          <Carousel
            data={this.props.entries}
            hasParallaxImages={true}
            renderItem={this._renderItem}
            onSnapToItem={(index) => this.setState({ activeSlide: index }) }
            windowSize={1}
            sliderWidth={sliderWidth}
            itemWidth={sliderWidth}
            itemHeight={itemHeight}
            layout={'default'}
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
