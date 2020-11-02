import {
	IIGDBWhereClause,
	IIGDBRequestBody,
} from '../../../typescript/services/IGDB/RequestBody';

class IGDBRequestAdapter {
	private static IsIIGDBWhereClause(
		value: IIGDBRequestBody[keyof IIGDBRequestBody]
	) {
		return (value as IIGDBWhereClause).assertions != null;
	}

	private static handleRequestBodyLimit(value: number) {
		return `${value};`;
	}

	private static handleRequestBodyWhere(
		value: IIGDBWhereClause
	) {
		let toAddOnString = '';

		for (let i = 0; i < value.assertions.length; i += 1) {
			const assertion = value.assertions[i];

			toAddOnString += `${assertion.property} ${assertion.boolOperator} ${assertion.value}`;

			if (i !== value.assertions.length - 1) {
				toAddOnString += ' & ';
			}
		}

		toAddOnString += ';';

		return toAddOnString;
	}

	private static handleRequestBodyFields(value: string[]) {
		let toAddOnstring = '';

		for (let i = 0; i < value.length; i += 1) {
			toAddOnstring += value[i];

			if (i !== value.length - 1) {
				toAddOnstring += ', ';
			}
		}

		toAddOnstring += ';';

		return toAddOnstring;
	}

	public static adaptToRequestBodyString(
		requestBody: IIGDBRequestBody
	): string {
		const requestKeys = Object.keys(requestBody).map(
			(key) => key as keyof IIGDBRequestBody
		);

		let requestBodyString = '';

		for (let i = 0; i < requestKeys.length; i += 1) {
			const key = requestKeys[i];

			const value = requestBody[key];

			if (value !== undefined) {
				requestBodyString = `${requestBodyString} ${key} `;
			}

			if (typeof value === 'number') {
				requestBodyString += this.handleRequestBodyLimit(value);
			} else if (this.IsIIGDBWhereClause(value)) {
				requestBodyString += this.handleRequestBodyWhere(
					value as IIGDBWhereClause
				);
			} else if (Array.isArray(value)) {
				requestBodyString += this.handleRequestBodyFields(
					value as string[]
				);
			}
		}

		return requestBodyString;
	}
}

export default IGDBRequestAdapter;
