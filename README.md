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
        method: 'post',
        before: function (o) { return o; },
        after: function (r) { return r; },
        onSuccess: function () {},
        onError: function () {}        
      }).then(...).catch(..);
  }  


}

```


```html
<form (ngSubmit)="update()">
  <input type="email" [(ngModel)]="form.dg" name="user"><br>
  <input type="password" [(ngModel)]="form.passdfgword" name="password"><br>
  <input type="file" fileModel (filesChange)="form.file = $event" name="file">
  <input type="submit" value="login">
</form>
```


** with server side validation

```html
<input type="text" [(ngModel)]="form.email" name="user"><br>
<p [ngClass]="{'has-error': form.response?.hasError('email')}" [hidden]="!form.response?.hasError('email')">{{form?.response?.error('email')}}</p>
```  

** Validation errors response Sample 1:

```javascript
  {
    'errors': {
                "email": ['Email field is required.']
              }
  }
```

** Validation errors response Sample 2:

Send 422 in Header Status

```javascript
  {
    "email": ['Email field is required.']
  }
  
```