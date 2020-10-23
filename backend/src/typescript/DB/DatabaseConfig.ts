import SummaryModel from './Models/SummaryModel';
import ThemeModel from './Models/ThemeModel';
import database from '../../services/DB/Connection';

class DatabaseConfig {
	models = [ThemeModel, SummaryModel];

	public InitDatabase(): void {
		this.models.map((model) => {
			model.initialize(database.connectionSequelize);
			model.associate(this.models);
			return model;
		});
	}
}

export default DatabaseConfig;
