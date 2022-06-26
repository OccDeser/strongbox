/*
 * @Author: OccDeser 2287109950@qq.com
 * @Date: 2022-06-26 16:09:53
 * @LastEditTime: 2022-06-26 18:47:42
 * @FilePath: /strongbox/src/LetterIcon.js
 * @Description: Convert letter to icon
 * @Encoding: UTF-8
 */

import { TbLetterA, TbLetterB, TbLetterC, TbLetterD, TbLetterE, TbLetterF, TbLetterG, TbLetterH, TbLetterI, TbLetterJ, TbLetterK, TbLetterL, TbLetterM, TbLetterN, TbLetterO, TbLetterP, TbLetterQ, TbLetterR, TbLetterS, TbLetterT, TbLetterU, TbLetterV, TbLetterW, TbLetterX, TbLetterY, TbLetterZ } from 'react-icons/tb';
import { TbNumber0, TbNumber1, TbNumber2, TbNumber3, TbNumber4, TbNumber5, TbNumber6, TbNumber7, TbNumber8, TbNumber9 } from 'react-icons/tb';
import { TbLayoutGridAdd } from 'react-icons/tb';

export default function NumberIcon(props) {
    const { letter, color, backgroundColor } = props;
    var icon = null;
    switch (letter) {
        case '0': icon = <TbNumber0 color={color} />; break;
        case '1': icon = <TbNumber1 color={color} />; break;
        case '2': icon = <TbNumber2 color={color} />; break;
        case '3': icon = <TbNumber3 color={color} />; break;
        case '4': icon = <TbNumber4 color={color} />; break;
        case '5': icon = <TbNumber5 color={color} />; break;
        case '6': icon = <TbNumber6 color={color} />; break;
        case '7': icon = <TbNumber7 color={color} />; break;
        case '8': icon = <TbNumber8 color={color} />; break;
        case '9': icon = <TbNumber9 color={color} />; break;
        case '+': icon = <TbLayoutGridAdd color={color} />; break;
        case 'A': case 'a': icon = <TbLetterA color={color} />; break;
        case 'B': case 'b': icon = <TbLetterB color={color} />; break;
        case 'C': case 'c': icon = <TbLetterC color={color} />; break;
        case 'D': case 'd': icon = <TbLetterD color={color} />; break;
        case 'E': case 'e': icon = <TbLetterE color={color} />; break;
        case 'F': case 'f': icon = <TbLetterF color={color} />; break;
        case 'G': case 'g': icon = <TbLetterG color={color} />; break;
        case 'H': case 'h': icon = <TbLetterH color={color} />; break;
        case 'I': case 'i': icon = <TbLetterI color={color} />; break;
        case 'J': case 'j': icon = <TbLetterJ color={color} />; break;
        case 'K': case 'k': icon = <TbLetterK color={color} />; break;
        case 'L': case 'l': icon = <TbLetterL color={color} />; break;
        case 'M': case 'm': icon = <TbLetterM color={color} />; break;
        case 'N': case 'n': icon = <TbLetterN color={color} />; break;
        case 'O': case 'o': icon = <TbLetterO color={color} />; break;
        case 'P': case 'p': icon = <TbLetterP color={color} />; break;
        case 'Q': case 'q': icon = <TbLetterQ color={color} />; break;
        case 'R': case 'r': icon = <TbLetterR color={color} />; break;
        case 'S': case 's': icon = <TbLetterS color={color} />; break;
        case 'T': case 't': icon = <TbLetterT color={color} />; break;
        case 'U': case 'u': icon = <TbLetterU color={color} />; break;
        case 'V': case 'v': icon = <TbLetterV color={color} />; break;
        case 'W': case 'w': icon = <TbLetterW color={color} />; break;
        case 'X': case 'x': icon = <TbLetterX color={color} />; break;
        case 'Y': case 'y': icon = <TbLetterY color={color} />; break;
        case 'Z': case 'z': icon = <TbLetterZ color={color} />; break;
        default: icon = null;
    }

    return <div style={{ backgroundColor: backgroundColor, borderRadius: 5 }}>
        <div style={{ marginTop: 5, marginLeft: 5, marginRight: 5 }}>
            {icon}
        </div>
    </div>
}

