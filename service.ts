import { Injectable } from "@angular/core";
import { Http, Headers, Response, Request, RequestMethod, URLSearchParams, RequestOptions  } from "@angular/http";

import { Errorhandler } from './error-handler';


import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()

export class ServiceProvider  { 

	 constructor( private http: Http) {
	    this.http = http;
	  }

	 exec (url, data:any, config:any) {


	 	const instance = this;

	 	config.method = config.method || 'get';

	 	let options = new RequestOptions(); 	
	 		

	 	if (config.method == 'get') { 	

	 		let headers = new Headers({
			     'Content-Type': 'application/x-www-form-urlencoded',
			     'Accept': 'application/json'});
	 				  

			  if (data){

				  let body = new URLSearchParams();
				  let loop = function (value,key) {

				  	if (typeof value != 'string') {
				  		for (var i in value) {
				  			loop(value[i], i);
				  		}
				  	}

				  	body.append(encodeURIComponent(key), encodeURIComponent(value));
				  };
		
				 for (var k in data) {
			  		loop(data[k], k);
			  	 }

				  options.search = body;

			}

	 	} else {	 		 		

			  if (data){

				  let body:FormData = new FormData();
				  let loop = function (value,key) {

				  	if (typeof value != 'string' && !(value instanceof File)) {
				  		for (var i in value) {
				  			loop(value[i], i);
				  		}
				  	}

				  	body.append(key, value);
				  };
		
				 for (var k in data) {
			  		loop(data[k], k);
			  	 }		 

			  	 options.body = body;
			}

			options.headers = new Headers();
			options.method = 'post' 

	 	}

	 	if (typeof config.before == 'function') {
	 		options = config.before(options);
	 	}

	 	return new Promise(function(resolve, reject) {
		 	
		 	instance.http.request(url, options).subscribe( (res) => {

		 		res = res.json();

		 		if (typeof config.after == 'function') {
			 		res = config.after(null, res);
			 	}

		 		
		 		data.response = Object.assign(res, (new Errorhandler(data.errors || {})).json());
		 		
		 		console.log(data.response);

		 		if (typeof config.onSuccess == 'function') {
		 			config.onSuccess(res);
		 		}

		 		resolve(res);


		 	}, (err) => {
		 		
		 		if (err.status == 422) {	 			
		 			data.response = new Errorhandler(err._body);
		 		}

		 		if (typeof config.onError == 'function') {
		 			config.onError(err);
		 		}

		 		if (typeof config.after == 'function') {
			 		config.after(err, null);
			 	}

		 		reject(err);

		 	});

		 });


	 }

}