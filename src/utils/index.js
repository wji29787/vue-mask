export const trigger = (el,type)=>{
    const e = document.createEvent('HTMLEvents')
    // 是否组织冒泡 是否阻止事件的默认操作
    e.initEvent(type,true,true)
    // 触发事件
    el.dispatchEvent(e);
}

/**
 * 获取第一个input
 * @param {HTMLElement} el
 * @returns {HTMLElement | HTMLInputElement}
 */

 export const queryInputElement = el =>(
     el instanceof HTMLInputElement ? el :el.querySelector('input')||el
 )