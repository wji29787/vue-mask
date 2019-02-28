// welcome to imooc.com
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.VueMask = {}));
}(this, function (exports) { 'use strict';

    /**
     * @param {String} text
     * @param {String} [wholeMask] like `####-##`
     * @returns {String} Formatted text
     * 
     */

     function format (text,wholeMask){
        if(!wholeMask) return text

        const maskStartRegExp = /^([^#ANX]+)/;
        if(+text.length ===1 && maskStartRegExp.test(wholeMask)){
            text = maskStartRegExp.exec(wholeMask)[0] +text;
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

                text = text.replace(mask,'');
            }
        }
        for(let i = 0, x =1;x &&i<wholeMask.length;i++ ){
            const char = text.charAt(i-charOffset);
            const mask = wholeMask.charAt(i);
            switch(mask){
                case '#':
                /\d/.test(char)? newText += char :x = 0;
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

    const trigger = (el,type)=>{
        const e = document.createEvent('HTMLEvents');
        // 是否组织冒泡 是否阻止事件的默认操作
        e.initEvent(type,true,true);
        // 触发事件
        el.dispatchEvent(e);
    };

    /**
     * 获取第一个input
     * @param {HTMLElement} el
     * @returns {HTMLElement | HTMLInputElement}
     */

     const queryInputElement = el =>(
         el instanceof HTMLInputElement ? el :el.querySelector('input')||el
     );

    const inBrowser = typeof window !== 'undefined';
    const UA = inBrowser && window.navigator.userAgent.toLowerCase();
    const isEdge = UA && UA.indexOf('edge')> 0;
    const isAndroid = UA && UA.indexOf('android')> 0;
    const isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

    function updateValue(el,force = false){
        const {value,dataset:{previousValue ='',mask}} =el;
        if(force || (value && value !==previousValue && value.length>previousValue.length)){
            el.value = format(value,mask);
            if(isAndroid && isChrome){
                setTimeout(()=>trigger(el,'input'),0);
            }else{
                trigger(el,'input');
            }
        }
        el.dataset.previousValue = value;
    }
    function updateMask (el,mask){
        el.dataset.mask = mask;
    }

    var directive = {
        bind(el,{value}){
            el = queryInputElement(el);
            updateMask(el,value);
            updateValue(el);
        },
        componentUpdated(el,{value,oldValue}){
            el = queryInputElement(el);
            const isMaskChanged = value !==oldValue;
            if(isMaskChanged){
                updateMask(el,value);
            }
            updateValue(el,isMaskChanged);
        }
    };

    var plugin = (Vue)=>{
        Vue.directive('mask',directive);
    };

    exports.default = plugin;
    exports.VueMaskPlugin = plugin;
    exports.VueMaskDirective = directive;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
// powered by sam
