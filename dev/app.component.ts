import {Component} from 'angular2/core';
import {MyComponentComponent} from './my-component.component';


@Component({
    selector: 'my-app',
    template: `
        <h3>Angular 2 App (using AppComponent2)</h3>
        <h3>Here is the second component:</h3>
        <my-component></my-component>
    `,
    directives: [MyComponentComponent]
})
export class AppComponent {

}
