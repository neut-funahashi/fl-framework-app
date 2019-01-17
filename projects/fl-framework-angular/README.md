# fl-framework-angular

## how to use

### install
```npm
npm install fl-framework-angular
```

### app.module.ts
```TypeScript
import { NgModule, Injector } from '@angular/core';
import { FlFrameworkModule, FrameworkModule } from 'fl-framework-angular';

@NgModule({
  declarations: [
    ...
  ],
  imports: [
    ...
    FlFrameworkModule
  ],
  providers: [],
  bootstrap: [...]
})
export class AppModule extends FrameworkModule {
  constructor(injector: Injector){
    super(injector);
  }
}
```
### app.component.ts
 ```TypeScript
 import { Component } from '@angular/core';
import { FlComponentBase, isEmpty, FlServiceName } from 'fl-framework-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
@FlServiceName('Test')
export class AppComponent extends FlComponentBase {
  /**
   * abstract initializeView -> ngOnInit
   **/
  initializeView(): void {
  
  }
  /**
   * abstract createCompleteView -> ngAfterViewInit + delay 50ms
   **/
  createCompleteView(): void {
    /**
     * call rest api service
     * methodName: init, search, regist 
     * serviceName: Specify the service name with FlServiceName decorator
     * 
     * default rest api address
     * /_api/[serviceName]/[methodName]
     **/
    this.init({...}).subscribe((result)=>{
    });
    this.search({...}).subscribe((result)=>{
    });
    this.regist({...}).subscribe((result)=>{
    });
    /**
     * custom method
     */
    this.callService([methodNameString],{...})
    .subscribe((result)=>{
    });
    /**
     * custom service and method
     */
    this.callCustomService([serviceNameString],[methodNameString],{...})
    .subscribe((result)=>{
    });
  }
  title = 'framework-demo';
}
```

### style.scss
```scss
@import '~@angular/material/theming';
@import '~fl-framework-angular/theming';  // <-here
// require angular material
@include mat-core();

// mat-deep-purple,mat-purple,mat-indigo
$primary: mat-palette($mat-blue, A200);
$accent:  mat-palette($mat-orange, A400);
$warn:    mat-palette($mat-teal, 500);
$theme: mat-light-theme($primary, $faccent, $warn);

@include angular-material-theme($theme);

//fl-framework-theme($info, $question, $complete,$warning,$error);
//@include fl-framework-theme(#53c1dc,#2a7cb4,#59b764,#f3ab58,#F44336); <- default color
@include fl-framework-theme();    // alert panel color

//fl-framework-wait-dialog($color);
//@include fl-framework-wait-dialog(#3f51b5); <- default color
@include fl-framework-wait-dialog();  //wait dialog color

```

