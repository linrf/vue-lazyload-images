const getStyle=(el,prop)=>{
    if(el===window) return null;
    return getComputedStyle?
        getComputedStyle(el,null).getPropertyValue(prop)
        :el.style[prop]
};

const checkOverflow=(el)=>{
    let info=getStyle(el,"overflow")+getStyle(el,"overflow-y")+getStyle(el,"overflow-x");
    if(/(scroll)|(auto)/.test(info)) return true;
    else return false;
};

const getScrollParent=(el)=>{
    if(!(el instanceof HTMLElement)) return window;
    let parent=el;
    while(parent){
        if(parent===document.body || parent===document.documentElement) break;
        if(!parent.parentNode) break;

        if(checkOverflow(parent)) return parent;
        parent=parent.parentNode;
    }
    return window;
};

const checkInView=(el,scrollParent,offset)=>{
    let scrollTop,clientH,clientW,scrollLeft;
    if(scrollParent === window) {
        scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
        scrollLeft=document.documentElement.scrollLeft||document.body.scrollLeft;
        clientH=document.documentElement.clientHeight||document.body.clientHeight;
        clientW=document.documentElement.clientWidth||document.body.clientWidth;
    }
    else {
        scrollTop = scrollParent.scrollTop;
        scrollLeft=scrollParent.scrollLeft;
        clientH = scrollParent.clientHeight;
        clientW=scrollParent.clientWidth;
    }
    if(scrollTop+clientH>el.offsetTop-offset && scrollLeft+clientW>el.offsetLeft-offset){
        return true;
    }
    else return false;

}

export {
    getScrollParent,
    getStyle,
    checkOverflow,
    checkInView
}

