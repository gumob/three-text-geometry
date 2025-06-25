import axios from 'axios';
import TextGeometry, { BMFontJsonParser } from 'three-text-geometry';

const FONT_URL = 'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fonts/OdudoMono-Regular-64.json';
const TEXTURE_URL = 'https://raw.githubusercontent.com/gumob/three-text-geometry/develop/tests/fonts/OdudoMono-Regular-64.png';


/**
 * Fetcher for font JSON and parse with BMFontJsonParser
 *
 * @param {string} url - The URL of the font JSON file
 * @returns {Promise<BMFont>} The parsed font data
 */
const fetchFont = async (url: string) => {
  const response = await axios.get(url);
  return new BMFontJsonParser().parse(response.data);
};

const textList: string[] = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.\nNulla enim odio, tincidunt sed fringilla sed, placerat vel lectus.\nDuis non sapien nulla.\nIn convallis nulla nec nulla varius rutrum.\nNunc augue augue, ornare in cursus egestas, cursus vel magna.\nFusce at felis vel tortor sagittis tincidunt nec vitae nisl.\nSed efficitur nibh consequat tortor pulvinar, dignissim tincidunt risus hendrerit.\nSuspendisse quis commodo nulla.\nUt orci urna, mollis non nisl id, molestie tristique purus.\nPhasellus efficitur laoreet eros vehicula convallis.\nSed imperdiet, lectus a facilisis tempus, elit orci varius ante, at lacinia odio massa et quam.\nQuisque vulputate nulla vitae feugiat aliquam.\nVivamus vel mauris sit amet est rhoncus molestie at quis neque.\nDuis faucibus laoreet tempus.\nMaecenas metus velit, lobortis sit amet mauris at, vehicula condimentum velit.\nVestibulum ornare eu turpis vel laoreet.\nNunc ac cursus nunc, non porttitor arcu.`,
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.\nFusce dapibus vehicula semper.\nAliquam pulvinar enim quis tristique tincidunt.\nSed faucibus turpis ipsum, non ultrices odio varius et.\nDonec eget vulputate enim.\nAenean posuere, dolor quis dapibus interdum, ipsum dolor molestie nunc, consequat tincidunt ex leo eu lectus.\nInteger a risus iaculis, facilisis orci ac, maximus augue.\nDonec at feugiat leo, at sollicitudin sapien.\nNullam quis lacus consequat, sodales mi eleifend, efficitur tortor.\nVivamus bibendum ante eu dolor convallis, id blandit felis placerat.\nAliquam maximus at dolor eget facilisis.\nMaecenas aliquam consequat urna eget ullamcorper.`,
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.\nPraesent ac magna id tortor consectetur mattis.\nMauris vel felis a urna suscipit dapibus.\nSuspendisse nec tincidunt nulla.\nCurabitur diam nisl, convallis eu porta id, tristique a nulla.\nVestibulum ultrices rhoncus placerat.\nLorem ipsum dolor sit amet, consectetur adipiscing elit.\nCurabitur egestas, libero id luctus placerat, enim erat sodales ipsum, sed pretium urna ante nec mi.\nMauris justo nulla, vulputate id dui id, molestie fermentum neque.\nNam cursus enim sit amet semper auctor.\nPraesent ultricies tempor fringilla.\nDuis libero eros, dictum at ligula quis, placerat consequat velit.\nEtiam id fringilla neque.`,
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.\nDonec diam odio, efficitur sed efficitur vel, vestibulum vitae odio.\nAliquam semper, sem eget placerat ultricies, ligula sem faucibus magna, ut convallis est purus ac lectus.\nNam quis quam eget augue tristique efficitur nec nec quam.\nQuisque id turpis non magna mattis sagittis.\nInteger efficitur elementum congue.\nCurabitur ullamcorper rutrum orci a volutpat.\nIn quam est, hendrerit id lorem sed, semper eleifend purus.\nCras id sem mauris.`,
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.\nVivamus eu mauris pretium, pellentesque justo at, sodales ligula.\nPraesent vitae dolor porttitor, laoreet metus ut, posuere ligula.\nMauris dolor ante, consectetur eu vulputate eget, tempus in nunc.\nMaecenas bibendum eleifend lacus in sodales.\nAenean mollis lorem a sem ultrices, nec lobortis erat eleifend.\nCurabitur ante eros, porta eget mi a, bibendum luctus ante.\nNulla est purus, posuere at rutrum sit amet, bibendum condimentum elit.\nNunc nec sem enim.`,
];

/**
 * Get a random text from the text list
 *
 * @returns {string} A random text from the text list
 */
const randomText = (): string => {
  const index = Math.floor(Math.random() * textList.length);
  return textList[index];
}

export { fetchFont, randomText, FONT_URL, TEXTURE_URL };