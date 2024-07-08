package service;

import dao.UsuarioDAO;
import model.Usuario;
import spark.Request;
import spark.Response;
import com.google.gson.Gson;

public class UsuarioService {

	public UsuarioDAO usuarioDAO = new UsuarioDAO();

	public UsuarioService() {

	}

	public String insert(Request request, Response response) {
		String str = request.body();

		Gson gson = new Gson();
		Usuario usuario = gson.fromJson(str, Usuario.class);

		if (usuarioDAO.insert(usuario)) {
			response.status(201); // 201 Created
			return "{\"message\": \"Usuário inserido com sucesso!\"}";
		} else {
			response.status(500); // 500 Internal Server Error
			return "{\"message\": \"Erro ao inserir usuário!\"}";
		}
	}

	public String delete(Request request, Response response) {
		String str = request.body();

		Gson gson = new Gson();
		Usuario usuario = gson.fromJson(str, Usuario.class);

		if (usuarioDAO.delete(usuario.getCpf()) == true) {
			return "Usuário deletado com sucesso!";
		} else {
			return "Erro ao deletar usuário!";
		}
	}

	public String update(Request request, Response response) {
		String str = request.body();

		Gson gson = new Gson();
		Usuario usuario = gson.fromJson(str, Usuario.class);

		if (usuarioDAO.update(usuario) == true) {
			return "Usuário atualizado com sucesso!";
		} else {
			return "Erro ao atualizar usuário!";
		}
	}

	public String get(Request request, Response response) {
		String cpf = request.params(":cpf");

		Usuario usuario = usuarioDAO.get(Integer.parseInt(cpf));

		if (usuario == null) {
			response.status(404); // 404 Not found
			return "{\"message\": \"Partida não encontrada\"}";
		} else {
			response.header("Content-Type", "application/json");
			response.header("Content-Encoding", "UTF-8");

			Gson gson = new Gson();
			return gson.toJson(usuario);
		}
	}

	public String list(Request request, Response response) {
		UsuarioDAO usuarioDAO = new UsuarioDAO();

		Usuario[] usuarios = usuarioDAO.list();

		Gson gson = new Gson();
		String json = gson.toJson(usuarios);

		return json;
	}
}