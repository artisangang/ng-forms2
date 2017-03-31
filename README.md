# ng-forms
Form Handler for Angular 2


** Note: for angular 1x check ng-forms repository

# Usage

** In Module
```javascript

import { ngForm } from '../ng-form/module';

@NgModule({
  declarations: [...],
  imports: [
    ...
    ngForm.forRoot()
  ]
})


```


** In Component

```javascript

import { Component } from '@angular/core';
import { ServiceProvider } from '../ng-form/service';

@Component(...)

export class AppComponent {

  ...

  form = {};

  update() {
     this.ngForm.exec('http://example.com/upload.php', this.form, {
        method: 'post'
      });
  }  


}

```


```html
  <form (ngSubmit)="update()">
  <input type="email" [(ngModel)]="form.email" name="user"><br>
  <input type="password" [(ngModel)]="form.password" name="password"><br>
  <input type="file" fileModel (filesChange)="form.file = $event" name="file">
  <input type="submit" value="login">
</form>
```
