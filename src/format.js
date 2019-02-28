/**
 * @param {String} text
 * @param {String} [wholeMask] like `####-##`
 * @returns {String} Formatted text
 * 
 */

 export default function (text,wholeMask){
    if(!wholeMask) return text

    const maskStartRegExp = /^([^#ANX]+)/;
    if(+text.length ===1 && maskStartRegExp.test(wholeMask)){
        text = maskStartRegExp.exec(wholeMask)[0] +text
    }
    let newText = '';
    let charOffset = 0;

    for(let i = 0; i<wholeMask.length;i++){
        const mask = wholeMask.charAt(i);
        switch(mask){
            case '#':
            case 'A':
            case '?':
            case 'N':
            case 'X':
            break;
            default:

            text = text.replace(mask,'')
        }
    }
    for(let i = 0, x =1;x &&i<wholeMask.length;i++ ){
        const char = text.charAt(i-charOffset);
        const mask = wholeMask.charAt(i);
        switch(mask){
            case '#':
            /\d/.test(char)? newText += char :x = 0
            break
            case 'A':
            /[a-z]/i.test(char) ? newText += char : x = 0;
            break;
            case '?':
            charOffset += 1;
            break;
            case 'N':
            /[a-z0-9]/i.test(char) ? newText += char : x = 0;
            break;
            case 'X':
            newText += char;
            break;
            default:
            newText += mask;
            if (char && char !== mask) {
                text = ` ${text}`;
              }
      
              break;
        }
    }
    return newText
 }