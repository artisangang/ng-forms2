export class Errorhandler {

	private errors:any = {};

	constructor( errors: any) {

		if (typeof errors != 'undefined') {
			this.errors = typeof errors == 'string' ? JSON.parse(errors) : errors;
		}

	 }

	hasError (key) {

		return typeof this.errors[key] != 'undefined';

	}

	error(key) {

		return typeof this.errors[key] != 'undefined' ? this.errors[key] : null;

	}


	json() {
		return {
			hasError: this.hasError,
			error: this.error,
		};
	}

}
