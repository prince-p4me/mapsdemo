import PropTypes from "prop-types";
import React from 'react';
import { Text, View } from 'react-native';
import Fonts from '../utilities/Fonts';

const TextBold = (props) => {
    return (
        <Text allowFontScaling={false} ellipsizeMode={props.ellipsizeMode} numberOfLines={props.numberOfLines}
            style={[
                { fontFamily: Fonts.bold },
                props.style]}>{props.title}</Text>
    );
}
const TextSemiBold = (props) => {
    return (
        <Text allowFontScaling={false} ellipsizeMode={props.ellipsizeMode} numberOfLines={props.numberOfLines}
            style={[
                { fontFamily: Fonts.semiBold },
                props.style]}>{props.title}</Text>
    );
}
const TextMedium = (props) => {
    return (
        <Text allowFontScaling={false} ellipsizeMode={props.ellipsizeMode} numberOfLines={props.numberOfLines}
            style={[
                { fontFamily: Fonts.medium },
                props.style]}>{props.title}</Text>
    );
}
const TextRegular = (props) => {
    return (
        <Text allowFontScaling={false} ellipsizeMode={props.ellipsizeMode} numberOfLines={props.numberOfLines}
            style={[
                { fontFamily: Fonts.regular },
                props.style]}>{props.title}</Text>
    );
}

const TextLite = (props) => {
    return (
        <Text allowFontScaling={false} ellipsizeMode={props.ellipsizeMode} numberOfLines={props.numberOfLines}
            style={[
                { fontFamily: Fonts.regular, fontWeight: '400' },
                props.style]}>{props.title}</Text>
    );
}
const TextThin = (props) => {
    return (
        <Text allowFontScaling={false} ellipsizeMode={props.ellipsizeMode} numberOfLines={props.numberOfLines}
            style={[
                { fontWeight: '100', fontFamily: Fonts.regular },
                props.style]}>{props.title}</Text>
    );
}


const propsType = {
    style: Text.propTypes.style,
    title: PropTypes.any,
    numberOfLines: PropTypes.number,
    ellipsizeMode: PropTypes.string,
};

TextThin.propTypes = propsType;
TextLite.propTypes = propsType;
TextBold.propTypes = propsType;
TextRegular.propTypes = propsType;
TextSemiBold.propTypes = propsType;
TextMedium.propTypes = propsType;


export { TextThin, TextLite, TextBold, TextRegular, TextSemiBold, TextMedium };
