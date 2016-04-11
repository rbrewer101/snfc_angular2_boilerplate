import {Component} from 'angular2/core';

@Component({
    selector: 'my-app',
    template: `
    	<header>
    		<div class="brand">Shopping List</div>
    	</header>
    	<div class="main">
    		<shopping-list></shopping-list>
    	</div>
    	
    `
})


export class AppComponent {
	stuff: string;
}
