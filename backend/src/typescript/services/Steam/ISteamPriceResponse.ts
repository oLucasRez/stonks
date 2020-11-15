interface PriceOverview {
	currency: string;
	discount_percent: number;
	final: number;
	final_formatted: string;
	initial: number;
	initial_formatted: string;
}

interface Sub {
	can_get_free_license: string;
	is_free_license: boolean;
	option_description: string;
	option_text: string;
	packageid: number;
	percent_savings: number;
	percent_savings_text: string;
	price_in_cents_with_discount: number;
}

interface PackageGroup {
	description: string;
	display_type: number;
	is_recurring_subscription: string;
	name: string;
	save_text: string;
	selection_text: string;
	subs: Sub[];
	title: string;
}

export default interface ISteamPriceResponse {
	appid: number;
	is_free?: boolean;
	package_groups?: PackageGroup[];
	price_overview?: PriceOverview;
	success?: boolean;
}
