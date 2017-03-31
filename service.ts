import { Injectable } from "@angular/core";
import { Http, Headers, Response, Request, RequestMethod, URLSearchParams, RequestOptions  } from "@angular/http";

@Injectable()

export class ServiceProvider  { 

	 constructor( private http: Http) {
	    this.http = http;
	  }

	 exec (url, data:any, config:any) {

	 	console.log(data);


	 	config.method = config.method || 'get';

	 	let options = new RequestOptions();
	 	let headers = new Headers({
			     'Content-Type': 'application/x-www-form-urlencoded',
			     'Accept': 'application/json'});
	 		

	 	if (config.method == 'get') { 	
	 				  

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


			if (config.multipart == true) {
				options.headers = new Headers();
			}

			options.method = 'post' 

	 	}

	 	console.log(options.body);
	 	
	 	this.http.request(url, options).subscribe( res => {

	 		console.log(res.json());

	 	}, err => {});


	 }

}