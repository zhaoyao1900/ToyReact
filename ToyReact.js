
class ElementWrapper{
    constructor(type){
        // 初始化创建真实 DOM 元素
        this.root = document.createElement(type);
    }
    // 设置标签属性
    setAttribute(name, value){
        this.root.setAttribute(name, value);
    }
    // 添加子标签
    appendChild(vChild){
        vChild.mountTo(this.root);
    }
    // 添加子元素（真实的DOM）
    mountTo(parent) {
        parent.appendChild(this.root); // 添加子元素
    }
}

class TextWrapper{

    constructor(text){
        this.root = document.createTextNode(text);
    }

    mountTo(parent){
        parent.appendChild(this.root);
    }
}

export class Component{
    constructor(){
        this.children = []
        console.log('component')
    }
    setAttribute(name, value){
        this[name] = value;
    }
    mountTo(parent){
        let vdom = this.render();
        vdom.mountTo(parent)
    }
    appendChild(vChild){
        this.children.push(vChild)
    }
}

export let ToyReact = {
    /**
     * 使组件成为 js 中一等公民的能力。
     * @param {*} type 元素类型
     * @param {*} attributes 元素的属性
     * @param  {...any} children 子元素
     */
    createElement(type, attributes, ...children){
        console.log('createElement')
        let element;
        // 判断要不同元素类型
        if(typeof type === 'string'){ // 字符串类型：传入的标签元素
            element = new ElementWrapper(type)
        }else{
            element = new type // 函数类型：传入的是组件

        }
        for (let name in attributes) {
            element.setAttribute(name,attributes[name])
        }

        let insertChildren = (children) => {

            for (let child of children) {
                if(typeof child === "object" && child instanceof Array){ // 处理传入 children 是数组的类型。
                    insertChildren(child) // 递归来展开 children 
                }else{
                    
                    // 处理认识的类型（白名单机制）
                    if ( !(child instanceof Component)  && 
                         !(child instanceof ElementWrapper) &&
                         !(child instanceof TextWrapper)
                       ){
                            child = String(child)
                    }
                    
                    if (typeof child === "string") { // 处理子元素中的文本节点 
                        child = new TextWrapper(child)
                    }

                    element.appendChild(child)
                }
            }

        }
        insertChildren(children);
        return element
    },
    render(vdom, element ){
        vdom.mountTo(element);
    },
};