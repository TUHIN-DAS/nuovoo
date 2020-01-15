import {EMAIL_PATTERN,USERNAME_PATTERN} from 'components/helpers/constants';

export const isValidUserName = (username) => { return USERNAME_PATTERN.test(username)};

export const isValidEmail = (email) => { return EMAIL_PATTERN.test(email)};

export const toFormattedText = (string) => {
    let letters = string.split("");
    letters[0] = letters[0].toUpperCase();
    letters = letters.join("");
    return letters;
};