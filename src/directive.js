import format from './format'
import { trigger,queryInputElement} from './utils/index'
import { isAndroid,isChrome} from './utils/env'
function updateValue(el,force = false){
    const {value,dataset:{previousValue ='',mask}} =el
    if(force || (value && value !==previousValue && value.length>previousValue.length)){
        el.value = format(value,mask)
        if(isAndroid && isChrome){
            setTimeout(()=>trigger(el,'input'),0)
        }else{
            trigger(el,'input')
        }
    }
    el.dataset.previousValue = value
}
function updateMask (el,mask){
    el.dataset.mask = mask
}

export default {
    bind(el,{value}){
        el = queryInputElement(el)
        updateMask(el,value)
        updateValue(el)
    },
    componentUpdated(el,{value,oldValue}){
        el = queryInputElement(el)
        const isMaskChanged = value !==oldValue
        if(isMaskChanged){
            updateMask(el,value)
        }
        updateValue(el,isMaskChanged)
    }
}