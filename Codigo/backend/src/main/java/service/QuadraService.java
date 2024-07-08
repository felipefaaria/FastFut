package service;

import dao.QuadraDAO;
import model.Quadra;
import spark.Request;
import spark.Response;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

public class QuadraService {

	public QuadraDAO quadraDAO = new QuadraDAO();

	public QuadraService() {

	}

	public String insert(Request request, Response response) {

		String str = request.body();

		Gson gson = new Gson();
		Quadra quadra = gson.fromJson(str, Quadra.class);

		if (quadraDAO.insert(quadra) == true) {
			return "Produto inserido com sucesso!";
		} else {
			return "Erro ao inserir produto!";
		}
	}

	public String delete(Request request, Response response) {
		String str = request.body();

		JsonObject jsonObject = JsonParser.parseString(str).getAsJsonObject();

		int id = Integer.parseInt(jsonObject.get("id").getAsString());

		if (quadraDAO.delete(id) == true) {
			return "Produto deletado com sucesso!";
		} else {
			return "Erro ao deletar produto!";
		}
	}

	public String update(Request request, Response response) {
		String str = request.body();

		Gson gson = new Gson();
		Quadra quadra = gson.fromJson(str, Quadra.class);

		if (quadraDAO.update(quadra)) {
			return "Quadra atualizada com sucesso!";
		} else {
			return "Erro ao atualizar quadra!";
		}
	}

	// metodo get que retorna um json
	public String get(Request request, Response response) {
		String id = request.params(":id");

		Quadra quadra = quadraDAO.get(Integer.parseInt(id));

		if (quadra == null) {
			response.status(404); // 404 Not found
			return "{\"message\": \"Partida não encontrada\"}";
		} else {
			response.header("Content-Type", "application/json");
			response.header("Content-Encoding", "UTF-8");

			Gson gson = new Gson();
			return gson.toJson(quadra);
		}
	}

	public String list(Request request, Response response) {
		QuadraDAO quadraDAO = new QuadraDAO();
		Quadra[] quadras = quadraDAO.list();

		Gson gson = new Gson();
		String json = gson.toJson(quadras);

		return json;
	}

}