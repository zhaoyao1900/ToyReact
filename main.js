import { ToyReact, Component } from './ToyReact.js'

class MyComponent extends Component {

    render(){
        return <div>
            {/* <span>hello</span>
            <span>world</span> */}
            <span>{this.children}</span>
        </div>
    }
}

const a = <MyComponent name="a" id="ida">
    <div>123</div>
</MyComponent>
ToyReact.render(a, document.body)
