export declare interface IIGDBAssertion {
	property: string;
	boolOperator: string;
	value: string;
}

export declare interface IIGDBWhereClause {
	assertions: IIGDBAssertion[];
}

export declare interface IIGDBRequestBody {
	fields: string[];
	where?: IIGDBWhereClause;
	exclude?: string[];
	limit?: number;
}
