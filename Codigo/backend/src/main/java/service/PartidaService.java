package service;

import dao.PartidaDAO;
import model.Partida;
import spark.Request;
import spark.Response;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

public class PartidaService {

	public PartidaDAO partidaDAO = new PartidaDAO();

	public PartidaService() {

	}

	public String insert(Request request, Response response) {

		String str = request.body();

		Gson gson = new Gson();
		Partida partida = gson.fromJson(str, Partida.class);

		if (partidaDAO.insert(partida) == true) {
			return "Produto inserido com sucesso!";
		} else {
			return "Erro ao inserir produto!";
		}
	}

	public String delete(Request request, Response response) {
		String str = request.body();

		JsonObject jsonObject = JsonParser.parseString(str).getAsJsonObject();

		int id = Integer.parseInt(jsonObject.get("id").getAsString());

		if (partidaDAO.delete(id) == true) {
			return "Produto deletado com sucesso!";
		} else {
			return "Erro ao deletar produto!";
		}
	}

	public String update(Request request, Response response) {
		String str = request.body();

		Gson gson = new Gson();
		Partida partida = gson.fromJson(str, Partida.class);

		if (partidaDAO.update(partida) == true) {
			return "Produto atualizado com sucesso!";
		} else {
			return "Erro ao atualizar produto!";
		}
	}

	// metodo get que retorna um json
	public String get(Request request, Response response) {
		String id = request.params(":id");

		Partida partida = partidaDAO.get(Integer.parseInt(id));

		if (partida == null) {
			response.status(404); // 404 Not found
			return "{\"message\": \"Partida não encontrada\"}";
		} else {
			response.header("Content-Type", "application/json");
			response.header("Content-Encoding", "UTF-8");

			Gson gson = new Gson();
			return gson.toJson(partida);
		}
	}

	public String list(Request request, Response response) {
		PartidaDAO partidaDAO = new PartidaDAO();
		Partida[] partidas = partidaDAO.list();

		Gson gson = new Gson();
		String json = gson.toJson(partidas);

		return json;
	}

}