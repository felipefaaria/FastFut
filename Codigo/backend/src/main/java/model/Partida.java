package model;

public class Partida {
	private int id;
	private String title;
	private String sport;
	private String data;
	private int num_jogadores;
	private String court_name;
	private String court_type;
	private String status;

	public Partida() {
		status = title = sport = court_type = court_name = data = "";
		id = num_jogadores = 0;

	}

	public Partida(int id, String title, String sport, String data, int num_jogadores, String court_name,
			String court_type, String status) {
		this.id = id;
		this.title = title;
		this.sport = sport;
		this.data = data;
		this.num_jogadores = num_jogadores;
		this.court_name = court_name;
		this.court_type = court_type;
		this.status = status;
	}

	public String getData() {
		return data;
	}

	public void setData(String data) {
		this.data = data;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getNum_jogadores() {
		return num_jogadores;
	}

	public void setNum_jogadores(int num_jogadores) {
		this.num_jogadores = num_jogadores;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getSport() {
		return sport;
	}

	public void setSport(String sport) {
		this.sport = sport;
	}

	public String getCourt_name() {
		return court_name;
	}

	public void setCourt_name(String court_name) {
		this.court_name = court_name;
	}

	public String getCourt_type() {
		return court_type;
	}

	public void setCourt_type(String court_type) {
		this.court_type = court_type;
	}

	@Override
	public String toString() {
		String resp = id + ":" + title + ":" + sport + ":" + data + ":" + num_jogadores + ":" + court_name + ":"
				+ court_type + ":" + status;
		return resp;
	}

}
