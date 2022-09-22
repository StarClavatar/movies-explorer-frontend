// eslint-disable-next-line no-control-regex
const email_regexp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[/\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i;
const user_name_regexp = /^[a-zA-Zа-яА-ЯёЁ\-\s]*$/;
export const EMAIL_REGEXP = email_regexp.source;
export const USER_NAME_REGEXP=user_name_regexp.source;

// export const BASE_URL = 'http://localhost:3001';
export const BASE_URL = 'https://movies-api.clavatar.nomoreparties.sbs';

// какие фильмы считать короткометражками (в сек.)
export const SHORTS_THRESHOLD = 40;

// количество отображаемых карточек фильмов и количества дополнительно загружаемых
export const MOVIES_LIST_SHOW_PARAMS = {
    width1280: {total: 12, step: 3},
    width768: {total: 8, step: 2},
    width480: {total: 5, step: 2},
    width_min: {total: 5, step: 2}
}
