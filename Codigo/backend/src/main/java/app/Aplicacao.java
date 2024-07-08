package app;

import static spark.Spark.*;
import service.UsuarioService;
import service.QuadraService;
import service.PartidaService;

import java.util.HashMap;
import spark.Filter;
import spark.Request;
import spark.Response;
import spark.Spark;

public class Aplicacao {

    private static UsuarioService usuarioService = new UsuarioService();
    private static QuadraService quadraService = new QuadraService();
    private static PartidaService partidaService = new PartidaService();

    public static void main(String[] args) {

        port(8080);

        staticFiles.location("/public");

        CorsFilter.apply();

        options("/*", (request, response) -> {

            String accessControlRequestHeaders = request.headers("Access-Control-Request-Headers");
            if (accessControlRequestHeaders != null) {
                response.header("Access-Control-Allow-Headers", accessControlRequestHeaders);
            }

            String accessControlRequestMethod = request.headers("Access-Control-Request-Method");
            if (accessControlRequestMethod != null) {
                response.header("Access-Control-Allow-Methods", accessControlRequestMethod);
            }

            return "OK";
        });

        // Rotas de usuário
        post("/usuario/insert", (request, response) -> usuarioService.insert(request, response));
        get("/usuario/get/:cpf", (request, response) -> usuarioService.get(request, response));
        post("/usuario/update", (request, response) -> usuarioService.update(request, response));
        delete("/usuario/delete", (request, response) -> usuarioService.delete(request, response));
        get("/usuario/list", (request, response) -> usuarioService.list(request, response));

        // Rotas de partida
        post("/partida/insert", (request, response) -> partidaService.insert(request, response));
        get("/partida/get/:id", (request, response) -> partidaService.get(request, response));
        post("/partida/update", (request, response) -> partidaService.update(request, response));
        delete("/partida/delete", (request, response) -> partidaService.delete(request, response));
        get("/partida/list", (request, response) -> partidaService.list(request, response));

        // Rotas de quadra
        post("/quadra/insert", (request, response) -> quadraService.insert(request, response));
        get("/quadra/get/:id", (request, response) -> quadraService.get(request, response));
        post("/quadra/update", (request, response) -> quadraService.update(request, response));
        delete("/quadra/delete", (request, response) -> quadraService.delete(request, response));
        get("/quadra/list", (request, response) -> quadraService.list(request, response));
    }
}

class CorsFilter {

    private static final HashMap<String, String> corsHeaders = new HashMap<String, String>();

    static {
        corsHeaders.put("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
        corsHeaders.put("Access-Control-Allow-Origin", "*");
        corsHeaders.put("Access-Control-Allow-Headers",
                "Content-Type,Authorization,X-Requested-With,Content-Length,Accept,Origin");
        corsHeaders.put("Access-Control-Allow-Credentials", "true");
    }

    public final static void apply() {
        Filter filter = new Filter() {
            @Override
            public void handle(Request request, Response response) throws Exception {
                corsHeaders.forEach(response::header);
            }
        };
        Spark.after(filter);
    }
}
